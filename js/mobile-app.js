// Mobile App Manager - Simplified Content Sharing System
class MobileAppManager {
    constructor() {
        this.currentView = 'home';
        this.initialized = false;
        this.fullscreenViews = new Set(['learn', 'quiz']);
        this.touchState = null;
        // Always try to init, but logic inside will check if needed or forced
        this.init();
    }

    init() {
        if (this.initialized) return;

        console.log('📱 MobileAppManager initializing...');
        this.setupNavigation();
        this.setupRewardSync();
        this.setupContentSharing();
        this.setupFullscreenTouchGuard();
        this.initialized = true;
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.mobile-nav-item');
        // Use a clean approach: remove old listeners by cloning or just ensure we don't duplicate logic
        // Since we can't easily remove anonymous functions, we'll assume this runs once per session 
        // or we rely on the 'initialized' flag.

        navItems.forEach(item => {
            // Remove existing listeners to be safe (clone node trick)
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);

            newItem.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                console.log('📱 Navigating to:', view);
                this.switchToView(view);
            });
        });
    }

    switchToView(viewName) {
        console.log('📱 Switching view to:', viewName);
        this.currentView = viewName;

        if (this.fullscreenViews.has(viewName)) {
            this.enterFullscreenView(viewName);
        } else {
            this.exitFullscreenView();
        }

        // Update navigation
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.view === viewName) {
                item.classList.add('active');
            }
        });

        // Update views
        document.querySelectorAll('.mobile-view').forEach(view => {
            view.classList.remove('active');
        });

        const targetView = document.getElementById(`mobile-${viewName}`);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Move content to the active mobile view
        if (viewName !== 'home') {
            this.moveContentToMobile(viewName);

            // Ensure content is visible and game state is updated
            if (typeof window.switchMode === 'function') {
                window.switchMode(viewName);
            } else {
                // Fallback if switchMode is not available
                const contentMap = {
                    'learn': 'learnMode',
                    'quiz': 'quizMode',
                    'settings': 'settingsMode'
                };
                const contentId = contentMap[viewName];
                if (contentId) {
                    const el = document.getElementById(contentId);
                    if (el) el.style.display = 'block';
                }
            }
        }
    }

    enterFullscreenView(viewName) {
        const mobileLayout = document.querySelector('.mobile-layout');
        const targetView = document.getElementById(`mobile-${viewName}`);
        if (!mobileLayout || !targetView) return;

        mobileLayout.classList.add('fullscreen-mode');
        targetView.classList.add('fullscreen-view');
    }

    exitFullscreenView() {
        const mobileLayout = document.querySelector('.mobile-layout');
        if (!mobileLayout) return;

        mobileLayout.classList.remove('fullscreen-mode');
        document.querySelectorAll('.mobile-view').forEach(view => {
            view.classList.remove('fullscreen-view');
        });
    }

    setupContentSharing() {
        // Initially, content is in desktop layout
        // We'll move it to mobile when needed
    }

    moveContentToMobile(viewName) {
        const contentMap = {
            'learn': 'learnMode',
            'quiz': 'quizMode',
            'settings': 'settingsMode'
        };

        const sourceId = contentMap[viewName];
        const targetId = `mobile-${viewName}-content`;

        const source = document.getElementById(sourceId);
        const target = document.getElementById(targetId);

        if (source && target) {
            // Check if source is already in target
            if (source.parentElement === target) return;

            console.log(`📱 Moving ${sourceId} to mobile view`);

            // If source is in desktop container, move it
            // If source is in another mobile view (shouldn't happen normally), move it
            target.appendChild(source);
        }
    }

    moveContentToDesktop(viewName) {
        const contentMap = {
            'learn': 'learnMode',
            'quiz': 'quizMode',
            'settings': 'settingsMode'
        };

        const sourceId = contentMap[viewName];
        const desktopContainer = document.querySelector('.desktop-layout .game-area');

        const source = document.getElementById(sourceId);

        if (source && desktopContainer && source.parentElement.classList.contains('mobile-view-content')) {
            console.log(`🖥️ Moving ${sourceId} back to desktop`);
            desktopContainer.appendChild(source);
        }
    }

    setupRewardSync() {
        // Sync reward counts
        const syncRewards = () => {
            const desktopDiamonds = document.getElementById('diamondTotal');
            const desktopSwords = document.getElementById('swordTotal');
            const mobileDiamonds = document.querySelectorAll('.mobile-diamond-val');
            const mobileSwords = document.querySelectorAll('.mobile-sword-val');

            if (desktopDiamonds) {
                mobileDiamonds.forEach(el => el.textContent = desktopDiamonds.textContent);
            }
            if (desktopSwords) {
                mobileSwords.forEach(el => el.textContent = desktopSwords.textContent);
            }
        };

        // Initial sync
        syncRewards();

        // Set up observers
        const desktopDiamonds = document.getElementById('diamondTotal');
        const desktopSwords = document.getElementById('swordTotal');

        if (desktopDiamonds) {
            const observer = new MutationObserver(syncRewards);
            observer.observe(desktopDiamonds, { childList: true, characterData: true, subtree: true });
        }

        if (desktopSwords) {
            const observer = new MutationObserver(syncRewards);
            observer.observe(desktopSwords, { childList: true, characterData: true, subtree: true });
        }
    }

    setupFullscreenTouchGuard() {
        document.addEventListener('touchstart', (event) => {
            if (!this.isFullscreenActive()) return;
            const scrollContainer = event.target.closest('.mobile-view.fullscreen-view .mobile-view-content');
            if (!scrollContainer) {
                this.touchState = null;
                return;
            }
            this.touchState = {
                scrollContainer,
                startY: event.touches[0]?.clientY || 0
            };
        }, { passive: true });

        document.addEventListener('touchmove', (event) => {
            if (!this.isFullscreenActive()) return;

            const scrollContainer = event.target.closest('.mobile-view.fullscreen-view .mobile-view-content');
            if (!scrollContainer) {
                event.preventDefault();
                return;
            }

            const touchY = event.touches[0]?.clientY || 0;
            const prevY = this.touchState?.startY ?? touchY;
            const deltaY = touchY - prevY;
            const maxScrollTop = Math.max(0, scrollContainer.scrollHeight - scrollContainer.clientHeight);
            const atTop = scrollContainer.scrollTop <= 0;
            const atBottom = scrollContainer.scrollTop >= maxScrollTop - 1;

            if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
                // Prevent viewport bounce/chain scrolling when content reaches boundary.
                event.preventDefault();
            }

            this.touchState = {
                scrollContainer,
                startY: touchY
            };
        }, { passive: false });

        document.addEventListener('touchend', () => {
            this.touchState = null;
        }, { passive: true });
    }

    isFullscreenActive() {
        const mobileLayout = document.querySelector('.mobile-layout');
        return Boolean(mobileLayout?.classList.contains('fullscreen-mode'));
    }
}

function getViewportShortSide() {
    const vv = window.visualViewport;
    const width = vv?.width || window.innerWidth || document.documentElement.clientWidth || 0;
    const height = vv?.height || window.innerHeight || document.documentElement.clientHeight || 0;
    return Math.min(width, height);
}

function shouldUseMobileLayout() {
    return getViewportShortSide() < 768;
}

// Initialize on DOM ready if needed (auto mode)
document.addEventListener('DOMContentLoaded', () => {
    // Only auto-init if screen is small, otherwise wait for manual switch or resize
    if (shouldUseMobileLayout()) {
        if (!window.mobileApp) {
            window.mobileApp = new MobileAppManager();
        }
    }
});

// Handle resize
let wasDesktop = !shouldUseMobileLayout();
window.addEventListener('resize', () => {
    // Check if we are in a forced mode
    const settings = window.MinecraftWordGame ? window.MinecraftWordGame.getSettings() : null;
    const deviceMode = settings ? settings.deviceMode : 'auto';

    if (deviceMode !== 'auto') return; // Don't auto-switch if mode is forced

    const isDesktop = !shouldUseMobileLayout();
    if (wasDesktop !== isDesktop) {
        wasDesktop = isDesktop;

        if (!isDesktop) {
            // Switched to mobile
            if (!window.mobileApp) {
                window.mobileApp = new MobileAppManager();
            }
        } else {
            // Switched to desktop - move content back
            if (window.mobileApp) {
                ['learn', 'quiz', 'settings'].forEach(view => {
                    window.mobileApp.moveContentToDesktop(view);
                });
                // We don't nullify window.mobileApp anymore to keep state, 
                // or we can just let it sit there.
            }
        }
    }
});
