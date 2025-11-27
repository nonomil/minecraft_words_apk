// 设备模式切换功能
function setDeviceMode(mode) {
    console.log('📱 切换设备模式:', mode);

    // 保存设置
    const settings = getSettings();
    settings.deviceMode = mode;
    saveSettings(settings);

    // 更新按钮状态
    document.querySelectorAll('.device-mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
            btn.style.background = '#667eea';
            btn.style.color = 'white';
            btn.style.borderColor = '#667eea';
        } else {
            btn.style.background = 'white';
            btn.style.color = '#1f2937';
            btn.style.borderColor = '#ddd';
        }
    });

    // 应用模式
    applyDeviceMode(mode);

    showNotification(`已切换到${getModeLabel(mode)}模式`, 'success');
}

function applyDeviceMode(mode) {
    const desktopLayout = document.querySelector('.desktop-layout');
    const mobileLayout = document.querySelector('.mobile-layout');

    if (!desktopLayout || !mobileLayout) return;

    // 辅助函数：确保 MobileAppManager 已初始化并处于活动状态
    const ensureMobileApp = () => {
        if (!window.mobileApp) {
            window.mobileApp = new MobileAppManager();
        } else {
            // 如果已存在，确保它被激活
            // 强制重新绑定导航事件，防止监听器丢失
            if (window.mobileApp.setupNavigation) {
                window.mobileApp.setupNavigation();
            }
            if (window.mobileApp.switchToView) {
                window.mobileApp.switchToView('home');
            }
        }
    };

    // 辅助函数：清理移动端状态（将内容移回桌面）
    const cleanupMobileApp = () => {
        if (window.mobileApp) {
            ['learn', 'quiz', 'settings'].forEach(view => {
                window.mobileApp.moveContentToDesktop(view);
            });
            // 我们不销毁实例，但确保内容回到了桌面
        }
    };

    if (mode === 'auto') {
        // 自动模式：根据屏幕宽度决定
        if (window.innerWidth <= 768) {
            desktopLayout.style.display = 'none';
            mobileLayout.style.display = 'flex';
            ensureMobileApp();
        } else {
            desktopLayout.style.display = 'block';
            mobileLayout.style.display = 'none';
            cleanupMobileApp();
        }
    } else if (mode === 'mobile') {
        // 强制手机模式
        desktopLayout.style.display = 'none';
        mobileLayout.style.display = 'flex';
        ensureMobileApp();
    } else if (mode === 'tablet' || mode === 'desktop') {
        // 强制桌面/平板模式
        desktopLayout.style.display = 'block';
        mobileLayout.style.display = 'none';
        cleanupMobileApp();
    }
}

function getModeLabel(mode) {
    const labels = {
        'auto': '自动',
        'mobile': '手机',
        'tablet': '平板',
        'desktop': '桌面'
    };
    return labels[mode] || mode;
}

// 初始化设备模式
function initializeDeviceMode() {
    const settings = getSettings();
    const mode = settings.deviceMode || 'auto';
    setDeviceMode(mode);
}

// 在页面加载时初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initializeDeviceMode, 100);
    });
} else {
    setTimeout(initializeDeviceMode, 100);
}
