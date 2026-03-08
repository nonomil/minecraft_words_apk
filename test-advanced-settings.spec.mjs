import { test, expect } from '@playwright/test';

test('test advanced settings button', async ({ page }) => {
    await page.goto('http://localhost:4173/Game.html');
    
    // 等待页面加载
    await page.waitForTimeout(2000);
    
    // 跳过登录
    const loginBtn = page.locator('#btn-login');
    if (await loginBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await page.fill('#username-input', 'test-user');
        await loginBtn.click();
        await page.waitForTimeout(1000);
    }
    
    // 跳过语言选择
    const langBtn = page.locator('#btn-language-mode-english');
    if (await langBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await langBtn.click();
        await page.waitForTimeout(1000);
    }
    
    // 跳过开始弹窗
    const startBtn = page.locator('#btn-overlay-action');
    if (await startBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await startBtn.click();
        await page.waitForTimeout(1000);
    }
    
    // 打开设置
    await page.click('#btn-settings');
    await page.waitForTimeout(500);
    
    // 检查设置模态框是否可见
    const settingsModal = page.locator('#settings-modal');
    await expect(settingsModal).toBeVisible();
    console.log('✓ 设置模态框已打开');
    
    // 检查高级设置按钮是否存在
    const advancedBtn = page.locator('#btn-settings-advanced');
    await expect(advancedBtn).toBeVisible();
    console.log('✓ 高级设置按钮存在');
    
    // 点击高级设置按钮
    await advancedBtn.click();
    await page.waitForTimeout(500);
    
    // 检查高级设置模态框
    const advancedModal = page.locator('#advanced-settings-modal');
    const isVisible = await advancedModal.isVisible();
    console.log('高级设置模态框可见:', isVisible);
    
    // 检查 visible 类
    const hasVisibleClass = await advancedModal.evaluate(el => el.classList.contains('visible'));
    console.log('高级设置模态框有 visible 类:', hasVisibleClass);
    
    // 检查 aria-hidden
    const ariaHidden = await advancedModal.getAttribute('aria-hidden');
    console.log('高级设置模态框 aria-hidden:', ariaHidden);
    
    // 截图
    await page.screenshot({ path: 'test-results/advanced-settings-test.png', fullPage: true });
    
    expect(isVisible).toBe(true);
});
