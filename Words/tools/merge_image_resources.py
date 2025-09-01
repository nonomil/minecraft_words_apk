# -*- coding: utf-8 -*-
import json
import os

def merge_image_resources():
    """Merge image resource files"""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    image_dir = os.path.join(base_dir, 'image_resources')
    
    # Read image resource files
    files = [
        'minecraft_image_links.json',
        'minecraft_image_links_A_F.json',
        'minecraft_image_links_G_M.json',
        'minecraft_image_links_N_S.json',
        'minecraft_image_links_T_Z.json'
    ]
    
    merged_data = []
    
    for file in files:
        file_path = os.path.join(image_dir, file)
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if isinstance(data, list):
                    merged_data.extend(data)
                    print(f"Merged {file}: {len(data)} items")
                else:
                    print(f"Skipped {file}: not a list format")
    
    # Remove duplicates based on word field
    seen_words = set()
    unique_data = []
    for item in merged_data:
        if isinstance(item, dict) and 'word' in item:
            word = item['word']
            if word not in seen_words:
                seen_words.add(word)
                unique_data.append(item)
    
    # Save merged file to root directory
    output_path = os.path.join(base_dir, 'image_resources.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(unique_data, f, ensure_ascii=False, indent=2)
    
    print(f"Merge completed! Total {len(unique_data)} unique image resources saved to image_resources.json")
    return len(unique_data)

if __name__ == '__main__':
    merge_image_resources()