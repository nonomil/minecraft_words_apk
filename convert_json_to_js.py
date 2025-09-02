import json
import os

def read_json_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None

def main():
    # Vocabulary files to convert
    vocab_files = {
        '1.???--????': 'Word-?????/1.???--????.json',
        '2.???--????': 'Word-?????/2.???--????.json', 
        '3.???--????': 'Word-?????/3.???--????.json',
        '4.????': 'Word-?????/4.????.json',
        '5.????': 'Word-?????/5.????.json',
        '6.?????': 'Word-?????/6.?????.json'
    }
    
    js_additions = []
    
    for vocab_name, file_path in vocab_files.items():
        if os.path.exists(file_path):
            print(f"Processing: {file_path}")
            data = read_json_file(file_path)
            if data:
                js_content = f"\n// {vocab_name} vocabulary data\nVOCABULARY_DATA['{vocab_name}'] = {json.dumps(data, ensure_ascii=False, indent=2)};\n"
                js_additions.append(js_content)
                print(f"  - Successfully converted {len(data)} words")
            else:
                print(f"  - Skipped {file_path} (read failed)")
        else:
            print(f"File not found: {file_path}")
    
    # Read existing vocabulary-data.js file
    vocab_data_file = "js/vocabulary-data.js"
    
    if os.path.exists(vocab_data_file):
        with open(vocab_data_file, 'r', encoding='utf-8') as f:
            existing_content = f.read()
    else:
        existing_content = ""
    
    # Find position to insert new data
    console_log_pos = existing_content.rfind("console.log('Vocabulary data loaded successfully');")
    
    if console_log_pos != -1:
        new_content = existing_content[:console_log_pos] + '\n'.join(js_additions) + '\n\n' + existing_content[console_log_pos:]
    else:
        new_content = existing_content + '\n' + '\n'.join(js_additions)
    
    # Remove empty array definitions
    for vocab_name in vocab_files.keys():
        empty_line = f"VOCABULARY_DATA['{vocab_name}'] = [];"
        new_content = new_content.replace(empty_line, f"// {vocab_name} data will be defined below")
    
    # Write updated file
    with open(vocab_data_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"\nConversion completed! Updated {vocab_data_file}")
    print(f"Total processed {len(js_additions)} vocabulary files")

if __name__ == "__main__":
    main()