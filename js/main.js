// 主入口文件 - 整合所有模块

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Minecraft 单词学习游戏启动中...');
    
    // 初始化各个模块
    initializeApplication();
});

// 初始化应用程序
function initializeApplication() {
    try {
        // 1. 加载设置
        console.log('📋 加载设置...');
        loadSettings();
        
        // 2. 加载学习进度
        console.log('📊 加载学习进度...');
        loadProgress();
        
        // 3. 初始化设置事件监听器
        console.log('🎛️ 初始化设置监听器...');
        initializeSettingsEventListeners();
        
        // 4. 初始化游戏
        console.log('🎮 初始化游戏...');
        initializeGame();
        
        // 5. 更新设置显示
        console.log('🔧 更新设置显示...');
        updateSettingsDisplay();
        
        // 6. 检查是否启用幼儿园模式
        const settings = getSettings();
        if (settings.kindergartenMode) {
            console.log('👶 启用幼儿园模式...');
            applyKindergartenMode(true);
        }
        
        // 7. 初始化移动UI（如果启用）
        console.log('📱 检查移动UI模式...');
        if (window.mobileUI) {
            const settings = getSettings();
            if (settings.deviceMode === 'phone') {
                console.log('📱 启用手机窗口模式...');
                window.mobileUI.detectMobileMode();
                // 强制启用手机模式UI（不再依赖“启用窗口化界面”复选框）
                window.mobileUI.setupMobileUI();
                console.log('✅ 移动UI初始化完成');
            } else {
                console.log('📱 移动UI模式未启用');
            }
        } else {
            console.warn('⚠️ 移动UI管理器未加载');
        }

        // 8. 自动加载默认词库
        const vocabSelect = document.getElementById('vocabSelect');
        if (vocabSelect && (vocabSelect.value.includes('幼儿园') || vocabSelect.value === 'kindergarten_vocabulary')) {
            console.log('📚 自动加载幼儿园词库...');
            setTimeout(() => {
                loadVocabulary();
            }, 500);
        }

        console.log('✅ 应用程序初始化完成！');
        showNotification('🎮 游戏已准备就绪！', 'success');

        // 解锁移动端音频策略：优先等到首次点击再初始化；若无点击也尝试一次
        try {
            const unlockTTS = async () => {
                if (window.TTS && typeof TTS.enable === 'function') {
                    const ok = await TTS.enable();
                    console.log('🔊 TTS.enable() 执行结果:', ok);
                    document.removeEventListener('click', unlockTTS);
                    document.removeEventListener('touchstart', unlockTTS);
                }
            };
            document.addEventListener('click', unlockTTS);
            document.addEventListener('touchstart', unlockTTS);
            // 如果用户长时间不点击，也尝试一次
            setTimeout(unlockTTS, 3000);
        } catch (e) {
            console.warn('🔊 初始化音频策略失败:', e);
        }
    } catch (error) {
        console.error('❌ 应用程序初始化失败:', error);
        showNotification('❌ 初始化失败，请刷新重试', 'error');
    }
}

// 统一错误处理与运行时事件监控
window.addEventListener('error', function(event) {
    console.error('❗️ 全局错误:', event.error || event.message);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('❗️ 未处理的Promise拒绝:', event.reason);
});

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        console.log('⏸️ 页面隐藏，暂停部分动画');
    } else {
        console.log('▶️ 页面可见，恢复动画');
    }
});

// 窗口大小变化时，进行相关优化
window.addEventListener('resize', debounce(function() {
    console.log('📐 窗口大小发生变化');
    updateSettingsDisplay();
}, 250));

window.addEventListener('online', function() {
    console.log('🌐 网络已连接');
});

window.addEventListener('offline', function() {
    console.log('🚫 网络已断开');
});

// 构建全局API，便于调试与功能调用
window.MinecraftWordGame = {
    // 学习控制
    loadVocabulary,
    switchMode,
    playAudio,
    nextWord,
    previousWord,
    
    // 拼写模式
    startQuiz,
    restartQuiz,
    
    // 设置管理
    getSettings,
    saveSettings,
    resetSettings,
    
    // 进度管理
    saveProgress,
    clearProgress,
    exportProgress,
    
    // 幼儿园模式
    initializeKindergartenMode,
    resetKindergartenProgress,
    getRewardStats,
    
    // 特效
    createStarAnimation,
    createFireworks,
    createHeartAnimation,
    
    // 工具
    showNotification,
    shuffleArray,
    getRandomElements,
    
    // 词库与统计
    getCurrentWord,
    getVocabularyStats,
    getQuizStats,
    getLearningStats,
    
    // 版本信息
    version: '2.0.0',
    buildDate: new Date().toISOString()
};

// 开发模式提示
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 开发模式已启用');
    console.log('🎮 全局API已挂载到 window.MinecraftWordGame');
    console.log('📊 可用的调试命令:');
    console.log('  - MinecraftWordGame.getSettings() // 获取当前设置');
    console.log('  - MinecraftWordGame.getVocabularyStats() // 获取词库统计');
    console.log('  - MinecraftWordGame.getLearningStats() // 获取学习统计');
    console.log('  - MinecraftWordGame.createFireworks() // 创建烟花效果');
    console.log('  - MinecraftWordGame.resetKindergartenProgress() // 重置幼儿园进度');
}

// 性能指标
if ('performance' in window) {
    window.addEventListener('load', function() {
        const timing = performance.timing;
        const loadTime = timing.domContentLoadedEventEnd - timing.navigationStart;
        console.log(`⏱️ 页面加载时间: ${loadTime}ms`);
    });
}

// 内存监控（仅在支持的平台）
if ('memory' in performance) {
    setInterval(function() {
        const memory = performance.memory;
        console.log(`🧠 JS堆大小: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB / ${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`);
    }, 30000); // 每30秒检查一次
}

// 用户活动监控
let lastActivityTime = Date.now();
let activityTimer;

function trackUserActivity() {
    lastActivityTime = Date.now();
    if (activityTimer) clearTimeout(activityTimer);
    activityTimer = setTimeout(function() {
        console.log('⏳ 长时间无操作');
    }, 600000); // 10分钟无操作提醒
}

['click', 'keydown', 'mousemove', 'touchstart'].forEach(eventType => {
    document.addEventListener(eventType, trackUserActivity);
});

// 应用生命周期管理
const AppLifecycle = {
    startup() {
        console.log('🚀 应用启动');
    },
    pause() {
        console.log('⏸️ 应用暂停');
    },
    resume() {
        console.log('▶️ 应用恢复');
    },
    shutdown() {
        console.log('🛑 应用关闭');
    }
};

document.addEventListener('DOMContentLoaded', AppLifecycle.startup);
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') AppLifecycle.pause();
    else AppLifecycle.resume();
});
window.addEventListener('beforeunload', AppLifecycle.shutdown);

window.MinecraftWordGame.AppLifecycle = AppLifecycle;

console.log('🎯 主模块加载完成');
console.log('🎮 Minecraft 单词学习游戏 v2.0.0 - 幼儿园特别版');
console.log('👶 专为3-6岁儿童设计，包含奖励系统和动画效果');
console.log('✨ 新功能: 词汇分组、钻石奖励、钻石剑成就、星星动画');