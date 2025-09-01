# -*- coding: utf-8 -*-
import json

# Read original file
with open('minecraft_3.\u5355\u8bcd\u6c47\u603b.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Calculate split points (divide into three parts)
total_items = len(data)
part_size = total_items // 3
remainder = total_items % 3

print(f"Total items: {total_items}")
print(f"Part size: {part_size}")
print(f"Remainder: {remainder}")

# Split data into three parts
# Distribute remainder items to first parts
first_end = part_size + (1 if remainder > 0 else 0)
second_end = first_end + part_size + (1 if remainder > 1 else 0)

first_part = data[:first_end]
second_part = data[first_end:second_end]
third_part = data[second_end:]

# Write three files
with open('minecraft_3.\u5355\u8bcd\u6c47\u603b_part1.json', 'w', encoding='utf-8') as f:
    json.dump(first_part, f, ensure_ascii=False, indent=2)

with open('minecraft_3.\u5355\u8bcd\u6c47\u603b_part2.json', 'w', encoding='utf-8') as f:
    json.dump(second_part, f, ensure_ascii=False, indent=2)

with open('minecraft_3.\u5355\u8bcd\u6c47\u603b_part3.json', 'w', encoding='utf-8') as f:
    json.dump(third_part, f, ensure_ascii=False, indent=2)

print(f"Part 1: {len(first_part)} items")
print(f"Part 2: {len(second_part)} items")
print(f"Part 3: {len(third_part)} items")
print("Split into three parts completed!")