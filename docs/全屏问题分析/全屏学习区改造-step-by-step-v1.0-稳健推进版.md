# 全屏学习区改造 Step-by-Step v1.0（稳健推进版）

日期：2026-02-18
目标：在不引入第二套状态机前提下，稳定实现全屏学习区。

## Phase A：基线收敛

### Step A1：确认唯一运行链路
- 动作：确认移动端入口仅 `js/mobile-app.js` + `js/device-mode.js`。
- 输出：运行链路说明记录。
- 验收：学习/测验/设置切换均由 `switchToView()` 驱动。

### Step A2：配置收敛
- 动作：确认 Capacitor 生效配置文件唯一来源。
- 输出：配置来源清单。
- 验收：`appId/webDir/plugins` 无双份冲突。

### Step A3：原生方向与沉浸式
- 动作：`AndroidManifest.xml` 设 `sensorLandscape`；`styles.xml` 补齐全屏与刘海支持。
- 输出：原生配置变更。
- 验收：冷启动横屏、无标题栏遮挡。

### Step A4：方向控制优先级收敛
- 动作：调整 `js/device-mode.js` 的 `lockScreenOrientation()`，在原生环境下跳过重复的 JS 锁定/解锁，避免与原生方向策略冲突。
- 输出：方向控制优先级说明（原生优先，Web 兜底）。
- 验收：模式切换时无方向抖动或反复锁定日志。

## Phase B：全屏学习视图改造

### Step B1：保留既有迁移目标
- 动作：保持 `#mobile-learn-content` / `#mobile-quiz-content` ID 不变。
- 输出：结构变更说明。
- 验收：`moveContentToMobile()` 无需重写目标 ID。

### Step B2：增强现有 Header
- 动作：在 `.mobile-view-header` 增加返回按钮与状态位，不新建并行 toolbar 容器。
- 输出：HTML/CSS 改造。
- 验收：返回按钮在学习/测验视图固定可见。

### Step B3：进入全屏态
- 动作：切到 learn/quiz 时加 `fullscreen-mode`，隐藏底部导航与无关区块。
- 输出：`switchToView()` 增强。
- 验收：学习页仅显示学习相关内容。

### Step B4：退出全屏态复原
- 动作：`switchToView('home')` 时执行复原：显示 header、显示底部导航、移除 `fullscreen-mode`。
- 输出：退出逻辑清单。
- 验收：返回首页后 UI 无残留状态。

## Phase C：防滑出与交互稳定

### Step C1：滚动边界限制
- 动作：全屏容器设置 `overflow: hidden` + `overscroll-behavior: contain`。
- 验收：不会拖动整页滑出。

### Step C2：内容滚动隔离
- 动作：仅 `mobile-*-content` 可滚动，限制横向溢出。
- 验收：学习内容可滚，页面不串滚。

### Step C3：触摸兜底
- 动作：全屏激活时启用触摸拦截，退出全屏后移除。
- 验收：无跨页面误拦截。

## Phase D：横屏适配与首页改造

### Step D1：首页横屏必改
- 动作：`#mobile-home` 卡片由竖向改横向/网格。
- 验收：横屏首屏无挤压、可单手点击。

### Step D2：断点与安全区
- 动作：增加横屏断点，接入 `dvh/dvw` 与 `safe-area`。
- 验收：手机/小平板/大平板无裁切。

### Step D3：首启弹窗冲突处理
- 动作：调整 `firstLaunchModal`，去掉与横屏冲突的“手机竖屏”路径。
- 验收：首启流程不再与原生横屏策略矛盾。

## Phase E：回归与发布

### Step E1：核心流程回归
- 覆盖：学习、测验、设置、返回首页、切换模式、前后台切换。
- 验收：无阻断问题。

### Step E2：设备矩阵验证
- 覆盖：横屏手机、小平板、大平板。
- 验收：布局、触控、字体均通过。

### Step E3：发布文档
- 输出：测试报告、已知问题、回滚点。
- 验收：可交付测试 APK。

## 里程碑
1. M1（D+0.5）：A 完成。
2. M2（D+2）：B/C 完成。
3. M3（D+3）：D 完成。
4. M4（D+4）：E 完成。
