import json
import os

def load_json_file(filepath):
    """Load JSON file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return None

def extract_all_words(data):
    """Extract all words from various file formats"""
    words = []
    
    if isinstance(data, list):
        if len(data) > 0 and isinstance(data[0], dict) and 'words' in data[0]:
            # Format: [{"words": [...]}]
            words.extend(data[0]['words'])
        else:
            # Format: [{word1}, {word2}, ...]
            for item in data:
                if isinstance(item, dict) and 'word' in item:
                    words.append(item)
    elif isinstance(data, dict) and 'words' in data:
        # Format: {"words": [...]}
        words.extend(data['words'])
    
    return words

def categorize_word_smart(word_entry):
    """Smart categorization based on word content"""
    word = word_entry.get('word', '').lower()
    category = word_entry.get('category', '').lower()
    subcategory = word_entry.get('subcategory', '').lower()
    
    # Animals and nature
    nature_animals = [
        'cat', 'dog', 'bird', 'fish', 'lion', 'bear', 'rabbit', 'elephant', 'tiger', 'monkey',
        'cow', 'pig', 'duck', 'bee', 'ant', 'frog', 'deer', 'fox', 'goat', 'owl', 'crab', 
        'tree', 'flower', 'sun', 'moon', 'star', 'water', 'grass', 'fire', 'air', 'sea', 
        'sky', 'hill', 'farm', 'zoo', 'pet', 'animal', 'nature', 'living'
    ]
    
    if any(keyword in word for keyword in nature_animals) or \
       any(keyword in category for keyword in ['animal', 'nature', 'living']):
        return 'nature_animals'
    
    # Body parts, objects, food, toys, clothes, shapes
    learning_objects = [
        'head', 'hand', 'foot', 'eye', 'nose', 'ear', 'mouth', 'face', 'hair', 'arm', 'leg',
        'back', 'neck', 'chin', 'body', 'apple', 'banana', 'bread', 'milk', 'cake', 'egg',
        'ball', 'doll', 'car', 'toy', 'shirt', 'shoes', 'hat', 'pants', 'dress', 'coat',
        'school', 'book', 'pen', 'desk', 'door', 'bed', 'chair', 'circle', 'square', 'triangle',
        'food', 'clothing', 'shape', 'geometric', 'object'
    ]
    
    if any(keyword in word for keyword in learning_objects) or \
       any(keyword in category for keyword in ['body', 'food', 'toy', 'clothing', 'shape', 'school', 'object']):
        return 'learning_objects'
    
    # Everything else goes to basic vocabulary
    return 'basic_vocabulary'

def merge_all_complete_files():
    """Merge all complete files"""
    # Files to process
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
    
    # Three categories
    categories = {
        'basic_vocabulary': [],
        'nature_animals': [],
        'learning_objects': []
    }
    
    processed_words = set()
    total_words = 0
    
    for filename in files_to_process:
        if os.path.exists(filename):
            print(f"Processing {filename}...")
            data = load_json_file(filename)
            if data:
                words = extract_all_words(data)
                print(f"  Found {len(words)} words")
                
                for word_entry in words:
                    if isinstance(word_entry, dict) and 'word' in word_entry:
                        word_key = word_entry['word'].lower().strip()
                        if word_key and word_key not in processed_words:
                            processed_words.add(word_key)
                            
                            # Convert to Minecraft format
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
                            
                            # Categorize
                            target_category = categorize_word_smart(word_entry)
                            categories[target_category].append(minecraft_entry)
                            total_words += 1
    
    print(f"\nTotal unique words processed: {total_words}")
    for category, words in categories.items():
        print(f"{category}: {len(words)} words")
    
    return categories, total_words

def save_final_files(categories):
    """Save final categorized files"""
    file_mapping = {
        'basic_vocabulary': 'kindergarten_basic_final.json',
        'nature_animals': 'kindergarten_nature_final.json',
        'learning_objects': 'kindergarten_learning_final.json'
    }
    
    for category, words in categories.items():
        filename = file_mapping[category]
        print(f"Saving {len(words)} words to {filename}")
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(words, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    print("Merging ALL complete kindergarten word files...")
    print("Target: Extract all 629+ words from existing complete files")
    print("=" * 60)
    
    categories, total = merge_all_complete_files()
    save_final_files(categories)
    
    print(f"\n? Merging complete!")
    print(f"Total words: {total}")
    print("Final files created:")
    print("- kindergarten_basic_final.json")
    print("- kindergarten_nature_final.json")
    print("- kindergarten_learning_final.json")