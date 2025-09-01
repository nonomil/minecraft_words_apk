import json
import os
import re

# 获取脚本所在目录的父目录（项目根目录）
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 创建目标目录
output_dir = os.path.join(base_dir, "data/words")
os.makedirs(output_dir, exist_ok=True)

# 读取单词.txt文件
source_file = os.path.join(base_dir, "data/单词.txt")
with open(source_file, "r", encoding="utf-8") as file:
    content = file.read()

# 使用正则表达式查找所有文件块
# 匹配<write_to_file>和</write_to_file>之间的内容
file_pattern = re.compile(r'<write_to_file>\s*<path>(.*?)</path>\s*<content>\s*(\[.*?\])\s*</content>\s*</write_to_file>', re.DOTALL)
matches = file_pattern.findall(content)

# 统计成功处理的文件
processed_files = []

# 处理每个匹配项
for path, json_content in matches:
    # 提取文件名
    filename = os.path.basename(path)
    # 创建输出路径
    output_path = os.path.join(output_dir, filename)
    
    try:
        # 解析JSON以验证格式
        json_data = json.loads(json_content)
        # 漂亮地格式化输出JSON
        formatted_json = json.dumps(json_data, ensure_ascii=False, indent=2)
        
        # 写入文件
        with open(output_path, "w", encoding="utf-8") as output_file:
            output_file.write(formatted_json)
        
        word_count = len(json_data)
        processed_files.append(f"{filename} ({word_count}个单词)")
        print(f"成功创建文件: {output_path} - 包含 {word_count} 个单词")
    except json.JSONDecodeError as e:
        print(f"解析JSON失败 {filename}: {e}")
        # 仍然写入原始内容以便后续检查
        with open(output_path, "w", encoding="utf-8") as output_file:
            output_file.write(json_content)
        print(f"已写入原始内容到: {output_path}")

print(f"\n总共处理了 {len(matches)} 个文件")
print(f"成功创建的文件: {', '.join(processed_files)}") 