import re
import pathlib

# 读取文件
file_path = pathlib.Path('animal_crossing_all_characters.js')
content = file_path.read_text(encoding='utf-8')

# 修复双重引号问题
# 修复 "word": ""word": "XXX" 格式
content = re.sub(r'"word": ""word": "([^"]+)"', r'"word": "\1"', content)

# 修复 "standardized": ""standardized": "XXX" 格式  
content = re.sub(r'"standardized": ""standardized": "([^"]+)"', r'"standardized": "\1"', content)

# 修复缺失的引号问题
content = re.sub(r'"phrase": "([^"]+),\s*$', r'"phrase": "\1"', content, flags=re.MULTILINE)

# 保存修复后的内容
file_path.write_text(content, encoding='utf-8')
print("格式修复完成！")