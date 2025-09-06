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
        // 新增：混合幼儿园词库
        mixKindergartenEnabled: document.getElementById('mixKindergartenEnabled')?.checked ?? CONFIG.DEFAULT_SETTINGS.mixKindergartenEnabled,
        mixKindergartenRatio: parseFloat(document.getElementById('mixKindergartenRatio')?.value || CONFIG.DEFAULT_SETTINGS.mixKindergartenRatio),
        quizCount: document.getElementById('quizCount')?.value || CONFIG.DEFAULT_SETTINGS.quizCount,
        // 新增：拼写设置
        spellingDefaultSubmode: document.getElementById('spellingDefaultSubmode')?.value || CONFIG.DEFAULT_SETTINGS.spellingDefaultSubmode,
        spellingHint: document.getElementById('spellingHint')?.checked ?? CONFIG.DEFAULT_SETTINGS.spellingHint,
        // 新增：设备与显示
        deviceMode: document.getElementById('deviceMode')?.value || CONFIG.DEFAULT_SETTINGS.deviceMode,
        uiScale: parseFloat(document.getElementById('uiScale')?.value || CONFIG.DEFAULT_SETTINGS.uiScale),
        compactMode: document.getElementById('compactMode')?.checked ?? CONFIG.DEFAULT_SETTINGS.compactMode
    };
    
    return settings;
}

// 设备模式自动检测（仅用于默认值，不覆盖用户已保存设置）
function detectDeviceMode() {
  try {
    const ua = navigator.userAgent || '';
    const w = window.innerWidth || document.documentElement.clientWidth || 0;
    const h = window.innerHeight || document.documentElement.clientHeight || 0;
    const minDim = Math.min(w, h);
    if (/Mobi|Mobile|Android/.test(ua) || minDim <= 480) return 'phone';
    if (/iPad|Tablet|PlayBook|Silk/.test(ua) || (minDim > 480 && minDim <= 900)) return 'tablet';
    return 'desktop';
  } catch (e) { return 'phone'; }
}

// 加载设置
function loadSettings() {
    const savedStr = localStorage.getItem(CONFIG.STORAGE_KEYS.SETTINGS);
    let savedObj = null;
    let settings = CONFIG.DEFAULT_SETTINGS;
    
    if (savedStr) {
        try {
            savedObj = JSON.parse(savedStr);
        } catch (error) {
            console.warn('加载设置失败，使用默认设置:', error);
        }
    }

    // 合并默认与已保存
    settings = { ...CONFIG.DEFAULT_SETTINGS, ...(savedObj || {}) };

    // 若用户未保存过 deviceMode，则按设备自动检测
    if (!savedObj || typeof savedObj.deviceMode === 'undefined' || savedObj.deviceMode === null) {
        settings.deviceMode = detectDeviceMode();
    }
    // 若用户未保存过 compactMode，则默认仅在 phone 下开启
    if (!savedObj || typeof savedObj.compactMode === 'undefined' || savedObj.compactMode === null) {
        settings.compactMode = (settings.deviceMode === 'phone');
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
        // 新增：混合幼儿园词库
        mixKindergartenEnabled: document.getElementById('mixKindergartenEnabled'),
        mixKindergartenRatio: document.getElementById('mixKindergartenRatio'),
        quizCount: document.getElementById('quizCount'),
        // 新增：拼写设置
        spellingDefaultSubmode: document.getElementById('spellingDefaultSubmode'),
        spellingHint: document.getElementById('spellingHint'),
        // 新增：设备与显示
        deviceMode: document.getElementById('deviceMode'),
        uiScale: document.getElementById('uiScale'),
        compactMode: document.getElementById('compactMode')
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

    // 应用设备/显示设置
    applyDisplaySettings(settings);

    // 同步拼写默认子模式到拼写页面的持久化键（仅当未显式设置过时）
    try {
        const hasExplicit = localStorage.getItem('SPELLING_SUBMODE');
        if (!hasExplicit && settings.spellingDefaultSubmode) {
            localStorage.setItem('SPELLING_SUBMODE', settings.spellingDefaultSubmode);
        }
        // 同步提示偏好（独立键，供拼写页读取）
        localStorage.setItem('SPELLING_HINT', settings.spellingHint ? '1' : '0');
    } catch(e) {}
}

// 保存设置
function saveSettings() {
    const settings = getSettings();
    localStorage.setItem(CONFIG.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    
    // 应用幼儿园模式变化
    applyKindergartenMode(settings.kindergartenMode);

    // 应用设备/显示设置
    applyDisplaySettings(settings);

    // 同步拼写设置到本地键
    try {
        // 默认子模式只在未手动切换过时覆盖
        const hasExplicit = localStorage.getItem('SPELLING_SUBMODE');
        if (!hasExplicit && settings.spellingDefaultSubmode) {
            localStorage.setItem('SPELLING_SUBMODE', settings.spellingDefaultSubmode);
        }
        localStorage.setItem('SPELLING_HINT', settings.spellingHint ? '1' : '0');
        // 若当前在拼写页面并存在切换函数，则应用到UI
        if (typeof setSpellingSubmode === 'function') {
            setSpellingSubmode(localStorage.getItem('SPELLING_SUBMODE') || settings.spellingDefaultSubmode || 'spell');
        }
    } catch(e) {}
    
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
    // 新增：混合比例显示
    const mixRatio = document.getElementById('mixKindergartenRatio');
    const mixRatioValue = document.getElementById('mixKindergartenRatioValue');
    // 新增：界面缩放显示
    const uiScale = document.getElementById('uiScale');
    const uiScaleValue = document.getElementById('uiScaleValue');
    
    if (rateValue && speechRate) {
        rateValue.textContent = parseFloat(speechRate.value).toFixed(1);
    }
    
    if (pitchValue && speechPitch) {
        pitchValue.textContent = parseFloat(speechPitch.value).toFixed(1);
    }
    
    if (volumeValue && speechVolume) {
        volumeValue.textContent = parseFloat(speechVolume.value).toFixed(1);
    }

    if (mixRatio && mixRatioValue) {
        const percent = Math.round(parseFloat(mixRatio.value) * 100);
        mixRatioValue.textContent = percent + '%';
    }

    if (uiScale && uiScaleValue) {
        const percent = Math.round(parseFloat(uiScale.value) * 100);
        uiScaleValue.textContent = percent + '%';
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
    const checkboxes = ['autoPlay', 'showImages', 'kindergartenMode', 'mixKindergartenEnabled'];
    checkboxes.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', saveSettings);
        }
    });

    // 混合比例滑块
    const mixRatioEl = document.getElementById('mixKindergartenRatio');
    if (mixRatioEl) {
        mixRatioEl.addEventListener('input', function() {
            updateSettingsDisplay();
            saveSettings();
        });
    }
    
    // 测试题目数量
    const quizCount = document.getElementById('quizCount');
    if (quizCount) {
        quizCount.addEventListener('change', saveSettings);
    }

    // 新增：设备与显示设置监听
    const deviceModeEl = document.getElementById('deviceMode');
    if (deviceModeEl) {
        deviceModeEl.addEventListener('change', saveSettings);
    }
    const uiScaleEl = document.getElementById('uiScale');
    if (uiScaleEl) {
        uiScaleEl.addEventListener('input', function() {
            updateSettingsDisplay();
            saveSettings();
        });
    }
    const compactModeEl = document.getElementById('compactMode');
    if (compactModeEl) {
        compactModeEl.addEventListener('change', saveSettings);
    }
}

// 获取学习统计（基于当前学习类型）
function getLearningStats() {
  const lt = (function(){
    try { return (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(CONFIG.STORAGE_KEYS.LEARN_TYPE) || 'word'); } catch(e) { return 'word'; }
  })();
  const isWord = (lt === 'word' || lt === 'word_zh');
  const progressKey = isWord ? CONFIG.STORAGE_KEYS.PROGRESS : CONFIG.STORAGE_KEYS.PROGRESS_PHRASE;
  const kgKey = isWord ? CONFIG.STORAGE_KEYS.KINDERGARTEN_PROGRESS : CONFIG.STORAGE_KEYS.KINDERGARTEN_PROGRESS_PHRASE;
    
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

// 在页面任意位置调用以应用设备/显示设置
function applyDisplaySettings(settings) {
  try {
    const body = document.body;
    if (!body) return;

    const device = (settings && settings.deviceMode) || 'phone';
    const compact = !!(settings && settings.compactMode);
    let scale = parseFloat(settings && settings.uiScale);
    if (Number.isNaN(scale)) scale = 1;
    scale = Math.max(0.8, Math.min(1.2, scale));

    // 切换设备模式类名（预留样式钩子）
    body.classList.remove('device-phone', 'device-tablet', 'device-desktop');
    body.classList.add(`device-${device}`);

    // 切换紧凑模式
    body.classList.toggle('compact-mode', compact);

    // 重置缩放相关样式
    body.style.removeProperty('zoom');
    body.style.removeProperty('transform');
    body.style.removeProperty('transform-origin');
    body.style.removeProperty('width');

    // 使用 zoom 优先，transform 兜底
    if (scale !== 1) {
      body.style.zoom = String(scale);
      if (body.style.zoom === '' || body.style.zoom === 'normal') {
        body.style.transform = `scale(${scale})`;
        body.style.transformOrigin = 'top center';
        body.style.width = `${(100 / scale).toFixed(4)}%`;
      }
    }

    // 暴露 CSS 变量，方便样式中进一步使用
    document.documentElement.style.setProperty('--ui-scale', String(scale));
  } catch (err) {
    console.error('applyDisplaySettings failed:', err);
  }
}