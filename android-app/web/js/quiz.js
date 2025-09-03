// 测试模式相关函数

// 开始测试
function startQuiz() {
    if (currentVocabulary.length === 0) {
        showNotification('请先加载词库', 'error');
        return;
    }
    
    const quizCount = parseInt(getSettings().quizCount);
    quizWords = getRandomElements(currentVocabulary, Math.min(quizCount, currentVocabulary.length));
    currentQuizIndex = 0;
    quizScore = 0;
    
    // 初始化显示
    updateQuizDisplay();
    updateQuizGroupDisplay();
    updateQuizStats();
    updateQuizProgressBar();
}

// 更新测试显示
function updateQuizDisplay() {
    if (currentQuizIndex >= quizWords.length) {
        showQuizResults();
        return;
    }
    
    const word = quizWords[currentQuizIndex];
    quizAnswered = false;
    
    // 重置发音语言状态为中文
    currentQuizAudioLang = 'zh';
    
    // 更新题干为中文
    const questionTitle = document.querySelector('.quiz-question h3');
    if (questionTitle) {
        questionTitle.textContent = word.chinese || '请选择对应的英文';
    }
    
    // 更新图片
    updateQuizImage(word);
    
    // 生成选项（英文）
    generateQuizOptions(word);
    
    // 更新分数显示
    updateQuizScore();
    
    // 更新分组进度显示
    updateQuizGroupDisplay();
    
    // 更新统计信息
    updateQuizStats();
    
    // 更新进度条
    updateQuizProgressBar();
    
    // 禁用下一题按钮
    const nextQuizBtn = document.getElementById('nextQuizBtn');
    if (nextQuizBtn) {
        nextQuizBtn.disabled = true;
    }
    
    // 更新发音按钮文本
    updateQuizAudioButton();
    
    // 自动播放中文发音
    setTimeout(() => {
        playQuizAudio();
    }, 500);
}

// 更新测试图片
function updateQuizImage(word) {
    const imageElement = document.getElementById('quizImage');
    if (!imageElement) return;
    
    if (word.imageURLs && word.imageURLs.length > 0) {
        // 异步获取真实图片URL
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

// 生成测试选项
function generateQuizOptions(correctWord) {
    // 正确英文
    const correctEnglish = (correctWord.word || correctWord.standardized || '').trim();
    const options = [];
    if (correctEnglish) options.push(correctEnglish);
    
    // 获取相似词汇作为错误选项（取英文）
    const similarWords = getSimilarWords(correctWord, 6) || [];
    similarWords.forEach(w => {
        const en = (w.word || w.standardized || '').trim();
        if (en && !options.includes(en) && en !== correctEnglish && options.length < 4) {
            options.push(en);
        }
    });
    
    // 如果不足4个，从完整词库补齐
    while (options.length < 4) {
        const pool = currentVocabulary || [];
        if (!pool.length) break;
        const randomWord = pool[Math.floor(Math.random() * pool.length)];
        const en = (randomWord.word || randomWord.standardized || '').trim();
        if (en && !options.includes(en) && en !== correctEnglish) {
            options.push(en);
        }
        if (pool.length <= options.length + 1) break; // 防止死循环
    }
    
    // 随机排序选项
    const shuffledOptions = shuffleArray(options);
    
    // 生成选项HTML，并接入“悬停播英”
    const optionsContainer = document.getElementById('quizOptions');
    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';
    
    shuffledOptions.forEach(optionText => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = optionText;
        optionElement.onclick = () => selectQuizOption(optionElement, optionText, correctEnglish);
        
        // 悬停英文发音：300ms 防抖
        const onHover = debounce(() => {
            playEnglishOnHover(optionText);
        }, 300);
        optionElement.addEventListener('mouseenter', onHover);
        
        optionsContainer.appendChild(optionElement);
    });
}

// 选择测试选项
function selectQuizOption(element, selected, correct) {
    if (quizAnswered) return;
    
    quizAnswered = true;
    
    // 显示所有选项的正确性
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.style.pointerEvents = 'none';
        if (option.textContent === correct) {
            option.classList.add('correct');
        } else if (option === element) {
            option.classList.add('wrong');
        }
    });
    
    // 更新分数和显示反馈
    if (selected === correct) {
        quizScore++;
        showNotification('回答正确！', 'success');
        if (getSettings().kindergartenMode) {
            createStarAnimation();
            createPulseEffect(element);
            
            // 奖励系统：答对题目获得钻石
            awardDiamond();
            
            // 检查是否达到钻石剑奖励条件
            if (totalDiamonds > 0 && totalDiamonds % CONFIG.KINDERGARTEN.SWORD_REWARD_THRESHOLD === 0) {
                awardSword();
                showNotification('?? 恭喜获得钻石剑！', 'achievement');
            }
        }
    } else {
        showNotification(`回答错误！正确答案是：${correct}`, 'error');
        if (getSettings().kindergartenMode) {
            element.style.animation = 'wrongShake 0.6s ease-in-out';
        }
    }
    
    // 更新分数显示
    updateQuizScore();
    
    // 更新统计信息（包括答对题数）
    updateQuizStats();
    
    // 启用下一题按钮
    const nextQuizBtn = document.getElementById('nextQuizBtn');
    if (nextQuizBtn) {
        nextQuizBtn.disabled = false;
    }
    
    // 自动进入下一题（1.2s 后）
    setTimeout(() => {
        nextQuiz();
    }, 1200);
}

// 更新测试分数显示
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

// 下一题
function nextQuiz() {
    currentQuizIndex++;
    updateQuizDisplay();
}

// 播放测试音频
// 当前发音语言状态
let currentQuizAudioLang = 'zh'; // 'zh' 为中文，'en' 为英文

function playQuizAudio() {
    if (quizWords.length === 0 || currentQuizIndex >= quizWords.length) return;
    const word = quizWords[currentQuizIndex];
    
    // 根据当前语言状态播放对应发音
    if (currentQuizAudioLang === 'zh') {
        playQuizChinese(word);
    } else {
        playQuizEnglish(word);
    }
    
    // 切换到下一种语言
    currentQuizAudioLang = currentQuizAudioLang === 'zh' ? 'en' : 'zh';
    
    // 更新按钮文本提示
    updateQuizAudioButton();
}

// 播放中文发音
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

// 播放英文发音
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

// 更新发音按钮文本
function updateQuizAudioButton() {
    const audioBtn = document.querySelector('#quizMode .control-btn.play');
    if (audioBtn) {
        if (currentQuizAudioLang === 'zh') {
            audioBtn.innerHTML = '? 听中文';
            audioBtn.title = '点击播放中文发音';
        } else {
            audioBtn.innerHTML = '? 听英文';
            audioBtn.title = '点击播放英文发音';
        }
    }
}

// 更新测试分组进度显示
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

// 更新测试统计信息
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

// 更新测试进度条
function updateQuizProgressBar() {
    const progressFill = document.getElementById('quizProgressFill');
    if (progressFill && quizWords.length > 0) {
        const progressPercentage = ((currentQuizIndex + 1) / quizWords.length) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }
}

// 显示测试结果
function showQuizResults() {
    const accuracy = Math.round((quizScore / quizWords.length) * 100);
    let message = `测试完成！\n得分：${quizScore}/${quizWords.length}\n正确率：${accuracy}%`;
    let emoji = '';
    
    if (accuracy >= 90) {
        message += '\n? 优秀！';
        emoji = '?';
    } else if (accuracy >= 70) {
        message += '\n? 良好！';
        emoji = '?';
    } else if (accuracy >= 60) {
        message += '\n? 继续努力！';
        emoji = '?';
    } else {
        message += '\n? 多练习会更好！';
        emoji = '?';
    }
    
    // 幼儿园模式的特殊效果
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

// 重新开始测试
function restartQuiz() {
    if (currentVocabulary.length === 0) {
        showNotification('请先加载词库', 'error');
        return;
    }
    
    startQuiz();
}

// 保存测试结果
function saveQuizResult(score, total, accuracy) {
    // 根据学习类型选择进度键，默认回退到单词键
    const lt = (function(){
        try { return (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word'); } catch(e) { return 'word'; }
    })();
    const progressKey = lt === 'word' ? CONFIG.STORAGE_KEYS.PROGRESS : CONFIG.STORAGE_KEYS.PROGRESS_PHRASE;

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
    
    // 只保留最近50次测试记录
    if (progress.quizResults.length > 50) {
        progress.quizResults = progress.quizResults.slice(-50);
    }
    
    localStorage.setItem(progressKey, JSON.stringify(progress));
}

// 获取测试统计
function getQuizStats() {
    const lt = (function(){
        try { return (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word'); } catch(e) { return 'word'; }
    })();
    const progressKey = lt === 'word' ? CONFIG.STORAGE_KEYS.PROGRESS : CONFIG.STORAGE_KEYS.PROGRESS_PHRASE;

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

// 导出测试数据
function exportQuizData() {
    const stats = getQuizStats();
    if (!stats) {
        showNotification('没有测试数据可导出', 'error');
        return;
    }
    const lt = (function(){
        try { return (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word'); } catch(e) { return 'word'; }
    })();
    const progressKey = lt === 'word' ? CONFIG.STORAGE_KEYS.PROGRESS : CONFIG.STORAGE_KEYS.PROGRESS_PHRASE;
    
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
    const COOL_DOWN_MS = 1000; // 冷却 1s
    const key = text.toLowerCase();
    const now = Date.now();

    if (hoverPlayTimestamps[key] && now - hoverPlayTimestamps[key] < COOL_DOWN_MS) {
        try { showNotification && showNotification('稍等一下，语音冷却中…', 'info'); } catch (e) {}
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