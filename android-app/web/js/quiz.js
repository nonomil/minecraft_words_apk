// ����ģʽ��غ���

// ��ʼ����
function startQuiz() {
    if (currentVocabulary.length === 0) {
        showNotification('���ȼ��شʿ�', 'error');
        return;
    }
    
    const quizCount = parseInt(getSettings().quizCount);
    quizWords = getRandomElements(currentVocabulary, Math.min(quizCount, currentVocabulary.length));
    currentQuizIndex = 0;
    quizScore = 0;
    
    // ��ʼ����ʾ
    updateQuizDisplay();
    updateQuizGroupDisplay();
    updateQuizStats();
    updateQuizProgressBar();
}

// ���²�����ʾ
function updateQuizDisplay() {
    if (currentQuizIndex >= quizWords.length) {
        showQuizResults();
        return;
    }
    
    const word = quizWords[currentQuizIndex];
    quizAnswered = false;
    
    // 设定发音顺序：先中文后英文
    currentQuizAudioLang = 'zh';
    
    // 设置题干：提示拼写英文
    const questionTitle = document.querySelector('.quiz-question h3');
    if (questionTitle) {
        const cn = word.chinese || '';
        questionTitle.textContent = cn ? `请拼写：${cn} 的英文` : '请根据发音拼写英文';
    }
    
    // 更新图片
    updateQuizImage(word);
    
    // 生成拼写交互
    generateSpellingTask(word);
    
    // 更新分数/分组/统计/进度
    updateQuizScore();
    updateQuizGroupDisplay();
    updateQuizStats();
    updateQuizProgressBar();
    
    // 重置下一题按钮
    const nextQuizBtn = document.getElementById('nextQuizBtn');
    if (nextQuizBtn) nextQuizBtn.disabled = true;
    
    // 更新播放按钮文案并自动播放提示
    updateQuizAudioButton();
    setTimeout(() => { playQuizAudio(); }, 500);
}

// ���²���ͼƬ
function updateQuizImage(word) {
    const imageElement = document.getElementById('quizImage');
    if (!imageElement) return;
    
    if (word.imageURLs && word.imageURLs.length > 0) {
        // �첽��ȡ��ʵͼƬURL
        convertToDirectImageUrl(word.imageURLs[0].url, word.imageURLs[0].filename)
            .then(imageUrl => {
                imageElement.src = imageUrl;
            })
            .catch(error => {
                console.warn('Failed to load quiz image:', error);
                imageElement.src = createPlaceholderImage('图片无法加载');
            });
            
        imageElement.onerror = function() {
            this.src = createPlaceholderImage('图片无法加载');
        };
    } else {
        imageElement.src = createPlaceholderImage('暂无图片');
    }
}

// ���ɲ���ѡ��
function generateQuizOptions(correctWord) {
    // ��ȷӢ��
    const correctEnglish = (correctWord.word || correctWord.standardized || '').trim();
    const options = [];
    if (correctEnglish) options.push(correctEnglish);
    
    // ��ȡ���ƴʻ���Ϊ����ѡ�ȡӢ�ģ�
    const similarWords = getSimilarWords(correctWord, 6) || [];
    similarWords.forEach(w => {
        const en = (w.word || w.standardized || '').trim();
        if (en && !options.includes(en) && en !== correctEnglish && options.length < 4) {
            options.push(en);
        }
    });
    
    // �������4�����������ʿⲹ��
    while (options.length < 4) {
        const pool = currentVocabulary || [];
        if (!pool.length) break;
        const randomWord = pool[Math.floor(Math.random() * pool.length)];
        const en = (randomWord.word || randomWord.standardized || '').trim();
        if (en && !options.includes(en) && en !== correctEnglish) {
            options.push(en);
        }
        if (pool.length <= options.length + 1) break; // ��ֹ��ѭ��
    }
    
    // �������ѡ��
    const shuffledOptions = shuffleArray(options);
    
    // ����ѡ��HTML�������롰��ͣ��Ӣ��
    const optionsContainer = document.getElementById('quizOptions');
    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';
    
    shuffledOptions.forEach(optionText => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = optionText;
        optionElement.onclick = () => selectQuizOption(optionElement, optionText, correctEnglish);
        
        // 悬停英文的发音，使用可配置延时
        const hoverDelay = (function(){
          const s = (typeof getSettings === 'function') ? getSettings() : null;
          return (s && typeof s.hoverDelayMs === 'number') ? s.hoverDelayMs : ((CONFIG.ANIMATION && CONFIG.ANIMATION.HOVER_TTS_DELAY) ? CONFIG.ANIMATION.HOVER_TTS_DELAY : 150);
        })();
        const onHover = debounce(() => {
            playEnglishOnHover(optionText);
        }, hoverDelay);
        optionElement.addEventListener('mouseenter', onHover);
        
        optionsContainer.appendChild(optionElement);
    });
}

// 选择答案选项
async function selectQuizOption(element, selected, correct) {
    // 选择时先发音被选项
    try {
        const settings = getSettings();
        if (window.TTS) {
            const toSpeak = selected || '';
            const lang = (/[\u4e00-\u9fa5]/.test(toSpeak)) ? 'zh-CN' : 'en-US';
            await TTS.speak(toSpeak, { lang, rate: Math.max(0.6, settings.speechRate * 0.9), pitch: settings.speechPitch, volume: settings.speechVolume });
        }
    } catch(e) { /* ignore */ }

    // 原有选择处理逻辑
    if (quizAnswered) return;
    
    quizAnswered = true;
    
    // ��ʾ����ѡ�����ȷ��
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.style.pointerEvents = 'none';
        if (option.textContent === correct) {
            option.classList.add('correct');
        } else if (option === element) {
            option.classList.add('wrong');
        }
    });
    
    // ���·�������ʾ����
    const resultEl = document.getElementById('quizResult');
    if (selected === correct) {
        quizScore++;
        if (resultEl) {
            resultEl.style.display = 'block';
            resultEl.textContent = '✅ 回答正确！';
            resultEl.className = 'learn-result correct';
        }
        if (getSettings().kindergartenMode) {
            createStarAnimation();
            createPulseEffect(element);
            
            // 奖励系统：答对题目获得钻石
            awardDiamond();
            
            // 检查是否达到钻石剑奖励条件
            if (totalDiamonds > 0 && totalDiamonds % CONFIG.KINDERGARTEN.SWORD_REWARD_THRESHOLD === 0) {
                awardSword();
                // 成就提示仍使用通知
                showNotification('🎉 恭喜获得钻石剑！', 'achievement');
            }
        }
    } else {
        if (resultEl) {
            resultEl.style.display = 'block';
            resultEl.textContent = `❌ 回答错误！正确答案是：${correct}`;
            resultEl.className = 'learn-result wrong';
        }
        if (getSettings().kindergartenMode) {
            element.style.animation = 'wrongShake 0.6s ease-in-out';
        }
    }
    
    // ���·�����ʾ
    updateQuizScore();
    
    // ����ͳ����Ϣ���������������
    updateQuizStats();
    
    // ������һ�ⰴť
    const nextQuizBtn = document.getElementById('nextQuizBtn');
    if (nextQuizBtn) {
        nextQuizBtn.disabled = false;
    }
    
    // �Զ�������һ�⣨1.2s ��
    setTimeout(() => {
        nextQuiz();
    }, 1200);
}

// ���²��Է�����ʾ
function updateQuizScore() {
    const quizScoreElement = document.getElementById('quizScore');
    const quizTotalElement = document.getElementById('quizTotal');
    const quizAccuracyElement = document.getElementById('quizAccuracy');
    
    if (quizScoreElement) {
        quizScoreElement.textContent = quizScore;
    }
    
    if (quizTotalElement) {
        quizTotalElement.textContent = currentQuizIndex + (quizAnswered ? 1 : 0);
    }
    
    if (quizAccuracyElement) {
        const total = currentQuizIndex + (quizAnswered ? 1 : 0);
        const accuracy = total > 0 ? Math.round((quizScore / total) * 100) : 0;
        quizAccuracyElement.textContent = accuracy + '%';
    }
}

// ��һ��
function nextQuiz() {
    currentQuizIndex++;
    updateQuizDisplay();
}

// ���Ų�����Ƶ
// ��ǰ��������״̬
let currentQuizAudioLang = 'zh'; // 'zh' Ϊ���ģ�'en' ΪӢ��

function playQuizAudio() {
    if (quizWords.length === 0 || currentQuizIndex >= quizWords.length) return;
    const word = quizWords[currentQuizIndex];
    
    // ���ݵ�ǰ����״̬���Ŷ�Ӧ����
    if (currentQuizAudioLang === 'zh') {
        playQuizChinese(word);
    } else {
        playQuizEnglish(word);
    }
    
    // �л�����һ������
    currentQuizAudioLang = currentQuizAudioLang === 'zh' ? 'en' : 'zh';
    
    // ���°�ť�ı���ʾ
    updateQuizAudioButton();
}

// �������ķ���
function playQuizChinese(word) {
    const text = (word.chinese || '').trim();
    if (!text) return;

    const settings = getSettings();

    if (window.TTS) {
        TTS.speak(text, {
            lang: 'zh-CN',
            rate: Math.max(0.85, settings.speechRate * 0.95),
            pitch: settings.speechPitch,
            volume: settings.speechVolume
        });
    }
}

// ����Ӣ�ķ���
function playQuizEnglish(word) {
    const text = (word.standardized || word.word || '').trim();
    if (!text) return;

    const settings = getSettings();

    if (window.TTS) {
        TTS.speak(text, {
            lang: 'en-US',
            rate: Math.max(0.6, settings.speechRate * 0.8),
            pitch: settings.speechPitch,
            volume: settings.speechVolume
        });
    }
}

// ���·�����ť�ı�
function updateQuizAudioButton() {
    const audioBtn = document.querySelector('#quizMode .control-btn.play');
    if (audioBtn) {
        if (currentQuizAudioLang === 'zh') {
            audioBtn.innerHTML = '🔊 听中文';
            audioBtn.title = '点击播放中文发音';
        } else {
            audioBtn.innerHTML = '🔊 听英文';
            audioBtn.title = '点击播放英文发音';
        }
    }
}

// ���²��Է��������ʾ
function updateQuizGroupDisplay() {
    if (!getSettings().kindergartenMode) return;
    
    const wordsPerGroup = CONFIG.KINDERGARTEN.WORDS_PER_GROUP;
    const currentGroup = Math.floor(currentQuizIndex / wordsPerGroup) + 1;
    const groupProgress = (currentQuizIndex % wordsPerGroup) + 1;
    
    const currentGroupElement = document.getElementById('currentQuizGroup');
    const groupProgressElement = document.getElementById('quizGroupProgress');
    const groupProgressFill = document.getElementById('quizGroupProgressFill');
    
    if (currentGroupElement) {
        currentGroupElement.textContent = currentGroup;
    }
    
    if (groupProgressElement) {
        groupProgressElement.textContent = groupProgress;
    }
    
    if (groupProgressFill) {
        const progressPercentage = (groupProgress / wordsPerGroup) * 100;
        groupProgressFill.style.width = `${progressPercentage}%`;
    }
}

// ���²���ͳ����Ϣ
function updateQuizStats() {
    const currentQuizIndexElement = document.getElementById('currentQuizIndex');
    const totalQuizWordsElement = document.getElementById('totalQuizWords');
    const correctCountElement = document.getElementById('correctCount');
    
    if (currentQuizIndexElement) {
        currentQuizIndexElement.textContent = currentQuizIndex + 1;
    }
    
    if (totalQuizWordsElement) {
        totalQuizWordsElement.textContent = quizWords.length;
    }
    
    if (correctCountElement) {
        correctCountElement.textContent = quizScore;
    }
}

// ���²��Խ�����
function updateQuizProgressBar() {
    const progressFill = document.getElementById('quizProgressFill');
    if (progressFill && quizWords.length > 0) {
        const progressPercentage = ((currentQuizIndex + 1) / quizWords.length) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }
}

// ��ʾ���Խ��
function showQuizResults() {
    const accuracy = Math.round((quizScore / quizWords.length) * 100);
    let message = `测试完成！\n得分：${quizScore}/${quizWords.length}\n正确率：${accuracy}%`;
    let emoji = '';
    
    if (accuracy >= 90) {
        message += '\n太棒了！';
        emoji = '🏆';
    } else if (accuracy >= 70) {
        message += '\n做得好！';
        emoji = '✨';
    } else if (accuracy >= 60) {
        message += '\n继续努力~';
        emoji = '🙂';
    } else {
        message += '\n多多练习会更好哦~';
        emoji = '💪';
    }
    
    // 幼儿园模式下的奖励与特效
    if (getSettings().kindergartenMode) {
        if (accuracy >= 80) {
            createFireworks();
            createHeartAnimation();
        } else if (accuracy >= 60) {
            createRainbowParticles();
        }
        
        // 显示成就
        showAchievement(`${emoji} 测试完成！\n得分：${quizScore}/${quizWords.length}\n正确率：${accuracy}%`);
    } else {
        alert(message);
    }
    
    // 保存测试记录
    saveQuizResult(quizScore, quizWords.length, accuracy);
}

// ���¿�ʼ����
function restartQuiz() {
    if (currentVocabulary.length === 0) {
        showNotification('请先加载词库', 'error');
        return;
    }
    
    startQuiz();
}

// ������Խ��
function saveQuizResult(score, total, accuracy) {
    // 根据学习类型选择进度键，兼容 word_zh
    const lt = (function(){
        try { return (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word'); } catch(e) { return 'word'; }
    })();
    const progressKey = (lt === 'word' || lt === 'word_zh') ? CONFIG.STORAGE_KEYS.PROGRESS : CONFIG.STORAGE_KEYS.PROGRESS_PHRASE;

    const saved = localStorage.getItem(progressKey) || localStorage.getItem(CONFIG.STORAGE_KEYS.PROGRESS);
    const progress = saved ? JSON.parse(saved) : {};
    
    progress.quizResults = progress.quizResults || [];
    progress.quizResults.push({
        date: new Date().toISOString(),
        score: score,
        total: total,
        accuracy: accuracy,
        vocabulary: document.getElementById('vocabSelect').value,
        learnType: lt
    });
    
    // ֻ�������50�β��Լ�¼
    if (progress.quizResults.length > 50) {
        progress.quizResults = progress.quizResults.slice(-50);
    }
    
    localStorage.setItem(progressKey, JSON.stringify(progress));
}

// ��ȡ����ͳ��
function getQuizStats() {
    const lt = (function(){
        try { return (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word'); } catch(e) { return 'word'; }
    })();
    const progressKey = (lt === 'word' || lt === 'word_zh') ? CONFIG.STORAGE_KEYS.PROGRESS : CONFIG.STORAGE_KEYS.PROGRESS_PHRASE;

    const saved = localStorage.getItem(progressKey) || localStorage.getItem(CONFIG.STORAGE_KEYS.PROGRESS);
    if (!saved) return null;
    
    const progress = JSON.parse(saved);
    const results = progress.quizResults || [];
    
    if (results.length === 0) return null;
    
    const totalTests = results.length;
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const totalQuestions = results.reduce((sum, result) => sum + result.total, 0);
    const averageAccuracy = results.reduce((sum, result) => sum + result.accuracy, 0) / totalTests;
    
    const recentResults = results.slice(-10);
    const recentAccuracy = recentResults.reduce((sum, result) => sum + result.accuracy, 0) / recentResults.length;
    
    return {
        totalTests,
        totalScore,
        totalQuestions,
        averageAccuracy: Math.round(averageAccuracy),
        recentAccuracy: Math.round(recentAccuracy),
        bestScore: Math.max(...results.map(r => r.accuracy)),
        lastTestDate: results[results.length - 1].date
    };
}

// ������������
function exportQuizData() {
    const stats = getQuizStats();
    if (!stats) {
        showNotification('请先加载词库', 'error');
        return;
    }
    const lt = (function(){
        try { return (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word'); } catch(e) { return 'word'; }
    })();
    const progressKey = (lt === 'word' || lt === 'word_zh') ? CONFIG.STORAGE_KEYS.PROGRESS : CONFIG.STORAGE_KEYS.PROGRESS_PHRASE;
    const saved = localStorage.getItem(progressKey) || localStorage.getItem(CONFIG.STORAGE_KEYS.PROGRESS);
    const progress = JSON.parse(saved);
    
    const exportData = {
        learnType: lt,
        stats,
        results: progress.quizResults,
        exportDate: new Date().toISOString(),
        version: '1.1'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz_data_${lt}_${getCurrentDateString()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showNotification('测试数据已导出');
}

// 悬停发音状态（用于节流/提示）
let hoverPlayTimestamps = {};
// 悬停英文发音：带冷却，避免频繁触发
function playEnglishOnHover(text) {
    if (!text) return;
    const COOL_DOWN_MS = 1000; // ��ȴ 1s
    const key = text.toLowerCase();
    const now = Date.now();

    if (hoverPlayTimestamps[key] && now - hoverPlayTimestamps[key] < COOL_DOWN_MS) {
        try { showNotification && showNotification('稍等一下，正在准备发音…', 'info'); } catch (e) {}
        return;
    }
    hoverPlayTimestamps[key] = now;

    const settings = getSettings();

    if (window.TTS) {
        TTS.speak(text, {
            lang: 'en-US',
            rate: Math.max(0.7, settings.speechRate * 0.9),
            pitch: settings.speechPitch,
            volume: settings.speechVolume
        });
    }
}