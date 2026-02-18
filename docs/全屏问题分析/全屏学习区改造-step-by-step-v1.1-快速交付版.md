# 全屏学习区改造 Step-by-Step v1.1（快速交付版）

日期：2026-02-18
目标：2天内交付可测全屏学习包，后续再补治理项。

## Day 1：可用性打通

### Step 1：原生横屏开关
- 修改：`AndroidManifest.xml` -> `sensorLandscape`，并同步修改 `styles.xml`（`windowFullscreen` + `windowLayoutInDisplayCutoutMode`）。
- 验收：APK 启动即横屏，刘海/挖孔屏不遮挡核心内容。

### Step 2：学习/测验全屏态
- 修改：`mobile-app.js` + `mobile-app.css`。
- 要求：保留 `mobile-learn-content` / `mobile-quiz-content`。
- 验收：进入学习/测验后仅显示学习区。

### Step 3：返回首页闭环
- 修改：增强 `.mobile-view-header` 返回按钮。
- 验收：`switchToView('home')` 后恢复导航与默认样式。

### Step 4：防滑出最小集
- 修改：容器 `overflow/overscroll` + 内容区滚动隔离。
- 验收：不再出现明显“滑出学习区”。

## Day 2：可发布打磨

### Step 5：首页横屏改造（必做）
- 修改：`#mobile-home` 卡片布局横向化。
- 验收：首页横屏可用、视觉可接受。

### Step 6：首启弹窗修正
- 修改：`firstLaunchModal` 去除竖屏冲突选项。
- 验收：首启路径逻辑一致。

### Step 7：三机型回归
- 覆盖：手机/小平板/大平板。
- 验收：学习、测验、设置全流程通过。

### Step 8：打包与报告
- 输出：测试 APK + 简版回归报告。
- 验收：进入联调测试阶段。

## 延后项（下一轮）
1. 注释态 `mobile-simple-overlay` 引用清理。
2. 脚本重复加载清理。
3. Capacitor 配置治理与统一脚本。
