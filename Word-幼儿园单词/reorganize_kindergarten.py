# -*- coding: utf-8 -*-
import json
import os

def load_json_file(filepath):
    """加载JSON文件"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return None

def extract_words_from_file(data):
    """从文件数据中提取单词列表"""
    if isinstance(data, list):
        return data
    elif isinstance(data, dict) and 'words' in data:
        return data['words']
    else:
        return []

def categorize_word(word_entry):
    """根据单词内容决定分类"""
    word = word_entry.get('word', '').lower()
    category = word_entry.get('category', '')
    subcategory = word_entry.get('subcategory', '')
    
    # 动物和自然类
    nature_keywords = ['animal', 'nature', 'living', 'cat', 'dog', 'bird', 'fish', 'tree', 'flower', 'sun', 'moon', 'star']
    if any(keyword in category.lower() for keyword in nature_keywords) or \
       any(keyword in word for keyword in ['cat', 'dog', 'bird', 'fish', 'tree', 'flower', 'sun', 'moon', 'star', 'lion', 'bear']):
        return 'nature_animals'
    
    # 身体和物品类
    body_object_keywords = ['body', 'object', 'clothing', 'food', 'toy', 'head', 'hand', 'foot', 'eye', 'nose']
    if any(keyword in category.lower() for keyword in body_object_keywords) or \
       any(keyword in word for keyword in ['head', 'hand', 'foot', 'eye', 'nose', 'shirt', 'shoes', 'apple', 'ball', 'doll']):
        return 'body_objects'
    
    # 学习和形状类
    learning_keywords = ['learning', 'shape', 'school', 'geometric', 'circle', 'square', 'triangle']
    if any(keyword in category.lower() for keyword in learning_keywords) or \
       any(keyword in word for keyword in ['school', 'book', 'pen', 'circle', 'square', 'triangle']):
        return 'learning_shapes'
    
    # 默认归类为基础词汇
    return 'basic_vocabulary'

def process_all_files():
    """处理所有文件并重新分类"""
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
    
    # 三个主要分类
    categories = {
        'basic_vocabulary': [],
        'nature_animals': [],
        'learning_shapes': []
    }
    
    processed_words = set()  # 用于去重
    
    for filename in files:
        if os.path.exists(filename):
            print(f"Processing {filename}...")
            data = load_json_file(filename)
            if data:
                words = extract_words_from_file(data)
                for word_entry in words:
                    if isinstance(word_entry, dict) and 'word' in word_entry:
                        word_key = word_entry['word'].lower()
                        if word_key not in processed_words:
                            processed_words.add(word_key)
                            
                            # 转换为Minecraft格式
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
                            
                            # 决定分类
                            target_category = categorize_word(word_entry)
                            categories[target_category].append(minecraft_entry)
    
    return categories

def save_new_files(categories):
    """保存新的分类文件"""
    file_mapping = {
        'basic_vocabulary': 'kindergarten_basic.json',
        'nature_animals': 'kindergarten_nature.json', 
        'learning_shapes': 'kindergarten_learning.json'
    }
    
    for category, words in categories.items():
        filename = file_mapping[category]
        print(f"Saving {len(words)} words to {filename}")
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(words, f, ensure_ascii=False, indent=2)
    
    print(f"\nTotal words processed: {sum(len(words) for words in categories.values())}")
    for category, words in categories.items():
        print(f"{category}: {len(words)} words")

if __name__ == "__main__":
    print("重新整理幼儿园单词文件...")
    print("将8个文件合并为3个主要分类")
    print("格式转换为Minecraft词汇数组格式")
    print("=" * 50)
    
    categories = process_all_files()
    save_new_files(categories)
    
    print("\n? 文件重新整理完成！")
    print("新文件:")
    print("- kindergarten_basic.json (基础词汇)")
    print("- kindergarten_nature.json (自然动物)")
    print("- kindergarten_learning.json (学习形状)")