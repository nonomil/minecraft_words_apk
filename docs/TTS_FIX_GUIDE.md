# TTS 发音问题修复说明

## 已完成的修复

### 1. 降低 TTS 冷却时间 ✅
**文件**: `js/tts-adapter.js`  
**修改**: 将 `SPEAK_COOLDOWN_MS` 从 120ms 降低到 50ms  
**效果**: 减少自动发音被误杀的概率

### 2. 修复手机模式布局 ✅
**文件**: `css/mobile-app.css`  
**修改**: 
- 固定底部导航栏位置
- 添加背景遮罩提高可读性
- 优化内容间距

### 3. 更新版本号 ✅
**文件**: `android-app/package.json`, `android-app/android/app/build.gradle`, `index.html`  
**版本**: v2.2.1

---

## 待修复：移动端长按发音功能

### 问题描述
当前代码中，学习选项（中文/英文选项）只支持**桌面端的悬停发音**（`mouseenter` 事件），在移动设备上**长按无法触发发音**。

### 原因分析
- 桌面浏览器：鼠标悬停 → `mouseenter` 触发 → 发音 ✅
- 移动设备：手指长按 → `mouseenter` **不触发** → 没有发音 ❌

### 解决方案

需要在 `js/game.js` 的 `generateLearnChoices` 函数中，为每个选项添加触摸事件监听器。

**修改位置**: `js/game.js` 第 255-259 行

**原代码**:
```javascript
        choiceElement.addEventListener('mouseenter', speakOnHover);
        choiceElement.addEventListener('mouseleave', () => speakOnHover.cancel && speakOnHover.cancel());
        
        choiceElement.onclick = () => selectLearnChoice(choiceElement, choice, correctAnswer);
        choicesContainer.appendChild(choiceElement);
```

**修改为**:
```javascript
        choiceElement.addEventListener('mouseenter', speakOnHover);
        choiceElement.addEventListener('mouseleave', () => speakOnHover.cancel && speakOnHover.cancel());
        
        // 移动端：长按发音支持
        let longPressTimer = null;
        choiceElement.addEventListener('touchstart', () => {
            longPressTimer = setTimeout(() => {
                try {
                    if (optionIsEnglish) {
                        if (window.TTS) TTS.speak(choice, { lang: 'en-US', rate: Math.max(0.6, getSettings().speechRate*0.8), pitch: getSettings().speechPitch, volume: getSettings().speechVolume });
                    } else {
                        if (window.TTS) TTS.speak(choice, { lang: 'zh-CN', rate: Math.max(0.85, getSettings().speechRate*0.95), pitch: getSettings().speechPitch, volume: getSettings().speechVolume });
                    }
                } catch(e){}
                longPressTimer = null;
            }, hoverDelay);
        });
        choiceElement.addEventListener('touchend', () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
        });
        choiceElement.addEventListener('touchcancel', () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
        });
        
        choiceElement.onclick = () => selectLearnChoice(choiceElement, choice, correctAnswer);
        choicesContainer.appendChild(choiceElement);
```

### 手动修改步骤
1. 打开 `js/game.js`
2. 找到第 255-259 行（`generateLearnChoices` 函数末尾）
3. 将上述代码替换为新代码
4. 保存文件
5. 提交并推送到 GitHub

---

## 测试建议

### 浏览器测试
1. 强制刷新浏览器（Ctrl+F5）
2. 切换到手机模式
3. 测试：
   - 自动发音是否工作
   - 长按选项是否发音（修复后）
   - 布局是否正常

### APK 测试
1. 等待 GitHub Actions 构建 v2.2.1
2. 下载并安装新 APK
3. 测试：
   - 自动发音
   - 长按选项发音
   - 屏幕旋转
   - 首次启动引导

---

## 其他已知问题

### 浏览器自动发音可能失败
**原因**: 某些浏览器需要用户交互才能启用音频  
**解决**: 用户首次点击页面后，TTS 会自动启用

### APK 中 TTS 应该正常工作
**原因**: Capacitor 原生环境下，TTS 插件会自动工作，不受浏览器限制

---

## 版本历史
- **v2.2.1** (2025-11-28): 优化 TTS 冷却时间，修复手机布局
- **v2.2.0** (2025-11-28): 添加屏幕旋转控制，首次启动引导
