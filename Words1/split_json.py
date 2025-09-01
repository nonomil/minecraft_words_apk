# -*- coding: utf-8 -*-
import json

# Read original file
with open('minecraft_image_links.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Calculate split point (approximately half)
total_items = len(data)
split_point = total_items // 2

print(f"Total items: {total_items}")
print(f"Split point: {split_point}")

# Split data
first_half = data[:split_point]
second_half = data[split_point:]

# Write first file
with open('minecraft_image_links_part1.json', 'w', encoding='utf-8') as f:
    json.dump(first_half, f, ensure_ascii=False, indent=2)

# Write second file
with open('minecraft_image_links_part2.json', 'w', encoding='utf-8') as f:
    json.dump(second_half, f, ensure_ascii=False, indent=2)

print(f"Part 1: {len(first_half)} items")
print(f"Part 2: {len(second_half)} items")
print("Split completed!")