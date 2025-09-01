# -*- coding: utf-8 -*-
"""
Process and enrich Minecraft vocabulary datasets.
Tasks:
1) Update minecraft_image_links.json by filling chinese and phraseTranslation using local mappings
2) Convert minecraft_communication_vocab.md (and optionally kindergarten_vocabulary.md if needed) into JSON aligned to minecraft_basic.json format

Decisions based on user confirmation:
- Full processing of minecraft_image_links.json
- Keep existing 'standardized' values as-is (no renaming in this pass)
- Align fields to minecraft_basic.json (word, standardized, chinese, phonetic, phrase, phraseTranslation, difficulty, category, imageURLs)
- Phrase style: prefer real in-game collocations if available from local JSONs; otherwise reuse existing phrase, and translate tokens
- Backup original JSON with timestamp suffix before overwrite
- Translation standard: prefer local mappings; no online fetch in this script
"""
import json
import os
import re
import shutil
from datetime import datetime
from typing import Dict, List, Tuple, Optional

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Files
IMAGE_LINKS_PATH = os.path.join(BASE_DIR, 'minecraft_image_links.json')
BASIC_JSON = os.path.join(BASE_DIR, 'minecraft_basic.json')
INTERMEDIATE_JSON = os.path.join(BASE_DIR, 'minecraft_intermediate.json')
ADVANCED_JSON = os.path.join(BASE_DIR, 'minecraft_advanced.json')
COMMON_JSON = os.path.join(BASE_DIR, 'common_vocabulary.json')
TXT_MAPPING = os.path.join(BASE_DIR, 'minecraft_vocabulary_with_images_and_chinese.txt')

COMMUNICATION_MD = os.path.join(BASE_DIR, 'minecraft_communication_vocab.md')
COMMUNICATION_JSON_OUT = os.path.join(BASE_DIR, 'minecraft_communication_vocab.json')

# Optional (already exists in repo, we won't overwrite if present)
KINDER_MD = os.path.join(BASE_DIR, 'kindergarten_vocabulary.md')
KINDER_JSON_OUT = os.path.join(BASE_DIR, 'kindergarten_vocabulary.json')

# Utility
ASCII_RE = re.compile(r'^[\x00-\x7F]+$')
PAREN_ZH_RE = re.compile(r'\(([^()]*[\u4e00-\u9fff][^()]*)\)')  # Chinese text inside parentheses
IMG_MD_RE = re.compile(r'!\[[^\]]*\]\(([^)]+)\)')

# Avoid non-ASCII literals in source to prevent encoding issues on Windows
LABEL_STD = '\u6807\u51c6\u5316\u540d\u79f0'      # 标准化名称
LABEL_ZH = '\u4e2d\u6587\u7ffb\u8bd1'              # 中文翻译
LABEL_IMG = '\u56fe\u7247\u94fe\u63a5'            # 图片链接


def safe_read_json(path: str) -> List[dict]:
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def build_local_mappings() -> Tuple[Dict[str, str], Dict[str, Tuple[str, str]]]:
    """Build mappings:
    - en_to_zh: english(lower) -> chinese
    - en_to_phrase: english(lower) -> (phrase, phraseTranslation)
    Merge from basic/intermediate/advanced/common jsons and the txt mapping file.
    Map both 'word' and 'standardized'.
    """
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
                # New word header (non-indented, no colon, not starting with '图片链接')
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
            # flush last block without trailing blank
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
    # Join with no extra spaces for punctuation; simple heuristic: add space between alnum sequences
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


def process_image_links(en_to_zh: Dict[str, str], en_to_phrase: Dict[str, Tuple[str, str]]) -> Tuple[int, int]:
    data = safe_read_json(IMAGE_LINKS_PATH)
    if not data:
        print('No data found in minecraft_image_links.json')
        return 0, 0

    updated_ch = 0
    updated_phrase_tr = 0

    for item in data:
        word = (item.get('word') or '').strip()
        std = (item.get('standardized') or '').strip()
        ch = item.get('chinese')
        phrase = (item.get('phrase') or '').strip()
        phrase_tr = item.get('phraseTranslation')

        # Chinese
        if chinese_missing(ch, word):
            # Try mappings by word, then standardized
            zh = en_to_zh.get(word.lower()) or en_to_zh.get(std.lower())
            if zh:
                item['chinese'] = zh
                updated_ch += 1
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

        # Ensure required keys exist and align to format
        item.setdefault('phonetic', '')
        item.setdefault('difficulty', 'basic')
        item.setdefault('category', '')
        item.setdefault('imageURLs', item.get('imageURLs') or [])

    # Backup and write back
    backup_path = backup_file(IMAGE_LINKS_PATH)
    with open(IMAGE_LINKS_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"minecraft_image_links.json updated. Chinese filled: {updated_ch}, phraseTranslation filled: {updated_phrase_tr}. Backup: {backup_path}")
    return updated_ch, updated_phrase_tr


# Markdown conversion utilities

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
            # Attempt to parse table-like rows (3 or 4 columns): icon | en | zh | example(optional)
            # Normalize: ensure starts and ends with '|'
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
            # Word/Standardized
            word = en_cell.strip()
            standardized = word
            chinese = zh_cell.strip()

            # Phrase and translation
            phrase_en = ''
            phrase_zh = ''
            if ex_cell:
                # Try to split: English sentence with Chinese in parentheses
                phrase_en = ex_cell
                m2 = PAREN_ZH_RE.search(ex_cell)
                if m2:
                    phrase_zh = m2.group(1).strip()
                    # Remove the (中文) part from phrase_en
                    phrase_en = PAREN_ZH_RE.sub('', phrase_en).strip()
            else:
                # Use the en/zh columns as phrase if they're multi-word expressions
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
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def main():
    en_to_zh, en_to_phrase = build_local_mappings()

    # 1) Process minecraft_image_links.json
    if os.path.exists(IMAGE_LINKS_PATH):
        process_image_links(en_to_zh, en_to_phrase)
    else:
        print('minecraft_image_links.json not found, skip.')

    # 2) Convert minecraft_communication_vocab.md -> json
    if os.path.exists(COMMUNICATION_MD):
        comm_entries = parse_md_tables(COMMUNICATION_MD)
        if comm_entries:
            save_json(COMMUNICATION_JSON_OUT, comm_entries)
            print(f"Generated {COMMUNICATION_JSON_OUT} with {len(comm_entries)} entries.")
        else:
            print('No entries parsed from minecraft_communication_vocab.md')
    else:
        print('minecraft_communication_vocab.md not found, skip conversion.')

    # 3) Optionally convert kindergarten_vocabulary.md if JSON not present
    if os.path.exists(KINDER_MD) and not os.path.exists(KINDER_JSON_OUT):
        kinder_entries = parse_md_tables(KINDER_MD)
        if kinder_entries:
            save_json(KINDER_JSON_OUT, kinder_entries)
            print(f"Generated {KINDER_JSON_OUT} with {len(kinder_entries)} entries.")


if __name__ == '__main__':
    main()