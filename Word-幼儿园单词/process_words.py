# -*- coding: utf-8 -*-
import json
import os

def get_phonetic(word):
    phonetics = {
        'hello': '/h??lo?/', 'bye': '/ba?/', 'cat': '/k?t/', 'dog': '/d???/',
        'sun': '/s?n/', 'moon': '/mu?n/', 'one': '/w?n/', 'two': '/tu?/',
        'red': '/red/', 'blue': '/blu?/', 'big': '/b??/', 'small': '/sm??l/',
        'happy': '/?h?pi/', 'sad': '/s?d/', 'head': '/hed/', 'hand': '/h?nd/',
        'apple': '/??p?l/', 'ball': '/b??l/', 'home': '/ho?m/', 'school': '/sku?l/'
    }
    return phonetics.get(word.lower(), f'/{word.lower()}/')

def get_category(word):
    if word.lower() in ['one', 'two', 'three', 'four', 'five', 'red', 'blue', 'green', 'yellow']:
        return 'number_color', 'basic_vocabulary'
    elif word.lower() in ['cat', 'dog', 'bird', 'fish', 'bear', 'lion']:
        return 'animal', 'living_things'
    elif word.lower() in ['sun', 'moon', 'star', 'tree', 'flower']:
        return 'nature_element', 'living_things'
    elif word.lower() in ['head', 'hand', 'foot', 'eye', 'nose']:
        return 'body_part', 'body_objects'
    elif word.lower() in ['apple', 'banana', 'bread', 'milk']:
        return 'food_item', 'body_objects'
    elif word.lower() in ['ball', 'doll', 'car', 'toy']:
        return 'toy_item', 'body_objects'
    elif word.lower() in ['shirt', 'shoes', 'hat']:
        return 'clothing_item', 'body_objects'
    elif word.lower() in ['home', 'school', 'park']:
        return 'place', 'learning_shapes'
    elif word.lower() in ['circle', 'square', 'triangle']:
        return 'geometric_shape', 'learning_shapes'
    elif word.lower() in ['book', 'pen', 'desk']:
        return 'school_supply', 'learning_shapes'
    elif word.lower() in ['mother', 'father', 'family']:
        return 'family_member', 'basic_vocabulary'
    elif word.lower() in ['run', 'walk', 'jump', 'sit']:
        return 'action', 'basic_vocabulary'
    elif word.lower() in ['hello', 'bye', 'yes', 'no']:
        return 'greeting', 'basic_vocabulary'
    else:
        return 'general', 'basic_vocabulary'

def process_entry(entry):
    word = entry.get('english', '')
    chinese = entry.get('chinese', '')
    phrase = entry.get('englishPhrase', '')
    phrase_translation = entry.get('chinesePhrase', '')
    image_url = entry.get('unsplashUrl', 'https://images.unsplash.com/photo-1500000000000-000000000000?w=400')
    
    category, main_category = get_category(word)
    
    return {
        "word": word,
        "standardized": word,
        "chinese": chinese,
        "phonetic": get_phonetic(word),
        "phrase": phrase,
        "phraseTranslation": phrase_translation,
        "difficulty": "basic" if len(word) <= 5 else "intermediate",
        "category": category,
        "subcategory": main_category,
        "imageURLs": [{
            "filename": f"{word.lower()}.jpg",
            "url": image_url,
            "type": "Concept Image"
        }]
    }, main_category

def main():
    data_folders = ['data', 'data2']
    categorized_data = {
        'basic_vocabulary': [],
        'living_things': [],
        'body_objects': [],
        'learning_shapes': []
    }
    
    for folder in data_folders:
        if not os.path.exists(folder):
            continue
        for filename in os.listdir(folder):
            if filename.endswith('.json'):
                filepath = os.path.join(folder, filename)
                print(f"Processing {filepath}...")
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                    for entry in data:
                        if isinstance(entry, dict) and 'english' in entry:
                            processed_entry, main_category = process_entry(entry)
                            categorized_data[main_category].append(processed_entry)
                except Exception as e:
                    print(f"Error: {e}")
    
    # Save files
    file_mappings = {
        'basic_vocabulary': 'kindergarten_basic_complete.json',
        'living_things': 'kindergarten_nature_complete.json',
        'body_objects': 'kindergarten_objects_complete.json',
        'learning_shapes': 'kindergarten_learning_complete.json'
    }
    
    descriptions = {
        'basic_vocabulary': 'Basic kindergarten vocabulary',
        'living_things': 'Nature and animals vocabulary',
        'body_objects': 'Body parts and objects vocabulary',
        'learning_shapes': 'Learning and shapes vocabulary'
    }
    
    total_words = 0
    for category, words in categorized_data.items():
        if words:
            output_file = {
                "category": category,
                "description": descriptions[category],
                "totalWords": len(words),
                "words": words
            }
            filepath = file_mappings[category]
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(output_file, f, ensure_ascii=False, indent=2)
            print(f"Saved {len(words)} words to {filepath}")
            total_words += len(words)
    
    print(f"\nTotal processed: {total_words} words")
    print("Processing complete!")

if __name__ == "__main__":
    main()