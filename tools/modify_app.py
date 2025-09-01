def modify_main_js(js_path):
    """修改main.js文件，添加短语显示功能"""
    with open(js_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    original_content = content # 保存原始副本以比较是否有更改
    
    # 检查是否已有displayPhrases函数
    if 'function displayPhrases(' in content:
        print("main.js中已包含displayPhrases函数，检查是否需要更新")
        
        # 确保导出语句存在
        export_check = 'window.displayPhrases = displayPhrases;'
        hide_export_check = 'window.hidePhrases = hidePhrases;'
        if export_check not in content or hide_export_check not in content:
            # 尝试找到一个合适的位置添加导出语句，例如在某个已知函数定义之后或文件末尾附近
            last_brace_index = content.rfind('}')
            if last_brace_index != -1:
                 export_code = f'''
// 导出displayPhrases和hidePhrases函数，确保它们在window对象上可用 (Added by script if missing)
{export_check if export_check not in content else ""}
{hide_export_check if hide_export_check not in content else ""}

'''
                 # 避免重复添加相同的导出
                 content = content[:last_brace_index+1] + export_code + content[last_brace_index+1:]
                 print("已尝试添加或确认displayPhrases和hidePhrases函数导出")
            else:
                print("警告: 无法找到合适的位置在main.js中添加函数导出语句。")

    else:
        # 添加displayPhrases和hidePhrases函数
        functions_to_add = '''

/**
 * Displays the Chinese and English phrases for the given word. (New)
 * @param {object} word - The word object containing phrases.
 */
function displayPhrases(word) {
    console.log('[Main] displayPhrases called with word:', word);

    // 在函数内部获取元素引用，增加健壮性
    const phraseDisplayArea = document.getElementById('phrase-display-area');
    const chinesePhraseElement = document.getElementById('chinese-phrase');
    const englishPhraseElement = document.getElementById('english-phrase');

    if (!phraseDisplayArea || !chinesePhraseElement || !englishPhraseElement) {
        console.error('[Main] Required elements for phrase display not found in displayPhrases');
        return;
    }

    if (!word) {
        console.error('[Main] No word provided to displayPhrases');
        // Consider hiding phrases if no word is provided
        hidePhrases();
        return;
    }

    const chinesePhrase = word.chinesePhrase || '';
    const englishPhrase = word.englishPhrase || '';

    console.log(`[Main] Phrases - Chinese: "${chinesePhrase}", English: "${englishPhrase}"`);

    if (chinesePhrase || englishPhrase) {
        chinesePhraseElement.textContent = chinesePhrase;
        englishPhraseElement.textContent = englishPhrase;
        phraseDisplayArea.style.display = 'block';
        console.log('[Main] Phrases displayed');
    } else {
        console.log('[Main] No phrases available, hiding phrase display');
        hidePhrases(); // Hide if no phrases are available
    }
}

/**
 * Hides the phrase display area. (New)
 */
function hidePhrases() {
    console.log('[Main] hidePhrases called');

    // 在函数内部获取元素引用
    const phraseDisplayArea = document.getElementById('phrase-display-area');
    const chinesePhraseElement = document.getElementById('chinese-phrase');
    const englishPhraseElement = document.getElementById('english-phrase');


    if (phraseDisplayArea) {
        phraseDisplayArea.style.display = 'none';
        console.log('[Main] Phrase display area hidden');

        // Clear content when hiding
        if(chinesePhraseElement) {
            chinesePhraseElement.textContent = '';
        }
        if(englishPhraseElement) {
            englishPhraseElement.textContent = '';
        }
    } else {
        // It might not exist yet during initial load, so log softly
        console.log('[Main] Phrase display area not found in hidePhrases (might be normal during init)');
    }
}

// 导出displayPhrases和hidePhrases函数，确保它们在window对象上可用
window.displayPhrases = displayPhrases;
window.hidePhrases = hidePhrases;

'''

        # 在文件末尾添加函数定义和导出通常更安全
        content += functions_to_add
        print("已添加displayPhrases和hidePhrases函数及导出")

    # 添加全局变量声明 (如果尚未存在) - 修复变量重复声明问题
    # 先检查是否已经存在这些变量声明
    has_phrase_display_area = 'let phraseDisplayArea' in content or 'var phraseDisplayArea' in content or 'const phraseDisplayArea' in content
    has_chinese_phrase_element = 'let chinesePhraseElement' in content or 'var chinesePhraseElement' in content or 'const chinesePhraseElement' in content
    has_english_phrase_element = 'let englishPhraseElement' in content or 'var englishPhraseElement' in content or 'const englishPhraseElement' in content
    
    global_vars_to_add = []
    if not has_phrase_display_area:
        global_vars_to_add.append('let phraseDisplayArea;')
    if not has_chinese_phrase_element:
        global_vars_to_add.append('let chinesePhraseElement;')
    if not has_english_phrase_element:
        global_vars_to_add.append('let englishPhraseElement;')

    if global_vars_to_add:
        # 尝试找到 // DOM 元素引用 注释块来插入
        dom_ref_comment = "// DOM 元素引用"
        insert_point = content.find(dom_ref_comment)
        if insert_point != -1:
            # 找到该注释后的第一个换行符
            newline_after_comment = content.find('\n', insert_point)
            if newline_after_comment != -1:
                 # 在换行符后插入
                 vars_string = '\n' + '\n'.join(global_vars_to_add) + ' // Added by script'
                 content = content[:newline_after_comment+1] + vars_string + content[newline_after_comment+1:]
                 print("已添加短语显示元素的全局变量声明")
            else:
                 # 如果找不到换行符，尝试添加到注释末尾
                 content = content[:insert_point + len(dom_ref_comment)] + '\n' + '\n'.join(global_vars_to_add) + ' // Added by script' + content[insert_point + len(dom_ref_comment):]
                 print("已在DOM引用注释后添加短语显示元素的全局变量声明")
        else:
            # 如果找不到注释，添加到文件顶部附近（例如第一个 'use strict';之后）
            strict_mode = "'use strict';"
            insert_point = content.find(strict_mode)
            if insert_point != -1:
                 vars_string = '\n\n' + '\n'.join(global_vars_to_add) + ' // Added by script'
                 content = content[:insert_point + len(strict_mode)] + vars_string + content[insert_point + len(strict_mode):]
                 print("已在 'use strict'; 后添加短语显示元素的全局变量声明")
            else:
                # 作为最后手段，添加到文件开头
                vars_string = '\n'.join(global_vars_to_add) + ' // Added by script\n\n'
                content = vars_string + content
                print("警告: 未找到理想插入点，已在文件开头添加短语显示元素的全局变量声明。")

def modify_game_modes_js(js_path):
    """修改game-modes.js文件，在单词答对后显示短语并延迟切换"""
    with open(js_path, 'r', encoding='utf-8') as file:
        content = file.read()

    original_content = content # 保存副本

    # --- 处理 handleWordOptionClick ---
    handle_word_option_func = "function handleWordOptionClick"
    if handle_word_option_func in content:
        # 采用更谨慎的方式处理修改，避免语法错误
        try:
            # 匹配整个函数
            handle_func_match = re.search(r'function handleWordOptionClick\(\)\s*\{[\s\S]*?\n\}', content)
            if handle_func_match:
                original_handle_func = handle_func_match.group(0)
                
                # 查找所有 if (isCorrect) 块
                correct_blocks = list(re.finditer(r'if\s*\(\s*isCorrect\s*\)\s*\{[\s\S]*?(?=\}\s*else|\}\s*\n)', original_handle_func))
                
                modified_handle_func = original_handle_func
                
                for block_match in correct_blocks:
                    original_block = block_match.group(0)
                    
                    # 只有当块中还没有 displayPhrases 时才修改
                    if 'displayPhrases' not in original_block:
                        # 找到块的末尾位置（通常在最后一个语句后）
                        # 在这里添加我们的新代码
                        phrases_code = '''
            // 显示单词短语 (Added by script)
            if (typeof window.displayPhrases === 'function') {
                window.displayPhrases(gameModesGlobals.currentWord);
            } else {
                console.error("displayPhrases function not found!");
            }
            
            // 延迟切换到下一个单词 (Added by script)
            setTimeout(() => {
                if (typeof window.nextWord === 'function') {
                    window.nextWord();
                } else {
                    console.error("window.nextWord function not found!");
                }
            }, 2000); // 2秒延迟
'''
                        # 查找原始块中是否已有 setTimeout
                        has_timeout = 'setTimeout' in original_block
                        
                        if has_timeout:
                            # 如果已有 setTimeout，替换它
                            modified_block = re.sub(
                                r'setTimeout\s*\(\s*(?:window\.)?nextWord[\s\S]*?\)',
                                phrases_code.strip(),
                                original_block
                            )
                        else:
                            # 如果没有，在块的末尾添加
                            # 假设块以 } 结束
                            modified_block = original_block.rstrip() + phrases_code + "\n        }"
                        
                        # 在函数中替换这个块
                        modified_handle_func = modified_handle_func.replace(original_block, modified_block)
                
                # 替换整个函数
                content = content.replace(original_handle_func, modified_handle_func)
                print("已更新 handleWordOptionClick 中的 isCorrect 处理逻辑。")
        except Exception as e:
            print(f"处理 handleWordOptionClick 时出错: {e}")
            # 继续而不是中断，以便尝试其他修改

    # --- 处理 checkSpellingAnswer ---
    check_spelling_func = "function checkSpellingAnswer()"
    if check_spelling_func in content:
        try:
            # 匹配整个函数
            spelling_func_match = re.search(r'function checkSpellingAnswer\(\)\s*\{[\s\S]*?return isCorrect;\s*\}', content)
            if spelling_func_match:
                original_spelling_func = spelling_func_match.group(0)
                
                # 查找 if (isCorrect) 块
                correct_block_match = re.search(r'if\s*\(\s*isCorrect\s*\)\s*\{[\s\S]*?(?=\}\s*else|\}\s*\n|return)', original_spelling_func)
                if correct_block_match:
                    original_block = correct_block_match.group(0)
                    
                    # 只有当块中还没有 displayPhrases 时才修改
                    if 'displayPhrases' not in original_block:
                        # 在块的末尾添加我们的代码
                        phrases_code = '''
            // 显示单词短语 (Added by script)
            if (typeof window.displayPhrases === 'function') {
                window.displayPhrases(gameModesGlobals.currentWord);
            } else {
                console.error("displayPhrases function not found!");
            }
            
            // 延迟切换到下一个单词 (Added by script)
            setTimeout(() => {
                if (typeof window.nextWord === 'function') {
                    window.nextWord();
                } else {
                    console.error("window.nextWord function not found!");
                }
            }, 2000); // 2秒延迟
'''
                        # 找到块的末尾位置（通常在最后一个语句后）
                        modified_block = original_block.rstrip()
                        if modified_block.endswith('{'):
                            # 如果块为空，添加换行
                            phrases_code = '\n' + phrases_code.strip() + '\n        '
                        else:
                            # 如果块非空，确保在最后一个语句后添加
                            phrases_code = '\n' + phrases_code
                        
                        modified_block += phrases_code + "\n        }"
                        
                        # 在函数中替换这个块
                        modified_spelling_func = original_spelling_func.replace(original_block, modified_block)
                        
                        # 替换整个函数
                        content = content.replace(original_spelling_func, modified_spelling_func)
                        print("已更新 checkSpellingAnswer 中的 isCorrect 处理逻辑。")
        except Exception as e:
            print(f"处理 checkSpellingAnswer 时出错: {e}")
            # 继续而不是中断，以便尝试其他修改

    # 写回文件 (仅当内容实际更改时)
    if content != original_content:
        with open(js_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"已成功修改game-modes.js文件: {js_path}")
    else:
        print(f"game-modes.js文件无需修改: {js_path}") 