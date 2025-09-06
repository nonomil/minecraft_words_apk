// 主游戏逻辑相关函数

// 模式切换
function switchMode(mode) {
    currentMode = mode;
    
    // 更新按钮状态
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.mode-btn.${mode}`).classList.add('active');
    
    // 显示对应区域
    document.getElementById('learnMode').style.display = mode === 'learn' ? 'block' : 'none';
    document.getElementById('quizMode').style.display = mode === 'quiz' ? 'block' : 'none';
    document.getElementById('settingsMode').style.display = mode === 'settings' ? 'block' : 'none';
    
    if (mode === 'quiz' && currentVocabulary.length > 0) {
        startQuiz();
    }
}

// 更新单词显示
function updateWordDisplay() {
    if (currentVocabulary.length === 0) return;
    
    const word = getCurrentWord();
    if (!word) return;
    
    // 修复词汇数据
    const fixedWord = fixWordData(word);

    // 学习类型（兼容全局与本地存储）
    const lt = (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word');

    // 根据学习类型更新题干标题
    const titleEl = document.querySelector('#learnOptions h3');
    if (titleEl) {
        if (lt === 'word') titleEl.textContent = '这个单词的中文意思是？';
        else if (lt === 'word_zh') titleEl.textContent = '请选择对应的英文';
        else if (lt === 'phrase_en') titleEl.textContent = '这个短语的中文意思是？';
        else if (lt === 'phrase_zh') titleEl.textContent = '请选择对应的英文短语';
    }
    
    // 更新主标题（根据学习类型显示英文/中文/短语）
    const primaryEl = document.getElementById('wordEnglish');
    if (primaryEl) {
        if (lt === 'word') primaryEl.textContent = fixedWord.standardized || fixedWord.word;
        else if (lt === 'word_zh') primaryEl.textContent = fixedWord.chinese || '';
        else if (lt === 'phrase_en') primaryEl.textContent = fixedWord.phrase || (fixedWord.standardized || fixedWord.word || '');
        else if (lt === 'phrase_zh') primaryEl.textContent = fixedWord.phraseTranslation || fixedWord.chinese || '';
    }

    // 分类/难度
    document.getElementById('wordCategory').textContent = `${fixedWord.category || '未分类'} - ${fixedWord.difficulty || '未知难度'}`;
    
    // 音标仅在英文单词模式下显示
    const phoneticElement = document.getElementById('wordPhonetic');
    if (phoneticElement) {
        if (lt === 'word' && fixedWord.phonetic) {
            phoneticElement.textContent = fixedWord.phonetic;
            phoneticElement.style.display = 'block';
        } else {
            phoneticElement.style.display = 'none';
        }
    }
    
    // 重置显示状态
    document.getElementById('learnOptions').style.display = 'block';
    document.getElementById('wordChinese').style.display = 'none';
    document.getElementById('learnResult').style.display = 'none';
    document.getElementById('wordPhrase').style.display = 'none';
    
    // 生成学习选项
    generateLearnChoices(fixedWord);
    
    // 更新图片
    updateWordImage(fixedWord);
    
    // 自动播放发音：英文模式播放英文；中文模式播放中文
    if (getSettings().autoPlay) {
        try {
            if (lt === 'word' || lt === 'phrase_en') {
                playAudio();
            } else if (lt === 'word_zh' || lt === 'phrase_zh') {
                const zhText = (lt === 'word_zh') ? (fixedWord.chinese || '') : (fixedWord.phraseTranslation || fixedWord.chinese || '');
                if (zhText) { try { playChinese(zhText); } catch(e){} }
            }
        } catch (e) {}
    }
    
    // 更新进度条
    updateProgressBar();
    
    // 更新按钮状态
    updateNavigationButtons();
    
    // 如果是幼儿园模式，更新分组显示
    if (getSettings().kindergartenMode) {
        updateGroupDisplay();
    }
}

// 更新单词图片
function updateWordImage(word) {
    const imageElement = document.getElementById('wordImage');
    if (!imageElement) return;
    
    if (word.imageURLs && word.imageURLs.length > 0 && getSettings().showImages) {
        imageElement.style.display = 'block';
        
        // 异步获取真实图片URL
        convertToDirectImageUrl(word.imageURLs[0].url, word.imageURLs[0].filename)
            .then(imageUrl => {
                imageElement.src = imageUrl;
                // 设置点击打开 zh 中文维基的条目（若原链接为 minecraft.wiki 的 File: 页面）
                try {
                    const pageUrl = (typeof transformMinecraftWikiLink === 'function')
                        ? transformMinecraftWikiLink(word.imageURLs[0])
                        : (word.imageURLs[0].url || null);
                    if (pageUrl) {
                        imageElement.style.cursor = 'pointer';
                        imageElement.onclick = async () => {
                            const targetUrl = pageUrl;
                            try {
                                if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Browser) {
                                    await window.Capacitor.Plugins.Browser.open({ url: targetUrl });
                                    return;
                                }
                            } catch(e){}
                            try { window.open(targetUrl, (/(Android)/i.test(navigator.userAgent)) ? '_system' : '_blank'); } catch(e){}
                        };
                    } else {
                        imageElement.onclick = null;
                        imageElement.style.cursor = '';
                    }
                } catch(e){}
            })
            .catch(error => {
                console.warn('Failed to load image:', error);
                imageElement.src = createPlaceholderImage();
                imageElement.onclick = null;
                imageElement.style.cursor = '';
            });
            
        imageElement.onerror = function() {
            this.src = createPlaceholderImage();
            this.onclick = null;
            this.style.cursor = '';
        };
    } else {
        imageElement.style.display = 'none';
    }
}

// 更新进度条
function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    if (!progressFill) return;
    
    const progress = ((currentWordIndex + 1) / currentVocabulary.length) * 100;
    progressFill.style.width = progress + '%';
}

// 更新导航按钮
function updateNavigationButtons() {
    const prevBtn = document.querySelector('.control-btn.prev');
    const nextBtn = document.querySelector('.control-btn.next');
    
    if (prevBtn) {
        prevBtn.disabled = currentWordIndex === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentWordIndex === currentVocabulary.length - 1;
    }
}

// 生成学习选项
function generateLearnChoices(correctWord) {
    // 根据学习类型生成不同方向的选项与正确答案
    const lt = (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word');
    const choices = [];
    let correctAnswer = '';

    const pickRandom = (arr, n) => {
        const pool = arr.slice();
        const res = [];
        while (pool.length && res.length < n) {
            const i = Math.floor(Math.random() * pool.length);
            res.push(pool.splice(i,1)[0]);
        }
        return res;
    };

    if (lt === 'word') {
        // 看英文选中文
        correctAnswer = correctWord.chinese;
        choices.push(correctAnswer);
        const similar = getSimilarWords(correctWord, 6).map(w => w.chinese).filter(Boolean);
        pickRandom([...new Set(similar)], 6).forEach(c => { if (!choices.includes(c)) choices.push(c); });
    } else if (lt === 'word_zh') {
        // 看中文选英文
        correctAnswer = correctWord.standardized || correctWord.word;
        choices.push(correctAnswer);
        const similar = getSimilarWords(correctWord, 6).map(w => (w.standardized || w.word)).filter(Boolean);
        pickRandom([...new Set(similar)], 6).forEach(c => { if (!choices.includes(c)) choices.push(c); });
    } else if (lt === 'phrase_en') {
        // 看英文短语选中文
        correctAnswer = correctWord.phraseTranslation || correctWord.chinese || '';
        choices.push(correctAnswer);
        const pool = currentVocabulary.filter(w => (w.phraseTranslation || w.chinese)).map(w => (w.phraseTranslation || w.chinese)).filter(Boolean);
        pickRandom(pool.filter(t => t !== correctAnswer), 6).forEach(c => { if (!choices.includes(c)) choices.push(c); });
    } else if (lt === 'phrase_zh') {
        // 看中文短语选英文短语
        correctAnswer = correctWord.phrase || correctWord.standardized || correctWord.word || '';
        choices.push(correctAnswer);
        const pool = currentVocabulary.filter(w => (w.phrase || w.standardized || w.word)).map(w => (w.phrase || w.standardized || w.word)).filter(Boolean);
        pickRandom(pool.filter(t => t !== correctAnswer), 6).forEach(c => { if (!choices.includes(c)) choices.push(c); });
    }

    // 补足到4项
    while (choices.length < 4 && currentVocabulary.length > 0) {
        const any = (lt === 'word' || lt === 'phrase_en')
            ? (currentVocabulary[Math.floor(Math.random()*currentVocabulary.length)].chinese)
            : ((currentVocabulary[Math.floor(Math.random()*currentVocabulary.length)].standardized || currentVocabulary[Math.floor(Math.random()*currentVocabulary.length)].word));
        if (any && !choices.includes(any)) choices.push(any);
        if (choices.length > 10) break;
    }

    const shuffledChoices = shuffleArray(choices.slice(0, 4));

    const choicesContainer = document.getElementById('learnChoices');
    if (!choicesContainer) return;
    choicesContainer.innerHTML = '';

    const settings = getSettings();
    const hoverDelay = (settings && typeof settings.hoverDelayMs === 'number') ? settings.hoverDelayMs : ((CONFIG.ANIMATION && CONFIG.ANIMATION.HOVER_TTS_DELAY) ? CONFIG.ANIMATION.HOVER_TTS_DELAY : 150);
    const optionIsEnglish = (lt === 'word_zh' || lt === 'phrase_zh');

    shuffledChoices.forEach(choice => {
        const choiceElement = document.createElement('div');
        choiceElement.className = 'learn-choice';
        choiceElement.textContent = choice;

        // 悬停发音（根据选项语言）
        const speakOnHover = debounce(() => {
            try {
                if (optionIsEnglish) {
                    if (window.TTS) TTS.speak(choice, { lang: 'en-US', rate: Math.max(0.6, settings.speechRate * 0.8), pitch: settings.speechPitch, volume: settings.speechVolume });
                } else {
                    if (window.TTS) TTS.speak(choice, { lang: 'zh-CN', rate: Math.max(0.6, settings.speechRate * 0.9), pitch: settings.speechPitch, volume: settings.speechVolume });
                }
            } catch(e){}
        }, hoverDelay);
        choiceElement.addEventListener('mouseenter', speakOnHover);

        // 支持长按发音
        let pressTimer = null; let longPressed = false; let selectedOnce = false;
        const clearPress = () => { if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; } };
        const startPress = () => {
            longPressed = false;
            const threshold = Math.max(200, Math.min(1000, (getSettings().longPressMs || 320)));
            pressTimer = setTimeout(() => {
                longPressed = true;
                try {
                    if (optionIsEnglish) { if (window.TTS) TTS.speak(choice, { lang: 'en-US', rate: Math.max(0.6, settings.speechRate * 0.8), pitch: settings.speechPitch, volume: settings.speechVolume }); }
                    else { if (window.TTS) TTS.speak(choice, { lang: 'zh-CN', rate: Math.max(0.6, settings.speechRate * 0.9), pitch: settings.speechPitch, volume: settings.speechVolume }); }
                } catch(e){}
            }, threshold);
        };
        const endPress = () => {
            if (pressTimer) {
                clearTimeout(pressTimer);
                if (!longPressed && !selectedOnce) {
                    // 短按即选择（仅触发一次）
                    selectedOnce = true;
                    selectLearnChoice(choiceElement, choice, correctAnswer);
                }
            }
            clearPress();
        };
        choiceElement.addEventListener('pointerdown', startPress);
        choiceElement.addEventListener('pointerup', endPress);
        choiceElement.addEventListener('pointerleave', () => { clearPress(); });
        choiceElement.addEventListener('pointercancel', () => { clearPress(); });

        // 避免 pointer 事件后触发 click 造成二次选择；在不支持 pointer 的环境下作为兜底
        choiceElement.addEventListener('click', (evt) => {
            if (longPressed || selectedOnce) { evt.preventDefault(); evt.stopPropagation(); return; }
            selectedOnce = true;
            selectLearnChoice(choiceElement, choice, correctAnswer);
        });
        choicesContainer.appendChild(choiceElement);
    });
}

// 处理学习选择
function selectLearnChoice(element, selected, correct) {
    // 禁用所有选项
    document.querySelectorAll('.learn-choice').forEach(choice => {
        choice.style.pointerEvents = 'none';
        if (choice.textContent === correct) {
            choice.classList.add('correct');
        } else if (choice === element) {
            choice.classList.add('wrong');
        }
    });
    
    // 显示结果
    const resultElement = document.getElementById('learnResult');
    if (resultElement) {
        resultElement.style.display = 'block';
        
        if (selected === correct) {
            resultElement.textContent = '✅ 回答正确！';
            resultElement.className = 'learn-result correct';
            
            // 创建星星动画
            createStarAnimation();
            
            // 幼儿园模式奖励处理
            if (getSettings().kindergartenMode) {
                handleCorrectAnswer();
            }
            
        } else {
            resultElement.textContent = `❌ 回答错误！正确答案是：${correct}`;
            resultElement.className = 'learn-result wrong';
        }
    }
    
    // 如果回答正确，显示短语
    if (selected === correct) {
        const currentWord = getCurrentWord();
        if (currentWord && currentWord.phrase && currentWord.phraseTranslation) {
            setTimeout(() => {
                const phraseContent = document.getElementById('phraseContent');
                const phraseTranslation = document.getElementById('phraseTranslation');
                const wordPhrase = document.getElementById('wordPhrase');
                
                if (phraseContent) phraseContent.textContent = currentWord.phrase;
                if (phraseTranslation) phraseTranslation.textContent = currentWord.phraseTranslation;
                if (wordPhrase) wordPhrase.style.display = 'block';
            }, CONFIG.ANIMATION.PHRASE_DELAY);
        }
    }
    
    // 延迟显示完整答案
    setTimeout(() => {
        const wordChinese = document.getElementById('wordChinese');
        if (wordChinese) {
            wordChinese.textContent = correct;
            wordChinese.style.display = 'block';
        }
        
        // 如果回答正确，自动跳转到下一题
        if (selected === correct) {
            setTimeout(() => {
                if (currentWordIndex < currentVocabulary.length - 1) {
                    nextWord();
                }
            }, 2000); // 显示答案2秒后自动跳转
        }
    }, CONFIG.ANIMATION.ANSWER_DELAY);
}

// 上一个单词
function previousWord() {
    if (window.TTS) { try { TTS.cancel(); } catch(e){} }
    if (currentWordIndex > 0) {
        currentWordIndex--;
        updateWordDisplay();
        updateStats();
    }
}

// 下一个单词
function nextWord() {
    if (window.TTS) { try { TTS.cancel(); } catch(e){} }
    if (currentWordIndex < currentVocabulary.length - 1) {
        currentWordIndex++;
        updateWordDisplay();
        updateStats();
        
        // 记录学习进度
        saveProgress();
    }
}

// 播放发音
function playAudio() {
    const word = getCurrentWord();
    if (!word) return;
    
    // 根据学习类型决定朗读内容：短语模式优先读 phrase
    const lt = (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word');
    const text = (lt === 'phrase_en' || lt === 'phrase_zh')
        ? (word.phrase || word.standardized || word.word)
        : (word.standardized || word.word);
    const settings = getSettings();
    
    // 使用 TTS 适配器发音（英文）
    if (window.TTS) {
        TTS.speak(text, {
            lang: 'en-US',
            rate: Math.max(0.6, settings.speechRate * 0.8), // 降低语速
            pitch: settings.speechPitch,
            volume: settings.speechVolume
        });
    }
}

// 中文发音：用于学习模式中“悬停选项时朗读中文”
function playChinese(text) {
    if (!text) return;

    const settings = getSettings();

    // 使用 TTS 适配器发音（中文）
    if (window.TTS) {
        TTS.speak(text, {
            lang: 'zh-CN',
            rate: Math.max(0.6, settings.speechRate * 0.9),
            pitch: settings.speechPitch,
            volume: settings.speechVolume
        });
    }
}

// 更新统计信息
function updateStats() {
    const currentIndexElement = document.getElementById('currentIndex');
    const totalWordsElement = document.getElementById('totalWords');
    const learnedCountElement = document.getElementById('learnedCount');
    
    if (currentIndexElement) {
        currentIndexElement.textContent = currentWordIndex + 1;
    }
    
    if (totalWordsElement) {
        totalWordsElement.textContent = currentVocabulary.length;
    }
    
    if (learnedCountElement) {
        learnedCountElement.textContent = currentWordIndex + 1;
    }
}

// 键盘快捷键处理
function handleKeyboardShortcuts(e) {
    if (currentMode === 'learn') {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                previousWord();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextWord();
                break;
            case ' ':
                e.preventDefault();
                playAudio();
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                e.preventDefault();
                const choices = document.querySelectorAll('.learn-choice');
                const index = parseInt(e.key) - 1;
                if (choices[index] && choices[index].style.pointerEvents !== 'none') {
                    choices[index].click();
                }
                break;
        }
    }
}

// 初始化游戏
function initializeGame() {
    // 添加键盘事件监听
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // 页面卸载时保存进度
    window.addEventListener('beforeunload', function() {
        saveProgress();
    });
    
    // 初始化幼儿园模式（如果启用）
    if (getSettings().kindergartenMode) {
        initializeKindergartenMode();
    }
    
    // 加载默认词库
    const defaultVocab = document.getElementById('vocabSelect').value;
    if (defaultVocab.includes('幼儿园') || defaultVocab === 'kindergarten_vocabulary') {
        loadVocabulary();
    }
}


// 模式切换
function setLearnType(type) {
  // 支持四种类型，短语不拼写
  if (!['word','word_zh','phrase_en','phrase_zh'].includes(type)) return;
  try { localStorage.setItem(CONFIG.STORAGE_KEYS.LEARN_TYPE, type); } catch(e) {}
  if (typeof learnType !== 'undefined') { learnType = type; } else { window.learnType = type; }
  // 激活按钮样式
  const btns = document.querySelectorAll('.learn-type-btn');
  btns.forEach(b => b.classList.remove('active'));
  const map = {word: '.learn-type-btn.word', word_zh: '.learn-type-btn.word_zh', phrase_en: '.learn-type-btn.phrase_en', phrase_zh: '.learn-type-btn.phrase_zh'};
  const activeBtn = document.querySelector(map[type]);
  if (activeBtn) activeBtn.classList.add('active');

  // 短语不需要拼写：禁用“拼写模式”按钮并在需要时切回学习模式
  try {
    const quizBtn = document.querySelector('.mode-btn.quiz');
    if (quizBtn) {
      const isPhrase = (type === 'phrase_en' || type === 'phrase_zh');
      if (isPhrase) {
        quizBtn.setAttribute('disabled', 'disabled');
        quizBtn.title = '短语不需要拼写';
        quizBtn.style.opacity = '0.6';
        if (typeof currentMode !== 'undefined' && currentMode === 'quiz') {
          switchMode('learn');
        }
      } else {
        quizBtn.removeAttribute('disabled');
        quizBtn.title = '';
        quizBtn.style.opacity = '';
      }
    }
  } catch(e) { /* ignore */ }

  // 根据类型重载进度与界面
  if (currentVocabulary && currentVocabulary.length) {
    // 重新生成学习选项与索引
    loadProgress();
    updateWordDisplay();
    generateLearnChoices(getCurrentWord());
    updateNavigationButtons();
  }
  // 同步幼儿园奖励（仅在开启幼儿园模式时）
  try {
    if (getSettings().kindergartenMode) {
      loadKindergartenProgress();
      updateGroupDisplay();
      updateRewardDisplay();
    }
  } catch(e) { console.warn('刷新幼儿园奖励失败', e); }
}

// 初始化同步按钮激活状态（在页面加载完成后执行）
document.addEventListener('DOMContentLoaded', () => {
  try {
    const stored = (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word');
    setLearnType(stored);
  } catch(e) { setLearnType('word'); }
});