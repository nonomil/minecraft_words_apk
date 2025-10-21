import json
import os
from pathlib import Path
from typing import List, Dict, Any

class VocabularyManager:
    def __init__(self, base_dir: str):
        """词汇管理器：支持拆分和合并词汇文件"""
        self.base_dir = Path(base_dir)
        self.stage_dir = self.base_dir / "js" / "vocabularies" / "stage"
        
    def load_vocabulary_file(self, filename: str) -> List[Dict[str, Any]]:
        """加载词汇文件并提取数组数据"""
        file_path = self.stage_dir / filename
        
        if not file_path.exists():
            raise FileNotFoundError(f"文件不存在: {file_path}")
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 提取 JavaScript 数组内容
        # 查找 const VARIABLE = [ 的模式
        start_marker = "const "
        end_marker = " = ["
        start_idx = content.find(start_marker)
        
        if start_idx == -1:
            raise ValueError(f"无法在 {filename} 中找到词汇数组定义")
            
        # 找到数组开始位置
        array_start = content.find(end_marker, start_idx)
        if array_start == -1:
            raise ValueError(f"无法找到数组定义在 {filename}")
            
        array_start = array_start + len(end_marker) - 1  # 包含 '['
        
        # 找到对应的闭合括号
        bracket_count = 0
        array_end = array_start
        in_string = False
        string_char = None
        
        for i, char in enumerate(content[array_start:], array_start):
            if not in_string:
                if char in ['"', "'"]:
                    in_string = True
                    string_char = char
                elif char == '[':
                    bracket_count += 1
                elif char == ']':
                    bracket_count -= 1
                    if bracket_count == 0:
                        array_end = i
                        break
            else:
                if char == string_char and content[i-1] != '\\':
                    in_string = False
        
        if bracket_count != 0:
            raise ValueError(f"无法在 {filename} 中找到完整的数组定义")
            
        array_content = content[array_start:array_end + 1]
        
        try:
            # 将 JavaScript 对象转换为 JSON 格式
            json_content = self._js_to_json(array_content)
            return json.loads(json_content)
        except json.JSONDecodeError as e:
            print(f"JSON 解析错误: {e}")
            print("尝试简化解析...")
            # 如果标准 JSON 解析失败，尝试提取对象
            return self._extract_objects_manually(content)
    
    def _js_to_json(self, js_content: str) -> str:
        """将 JavaScript 对象表示法转换为标准 JSON"""
        # 简单处理：移除末尾逗号，确保引号格式等
        import re
        
        # 移除对象中的尾随逗号
        content = re.sub(r',(\s*})', r'\1', js_content)
        # 移除数组中的尾随逗号
        content = re.sub(r',(\s*])', r'\1', content)
        
        return content
    
    def _extract_objects_manually(self, content: str) -> List[Dict[str, Any]]:
        """手动提取词汇对象（作为备选方案）"""
        objects = []
        
        # 查找所有 { 和 } 的位置
        stack = []
        object_start = None
        
        for i, char in enumerate(content):
            if char == '{':
                if not stack:  # 新的对象开始
                    object_start = i
                stack.append(i)
            elif char == '}':
                if stack:
                    stack.pop()
                    if not stack and object_start is not None:  # 对象结束
                        object_content = content[object_start:i+1]
                        try:
                            # 尝试解析单个对象
                            obj = json.loads(self._js_to_json(object_content))
                            objects.append(obj)
                        except:
                            pass
                        object_start = None
        
        return objects
    
    def split_vocabulary(self, filename: str, num_parts: int = 10) -> List[str]:
        """将词汇文件拆分为指定数量的部分"""
        print(f"正在处理 {filename}...")
        
        # 加载数据
        vocabularies = self.load_vocabulary_file(filename)
        print(f"加载了 {len(vocabularies)} 个词汇")
        
        # 计算每部分的大小
        total_size = len(vocabularies)
        part_size = total_size // num_parts
        remainder = total_size % num_parts
        
        # 创建输出目录
        output_dir = self.stage_dir / "split"
        output_dir.mkdir(exist_ok=True)
        
        # 拆分文件
        created_files = []
        base_name = filename.replace('.js', '')
        
        for i in range(num_parts):
            # 计算当前部分的起始和结束索引
            start_idx = i * part_size + min(i, remainder)
            if i < remainder:
                end_idx = start_idx + part_size + 1
            else:
                end_idx = start_idx + part_size
            
            # 获取当前部分的数据
            part_data = vocabularies[start_idx:end_idx]
            
            # 生成输出文件名
            output_filename = f"{base_name}_part{i+1:02d}.js"
            output_path = output_dir / output_filename
            
            # 写入文件
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(f"// {filename} - Part {i+1}/{num_parts}\n")
                f.write(f"// Split for AI processing - Size: {len(part_data)} entries\n\n")
                f.write(f"const {base_name.upper()}_PART{i+1:02d} = ")
                f.write(json.dumps(part_data, ensure_ascii=False, indent=2))
                f.write(";\n")
                
            created_files.append(str(output_path))
            print(f"已创建: {output_filename} ({len(part_data)} 个词汇)")
        
        print(f"\n拆分完成！总共创建了 {len(created_files)} 个文件")
        return created_files
    
    def merge_vocabulary_parts(self, pattern: str, base_name: str) -> str:
        """合并拆分的词汇文件"""
        output_dir = self.stage_dir / "split"
        
        # 查找所有匹配的文件
        part_files = sorted(output_dir.glob(pattern))
        
        if not part_files:
            raise FileNotFoundError(f"未找到符合模式 {pattern} 的文件")
        
        print(f"找到 {len(part_files)} 个部分文件")
        
        # 合并所有数据
        all_data = []
        for part_file in part_files:
            with open(part_file, 'r', encoding='utf-8') as f:
                content = f.read()
                # 提取 JSON 数组
                start_idx = content.find('[')
                end_idx = content.rfind(']')
                
                if start_idx != -1 and end_idx != -1:
                    json_content = content[start_idx:end_idx + 1]
                    part_data = json.loads(json_content)
                    all_data.extend(part_data)
                    print(f"\t{part_file.name}: {len(part_data)} 个词汇")
        
        print(f"总共合并了 {len(all_data)} 个词汇")
        
        # 生成合并后的文件
        output_filename = f"{base_name}_merged.js"
        output_path = output_dir / output_filename
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(f"// 合并后的词汇文件 - 总计 {len(all_data)} 个词汇\n")
            f.write(f"// 原始模式: {pattern}\n\n")
            f.write(f"const {base_name.upper()}_MERGED = ")
            f.write(json.dumps(all_data, ensure_ascii=False, indent=2))
            f.write(";\n")
            
        print(f"合并文件已保存为: {output_filename}")
        return str(output_path)
    
    def validate_split_merge(self, original_file: str, merged_file: str) -> bool:
        """验证拆分合并后的数据完整性"""
        print(f"\n正在验证数据完整性...")
        
        # 加载原始数据
        original_data = self.load_vocabulary_file(original_file)
        print(f"原始文件: {len(original_data)} 个词汇")
        
        # 加载合并后的数据
        merged_data = self.load_vocabulary_file(f"split/{os.path.basename(merged_file)}")
        print(f"合并文件: {len(merged_data)} 个词汇")
        
        if len(original_data) == len(merged_data):
            print("✅ 数据数量验证通过")
            return True
        else:
            print(f"❌ 数据数量不匹配: 原始 {len(original_data)} vs 合并 {len(merged_data)}")
            return False
    
    def show_workflow_examples(self):
        """显示工作流程示例"""
        examples = """
=== 词汇文件拆分合并工具使用方法 ===

1. 拆分词汇文件:
   python split_merge_vocabularies.py split stage_elementary_lower.js 10

2. 合并拆分文件:
   python split_merge_vocabularies.py merge stage_elementary_lower_part*.js stage_elementary_lower

3. 验证拆分合并结果:
   python split_merge_vocabularies.py validate stage_elementary_lower.js stage_elementary_lower_merged.js

4. 批量处理所有文件:
   python split_merge_vocabularies.py batch-split 10

"""
        print(examples)

def main():
    import sys
    
    if len(sys.argv) == 1:
        # 显示帮助信息
        manager = VocabularyManager(".")
        manager.show_workflow_examples()
        return
    
    manager = VocabularyManager(".")
    
    if len(sys.argv) >= 3 and sys.argv[1] == "split":
        # 拆分单个文件
        filename = sys.argv[2]
        parts = int(sys.argv[3]) if len(sys.argv) > 3 else 10
        
        try:
            manager.split_vocabulary(filename, parts)
            print("✅ 拆分完成！")
        except Exception as e:
            print(f"❌ 拆分失败: {e}")
            
    elif len(sys.argv) >= 5 and sys.argv[1] == "merge":
        # 合并文件
        pattern = sys.argv[2]
        base_name = sys.argv[3]
        original_file = sys.argv[4]
        
        try:
            merged_file = manager.merge_vocabulary_parts(pattern, base_name)
            manager.validate_split_merge(original_file, merged_file)
            print("✅ 合并完成！")
        except Exception as e:
            print(f"❌ 合并失败: {e}")
            
    elif len(sys.argv) >= 4 and sys.argv[1] == "validate":
        # 验证文件
        original_file = sys.argv[2]
        merged_file = sys.argv[3]
        
        try:
            if manager.validate_split_merge(original_file, merged_file):
                print("✅ 数据完整性验证通过")
            else:
                print("❌ 数据完整性验证失败")
        except Exception as e:
            print(f"❌ 验证失败: {e}")
            
    elif len(sys.argv) >= 3 and sys.argv[1] == "batch-split":
        # 批量处理所有文件
        parts = int(sys.argv[2])
        
        for filename in ["stage_elementary_lower.js", "stage_elementary_upper.js", "stage_kindergarten.js"]:
            try:
                print(f"\n--- 处理 {filename} ---")
                manager.split_vocabulary(filename, parts)
            except Exception as e:
                print(f"处理 {filename} 时出错: {e}")
                continue
                
    else:
        print("未知命令。请使用：")
        manager.show_workflow_examples()

if __name__ == "__main__":
    main()