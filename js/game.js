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

    // 链接打开（安卓优先 Capacitor Browser）
    const setClickToOpen = (url) => {
        imageElement.style.cursor = url ? 'pointer' : '';
        if (!url) { imageElement.onclick = null; return; }
        imageElement.onclick = async () => {
            const targetUrl = url;
            try {
                if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Browser) {
                    await window.Capacitor.Plugins.Browser.open({ url: targetUrl });
                    return;
                }
            } catch (e) {}
            try { window.open(targetUrl, (/(Android)/i.test(navigator.userAgent)) ? '_system' : '_blank'); } catch (e) {}
        };
    };

    // 默认清空点击
    setClickToOpen(null);
    
    if (word.imageURLs && word.imageURLs.length > 0 && getSettings().showImages) {
        imageElement.style.display = 'block';
        const raw = word.imageURLs[0];
        const rawPageUrl = raw && raw.url;
        // 使用全局工具函数将 File 页面转换为中文条目链接
        const pageUrl = (typeof transformMinecraftWikiLink === 'function') ? transformMinecraftWikiLink(rawPageUrl) : rawPageUrl;
        
        // 异步获取真实图片URL
        convertToDirectImageUrl(rawPageUrl, raw && raw.filename)
            .then(imageUrl => {
                imageElement.onerror = function() {
                    this.src = createPlaceholderImage();
                    setClickToOpen(null); // 占位图不提供跳转
                };
                imageElement.onload = () => setClickToOpen(pageUrl);
                imageElement.src = imageUrl;
            })
            .catch(error => {
                console.warn('Failed to load image:', error);
                imageElement.src = createPlaceholderImage();
                setClickToOpen(null);
            });
    } else {
        imageElement.style.display = 'none';
        setClickToOpen(null);
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
                    if (window.TTS) TTS.speak(choice, { lang: 'en-US', rate: Math.max(0.6, getSettings().speechRate*0.8), pitch: getSettings().speechPitch, volume: getSettings().speechVolume });
                } else {
                    if (window.TTS) TTS.speak(choice, { lang: 'zh-CN', rate: Math.max(0.85, getSettings().speechRate*0.95), pitch: getSettings().speechPitch, volume: getSettings().speechVolume });
                }
            } catch(e){}
        }, hoverDelay);

        choiceElement.addEventListener('mouseenter', speakOnHover);
        choiceElement.addEventListener('mouseleave', () => speakOnHover.cancel && speakOnHover.cancel());
        
        choiceElement.onclick = () => selectLearnChoice(choiceElement, choice, correctAnswer);
        choicesContainer.appendChild(choiceElement);
    });
}

// 选择学习选项
function selectLearnChoice(element, selected, correct) {
    const choicesContainer = document.getElementById('learnChoices');
    if (!choicesContainer) return;

    // 禁用所有选项
    Array.from(choicesContainer.children).forEach(child => child.classList.add('disabled'));

    const resultElement = document.getElementById('learnResult');
    if (!resultElement) return;

    resultElement.style.display = 'block';

    const wordObj = getCurrentWord && getCurrentWord();
    const isCorrect = (selected === correct);

    if (isCorrect) {
        element.classList.add('correct');
        resultElement.textContent = '✅ 回答正确！';
        resultElement.className = 'learn-result correct';
        try{ createStarAnimation(); }catch(e){}
        try{ if(getSettings().kindergartenMode){ awardDiamond(); } }catch(e){}
    } else {
        element.classList.add('wrong');
        resultElement.textContent = `❌ 回答错误！正确答案是：${correct}`;
        resultElement.className = 'learn-result wrong';
    }

    // 新增：记录 per-word 结果
    try { if (wordObj && typeof recordWordResult === 'function') { recordWordResult(wordObj, isCorrect); } } catch(e) { }

    // 新增：学习模式下累计唯一词条（试用计数），仅在未激活时生效
    try {
        if (typeof isActivated === 'function' && !isActivated()) {
            if (typeof addTrialLearned === 'function' && wordObj) {
                addTrialLearned(wordObj);
            }
        }
    } catch(e) {}

    updateStats();

    // 根据设置：若选择“排除已掌握”，则正确后从当前列表中移除该词
    try {
        const s = getSettings();
        if (isCorrect && s && s.questionSource === 'exclude_mastered' && Array.isArray(currentVocabulary)) {
            const key = (typeof getWordKey === 'function') ? getWordKey(wordObj) : (wordObj && (wordObj.standardized || wordObj.word || wordObj.phrase || '').toLowerCase());
            if (key) {
                // 基于键删除第一个匹配项
                const idx = currentVocabulary.findIndex(w => {
                    try { return ((typeof getWordKey === 'function') ? getWordKey(w) : (w && (w.standardized||w.word||w.phrase||'').toLowerCase())) === key; } catch(e){ return false; }
                });
                if (idx >= 0) {
                    currentVocabulary.splice(idx, 1);
                    // 修正索引，避免越界
                    if (currentWordIndex >= currentVocabulary.length) {
                        currentWordIndex = Math.max(0, currentVocabulary.length - 1);
                    }
                }
            }
        }
    } catch(e) {}

    // 如果未激活且达到试用上限（20），则弹出激活引导并阻止继续自动前进
    try {
        if (typeof isActivated === 'function' && !isActivated()) {
            const count = (typeof getTrialCount === 'function') ? getTrialCount() : 0;
            if (count >= 20) {
                // 提示并打开设置面板“激活”区域
                alert('试用已达上限：已学习20个词条。请前往 设置 > 激活 输入激活码后继续学习（测试模式不受限制）。');
                // 尝试切换到设置面板
                try { if (typeof switchMode === 'function') { switchMode('settings'); } } catch(e){}
                try { var _el = document.getElementById('activationCode'); if (_el && _el.focus) { _el.focus(); } } catch(e){}
                return; // 阻止后续自动跳转
            }
        }
    } catch(e){}

    // 如果回答正确，短暂停留后自动切换到下一词（1.5s）
    if (isCorrect) {
        setTimeout(() => {
            if (typeof currentWordIndex !== 'undefined' && Array.isArray(currentVocabulary) && currentWordIndex < currentVocabulary.length - 1) {
                nextWord();
            } else {
                // 若已到末尾，仍触发界面刷新
                updateWordDisplay && updateWordDisplay();
            }
        }, 1500);
    }
}

// 上一个单词
function previousWord() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        updateWordDisplay();
    }
}

// 下一个单词
function nextWord() {
    if (currentWordIndex < currentVocabulary.length - 1) {
        currentWordIndex++;
        updateWordDisplay();
    }
}

// 播放英文
function playAudio() {
    const word = getCurrentWord();
    if (!word) return;

    const lt = (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word');

    // 英文发音根据学习类型区分：单词模式只读单词，短语模式优先读短语
    if (lt === 'word') {
        const text = (word.standardized || word.word || '').trim();
        if (!text) return;
        if (window.TTS) TTS.speak(text, { lang: 'en-US', rate: Math.max(0.6, getSettings().speechRate*0.8), pitch: getSettings().speechPitch, volume: getSettings().speechVolume });
    } else if (lt === 'phrase_en') {
        const text = (word.phrase || word.standardized || word.word || '').trim();
        if (!text) return;
        if (window.TTS) TTS.speak(text, { lang: 'en-US', rate: Math.max(0.6, getSettings().speechRate*0.8), pitch: getSettings().speechPitch, volume: getSettings().speechVolume });
    } else if (lt === 'word_zh' || lt === 'phrase_zh') {
        const zhText = (lt === 'word_zh') ? (word.chinese || '') : (word.phraseTranslation || word.chinese || '');
        if (!zhText) return;
        if (window.TTS) TTS.speak(zhText, { lang: 'zh-CN', rate: Math.max(0.85, getSettings().speechRate*0.95), pitch: getSettings().speechPitch, volume: getSettings().speechVolume });
    }
}

// 播放中文
function playChinese(text) {
    if (!text) return;
    if (window.TTS) TTS.speak(text, { lang: 'zh-CN', rate: Math.max(0.85, getSettings().speechRate*0.95), pitch: getSettings().speechPitch, volume: getSettings().speechVolume });
}

// 更新统计信息
function updateStats() {
    const learnedCount = document.getElementById('learnedCount');
    const totalCount = document.getElementById('totalCount');

    if (learnedCount) learnedCount.textContent = currentWordIndex + 1;
    if (totalCount) totalCount.textContent = currentVocabulary.length;
}

// 键盘快捷键
function handleKeyboardShortcuts(e) {
    if (currentMode !== 'learn') return;

    if (e.key === 'ArrowLeft') previousWord();
    else if (e.key === 'ArrowRight') nextWord();
}

document.addEventListener('keydown', handleKeyboardShortcuts);

// 初始化
function initializeGame() {
    // 你的初始化逻辑
}

document.addEventListener('DOMContentLoaded', () => {
    // 初始化游戏
    initializeGame();
});


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