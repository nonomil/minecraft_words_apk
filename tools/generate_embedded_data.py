import os
import json
from pathlib import Path

def generate_embedded_data():
    # 定义 data 目录和目标 JS 文件路径
    data_dir = Path(__file__).parent.parent / 'data'
    output_js_file = Path(__file__).parent.parent / 'js' / 'embedded-data.js'
    
    # 确保 data 目录存在
    if not data_dir.exists():
        print(f"错误: 数据目录不存在: {data_dir}")
        return

    embedded_data = {}
    all_words = []
    processed_files = 0

    print(f"开始从 {data_dir} 加载 JSON 文件...")

    # 遍历 data 目录下的所有 JSON 文件
    for file_path in data_dir.glob('*.json'):
        # 排除备份文件
        if file_path.name.endswith('.backup'):
            continue
            
        category_name = file_path.stem # 获取文件名（不含扩展名）作为分类名
        print(f"处理文件: {file_path.name}")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                words = json.load(f)
                
                # 确保加载的是列表
                if isinstance(words, list):
                    # 验证并处理每个单词对象
                    valid_words_for_category = []
                    for word_obj in words:
                        # 检查基本结构
                        if isinstance(word_obj, dict) and ('word' in word_obj or 'english' in word_obj) and 'chinese' in word_obj:
                            # 标准化键名
                            word_obj['english'] = word_obj.get('word') or word_obj.get('english')
                            word_obj.pop('word', None) # 移除旧的 'word' 键
                            
                            # 确保 imageUrl 存在，使用 image 或 imageUrl
                            word_obj['imageUrl'] = word_obj.get('image') or word_obj.get('imageUrl') or ''
                            word_obj.pop('image', None)
                            
                            valid_words_for_category.append({
                                'english': word_obj['english'],
                                'chinese': word_obj['chinese'],
                                'imageUrl': word_obj['imageUrl']
                            })
                        else:
                            print(f"  警告: 文件 {file_path.name} 中发现无效的单词对象，已跳过: {word_obj}")
                            
                    embedded_data[category_name] = valid_words_for_category
                    all_words.extend(valid_words_for_category)
                    processed_files += 1
                else:
                    print(f"  警告: 文件 {file_path.name} 内容不是有效的列表格式，已跳过。")
        except json.JSONDecodeError:
            print(f"  错误: 文件 {file_path.name} 不是有效的 JSON 文件，已跳过。")
        except Exception as e:
            print(f"  处理文件 {file_path.name} 时发生错误: {e}")

    print(f"\n成功处理 {processed_files} 个 JSON 文件。")
    print(f"总共加载 {len(all_words)} 个单词。")

    # 生成 JavaScript 文件内容
    js_content = """
/**
 * embedded-data.js
 * 内置数据文件，由 tools/generate_embedded_data.py 自动生成
 * 包含所有从 data/*.json 加载的词汇数据
 */

// 内置单词数据，按照分类组织
window.EMBEDDED_DATA = {embedded_data_json};

// 导出所有单词作为一个数组
window.ALL_EMBEDDED_WORDS = (function() {{ 
    const allWords = [];
    for (const category in window.EMBEDDED_DATA) {{ 
        if (window.EMBEDDED_DATA.hasOwnProperty(category)) {{ 
            allWords.push(...window.EMBEDDED_DATA[category]);
        }} 
    }} 
    return allWords;
}})();

console.log('[EmbeddedData] 内置数据模块已加载，包含 ' + window.ALL_EMBEDDED_WORDS.length + ' 个单词');
""".format(embedded_data_json=json.dumps(embedded_data, ensure_ascii=False, indent=4))

    # 写入 JS 文件
    try:
        output_js_file.parent.mkdir(parents=True, exist_ok=True) # 确保 js 目录存在
        with open(output_js_file, 'w', encoding='utf-8') as f:
            f.write(js_content)
        print(f"\n成功生成内置数据文件: {output_js_file}")
    except Exception as e:
        print(f"\n错误: 无法写入 JS 文件 {output_js_file}: {e}")

if __name__ == '__main__':
    generate_embedded_data() 