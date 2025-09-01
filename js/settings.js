// 设置管理相关函数

// 获取当前设置
function getSettings() {
    const settings = {
        speechRate: parseFloat(document.getElementById('speechRate')?.value || CONFIG.DEFAULT_SETTINGS.speechRate),
        speechPitch: parseFloat(document.getElementById('speechPitch')?.value || CONFIG.DEFAULT_SETTINGS.speechPitch),
        speechVolume: parseFloat(document.getElementById('speechVolume')?.value || CONFIG.DEFAULT_SETTINGS.speechVolume),
        autoPlay: document.getElementById('autoPlay')?.checked ?? CONFIG.DEFAULT_SETTINGS.autoPlay,
        showImages: document.getElementById('showImages')?.checked ?? CONFIG.DEFAULT_SETTINGS.showImages,
        kindergartenMode: document.getElementById('kindergartenMode')?.checked ?? CONFIG.DEFAULT_SETTINGS.kindergartenMode,
        quizCount: document.getElementById('quizCount')?.value || CONFIG.DEFAULT_SETTINGS.quizCount
    };
    
    return settings;
}

// 加载设置
function loadSettings() {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.SETTINGS);
    let settings = CONFIG.DEFAULT_SETTINGS;
    
    if (saved) {
        try {
            settings = { ...CONFIG.DEFAULT_SETTINGS, ...JSON.parse(saved) };
        } catch (error) {
            console.warn('加载设置失败，使用默认设置:', error);
        }
    }
    
    // 应用设置到界面
    applySettingsToUI(settings);
    
    return settings;
}

// 应用设置到界面
function applySettingsToUI(settings) {
    const elements = {
        speechRate: document.getElementById('speechRate'),
        speechPitch: document.getElementById('speechPitch'),
        speechVolume: document.getElementById('speechVolume'),
        autoPlay: document.getElementById('autoPlay'),
        showImages: document.getElementById('showImages'),
        kindergartenMode: document.getElementById('kindergartenMode'),
        quizCount: document.getElementById('quizCount')
    };
    
    Object.keys(elements).forEach(key => {
        const element = elements[key];
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = settings[key];
            } else {
                element.value = settings[key];
            }
        }
    });
    
    // 更新显示值
    updateSettingsDisplay();
    
    // 应用幼儿园模式
    applyKindergartenMode(settings.kindergartenMode);
}

// 保存设置
function saveSettings() {
    const settings = getSettings();
    localStorage.setItem(CONFIG.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    
    // 应用幼儿园模式变化
    applyKindergartenMode(settings.kindergartenMode);
    
    return settings;
}

// 更新设置显示
function updateSettingsDisplay() {
    const rateValue = document.getElementById('rateValue');
    const pitchValue = document.getElementById('pitchValue');
    const volumeValue = document.getElementById('volumeValue');
    const speechRate = document.getElementById('speechRate');
    const speechPitch = document.getElementById('speechPitch');
    const speechVolume = document.getElementById('speechVolume');
    
    if (rateValue && speechRate) {
        rateValue.textContent = parseFloat(speechRate.value).toFixed(1);
    }
    
    if (pitchValue && speechPitch) {
        pitchValue.textContent = parseFloat(speechPitch.value).toFixed(1);
    }
    
    if (volumeValue && speechVolume) {
        volumeValue.textContent = parseFloat(speechVolume.value).toFixed(1);
    }
}

// 应用幼儿园模式
function applyKindergartenMode(enabled) {
    if (enabled) {
        document.body.classList.add('kindergarten-mode');
        // 如果有词库加载，初始化幼儿园模式
        if (currentVocabulary.length > 0) {
            initializeKindergartenMode();
        }
    } else {
        document.body.classList.remove('kindergarten-mode');
        // 隐藏奖励系统
        const rewardSystem = document.querySelector('.reward-system');
        if (rewardSystem) {
            rewardSystem.style.display = 'none';
        }
    }
}

// 重置设置
function resetSettings() {
    if (confirm('确定要重置所有设置吗？')) {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.SETTINGS);
        applySettingsToUI(CONFIG.DEFAULT_SETTINGS);
        showNotification('设置已重置为默认值');
    }
}

// 导出设置
function exportSettings() {
    const settings = getSettings();
    const exportData = {
        settings,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `game_settings_${getCurrentDateString()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showNotification('设置已导出');
}

// 导入设置
function importSettings() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (data.settings) {
                    applySettingsToUI(data.settings);
                    saveSettings();
                    showNotification('设置已导入');
                } else {
                    throw new Error('无效的设置文件格式');
                }
            } catch (error) {
                showNotification('导入设置失败: ' + error.message, 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// 进度相关函数
function loadProgress() {
    const key = (function(){
        try {
            const lt = (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word');
            return lt === 'word' ? CONFIG.STORAGE_KEYS.PROGRESS : CONFIG.STORAGE_KEYS.PROGRESS_PHRASE;
        } catch(e) { return CONFIG.STORAGE_KEYS.PROGRESS; }
    })();
    const saved = localStorage.getItem(key);
    if (saved) {
        try {
            const progress = JSON.parse(saved);
            updateProgressDisplay(progress);
        } catch (error) {
            console.warn('加载进度失败:', error);
        }
    } else {
        updateProgressDisplay({});
    }
}

// 更新进度显示
function updateProgressDisplay(progress) {
    const totalStudyTime = document.getElementById('totalStudyTime');
    const studyDays = document.getElementById('studyDays');
    const masteredWords = document.getElementById('masteredWords');
    
    if (totalStudyTime) {
        const timeInMinutes = Math.round((progress.totalTime || 0) / 60000);
        totalStudyTime.textContent = formatTime(progress.totalTime || 0);
    }
    
    if (studyDays) {
        studyDays.textContent = (progress.studyDays || 0) + ' 天';
    }
    
    if (masteredWords) {
        masteredWords.textContent = (progress.masteredWords || 0) + ' 个';
    }
}

// 保存进度
function saveProgress() {
    const key = (function(){
        try {
            const lt = (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word');
            return lt === 'word' ? CONFIG.STORAGE_KEYS.PROGRESS : CONFIG.STORAGE_KEYS.PROGRESS_PHRASE;
        } catch(e) { return CONFIG.STORAGE_KEYS.PROGRESS; }
    })();
    const saved = localStorage.getItem(key);
    const progress = saved ? JSON.parse(saved) : {};
    
    progress.totalTime = (progress.totalTime || 0) + (Date.now() - studyStartTime);
    progress.masteredWords = Math.max(progress.masteredWords || 0, currentWordIndex + 1);
    
    // 检查是否是新的一天
    const today = getCurrentDateString();
    if (progress.lastStudyDate !== today) {
        progress.studyDays = (progress.studyDays || 0) + 1;
        progress.lastStudyDate = today;
    }
    
    localStorage.setItem(key, JSON.stringify(progress));
    studyStartTime = Date.now();
    
    updateProgressDisplay(progress);
}

// 清除进度
function clearProgress() {
    if (confirm('确定要清除所有学习记录吗？此操作不可恢复。')) {
        // 同时清理单词与短语两套键
        localStorage.removeItem(CONFIG.STORAGE_KEYS.PROGRESS);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.PROGRESS_PHRASE);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.KINDERGARTEN_PROGRESS);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.KINDERGARTEN_PROGRESS_PHRASE);
        
        // 重置显示
        updateProgressDisplay({});
        resetKindergartenProgress();
        
        showNotification('学习记录已清除');
    }
}

// 导出进度数据
function exportProgress() {
    const progress_word = localStorage.getItem(CONFIG.STORAGE_KEYS.PROGRESS);
    const progress_phrase = localStorage.getItem(CONFIG.STORAGE_KEYS.PROGRESS_PHRASE);
    const kindergarten_word = localStorage.getItem(CONFIG.STORAGE_KEYS.KINDERGARTEN_PROGRESS);
    const kindergarten_phrase = localStorage.getItem(CONFIG.STORAGE_KEYS.KINDERGARTEN_PROGRESS_PHRASE);
    
    if (!progress_word && !progress_phrase && !kindergarten_word && !kindergarten_phrase) {
        showNotification('没有学习数据可导出', 'error');
        return;
    }
    
    const exportData = {
        progress_word: progress_word ? JSON.parse(progress_word) : null,
        progress_phrase: progress_phrase ? JSON.parse(progress_phrase) : null,
        kindergarten_word: kindergarten_word ? JSON.parse(kindergarten_word) : null,
        kindergarten_phrase: kindergarten_phrase ? JSON.parse(kindergarten_phrase) : null,
        exportDate: new Date().toISOString(),
        version: '1.1'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `learning_progress_${getCurrentDateString()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showNotification('学习数据已导出');
}

// 初始化设置事件监听器
function initializeSettingsEventListeners() {
    // 语音设置滑块
    const speechRate = document.getElementById('speechRate');
    const speechPitch = document.getElementById('speechPitch');
    const speechVolume = document.getElementById('speechVolume');
    
    if (speechRate) {
        speechRate.addEventListener('input', function() {
            updateSettingsDisplay();
            saveSettings();
        });
    }
    
    if (speechPitch) {
        speechPitch.addEventListener('input', function() {
            updateSettingsDisplay();
            saveSettings();
        });
    }
    
    if (speechVolume) {
        speechVolume.addEventListener('input', function() {
            updateSettingsDisplay();
            saveSettings();
        });
    }
    
    // 游戏设置复选框
    const checkboxes = ['autoPlay', 'showImages', 'kindergartenMode'];
    checkboxes.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', saveSettings);
        }
    });
    
    // 测试题目数量
    const quizCount = document.getElementById('quizCount');
    if (quizCount) {
        quizCount.addEventListener('change', saveSettings);
    }
}

// 获取学习统计（基于当前学习类型）
function getLearningStats() {
    const lt = (function(){
        try { return (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word'); } catch(e) { return 'word'; }
    })();
    const progressKey = lt === 'word' ? CONFIG.STORAGE_KEYS.PROGRESS : CONFIG.STORAGE_KEYS.PROGRESS_PHRASE;
    const kgKey = lt === 'word' ? CONFIG.STORAGE_KEYS.KINDERGARTEN_PROGRESS : CONFIG.STORAGE_KEYS.KINDERGARTEN_PROGRESS_PHRASE;
    
    const progress = localStorage.getItem(progressKey);
    const kindergartenProgress = localStorage.getItem(kgKey);
    
    const stats = {
        totalTime: 0,
        studyDays: 0,
        masteredWords: 0,
        quizResults: [],
        kindergarten: {
            totalDiamonds: 0,
            totalSwords: 0,
            currentGroup: 1,
            completedGroups: 0
        }
    };
    
    if (progress) {
        try {
            const data = JSON.parse(progress);
            stats.totalTime = data.totalTime || 0;
            stats.studyDays = data.studyDays || 0;
            stats.masteredWords = data.masteredWords || 0;
            stats.quizResults = data.quizResults || [];
        } catch (error) {
            console.warn('解析学习进度失败:', error);
        }
    }
    
    if (kindergartenProgress) {
        try {
            const data = JSON.parse(kindergartenProgress);
            stats.kindergarten.totalDiamonds = data.totalDiamonds || 0;
            stats.kindergarten.totalSwords = data.totalSwords || 0;
            stats.kindergarten.currentGroup = data.currentGroup || 1;
            stats.kindergarten.completedGroups = (data.currentGroup || 1) - 1;
        } catch (error) {
            console.warn('解析幼儿园进度失败:', error);
        }
    }
    
    return stats;
}