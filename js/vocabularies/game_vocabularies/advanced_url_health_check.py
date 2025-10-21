#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
高级图片URL健康检查脚本
专门检测防机器访问、403错误、超时等问题
并为有问题的链接提供Twemoji替代方案
"""

import os
import re
import json
import time
import requests
from urllib.parse import urlparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from collections import defaultdict

class AdvancedURLHealthChecker:
    def __init__(self, base_dir):
        self.base_dir = base_dir
        self.session = requests.Session()
        # 设置更真实的User-Agent
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })
        self.timeout = 10
        self.problematic_domains = set()
        self.url_status = {}
        
    def extract_urls_from_js_files(self):
        """从JS文件中提取所有图片URL"""
        url_sources = defaultdict(list)
        js_files = []
        
        for root, dirs, files in os.walk(self.base_dir):
            for file in files:
                if file.endswith('.js') and not file.startswith('.'):
                    js_files.append(os.path.join(root, file))
        
        print(f"[AdvancedCheck] 扫描到 {len(js_files)} 个JS文件")
        
        for js_file in js_files:
            try:
                with open(js_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # 提取imageURLs数组中的URL
                url_pattern = r'"url"\s*:\s*"([^"]+)"'
                urls = re.findall(url_pattern, content)
                
                # 也提取直接的imageURLs数组
                direct_pattern = r'imageURLs\s*:\s*\[\s*"([^"]+)"'
                direct_urls = re.findall(direct_pattern, content)
                
                all_urls = urls + direct_urls
                
                for url in all_urls:
                    if url.startswith('http'):
                        url_sources[url].append(os.path.relpath(js_file, self.base_dir))
                        
            except Exception as e:
                print(f"[AdvancedCheck] 读取文件失败 {js_file}: {e}")
                
        return url_sources
    
    def check_url_health(self, url):
        """检查单个URL的健康状态"""
        try:
            response = self.session.head(url, timeout=self.timeout, allow_redirects=True)
            status_code = response.status_code

            # 某些站点对 HEAD 不友好，尝试 GET 兜底
            if status_code != 200:
                try:
                    get_resp = self.session.get(url, timeout=self.timeout, allow_redirects=True)
                    if get_resp.status_code == 200:
                        return {'url': url, 'status': 'healthy', 'code': 200}
                    else:
                        status_code = get_resp.status_code
                except Exception:
                    pass

            if status_code == 200:
                return {'url': url, 'status': 'healthy', 'code': status_code}
            elif status_code in (403, 404):
                # 对 MediaWiki 风格链接尝试 FilePath/Redirect 变体
                variants = self.probe_mediawiki_variants(url)
                for v_url in variants:
                    try:
                        v_head = self.session.head(v_url, timeout=self.timeout, allow_redirects=True)
                        if v_head.status_code == 200:
                            return {'url': url, 'status': 'variant_ok', 'code': 200, 'resolved_url': v_url}
                        # HEAD 不友好再试 GET
                        v_get = self.session.get(v_url, timeout=self.timeout, allow_redirects=True)
                        if v_get.status_code == 200:
                            return {'url': url, 'status': 'variant_ok', 'code': 200, 'resolved_url': v_url}
                    except Exception:
                        continue
                return {'url': url, 'status': 'blocked' if status_code == 403 else 'not_found', 'code': status_code, 'issue': 'Access Forbidden - 可能防机器访问' if status_code == 403 else 'Resource Not Found'}
            elif status_code in [429, 503]:
                return {'url': url, 'status': 'rate_limited', 'code': status_code, 'issue': 'Rate Limited or Service Unavailable'}
            else:
                return {'url': url, 'status': 'error', 'code': status_code, 'issue': f'HTTP {status_code}'}

        except requests.exceptions.Timeout:
            return {'url': url, 'status': 'timeout', 'issue': 'Request Timeout'}
        except requests.exceptions.ConnectionError:
            return {'url': url, 'status': 'connection_error', 'issue': 'Connection Failed'}
        except Exception as e:
            return {'url': url, 'status': 'unknown_error', 'issue': str(e)}

    def generate_twemoji_alternative(self, original_url, context_info):
        """为有问题的URL生成Twemoji替代方案"""
        # 基于文件名或上下文推断合适的emoji
        url_lower = original_url.lower()

        # Animal Crossing角色映射
        if 'tom_nook' in url_lower or 'tom-nook' in url_lower:
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f99d.svg'  # 🦝 raccoon
        elif 'isabelle' in url_lower:
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f436.svg'  # 🐶 dog
        elif 'blathers' in url_lower or 'celeste' in url_lower:
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f989.svg'  # 🦉 owl
        elif 'kk' in url_lower or 'slider' in url_lower:
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f3b5.svg'  # 🎵 music
        elif any(name in url_lower for name in ['mabel', 'sable', 'label']):
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f994.svg'  # 🦔 hedgehog
        elif any(name in url_lower for name in ['timmy', 'tommy']):
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f99d.svg'  # 🦝 raccoon
        elif 'gulliver' in url_lower:
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f54a.svg'  # 🕊️ dove (closest to seagull)
        elif 'sahara' in url_lower:
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f42a.svg'  # 🐪 camel
        elif 'redd' in url_lower:
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f98a.svg'  # 🦊 fox
        elif 'flick' in url_lower:
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f98e.svg'  # 🦎 lizard
        elif 'pascal' in url_lower:
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f9a6.svg'  # 🦦 otter
        elif 'leif' in url_lower:
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f9a5.svg'  # 🦥 sloth
        elif 'kicks' in url_lower:
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f9a8.svg'  # 🦨 skunk
        
        # 通用动物类型
        elif any(animal in url_lower for animal in ['cat', 'feline']):
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f431.svg'  # 🐱 cat
        elif any(animal in url_lower for animal in ['dog', 'canine']):
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f436.svg'  # 🐶 dog
        elif any(animal in url_lower for animal in ['bear', 'cub']):
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f43b.svg'  # 🐻 bear
        elif any(animal in url_lower for animal in ['deer']):
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f98c.svg'  # 🦌 deer
        elif any(animal in url_lower for animal in ['wolf']):
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f43a.svg'  # 🐺 wolf
        elif any(animal in url_lower for animal in ['sheep', 'lamb']):
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f411.svg'  # 🐑 sheep
        elif any(animal in url_lower for animal in ['squirrel']):
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f43f.svg'  # 🐿️ squirrel
        elif any(animal in url_lower for animal in ['rhino']):
            return 'https://twemoji.maxcdn.com/v/latest/svg/1f98f.svg'  # 🦏 rhino
        
        # 默认通用图标
        return 'https://twemoji.maxcdn.com/v/latest/svg/1f3ae.svg'  # 🎮 game controller
    
    def run_health_check(self):
        """运行完整的健康检查"""
        print("[AdvancedCheck] 开始高级URL健康检查...")
        start_time = time.time()
        
        # 提取所有URL
        url_sources = self.extract_urls_from_js_files()
        unique_urls = list(url_sources.keys())
        
        print(f"[AdvancedCheck] 发现 {len(unique_urls)} 个唯一URL")
        
        # 并发检查URL健康状态
        results = []
        with ThreadPoolExecutor(max_workers=10) as executor:
            future_to_url = {executor.submit(self.check_url_health, url): url for url in unique_urls}
            
            for future in as_completed(future_to_url):
                result = future.result()
                results.append(result)
                
                # 实时显示进度
                if len(results) % 20 == 0:
                    print(f"[AdvancedCheck] 已检查 {len(results)}/{len(unique_urls)} 个URL")
        
        # 分析结果
        healthy_count = sum(1 for r in results if r['status'] == 'healthy')
        blocked_count = sum(1 for r in results if r['status'] == 'blocked')
        error_count = len(results) - healthy_count
        
        print(f"\n[AdvancedCheck] 检查完成:")
        print(f"  ✅ 健康: {healthy_count}")
        print(f"  🚫 被阻止: {blocked_count}")
        print(f"  ❌ 其他错误: {error_count - blocked_count}")
        
        # 生成详细报告
        self.generate_detailed_report(results, url_sources)
        
        # 生成修复建议
        if blocked_count > 0 or error_count > 0:
            self.generate_fix_suggestions(results, url_sources)
        
        elapsed = time.time() - start_time
        print(f"[AdvancedCheck] 总耗时: {elapsed:.2f}秒")
        
        return results
    
    def generate_detailed_report(self, results, url_sources):
        """生成详细报告"""
        report_path = os.path.join(self.base_dir, 'advanced_url_health_report.txt')
        
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write("高级URL健康检查报告\n")
            f.write("=" * 50 + "\n\n")
            
            # 按状态分组
            status_groups = defaultdict(list)
            for result in results:
                status_groups[result['status']].append(result)
            
            for status, items in status_groups.items():
                f.write(f"\n{status.upper()} ({len(items)} 个):\n")
                f.write("-" * 30 + "\n")
                
                for item in items:
                    f.write(f"URL: {item['url']}\n")
                    if 'code' in item:
                        f.write(f"状态码: {item['code']}\n")
                    if 'issue' in item:
                        f.write(f"问题: {item['issue']}\n")
                    
                    # 显示使用此URL的文件
                    files = url_sources.get(item['url'], [])
                    if files:
                        f.write(f"使用文件: {', '.join(files)}\n")
                    
                    f.write("\n")
        
        print(f"[AdvancedCheck] 详细报告已保存: {report_path}")
    
    def probe_mediawiki_variants(self, url: str):
        """针对 MediaWiki 风格链接，生成 FilePath/Redirect 直链变体"""
        variants = []
        try:
            m = re.match(r'^(https?://[^/]+)/wiki/File:([^?#]+)', url, flags=re.IGNORECASE)
            if m:
                base, file = m.group(1), m.group(2)
                variants.append(f"{base}/wiki/Special:FilePath/{file}")
                variants.append(f"{base}/wiki/Special:Redirect/file/{file}")
                return variants
            m2 = re.match(r'^(https?://[^/]+)/wiki/[^?]+\?file=([^&#]+)', url, flags=re.IGNORECASE)
            if m2:
                base, file = m2.group(1), m2.group(2)
                try:
                    file = requests.utils.unquote(file)
                except Exception:
                    pass
                variants.append(f"{base}/wiki/Special:FilePath/{file}")
                variants.append(f"{base}/wiki/Special:Redirect/file/{file}")
                return variants
        except Exception:
            pass
        return variants

    def is_url_ok(self, url: str) -> bool:
        """快速判断URL是否可访问，先HEAD再GET兜底"""
        try:
            r = self.session.head(url, timeout=self.timeout, allow_redirects=True)
            if r.status_code == 200:
                return True
            g = self.session.get(url, timeout=self.timeout, allow_redirects=True)
            return g.status_code == 200
        except Exception:
            return False

    def generate_fix_suggestions(self, results, url_sources):
        """生成修复建议"""
        fix_path = os.path.join(self.base_dir, 'url_fix_suggestions.json')

        suggestions = []

        for result in results:
            if result['status'] != 'healthy':
                url = result['url']
                files = url_sources.get(url, [])

                # 如果在检查阶段已找到可用变体，优先推荐该变体
                replacement = result.get('resolved_url')
                replacement_reason = 'MediaWiki FilePath/Redirect 直链更稳定'

                # 若未找到，且是 MediaWiki 风格，尝试现场探测变体
                if not replacement:
                    variants = self.probe_mediawiki_variants(url)
                    for v in variants:
                        if self.is_url_ok(v):
                            replacement = v
                            break

                # 若仍无可用变体，回退到 Twemoji 方案
                if not replacement:
                    replacement = self.generate_twemoji_alternative(url, {'files': files})
                    replacement_reason = 'Twemoji CDN - 稳定且无访问限制'

                suggestion = {
                    'original_url': url,
                    'status': result['status'],
                    'issue': result.get('issue', ''),
                    'affected_files': files,
                    'suggested_replacement': replacement,
                    'replacement_reason': replacement_reason
                }

                suggestions.append(suggestion)

        with open(fix_path, 'w', encoding='utf-8') as f:
            json.dump(suggestions, f, indent=2, ensure_ascii=False)

        print(f"[AdvancedCheck] 修复建议已保存: {fix_path}")
        print(f"[AdvancedCheck] 发现 {len(suggestions)} 个需要修复的URL")

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    checker = AdvancedURLHealthChecker(base_dir)
    checker.run_health_check()

if __name__ == '__main__':
    main()