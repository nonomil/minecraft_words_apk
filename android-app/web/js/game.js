// ����Ϸ�߼���غ���

// ģʽ�л�
function switchMode(mode) {
    currentMode = mode;
    
    // ���°�ť״̬
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.mode-btn.${mode}`).classList.add('active');
    
    // ��ʾ��Ӧ����
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
    
    // �޸��ʻ�����
    const fixedWord = fixWordData(word);
    
    // ���»�����Ϣ
    document.getElementById('wordEnglish').textContent = fixedWord.standardized || fixedWord.word;
    document.getElementById('wordCategory').textContent = `${fixedWord.category || 'δ����'} - ${fixedWord.difficulty || 'δ֪�Ѷ�'}`;
    
    // ��ʾ����
    const phoneticElement = document.getElementById('wordPhonetic');
    if (fixedWord.phonetic) {
        phoneticElement.textContent = fixedWord.phonetic;
        phoneticElement.style.display = 'block';
    } else {
        phoneticElement.style.display = 'none';
    }
    
    // ������ʾ״̬
    document.getElementById('learnOptions').style.display = 'block';
    document.getElementById('wordChinese').style.display = 'none';
    document.getElementById('learnResult').style.display = 'none';
    document.getElementById('wordPhrase').style.display = 'none';
    
    // ����ѧϰѡ��
    generateLearnChoices(fixedWord);
    
    // ����ͼƬ
    updateWordImage(fixedWord);
    
    // �Զ����ŷ�����ʹ��ͳһ TTS ��������
    if (getSettings().autoPlay) {
        try { playAudio(); } catch (e) {}
    }
    
    // ���½�����
    updateProgressBar();
    
    // ���°�ť״̬
    updateNavigationButtons();
    
    // ������׶�԰ģʽ�����·�����ʾ
    if (getSettings().kindergartenMode) {
        updateGroupDisplay();
    }
}

// ���µ���ͼƬ
function updateWordImage(word) {
    const imageElement = document.getElementById('wordImage');
    if (!imageElement) return;
    
    if (word.imageURLs && word.imageURLs.length > 0 && getSettings().showImages) {
        imageElement.style.display = 'block';
        
        // �첽��ȡ��ʵͼƬURL
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
    const choices = [correctWord.chinese];
    
    // ��ȡ���ƴʻ���Ϊ����ѡ��
    const similarWords = getSimilarWords(correctWord, 3);
    similarWords.forEach(word => {
        if (!choices.includes(word.chinese)) {
            choices.push(word.chinese);
        }
    });
    
    // ���ѡ������������ʻ������ѡ��
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
    
    // �������ѡ��
    const shuffledChoices = shuffleArray(choices);
    
    // ����ѡ��HTML
    const choicesContainer = document.getElementById('learnChoices');
    if (!choicesContainer) return;
    
    choicesContainer.innerHTML = '';
    
    // �������ѡ���Ϊÿ��ѡ�����ӡ���ͣ�ʶ����ġ�
    shuffledChoices.forEach(choice => {
        const choiceElement = document.createElement('div');
        choiceElement.className = 'learn-choice';
        choiceElement.textContent = choice;
        choiceElement.onclick = () => selectLearnChoice(choiceElement, choice, correctWord.chinese);
        
        // ��ͣʱ�ʶ���ѡ���Ӧ�����ģ���΢����������Ƶ��������
        const speakOnHover = debounce(() => {
            try { playChinese(choice); } catch (e) { /* ignore */ }
        }, 300);
        choiceElement.addEventListener('mouseenter', speakOnHover);
        
        choicesContainer.appendChild(choiceElement);
    });
}

// ����ѧϰѡ��
function selectLearnChoice(element, selected, correct) {
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
        
        // 回答正确自动跳转到下一个
        if (selected === correct) {
            setTimeout(() => {
                if (currentWordIndex < currentVocabulary.length - 1) {
                    nextWord();
                }
            }, 2000); // 显示 2 秒后自动跳转
        }
    }, CONFIG.ANIMATION.ANSWER_DELAY);
}

// ��һ������
function previousWord() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        updateWordDisplay();
        updateStats();
    }
}

// ��һ������
function nextWord() {
    if (currentWordIndex < currentVocabulary.length - 1) {
        currentWordIndex++;
        updateWordDisplay();
        updateStats();
        
        // ��¼ѧϰ����
        saveProgress();
    }
}

// ���ŷ���
function playAudio() {
    const word = getCurrentWord();
    if (!word) return;
    
    const text = word.standardized || word.word;
    const settings = getSettings();
    
    // ʹ�� TTS ������������Ӣ�ģ�
    if (window.TTS) {
        TTS.speak(text, {
            lang: 'en-US',
            rate: Math.max(0.6, settings.speechRate * 0.8), // ��������
            pitch: settings.speechPitch,
            volume: settings.speechVolume
        });
    }
}

// ���ķ���������ѧϰģʽ�С���ͣѡ��ʱ�ʶ����ġ�
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
    if (defaultVocab.includes('�׶�԰') || defaultVocab === 'kindergarten_vocabulary') {
        loadVocabulary();
    }
}


// ģʽ�л�
function setLearnType(type) {
  if (!['word','phrase_en','phrase_zh'].includes(type)) return;
  try { localStorage.setItem(CONFIG.STORAGE_KEYS.LEARN_TYPE, type); } catch(e) {}
  if (typeof learnType !== 'undefined') { learnType = type; } else { window.learnType = type; }
  // ���ť��ʽ
  const btns = document.querySelectorAll('.learn-type-btn');
  btns.forEach(b => b.classList.remove('active'));
  const map = {word: '.learn-type-btn.word', phrase_en: '.learn-type-btn.phrase_en', phrase_zh: '.learn-type-btn.phrase_zh'};
  const activeBtn = document.querySelector(map[type]);
  if (activeBtn) activeBtn.classList.add('active');
  // �����������ؽ��������
  if (currentVocabulary && currentVocabulary.length) {
    // ��������ѧϰѡ��������
    loadProgress();
    updateWordDisplay();
    generateLearnChoices(getCurrentWord());
    updateNavigationButtons();
  }
  // ͬ���׶�԰���������ڿ����׶�԰ģʽʱ��
  try {
    if (getSettings().kindergartenMode) {
      loadKindergartenProgress();
      updateGroupDisplay();
      updateRewardDisplay();
    }
  } catch(e) { console.warn('ˢ���׶�԰����ʧ��', e); }
}

// ��ʼ��ͬ����ť����״̬����ҳ�������ɺ�ִ�У�
document.addEventListener('DOMContentLoaded', () => {
  try {
    const stored = (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word');
    setLearnType(stored);
  } catch(e) { setLearnType('word'); }
});