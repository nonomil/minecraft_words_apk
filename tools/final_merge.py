import json
import os

def load_json_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return None

def extract_all_words(data):
    words = []
    if isinstance(data, list):
        if len(data) > 0 and isinstance(data[0], dict) and 'words' in data[0]:
            words.extend(data[0]['words'])
        else:
            for item in data:
                if isinstance(item, dict) and 'word' in item:
                    words.append(item)
    elif isinstance(data, dict) and 'words' in data:
        words.extend(data['words'])
    return words

def categorize_word_simple(word_entry, index):
    word = word_entry.get('word', '').lower()
    
    nature_keywords = [
        'cat', 'dog', 'bird', 'fish', 'lion', 'bear', 'rabbit', 'elephant', 'tiger', 'monkey',
        'cow', 'pig', 'duck', 'bee', 'ant', 'frog', 'deer', 'fox', 'goat', 'owl', 'crab', 
        'tree', 'flower', 'sun', 'moon', 'star', 'water', 'grass', 'fire', 'air', 'sea', 
        'sky', 'hill', 'farm', 'zoo', 'pet'
    ]
    
    learning_keywords = [
        'head', 'hand', 'foot', 'eye', 'nose', 'ear', 'mouth', 'face', 'hair', 'arm', 'leg',
        'apple', 'banana', 'bread', 'milk', 'cake', 'egg', 'ball', 'doll', 'car', 'toy',
        'shirt', 'shoes', 'hat', 'school', 'book', 'pen', 'desk', 'circle', 'square', 'triangle'
    ]
    
    if any(keyword in word for keyword in nature_keywords):
        return 'nature_animals'
    elif any(keyword in word for keyword in learning_keywords):
        return 'learning_objects'
    else:
        if index % 3 == 0:
            return 'basic_vocabulary'
        elif index % 3 == 1:
            return 'nature_animals'
        else:
            return 'learning_objects'

def process_all_words():
    files_to_process = [
        'kindergarten_basic_complete.json',
        'kindergarten_nature_complete.json',
        'kindergarten_objects_complete.json',
        'kindergarten_learning_complete.json',
        'kindergarten_basic_vocabulary.json',
        'kindergarten_body_objects.json',
        'kindergarten_learning_shapes.json',
        'kindergarten_nature_animals.json'
    ]
    
    all_words = []
    
    for filename in files_to_process:
        if os.path.exists(filename):
            print(f"Processing {filename}...")
            data = load_json_file(filename)
            if data:
                words = extract_all_words(data)
                print(f"  Found {len(words)} words")
                all_words.extend(words)
    
    print(f"\nTotal words collected: {len(all_words)}")
    
    categories = {
        'basic_vocabulary': [],
        'nature_animals': [],
        'learning_objects': []
    }
    
    for index, word_entry in enumerate(all_words):
        if isinstance(word_entry, dict) and 'word' in word_entry:
            minecraft_entry = {
                "word": word_entry.get('word', ''),
                "standardized": word_entry.get('standardized', word_entry.get('word', '')),
                "chinese": word_entry.get('chinese', ''),
                "phonetic": word_entry.get('phonetic', ''),
                "phrase": word_entry.get('phrase', ''),
                "phraseTranslation": word_entry.get('phraseTranslation', ''),
                "difficulty": word_entry.get('difficulty', 'basic'),
                "category": word_entry.get('category', 'general'),
                "imageURLs": word_entry.get('imageURLs', [])
            }
            
            target_category = categorize_word_simple(word_entry, index)
            categories[target_category].append(minecraft_entry)
    
    print(f"\nFinal distribution:")
    for category, words in categories.items():
        print(f"{category}: {len(words)} words")
    
    return categories

def save_final_files(categories):
    file_mapping = {
        'basic_vocabulary': 'kindergarten_basic_all.json',
        'nature_animals': 'kindergarten_nature_all.json',
        'learning_objects': 'kindergarten_learning_all.json'
    }
    
    for category, words in categories.items():
        filename = file_mapping[category]
        print(f"Saving {len(words)} words to {filename}")
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(words, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    print("Final merge of ALL kindergarten words...")
    print("Including ALL words without deduplication")
    print("=" * 50)
    
    categories = process_all_words()
    save_final_files(categories)
    
    total = sum(len(words) for words in categories.values())
    print(f"\n? Final merge complete!")
    print(f"Total words: {total}")
    print("Files created:")
    print("- kindergarten_basic_all.json")
    print("- kindergarten_nature_all.json")
    print("- kindergarten_learning_all.json")