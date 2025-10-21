#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Wiki 图片迁移工具（方案B：外链优先 + 本地回退）
首批处理：Animal Crossing（Nookipedia 优先，Fandom 备选）与 Pokemon（Bulbapedia 优先，Fandom 备选）
- 从词库 JS 文件中读取条目（读取 word/standardized + imageURLs）
- 组装 Wiki 页面 URL，抓取页面的 og:image（直链）
- 校验可访问性；若失败则下载到本地 assets 并替换为相对路径
- 对原 JS 文件进行就地替换，保留原 filename/type，只更新 url 字段
注意：尽量保持实现简单健壮，避免复杂 AST 解析，采用行扫描与状态机替换。
"""

import os
import re
import sys
import time
import json
import shutil
import ssl
import argparse
from urllib.parse import quote
from urllib.request import urlopen, Request

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, '..', '..', '..'))
ASSETS_ROOT = os.path.join(PROJECT_ROOT, 'js', 'vocabularies', 'assets')
BACKUP_DIR = os.path.join(BASE_DIR, 'backups')

# 目标文件（首批）
AC_FILE = os.path.join(BASE_DIR, 'animal_crossing', 'animal_crossing_all_characters.js')
PK_FILE = os.path.join(BASE_DIR, 'pokemon', 'pokemon_basic.js')

# 网络请求配置
USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'
TIMEOUT = 12

# 允许的URL前缀（基本白名单，避免误替换为非图片）
IMAGE_EXTS = ('.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg')

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE


def ensure_dirs():
    os.makedirs(BACKUP_DIR, exist_ok=True)
    os.makedirs(ASSETS_ROOT, exist_ok=True)
    os.makedirs(os.path.join(ASSETS_ROOT, 'animal_crossing'), exist_ok=True)
    os.makedirs(os.path.join(ASSETS_ROOT, 'pokemon'), exist_ok=True)


def backup_file(path: str):
    os.makedirs(BACKUP_DIR, exist_ok=True)
    ts = time.strftime('%Y%m%d-%H%M%S')
    name = os.path.basename(path)
    backup_path = os.path.join(BACKUP_DIR, f'{name}.migrator_backup.{ts}')
    shutil.copy2(path, backup_path)
    return backup_path


def http_get(url: str, headers=None, allow_redirects=True):
    h = {'User-Agent': USER_AGENT}
    if headers:
        h.update(headers)
    req = Request(url, headers=h)
    with urlopen(req, timeout=TIMEOUT, context=ssl_ctx) as resp:
        data = resp.read()
        final_url = resp.geturl()
        return data, final_url


def try_fetch(url: str):
    try:
        data, final_url = http_get(url)
        return data.decode('utf-8', 'ignore'), final_url
    except Exception:
        return None, None


def try_fetch_bytes(url: str):
    try:
        data, final_url = http_get(url)
        return data, final_url
    except Exception:
        return None, None


def extract_og_image(html: str):
    if not html:
        return None
    m = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', html, re.I)
    if m:
        return m.group(1)
    m = re.search(r'<link[^>]+rel=["\']image_src["\'][^>]+href=["\']([^"\']+)["\']', html, re.I)
    if m:
        return m.group(1)
    return None


def to_title(name: str):
    # 将空格转为下划线并进行URL编码，保留常见标题字符
    title = (name or '').strip().replace(' ', '_')
    return quote(title, safe="()_.'-:%")


def build_wiki_candidates(game: str, name: str):
    title = to_title(name)
    urls = []
    if game == 'animal_crossing':
        # Nookipedia 优先，失败再 Fandom
        urls.append(f'https://nookipedia.com/wiki/{title}')
        urls.append(f'https://animalcrossing.fandom.com/wiki/{title}')
    elif game == 'pokemon':
        # Bulbapedia 优先（形如 Bulbasaur_(Pok%C3%A9mon)），失败再 Fandom
        pok = quote('Pokémon')  # Pok%C3%A9mon
        urls.append(f'https://bulbapedia.bulbagarden.net/wiki/{title}_({pok})')
        urls.append(f'https://pokemon.fandom.com/wiki/{title}')
    return urls


def resolve_image_url(game: str, name: str):
    for page in build_wiki_candidates(game, name):
        html, final_url = try_fetch(page)
        if not html:
            continue
        img = extract_og_image(html)
        if img and any(img.lower().split('?', 1)[0].endswith(ext) for ext in IMAGE_EXTS):
            return img
    return None


def download_to_local(game: str, name: str, img_url: str):
    if not img_url:
        return None
    data, final = try_fetch_bytes(img_url)
    if not data:
        return None
    # 推断扩展名
    ext = '.png'
    low = (final or img_url).lower().split('?', 1)[0]
    for e in IMAGE_EXTS:
        if low.endswith(e):
            ext = e
            break
    safe_name = re.sub(r'[^A-Za-z0-9_\-\.]+', '_', name.strip().replace(' ', '_'))
    rel_path = f'js/vocabularies/assets/{game}/{safe_name}{ext}'
    abs_path = os.path.join(PROJECT_ROOT, *rel_path.split('/'))
    with open(abs_path, 'wb') as f:
        f.write(data)
    return rel_path.replace('\\', '/')


def replace_urls_in_js(js_path: str, game: str, include_names=None, limit_count: int | None = None):
    backup_path = backup_file(js_path)
    print(f'[Backup] {js_path} -> {backup_path}')

    # 行扫描 + 状态机
    with open(js_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # 解析 include 集合
    include_set = None
    if include_names:
        if isinstance(include_names, str):
            include_set = set([n.strip() for n in include_names.split(',') if n.strip()])
        else:
            include_set = set(include_names)

    out_lines = []
    in_entry = False
    in_image = False
    replaced_for_entry = False
    current_word = None
    skip_entry = False
    no_more_replace = False
    replaced_total = 0

    def commit_replace(original_line: str, new_url: str):
        # 将当前行中的 "url": "..." 替换为新URL
        return re.sub(r'("url"\s*:\s*")[^"]+("\s*)', rf'\1{new_url}\2', original_line)

    for i, line in enumerate(lines):
        out = line
        # 捕捉 word/standardized
        m_word = re.search(r'"word"\s*:\s*"([^"]+)"', line)
        if m_word:
            in_entry = True
            replaced_for_entry = False
            current_word = m_word.group(1)
            skip_entry = (include_set is not None and current_word not in include_set)

        # 进入 imageURLs 阵列
        if in_entry and '"imageURLs"' in line and '[' in line:
            in_image = True

        if in_entry and in_image and (not replaced_for_entry) and '"url"' in line:
            if not skip_entry and not no_more_replace:
                name_for_lookup = current_word
                game_key = game
                img_url = resolve_image_url(game_key, name_for_lookup)
                if img_url:
                    out = commit_replace(line, img_url)
                    replaced_for_entry = True
                    replaced_total += 1
                    print(f'[Link] {name_for_lookup} -> {img_url}')
                    if limit_count is not None and replaced_total >= limit_count:
                        no_more_replace = True
                else:
                    print(f'[Skip] 未找到直链，保持原图: {name_for_lookup}')
            else:
                # 跳过本条目或达到上限，不替换
                pass

        # 离开 imageURLs 阵列（遇到 ]
        if in_entry and in_image and ']' in line:
            in_image = False
        # 离开条目（粗略：遇到 },）
        if in_entry and '},' in line:
            in_entry = False
            current_word = None
            skip_entry = False

        out_lines.append(out)

    with open(js_path, 'w', encoding='utf-8') as f:
        f.writelines(out_lines)

    return True


def main():
    ensure_dirs()

    parser = argparse.ArgumentParser(description='Wiki 图片迁移工具')
    parser.add_argument('--only', choices=['animal_crossing', 'pokemon'], help='只处理指定游戏')
    parser.add_argument('--include', help='仅处理这些名称（逗号分隔）')
    parser.add_argument('--limit', type=int, help='最多替换的条目数量')
    args = parser.parse_args()

    targets = [
        (AC_FILE, 'animal_crossing'),
        (PK_FILE, 'pokemon'),
    ]

    if args.only == 'animal_crossing':
        targets = [(AC_FILE, 'animal_crossing')]
    elif args.only == 'pokemon':
        targets = [(PK_FILE, 'pokemon')]

    results = []
    for path, game in targets:
        if not os.path.exists(path):
            print(f'[Warn] 文件不存在: {path}')
            continue
        ok = replace_urls_in_js(path, game, include_names=args.include, limit_count=args.limit)
        results.append((path, ok))

    print('\n[Summary]')
    for p, ok in results:
        print(f' - {os.path.basename(p)}: {"OK" if ok else "FAIL"}')

if __name__ == '__main__':
    main()