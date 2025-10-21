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

        this.init();
    }

    /**
     * 初始化手机模式UI
     */
    init() {
        this.detectMobileMode();

        if (this.isMobileMode) {
            this.setupMobileUI();
            this.setupTouchOptimization();
            this.setupEventListeners();
        }
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

            /* 手机模式窗口 */
            .mobile-window {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                transform: translateX(100%);
                transition: transform ${MOBILE_UI_CONFIG.TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                flex-direction: column;
                overflow: hidden;
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

            /* 主页窗口 */
            .mobile-home {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 0;
            }

            .mobile-home-content {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 40px 20px;
            }

            /* 学习窗口 */
            .mobile-learn {
                background: #f8fafc;
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
        `;

        document.head.appendChild(style);
    }

    /**
     * 转换现有界面为窗口模式
     */
    convertToWindowMode() {
        // 创建主页窗口
        this.createHomeWindow();

        // 创建学习窗口
        this.createLearnWindow();

        // 创建其他模式窗口（设置、统计等）
        this.createOtherWindows();

        console.log('[MobileUI] 界面转换完成');
    }

    /**
     * 创建主页窗口
     */
    createHomeWindow() {
        const homeWindow = document.createElement('div');
        homeWindow.id = 'mobileHomeWindow';
        homeWindow.className = 'mobile-window mobile-home active';

        homeWindow.innerHTML = `
            <div class="mobile-home-content">
                <div class="home-header">
                    <h1>🎮 Minecraft 单词学习</h1>
                    <p>看图学单词，轻松掌握游戏词汇</p>
                </div>
                <div class="mode-grid">
                    <div class="mode-tile" onclick="mobileUI.openWindow('learn')">
                        <div class="mode-icon">📚</div>
                        <div class="mode-name">学习模式</div>
                        <div class="mode-desc">看图识单词</div>
                    </div>
                    <div class="mode-tile" onclick="mobileUI.openWindow('quiz')">
                        <div class="mode-icon">🔤</div>
                        <div class="mode-name">拼写模式</div>
                        <div class="mode-desc">听音拼单词</div>
                    </div>
                    <div class="mode-tile" onclick="mobileUI.openWindow('settings')">
                        <div class="mode-icon">⚙️</div>
                        <div class="mode-name">设置</div>
                        <div class="mode-desc">个性化配置</div>
                    </div>
                    <div class="mode-tile" onclick="mobileUI.openWindow('stats')">
                        <div class="mode-icon">📊</div>
                        <div class="mode-name">学习统计</div>
                        <div class="mode-desc">查看进度</div>
                    </div>
                </div>
            </div>
        `;

        this.windowContainer.appendChild(homeWindow);
    }

    /**
     * 创建学习窗口
     */
    createLearnWindow() {
        const learnWindow = document.createElement('div');
        learnWindow.id = 'mobileLearnWindow';
        learnWindow.className = 'mobile-window mobile-learn';

        learnWindow.innerHTML = `
            <div class="mobile-learn-content">
                <div class="learn-main-area" id="mobileLearnMain">
                    <!-- 动态内容将在这里插入 -->
                </div>
                <div class="learn-control-area" id="mobileLearnControls">
                    <!-- 控制按钮将在这里插入 -->
                </div>
            </div>
        `;

        this.windowContainer.appendChild(learnWindow);
    }

    /**
     * 创建其他模式窗口
     */
    createOtherWindows() {
        // 设置窗口
        const settingsWindow = document.createElement('div');
        settingsWindow.id = 'mobileSettingsWindow';
        settingsWindow.className = 'mobile-window';
        settingsWindow.innerHTML = `
            <div class="mobile-window-content" id="mobileSettingsContent">
                <!-- 设置内容将在这里动态生成 -->
            </div>
        `;
        this.windowContainer.appendChild(settingsWindow);

        // 统计窗口
        const statsWindow = document.createElement('div');
        statsWindow.id = 'mobileStatsWindow';
        statsWindow.className = 'mobile-window';
        statsWindow.innerHTML = `
            <div class="mobile-window-content" id="mobileStatsContent">
                <!-- 统计内容将在这里动态生成 -->
            </div>
        `;
        this.windowContainer.appendChild(statsWindow);
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
            case 'settings':
                this.populateSettingsWindow();
                break;
            case 'stats':
                this.populateStatsWindow();
                break;
        }
    }

    /**
     * 填充学习窗口内容
     */
    populateLearnWindow() {
        const mainArea = document.getElementById('mobileLearnMain');
        const controlArea = document.getElementById('mobileLearnControls');

        if (!mainArea || !controlArea) return;

        // 获取当前学习状态
        const currentWord = this.getCurrentWordData();
        const progress = this.getCurrentProgress();
        const options = this.generateQuizOptions(currentWord);

        mainArea.innerHTML = `
            <div class="mobile-progress-section">
                <div class="mobile-progress-info">
                    <div class="mobile-progress-label">第 ${progress.group} 组进度</div>
                    <div class="mobile-progress-counter">${progress.current}/${progress.total}</div>
                </div>
                <div class="mobile-progress-bar">
                    <div class="mobile-progress-fill" style="width: ${progress.percentage}%;"></div>
                </div>
            </div>
            <div class="mobile-word-card">
                <img class="mobile-word-image" src="${currentWord.image}" alt="单词图片" onerror="this.src='https://via.placeholder.com/200x150/4CAF50/ffffff?text=${encodeURIComponent(currentWord.english)}'">
                <div class="word-text">
                    <div class="word-english">${currentWord.english}</div>
                    <div class="word-phonetic">${currentWord.phonetic || ''}</div>
                    <div class="word-chinese">${currentWord.chinese}</div>
                </div>
                <div class="quiz-options">
                    ${options.map((option, index) => `
                        <button class="option-btn" onclick="mobileUI.selectOption(this, ${option.isCorrect})" data-option="${index}">
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        controlArea.innerHTML = `
            <div class="mobile-control-buttons">
                <button class="mobile-control-btn mobile-btn-prev" onclick="mobileUI.previousWord()" ${progress.current <= 1 ? 'disabled' : ''}>⬅️ 上一个</button>
                <button class="mobile-control-btn mobile-btn-play" onclick="mobileUI.playAudio()">🔊</button>
                <button class="mobile-control-btn mobile-btn-next" onclick="mobileUI.nextWord()" ${progress.current >= progress.total ? 'disabled' : ''}>下一个 ➡️</button>
            </div>
            <div class="progress-container" style="margin-top: 16px;">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress.overallPercentage}%;"></div>
                </div>
                <div style="text-align: center; font-size: 12px; color: #666; margin-top: 4px;">
                    总进度: ${progress.overallCurrent}/${progress.overallTotal} (${Math.round(progress.overallPercentage)}%)
                </div>
            </div>
        `;
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