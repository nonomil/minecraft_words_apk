# -*- coding: utf-8 -*-
import json
import os

def merge_minecraft_vocabulary():
    """Merge minecraft vocabulary files"""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    minecraft_dir = os.path.join(base_dir, 'minecraft_vocabulary')
    
    # Read three minecraft vocabulary files
    files = [
        'minecraft_basic.json',
        'minecraft_intermediate.json', 
        'minecraft_advanced.json'
    ]
    
    merged_data = []
    
    for file in files:
        file_path = os.path.join(minecraft_dir, file)
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                merged_data.extend(data)
                print(f"Merged {file}: {len(data)} words")
    
    # Save merged file to root directory
    output_path = os.path.join(base_dir, 'minecraft_vocabulary.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(merged_data, f, ensure_ascii=False, indent=2)
    
    print(f"Merge completed! Total {len(merged_data)} minecraft words saved to minecraft_vocabulary.json")
    return len(merged_data)

if __name__ == '__main__':
    merge_minecraft_vocabulary()