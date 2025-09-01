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

def extract_words_from_file(data):
    """Extract words from file data"""
    if isinstance(data, list):
        # Handle array format like [{}] or [{"words": []}]
        if len(data) > 0 and isinstance(data[0], dict) and 'words' in data[0]:
            return data[0]['words']
        return data
    elif isinstance(data, dict) and 'words' in data:
        return data['words']
    else:
        return []

def categorize_word_comprehensive(word_entry):
    """Categorize word based on content - comprehensive version"""
    word = word_entry.get('word', '').lower()
    category = word_entry.get('category', '').lower()
    subcategory = word_entry.get('subcategory', '').lower()
    
    # Nature and animals - expanded keywords
    nature_keywords = [
        'animal', 'nature', 'living', 'cat', 'dog', 'bird', 'fish', 'tree', 'flower', 
        'sun', 'moon', 'star', 'lion', 'bear', 'rabbit', 'elephant', 'tiger', 'monkey',
        'cow', 'pig', 'duck', 'bee', 'ant', 'frog', 'deer', 'fox', 'goat', 'owl', 
        'crab', 'pet', 'farm', 'zoo', 'sea', 'sky', 'fire', 'air', 'water', 'grass',
        'hill', 'mud', 'gold', 'cold', 'hot', 'day'
    ]
    
    if any(keyword in category for keyword in nature_keywords) or \
       any(keyword in word for keyword in nature_keywords) or \
       any(keyword in subcategory for keyword in nature_keywords):
        return 'nature_animals'
    
    # Learning and objects - expanded to include more items
    learning_keywords = [
        'learning', 'shape', 'school', 'geometric', 'circle', 'square', 'triangle',
        'body', 'object', 'clothing', 'food', 'toy', 'head', 'hand', 'foot', 'eye', 
        'nose', 'ear', 'mouth', 'face', 'hair', 'arm', 'leg', 'back', 'neck', 'chin',
        'shirt', 'shoes', 'hat', 'pants', 'dress', 'coat', 'apple', 'banana', 'bread',
        'milk', 'ball', 'doll', 'car', 'book', 'pen', 'desk', 'door', 'bed', 'chair',
        'TV', 'cake', 'egg', 'jam', 'tea', 'oil', 'corn', 'gum', 'beer', 'food'
    ]
    
    if any(keyword in category for keyword in learning_keywords) or \
       any(keyword in word for keyword in learning_keywords) or \
       any(keyword in subcategory for keyword in learning_keywords):
        return 'learning_objects'
    
    # Default to basic vocabulary for everything else
    return 'basic_vocabulary'

def convert_to_minecraft_format(word_entry):
    """Convert word entry to Minecraft format"""
    return {
        "word": word_entry.get('word', ''),
        "standardized": word_entry.get('standardized', word_entry.get('word', '')),
        "chinese": word_entry.get('chinese', ''),
        "phonetic": word_entry.get('phonetic', ''),
        "phrase": word_entry.get('phrase', word_entry.get('englishPhrase', '')),
        "phraseTranslation": word_entry.get('phraseTranslation', word_entry.get('chinesePhrase', '')),
        "difficulty": word_entry.get('difficulty', 'basic'),
        "category": word_entry.get('category', 'general'),
        "imageURLs": word_entry.get('imageURLs', [
            {
                "filename": f"{word_entry.get('word', 'default')}.jpg",
                "url": word_entry.get('unsplashUrl', 'https://images.unsplash.com/photo-1500000000000-000000000000?w=400'),
                "type": "Concept Image"
            }
        ])
    }

def process_all_files():
    """Process all files and categorize comprehensively"""
    # All original files to process
    files = [
        'kindergarten_basic_complete.json',
        'kindergarten_basic_vocabulary.json', 
        'kindergarten_body_objects.json',
        'kindergarten_learning_complete.json',
        'kindergarten_learning_shapes.json',
        'kindergarten_nature_animals.json',
        'kindergarten_nature_complete.json',
        'kindergarten_objects_complete.json'
    ]
    
    # Also process original data files
    data_files = [
        'data/actions.json', 'data/animals.json', 'data/basic.json', 'data/body.json',
        'data/clothes.json', 'data/family.json', 'data/food.json', 'data/nature.json',
        'data/numbers_colors.json', 'data/school.json', 'data/shapes.json', 'data/toys.json',
        'data2/basic_concepts.json', 'data2/living_things.json', 'data2/places.json'
    ]
    
    # Three main categories
    categories = {
        'basic_vocabulary': [],
        'nature_animals': [],
        'learning_objects': []
    }
    
    processed_words = set()  # For deduplication
    total_processed = 0
    
    # Process kindergarten files first
    for filename in files:
        if os.path.exists(filename):
            print(f"Processing {filename}...")
            data = load_json_file(filename)
            if data:
                words = extract_words_from_file(data)
                for word_entry in words:
                    if isinstance(word_entry, dict) and 'word' in word_entry:
                        word_key = word_entry['word'].lower().strip()
                        if word_key and word_key not in processed_words:
                            processed_words.add(word_key)
                            minecraft_entry = convert_to_minecraft_format(word_entry)
                            target_category = categorize_word_comprehensive(word_entry)
                            categories[target_category].append(minecraft_entry)
                            total_processed += 1
    
    # Process original data files
    for filename in data_files:
        if os.path.exists(filename):
            print(f"Processing {filename}...")
            data = load_json_file(filename)
            if data:
                words = data if isinstance(data, list) else []
                for word_entry in words:
                    if isinstance(word_entry, dict):
                        # Handle different formats
                        word = word_entry.get('english', word_entry.get('word', ''))
                        if word:
                            word_key = word.lower().strip()
                            if word_key and word_key not in processed_words:
                                processed_words.add(word_key)
                                
                                # Convert to standard format
                                standardized_entry = {
                                    'word': word,
                                    'chinese': word_entry.get('chinese', ''),
                                    'phrase': word_entry.get('englishPhrase', f"{word} example"),
                                    'phraseTranslation': word_entry.get('chinesePhrase', ''),
                                    'category': 'general',
                                    'imageUrl': word_entry.get('imageUrl', ''),
                                    'unsplashUrl': word_entry.get('unsplashUrl', '')
                                }
                                
                                minecraft_entry = convert_to_minecraft_format(standardized_entry)
                                target_category = categorize_word_comprehensive(standardized_entry)
                                categories[target_category].append(minecraft_entry)
                                total_processed += 1
    
    print(f"\nTotal words processed: {total_processed}")
    for category, words in categories.items():
        print(f"{category}: {len(words)} words")
    
    return categories, total_processed

def save_complete_files(categories):
    """Save complete categorized files"""
    file_mapping = {
        'basic_vocabulary': 'kindergarten_basic_complete_new.json',
        'nature_animals': 'kindergarten_nature_complete_new.json', 
        'learning_objects': 'kindergarten_learning_complete_new.json'
    }
    
    for category, words in categories.items():
        filename = file_mapping[category]
        print(f"Saving {len(words)} words to {filename}")
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(words, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    print("Processing ALL kindergarten words...")
    print("Target: 629 words from all sources")
    print("=" * 50)
    
    categories, total = process_all_files()
    save_complete_files(categories)
    
    print(f"\n? Processing complete!")
    print(f"Total words: {total}")
    print("New files created:")
    print("- kindergarten_basic_complete_new.json")
    print("- kindergarten_nature_complete_new.json")
    print("- kindergarten_learning_complete_new.json")