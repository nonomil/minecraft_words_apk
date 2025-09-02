# -*- coding: utf-8 -*-
import json
import os
from pathlib import Path
import re

def sanitize_filename(filename):
    name = Path(filename).stem
    name = re.sub(r'[^a-zA-Z0-9_]', '_', name)
    if name[0].isdigit():
        name = 'vocab_' + name
    return name.upper()

def create_js_file(data, filename, variable_name, category):
    js_content = f"""// {category} - {filename}
const {variable_name} = {json.dumps(data, ensure_ascii=False, indent=2)};

// Export vocabulary data
if (typeof module !== 'undefined' && module.exports) {{
  module.exports = {variable_name};
}} else if (typeof window !== 'undefined') {{
  window.{variable_name} = {variable_name};
}}
"""
    return js_content

def process_directory(source_dir, target_dir, category):
    source_path = Path(source_dir)
    target_path = Path(target_dir)
    
    target_path.mkdir(parents=True, exist_ok=True)
    
    mappings = []
    
    for json_file in source_path.glob('*.json'):
        print(f"Processing: {json_file.name}")
        
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            variable_name = sanitize_filename(json_file.name)
            js_filename = json_file.stem + '.js'
            
            js_content = create_js_file(data, json_file.name, variable_name, category)
            
            js_file_path = target_path / js_filename
            with open(js_file_path, 'w', encoding='utf-8') as f:
                f.write(js_content)
            
            mappings.append({
                'original_name': json_file.stem,
                'js_file': js_filename,
                'variable_name': variable_name,
                'word_count': len(data) if isinstance(data, list) else 0
            })
            
            print(f"  -> Created: {js_filename} ({len(data) if isinstance(data, list) else 0} words)")
            
        except Exception as e:
            print(f"  -> Error processing {json_file.name}: {e}")
    
    return mappings

def main():
    directories = [
        {
            'source': 'Word-kindergarden',
            'category': 'Kindergarten'
        },
        {
            'source': 'Word-Minecraft-standard',
            'category': 'Minecraft_Standard'
        },
        {
            'source': 'Words-Minecraft-simple',
            'category': 'Minecraft_Simple'
        }
    ]
    
    target_dir = 'vocabularies'
    all_mappings = {}
    
    print("Starting JSON to JS conversion...\n")
    
    for dir_info in directories:
        source_dir = dir_info['source']
        category = dir_info['category']
        
        print(f"Processing directory: {source_dir}")
        
        if os.path.exists(source_dir):
            mappings = process_directory(source_dir, target_dir, category)
            all_mappings[category] = mappings
        else:
            print(f"  -> Directory not found: {source_dir}")
        
        print()
    
    config_content = f"""// Vocabulary file mappings
// Auto-generated, do not edit manually

const VOCABULARY_MAPPINGS = {json.dumps(all_mappings, ensure_ascii=False, indent=2)};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {{
  module.exports = VOCABULARY_MAPPINGS;
}} else if (typeof window !== 'undefined') {{
  window.VOCABULARY_MAPPINGS = VOCABULARY_MAPPINGS;
}}
"""
    
    config_file = Path(target_dir) / 'mappings.js'
    with open(config_file, 'w', encoding='utf-8') as f:
        f.write(config_content)
    
    print(f"Conversion completed!")
    print(f"Files saved in: {target_dir}/")
    print(f"Mapping config: {config_file}")
    
    total_files = sum(len(mappings) for mappings in all_mappings.values())
    total_words = sum(mapping['word_count'] for mappings in all_mappings.values() for mapping in mappings)
    
    print(f"\nStatistics:")
    print(f"- Converted files: {total_files}")
    print(f"- Total words: {total_words}")
    
    for category, mappings in all_mappings.items():
        print(f"- {category}: {len(mappings)} files")

if __name__ == "__main__":
    main()