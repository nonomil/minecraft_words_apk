import { test } from '@playwright/test';

test('check console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });
    
    page.on('pageerror', error => {
        errors.push(error.message);
    });
    
    await page.goto('http://localhost:4173/Game.html');
    await page.waitForTimeout(2000);
    
    // 跳过登录和弹窗
    const loginBtn = page.locator('#btn-login');
    if (await loginBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await page.fill('#username-input', 'test-user');
        await loginBtn.click();
        await page.waitForTimeout(1000);
    }
    
    const langBtn = page.locator('#btn-language-mode-english');
    if (await langBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await langBtn.click();
        await page.waitForTimeout(1000);
    }
    
    const startBtn = page.locator('#btn-overlay-action');
    if (await startBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await startBtn.click();
        await page.waitForTimeout(1000);
    }
    
    // 打开设置
    await page.click('#btn-settings');
    await page.waitForTimeout(500);
    
    // 检查按钮绑定
    const btnExists = await page.evaluate(() => {
        const btn = document.getElementById('btn-settings-advanced');
        const modal = document.getElementById('advanced-settings-modal');
        return {
            btnExists: !!btn,
            modalExists: !!modal,
            btnHasListener: btn && btn.onclick !== null,
            modalDisplay: modal ? window.getComputedStyle(modal).display : 'N/A',
            modalZIndex: modal ? window.getComputedStyle(modal).zIndex : 'N/A'
        };
    });
    
    console.log('元素检查:', JSON.stringify(btnExists, null, 2));
    
    // 点击按钮
    await page.click('#btn-settings-advanced');
    await page.waitForTimeout(500);
    
    // 检查点击后状态
    const afterClick = await page.evaluate(() => {
        const modal = document.getElementById('advanced-settings-modal');
        return {
            hasVisibleClass: modal ? modal.classList.contains('visible') : false,
            ariaHidden: modal ? modal.getAttribute('aria-hidden') : 'N/A',
            display: modal ? window.getComputedStyle(modal).display : 'N/A'
        };
    });
    
    console.log('点击后状态:', JSON.stringify(afterClick, null, 2));
    console.log('控制台错误:', errors);
});
