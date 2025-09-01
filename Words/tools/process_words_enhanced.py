# -*- coding: utf-8 -*-
"""
Enhanced Minecraft vocabulary processor with web translation support.
Tasks:
1) Update minecraft_image_links.json by filling chinese and phraseTranslation using local mappings + web fallback
2) Convert markdown files to JSON with flexible output directory support
3) Web translation fallback using Minecraft Wiki for missing Chinese translations

New features:
- Web translation support for missing Chinese terms
- Configurable output directory (default: current, can specify Words2)
- Enhanced error handling and progress reporting
"""
import json
import os
import re
import shutil
import requests
import time
from datetime import datetime
from typing import Dict, List, Tuple, Optional
from urllib.parse import quote

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Files
IMAGE_LINKS_PATH = os.path.join(BASE_DIR, 'minecraft_image_links.json')
BASIC_JSON = os.path.join(BASE_DIR, 'minecraft_basic.json')
INTERMEDIATE_JSON = os.path.join(BASE_DIR, 'minecraft_intermediate.json')
ADVANCED_JSON = os.path.join(BASE_DIR, 'minecraft_advanced.json')
COMMON_JSON = os.path.join(BASE_DIR, 'common_vocabulary.json')
TXT_MAPPING = os.path.join(BASE_DIR, 'minecraft_vocabulary_with_images_and_chinese.txt')

# Output directory (can be overridden)
OUTPUT_DIR = os.path.join(os.path.dirname(BASE_DIR), 'Words2')

# Utility
ASCII_RE = re.compile(r'^[\x00-\x7F]+$')
PAREN_ZH_RE = re.compile(r'\(([^()]*[\u4e00-\u9fff][^()]*)\)')  # Chinese text inside parentheses
IMG_MD_RE = re.compile(r'!\[[^\]]*\]\(([^)]+)\)')

# Avoid non-ASCII literals in source to prevent encoding issues on Windows
LABEL_STD = '\u6807\u51c6\u5316\u540d\u79f0'      # 标准化名称
LABEL_ZH = '\u4e2d\u6587\u7ffb\u8bd1'              # 中文翻译
LABEL_IMG = '\u56fe\u7247\u94fe\u63a5'            # 图片链接

# Web translation cache
web_translation_cache: Dict[str, str] = {}


def safe_read_json(path: str) -> List[dict]:
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def get_minecraft_wiki_translation(english_term: str) -> Optional[str]:
    """Fetch Chinese translation from Minecraft Wiki."""
    if english_term.lower() in web_translation_cache:
        return web_translation_cache[english_term.lower()]
    
    try:
        # Try Minecraft Wiki Chinese API
        search_url = f"https://minecraft.fandom.com/zh/api.php"
        params = {
            'action': 'query',
            'format': 'json',
            'list': 'search',
            'srsearch': english_term,
            'srlimit': 3
        }
        
        response = requests.get(search_url, params=params, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if 'query' in data and 'search' in data['query']:
                for result in data['query']['search']:
                    title = result.get('title', '')
                    # Simple heuristic: if title contains Chinese and matches context
                    if title and any('\u4e00' <= c <= '\u9fff' for c in title):
                        # Extract Chinese part if mixed
                        chinese_match = re.search(r'[\u4e00-\u9fff]+', title)
                        if chinese_match:
                            chinese_term = chinese_match.group()
                            web_translation_cache[english_term.lower()] = chinese_term
                            print(f"Web translation: {english_term} -> {chinese_term}")
                            time.sleep(0.5)  # Rate limiting
                            return chinese_term
        
        # Fallback: try direct page lookup
        page_url = f"https://minecraft.fandom.com/zh/wiki/{quote(english_term)}"
        response = requests.get(page_url, timeout=10)
        if response.status_code == 200:
            # Simple extraction from page title or content
            content = response.text
            # Look for Chinese in page title
            title_match = re.search(r'<title>([^<]*[\u4e00-\u9fff][^<]*)</title>', content)
            if title_match:
                title = title_match.group(1)
                chinese_match = re.search(r'[\u4e00-\u9fff]+', title)
                if chinese_match:
                    chinese_term = chinese_match.group()
                    web_translation_cache[english_term.lower()] = chinese_term
                    print(f"Web translation (page): {english_term} -> {chinese_term}")
                    time.sleep(0.5)
                    return chinese_term
                    
    except Exception as e:
        print(f"Web translation failed for {english_term}: {e}")
    
    # Cache negative result to avoid repeated requests
    web_translation_cache[english_term.lower()] = ''
    return None


def build_local_mappings() -> Tuple[Dict[str, str], Dict[str, Tuple[str, str]]]:
    """Build mappings from local JSON files and txt mapping."""
    en_to_zh: Dict[str, str] = {}
    en_to_phrase: Dict[str, Tuple[str, str]] = {}

    def ingest_json(path: str):
        data = safe_read_json(path)
        for item in data:
            word = (item.get('word') or '').strip()
            std = (item.get('standardized') or '').strip()
            zh = (item.get('chinese') or '').strip()
            phrase = (item.get('phrase') or '').strip()
            phrase_zh = (item.get('phraseTranslation') or '').strip()
            if word:
                lw = word.lower()
                if zh:
                    en_to_zh.setdefault(lw, zh)
                if phrase and phrase_zh:
                    en_to_phrase.setdefault(lw, (phrase, phrase_zh))
            if std:
                ls = std.lower()
                if zh:
                    en_to_zh.setdefault(ls, zh)
                if phrase and phrase_zh:
                    en_to_phrase.setdefault(ls, (phrase, phrase_zh))

    for p in [BASIC_JSON, INTERMEDIATE_JSON, ADVANCED_JSON, COMMON_JSON]:
        ingest_json(p)

    # Parse txt mapping
    if os.path.exists(TXT_MAPPING):
        with open(TXT_MAPPING, 'r', encoding='utf-8') as f:
            cur_word: Optional[str] = None
            cur_std: Optional[str] = None
            cur_zh: Optional[str] = None
            for raw in f:
                line = raw.strip()
                if not line:
                    # flush block
                    if cur_zh:
                        if cur_word:
                            en_to_zh.setdefault(cur_word.lower(), cur_zh)
                        if cur_std:
                            en_to_zh.setdefault(cur_std.lower(), cur_zh)
                    cur_word = cur_std = cur_zh = None
                    continue
                # New word header
                if (LABEL_IMG not in line) and (':' not in line) and not line.startswith((LABEL_STD, LABEL_ZH)):
                    cur_word = line
                    continue
                if line.startswith(LABEL_STD):
                    parts = line.split(':', 1)
                    if len(parts) == 2:
                        cur_std = parts[1].strip()
                    continue
                if line.startswith(LABEL_ZH):
                    parts = line.split(':', 1)
                    if len(parts) == 2:
                        cur_zh = parts[1].strip()
                    continue
            # flush last block
            if cur_zh:
                if cur_word:
                    en_to_zh.setdefault(cur_word.lower(), cur_zh)
                if cur_std:
                    en_to_zh.setdefault(cur_std.lower(), cur_zh)

    return en_to_zh, en_to_phrase


def chinese_missing(ch: Optional[str], english_hint: Optional[str] = None) -> bool:
    if not ch:
        return True
    ch = ch.strip()
    if not ch:
        return True
    # placeholders like '??'
    if '?' in ch:
        return True
    # If fully ASCII, likely English
    if ASCII_RE.match(ch):
        # If it's exactly same as english word (case-insensitive), treat as missing
        if english_hint and ch.lower() == english_hint.strip().lower():
            return True
        # Otherwise, still treat missing to enforce Chinese text
        return True
    return False


def translate_phrase_tokens(phrase: str, en_to_zh: Dict[str, str]) -> str:
    # Tokenize by spaces and punctuation, translate word tokens when possible, keep punctuation
    if not phrase:
        return ''
    tokens = re.findall(r"[A-Za-z']+|\d+|[^A-Za-z\d\s]", phrase)
    out: List[str] = []
    for t in tokens:
        if re.match(r"[A-Za-z']+$", t):
            zh = en_to_zh.get(t.lower())
            out.append(zh if zh else t)
        else:
            out.append(t)
    # Join with no extra spaces for punctuation
    res = ''
    prev_alnum = False
    for t in out:
        cur_alnum = bool(re.match(r"[\w\u4e00-\u9fff]", t))
        if res and prev_alnum and cur_alnum:
            res += ' '
        res += t
        prev_alnum = cur_alnum
    return res


def backup_file(path: str) -> Optional[str]:
    if not os.path.exists(path):
        return None
    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = f"{os.path.splitext(path)[0]}.backup.{ts}.json"
    shutil.copy2(path, backup_path)
    return backup_path


def process_image_links_with_web(en_to_zh: Dict[str, str], en_to_phrase: Dict[str, Tuple[str, str]], enable_web: bool = True) -> Tuple[int, int, int]:
    """Process minecraft_image_links.json with optional web translation fallback."""
    data = safe_read_json(IMAGE_LINKS_PATH)
    if not data:
        print('No data found in minecraft_image_links.json')
        return 0, 0, 0

    updated_ch = 0
    updated_phrase_tr = 0
    web_translations = 0

    print(f"Processing {len(data)} entries...")
    
    for i, item in enumerate(data):
        if i % 100 == 0:
            print(f"Progress: {i}/{len(data)}")
            
        word = (item.get('word') or '').strip()
        std = (item.get('standardized') or '').strip()
        ch = item.get('chinese')
        phrase = (item.get('phrase') or '').strip()
        phrase_tr = item.get('phraseTranslation')

        # Chinese translation
        if chinese_missing(ch, word):
            # Try local mappings first
            zh = en_to_zh.get(word.lower()) or en_to_zh.get(std.lower())
            if zh:
                item['chinese'] = zh
                updated_ch += 1
            elif enable_web:
                # Try web translation as fallback
                web_zh = get_minecraft_wiki_translation(word) or get_minecraft_wiki_translation(std)
                if web_zh:
                    item['chinese'] = web_zh
                    updated_ch += 1
                    web_translations += 1
                    # Also add to local cache for phrase translation
                    en_to_zh[word.lower()] = web_zh
                    
        # phraseTranslation
        if chinese_missing(phrase_tr):
            # Prefer mapped phrase pair
            pair = en_to_phrase.get(word.lower()) or en_to_phrase.get(std.lower())
            if pair:
                if not phrase:
                    item['phrase'] = pair[0]
                item['phraseTranslation'] = pair[1]
                updated_phrase_tr += 1
            else:
                # if phrase exists, translate tokens
                if phrase:
                    tr = translate_phrase_tokens(phrase, en_to_zh)
                    if tr and tr != phrase:
                        item['phraseTranslation'] = tr
                        updated_phrase_tr += 1

        # Ensure required keys exist
        item.setdefault('phonetic', '')
        item.setdefault('difficulty', 'basic')
        item.setdefault('category', '')
        item.setdefault('imageURLs', item.get('imageURLs') or [])

    # Backup and write back
    backup_path = backup_file(IMAGE_LINKS_PATH)
    with open(IMAGE_LINKS_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"minecraft_image_links.json updated:")
    print(f"  Chinese filled: {updated_ch} (web: {web_translations})")
    print(f"  phraseTranslation filled: {updated_phrase_tr}")
    print(f"  Backup: {backup_path}")
    
    return updated_ch, updated_phrase_tr, web_translations


def normalize_category_from_heading(h: str) -> str:
    # Extract English in parentheses if present
    m = re.search(r'\(([^)]+)\)', h)
    if m:
        cat = m.group(1)
    else:
        # Remove emojis and Chinese
        cat = h
    cat = cat.strip().lower()
    cat = re.sub(r'[^a-z0-9]+', '_', cat).strip('_')
    return cat or 'general'


def parse_md_tables(md_path: str) -> List[dict]:
    if not os.path.exists(md_path):
        return []
    entries: List[dict] = []
    current_category = 'general'

    with open(md_path, 'r', encoding='utf-8') as f:
        for raw in f:
            line = raw.rstrip('\n')
            # Heading updates category
            if line.startswith('## '):
                current_category = normalize_category_from_heading(line[3:].strip())
                continue
            # Skip table headers and separators
            if re.match(r'^\|?\s*[-|: ]+\s*$', line):
                continue
            if '|' not in line:
                continue
            # Parse table rows
            l = line
            if not l.strip().startswith('|'):
                l = '|' + l
            if not l.strip().endswith('|'):
                l = l + '|'
            cols = [c.strip() for c in l.split('|')[1:-1]]
            if len(cols) < 3:
                continue
            icon_cell, en_cell, zh_cell = cols[0], cols[1], cols[2]
            ex_cell = cols[3] if len(cols) >= 4 else ''

            # Extract image url
            img_url = ''
            m = IMG_MD_RE.search(icon_cell)
            if m:
                img_url = m.group(1)
            
            word = en_cell.strip()
            standardized = word
            chinese = zh_cell.strip()

            # Phrase and translation
            phrase_en = ''
            phrase_zh = ''
            if ex_cell:
                phrase_en = ex_cell
                m2 = PAREN_ZH_RE.search(ex_cell)
                if m2:
                    phrase_zh = m2.group(1).strip()
                    phrase_en = PAREN_ZH_RE.sub('', phrase_en).strip()
            else:
                phrase_en = word
                phrase_zh = chinese

            imageURLs = []
            if img_url:
                filename = os.path.basename(img_url.split('?')[0])
                imageURLs.append({
                    'filename': filename,
                    'url': img_url,
                    'type': 'Default'
                })

            entries.append({
                'word': word,
                'standardized': standardized,
                'chinese': chinese,
                'phonetic': '',
                'phrase': phrase_en,
                'phraseTranslation': phrase_zh,
                'difficulty': 'basic',
                'category': current_category,
                'imageURLs': imageURLs
            })

    return entries


def save_json(path: str, data: List[dict]):
    # Ensure output directory exists
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def main():
    print("Enhanced Minecraft vocabulary processor starting...")
    
    # Build local mappings
    print("Building local mappings...")
    en_to_zh, en_to_phrase = build_local_mappings()
    print(f"Local mappings: {len(en_to_zh)} translations, {len(en_to_phrase)} phrases")

    # 1) Process minecraft_image_links.json with web fallback
    if os.path.exists(IMAGE_LINKS_PATH):
        print("\nProcessing minecraft_image_links.json with web translation fallback...")
        process_image_links_with_web(en_to_zh, en_to_phrase, enable_web=True)
    else:
        print('minecraft_image_links.json not found, skip.')

    # 2) Convert markdown files to Words2 directory
    print(f"\nConverting markdown files to {OUTPUT_DIR}...")
    
    # Process communication vocab
    comm_md = os.path.join(BASE_DIR, 'minecraft_communication_vocab.md')
    if os.path.exists(comm_md):
        comm_entries = parse_md_tables(comm_md)
        if comm_entries:
            comm_out = os.path.join(OUTPUT_DIR, 'minecraft_communication_vocab.json')
            save_json(comm_out, comm_entries)
            print(f"Generated {comm_out} with {len(comm_entries)} entries.")
    
    # Process kindergarten vocab
    kinder_md = os.path.join(BASE_DIR, 'kindergarten_vocabulary.md')
    if os.path.exists(kinder_md):
        kinder_entries = parse_md_tables(kinder_md)
        if kinder_entries:
            kinder_out = os.path.join(OUTPUT_DIR, 'kindergarten_vocabulary.json')
            save_json(kinder_out, kinder_entries)
            print(f"Generated {kinder_out} with {len(kinder_entries)} entries.")
    
    # Look for minecraft_vocabulary.md
    vocab_md = os.path.join(BASE_DIR, 'minecraft_vocabulary.md')
    if os.path.exists(vocab_md):
        vocab_entries = parse_md_tables(vocab_md)
        if vocab_entries:
            vocab_out = os.path.join(OUTPUT_DIR, 'minecraft_vocabulary.json')
            save_json(vocab_out, vocab_entries)
            print(f"Generated {vocab_out} with {len(vocab_entries)} entries.")
    else:
        print("minecraft_vocabulary.md not found in current directory.")
    
    print("\nProcessing completed!")
    print(f"Web translation cache: {len([k for k, v in web_translation_cache.items() if v])} successful translations")


if __name__ == '__main__':
    main()