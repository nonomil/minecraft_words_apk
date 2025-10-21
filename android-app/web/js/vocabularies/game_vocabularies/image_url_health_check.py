#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Image URL Health Check Script (local)
- Scans JS vocabulary files to extract imageURLs arrays
- Requests each URL and reports HTTP status
- No third-party dependencies (uses urllib), safe for Windows

Usage:
  python js/vocabularies/game_vocabularies/image_url_health_check.py [base_dir]

Default base_dir: js/vocabularies/game_vocabularies
Report file: js/vocabularies/game_vocabularies/image_url_health_report.txt
"""
import os
import re
import sys
import time
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_DIR_DEFAULT = os.path.join('js', 'vocabularies', 'game_vocabularies')
REPORT_PATH = os.path.join('js', 'vocabularies', 'game_vocabularies', 'image_url_health_report.txt')

# Regex to capture content of imageURLs: [ ... ] and then extract all quoted URLs
RE_BLOCK = re.compile(r'imageURLs\s*:\s*\[(.*?)\]', re.DOTALL)
RE_URL = re.compile(r'"(https?://[^"\s]+)"')


def extract_urls_from_js(js_text: str):
    urls = set()
    for block in RE_BLOCK.findall(js_text):
        for m in RE_URL.findall(block):
            urls.add(m.strip())
    return urls


def scan_js_files(base_dir: str):
    collected = []  # list of (file_path, set(urls))
    for root, _, files in os.walk(base_dir):
        for fname in files:
            if not fname.endswith('.js'):
                continue
            fpath = os.path.join(root, fname)
            try:
                with open(fpath, 'r', encoding='utf-8') as f:
                    text = f.read()
                urls = extract_urls_from_js(text)
                if urls:
                    collected.append((fpath, urls))
            except Exception:
                # Skip unreadable files but record in report later as empty
                collected.append((fpath, set()))
    return collected


def head_or_get(url: str, timeout: float = 6.0):
    # Try HEAD first, fallback to GET if needed
    try_get = False
    try:
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'URLHealthCheck/1.0'})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status, None
    except TypeError:
        try_get = True
    except urllib.error.HTTPError as e:
        if e.code in (403, 405):
            try_get = True
        else:
            return e.code, None
    except Exception as e:
        try_get = True

    if try_get:
        try:
            req = urllib.request.Request(
                url,
                method='GET',
                headers={
                    'User-Agent': 'URLHealthCheck/1.0',
                    'Range': 'bytes=0-0'
                }
            )
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.status, None
        except urllib.error.HTTPError as e:
            return e.code, None
        except Exception as e:
            return None, str(e)


def check_all(urls, max_workers=16):
    results = {}  # url -> (ok: bool, status: int|None, error: str|None)
    with ThreadPoolExecutor(max_workers=max_workers) as ex:
        fut_map = {ex.submit(head_or_get, url): url for url in urls}
        for fut in as_completed(fut_map):
            url = fut_map[fut]
            status = None
            err = None
            try:
                status, err = fut.result()
            except Exception as e:
                err = str(e)
            ok = (status is not None and 200 <= status < 400) and (err is None)
            results[url] = (ok, status, err)
    return results


def main():
    start = time.time()
    base_dir = sys.argv[1] if len(sys.argv) > 1 else BASE_DIR_DEFAULT
    if not os.path.isabs(base_dir):
        base_dir = os.path.join(os.getcwd(), base_dir)

    print(f"[HealthCheck] Scanning directory: {base_dir}")
    collected = scan_js_files(base_dir)

    all_urls = set()
    file_url_map = {}
    for fpath, urls in collected:
        if urls:
            file_url_map[fpath] = sorted(urls)
            all_urls.update(urls)

    print(f"[HealthCheck] JS files with imageURLs: {len(file_url_map)}")
    print(f"[HealthCheck] Unique URLs found: {len(all_urls)}")

    results = check_all(all_urls)

    ok_count = sum(1 for ok, _, _ in results.values() if ok)
    fail_items = [(u, res) for u, res in results.items() if not res[0]]

    # Build reverse map: url -> list(files)
    url_files = {}
    for fpath, urls in file_url_map.items():
        for u in urls:
            url_files.setdefault(u, []).append(fpath)

    lines = []
    lines.append("Image URL Health Check Report")
    lines.append(f"Scanned base directory: {base_dir}")
    lines.append(f"JS files with imageURLs: {len(file_url_map)}")
    lines.append(f"Unique URLs: {len(all_urls)}")
    lines.append(f"OK: {ok_count}  FAIL: {len(fail_items)}")
    lines.append("")

    if fail_items:
        lines.append("Failures:")
        for url, (ok, status, err) in sorted(fail_items, key=lambda x: (x[1][1] or 999, x[0])):
            files = "; ".join(url_files.get(url, []))
            lines.append(f"- {url}  status={status}  error={err or ''}")
            if files:
                lines.append(f"  in files: {files}")

    os.makedirs(os.path.dirname(REPORT_PATH), exist_ok=True)
    with open(REPORT_PATH, 'w', encoding='utf-8') as rep:
        rep.write("\n".join(lines))

    elapsed = time.time() - start
    print("[HealthCheck] Done in {:.2f}s. Report saved to {}".format(elapsed, REPORT_PATH))
    if fail_items:
        print("[HealthCheck] Some URLs failed. See report for details.")
    else:
        print("[HealthCheck] All URLs look healthy.")


if __name__ == '__main__':
    main()