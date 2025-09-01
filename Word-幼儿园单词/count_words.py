# -*- coding: utf-8 -*-
import json
import os

def count_words_in_file(filepath):
    """统计单个文件中的单词数量"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if isinstance(data, list):
            word_count = 0
            for entry in data:
                if isinstance(entry, dict) and 'english' in entry:
                    word_count += 1
            return word_count, len(data)
        else:
            return 0, 0
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return 0, 0

def analyze_folders():
    """分析data和data2文件夹中的所有JSON文件"""
    folders = ['data', 'data2']
    total_words = 0
    total_entries = 0
    file_stats = []
    
    print("=" * 80)
    print("幼儿园单词文件统计分析")
    print("=" * 80)
    
    for folder in folders:
        if not os.path.exists(folder):
            print(f"文件夹 {folder} 不存在")
            continue
            
        print(f"\n? 分析文件夹: {folder}")
        print("-" * 50)
        
        folder_words = 0
        folder_entries = 0
        
        for filename in sorted(os.listdir(folder)):
            if filename.endswith('.json'):
                filepath = os.path.join(folder, filename)
                word_count, entry_count = count_words_in_file(filepath)
                
                file_stats.append({
                    'folder': folder,
                    'filename': filename,
                    'words': word_count,
                    'entries': entry_count
                })
                
                folder_words += word_count
                folder_entries += entry_count
                
                print(f"{filename:<25} | 单词: {word_count:>4} | 条目: {entry_count:>4}")
        
        print(f"\n{folder} 文件夹小计: {folder_words} 个单词, {folder_entries} 个条目")
        total_words += folder_words
        total_entries += folder_entries
    
    print("\n" + "=" * 80)
    print(f"? 总计统计")
    print("=" * 80)
    print(f"总单词数: {total_words}")
    print(f"总条目数: {total_entries}")
    print(f"处理文件数: {len(file_stats)}")
    
    # 按文件大小排序显示
    print("\n? 按单词数量排序:")
    print("-" * 50)
    sorted_files = sorted(file_stats, key=lambda x: x['words'], reverse=True)
    for file_info in sorted_files:
        if file_info['words'] > 0:
            print(f"{file_info['folder']}/{file_info['filename']:<25} | {file_info['words']:>4} 个单词")
    
    return total_words, total_entries, file_stats

if __name__ == "__main__":
    total_words, total_entries, file_stats = analyze_folders()
    
    # 保存统计结果
    stats_result = {
        'total_words': total_words,
        'total_entries': total_entries,
        'file_count': len(file_stats),
        'files': file_stats
    }
    
    with open('word_statistics.json', 'w', encoding='utf-8') as f:
        json.dump(stats_result, f, ensure_ascii=False, indent=2)
    
    print(f"\n? 统计结果已保存到 word_statistics.json")
    print(f"\n? 发现问题: 如果处理后只有629个单词，但原始文件有{total_words}个单词，")
    print("   说明分类逻辑可能过于严格，很多单词被归类为'general'类别。")
    print("   建议优化分类逻辑以包含更多单词类别。")