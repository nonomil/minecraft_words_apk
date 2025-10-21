#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
词库清理和优化工具
专门为幼儿园学单词设计，移除不适合的内容并优化图片资源
"""

import os
import re
import json
from collections import defaultdict

class VocabularyCleanupOptimizer:
    def __init__(self, base_dir):
        self.base_dir = base_dir
        self.backup_dir = os.path.join(base_dir, 'cleanup_backups')
        
        # 不适合幼儿园的词汇类型
        self.inappropriate_categories = {
            'violence', 'weapon', 'fighting', 'battle', 'war', 'death',
            'scary', 'horror', 'dark', 'evil', 'monster', 'zombie',
            'complex_technology', 'advanced_concepts'
        }
        
        # 不适合幼儿园的具体词汇
        self.inappropriate_words = {
            # PVZ中的暴力/恐怖元素
            'zombie', 'zombies', 'zomboni', 'gargantuar', 'imp', 'doom-shroom',
            'grave buster', 'explode-o-nut', 'jack-in-the-box zombie',
            'balloon zombie', 'digger zombie', 'pogo zombie', 'ladder zombie',
            'catapult zombie', 'dr. zomboss', 'zombot', 'bungee zombie',
            'target zombie', 'newspaper zombie', 'screen door zombie',
            'buckethead zombie', 'conehead zombie', 'pole vaulting zombie',
            'football zombie', 'dancing zombie', 'backup dancer',
            'ducky tube zombie', 'snorkel zombie', 'zombie bobsled team',
            'dolphin rider zombie', 'zombie yeti',
            
            # Pokemon中过于复杂的概念
            'garchomp', 'dragonite', 'gyarados', 'alakazam', 'machamp',
            'lucario', 'gardevoir', 'charizard', 'blastoise', 'venusaur',
            
            # 其他不适合的词汇
            'weapon', 'gun', 'sword', 'knife', 'bomb', 'explosion',
            'fight', 'battle', 'war', 'death', 'kill', 'destroy'
        }
        
        # 适合幼儿园的图片资源映射
        self.kid_friendly_images = {
            # 动物类
            'cat': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f431.svg',
            'dog': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg',
            'bear': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f43b.svg',
            'rabbit': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f407.svg',
            'bird': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f426.svg',
            'fish': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f41f.svg',
            'elephant': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f418.svg',
            'giraffe': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f992.svg',
            'lion': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg',
            'monkey': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f412.svg',
            'pig': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f437.svg',
            'cow': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f404.svg',
            'sheep': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f411.svg',
            'horse': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f434.svg',
            'duck': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f986.svg',
            'chicken': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f414.svg',
            
            # 水果类
            'apple': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34e.svg',
            'banana': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34c.svg',
            'orange': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34a.svg',
            'grape': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f347.svg',
            'strawberry': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f353.svg',
            'watermelon': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f349.svg',
            'peach': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f351.svg',
            'cherry': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f352.svg',
            'pineapple': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34d.svg',
            'lemon': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34b.svg',
            
            # 蔬菜类
            'carrot': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f955.svg',
            'tomato': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f345.svg',
            'potato': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f954.svg',
            'corn': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f33d.svg',
            'broccoli': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f966.svg',
            'lettuce': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f96c.svg',
            'cucumber': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f952.svg',
            'pepper': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f336.svg',
            'onion': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9c5.svg',
            
            # 颜色类
            'red': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f534.svg',
            'blue': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f535.svg',
            'yellow': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f7e1.svg',
            'green': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f7e2.svg',
            'orange': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f7e0.svg',
            'purple': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f7e3.svg',
            'pink': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f338.svg',
            'brown': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f7e4.svg',
            'black': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26ab.svg',
            'white': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26aa.svg',
            
            # 形状类
            'circle': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f7e0.svg',
            'square': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f7e6.svg',
            'triangle': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f53a.svg',
            'star': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b50.svg',
            'heart': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2764.svg',
            
            # 数字类
            'one': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/31-20e3.svg',
            'two': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/32-20e3.svg',
            'three': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/33-20e3.svg',
            'four': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/34-20e3.svg',
            'five': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/35-20e3.svg',
            
            # 交通工具类
            'car': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f697.svg',
            'bus': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f68c.svg',
            'train': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f686.svg',
            'airplane': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2708.svg',
            'boat': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26f5.svg',
            'bicycle': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6b2.svg',
            
            # 日常物品类
            'ball': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26bd.svg',
            'book': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4d6.svg',
            'chair': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa91.svg',
            'table': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4ba.svg',
            'bed': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6cf.svg',
            'house': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3e0.svg',
            'tree': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f333.svg',
            'flower': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f33c.svg',
            'sun': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2600.svg',
            'moon': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f319.svg',
            
            # 食物类
            'bread': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f35e.svg',
            'milk': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f95b.svg',
            'egg': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f95a.svg',
            'cheese': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9c0.svg',
            'cake': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f370.svg',
            'cookie': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f36a.svg',
            
            # 默认通用图标
            'default': 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4da.svg'  # 书本图标
        }
    
    def create_backup(self, file_path):
        """创建文件备份"""
        if not os.path.exists(self.backup_dir):
            os.makedirs(self.backup_dir)
            
        backup_name = os.path.basename(file_path) + '.cleanup_backup'
        backup_path = os.path.join(self.backup_dir, backup_name)
        
        with open(file_path, 'r', encoding='utf-8') as src:
            with open(backup_path, 'w', encoding='utf-8') as dst:
                dst.write(src.read())
                
        return backup_path
    
    def is_appropriate_for_kindergarten(self, word_data):
        """判断词汇是否适合幼儿园"""
        word = word_data.get('word', '').lower()
        chinese = word_data.get('chinese', '').lower()
        category = word_data.get('category', '').lower()
        context = word_data.get('character_context', '').lower()
        
        # 检查不适合的词汇
        if word in self.inappropriate_words:
            return False, f"不适合词汇: {word}"
            
        # 检查不适合的类别
        if category in self.inappropriate_categories:
            return False, f"不适合类别: {category}"
            
        # 检查上下文中的不适合内容
        for inappropriate in self.inappropriate_categories:
            if inappropriate in context:
                return False, f"上下文包含不适合内容: {inappropriate}"
                
        # 检查是否包含暴力、恐怖等关键词
        violence_keywords = ['僵尸', '暴力', '战斗', '死亡', '恐怖', '怪物', '武器']
        for keyword in violence_keywords:
            if keyword in chinese or keyword in context:
                return False, f"包含不适合关键词: {keyword}"
                
        return True, "适合幼儿园"
    
    def get_appropriate_image_url(self, word_data):
        """获取适合的图片URL"""
        word = word_data.get('word', '').lower()
        chinese = word_data.get('chinese', '').lower()
        category = word_data.get('category', '').lower()
        
        # 直接匹配
        if word in self.kid_friendly_images:
            return self.kid_friendly_images[word]
            
        # 根据类别匹配
        if 'animal' in category or 'pet' in category:
            if any(animal in word for animal in ['cat', 'dog', 'bear', 'rabbit']):
                for animal in ['cat', 'dog', 'bear', 'rabbit']:
                    if animal in word:
                        return self.kid_friendly_images[animal]
                        
        # 根据中文匹配
        chinese_mappings = {
            '猫': 'cat', '狗': 'dog', '熊': 'bear', '兔': 'rabbit',
            '鸟': 'bird', '鱼': 'fish', '象': 'elephant', '狮': 'lion',
            '苹果': 'apple', '香蕉': 'banana', '橙': 'orange',
            '红': 'red', '蓝': 'blue', '黄': 'yellow', '绿': 'green',
            '汽车': 'car', '火车': 'train', '飞机': 'airplane',
            '球': 'ball', '书': 'book', '房子': 'house'
        }
        
        for chinese_char, english_word in chinese_mappings.items():
            if chinese_char in chinese:
                return self.kid_friendly_images[english_word]
                
        # 默认图标
        return self.kid_friendly_images['default']
    
    def clean_vocabulary_file(self, file_path):
        """清理单个词库文件"""
        if not file_path.endswith('.js'):
            return False, "不是JS文件"
            
        # 创建备份
        backup_path = self.create_backup(file_path)
        print(f"[Cleanup] 已备份: {backup_path}")
        
        # 读取文件
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 提取词汇数组
        array_pattern = r'const\s+\w+\s*=\s*\[(.*?)\];'
        match = re.search(array_pattern, content, re.DOTALL)
        
        if not match:
            return False, "未找到词汇数组"
            
        # 解析词汇条目
        cleaned_entries = []
        removed_entries = []
        updated_entries = []
        
        # 简单的词汇条目提取（基于对象结构）
        entry_pattern = r'\{[^{}]*?"word"\s*:\s*"([^"]+)"[^{}]*?\}'
        entries = re.findall(entry_pattern, content, re.DOTALL)
        
        # 重新构建内容
        lines = content.split('\n')
        new_lines = []
        in_array = False
        skip_entry = False
        current_entry = []
        
        for line in lines:
            if 'const' in line and '= [' in line:
                in_array = True
                new_lines.append(line)
                continue
                
            if in_array and line.strip() == '];':
                in_array = False
                new_lines.append(line)
                continue
                
            if not in_array:
                new_lines.append(line)
                continue
                
            # 在数组内部处理
            if '"word":' in line:
                # 开始新的词汇条目
                if current_entry:
                    # 处理前一个条目
                    entry_text = '\n'.join(current_entry)
                    if not skip_entry:
                        new_lines.extend(current_entry)
                        
                current_entry = [line]
                
                # 检查当前词汇是否适合
                word_match = re.search(r'"word"\s*:\s*"([^"]+)"', line)
                if word_match:
                    word = word_match.group(1).lower()
                    if word in self.inappropriate_words:
                        skip_entry = True
                        removed_entries.append(word)
                        print(f"[Cleanup] 移除不适合词汇: {word}")
                    else:
                        skip_entry = False
            else:
                current_entry.append(line)
                
                # 更新图片URL
                if '"url":' in line and not skip_entry:
                    # 提取当前词汇信息进行图片URL更新
                    if current_entry:
                        entry_text = '\n'.join(current_entry)
                        word_match = re.search(r'"word"\s*:\s*"([^"]+)"', entry_text)
                        if word_match:
                            word = word_match.group(1).lower()
                            new_url = self.get_appropriate_image_url({'word': word})
                            if new_url != self.kid_friendly_images['default']:
                                # 更新URL
                                updated_line = re.sub(r'"url"\s*:\s*"[^"]+"', f'"url": "{new_url}"', line)
                                if updated_line != line:
                                    current_entry[-1] = updated_line
                                    updated_entries.append(word)
                                    print(f"[Cleanup] 更新图片URL: {word}")
        
        # 处理最后一个条目
        if current_entry and not skip_entry:
            new_lines.extend(current_entry)
            
        # 写回文件
        new_content = '\n'.join(new_lines)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
        return True, {
            'removed': len(removed_entries),
            'updated': len(updated_entries),
            'removed_words': removed_entries,
            'updated_words': updated_entries
        }
    
    def cleanup_all_vocabularies(self):
        """清理所有词库文件"""
        print("[Cleanup] 开始清理词库文件...")
        
        total_removed = 0
        total_updated = 0
        processed_files = []
        
        # 遍历所有词库文件
        for root, dirs, files in os.walk(self.base_dir):
            for file in files:
                if file.endswith('.js') and not file.startswith('.') and 'backup' not in file:
                    file_path = os.path.join(root, file)
                    
                    # 跳过配置文件和工具文件
                    if any(skip in file for skip in ['config', 'loader', 'health_check', 'cleanup']):
                        continue
                        
                    print(f"\n[Cleanup] 处理文件: {os.path.relpath(file_path, self.base_dir)}")
                    
                    success, result = self.clean_vocabulary_file(file_path)
                    
                    if success:
                        total_removed += result['removed']
                        total_updated += result['updated']
                        processed_files.append({
                            'file': file,
                            'removed': result['removed'],
                            'updated': result['updated'],
                            'removed_words': result['removed_words'],
                            'updated_words': result['updated_words']
                        })
                        print(f"[Cleanup] ✅ 移除 {result['removed']} 个不适合词汇，更新 {result['updated']} 个图片")
                    else:
                        print(f"[Cleanup] ❌ 处理失败: {result}")
        
        # 生成清理报告
        self.generate_cleanup_report(processed_files, total_removed, total_updated)
        
        print(f"\n[Cleanup] 清理完成:")
        print(f"  📁 处理文件数: {len(processed_files)}")
        print(f"  🗑️ 移除词汇数: {total_removed}")
        print(f"  🖼️ 更新图片数: {total_updated}")
        print(f"  💾 备份目录: {self.backup_dir}")
        
        return len(processed_files) > 0
    
    def generate_cleanup_report(self, processed_files, total_removed, total_updated):
        """生成清理报告"""
        report_path = os.path.join(self.base_dir, 'vocabulary_cleanup_report.txt')
        
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write("词库清理报告\n")
            f.write("=" * 50 + "\n\n")
            f.write(f"处理时间: {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"总计移除词汇: {total_removed}\n")
            f.write(f"总计更新图片: {total_updated}\n")
            f.write(f"处理文件数: {len(processed_files)}\n\n")
            
            for file_info in processed_files:
                f.write(f"文件: {file_info['file']}\n")
                f.write(f"  移除词汇: {file_info['removed']}\n")
                f.write(f"  更新图片: {file_info['updated']}\n")
                
                if file_info['removed_words']:
                    f.write(f"  移除的词汇: {', '.join(file_info['removed_words'])}\n")
                    
                if file_info['updated_words']:
                    f.write(f"  更新图片的词汇: {', '.join(file_info['updated_words'])}\n")
                    
                f.write("\n")
        
        print(f"[Cleanup] 清理报告已保存: {report_path}")

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    cleaner = VocabularyCleanupOptimizer(base_dir)
    
    print("[Cleanup] 词库清理和优化工具")
    print("[Cleanup] 专为幼儿园学单词设计")
    print("[Cleanup] 将移除不适合的内容并优化图片资源")
    
    success = cleaner.cleanup_all_vocabularies()
    
    if success:
        print("\n[Cleanup] ✅ 清理完成！建议重新运行健康检查验证结果。")
    else:
        print("\n[Cleanup] ❌ 清理失败或无需清理。")

if __name__ == '__main__':
    main()
