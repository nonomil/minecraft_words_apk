#!/usr/bin/env python3
import os
import re
import sys
from pathlib import Path

def modify_html_file(html_path):
    """修改HTML文件，添加短语显示区域和相关样式"""
    with open(html_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 检查短语显示区域是否已存在
    if 'phrase-display-area' in content:
        print("HTML文件中已包含短语显示区域，无需修改")
        return
    
    # 在适当位置添加短语显示区域
    phrase_display_html = '''
            <!-- 短语显示区域 -->
            <div class="phrase-display" id="phrase-display-area" style="display: none; margin: 20px auto; max-width: 80%;">
                <div class="phrase" id="chinese-phrase"></div>
                <div class="phrase" id="english-phrase"></div>
            </div>
    '''
    
    # 在单词选择区域前添加短语显示区域
    insert_point = content.find('<div id="word-selection"')
    if insert_point == -1:
        insert_point = content.find('<!-- 字母选择区域 -->')
        if insert_point == -1:
            print("无法在HTML中找到合适的插入点，请手动添加短语显示区域")
            return
    
    updated_content = content[:insert_point] + phrase_display_html + content[insert_point:]
    
    # 添加短语显示的CSS样式
    style_tag_end = updated_content.find('</style>')
    if style_tag_end != -1:
        phrase_style = '''
        /* 短语显示区域样式 */
        .phrase-display {
            margin-top: 20px;
            padding: 20px;
            background-color: #f0f6ff;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.15);
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid #d0e0f5;
            max-width: 90%;
            margin-left: auto;
            margin-right: auto;
        }

        .phrase {
            margin: 10px 0;
            padding: 8px;
            font-size: 20px;
            line-height: 1.6;
        }

        #chinese-phrase {
            color: #5C4190;
            font-weight: bold;
            position: relative;
        }
        
        #chinese-phrase:after {
            content: "";
            display: block;
            width: 80px;
            height: 3px;
            background: linear-gradient(to right, #d0e0f5, #7c63af, #d0e0f5);
            margin: 10px auto 0;
            border-radius: 2px;
        }

        #english-phrase {
            color: #666;
            font-style: italic;
        }
        '''
        updated_content = updated_content[:style_tag_end] + phrase_style + updated_content[style_tag_end:]
    
    # 写回文件
    with open(html_path, 'w', encoding='utf-8') as file:
        file.write(updated_content)
    
    print(f"已成功修改HTML文件: {html_path}")

def modify_main_js(js_path):
    """修改main.js文件，添加短语显示功能，避免变量重复声明"""
    with open(js_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 检查是否已有displayPhrases函数
    if 'function displayPhrases(' in content:
        print("main.js中已包含displayPhrases函数，无需修改")
        return
    
    # 检查是否已有全局变量声明
    has_vars = 'let phraseDisplayArea;' in content
    
    # 1. 如果没有全局变量声明，找到DOM元素引用部分添加
    if not has_vars:
        dom_ref_comment = "// DOM 元素引用"
        insert_point = content.find(dom_ref_comment)
        if insert_point != -1:
            # 在现有变量声明列表之前添加新变量
            var_lines = content[insert_point:].split('\n')
            
            # 寻找最后一个let声明
            last_let_idx = 0
            for i, line in enumerate(var_lines):
                if line.strip().startswith('let '):
                    last_let_idx = i
            
            # 在最后一个let声明之后插入新变量
            new_vars = '''
let phraseDisplayArea; // 短语显示区域
let chinesePhraseElement; // 中文短语元素
let englishPhraseElement; // 英文短语元素
'''
            var_lines.insert(last_let_idx + 1, new_vars)
            
            # 重建内容
            updated_content = content[:insert_point] + '\n'.join(var_lines)
            content = updated_content
    
    # 2. 修改renderGameUI函数，添加元素引用获取
    render_ui_func = "function renderGameUI()"
    if render_ui_func in content:
        render_func_match = re.search(r'function renderGameUI\(\)\s*\{[\s\S]*?\n\}', content)
        if render_func_match:
            render_func = render_func_match.group(0)
            
            # 如果函数中没有获取短语显示元素，添加它
            if "phrase-display-area" not in render_func:
                log_line = "console.log('[Main] 游戏界面渲染完成');"
                log_idx = render_func.find(log_line)
                
                if log_idx != -1:
                    element_refs = '''
    // 获取短语显示元素
    phraseDisplayArea = document.getElementById('phrase-display-area');
    chinesePhraseElement = document.getElementById('chinese-phrase');
    englishPhraseElement = document.getElementById('english-phrase');
    '''
                    updated_render_func = render_func[:log_idx] + element_refs + '\n    ' + render_func[log_idx:]
                    content = content.replace(render_func, updated_render_func)
    
    # 3. 在loadCurrentWord, nextWord, previousWord函数开头添加hidePhrases()调用
    for func_name in ['loadCurrentWord', 'nextWord', 'previousWord']:
        func_match = re.search(rf'function {func_name}\(\)\s*\{{', content)
        if func_match:
            func_start = func_match.end()
            
            # 检查函数开头是否已经有hidePhrases调用
            next_lines = content[func_start:func_start+100]
            if 'hidePhrases()' not in next_lines:
                hide_call = f'\n    // 隐藏短语显示\n    hidePhrases();\n'
                content = content[:func_start] + hide_call + content[func_start:]
    
    # 4. 在文件末尾添加displayPhrases和hidePhrases函数
    functions_to_add = '''
/**
 * 显示当前单词的中英文短语
 * @param {Object} word - 单词对象，包含chinesePhrase和englishPhrase属性
 */
function displayPhrases(word) {
    console.log('[Main] 显示短语:', word);
    
    if (!phraseDisplayArea || !chinesePhraseElement || !englishPhraseElement) {
        // 确保元素引用存在
        phraseDisplayArea = document.getElementById('phrase-display-area');
        chinesePhraseElement = document.getElementById('chinese-phrase');
        englishPhraseElement = document.getElementById('english-phrase');
        
        if (!phraseDisplayArea || !chinesePhraseElement || !englishPhraseElement) {
            console.error('[Main] 短语显示元素未找到');
            return;
        }
    }
    
    if (!word) {
        console.error('[Main] 没有提供单词数据');
        hidePhrases();
        return;
    }
    
    const chinesePhrase = word.chinesePhrase || '';
    const englishPhrase = word.englishPhrase || '';
    
    console.log(`[Main] 短语 - 中文: "${chinesePhrase}", 英文: "${englishPhrase}"`);
    
    if (chinesePhrase || englishPhrase) {
        chinesePhraseElement.textContent = chinesePhrase;
        englishPhraseElement.textContent = englishPhrase;
        phraseDisplayArea.style.display = 'block';
        console.log('[Main] 已显示短语');
    } else {
        console.log('[Main] 没有可用的短语，隐藏短语显示区域');
        hidePhrases();
    }
}

/**
 * 隐藏短语显示区域
 */
function hidePhrases() {
    console.log('[Main] 隐藏短语');
    
    if (!phraseDisplayArea) {
        phraseDisplayArea = document.getElementById('phrase-display-area');
    }
    
    if (!chinesePhraseElement) {
        chinesePhraseElement = document.getElementById('chinese-phrase');
    }
    
    if (!englishPhraseElement) {
        englishPhraseElement = document.getElementById('english-phrase');
    }
    
    if (phraseDisplayArea) {
        phraseDisplayArea.style.display = 'none';
        
        if (chinesePhraseElement) {
            chinesePhraseElement.textContent = '';
        }
        if (englishPhraseElement) {
            englishPhraseElement.textContent = '';
        }
    }
}

// 导出函数到全局，使它们可以被其他模块调用
window.displayPhrases = displayPhrases;
window.hidePhrases = hidePhrases;
'''
    
    # 在文件末尾添加函数
    last_brace_index = content.rfind('}')
    if last_brace_index != -1:
        content = content[:last_brace_index+1] + '\n' + functions_to_add + '\n' + content[last_brace_index+1:]
    else:
        content += '\n' + functions_to_add
    
    # 写回文件
    with open(js_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"已成功修改main.js文件: {js_path}")

def modify_game_modes_js(js_path):
    """修改game-modes.js文件，在单词答对后显示短语并延迟切换"""
    with open(js_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 移除可能被错误添加的CSS代码和重复函数
    # 查找CSS代码起始位置
    css_start = content.find('/* 短语显示区域样式 */')
    if css_start != -1:
        # 查找到JavaScript代码恢复位置（第一个function声明）
        js_resume = content.find('function', css_start)
        if js_resume != -1:
            # 删除从CSS开始到下一个function之前的所有内容
            content = content[:css_start] + content[js_resume:]
            print("已移除game-modes.js中错误添加的CSS代码")
    
    # 检查handleWordOptionClick函数中是否已有短语显示调用
    handle_option_func = "function handleWordOptionClick"
    if handle_option_func in content:
        handle_func_match = re.search(r'function handleWordOptionClick\([^)]*\)\s*\{[\s\S]*?if\s*\(\s*isCorrect\s*\)\s*\{[\s\S]*?buttonElement\.classList\.add\([\'\"]correct[\'\"]\);', content)
        
        if handle_func_match:
            # 找到添加'correct'类后的位置
            insert_point = handle_func_match.end()
            
            # 检查现有内容是否已包含displayPhrases调用
            next_chunk = content[insert_point:insert_point+300]
            
            if 'displayPhrases' not in next_chunk:
                # 添加显示短语和延迟切换逻辑
                phrase_code = '''

            // 显示单词短语
            if (typeof window.displayPhrases === 'function') {
                window.displayPhrases(gameModesGlobals.currentWord);
            } else {
                console.error("displayPhrases function not found!");
            }
            
            // 延迟切换到下一个单词
            setTimeout(() => {
                if (typeof window.nextWord === 'function') {
                    window.nextWord();
                } else {
                    console.error("window.nextWord function not found!");
                }
            }, 2000); // 2秒延迟
'''
                
                # 检查是否已有setTimeout调用
                if 'setTimeout' in next_chunk:
                    # 替换现有的setTimeout调用
                    updated_chunk = re.sub(r'setTimeout\s*\(\s*[\w\.]*nextWord[\s\S]*?\)\s*;', phrase_code, next_chunk)
                    content = content[:insert_point] + updated_chunk + content[insert_point+len(next_chunk):]
                else:
                    # 如果没有setTimeout，直接添加新代码
                    content = content[:insert_point] + phrase_code + content[insert_point:]
                
                print("已在handleWordOptionClick函数中添加短语显示和延迟切换逻辑")
    
    # 检查拼写模式的checkSpellingAnswer函数
    spell_func = "function checkSpellingAnswer"
    if spell_func in content:
        spell_func_match = re.search(r'function checkSpellingAnswer\([^)]*\)\s*\{[\s\S]*?if\s*\(\s*isCorrect\s*\)\s*\{[\s\S]*?spellingDisplayArea\.classList\.add\([\'\"]correct[\'\"]\);', content)
        
        if spell_func_match:
            # 找到添加'correct'类后的位置
            insert_point = spell_func_match.end()
            
            # 检查现有内容是否已包含displayPhrases调用
            next_chunk = content[insert_point:insert_point+300]
            
            if 'displayPhrases' not in next_chunk:
                # 添加显示短语和延迟切换逻辑
                phrase_code = '''

            // 显示单词短语
            if (typeof window.displayPhrases === 'function') {
                window.displayPhrases(gameModesGlobals.currentWord);
            } else {
                console.error("displayPhrases function not found!");
            }
            
            // 延迟切换到下一个单词
            setTimeout(() => {
                if (typeof window.nextWord === 'function') {
                    window.nextWord();
                } else {
                    console.error("window.nextWord function not found!");
                }
            }, 2000); // 2秒延迟
'''
                
                # 直接添加新代码
                content = content[:insert_point] + phrase_code + content[insert_point:]
                
                print("已在checkSpellingAnswer函数中添加短语显示和延迟切换逻辑")
    
    # 写回文件
    with open(js_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"已成功修改game-modes.js文件: {js_path}")

def main():
    """主函数，处理文件路径和执行修改"""
    print("开始修复代码，添加短语显示功能...")
    
    # 假设脚本从项目根目录运行
    project_root = Path('.')
    
    # 确定文件路径
    html_path = project_root / "单词小游戏.html"
    main_js_path = project_root / "js/main.js"
    game_modes_js_path = project_root / "js/game-modes.js"
    
    # 检查文件是否存在
    if not html_path.is_file():
        print(f"错误: 找不到HTML文件: {html_path.resolve()}")
        sys.exit(1)
    
    if not main_js_path.is_file():
        print(f"错误: 找不到main.js文件: {main_js_path.resolve()}")
        sys.exit(1)
    
    if not game_modes_js_path.is_file():
        print(f"错误: 找不到game-modes.js文件: {game_modes_js_path.resolve()}")
        sys.exit(1)
    
    # 执行修改
    try:
        # 先修复game-modes.js，移除错误添加的CSS代码
        modify_game_modes_js(game_modes_js_path)
        
        # 然后修改HTML和main.js
        modify_html_file(html_path)
        modify_main_js(main_js_path)
        
        print("\n所有修改已完成！")
        print("\n请重新加载页面，测试短语学习功能。")
        
    except Exception as e:
        print(f"修改过程中出错: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()