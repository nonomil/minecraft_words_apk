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
    
    // 更新基本信息
    document.getElementById('wordEnglish').textContent = fixedWord.standardized || fixedWord.word;
    document.getElementById('wordCategory').textContent = `${fixedWord.category || '未分类'} - ${fixedWord.difficulty || '未知难度'}`;
    
    // 显示音标
    const phoneticElement = document.getElementById('wordPhonetic');
    if (fixedWord.phonetic) {
        phoneticElement.textContent = fixedWord.phonetic;
        phoneticElement.style.display = 'block';
    } else {
        phoneticElement.style.display = 'none';
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
    
    // 自动播放发音（立即触发，无延迟）
    if (getSettings().autoPlay) {
        // 确保语音合成已准备好
        if (speechSynthesis.getVoices().length === 0) {
            speechSynthesis.addEventListener('voiceschanged', () => {
                playAudio();
            }, { once: true });
        } else {
            playAudio();
        }
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
    const choices = [correctWord.chinese];
    
    // 获取相似词汇作为错误选项
    const similarWords = getSimilarWords(correctWord, 3);
    similarWords.forEach(word => {
        if (!choices.includes(word.chinese)) {
            choices.push(word.chinese);
        }
    });
    
    // 如果选项不够，从其他词汇中随机选择
    while (choices.length < 4 && currentVocabulary.length > choices.length) {
        const otherWords = currentVocabulary.filter(w => 
            w.chinese !== correctWord.chinese && !choices.includes(w.chinese)
        );
        
        if (otherWords.length > 0) {
            const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)];
            choices.push(randomWord.chinese);
        } else {
            break;
        }
    }
    
    // 随机排序选项
    const shuffledChoices = shuffleArray(choices);
    
    // 生成选项HTML
    const choicesContainer = document.getElementById('learnChoices');
    if (!choicesContainer) return;
    
    choicesContainer.innerHTML = '';
    
    // 逐个创建选项，并为每个选项添加“悬停朗读中文”
    shuffledChoices.forEach(choice => {
        const choiceElement = document.createElement('div');
        choiceElement.className = 'learn-choice';
        choiceElement.textContent = choice;
        choiceElement.onclick = () => selectLearnChoice(choiceElement, choice, correctWord.chinese);
        
        // 悬停时朗读该选项对应的中文（轻微防抖，避免频繁触发）
        const speakOnHover = debounce(() => {
            try { playChinese(choice); } catch (e) { /* ignore */ }
        }, 300);
        choiceElement.addEventListener('mouseenter', speakOnHover);
        
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
    if (currentWordIndex > 0) {
        currentWordIndex--;
        updateWordDisplay();
        updateStats();
    }
}

// 下一个单词
function nextWord() {
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
    
    const text = word.standardized || word.word;
    
    if (currentUtterance) {
        speechSynthesis.cancel();
    }
    
    currentUtterance = new SpeechSynthesisUtterance(text);
    const settings = getSettings();
    
    // 使用更清晰的女声，降低语速
    currentUtterance.rate = Math.max(0.6, settings.speechRate * 0.8); // 降低语速
    currentUtterance.pitch = settings.speechPitch;
    currentUtterance.volume = settings.speechVolume;
    currentUtterance.lang = 'en-US';
    
    // 尝试选择更好的女声
    const voices = speechSynthesis.getVoices();
    const preferredVoices = voices.filter(voice => 
        voice.lang.startsWith('en') && 
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('karen') ||
        voice.name.toLowerCase().includes('susan')
    );
    
    if (preferredVoices.length > 0) {
        currentUtterance.voice = preferredVoices[0];
    } else {
        // 如果没有找到特定女声，选择第一个英语女声
        const englishVoices = voices.filter(voice => 
            voice.lang.startsWith('en') && !voice.name.toLowerCase().includes('male')
        );
        if (englishVoices.length > 0) {
            currentUtterance.voice = englishVoices[0];
        }
    }
    
    speechSynthesis.speak(currentUtterance);
}

// 中文发音：用于学习模式中“悬停选项时朗读中文”
function playChinese(text) {
    if (!text) return;

    if (currentUtterance) {
        speechSynthesis.cancel();
    }

    currentUtterance = new SpeechSynthesisUtterance(text);
    const settings = getSettings();

    // 中文一般语速略慢更清晰
    currentUtterance.rate = Math.max(0.6, settings.speechRate * 0.9);
    currentUtterance.pitch = settings.speechPitch;
    currentUtterance.volume = settings.speechVolume;
    currentUtterance.lang = 'zh-CN';

    const voices = speechSynthesis.getVoices();
    const preferredZhVoices = voices.filter(voice => {
        const lname = voice.lang ? voice.lang.toLowerCase() : '';
        const n = voice.name ? voice.name.toLowerCase() : '';
        return lname.startsWith('zh') || lname.includes('cmn') || n.includes('chinese') || n.includes('mandarin') || n.includes('xiaoyi') || n.includes('xiaoyan');
    });

    if (preferredZhVoices.length > 0) {
        currentUtterance.voice = preferredZhVoices[0];
    }

    speechSynthesis.speak(currentUtterance);
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
    if (defaultVocab === 'kindergarten_vocabulary') {
        loadVocabulary();
    }
}


// 模式切换
function setLearnType(type) {
  if (!['word','phrase_en','phrase_zh'].includes(type)) return;
  try { localStorage.setItem(CONFIG.STORAGE_KEYS.LEARN_TYPE, type); } catch(e) {}
  if (typeof learnType !== 'undefined') { learnType = type; } else { window.learnType = type; }
  // 激活按钮样式
  const btns = document.querySelectorAll('.learn-type-btn');
  btns.forEach(b => b.classList.remove('active'));
  const map = {word: '.learn-type-btn.word', phrase_en: '.learn-type-btn.phrase_en', phrase_zh: '.learn-type-btn.phrase_zh'};
  const activeBtn = document.querySelector(map[type]);
  if (activeBtn) activeBtn.classList.add('active');
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