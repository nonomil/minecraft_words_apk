# -*- coding: utf-8 -*-
import json
import os

def merge_daily_vocabulary():
    """Merge daily vocabulary files"""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    daily_dir = os.path.join(base_dir, 'daily_vocabulary')
    
    # Read daily vocabulary files
    files = [
        'common_vocabulary.json',
        'kindergarten_vocabulary.json'
    ]
    
    merged_data = []
    
    for file in files:
        file_path = os.path.join(daily_dir, file)
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                merged_data.extend(data)
                print(f"Merged {file}: {len(data)} words")
    
    # Save merged file to root directory
    output_path = os.path.join(base_dir, 'daily_vocabulary.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(merged_data, f, ensure_ascii=False, indent=2)
    
    print(f"Merge completed! Total {len(merged_data)} daily words saved to daily_vocabulary.json")
    return len(merged_data)

if __name__ == '__main__':
    merge_daily_vocabulary()