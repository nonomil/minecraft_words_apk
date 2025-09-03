// ������ļ� - ��������ģ��

// ҳ�������ɺ��ʼ��
document.addEventListener('DOMContentLoaded', function() {
    console.log('? Minecraft ����ѧϰ��Ϸ������...');
    
    // ��ʼ������ģ��
    initializeApplication();
});

// ��ʼ��Ӧ�ó���
function initializeApplication() {
    try {
        // 1. ��������
        console.log('? ��������...');
        loadSettings();
        
        // 2. ����ѧϰ����
        console.log('? ����ѧϰ����...');
        loadProgress();
        
        // 3. ��ʼ�������¼�������
        console.log('?? ��ʼ�����ü�����...');
        initializeSettingsEventListeners();
        
        // 4. ��ʼ����Ϸ
        console.log('? ��ʼ����Ϸ...');
        initializeGame();
        
        // 5. ����������ʾ
        console.log('? ����������ʾ...');
        updateSettingsDisplay();
        
        // 6. ����Ƿ������׶�԰ģʽ
        const settings = getSettings();
        if (settings.kindergartenMode) {
            console.log('? �����׶�԰ģʽ...');
            applyKindergartenMode(true);
        }
        
        // 7. �Զ�����Ĭ�ϴʿ�
        const vocabSelect = document.getElementById('vocabSelect');
        if (vocabSelect && (vocabSelect.value.includes('�׶�԰') || vocabSelect.value === 'kindergarten_vocabulary')) {
            console.log('? �Զ������׶�԰�ʿ�...');
            setTimeout(() => {
                loadVocabulary();
            }, 500);
        }
        
        console.log('? Ӧ�ó����ʼ����ɣ�');
        showNotification('? ��Ϸ��׼��������', 'success');

        // Unlock mobile audio policy for TTS: use first user gesture; also try once after 1s as fallback
        try {
            const unlockTTS = async () => {
                if (window.TTS && typeof TTS.enable === 'function') {
                    const ok = await TTS.enable();
                    console.log('TTS.enable() result:', ok);
                    document.removeEventListener('click', unlockTTS);
                    document.removeEventListener('touchstart', unlockTTS);
                }
            };
            document.addEventListener('click', unlockTTS, { once: true, passive: true });
            document.addEventListener('touchstart', unlockTTS, { once: true, passive: true });
            setTimeout(unlockTTS, 1000);
        } catch (e) {
            console.warn('TTS enable attempt failed:', e);
        }
        
    } catch (error) {
        console.error('? ��ʼ��ʧ��:', error);
        showNotification('��ʼ��ʧ��: ' + error.message, 'error');
    }
}

// ȫ�ִ�����
window.addEventListener('error', function(event) {
    console.error('ȫ�ִ���:', event.error);
    showNotification('��������: ' + event.error.message, 'error');
});

// δ������Promise�ܾ�
window.addEventListener('unhandledrejection', function(event) {
    console.error('δ������Promise�ܾ�:', event.reason);
    showNotification('�첽����ʧ��: ' + event.reason, 'error');
    event.preventDefault();
});

// ҳ��ɼ��Ա仯����
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // ҳ������ʱ��ͣ����
        if (window.TTS && TTS.isSpeaking()) {
            TTS.pause();
        }
    } else {
        // ҳ����ʾʱ�ָ�����
        if (window.TTS) {
            TTS.resume();
        }
    }
});

// ���ڴ�С�仯����
window.addEventListener('resize', debounce(function() {
    // ���¼��㶯��λ��
    if (getSettings().kindergartenMode) {
        updateRewardDisplay();
    }
}, 250));

// ����״̬�仯����
window.addEventListener('online', function() {
    showNotification('���������ѻָ�', 'success');
});

window.addEventListener('offline', function() {
    showNotification('���������ѶϿ������ֹ��ܿ�������', 'error');
});

// ����ȫ��API�����ڵ��Ժ���չ��
window.MinecraftWordGame = {
    // ���Ĺ���
    loadVocabulary,
    switchMode,
    playAudio,
    nextWord,
    previousWord,
    
    // ���Թ���
    startQuiz,
    restartQuiz,
    
    // ���ù���
    getSettings,
    saveSettings,
    resetSettings,
    
    // ���ȹ���
    saveProgress,
    clearProgress,
    exportProgress,
    
    // �׶�԰ģʽ
    initializeKindergartenMode,
    resetKindergartenProgress,
    getRewardStats,
    
    // ��������
    createStarAnimation,
    createFireworks,
    createHeartAnimation,
    
    // ���ߺ���
    showNotification,
    shuffleArray,
    getRandomElements,
    
    // ���ݷ���
    getCurrentWord,
    getVocabularyStats,
    getQuizStats,
    getLearningStats,
    
    // �汾��Ϣ
    version: '2.0.0',
    buildDate: new Date().toISOString()
};

// ����ģʽ�µĵ�����Ϣ
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('? ����ģʽ������');
    console.log('? ȫ��API�ѹ��ص� window.MinecraftWordGame');
    console.log('? ���õĵ�������:');
    console.log('  - MinecraftWordGame.getSettings() // ��ȡ��ǰ����');
    console.log('  - MinecraftWordGame.getVocabularyStats() // ��ȡ�ʿ�ͳ��');
    console.log('  - MinecraftWordGame.getLearningStats() // ��ȡѧϰͳ��');
    console.log('  - MinecraftWordGame.createFireworks() // �����̻�Ч��');
    console.log('  - MinecraftWordGame.resetKindergartenProgress() // �����׶�԰����');
}

// ���ܼ��
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`? ҳ�����ʱ��: ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.warn('?? ҳ�����ʱ��ϳ��������Ż�');
            }
        }, 0);
    });
}

// �ڴ�ʹ�ü�أ����֧�֣�
if ('memory' in performance) {
    setInterval(function() {
        const memory = performance.memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
        const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);
        
        if (usedMB > limitMB * 0.8) {
            console.warn(`?? �ڴ�ʹ���ʽϸ�: ${usedMB}MB / ${limitMB}MB`);
        }
    }, 30000); // ÿ30����һ��
}

// �û�����٣������Զ����棩
let lastActivityTime = Date.now();
let activityTimer;

function trackUserActivity() {
    lastActivityTime = Date.now();
    
    // ���֮ǰ�Ķ�ʱ��
    if (activityTimer) {
        clearTimeout(activityTimer);
    }
    
    // 5�����޻���Զ�����
    activityTimer = setTimeout(function() {
        console.log('? �Զ��������...');
        saveProgress();
        if (getSettings().kindergartenMode) {
            saveKindergartenProgress();
        }
    }, 5 * 60 * 1000);
}

// �����û��
['click', 'keydown', 'mousemove', 'touchstart'].forEach(eventType => {
    document.addEventListener(eventType, trackUserActivity, { passive: true });
});

// Ӧ�ó����������ڹ���
const AppLifecycle = {
    // Ӧ������
    startup() {
        console.log('? Ӧ������');
        trackUserActivity();
    },
    
    // Ӧ����ͣ
    pause() {
        console.log('?? Ӧ����ͣ');
        saveProgress();
        if (getSettings().kindergartenMode) {
            saveKindergartenProgress();
        }
    },
    
    // Ӧ�ûָ�
    resume() {
        console.log('?? Ӧ�ûָ�');
        trackUserActivity();
    },
    
    // Ӧ�ùر�
    shutdown() {
        console.log('? Ӧ�ùر�');
        saveProgress();
        if (getSettings().kindergartenMode) {
            saveKindergartenProgress();
        }
    }
};

// �����������¼�
document.addEventListener('DOMContentLoaded', AppLifecycle.startup);
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        AppLifecycle.pause();
    } else {
        AppLifecycle.resume();
    }
});
window.addEventListener('beforeunload', AppLifecycle.shutdown);

// �����������ڹ�����
window.MinecraftWordGame.AppLifecycle = AppLifecycle;

console.log('? ��ģ��������');
console.log('? Minecraft ����ѧϰ��Ϸ v2.0.0 - �׶�԰�ر��');
console.log('? רΪ3-6���ͯ��ƣ���������ϵͳ�Ͷ���Ч��');
console.log('? �¹���: �ʻ���顢��ʯ��������ʯ���ɾ͡����Ƕ���');