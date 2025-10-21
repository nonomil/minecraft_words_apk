import re, pathlib

# 读取文件
file_path = pathlib.Path('animal_crossing_all_characters.js')
content = file_path.read_text(encoding='utf-8')

# 使用正则表达式提取所有条目
pattern = r'(\{\s*"word":\s*"([^"]+)".*?(?:"imageURLs":\s*\[.*?\]\s*\}|\}))(?=,\s*\{|\s*\])'
matches = list(re.finditer(pattern, content, re.DOTALL))

print(f"找到 {len(matches)} 个条目")

# 按动物类型分组并计数
animal_counts = {}
for match in matches:
    animal = match.group(2)
    animal_counts[animal] = animal_counts.get(animal, 0) + 1

print("当前动物分布:")
for animal, count in sorted(animal_counts.items(), key=lambda x: x[1], reverse=True):
    if count > 1:
        print(f"  {animal}: {count}个")

# 合并规则：保留每个动物类型的前N个
keep_rules = {
    'Cat': 2,
    'Rabbit': 2,
    'Dog': 2,
    'Bear': 2,
    'Owl': 2,
    'Hedgehog': 2,
    'Raccoon': 2,
    'Wolf': 1,
    'Sheep': 1,
    'Horse': 1,
    'Duck': 1,
    'Chicken': 1,
    'Deer': 1,
    'Rhino': 1,
    'Cub': 1,
    'Octopus': 1,
    'Lion': 1,
}

# 构建新的内容
new_entries = []
seen_animals = {}

for match in matches:
    animal = match.group(2)
    entry = match.group(1)
    
    # 检查是否需要保留
    max_keep = keep_rules.get(animal, 1)
    current = seen_animals.get(animal, 0)
    
    if current < max_keep:
        new_entries.append(entry)
        seen_animals[animal] = current + 1

# 重建文件内容
header_end = content.find('[') + 1
footer_start = content.rfind(']')

new_content = (
    content[:header_end] + 
    '\n  ' + ',\n  '.join(new_entries) + '\n' +
    content[footer_start:]
)

# 清理格式
new_content = re.sub(r'\n\s*\n', '\n', new_content)

# 保存备份
backup_path = file_path.with_suffix('.js.backup_before_merge')
if not backup_path.exists():
    file_path.rename(backup_path)

# 写入新内容
file_path.write_text(new_content, encoding='utf-8')

print(f"\n合并完成!")
print(f"原条目数: {len(matches)}")
print(f"新条目数: {len(new_entries)}")
print(f"减少条目: {len(matches) - len(new_entries)}")

# 验证结果
final_matches = re.findall(r'"word":\s*"([^"]+)"', new_content)
final_counts = {}
for animal in final_matches:
    final_counts[animal] = final_counts.get(animal, 0) + 1

print("\n最终动物分布:")
for animal, count in sorted(final_counts.items()):
    print(f"  {animal}: {count}个")