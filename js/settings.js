// 设置管理相关函数

// 安全获取本地存储键（当 CONFIG 未定义时使用兜底值）
function getStorageKeysSafe() {
  try {
    if (typeof CONFIG !== 'undefined' && CONFIG.STORAGE_KEYS) return CONFIG.STORAGE_KEYS;
  } catch (e) {}
  return {
    SETTINGS: 'settings',
    PROGRESS: 'learningProgress',
    PROGRESS_PHRASE: 'learningProgress_phrase',
    KINDERGARTEN_PROGRESS: 'kgProgress',
    KINDERGARTEN_PROGRESS_PHRASE: 'kgProgress_phrase',
    LEARN_TYPE: 'learnType',
    WORD_RESULTS: 'wordResultsMap',
    WORD_RESULTS_PHRASE: 'wordResultsMap_phrase',
    ACTIVATION_INFO: 'activationInfo',
    TRIAL_USAGE: 'trialUsage'
  };
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

    // 更新设备模式按钮状态
    updateDeviceModeButtons(settings.deviceMode);

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
        // 新增：拼写提示模式（ends/full）
        spellingHintMode: document.getElementById('spellingHintMode'),
        // 新增：设备与显示
        deviceMode: document.getElementById('deviceMode'),
        uiScale: document.getElementById('uiScale'),
        compactMode: document.getElementById('compactMode'),
        // 新增：手机窗口模式
        phoneWindowMode: document.getElementById('phoneWindowMode'),
        // 新增：题目来源过滤
        questionSource: document.getElementById('questionSource')
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

    // 同步拼写默认子模式与提示模式到拼写页面的持久化键（保持兼容旧键）
    try {
        const hasExplicit = localStorage.getItem('SPELLING_SUBMODE');
        if (!hasExplicit && settings.spellingDefaultSubmode) {
            localStorage.setItem('SPELLING_SUBMODE', settings.spellingDefaultSubmode);
        }
        // 兼容老键：始终写入 SPELLING_HINT（非 none 情况写 1）
        localStorage.setItem('SPELLING_HINT', settings.spellingHint ? '1' : '0');
        // 新键：写入提示模式（默认为 full）
        localStorage.setItem('SPELLING_HINT_MODE', settings.spellingHintMode || 'full');
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
        // 兼容写入旧键（是否显示提示）
        localStorage.setItem('SPELLING_HINT', settings.spellingHint ? '1' : '0');
        // 写入新键（提示模式 ends/full/none）
        localStorage.setItem('SPELLING_HINT_MODE', settings.spellingHintMode || 'full');
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
        const v = Math.round(parseFloat(mixRatio.value || '0') * 100);
        mixRatioValue.textContent = `${v}%`;
    }

    if (uiScale && uiScaleValue) {
        const v = Math.round(parseFloat(uiScale.value || '1') * 100);
        uiScaleValue.textContent = `${v}%`;
    }
}

// 应用幼儿园模式
function applyKindergartenMode(enabled) {
    const kindergartenSettings = document.getElementById('kindergartenSettings');
    if (kindergartenSettings) {
        kindergartenSettings.style.display = enabled ? 'block' : 'none';
    }
}

// 重置设置
function resetSettings() {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.SETTINGS);
    showNotification('设置已重置为默认值');
    loadSettings();
}

// 导出设置
function exportSettings() {
    const settings = getSettings();
    const dataStr = JSON.stringify({ settings }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'settings.json';
    a.click();
    
    URL.revokeObjectURL(url);
}

// 导入设置
function importSettings() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function() {
        const file = input.files[0];
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
    const KEYS = getStorageKeysSafe();
    const key = (function(){
        try {
            const lt = (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(KEYS.LEARN_TYPE) || 'word');
            return (lt === 'word' || lt === 'word_zh') ? KEYS.PROGRESS : KEYS.PROGRESS_PHRASE;
        } catch(e) { return KEYS.PROGRESS; }
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
    try {
        const KEYS = getStorageKeysSafe();
        const key = (function(){
            try {
                const lt = (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(KEYS.LEARN_TYPE) || 'word');
                return (lt === 'word' || lt === 'word_zh') ? KEYS.PROGRESS : KEYS.PROGRESS_PHRASE;
            } catch(e) { return KEYS.PROGRESS; }
        })();
        const saved = localStorage.getItem(key);
        const progress = saved ? JSON.parse(saved) : {};
        const baseStart = (typeof studyStartTime !== 'undefined' ? studyStartTime : Date.now());
        progress.totalTime = (progress.totalTime || 0) + (Date.now() - baseStart);
        progress.masteredWords = Math.max(progress.masteredWords || 0, (typeof currentWordIndex !== 'undefined' ? currentWordIndex + 1 : 0));
        
        // 检查是否是新的一天
        const today = getCurrentDateString();
        if (progress.lastStudyDate !== today) {
            progress.studyDays = (progress.studyDays || 0) + 1;
            progress.lastStudyDate = today;
        }
        
        localStorage.setItem(key, JSON.stringify(progress));
        try { studyStartTime = Date.now(); } catch(e) { window.studyStartTime = Date.now(); }
        
        updateProgressDisplay(progress);
    } catch (e) {
        console.warn('saveProgress 失败，已忽略：', e);
    }
}

// 清除进度
function clearProgress() {
    if (confirm('确定要清除所有学习记录吗？此操作不可恢复。')) {
        const KEYS = getStorageKeysSafe();
        // 同时清理单词与短语两套键
        localStorage.removeItem(KEYS.PROGRESS);
        localStorage.removeItem(KEYS.PROGRESS_PHRASE);
        localStorage.removeItem(KEYS.KINDERGARTEN_PROGRESS);
        localStorage.removeItem(KEYS.KINDERGARTEN_PROGRESS_PHRASE);
        
        // 重置显示
        updateProgressDisplay({});
        resetKindergartenProgress();
        
        showNotification('学习记录已清除');
    }
}

// 导出进度数据
function exportProgress() {
    const KEYS = getStorageKeysSafe();
    const progress_word = localStorage.getItem(KEYS.PROGRESS);
    const progress_phrase = localStorage.getItem(KEYS.PROGRESS_PHRASE);
    const kindergarten_word = localStorage.getItem(KEYS.KINDERGARTEN_PROGRESS);
    const kindergarten_phrase = localStorage.getItem(KEYS.KINDERGARTEN_PROGRESS_PHRASE);
    
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

// 切换设备模式
function switchDeviceMode(mode) {
    const settings = getSettings();
    settings.deviceMode = mode;
    saveSettings();

    // 更新按钮状态
    updateDeviceModeButtons(mode);

    // 重新检测手机模式
    if (window.mobileUI) {
        window.mobileUI.detectMobileMode();
        if (window.mobileUI.isInMobileMode()) {
            window.mobileUI.setupMobileUI();
        } else {
            window.mobileUI.disableMobileUI();
        }
    }

    showNotification(`已切换到${mode === 'phone' ? '手机' : mode === 'tablet' ? '平板' : '桌面'}模式`);
}

// 更新设备模式按钮状态
function updateDeviceModeButtons(currentMode) {
    const buttons = ['phone', 'tablet', 'desktop'];
    buttons.forEach(mode => {
        const btn = document.getElementById(mode + 'ModeBtn');
        if (btn) {
            if (mode === currentMode) {
                btn.style.background = 'rgba(255,255,255,0.4)';
                btn.style.borderColor = 'rgba(255,255,255,0.8)';
                btn.style.fontWeight = 'bold';
            } else {
                btn.style.background = 'rgba(255,255,255,0.2)';
                btn.style.borderColor = 'rgba(255,255,255,0.3)';
                btn.style.fontWeight = 'normal';
            }
        }
    });
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

    // 监听拼写提示模式选择（若控件存在）
    const hintModeEl = document.getElementById('spellingHintMode');
    if (hintModeEl) {
        hintModeEl.addEventListener('change', saveSettings);
    }

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

    // 新增：题目来源选择
    const questionSourceEl = document.getElementById('questionSource');
    if (questionSourceEl) {
        questionSourceEl.addEventListener('change', function(){
            saveSettings();
            try {
                // 如有过滤刷新函数，触发立即应用
                if (typeof applyQuestionSourceFilter === 'function') {
                    applyQuestionSourceFilter();
                } else if (typeof updateWordDisplay === 'function') {
                    // 最小化刷新：不变更索引，仅重新渲染
                    updateWordDisplay();
                }
            } catch(e) {}
        });
    }

    // 新增：设备与显示设置监听
    const deviceModeEl = document.getElementById('deviceMode');
    if (deviceModeEl) {
        deviceModeEl.addEventListener('change', function() {
            saveSettings();
            // 设备模式改变时，重新初始化手机UI
            if (window.mobileUI) {
                window.mobileUI.detectMobileMode();
                if (window.mobileUI.isInMobileMode()) {
                    window.mobileUI.setupMobileUI();
                }
            }
        });
    }
    const phoneWindowModeEl = document.getElementById('phoneWindowMode');
    if (phoneWindowModeEl) {
        phoneWindowModeEl.addEventListener('change', function() {
            saveSettings();
            // 手机窗口模式改变时，切换UI模式
            if (window.mobileUI) {
                if (this.checked) {
                    // 启用手机窗口模式
                    window.mobileUI.detectMobileMode();
                    if (window.mobileUI.isInMobileMode()) {
                        window.mobileUI.setupMobileUI();
                    } else {
                        alert('当前设备不支持手机窗口模式，请将设备模式设置为"手机"');
                        this.checked = false;
                        saveSettings();
                    }
                } else {
                    // 禁用手机窗口模式
                    window.mobileUI.disableMobileUI();
                    // 显示原始界面
                    const originalContainer = document.querySelector('.container');
                    if (originalContainer) {
                        originalContainer.style.display = '';
                    }
                }
            }
        });
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
  const KEYS = getStorageKeysSafe();
  const lt = (function(){
    try {
      return (typeof learnType !== 'undefined') ? learnType : (localStorage.getItem(KEYS.LEARN_TYPE) || 'word');
    } catch(e) { return 'word'; }
  })();
  const isWord = (lt === 'word' || lt === 'word_zh');
  const progressKey = isWord ? KEYS.PROGRESS : KEYS.PROGRESS_PHRASE;
  const kgKey = isWord ? KEYS.KINDERGARTEN_PROGRESS : KEYS.KINDERGARTEN_PROGRESS_PHRASE;
    
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

    // 识别 Android/Capacitor 环境
    const isAndroidUA = /Android/i.test(navigator.userAgent || '');
    const isCapacitorAndroid = (typeof window !== 'undefined' && window.Capacitor && typeof window.Capacitor.getPlatform === 'function')
      ? (window.Capacitor.getPlatform() === 'android')
      : false;
    const isAndroidEnv = isAndroidUA || isCapacitorAndroid;

    // 切换设备模式类名（预留样式钩子）
    body.classList.remove('device-phone', 'device-tablet', 'device-desktop');
    body.classList.add(`device-${device}`);
    // 为 APK/Android WebView 注入 android 类，激活右上角悬浮窗样式
    body.classList.toggle('android', isAndroidEnv);

    // 切换紧凑模式
    body.classList.toggle('compact-mode', compact);

    // 重置缩放相关样式
    body.style.removeProperty('zoom');
    body.style.removeProperty('transform');
    body.style.removeProperty('transform-origin');
    body.style.removeProperty('width');

    // 在 Android WebView/Capacitor 中，优先使用 transform 以避免 zoom 在部分设备上不生效
    if (scale !== 1) {
      if (isAndroidEnv) {
        body.style.transform = `scale(${scale})`;
        body.style.transformOrigin = 'top center';
        body.style.width = `${(100 / scale).toFixed(4)}%`;
      } else {
        body.style.zoom = String(scale);
        // 若浏览器不支持 zoom，再回退到 transform
        if (body.style.zoom === '' || body.style.zoom === 'normal') {
          body.style.transform = `scale(${scale})`;
          body.style.transformOrigin = 'top center';
          body.style.width = `${(100 / scale).toFixed(4)}%`;
        }
      }
    }

    // 暴露 CSS 变量，方便样式中进一步使用
    document.documentElement.style.setProperty('--ui-scale', String(scale));
  } catch (err) {
    console.error('applyDisplaySettings failed:', err);
  }
}
// 读取当前设置（优先读取UI，其次读取本地存储，最后使用默认值）
function getSettings() {
  const KEYS = getStorageKeysSafe();
  let saved = {};
  try {
    const s = localStorage.getItem(KEYS.SETTINGS);
    if (s) saved = JSON.parse(s) || {};
  } catch(e) {}
  const defaults = (typeof CONFIG !== 'undefined' && CONFIG.DEFAULT_SETTINGS) ? CONFIG.DEFAULT_SETTINGS : {};
  const base = { ...defaults, ...saved };

  const getEl = (id) => document.getElementById(id);
  const num = (id, def) => {
    const el = getEl(id); if (!el) return (typeof base[id] !== 'undefined' ? base[id] : def);
    const v = parseFloat(el.value); return isNaN(v) ? (typeof base[id] !== 'undefined' ? base[id] : def) : v;
  };
  const str = (id, def) => {
    const el = getEl(id); if (!el) return (typeof base[id] !== 'undefined' ? base[id] : def);
    return (el.value !== undefined && el.value !== null) ? el.value : (typeof base[id] !== 'undefined' ? base[id] : def);
  };
  const bool = (id, def) => {
    const el = getEl(id); if (!el) return (typeof base[id] !== 'undefined' ? !!base[id] : !!def);
    return !!el.checked;
  };

  // 组合结果（字段需与 applySettingsToUI/initializeSettingsEventListeners 对齐）
  const result = {
    speechRate: num('speechRate', 1.0),
    speechPitch: num('speechPitch', 1.0),
    speechVolume: num('speechVolume', 1.0),
    autoPlay: bool('autoPlay', false),
    showImages: bool('showImages', true),
    kindergartenMode: bool('kindergartenMode', false),
    // 幼儿园混合
    mixKindergartenEnabled: bool('mixKindergartenEnabled', false),
    mixKindergartenRatio: (function(){ const v = num('mixKindergartenRatio', 0); return Math.max(0, Math.min(1, v)); })(),
    // 测试题数量
    quizCount: Math.max(1, Math.round(num('quizCount', 10))),
    // 拼写设置
    spellingDefaultSubmode: str('spellingDefaultSubmode', base.spellingDefaultSubmode || 'spell'),
    spellingHint: bool('spellingHint', !!base.spellingHint),
    spellingHintMode: str('spellingHintMode', base.spellingHintMode || 'full'),
    // 设备与显示
    deviceMode: str('deviceMode', base.deviceMode || 'phone'),
    uiScale: (function(){ const v = num('uiScale', base.uiScale || 1); return Math.max(0.8, Math.min(1.2, v)); })(),
    compactMode: bool('compactMode', !!base.compactMode),
    // 新增：手机窗口模式
    phoneWindowMode: bool('phoneWindowMode', !!base.phoneWindowMode),
    // 题目来源
    questionSource: str('questionSource', base.questionSource || 'all')
  };
  return result;
}

// 激活：状态与UI
function updateActivationUI() {
  try {
    const info = getActivationInfo();
    const statusEl = document.getElementById('activationStatus');
    const limitEl = document.getElementById('trialLimitText');
    if (limitEl) limitEl.textContent = String((typeof CONFIG !== 'undefined' && CONFIG.TRIAL_LIMIT) ? CONFIG.TRIAL_LIMIT : 20);
    if (!statusEl) return;
    if (info && info.activated) {
      statusEl.textContent = `当前状态：已激活（${info.code ? '码已验证' : '调试模式'}）`;
      statusEl.style.color = '#2e7d32';
    } else {
      statusEl.textContent = `当前状态：未激活（试用上限：${(typeof CONFIG !== 'undefined' && CONFIG.TRIAL_LIMIT) ? CONFIG.TRIAL_LIMIT : 20}）`;
      statusEl.style.color = '#d32f2f';
    }
  } catch (e) {
    console.error('updateActivationUI error', e);
  }
}

function ensureActivationUIMounted(){
  try{
    const settingsRoot = document.getElementById('settingsMode');
    if(!settingsRoot) return;

    const input = document.getElementById('activationCode');
    if (input) {
      const group = input.closest('.settings-group');
      if (group && !settingsRoot.contains(group)) {
        settingsRoot.appendChild(group);
        try { console.info('[INIT] Activation UI moved into settings'); } catch(e){}
      }
      return; // 已存在则不重复创建
    }

    // 动态创建激活区域（与原HTML结构一致）
    const wrapper = document.createElement('div');
    wrapper.className = 'settings-group';
    wrapper.innerHTML = `
    <h3>🔑 激活</h3>
    <div class="setting-item">
        <label>激活码:</label>
        <input type="text" id="activationCode" placeholder="请输入激活码（如：MC-XXXX-...）" style="width:240px; margin-right:8px;">
        <button class="control-btn" id="btnActivate" style="background: linear-gradient(45deg, #4CAF50, #45a049);">立即激活</button>
    </div>
    <div class="setting-item">
        <span id="activationStatus" style="color:#666;">当前状态：未激活（试用上限：<span id="trialLimitText">20</span>）</span>
    </div>
    <div class="setting-item">
        <button class="control-btn" id="btnShowContact" style="background: linear-gradient(45deg, #FF9800, #F57C00);">获取激活码</button>
        <button class="control-btn" id="btnDeactivate" style="background: linear-gradient(45deg, #9e9e9e, #616161);">清除激活</button>
    </div>
    <div class="setting-item" id="contactHint" style="display:none;color:#333;">
        <span id="contactText">请联系微信：weixin123 获取激活码</span>
    </div>
    <div class="setting-item">
        <details>
          <summary>高级：调试模式</summary>
          <div style="margin-top:6px;">
            <input type="password" id="debugPassword" placeholder="输入调试密码（跳过激活）" style="width:240px; margin-right:8px;">
            <button class="control-btn" id="btnDebugUnlock" style="background: linear-gradient(45deg, #607D8B, #455A64);">启用调试</button>
          </div>
          <div id="debugControls" style="display:none; margin-top:10px; padding:10px; background:#f5f5f5; border-radius:4px;">
            <h4 style="margin:0 0 10px 0; color:#333;">调试控制面板</h4>
            <div class="setting-item" style="margin-bottom:10px;">
              <label>钻石数量：</label>
              <input type="number" id="debugDiamondCount" min="0" max="999" style="width:80px; margin-right:8px;">
              <button class="control-btn" id="btnSetDiamonds" style="background: linear-gradient(45deg, #2196F3, #1976D2);">设置钻石</button>
            </div>
            <div class="setting-item" style="margin-bottom:10px;">
              <label>钻石剑数量：</label>
              <input type="number" id="debugSwordCount" min="0" max="999" style="width:80px; margin-right:8px;">
              <button class="control-btn" id="btnSetSwords" style="background: linear-gradient(45deg, #9C27B0, #7B1FA2);">设置钻石剑</button>
            </div>
            <div class="setting-item">
              <button class="control-btn" id="btnResetRewards" style="background: linear-gradient(45deg, #FF5722, #D84315);">重置奖励</button>
              <button class="control-btn" id="btnMaxRewards" style="background: linear-gradient(45deg, #4CAF50, #388E3C);">最大奖励</button>
            </div>
          </div>
        </details>
    </div>
    <div class="setting-item" style="margin-top:15px; padding-top:15px; border-top:1px solid #ddd;">
      <h5 style="margin:0 0 10px 0; color:#333;">学习记录管理</h5>
      <div class="setting-item" style="margin-bottom:10px;">
        <button class="control-btn" id="btnViewStats" style="background: linear-gradient(45deg, #00BCD4, #0097A7);">查看统计</button>
        <button class="control-btn" id="btnExportLearning" style="background: linear-gradient(45deg, #3F51B5, #303F9F);">导出学习记录</button>
      </div>
      <div class="setting-item" style="margin-bottom:10px;">
        <label><input type="checkbox" id="prioritizeUnlearned" checked> 优先加载未学习单词</label>
      </div>
      <div id="learningStats" style="display:none; margin-top:10px; padding:10px; background:#e8f5e8; border-radius:4px; font-size:12px;">
        <!-- 学习统计将在这里显示 -->
      </div>
      <div class="setting-item" style="margin-top:10px;">
        <button class="control-btn" id="btnManualBackup" style="background: linear-gradient(45deg, #607D8B, #455A64); margin-right: 5px;">手动备份</button>
        <button class="control-btn" id="btnViewBackups" style="background: linear-gradient(45deg, #795548, #5D4037);">查看备份</button>
      </div>
      <div id="backupList" style="display:none; margin-top:10px; padding:10px; background:#f5f5f5; border-radius:4px; font-size:12px;">
        <!-- 备份列表将在这里显示 -->
      </div>
    </div>`;

    settingsRoot.appendChild(wrapper);
    try { console.info('[INIT] Activation UI created in settings'); } catch(e){}
  }catch(e){ /* ignore */ }
}

async function verifyActivationCodeOnline(code) {
  // 预留多来源：优先 GitHub RAW；后续可扩展为飞书文档读取
  // 规则：简单包含校验（每行一个激活码），忽略空行与注释
  let sources = [];
  if (CONFIG && CONFIG.ACTIVATION && CONFIG.ACTIVATION.CODES_URL && CONFIG.ACTIVATION.CODES_URL.trim()) {
    sources.push(CONFIG.ACTIVATION.CODES_URL.trim());
  } else {
    // 回退到站点根目录的激活.txt（可在根目录放置）
    sources.push('激活.txt');
  }
  const norm = (s) => s.trim();
  for (const url of sources) {
    try {
      const resp = await fetch(url, { cache: 'no-cache' });
      if (!resp.ok) continue;
      const text = await resp.text();
      const lines = text.split(/\r?\n/).map(norm).filter(l => l && !l.startsWith('#'));
      if (lines.includes(code.trim())) return { ok: true, source: url };
    } catch (e) {
      console.warn('fetch activation source failed', url, e);
      continue;
    }
  }
  return { ok: false };
}

// 显示调试控制面板
function showDebugControls() {
  const debugControls = document.getElementById('debugControls');
  if (debugControls) {
    debugControls.style.display = 'block';
    // 初始化当前数值
    const diamondInput = document.getElementById('debugDiamondCount');
    const swordInput = document.getElementById('debugSwordCount');
    if (diamondInput && typeof totalDiamonds !== 'undefined') {
      diamondInput.value = totalDiamonds;
    }
    if (swordInput && typeof totalSwords !== 'undefined') {
      swordInput.value = totalSwords;
    }
    bindDebugControlEvents();
  }
}

// 绑定调试控制事件
function bindDebugControlEvents() {
  const btnSetDiamonds = document.getElementById('btnSetDiamonds');
  const btnSetSwords = document.getElementById('btnSetSwords');
  const btnResetRewards = document.getElementById('btnResetRewards');
  const btnMaxRewards = document.getElementById('btnMaxRewards');

  if (btnSetDiamonds) {
    btnSetDiamonds.addEventListener('click', () => {
      const input = document.getElementById('debugDiamondCount');
      const count = parseInt(input.value) || 0;
      if (count >= 0 && count <= 999) {
        if (typeof totalDiamonds !== 'undefined') {
          totalDiamonds = count;
          saveKindergartenProgress();
          updateRewardDisplay();
          showNotification(`钻石数量已设置为: ${count}`);
        } else {
          alert('奖励系统未初始化');
        }
      } else {
        alert('请输入0-999之间的有效数字');
      }
    });
  }

  if (btnSetSwords) {
    btnSetSwords.addEventListener('click', () => {
      const input = document.getElementById('debugSwordCount');
      const count = parseInt(input.value) || 0;
      if (count >= 0 && count <= 999) {
        if (typeof totalSwords !== 'undefined') {
          totalSwords = count;
          saveKindergartenProgress();
          updateRewardDisplay();
          showNotification(`钻石剑数量已设置为: ${count}`);
        } else {
          alert('奖励系统未初始化');
        }
      } else {
        alert('请输入0-999之间的有效数字');
      }
    });
  }

  if (btnResetRewards) {
    btnResetRewards.addEventListener('click', () => {
      if (confirm('确定要重置所有奖励吗？这将清除所有钻石和钻石剑。')) {
        if (typeof totalDiamonds !== 'undefined' && typeof totalSwords !== 'undefined') {
          totalDiamonds = 0;
          totalSwords = 0;
          saveKindergartenProgress();
          updateRewardDisplay();
          // 重置输入框
          document.getElementById('debugDiamondCount').value = 0;
          document.getElementById('debugSwordCount').value = 0;
          showNotification('奖励已重置');
        }
      }
    });
  }

  if (btnMaxRewards) {
    btnMaxRewards.addEventListener('click', () => {
      if (typeof totalDiamonds !== 'undefined' && typeof totalSwords !== 'undefined') {
        totalDiamonds = 999;
        totalSwords = 999;
        saveKindergartenProgress();
        updateRewardDisplay();
        // 更新输入框
        document.getElementById('debugDiamondCount').value = 999;
        document.getElementById('debugSwordCount').value = 999;
        showNotification('奖励已设置为最大值');
      }
    });
  }
}

// 显示学习统计
function showLearningStatistics() {
  const statsDiv = document.getElementById('learningStats');
  if (!statsDiv) return;

  try {
    const stats = getLearningStatistics();
    const vocabName = document.getElementById('vocabSelect')?.value || '当前词库';

    const unlearnedCount = Math.max(0, stats.total - stats.mastered - stats.learning - stats.seen);

    statsDiv.innerHTML = `
      <div style="margin-bottom:8px;"><strong>${vocabName} 学习统计</strong></div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">
        <div>总单词数: <strong>${stats.total}</strong></div>
        <div>已掌握: <strong style="color:#4CAF50;">${stats.mastered}</strong></div>
        <div>学习中: <strong style="color:#FF9800;">${stats.learning}</strong></div>
        <div>已见过: <strong style="color:#2196F3;">${stats.seen}</strong></div>
        <div>未学习: <strong style="color:#9E9E9E;">${unlearnedCount}</strong></div>
        <div>准确率: <strong style="color:#9C27B0;">${stats.accuracy}%</strong></div>
      </div>
      <div style="font-size:11px; color:#666;">
        总答题次数: ${stats.totalSeen} | 正确: ${stats.totalCorrect} | 错误: ${stats.totalWrong}
      </div>
    `;

    statsDiv.style.display = 'block';
  } catch (e) {
    statsDiv.innerHTML = `<div style="color:#f44336;">获取学习统计失败: ${e.message}</div>`;
    statsDiv.style.display = 'block';
  }
}

function bindActivationUIEvents() {
  const inputEl = document.getElementById('activationCode');
  const btnActivate = document.getElementById('btnActivate');
  const btnDeactivate = document.getElementById('btnDeactivate');
  const btnShowContact = document.getElementById('btnShowContact');
  const contactHint = document.getElementById('contactHint');
  const contactText = document.getElementById('contactText');
  const debugPwd = document.getElementById('debugPassword');
  const btnDebugUnlock = document.getElementById('btnDebugUnlock');
  if (contactText && CONFIG && CONFIG.ACTIVATION && CONFIG.ACTIVATION.CONTACT_TEXT) {
    contactText.textContent = CONFIG.ACTIVATION.CONTACT_TEXT;
  }
  if (btnShowContact && contactHint) {
    btnShowContact.addEventListener('click', () => {
      contactHint.style.display = contactHint.style.display === 'none' ? 'block' : 'none';
    });
  }
  if (btnDeactivate) {
    btnDeactivate.addEventListener('click', () => {
      saveActivationInfo({ activated: false, code: '', debug: false, ts: Date.now() });
      updateActivationUI();
      alert('已清除激活');
    });
  }
  if (btnDebugUnlock && debugPwd) {
    btnDebugUnlock.addEventListener('click', () => {
      const pwd = (debugPwd.value || '').trim();
      if (pwd && CONFIG && CONFIG.ACTIVATION && CONFIG.ACTIVATION.DEBUG_PASSWORD && pwd === CONFIG.ACTIVATION.DEBUG_PASSWORD) {
        saveActivationInfo({ activated: true, code: '', debug: true, ts: Date.now() });
        updateActivationUI();
        showDebugControls();
        alert('调试模式已启用（免激活）');
      } else {
        alert('调试密码错误');
      }
    });
  }
  if (btnActivate && inputEl) {
    btnActivate.addEventListener('click', async () => {
      const code = (inputEl.value || '').trim();
      if (!code) { alert('请输入激活码'); return; }
      const prefix = (CONFIG && CONFIG.ACTIVATION && CONFIG.ACTIVATION.PREFIX) ? CONFIG.ACTIVATION.PREFIX : 'MC-';
      if (!code.startsWith(prefix) || code.length < 10) {
        alert('激活码格式不正确');
        return;
      }
      // 在线包含校验
      const res = await verifyActivationCodeOnline(code);
      if (res.ok) {
        saveActivationInfo({ activated: true, code, debug: false, ts: Date.now(), source: res.source });
        updateActivationUI();
        alert('激活成功');
      } else {
        alert('激活失败：未找到此激活码');
      }
    });
  }

  // 学习记录管理事件
  const btnViewStats = document.getElementById('btnViewStats');
  const btnExportLearning = document.getElementById('btnExportLearning');
  const prioritizeUnlearnedCheckbox = document.getElementById('prioritizeUnlearned');

  if (btnViewStats) {
    btnViewStats.addEventListener('click', () => {
      showLearningStatistics();
    });
  }

  if (btnExportLearning) {
    btnExportLearning.addEventListener('click', () => {
      exportLearningRecord();
    });
  }

  if (prioritizeUnlearnedCheckbox) {
    prioritizeUnlearnedCheckbox.addEventListener('change', (e) => {
      // 保存设置到本地存储
      try {
        localStorage.setItem('prioritizeUnlearned', e.target.checked);
        showNotification(e.target.checked ? '已启用优先加载未学习单词' : '已禁用优先加载未学习单词');
      } catch (e) {
        console.warn('保存设置失败:', e);
      }
    });

    // 加载保存的设置
    try {
      const saved = localStorage.getItem('prioritizeUnlearned');
      if (saved !== null) {
        prioritizeUnlearnedCheckbox.checked = saved === 'true';
      }
    } catch (e) {
      console.warn('加载设置失败:', e);
    }
  }

  // 数据备份管理事件
  const btnManualBackup = document.getElementById('btnManualBackup');
  const btnViewBackups = document.getElementById('btnViewBackups');

  if (btnManualBackup) {
    btnManualBackup.addEventListener('click', () => {
      const backupKey = window.DataMigration?.manualBackup();
      if (backupKey) {
        setTimeout(() => showBackupList(), 500); // 刷新备份列表
      }
    });
  }

  if (btnViewBackups) {
    btnViewBackups.addEventListener('click', () => {
      showBackupList();
    });
  }
}

// 显示备份列表
function showBackupList() {
  const backupListDiv = document.getElementById('backupList');
  if (!backupListDiv) return;

  try {
    const backups = window.DataMigration?.getBackupList() || [];

    if (backups.length === 0) {
      backupListDiv.innerHTML = '<div style="color:#666;">暂无备份</div>';
      backupListDiv.style.display = 'block';
      return;
    }

    let html = '<div style="margin-bottom:8px;"><strong>数据备份列表</strong></div>';

    backups.forEach((backup, index) => {
      const date = new Date(backup.backupDate).toLocaleString('zh-CN');
      html += `
        <div style="margin-bottom:8px; padding:8px; background:#fff; border-radius:4px; border:1px solid #ddd;">
          <div style="font-weight:bold; margin-bottom:4px;">备份 ${index + 1}: ${backup.key}</div>
          <div style="font-size:11px; color:#666; margin-bottom:4px;">
            时间: ${date} | 数据项: ${backup.dataCount} | 版本: ${backup.version}
          </div>
          <div style="margin-top:6px;">
            <button class="control-btn" onclick="window.DataMigration?.manualRestore('${backup.key}')"
                    style="background: linear-gradient(45deg, #4CAF50, #388E3C); font-size:11px; padding:4px 8px; margin-right:5px;">恢复</button>
            <button class="control-btn" onclick="if(confirm('确定要删除此备份吗？')){localStorage.removeItem('${backup.key}');showBackupList();}"
                    style="background: linear-gradient(45deg, #f44336, #d32f2f); font-size:11px; padding:4px 8px;">删除</button>
          </div>
        </div>
      `;
    });

    backupListDiv.innerHTML = html;
    backupListDiv.style.display = 'block';

  } catch (e) {
    backupListDiv.innerHTML = `<div style="color:#f44336;">获取备份列表失败: ${e.message}</div>`;
    backupListDiv.style.display = 'block';
  }
}

// ===== 公开方法 =====
function initializeActivation() {
  ensureActivationUIMounted();
  updateActivationUI();
  bindActivationUIEvents();
  try { console.info('[INIT] Activation UI initialized and mounted into settings'); } catch(e){}
}

// 将初始化注入现有启动流程
(function hookActivationInit(){
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeActivation);
  } else {
    // 若主流程已完成初始化，也可直接调用
    setTimeout(initializeActivation, 0);
  }
})();