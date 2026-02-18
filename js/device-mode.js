// 设备模式切换功能
async function setDeviceMode(mode) {
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

    // 尝试锁定屏幕方向
    await lockScreenOrientation(mode);

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

    const getViewportShortSide = () => {
        const vv = window.visualViewport;
        const width = vv?.width || window.innerWidth || document.documentElement.clientWidth || 0;
        const height = vv?.height || window.innerHeight || document.documentElement.clientHeight || 0;
        return Math.min(width, height);
    };

    if (mode === 'auto') {
        // 自动模式：根据短边阈值判定，避免横屏手机误判为桌面
        if (getViewportShortSide() < 768) {
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

// 屏幕方向锁定逻辑
async function lockScreenOrientation(mode) {
    try {
        const isNativeApp = Boolean(
            window.Capacitor?.isNative ||
            (typeof window.Capacitor?.isNativePlatform === 'function' && window.Capacitor.isNativePlatform())
        );

        // Native APK orientation is controlled by AndroidManifest to avoid JS/native lock conflicts.
        if (isNativeApp) {
            return;
        }

        // 尝试获取 Capacitor 插件
        const ScreenOrientation = window.Capacitor?.Plugins?.ScreenOrientation;

        if (mode === 'mobile') {
            // 手机模式 -> 竖屏
            if (ScreenOrientation) {
                await ScreenOrientation.lock({ orientation: 'portrait' });
            } else if (screen.orientation && screen.orientation.lock) {
                await screen.orientation.lock('portrait').catch(e => console.warn('Web Lock failed', e));
            }
        } else if (mode === 'tablet' || mode === 'desktop') {
            // 平板/桌面 -> 横屏
            if (ScreenOrientation) {
                await ScreenOrientation.lock({ orientation: 'landscape' });
            } else if (screen.orientation && screen.orientation.lock) {
                await screen.orientation.lock('landscape').catch(e => console.warn('Web Lock failed', e));
            }
        } else {
            // 自动 -> 解锁
            if (ScreenOrientation) {
                await ScreenOrientation.unlock();
            } else if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock();
            }
        }
    } catch (e) {
        console.warn('Screen orientation lock failed:', e);
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

// 首次启动选择处理
window.selectInitialMode = function (mode) {
    localStorage.setItem('hasSelectedDeviceMode', 'true');
    document.getElementById('firstLaunchModal').style.display = 'none';
    setDeviceMode(mode);
};

// 初始化设备模式
function initializeDeviceMode() {
    const settings = getSettings();

    // 检查是否是首次启动（且在移动设备/APK环境中）
    const hasSelected = localStorage.getItem('hasSelectedDeviceMode');
    const isMobileEnv = window.innerWidth <= 1024 || window.Capacitor?.isNative;

    if (!hasSelected && isMobileEnv) {
        // 显示首次启动弹窗
        const modal = document.getElementById('firstLaunchModal');
        if (modal) {
            modal.style.display = 'flex';
            // 暂时使用自动模式，直到用户选择
            applyDeviceMode('auto');
            return;
        }
    }

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
