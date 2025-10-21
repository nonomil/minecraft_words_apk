/**
 * 手机模式UI管理器
 * Mobile UI Window Manager
 *
 * 解决手机模式下的界面问题：
 * - 界面溢出和滑动困扰
 * - 导航不便
 * - 触控体验差
 * - 视觉干扰
 */

const MOBILE_UI_CONFIG = {
    // 窗口切换动画时长
    TRANSITION_DURATION: 300,

    // 悬浮导航配置
    FLOATING_NAV: {
        HEIGHT: 60,
        BACKDROP_BLUR: true,
        SHADOW_OPACITY: 0.1
    },

    // 触摸优化
    TOUCH: {
        TAP_HIGHLIGHT: 'transparent',
        MANIPULATION: true,
        PREVENT_ZOOM: true
    },

    // 响应式断点
    BREAKPOINTS: {
        SMALL: 375,
        MEDIUM: 414,
        LARGE: 480
    }
};

/**
 * 手机模式UI管理器类
 */
class MobileUIManager {
    constructor() {
        this.windowHistory = ['home'];
        this.currentWindow = 'home';
        this.isMobileMode = false;
        this.floatingNav = null;
        this.windowContainer = null;
        this.initialized = false;

        // 延迟初始化，等待设置加载完成
        this.deferredInit();
    }

    /**
     * 延迟初始化，确保设置已加载
     */
    deferredInit() {
        // 等待DOM和设置加载完成
        const tryInit = () => {
            if (typeof getSettings === 'function') {
                this.init();
            } else {
                // 如果设置还未加载，稍后重试
                setTimeout(tryInit, 100);
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', tryInit);
        } else {
            tryInit();
        }
    }

    /**
     * 初始化手机模式UI
     */
    init() {
        if (this.initialized) {
            console.log('[MobileUI] 已经初始化，跳过');
            return;
        }

        console.log('[MobileUI] 开始初始化...');
        this.detectMobileMode();

        if (this.isMobileMode) {
            console.log('[MobileUI] 检测到手机模式，设置UI...');
            this.setupMobileUI();
            this.setupTouchOptimization();
            this.setupEventListeners();
            console.log('[MobileUI] 手机模式UI初始化完成');
        } else {
            console.log('[MobileUI] 手机模式未启用，使用标准界面');
        }

        this.initialized = true;
    }

    /**
     * 检测是否为手机模式
     */
    detectMobileMode() {
        const settings = getSettings();
        const deviceMode = settings?.deviceMode || 'phone';
        const phoneWindowMode = settings?.phoneWindowMode || false;
        const screenWidth = window.innerWidth;
        const userAgent = navigator.userAgent;

        // 基础手机模式检测
        const isPhoneDevice = (
            deviceMode === 'phone' ||
            screenWidth <= 480 ||
            /Mobi|Android|iPhone/i.test(userAgent)
        );

        // 只有在手机设备上且启用了窗口模式时才启用手机UI
        this.isMobileMode = isPhoneDevice && phoneWindowMode;

        console.log(`[MobileUI] 手机模式检测: ${this.isMobileMode ? '启用' : '禁用'} (设备: ${isPhoneDevice}, 窗口模式: ${phoneWindowMode})`);
        return this.isMobileMode;
    }

    /**
     * 设置手机模式UI结构
     */
    setupMobileUI() {
        // 创建窗口容器
        this.createWindowContainer();

        // 创建悬浮导航
        this.createFloatingNav();

        // 转换现有界面为窗口模式
        this.convertToWindowMode();

        console.log('[MobileUI] 手机模式UI结构已创建');
    }

    /**
     * 创建窗口容器
     */
    createWindowContainer() {
        const container = document.createElement('div');
        container.id = 'mobileWindowContainer';
        container.className = 'mobile-window-container';

        // 插入到body中
        document.body.insertBefore(container, document.body.firstChild);
        this.windowContainer = container;

        // 隐藏原始内容
        const originalContainer = document.querySelector('.container');
        if (originalContainer) {
            originalContainer.style.display = 'none';
        }
    }

    /**
     * 创建悬浮导航栏
     */
    createFloatingNav() {
        const nav = document.createElement('div');
        nav.id = 'mobileFloatingNav';
        nav.className = 'mobile-floating-nav';
        nav.innerHTML = `
            <div class="nav-left">
                <button class="nav-back-btn" onclick="mobileUI.goBack()" style="display: none;">←</button>
                <div class="nav-title">主页</div>
            </div>
            <div class="nav-right">
                <div class="nav-rewards">
                    💎 <span id="mobileDiamondCount">0</span>
                    ⚔️ <span id="mobileSwordCount">0</span>
                </div>
            </div>
        `;

        document.body.appendChild(nav);
        this.floatingNav = nav;

        // 添加样式
        this.addMobileStyles();
    }

    /**
     * 添加手机模式样式
     */
    addMobileStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* 手机模式窗口容器 */
            .mobile-window-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                overflow: hidden;
                z-index: 999;
            }

            /* 手机模式窗口 - 优化布局，支持缩放 */
            .mobile-window {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #f0f4f8; /* 与现有界面背景一致 */
                transform: translateX(100%);
                transition: transform ${MOBILE_UI_CONFIG.TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
                overflow-y: auto; /* 允许滚动 */
                padding: 10px; /* 减少内边距，优化空间利用 */
                box-sizing: border-box;
                transform-origin: top left; /* 支持缩放 */
            }

            .mobile-window.active {
                transform: translateX(0);
            }

            .mobile-window.exit {
                transform: translateX(-100%);
            }

            /* 悬浮导航栏 */
            .mobile-floating-nav {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: ${MOBILE_UI_CONFIG.FLOATING_NAV.HEIGHT}px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 16px;
                z-index: 1000;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                box-shadow: 0 2px 8px rgba(0, 0, 0, ${MOBILE_UI_CONFIG.FLOATING_NAV.SHADOW_OPACITY});
                transition: transform 0.3s ease;
            }

            .mobile-floating-nav.hidden {
                transform: translateY(-100%);
            }

            .nav-left, .nav-right {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .nav-back-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #f5f5f5;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 18px;
                transition: all 0.2s ease;
            }

            .nav-back-btn:hover {
                background: #e0e0e0;
                transform: scale(1.05);
            }

            .nav-title {
                font-size: 16px;
                font-weight: 600;
                color: #333;
            }

            .nav-rewards {
                display: flex;
                align-items: center;
                gap: 8px;
                background: rgba(255, 255, 255, 0.9);
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
            }

            /* 窗口内容区域 */
            .mobile-window-content {
                flex: 1;
                padding: ${MOBILE_UI_CONFIG.FLOATING_NAV.HEIGHT + 10}px 16px 16px;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                display: flex;
                flex-direction: column;
            }

            /* 主页窗口 - 完整功能界面 */
            .mobile-home {
                background: #f0f4f8; /* 与现有界面背景一致 */
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                text-align: center;
                padding: 20px 15px;
                min-height: 100vh;
                box-sizing: border-box;
            }

            .mobile-home-content {
                width: 100%;
                max-width: 400px;
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            /* 主要模式按钮 */
            .mobile-main-modes {
                display: flex;
                gap: 15px;
                width: 100%;
            }

            .mobile-mode-btn {
                flex: 1;
                background: white;
                border: 2px solid #e0e0e0;
                border-radius: 12px;
                padding: 20px 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 16px;
                font-weight: 500;
                color: #333;
                text-align: center;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                min-height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .mobile-mode-btn.primary {
                background: linear-gradient(135deg, #2196F3, #1976D2);
                color: white;
                border-color: #1976D2;
                font-weight: 600;
            }

            .mobile-mode-btn:hover {
                background: #f8f9fa;
                border-color: #2196F3;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .mobile-mode-btn.primary:hover {
                background: linear-gradient(135deg, #1976D2, #1565C0);
                border-color: #1565C0;
            }

            .mobile-mode-btn:active {
                transform: translateY(0);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            /* 学习类型切换 */
            .mobile-learn-types {
                background: white;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .mobile-learn-types h3 {
                margin: 0 0 15px 0;
                color: #333;
                font-size: 18px;
                font-weight: 600;
            }

            .learn-type-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }

            .learn-type-btn {
                background: #f5f5f5;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                padding: 12px 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 14px;
                color: #666;
                text-align: center;
            }

            .learn-type-btn:hover {
                background: #e3f2fd;
                border-color: #2196F3;
                color: #2196F3;
            }

            .learn-type-btn.active {
                background: #2196F3;
                border-color: #2196F3;
                color: white;
                font-weight: 500;
            }

            /* 功能按钮 */
            .mobile-function-buttons {
                display: flex;
                gap: 10px;
                width: 100%;
            }

            .mobile-function-btn {
                flex: 1;
                background: white;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                padding: 15px 10px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 14px;
                color: #666;
                text-align: center;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .mobile-function-btn:hover {
                background: #f8f9fa;
                border-color: #9E9E9E;
                color: #333;
            }

            /* 快速设置 */
            .mobile-quick-settings {
                background: white;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .mobile-setting-item {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 15px;
                cursor: pointer;
                font-size: 14px;
                color: #333;
            }

            .mobile-setting-item:last-child {
                margin-bottom: 0;
            }

            .mobile-setting-item input[type="checkbox"] {
                width: 18px;
                height: 18px;
                cursor: pointer;
            }

            /* 学习窗口 - 复用现有界面样式 */
            .mobile-learn {
                background: #f0f4f8; /* 与现有界面背景一致 */
                padding: 0; /* 移除内边距，让现有界面元素自己处理 */
            }

            /* 确保学习模式的所有现有样式都能正常工作 */
            .mobile-learn .learn-area {
                display: block !important; /* 确保学习区域显示 */
                padding: 0; /* 让现有样式处理间距 */
            }

            /* 隐藏原始界面中的其他模式 */
            .mobile-mode .quiz-area,
            .mobile-mode .settings-area {
                display: none !important;
            }

            /* 优化后的控制按钮布局 */
            .mobile-optimized-controls {
                margin: 10px 0;
            }

            .mobile-control-row-1 {
                display: flex;
                gap: 10px;
                justify-content: center;
                align-items: center;
            }

            .mobile-control-btn {
                background: white;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                padding: 12px 16px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 14px;
                color: #333;
                text-align: center;
                min-width: 80px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .mobile-control-btn:hover {
                background: #f8f9fa;
                border-color: #2196F3;
                transform: translateY(-1px);
            }

            .mobile-control-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .mobile-control-btn.mobile-btn-play {
                background: #4CAF50;
                color: white;
                border-color: #4CAF50;
                font-size: 16px;
            }

            .mobile-control-btn.mobile-btn-play:hover {
                background: #45a049;
                border-color: #45a049;
            }

            /* 简化的统计信息 */
            .mobile-simplified-stats {
                display: flex;
                justify-content: center;
                margin: 10px 0;
                padding: 10px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 8px;
            }

            .mobile-stat-item {
                text-align: center;
            }

            .mobile-stat-value {
                font-size: 18px;
                font-weight: bold;
                color: #2196F3;
                margin-bottom: 2px;
            }

            .mobile-stat-label {
                font-size: 12px;
                color: #666;
            }

            /* 缩放支持 */
            .mobile-window-container {
                transform-origin: top left;
                overflow: hidden;
            }

            .mobile-mode {
                overflow: hidden;
            }

            /* 响应式缩放 */
            @media (max-width: 480px) {
                .mobile-window {
                    padding: 8px;
                }

                .mobile-home-content {
                    max-width: 100%;
                }

                .mobile-mode-btn {
                    font-size: 14px;
                    padding: 15px 10px;
                }

                .learn-type-buttons {
                    grid-template-columns: 1fr;
                }
            }

            /* 学习窗口 - 复用现有界面样式 */
            .mobile-learn {
                background: #f0f4f8; /* 与现有界面背景一致 */
                padding: 0; /* 移除内边距，让现有界面元素自己处理 */
            }

            /* 确保学习模式的所有现有样式都能正常工作 */
            .mobile-learn .learn-area {
                display: block !important; /* 确保学习区域显示 */
                padding: 0; /* 让现有样式处理间距 */
            }

            /* 隐藏原始界面中的其他模式 */
            .mobile-mode .quiz-area,
            .mobile-mode .settings-area {
                display: none !important;
            }

            /* 优化后的控制按钮布局 */
            .mobile-optimized-controls {
                margin: 10px 0;
            }

            .mobile-control-row-1 {
                display: flex;
                gap: 10px;
                justify-content: center;
                align-items: center;
            }

            .mobile-control-btn {
                background: white;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                padding: 12px 16px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 14px;
                color: #333;
                text-align: center;
                min-width: 80px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .mobile-control-btn:hover {
                background: #f8f9fa;
                border-color: #2196F3;
                transform: translateY(-1px);
            }

            .mobile-control-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .mobile-control-btn.mobile-btn-play {
                background: #4CAF50;
                color: white;
                border-color: #4CAF50;
                font-size: 16px;
            }

            .mobile-control-btn.mobile-btn-play:hover {
                background: #45a049;
                border-color: #45a049;
            }

            /* 简化的统计信息 */
            .mobile-simplified-stats {
                display: flex;
                justify-content: center;
                margin: 10px 0;
                padding: 10px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 8px;
            }

            .mobile-stat-item {
                text-align: center;
            }

            .mobile-stat-value {
                font-size: 18px;
                font-weight: bold;
                color: #2196F3;
                margin-bottom: 2px;
            }

            .mobile-stat-label {
                font-size: 12px;
                color: #666;
            }

            /* 缩放支持 */
            .mobile-window-container {
                transform-origin: top left;
                overflow: hidden;
            }

            .mobile-mode {
                overflow: hidden;
            }

            /* 响应式缩放 */
            @media (max-width: 480px) {
                .mobile-window {
                    padding: 8px;
                }

                .mobile-home-content {
                    max-width: 100%;
                }

                .mobile-mode-btn {
                    font-size: 14px;
                    padding: 15px 10px;
                }

                .learn-type-buttons {
                    grid-template-columns: 1fr;
                }
            }

            .mobile-learn-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: 0;
            }

            .learn-main-area {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
            }

            .learn-control-area {
                padding: 20px;
                background: white;
                border-top: 1px solid #f0f0f0;
            }

            /* 学习卡片优化 */
            .mobile-word-card {
                background: white;
                border-radius: 16px;
                padding: 20px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
                margin-bottom: 16px;
            }

            .mobile-word-image {
                width: 100%;
                max-width: 180px;
                height: 120px;
                object-fit: cover;
                border-radius: 12px;
                margin: 0 auto 16px;
                display: block;
            }

            /* 进度条优化 */
            .mobile-progress-section {
                margin-bottom: 16px;
            }

            .mobile-progress-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }

            .mobile-progress-bar {
                width: 100%;
                height: 4px;
                background: #e0e0e0;
                border-radius: 2px;
                overflow: hidden;
            }

            .mobile-progress-fill {
                height: 100%;
                background: #4CAF50;
                transition: width 0.3s ease;
            }

            /* 控制按钮优化 */
            .mobile-control-buttons {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
            }

            .mobile-control-btn {
                flex: 1;
                padding: 12px 16px;
                border: none;
                border-radius: 25px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                min-height: 44px; /* 触摸友好高度 */
            }

            .mobile-btn-prev {
                background: #f5f5f5;
                color: #666;
            }

            .mobile-btn-play {
                background: #4CAF50;
                color: white;
                flex: 0 0 auto;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
            }

            .mobile-btn-next {
                background: #2196F3;
                color: white;
            }

            /* 小屏幕适配 */
            @media (max-width: 375px) {
                .mobile-window-content {
                    padding: ${MOBILE_UI_CONFIG.FLOATING_NAV.HEIGHT + 5}px 12px 12px;
                }

                .mobile-word-card {
                    padding: 16px;
                }

                .mobile-control-buttons {
                    gap: 8px;
                }

                .mobile-control-btn {
                    padding: 10px 12px;
                    font-size: 13px;
                }
            }

            /* 触摸优化 */
            .mobile-ui * {
                -webkit-tap-highlight-color: transparent;
                touch-action: manipulation;
            }

            /* 防止意外缩放 */
            .mobile-ui {
                touch-action: pan-y;
            }

            /* 隐藏原始界面 */
            .mobile-mode .original-container {
                display: none !important;
            }

            /* 测试模式样式 */
            .mobile-test-content, .mobile-quiz-content {
                padding: 20px;
                text-align: center;
            }

            .mobile-test-area, .mobile-quiz-area {
                max-width: 400px;
                margin: 0 auto;
            }

            .mobile-test-options {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin: 20px 0;
            }

            .mobile-option-btn {
                background: white;
                border: 2px solid #e0e0e0;
                border-radius: 12px;
                padding: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 16px;
                color: #333;
                text-align: center;
                min-height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .mobile-option-btn:hover {
                background: #f8f9fa;
                border-color: #2196F3;
                transform: translateY(-1px);
            }

            .mobile-option-btn.correct {
                background: #4CAF50;
                border-color: #4CAF50;
                color: white;
            }

            .mobile-option-btn.incorrect {
                background: #f44336;
                border-color: #f44336;
                color: white;
            }

            .mobile-test-controls, .mobile-quiz-controls {
                display: flex;
                gap: 10px;
                justify-content: center;
                margin: 20px 0;
            }

            /* 拼写模式样式 */
            .mobile-spelling-input {
                display: flex;
                gap: 10px;
                margin: 20px 0;
                align-items: center;
            }

            .mobile-spelling-input input {
                flex: 1;
                padding: 12px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 16px;
                transition: border-color 0.3s ease;
            }

            .mobile-spelling-input input:focus {
                outline: none;
                border-color: #2196F3;
            }

            .mobile-submit-btn {
                background: #2196F3;
                color: white;
                border: none;
                border-radius: 8px;
                padding: 12px 20px;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.3s ease;
            }

            .mobile-submit-btn:hover {
                background: #1976D2;
                transform: translateY(-1px);
            }

            .mobile-quiz-hint {
                margin: 15px 0;
            }

            .mobile-hint-btn {
                background: #FF9800;
                color: white;
                border: none;
                border-radius: 20px;
                padding: 8px 16px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
            }

            .mobile-hint-btn:hover {
                background: #F57C00;
                transform: translateY(-1px);
            }

            .mobile-word-chinese {
                font-size: 20px;
                font-weight: bold;
                color: #1976d2;
                margin: 10px 0;
            }

            .mobile-word-phonetic {
                font-size: 14px;
                color: #666;
                font-style: italic;
                margin: 5px 0;
            }
        `;

        document.head.appendChild(style);
    }

    /**
     * 转换现有界面为窗口模式
     */
    convertToWindowMode() {
        console.log('[MobileUI] 开始转换到窗口模式...');

        // 隐藏原始界面内容
        const originalContainer = document.querySelector('.container');
        if (originalContainer) {
            originalContainer.style.display = 'none';
            console.log('[MobileUI] 已隐藏原始容器');
        }

        // 创建主页窗口
        this.createHomeWindow();

        // 创建学习窗口（直接复用现有界面）
        this.createLearnWindow();

        // 创建其他模式窗口
        this.createOtherWindows();

        // 确保学习模式界面正确显示
        this.setupExistingInterface();

        console.log('[MobileUI] 界面转换完成');
    }

    /**
     * 应用缩放设置
     */
    applyScaleSettings() {
        const settings = getSettings();
        const scale = settings?.uiScale || 1;

        if (this.windowContainer) {
            this.windowContainer.style.transform = `scale(${scale})`;
            this.windowContainer.style.transformOrigin = 'top left';
            this.windowContainer.style.width = `${100 / scale}%`;
            this.windowContainer.style.height = `${100 / scale}%`;
        }

        console.log(`[MobileUI] 应用缩放: ${scale}`);
    }

    /**
     * 设置现有界面
     */
    setupExistingInterface() {
        // 确保现有的学习模式界面在手机模式下正确工作
        const learnMode = document.getElementById('learnMode');
        const quizMode = document.getElementById('quizMode');
        const settingsMode = document.getElementById('settingsMode');

        if (learnMode) {
            // 确保学习模式在手机窗口中显示
            learnMode.style.display = 'block';
        }

        // 隐藏其他模式，它们将在各自的窗口中显示
        if (quizMode) quizMode.style.display = 'none';
        if (settingsMode) settingsMode.style.display = 'none';

        console.log('[MobileUI] 现有界面设置完成');

        // 应用缩放设置
        this.applyScaleSettings();
    }

    /**
     * 创建主页窗口 - 包含所有功能按钮的完整界面
     */
    createHomeWindow() {
        const homeWindow = document.createElement('div');
        homeWindow.id = 'mobileHomeWindow';
        homeWindow.className = 'mobile-window mobile-home active';

        // 获取当前设置以显示正确的按钮状态
        const settings = getSettings();
        const currentLearnType = localStorage.getItem('learnType') || 'word';

        // 完整的主页界面，包含所有功能按钮
        homeWindow.innerHTML = `
            <div class="mobile-home-content">
                <!-- 主要模式按钮 -->
                <div class="mobile-main-modes">
                    <button class="mobile-mode-btn primary" onclick="mobileUI.switchToMode('learn')">
                        📚 学习模式
                    </button>
                    <button class="mobile-mode-btn primary" onclick="mobileUI.switchToMode('quiz')">
                        🔤 拼写模式
                    </button>
                </div>

                <!-- 测试模式按钮 -->
                <div class="mobile-main-modes">
                    <button class="mobile-mode-btn" onclick="mobileUI.switchToMode('test')">
                        📝 测试模式
                    </button>
                    <button class="mobile-mode-btn" onclick="mobileUI.switchToMode('stats')">
                        📊 学习统计
                    </button>
                </div>

                <!-- 学习类型切换 -->
                <div class="mobile-learn-types">
                    <h3>学习类型</h3>
                    <div class="learn-type-buttons">
                        <button class="learn-type-btn ${currentLearnType === 'word' ? 'active' : ''}" onclick="mobileUI.setLearnType('word')">
                            英文单词
                        </button>
                        <button class="learn-type-btn ${currentLearnType === 'word_zh' ? 'active' : ''}" onclick="mobileUI.setLearnType('word_zh')">
                            中文单词
                        </button>
                        <button class="learn-type-btn ${currentLearnType === 'phrase_en' ? 'active' : ''}" onclick="mobileUI.setLearnType('phrase_en')">
                            英文短语
                        </button>
                        <button class="learn-type-btn ${currentLearnType === 'phrase_zh' ? 'active' : ''}" onclick="mobileUI.setLearnType('phrase_zh')">
                            中文短语
                        </button>
                    </div>
                </div>

                <!-- 功能按钮 -->
                <div class="mobile-function-buttons">
                    <button class="mobile-function-btn" onclick="shuffleWords()">
                        🔀 随机排序
                    </button>
                    <button class="mobile-function-btn" onclick="mobileUI.switchToMode('settings')">
                        ⚙️ 设置
                    </button>
                </div>

                <!-- 快速设置 -->
                <div class="mobile-quick-settings">
                    <label class="mobile-setting-item">
                        <input type="checkbox" id="mobileAutoPlay" ${settings.autoPlay ? 'checked' : ''} onchange="mobileUI.toggleAutoPlay()">
                        自动播放发音
                    </label>
                    <label class="mobile-setting-item">
                        <input type="checkbox" id="mobileShowImages" ${settings.showImages ? 'checked' : ''} onchange="mobileUI.toggleShowImages()">
                        显示图片
                    </label>
                </div>
            </div>
        `;

        this.windowContainer.appendChild(homeWindow);
    }

    /**
     * 创建学习窗口 - 直接复用现有的学习模式界面
     */
    createLearnWindow() {
        const learnWindow = document.createElement('div');
        learnWindow.id = 'mobileLearnWindow';
        learnWindow.className = 'mobile-window mobile-learn';

        // 直接复用现有的学习模式界面元素
        // 获取原始的学习模式内容
        const originalLearnMode = document.getElementById('learnMode');
        if (originalLearnMode) {
            // 克隆现有的学习模式内容
            const clonedContent = originalLearnMode.cloneNode(true);
            learnWindow.appendChild(clonedContent);
        } else {
            // 如果原始内容不存在，创建占位符
            learnWindow.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <h2>📚 学习模式</h2>
                    <p>正在加载学习界面...</p>
                </div>
            `;
        }

        this.windowContainer.appendChild(learnWindow);
    }

    /**
     * 创建其他模式窗口 - 直接复用现有设置界面
     */
    createOtherWindows() {
        // 设置窗口 - 直接复用现有的设置模式界面
        const settingsWindow = document.createElement('div');
        settingsWindow.id = 'mobileSettingsWindow';
        settingsWindow.className = 'mobile-window';

        // 获取原始的设置模式内容
        const originalSettingsMode = document.getElementById('settingsMode');
        if (originalSettingsMode) {
            // 克隆现有的设置模式内容
            const clonedContent = originalSettingsMode.cloneNode(true);
            settingsWindow.appendChild(clonedContent);
        } else {
            // 如果原始内容不存在，创建占位符
            settingsWindow.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <h2>⚙️ 设置</h2>
                    <p>正在加载设置界面...</p>
                </div>
            `;
        }

        this.windowContainer.appendChild(settingsWindow);

        // 测试模式窗口 - 创建测试界面
        const testWindow = document.createElement('div');
        testWindow.id = 'mobileTestWindow';
        testWindow.className = 'mobile-window';
        testWindow.innerHTML = `
            <div class="mobile-test-content">
                <h2>📝 测试模式</h2>
                <div class="mobile-test-area">
                    <div class="mobile-word-card">
                        <div class="mobile-word-image" id="testWordImage">💎</div>
                        <div class="mobile-word-text" id="testWordText">Diamond</div>
                        <div class="mobile-word-phonetic" id="testWordPhonetic">/ˈdaɪmənd/</div>
                    </div>

                    <div class="mobile-test-options">
                        <button class="mobile-option-btn" onclick="mobileUI.selectTestOption(this, true)">钻石</button>
                        <button class="mobile-option-btn" onclick="mobileUI.selectTestOption(this, false)">石头</button>
                        <button class="mobile-option-btn" onclick="mobileUI.selectTestOption(this, false)">黄金</button>
                        <button class="mobile-option-btn" onclick="mobileUI.selectTestOption(this, false)">铁矿</button>
                    </div>

                    <div class="mobile-test-controls">
                        <button class="mobile-control-btn" onclick="mobileUI.previousTestWord()">⬅️ 上一个</button>
                        <button class="mobile-control-btn mobile-btn-play" onclick="mobileUI.playTestAudio()">🔊</button>
                        <button class="mobile-control-btn" onclick="mobileUI.nextTestWord()">下一个 ➡️</button>
                    </div>
                </div>
            </div>
        `;
        this.windowContainer.appendChild(testWindow);

        // 拼写模式窗口 - 创建拼写测试界面
        const quizWindow = document.createElement('div');
        quizWindow.id = 'mobileQuizWindow';
        quizWindow.className = 'mobile-window';
        quizWindow.innerHTML = `
            <div class="mobile-quiz-content">
                <h2>🔤 拼写模式</h2>
                <div class="mobile-quiz-area">
                    <div class="mobile-word-card">
                        <div class="mobile-word-image" id="quizWordImage">💎</div>
                        <div class="mobile-word-chinese" id="quizWordChinese">钻石</div>
                        <div class="mobile-word-phonetic" id="quizWordPhonetic">/ˈdaɪmənd/</div>
                    </div>

                    <div class="mobile-spelling-input">
                        <input type="text" id="quizSpellingInput" placeholder="请输入英文单词..." onkeypress="mobileUI.handleSpellingKeyPress(event)">
                        <button class="mobile-submit-btn" onclick="mobileUI.checkSpelling()">提交</button>
                    </div>

                    <div class="mobile-quiz-controls">
                        <button class="mobile-control-btn" onclick="mobileUI.previousQuizWord()">⬅️ 上一个</button>
                        <button class="mobile-control-btn mobile-btn-play" onclick="mobileUI.playQuizAudio()">🔊</button>
                        <button class="mobile-control-btn" onclick="mobileUI.nextQuizWord()">下一个 ➡️</button>
                    </div>

                    <div class="mobile-quiz-hint">
                        <button class="mobile-hint-btn" onclick="mobileUI.showSpellingHint()">💡 提示</button>
                    </div>
                </div>
            </div>
        `;
        this.windowContainer.appendChild(quizWindow);

        // 统计窗口 - 创建简化的统计界面
        const statsWindow = document.createElement('div');
        statsWindow.id = 'mobileStatsWindow';
        statsWindow.className = 'mobile-window';
        statsWindow.innerHTML = `
            <div class="mobile-stats-content">
                <h2>📊 学习统计</h2>
                <div id="mobileStatsContainer">
                    <!-- 统计内容将在这里动态生成 -->
                </div>
            </div>
        `;
        this.windowContainer.appendChild(statsWindow);
    }

    /**
     * 设置学习类型
     */
    setLearnType(type) {
        console.log(`[MobileUI] 设置学习类型: ${type}`);

        if (typeof setLearnType === 'function') {
            setLearnType(type);

            // 更新按钮状态
            const buttons = document.querySelectorAll('.learn-type-btn');
            buttons.forEach(btn => btn.classList.remove('active'));

            const activeBtn = document.querySelector(`.learn-type-btn[onclick*="${type}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
        }
    }

    /**
     * 切换自动播放
     */
    toggleAutoPlay() {
        const checkbox = document.getElementById('mobileAutoPlay');
        if (checkbox) {
            const settings = getSettings();
            settings.autoPlay = checkbox.checked;
            saveSettings();
            console.log(`[MobileUI] 自动播放: ${settings.autoPlay ? '开启' : '关闭'}`);
        }
    }

    /**
     * 切换显示图片
     */
    toggleShowImages() {
        const checkbox = document.getElementById('mobileShowImages');
        if (checkbox) {
            const settings = getSettings();
            settings.showImages = checkbox.checked;
            saveSettings();
            console.log(`[MobileUI] 显示图片: ${settings.showImages ? '开启' : '关闭'}`);
        }
    }

    /**
     * 切换到指定模式 - 复用现有的switchMode函数
     */
    switchToMode(modeName) {
        console.log(`[MobileUI] 切换到模式: ${modeName}`);

        // 调用现有的switchMode函数
        if (typeof switchMode === 'function') {
            switchMode(modeName);

            // 切换到对应的窗口
            this.openWindow(modeName);
        } else {
            console.warn('[MobileUI] switchMode函数未定义');
        }
    }

    /**
     * 打开新窗口
     */
    openWindow(windowName) {
        if (windowName === this.currentWindow) return;

        const currentWindowEl = document.getElementById('mobile' +
            this.currentWindow.charAt(0).toUpperCase() + this.currentWindow.slice(1) + 'Window');
        const newWindowEl = document.getElementById('mobile' +
            windowName.charAt(0).toUpperCase() + windowName.slice(1) + 'Window');

        if (!newWindowEl) {
            console.warn(`[MobileUI] 窗口不存在: ${windowName}`);
            return;
        }

        // 隐藏当前窗口
        if (currentWindowEl) {
            currentWindowEl.classList.remove('active');
            setTimeout(() => {
                currentWindowEl.classList.add('exit');
            }, 10);
        }

        // 显示新窗口
        newWindowEl.classList.remove('exit', 'hidden');
        setTimeout(() => {
            newWindowEl.classList.add('active');
        }, 50);

        // 更新历史记录
        this.windowHistory.push(windowName);
        this.currentWindow = windowName;

        // 更新导航
        this.updateNavigation(windowName);

        // 填充窗口内容
        this.populateWindowContent(windowName);

        console.log(`[MobileUI] 打开窗口: ${windowName}`);
    }

    /**
     * 返回上一窗口
     */
    goBack() {
        if (this.windowHistory.length <= 1) return;

        // 移除当前窗口
        this.windowHistory.pop();
        const previousWindow = this.windowHistory[this.windowHistory.length - 1];

        // 隐藏当前窗口
        const currentWindowEl = document.getElementById('mobile' +
            this.currentWindow.charAt(0).toUpperCase() + this.currentWindow.slice(1) + 'Window');
        if (currentWindowEl) {
            currentWindowEl.classList.add('exit');
            setTimeout(() => {
                currentWindowEl.classList.remove('active', 'exit');
            }, MOBILE_UI_CONFIG.TRANSITION_DURATION);
        }

        // 显示上一个窗口
        const previousWindowEl = document.getElementById('mobile' +
            previousWindow.charAt(0).toUpperCase() + previousWindow.slice(1) + 'Window');
        if (previousWindowEl) {
            previousWindowEl.classList.remove('exit', 'hidden');
            setTimeout(() => {
                previousWindowEl.classList.add('active');
            }, 50);
        }

        this.currentWindow = previousWindow;
        this.updateNavigation(previousWindow);

        console.log(`[MobileUI] 返回窗口: ${previousWindow}`);
    }

    /**
     * 更新导航显示
     */
    updateNavigation(windowName) {
        const nav = this.floatingNav;
        if (!nav) return;

        const title = nav.querySelector('.nav-title');
        const backBtn = nav.querySelector('.nav-back-btn');

        // 更新标题
        const titles = {
            'home': '主页',
            'learn': '学习模式',
            'quiz': '拼写模式',
            'test': '测试模式',
            'settings': '设置',
            'stats': '学习统计'
        };
        title.textContent = titles[windowName] || '未知';

        // 更新返回按钮
        if (windowName === 'home') {
            backBtn.style.display = 'none';
        } else {
            backBtn.style.display = 'flex';
        }

        // 更新奖励显示
        this.updateRewardsDisplay();
    }

    /**
     * 填充窗口内容
     */
    populateWindowContent(windowName) {
        switch (windowName) {
            case 'learn':
                this.populateLearnWindow();
                break;
            case 'quiz':
                this.populateQuizWindow();
                break;
            case 'test':
                this.populateTestWindow();
                break;
            case 'settings':
                this.populateSettingsWindow();
                break;
            case 'stats':
                this.populateStatsWindow();
                break;
        }
    }

    /**
     * 填充学习窗口内容 - 优化布局，去除空白区域
     */
    populateLearnWindow() {
        console.log('[MobileUI] 优化学习窗口布局');

        // 获取学习模式容器
        const learnMode = document.getElementById('learnMode');
        if (!learnMode) return;

        // 优化学习窗口布局
        this.optimizeLearnLayout(learnMode);

        // 触发一次界面更新，确保内容正确显示
        if (typeof updateWordDisplay === 'function') {
            updateWordDisplay();
        }
    }

    /**
     * 填充测试窗口内容
     */
    populateTestWindow() {
        console.log('[MobileUI] 填充测试窗口内容');
        this.updateTestWord();
    }

    /**
     * 填充拼写窗口内容
     */
    populateQuizWindow() {
        console.log('[MobileUI] 填充拼写窗口内容');
        this.updateQuizWord();
        document.getElementById('quizSpellingInput').value = '';
    }

    /**
     * 优化学习窗口布局
     */
    optimizeLearnLayout(learnMode) {
        // 1. 重新布局控制按钮，将上一个/下一个按钮移到第一行
        const controlButtons = learnMode.querySelector('.control-buttons');
        if (controlButtons) {
            this.rearrangeControlButtons(controlButtons);
        }

        // 2. 简化统计信息，移除不必要的显示行
        const stats = learnMode.querySelector('.stats');
        if (stats) {
            this.simplifyStats(stats);
        }

        // 3. 优化进度条和分组进度显示
        const groupProgress = learnMode.querySelector('.group-progress');
        if (groupProgress) {
            this.optimizeGroupProgress(groupProgress);
        }

        // 4. 调整整体布局，减少空白区域
        this.adjustOverallLayout(learnMode);

        console.log('[MobileUI] 学习窗口布局优化完成');
    }

    /**
     * 重新布局控制按钮
     */
    rearrangeControlButtons(controlButtons) {
        // 创建新的按钮布局
        const newLayout = document.createElement('div');
        newLayout.className = 'mobile-optimized-controls';
        newLayout.innerHTML = `
            <div class="mobile-control-row-1">
                <button class="mobile-control-btn mobile-btn-prev" onclick="previousWord()" disabled>⬅️ 上一个</button>
                <button class="mobile-control-btn mobile-btn-play" onclick="playAudio()">🔊</button>
                <button class="mobile-control-btn mobile-btn-next" onclick="nextWord()" disabled>下一个 ➡️</button>
            </div>
        `;

        // 替换原始的控制按钮
        controlButtons.parentNode.replaceChild(newLayout, controlButtons);

        // 复制原始按钮的样式和功能
        const originalButtons = controlButtons.querySelectorAll('.control-btn');
        const newButtons = newLayout.querySelectorAll('.mobile-control-btn');

        originalButtons.forEach((originalBtn, index) => {
            if (newButtons[index]) {
                // 复制事件监听器和属性
                newButtons[index].disabled = originalBtn.disabled;
                newButtons[index].onclick = originalBtn.onclick;
            }
        });
    }

    /**
     * 简化统计信息
     */
    simplifyStats(stats) {
        // 只保留必要的统计信息，移除当前位置、总词汇数等
        const newStats = document.createElement('div');
        newStats.className = 'mobile-simplified-stats';
        newStats.innerHTML = `
            <div class="mobile-stat-item">
                <div class="mobile-stat-value" id="mobileLearnedCount">0</div>
                <div class="mobile-stat-label">已学习</div>
            </div>
        `;

        // 保留已学习数量，但简化显示
        const learnedCount = stats.querySelector('#learnedCount');
        if (learnedCount) {
            const mobileLearnedCount = newStats.querySelector('#mobileLearnedCount');
            if (mobileLearnedCount) {
                mobileLearnedCount.textContent = learnedCount.textContent;
            }
        }

        // 替换原始统计信息
        stats.parentNode.replaceChild(newStats, stats);
    }

    /**
     * 优化分组进度显示
     */
    optimizeGroupProgress(groupProgress) {
        // 保持分组进度，但优化样式
        groupProgress.style.margin = '10px 0';
        groupProgress.style.padding = '10px';
        groupProgress.style.background = 'rgba(255, 255, 255, 0.8)';
        groupProgress.style.borderRadius = '8px';
    }

    /**
     * 调整整体布局
     */
    adjustOverallLayout(learnMode) {
        // 优化间距和布局
        learnMode.style.padding = '10px';
        learnMode.style.margin = '0';

        // 优化单词卡片
        const wordCard = learnMode.querySelector('.word-card');
        if (wordCard) {
            wordCard.style.margin = '10px 0';
            wordCard.style.padding = '15px';
        }

        // 优化进度条
        const progressBar = learnMode.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.margin = '10px 0';
        }

        // 移除不必要的空白
        const elements = learnMode.querySelectorAll('*');
        elements.forEach(el => {
            if (el.style) {
                // 移除大的外边距
                if (el.style.marginTop && parseInt(el.style.marginTop) > 20) {
                    el.style.marginTop = '10px';
                }
                if (el.style.marginBottom && parseInt(el.style.marginBottom) > 20) {
                    el.style.marginBottom = '10px';
                }
            }
        });
    }

    /**
     * 获取当前单词数据
     */
    getCurrentWordData() {
        // 从现有的游戏逻辑获取当前单词
        if (typeof currentVocabulary !== 'undefined' && currentVocabulary.length > 0) {
            const word = currentVocabulary[currentWordIndex] || {};
            return {
                english: word.english || 'Diamond',
                chinese: word.chinese || '钻石',
                phonetic: word.phonetic || '/ˈdaɪmənd/',
                image: word.image || 'https://via.placeholder.com/200x150/4CAF50/ffffff?text=Diamond'
            };
        }

        // 默认数据
        return {
            english: 'Diamond',
            chinese: '钻石',
            phonetic: '/ˈdaɪmənd/',
            image: 'https://via.placeholder.com/200x150/4CAF50/ffffff?text=Diamond'
        };
    }

    /**
     * 获取当前进度信息
     */
    getCurrentProgress() {
        // 从现有的游戏逻辑获取进度
        const totalWords = (typeof currentVocabulary !== 'undefined') ? currentVocabulary.length : 10;
        const currentIndex = (typeof currentWordIndex !== 'undefined') ? currentWordIndex : 0;
        const groupSize = 10;
        const currentGroup = Math.floor(currentIndex / groupSize) + 1;
        const groupCurrent = (currentIndex % groupSize) + 1;
        const groupTotal = Math.min(groupSize, totalWords - (currentGroup - 1) * groupSize);
        const groupPercentage = (groupCurrent / groupTotal) * 100;
        const overallPercentage = ((currentIndex + 1) / totalWords) * 100;

        return {
            group: currentGroup,
            current: groupCurrent,
            total: groupTotal,
            percentage: groupPercentage,
            overallCurrent: currentIndex + 1,
            overallTotal: totalWords,
            overallPercentage: overallPercentage
        };
    }

    /**
     * 生成测验选项
     */
    generateQuizOptions(currentWord) {
        // 简化的选项生成逻辑
        const options = [
            { text: currentWord.chinese, isCorrect: true },
            { text: '石头', isCorrect: false },
            { text: '黄金', isCorrect: false },
            { text: '铁矿', isCorrect: false }
        ];

        // 随机打乱选项顺序
        return options.sort(() => Math.random() - 0.5);
    }

    /**
     * 更新奖励显示
     */
    updateRewardsDisplay() {
        const diamondEl = document.getElementById('mobileDiamondCount');
        const swordEl = document.getElementById('mobileSwordCount');

        if (diamondEl && swordEl && typeof totalDiamonds !== 'undefined' && typeof totalSwords !== 'undefined') {
            diamondEl.textContent = totalDiamonds;
            swordEl.textContent = totalSwords;
        }
    }

    /**
     * 设置触摸优化
     */
    setupTouchOptimization() {
        // 防止双击缩放
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // 防止页面滚动（除了内容区域）
        document.addEventListener('touchmove', function(e) {
            const contentAreas = e.target.closest('.mobile-window-content, .learn-main-area');
            if (!contentAreas) {
                e.preventDefault();
            }
        }, { passive: false });

        // 优化触摸反馈
        document.addEventListener('touchstart', function(e) {
            if (e.target.closest('.mobile-control-btn, .option-btn, .mode-tile')) {
                e.target.style.transform = 'scale(0.95)';
            }
        }, { passive: true });

        document.addEventListener('touchend', function(e) {
            if (e.target.closest('.mobile-control-btn, .option-btn, .mode-tile')) {
                setTimeout(() => {
                    e.target.style.transform = '';
                }, 100);
            }
        }, { passive: true });
    }

    /**
     * 设置事件监听器
     */
    setupEventListeners() {
        // 窗口大小变化时重新检测
        window.addEventListener('resize', () => {
            this.detectMobileMode();
        });

        // 键盘事件处理
        window.addEventListener('keydown', (e) => {
            if (this.isMobileMode) {
                if (e.key === 'Escape' && this.currentWindow !== 'home') {
                    this.goBack();
                }
            }
        });

        console.log('[MobileUI] 事件监听器已设置');
    }

    /**
     * 选择选项（学习模式）
     */
    selectOption(button, isCorrect) {
        // 清除之前的选择
        button.parentElement.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
        });

        // 标记选择
        if (isCorrect) {
            button.classList.add('correct');
            setTimeout(() => {
                this.nextWord();
            }, 1000);
        } else {
            button.classList.add('incorrect');
        }
    }

    /**
     * 上一个单词
     */
    previousWord() {
        console.log('[MobileUI] 上一个单词');

        // 调用现有的上一个单词逻辑
        if (typeof previousWord !== 'undefined') {
            previousWord();
        } else if (typeof handlePrevWord !== 'undefined') {
            handlePrevWord();
        } else {
            // 手动实现上一个单词逻辑
            if (typeof currentWordIndex !== 'undefined' && currentWordIndex > 0) {
                currentWordIndex--;
                this.populateLearnWindow();
                this.updateRewardsDisplay();
            }
        }
    }

    /**
     * 下一个单词
     */
    nextWord() {
        console.log('[MobileUI] 下一个单词');

        // 调用现有的下一个单词逻辑
        if (typeof nextWord !== 'undefined') {
            nextWord();
        } else if (typeof handleNextWord !== 'undefined') {
            handleNextWord();
        } else {
            // 手动实现下一个单词逻辑
            const totalWords = (typeof currentVocabulary !== 'undefined') ? currentVocabulary.length : 10;
            if (typeof currentWordIndex !== 'undefined' && currentWordIndex < totalWords - 1) {
                currentWordIndex++;
                this.populateLearnWindow();
                this.updateRewardsDisplay();
            }
        }
    }

    /**
     * 播放音频
     */
    playAudio() {
        const btn = document.querySelector('.mobile-btn-play');
        if (btn) {
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);
        }

        // 获取当前单词
        const currentWord = this.getCurrentWordData();

        // 调用现有的TTS系统
        if (typeof TTS !== 'undefined' && TTS.speak) {
            TTS.speak(currentWord.english);
        } else if (typeof speakWord !== 'undefined') {
            speakWord(currentWord.english);
        } else if (typeof speak !== 'undefined') {
            speak(currentWord.english);
        } else {
            // 备用：使用浏览器原生语音合成
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(currentWord.english);
                utterance.lang = 'en-US';
                speechSynthesis.speak(utterance);
            }
        }

        console.log('[MobileUI] 播放音频:', currentWord.english);
    }

    /**
     * 切换手机窗口模式
     */
    toggleMobileWindowMode(enabled) {
        console.log(`[MobileUI] 切换手机窗口模式: ${enabled ? '启用' : '禁用'}`);

        if (enabled) {
            this.detectMobileMode();
            if (this.isMobileMode) {
                this.setupMobileUI();
                console.log('[MobileUI] 手机窗口模式已启用');
            } else {
                console.warn('[MobileUI] 设备不是手机模式，无法启用窗口模式');
            }
        } else {
            this.disableMobileUI();
            console.log('[MobileUI] 手机窗口模式已禁用');
        }
    }

    /**
     * 禁用移动UI，恢复原始界面
     */
    disableMobileUI() {
        if (!this.isMobileMode) return;

        console.log('[MobileUI] 禁用移动UI模式');

        // 移除窗口容器
        if (this.windowContainer) {
            this.windowContainer.remove();
            this.windowContainer = null;
        }

        // 移除悬浮导航
        if (this.floatingNav) {
            this.floatingNav.remove();
            this.floatingNav = null;
        }

        // 显示原始内容
        const originalContainer = document.querySelector('.container');
        if (originalContainer) {
            originalContainer.style.display = '';
        }

        // 移除手机模式样式
        document.body.classList.remove('mobile-mode');

        // 重置状态
        this.isMobileMode = false;
        this.currentWindow = 'home';
        this.windowHistory = ['home'];

        console.log('[MobileUI] 移动UI已禁用，恢复原始界面');
    }

    /**
     * 获取当前窗口名称
     */
    getCurrentWindow() {
        return this.currentWindow;
    }

    /**
     * 切换手机窗口模式
     */
    toggleMobileWindowMode(enabled) {
        console.log(`[MobileUI] 切换手机窗口模式: ${enabled ? '启用' : '禁用'}`);

        if (enabled) {
            this.detectMobileMode();
            if (this.isMobileMode) {
                this.setupMobileUI();
                console.log('[MobileUI] 手机窗口模式已启用');
            } else {
                console.warn('[MobileUI] 设备不是手机模式，无法启用窗口模式');
            }
        } else {
            this.disableMobileUI();
            console.log('[MobileUI] 手机窗口模式已禁用');
        }
    }

    /**
     * 检查是否处于手机模式
     */
    isInMobileMode() {
        return this.isMobileMode;
    }
}

// 创建全局实例
window.mobileUI = new MobileUIManager();

// 导出供外部使用
window.MobileUIManager = MobileUIManager;

console.log('[MobileUI] 手机模式UI管理器已加载');