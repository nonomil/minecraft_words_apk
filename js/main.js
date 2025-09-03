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
        
        // 7. 自动加载默认词库
        const vocabSelect = document.getElementById('vocabSelect');
        if (vocabSelect && (vocabSelect.value.includes('幼儿园') || vocabSelect.value === 'kindergarten_vocabulary')) {
            console.log('📚 自动加载幼儿园词库...');
            setTimeout(() => {
                loadVocabulary();
            }, 500);
        }
        
        console.log('✅ 应用程序初始化完成！');
        showNotification('🎮 游戏已准备就绪！', 'success');
        
    } catch (error) {
        console.error('❌ 初始化失败:', error);
        showNotification('初始化失败: ' + error.message, 'error');
    }
}

// 全局错误处理
window.addEventListener('error', function(event) {
    console.error('全局错误:', event.error);
    showNotification('发生错误: ' + event.error.message, 'error');
});

// 未处理的Promise拒绝
window.addEventListener('unhandledrejection', function(event) {
    console.error('未处理的Promise拒绝:', event.reason);
    showNotification('异步操作失败: ' + event.reason, 'error');
    event.preventDefault();
});

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停语音
        if (window.TTS && TTS.isSpeaking()) {
            TTS.pause();
        }
    } else {
        // 页面显示时恢复语音
        if (window.TTS) {
            TTS.resume();
        }
    }
});

// 窗口大小变化处理
window.addEventListener('resize', debounce(function() {
    // 重新计算动画位置
    if (getSettings().kindergartenMode) {
        updateRewardDisplay();
    }
}, 250));

// 在线状态变化处理
window.addEventListener('online', function() {
    showNotification('网络连接已恢复', 'success');
});

window.addEventListener('offline', function() {
    showNotification('网络连接已断开，部分功能可能受限', 'error');
});

// 导出全局API（用于调试和扩展）
window.MinecraftWordGame = {
    // 核心功能
    loadVocabulary,
    switchMode,
    playAudio,
    nextWord,
    previousWord,
    
    // 测试功能
    startQuiz,
    restartQuiz,
    
    // 设置功能
    getSettings,
    saveSettings,
    resetSettings,
    
    // 进度功能
    saveProgress,
    clearProgress,
    exportProgress,
    
    // 幼儿园模式
    initializeKindergartenMode,
    resetKindergartenProgress,
    getRewardStats,
    
    // 动画功能
    createStarAnimation,
    createFireworks,
    createHeartAnimation,
    
    // 工具函数
    showNotification,
    shuffleArray,
    getRandomElements,
    
    // 数据访问
    getCurrentWord,
    getVocabularyStats,
    getQuizStats,
    getLearningStats,
    
    // 版本信息
    version: '2.0.0',
    buildDate: new Date().toISOString()
};

// 开发模式下的调试信息
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

// 性能监控
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`📈 页面加载时间: ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.warn('⚠️ 页面加载时间较长，建议优化');
            }
        }, 0);
    });
}

// 内存使用监控（如果支持）
if ('memory' in performance) {
    setInterval(function() {
        const memory = performance.memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
        const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);
        
        if (usedMB > limitMB * 0.8) {
            console.warn(`⚠️ 内存使用率较高: ${usedMB}MB / ${limitMB}MB`);
        }
    }, 30000); // 每30秒检查一次
}

// 用户活动跟踪（用于自动保存）
let lastActivityTime = Date.now();
let activityTimer;

function trackUserActivity() {
    lastActivityTime = Date.now();
    
    // 清除之前的定时器
    if (activityTimer) {
        clearTimeout(activityTimer);
    }
    
    // 5分钟无活动后自动保存
    activityTimer = setTimeout(function() {
        console.log('💾 自动保存进度...');
        saveProgress();
        if (getSettings().kindergartenMode) {
            saveKindergartenProgress();
        }
    }, 5 * 60 * 1000);
}

// 监听用户活动
['click', 'keydown', 'mousemove', 'touchstart'].forEach(eventType => {
    document.addEventListener(eventType, trackUserActivity, { passive: true });
});

// 应用程序生命周期管理
const AppLifecycle = {
    // 应用启动
    startup() {
        console.log('🚀 应用启动');
        trackUserActivity();
    },
    
    // 应用暂停
    pause() {
        console.log('⏸️ 应用暂停');
        saveProgress();
        if (getSettings().kindergartenMode) {
            saveKindergartenProgress();
        }
    },
    
    // 应用恢复
    resume() {
        console.log('▶️ 应用恢复');
        trackUserActivity();
    },
    
    // 应用关闭
    shutdown() {
        console.log('🛑 应用关闭');
        saveProgress();
        if (getSettings().kindergartenMode) {
            saveKindergartenProgress();
        }
    }
};

// 绑定生命周期事件
document.addEventListener('DOMContentLoaded', AppLifecycle.startup);
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        AppLifecycle.pause();
    } else {
        AppLifecycle.resume();
    }
});
window.addEventListener('beforeunload', AppLifecycle.shutdown);

// 导出生命周期管理器
window.MinecraftWordGame.AppLifecycle = AppLifecycle;

console.log('🎯 主模块加载完成');
console.log('🎮 Minecraft 单词学习游戏 v2.0.0 - 幼儿园特别版');
console.log('👶 专为3-6岁儿童设计，包含奖励系统和动画效果');
console.log('✨ 新功能: 词汇分组、钻石奖励、钻石剑成就、星星动画');