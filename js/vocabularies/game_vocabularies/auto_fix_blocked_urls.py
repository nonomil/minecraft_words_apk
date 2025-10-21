#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动修复被阻止的URL
将Fandom等被阻止的链接替换为Twemoji CDN链接
"""

import os
import json
import re
import argparse
from collections import defaultdict

class URLAutoFixer:
    def __init__(self, base_dir):
        self.base_dir = base_dir
        self.fix_suggestions_file = os.path.join(base_dir, 'url_fix_suggestions.json')
        self.backup_dir = os.path.join(base_dir, 'backups')
        
    def load_fix_suggestions(self):
        """加载修复建议"""
        if not os.path.exists(self.fix_suggestions_file):
            print(f"[AutoFix] 修复建议文件不存在: {self.fix_suggestions_file}")
            return []
            
        with open(self.fix_suggestions_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def create_backup(self, file_path):
        """创建文件备份"""
        if not os.path.exists(self.backup_dir):
            os.makedirs(self.backup_dir)
            
        backup_name = os.path.basename(file_path) + '.backup'
        backup_path = os.path.join(self.backup_dir, backup_name)
        
        with open(file_path, 'r', encoding='utf-8') as src:
            with open(backup_path, 'w', encoding='utf-8') as dst:
                dst.write(src.read())
                
        return backup_path
    
    def fix_file(self, file_path, url_replacements, dry_run=False):
        """修复单个文件中的URL"""
        full_path = os.path.join(self.base_dir, file_path)
        
        if not os.path.exists(full_path):
            print(f"[AutoFix] 文件不存在: {full_path}")
            return False
            
        # 读取文件内容
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 计算将要替换的数量
        replacements_planned = 0
        for old_url, new_url in url_replacements.items():
            if old_url in content:
                replacements_planned += 1
                new_host = os.path.basename(new_url) if new_url.startswith('http') else new_url
                print(f"[AutoFix] 计划替换: {old_url} -> {new_url}")
        
        if dry_run:
            if replacements_planned > 0:
                print(f"[AutoFix] DRY-RUN: {file_path} 将替换 {replacements_planned} 个URL (未写入，未备份)")
                return True
            else:
                print(f"[AutoFix] DRY-RUN: {file_path} 无需修复")
                return False
        
        # 创建备份
        backup_path = self.create_backup(full_path)
        print(f"[AutoFix] 已备份: {backup_path}")
        
        # 执行替换
        replacements_made = 0
        for old_url, new_url in url_replacements.items():
            if old_url in content:
                content = content.replace(old_url, new_url)
                replacements_made += 1
                # 输出更准确的目标标识
                dest = new_url
                print(f"[AutoFix] 替换: {old_url} -> {dest}")
        
        # 写回文件
        if replacements_made > 0:
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"[AutoFix] 已修复 {file_path}: {replacements_made} 个URL")
            return True
        else:
            print(f"[AutoFix] 无需修复: {file_path}")
            return False
    
    def run_auto_fix(self, statuses=None, dry_run=False):
        """运行自动修复"""
        statuses = statuses or ['blocked', 'not_found', 'variant_ok']
        print("[AutoFix] 开始自动修复URL...")
        print(f"[AutoFix] 过滤状态: {', '.join(statuses)}  | 模式: {'DRY-RUN' if dry_run else 'APPLY'}")
        
        # 加载修复建议
        suggestions = self.load_fix_suggestions()
        if not suggestions:
            print("[AutoFix] 没有找到修复建议")
            return
            
        # 按文件分组修复建议
        file_fixes = defaultdict(dict)
        
        for suggestion in suggestions:
            status = suggestion.get('status')
            if status not in statuses:
                continue
            
            original_url = suggestion.get('original_url')
            replacement_url = suggestion.get('suggested_replacement')
            affected_files = suggestion.get('affected_files', [])
            
            # 缺少替代链接则跳过
            if not original_url or not replacement_url:
                print(f"[AutoFix] 跳过（缺少替换信息）: {original_url}")
                continue
            
            for file_path in affected_files:
                file_fixes[file_path][original_url] = replacement_url
        
        print(f"[AutoFix] 需要修复 {len(file_fixes)} 个文件")
        
        # 逐文件执行修复
        fixed_files = 0
        total_replacements = 0
        
        for file_path, url_replacements in file_fixes.items():
            if self.fix_file(file_path, url_replacements, dry_run=dry_run):
                fixed_files += 1
                total_replacements += len(url_replacements)
        
        print(f"\n[AutoFix] 修复{'预览' if dry_run else '完成'}:")
        print(f"  📁 影响文件数: {fixed_files}")
        print(f"  🔗 替换URL数: {total_replacements}")
        if not dry_run:
            print(f"  💾 备份目录: {self.backup_dir}")
        
        return fixed_files > 0
    
    def preview_fixes(self, statuses=None):
        """预览将要进行的修复"""
        statuses = statuses or ['blocked', 'not_found', 'variant_ok']
        suggestions = self.load_fix_suggestions()
        if not suggestions:
            return 0
            
        print("[AutoFix] 修复预览:")
        print("=" * 60)
        
        count = 0
        for suggestion in suggestions:
            if suggestion.get('status') not in statuses:
                continue
            count += 1
            print(f"\n文件: {', '.join(suggestion.get('affected_files', []))}")
            print(f"原URL: {suggestion.get('original_url')}")
            print(f"新URL: {suggestion.get('suggested_replacement')}")
            print(f"问题: {suggestion.get('issue', '')}")
        
        print(f"\n总计需要修复 {count} 个URL（状态: {', '.join(statuses)}）")
        return count


def parse_statuses(s):
    if not s:
        return ['blocked', 'not_found', 'variant_ok']
    return [x.strip() for x in s.split(',') if x.strip()]


def main():
    parser = argparse.ArgumentParser(description='自动修复 URL（基于高级健康检查建议）')
    parser.add_argument('--statuses', type=str, default='blocked,not_found,variant_ok', help='要修复的状态，逗号分隔，如: blocked,not_found,variant_ok')
    parser.add_argument('--dry-run', action='store_true', help='仅预览更改，不写入文件、不创建备份')
    args = parser.parse_args()

    base_dir = os.path.dirname(os.path.abspath(__file__))
    fixer = URLAutoFixer(base_dir)
    statuses = parse_statuses(args.statuses)
    
    # 预览修复
    to_fix_count = fixer.preview_fixes(statuses=statuses)
    
    if to_fix_count > 0:
        if args.dry_run:
            print("\n[AutoFix] DRY-RUN 结束。若要实际执行修复，请去掉 --dry-run 标志。")
            return
        print("\n[AutoFix] 开始执行修复...")
        success = fixer.run_auto_fix(statuses=statuses, dry_run=False)
        
        if success:
            print("\n[AutoFix] ✅ 修复完成！建议重新运行健康检查验证结果。")
        else:
            print("\n[AutoFix] ❌ 修复失败或无需修复。")
    else:
        print("\n[AutoFix] 没有发现需要修复的URL。")

if __name__ == '__main__':
    main()