#!/usr/bin/env python3
# 临时统计脚本 - 检查动物森友会词库状态
import re
import json

# 清理临时统计脚本
import os

try:
    os.remove(r'd:\WorkPlace\Html\MineCraft学单词游戏-v2\js\vocabularies\temp_stats.py')
    print("临时脚本已清理完成")
except FileNotFoundError:
    print("文件不存在，无需清理")

# 读取JS文件内容
with open(r'd:\WorkPlace\Html\MineCraft学单词游戏-v2\js\vocabularies\game_vocabularies\animal_crossing\animal_crossing_all_characters.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取所有词条
entries = re.findall(r'\{[^}]*"word"[^}]*\}', content, re.DOTALL)
words = []
categories = []

for entry in entries:
    # 提取词汇
    word_match = re.search(r'"word":\s*"([^"]+)"', entry)
    if word_match:
        words.append(word_match.group(1))
    
    # 提取分类
    cat_match = re.search(r'"category":\s*"([^"]+)"', entry)
    if cat_match:
        categories.append(cat_match.group(1))

from collections import Counter
word_count = Counter(words)
category_count = Counter(categories)

print('=== 动物森友会词库统计报告 ===')
print(f'总条目数: {len(entries)}')
print(f'唯一词汇数: {len(word_count)}')
print(f'重复条目数: {len(entries) - len(word_count)}')

print(f'\n=== 分类分布（前10） ===')
for cat, count in category_count.most_common(10):
    print(f'{cat}: {count} 个')

print(f'\n=== 重复词汇检查 ===')
duplicates = [(w, c) for w, c in word_count.items() if c > 1]
if duplicates:
    print(f'发现 {len(duplicates)} 个重复词汇:')
    for w, c in duplicates[:5]:  # 显示前5个
        print(f'  {w}: {c} 次')
else:
    print('✅ 未发现重复词汇 - 词库状态良好！')

# 检查文件完整性
print(f'\n=== 文件完整性检查 ===')
if 'const ANIMAL_CROSSING_ALL_CHARACTERS' in content:
    print('✅ 常量定义存在')
if content.strip().endswith('window.ANIMAL_CROSSING_ALL_CHARACTERS = ANIMAL_CROSSING_ALL_CHARACTERS;\n}'):
    print('✅ 文件结束标记正确')
if 'module.exports' in content:
    print('✅ 模块导出存在')

print(f'\n✅ 词库状态检查完成！')