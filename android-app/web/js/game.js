// 游戏逻辑与相关函数

// 辅助：生成每词库+学习类型的索引键
function getPerVocabIndexKey(vocabId, lt) {
  try { return CONFIG.STORAGE_KEYS.PROGRESS_INDEX_PREFIX + String(vocabId) + '::' + String(lt); } catch(e) { return 'wordGameIndex::' + String(vocabId) + '::' + String(lt); }
}

// 模式切换
function switchMode(mode) {
    currentMode = mode;
    
    // 更新按钮状态
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.mode-btn.${mode}`).classList.add('active');
    
    // 显示相应模块
    document.getElementById('learnMode').style.display = mode === 'learn' ? 'block' : 'none';
    document.getElementById('quizMode').style.display = mode === 'quiz' ? 'block' : 'none';
    document.getElementById('settingsMode').style.display = mode === 'settings' ? 'block' : 'none';
    
    if (mode === 'quiz' && currentVocabulary.length > 0) {
        startQuiz();
    }
}

// ���µ�����ʾ
function updateWordDisplay() {
    if (currentVocabulary.length === 0) return;
    const word = getCurrentWord();
    if (!word) return;
    const fixedWord = fixWordData(word);

    const lt = getLT();
    const titleEl = document.querySelector('#learnOptions h3');
    if (titleEl) {
        if (lt === 'word') titleEl.textContent = '这个单词的中文意思是？';
        else if (lt === 'word_zh') titleEl.textContent = '请选择对应的英文';
        else if (lt === 'phrase_en') titleEl.textContent = '这个短语的中文意思是？';
        else if (lt === 'phrase_zh') titleEl.textContent = '请选择对应的英文短语';
    }

    // 主标题按学习类型显示（英文/中文/短语）
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
        if (lt === 'word' && fixedWord.phonetic) { phoneticElement.textContent = fixedWord.phonetic; phoneticElement.style.display = 'block'; }
        else { phoneticElement.style.display = 'none'; }
    }

    document.getElementById('learnOptions').style.display = 'block';
    document.getElementById('wordChinese').style.display = 'none';
    document.getElementById('learnResult').style.display = 'none';
    document.getElementById('wordPhrase').style.display = 'none';

    generateLearnChoices(fixedWord);
    updateWordImage(fixedWord);

    if (getSettings().autoPlay) {
        try {
            if (window.TTS) {
                const ltNow = getLT();
                const enText = fixedWord.phrase || fixedWord.standardized || fixedWord.word;
                const zhText = fixedWord.phraseTranslation || fixedWord.chinese;
                if (ltNow === 'word' || ltNow === 'phrase_zh' || ltNow === 'word_zh') {
                    // 默认播放英文（更有学习价值）
                    TTS.speak(enText || '', { lang: 'en-US', rate: Math.max(0.6, getSettings().speechRate * 0.8), pitch: getSettings().speechPitch, volume: getSettings().speechVolume });
                } else {
                    // phrase_en 也播放英文短语
                    TTS.speak(enText || '', { lang: 'en-US', rate: Math.max(0.6, getSettings().speechRate * 0.8), pitch: getSettings().speechPitch, volume: getSettings().speechVolume });
                }
            }
        } catch (e) {}
    }

    updateProgressBar();
    updateNavigationButtons();
    if (getSettings().kindergartenMode) { updateGroupDisplay(); }

    try {
      const vocabId = document.getElementById('vocabSelect').value;
      const ltSave = getLT();
      const key = getPerVocabIndexKey(vocabId, ltSave);
      localStorage.setItem(key, String(currentWordIndex));
    } catch(e) { /* ignore */ }
}

// ���µ���ͼƬ
function updateWordImage(word) {
    const imageElement = document.getElementById('wordImage');
    if (!imageElement) return;
    
    if (word.imageURLs && word.imageURLs.length > 0 && getSettings().showImages) {
        imageElement.style.display = 'block';
        
        // 异步获取可直链的图片 URL
        convertToDirectImageUrl(word.imageURLs[0].url, word.imageURLs[0].filename)
            .then(imageUrl => {
                imageElement.src = imageUrl;
            })
            .catch(error => {
                console.warn('Failed to load image:', error);
                imageElement.src = createPlaceholderImage();
            });
            
        imageElement.onerror = function() {
            this.src = createPlaceholderImage();
        };
    } else {
        imageElement.style.display = 'none';
    }
}

// ���½�����
function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    if (!progressFill) return;
    
    const progress = ((currentWordIndex + 1) / currentVocabulary.length) * 100;
    progressFill.style.width = progress + '%';
}

// ���µ�����ť
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

// ����ѧϰѡ��
function generateLearnChoices(correctWord) {
    // 原有逻辑保留，仅修正注释/提示文本
    const lt = getLT();
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

    // 构建候选集（根据学习类型）
    if (lt === 'word') {
        correctAnswer = correctWord.chinese;
        choices.push(correctAnswer);
        const similar = getSimilarWords(correctWord, 6).map(w => w.chinese).filter(Boolean);
        pickRandom([...new Set(similar)], 6).forEach(c => { if (!choices.includes(c)) choices.push(c); });
    } else if (lt === 'word_zh') {
        correctAnswer = correctWord.standardized || correctWord.word;
        choices.push(correctAnswer);
        const similar = getSimilarWords(correctWord, 6).map(w => (w.standardized || w.word)).filter(Boolean);
        pickRandom([...new Set(similar)], 6).forEach(c => { if (!choices.includes(c)) choices.push(c); });
    } else if (lt === 'phrase_en') {
        correctAnswer = correctWord.phraseTranslation || correctWord.chinese || '';
        choices.push(correctAnswer);
        const pool = currentVocabulary.filter(w => (w.phraseTranslation || w.chinese)).map(w => (w.phraseTranslation || w.chinese)).filter(Boolean);
        pickRandom(pool.filter(t => t !== correctAnswer), 6).forEach(c => { if (!choices.includes(c)) choices.push(c); });
    } else if (lt === 'phrase_zh') {
        correctAnswer = correctWord.phrase || correctWord.standardized || correctWord.word || '';
        choices.push(correctAnswer);
        const pool = currentVocabulary.filter(w => (w.phrase || w.standardized || w.word)).map(w => (w.phrase || w.standardized || w.word)).filter(Boolean);
        pickRandom(pool.filter(t => t !== correctAnswer), 6).forEach(c => { if (!choices.includes(c)) choices.push(c); });
    }

    // 补足到4项
    while (choices.length < 4) {
        const any = (lt === 'word' || lt === 'phrase_en')
            ? (currentVocabulary[Math.floor(Math.random()*currentVocabulary.length)].chinese)
            : (currentVocabulary[Math.floor(Math.random()*currentVocabulary.length)].standardized || currentVocabulary[Math.floor(Math.random()*currentVocabulary.length)].word);
        if (any && !choices.includes(any)) choices.push(any);
        if (choices.length > 10) break; // 保险退出
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

        // 短按/长按
        let pressTimer = null; let longPressed = false;
        const clearPress = () => { if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; } };
        const startPress = () => {
            longPressed = false;
            const threshold = Math.max(200, Math.min(1000, (getSettings().longPressMs || 320)));
            pressTimer = setTimeout(() => {
                longPressed = true;
                if (getSettings().pressMode === 'shortSpeak') {
                    selectLearnChoice(choiceElement, choice, correctAnswer);
                } else {
                    // 长按发音
                    try {
                        if (optionIsEnglish) { if (window.TTS) TTS.speak(choice, { lang: 'en-US', rate: Math.max(0.6, settings.speechRate * 0.8), pitch: settings.speechPitch, volume: settings.speechVolume }); }
                        else { if (window.TTS) TTS.speak(choice, { lang: 'zh-CN', rate: Math.max(0.6, settings.speechRate * 0.9), pitch: settings.speechPitch, volume: settings.speechVolume }); }
                    } catch(e){}
                }
            }, threshold);
        };
        const endPress = () => {
            if (pressTimer) {
                clearTimeout(pressTimer);
                if (!longPressed) {
                    if (getSettings().pressMode === 'shortSpeak') {
                        try {
                            if (optionIsEnglish) { if (window.TTS) TTS.speak(choice, { lang: 'en-US', rate: Math.max(0.6, settings.speechRate * 0.8), pitch: settings.speechPitch, volume: settings.speechVolume }); }
                            else { if (window.TTS) TTS.speak(choice, { lang: 'zh-CN', rate: Math.max(0.6, settings.speechRate * 0.9), pitch: settings.speechPitch, volume: settings.speechVolume }); }
                        } catch(e){}
                    } else {
                        selectLearnChoice(choiceElement, choice, correctAnswer);
                    }
                }
            }
        };
        choiceElement.addEventListener('pointerdown', startPress);
        choiceElement.addEventListener('pointerup', endPress);
        choiceElement.addEventListener('pointerleave', () => { clearPress(); });
        choiceElement.addEventListener('pointercancel', () => { clearPress(); });

        choiceElement.onclick = () => selectLearnChoice(choiceElement, choice, correctAnswer);
        choicesContainer.appendChild(choiceElement);
    });
}

// 选择学习选项（修复：声明为 async 以支持内部 await）
async function selectLearnChoice(element, selected, correct) {
    // ��������ѡ��
    document.querySelectorAll('.learn-choice').forEach(choice => {
        choice.style.pointerEvents = 'none';
        if (choice.textContent === correct) {
            choice.classList.add('correct');
        } else if (choice === element) {
            choice.classList.add('wrong');
        }
    });
    
    // ��ʾ���
    const resultElement = document.getElementById('learnResult');
    if (resultElement) {
        resultElement.style.display = 'block';
        
        if (selected === correct) {
            resultElement.textContent = '✅ 回答正确！';
            resultElement.className = 'learn-result correct';
            
            // 创建奖励动画
            createStarAnimation();
            
            // 幼儿园模式额外奖励
            if (getSettings().kindergartenMode) {
                handleCorrectAnswer();
            }
            
        } else {
            resultElement.textContent = `❌ 回答错误！正确答案是：${correct}`;
            resultElement.className = 'learn-result wrong';
        }
    }
    
    // 选择时先发音被选中文本（中文），等待发音完成后再继续
    try {
        if (window.TTS) {
            await TTS.speak(selected, { lang: 'zh-CN', rate: Math.max(0.6, getSettings().speechRate * 0.9), pitch: getSettings().speechPitch, volume: getSettings().speechVolume });
        }
    } catch (e) { /* ignore */ }

    // 延迟显示短语
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
    
    // 延迟显示中文
    setTimeout(() => {
        const wordChinese = document.getElementById('wordChinese');
        if (wordChinese) {
            wordChinese.textContent = correct;
            wordChinese.style.display = 'block';
        }
        
        // 回答正确自动跳转到下一个（等待选择发音完成后再开始计时）
        if (selected === correct) {
            setTimeout(() => {
                if (currentWordIndex < currentVocabulary.length - 1) {
                    nextWord();
                }
            }, 2000);
        }
    }, CONFIG.ANIMATION.ANSWER_DELAY);
}

// ��һ����
function previousWord() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        updateWordDisplay();
        updateStats();
        // 保存索引
        try {
          const vocabId = document.getElementById('vocabSelect').value;
          const lt = (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word');
          const key = getPerVocabIndexKey(vocabId, lt);
          localStorage.setItem(key, String(currentWordIndex));
        } catch(e) { /* ignore */ }
    }
}

// ��һ����
function nextWord() {
    if (currentWordIndex < currentVocabulary.length - 1) {
        currentWordIndex++;
        updateWordDisplay();
        updateStats();
        
        // ��¼ѧϰ����
        saveProgress();
        // 保存索引
        try {
          const vocabId = document.getElementById('vocabSelect').value;
          const lt = (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word');
          const key = getPerVocabIndexKey(vocabId, lt);
          localStorage.setItem(key, String(currentWordIndex));
        } catch(e) { /* ignore */ }
    }
}

// ���ŷ���
function playAudio() {
    const word = getCurrentWord();
    if (!word) return;
    const settings = getSettings();
    const lt = getLT();
    const text = (lt === 'phrase_en' || lt === 'phrase_zh') ? (word.phrase || word.standardized || word.word) : (word.standardized || word.word);
    if (window.TTS) {
        TTS.speak(text, { lang: 'en-US', rate: Math.max(0.6, settings.speechRate * 0.8), pitch: settings.speechPitch, volume: settings.speechVolume });
    }
}

// ��������
function playChinese(text) {
    if (!text) return;

    const settings = getSettings();

    // ʹ�� TTS ���������������ģ�
    if (window.TTS) {
        TTS.speak(text, {
            lang: 'zh-CN',
            rate: Math.max(0.6, settings.speechRate * 0.9),
            pitch: settings.speechPitch,
            volume: settings.speechVolume
        });
    }
}

// ����ͳ����Ϣ
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

// ���̿�ݼ�����
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

// ��ʼ����Ϸ
function initializeGame() {
    // ���Ӽ����¼�����
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // ҳ��ж��ʱ�������
    window.addEventListener('beforeunload', function() {
        saveProgress();
    });
    
    // ��ʼ���׶�԰ģʽ��������ã�
    if (getSettings().kindergartenMode) {
        initializeKindergartenMode();
    }
    
    // ����Ĭ�ϴʿ�
    const defaultVocab = document.getElementById('vocabSelect').value;
    if (defaultVocab.includes('幼儿园') || defaultVocab === 'kindergarten_vocabulary') {
        loadVocabulary();
    }
}


// ģʽ�л�
function setLearnType(type) {
  if (!['word','word_zh','phrase_en','phrase_zh'].includes(type)) return;
  try { localStorage.setItem(CONFIG.STORAGE_KEYS.LEARN_TYPE, type); } catch(e) {}
  if (typeof learnType !== 'undefined') { learnType = type; } else { window.learnType = type; }
  // 按钮高亮
  const btns = document.querySelectorAll('.learn-type-btn');
  btns.forEach(b => b.classList.remove('active'));
  const map = {word: '.learn-type-btn.word', word_zh: '.learn-type-btn.word_zh', phrase_en: '.learn-type-btn.phrase_en', phrase_zh: '.learn-type-btn.phrase_zh'};
  const activeBtn = document.querySelector(map[type]);
  if (activeBtn) activeBtn.classList.add('active');
  if (currentVocabulary && currentVocabulary.length) {
    // 尝试恢复该词库+类型对应的索引
    try {
      const vocabId = document.getElementById('vocabSelect').value;
      const key = getPerVocabIndexKey(vocabId, type);
      const saved = localStorage.getItem(key);
      if (saved != null) {
        const idx = parseInt(saved, 10);
        if (!Number.isNaN(idx) && idx >= 0 && idx < currentVocabulary.length) {
          currentWordIndex = idx;
        }
      }
    } catch(e) { /* ignore */ }

    loadProgress();
    updateWordDisplay();
    generateLearnChoices(getCurrentWord());
    updateNavigationButtons();
  }
  try {
    if (getSettings().kindergartenMode) {
      loadKindergartenProgress();
      updateGroupDisplay();
      updateRewardDisplay();
    }
  } catch(e) { console.warn('刷新幼儿园进度失败', e); }
}

// ��ʼ��ͬ����ť����״̬
document.addEventListener('DOMContentLoaded', () => {
  try {
    const stored = (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word');
    setLearnType(stored);
  } catch(e) { setLearnType('word'); }
});