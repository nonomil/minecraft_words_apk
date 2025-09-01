import json
import os
import random
from pathlib import Path

# 配置
DATA_DIR = Path(__file__).parent.parent / 'data'
UNSPLASH_BASE_URL = 'https://images.unsplash.com/photo-'
UNSPLASH_SIZE = 'w=400'

def read_json_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f'Error reading file {file_path}: {str(e)}')
        return None

def write_json_file(file_path, data):
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f'Successfully wrote to {file_path}')
    except Exception as e:
        print(f'Error writing file {file_path}: {str(e)}')

def generate_image_url():
    random_id = random.randint(100000000, 999999999)
    return f'{UNSPLASH_BASE_URL}{random_id}?{UNSPLASH_SIZE}'

def update_word_files():
    # 读取所有分类信息
    categories = read_json_file(DATA_DIR / 'all_categories.json')
    if not categories:
        return

    # 读取主单词文件
    main_words = read_json_file(DATA_DIR / 'wordlist.json')
    if not main_words:
        return

    # 为每个单词添加图片
    updated_main_words = []
    for word in main_words:
        if not word.get('image'):
            word['image'] = generate_image_url()
        updated_main_words.append(word)

    # 更新主文件
    write_json_file(DATA_DIR / 'wordlist.json', updated_main_words)

    # 更新每个分类文件
    for category in categories:
        category_file = DATA_DIR / category['file']
        category_words = read_json_file(category_file)
        if category_words:
            # 更新分类文件中的单词
            updated_category_words = []
            for word in category_words:
                if not word.get('image'):
                    word['image'] = generate_image_url()
                updated_category_words.append(word)
            write_json_file(category_file, updated_category_words)
            
            # 更新分类信息中的单词数量
            category['count'] = len(updated_category_words)

    # 更新分类信息文件
    write_json_file(DATA_DIR / 'all_categories.json', categories)

if __name__ == '__main__':
    update_word_files() 