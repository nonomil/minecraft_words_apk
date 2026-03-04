# Worktree B：存档与UI增强 - 执行计划

> **负责 Agent：** Worktree-B Agent
> **分支名称：** `feature/parallel-save-ui`
> **Worktree 路径：** `../worktree-B/`
> **创建时间：** 2026-03-04
> **最后更新：** 2026-03-04
> **当前状态：** `待开始` ← Worktree-B Agent 更新此字段

---

## 📋 状态字段（Agent 必须维护）

```yaml
status: "待开始"  # 待开始 | 进行中 | 已完成 | 测试失败 | 待合并 | 已合并
start_time: ""
complete_time: ""
backup_file: ""
test_result: ""  # 通过 | 失败 | 未执行
test_log: ""
commit_hash: ""
notes: ""
```

---

## 🎯 任务目标

完成存档与UI相关的 2 个功能增强：
1. vA-Task2: 档案页备份/恢复快捷入口
2. vB-Task3: 弱词行动入口（占位）

---

## 📂 涉及文件清单

### 主要修改文件
- `src/modules/08-account.js` - `wireProfileModal()` 部分
- `src/modules/09-vocab.js` - 弱词逻辑占位
- `Game.html` - 档案页按钮UI

### 只读参考文件
- `src/modules/02-utils.js` - 工具函数
- `src/modules/10-ui.js` - UI 辅助函数

### 测试文件
- `tests/e2e/specs/opt-0226-task1-save-transfer.spec.mjs`

---

## ✅ 任务清单（逐项勾选）

### Task 1: 档案页备份/恢复快捷入口（vA-Task2）

#### 1.1 UI 增加按钮
- [ ] 在 `Game.html` 的 `#profile-modal .profile-actions` 中新增两个按钮：
  - `<button id="btn-profile-export-save">📤 导出存档</button>`
  - `<button id="btn-profile-import-save">📥 导入存档</button>`
- [ ] 按钮样式与现有按钮保持一致
- [ ] 移动端布局适配

#### 1.2 事件绑定
- [ ] 在 `src/modules/08-account.js` 的 `wireProfileModal()` 中获取新按钮
- [ ] 导出按钮绑定 `handleExportSave` 函数
- [ ] 导入按钮绑定 `handleImportSave` 函数
- [ ] 保留原保存弹窗中的旧入口（不删除）

#### 1.3 功能验证
- [ ] 确认 `handleExportSave` 和 `handleImportSave` 函数已存在
- [ ] 如不存在，需要实现基本逻辑（调用现有存档系统）

#### 1.4 自检
- [ ] 打开档案页，确认两个按钮显示
- [ ] 点击导出按钮，触发导出流程
- [ ] 点击导入按钮，触发导入流程
- [ ] 旧入口仍可用（不影响原有功能）

#### 1.5 提交
```bash
git add Game.html src/modules/08-account.js
git commit -m "feat(worktree-B): add profile save export/import shortcuts

- Add export/import buttons in profile modal
- Wire buttons to existing save handlers
- Keep legacy save modal entry intact"
```

---

### Task 2: 弱词行动入口（占位）（vB-Task3）

#### 2.1 UI 增加按钮
- [ ] 在 `src/modules/08-account.js` 的弱词区域新增按钮：
  - `<button id="btn-weak-words-practice">🎯 弱词专项练习</button>`
- [ ] 按钮位置：弱词列表下方

#### 2.2 占位逻辑实现
- [ ] 在 `wireProfileModal()` 中获取 `btn-weak-words-practice`
- [ ] 点击时显示 toast 提示：`"弱词专项练习功能即将上线"`
- [ ] 第一期仅做占位，不实现真实练习模式

#### 2.3 预留接口（可选）
- [ ] 在 `src/modules/09-vocab.js` 中预留 `startWeakWordsPractice()` 函数
- [ ] 函数体为空或返回 `{ status: "not_implemented" }`

#### 2.4 自检
- [ ] 按钮存在且可点击
- [ ] 点击后有 toast 提示
- [ ] 不影响现有弱词列表显示

#### 2.5 提交
```bash
git add src/modules/08-account.js src/modules/09-vocab.js
git commit -m "feat(worktree-B): add weak words practice entry (placeholder)

- Add practice button in weak words section
- Show toast notification for upcoming feature
- Reserve interface in vocab module"
```

---

## 🧪 测试与验证

### 自动化测试
```bash
# 在 worktree-B 目录内执行
cd /g/UserCode/Mario_Minecraft/mario-minecraft-game_APK_V1.19.8

# 运行相关测试
npx playwright test -c tests/e2e/playwright.config.mjs \
  tests/e2e/specs/opt-0226-task1-save-transfer.spec.mjs
```

**测试结果记录：**
- [ ] `opt-0226-task1-save-transfer.spec.mjs` - _待填写（通过/失败）_

### 手工测试清单
- [ ] 档案页快捷入口可用（导出/导入）
- [ ] 弱词按钮存在且有占位提示
- [ ] 旧存档入口仍可用
- [ ] 主流程无回归（进入游戏 → 暂停 → 继续 → 存档）

---

## 📦 打包与备份

### 提交策略
**重要：** 每完成一个任务就提交一次 git，但**只在所有任务完成后才打包压缩备份**。

- Task 1 完成 → git commit（标注 worktree-B 进展）
- Task 2 完成 → git commit（标注 worktree-B 进展）
- **所有任务完成** → 打包压缩备份

### 打包命令（所有任务完成后执行）
```bash
# 在 worktree-B 的父目录执行
cd /g/UserCode/Mario_Minecraft/

# 确认所有改动已提交
cd worktree-B
git status
git log --oneline -5

# 返回父目录打包
cd ..
tar -czf worktree-B-save-ui-$(date +%Y%m%d-%H%M%S).tar.gz worktree-B/

# 或使用 zip（Windows）
7z a -tzip worktree-B-save-ui-$(date +%Y%m%d-%H%M%S).zip worktree-B/
```

### 备份文件信息
- **文件名：** _待填写（例：worktree-B-save-ui-20260304-150000.tar.gz）_
- **文件大小：** _待填写_
- **存放路径：** `docs/archive/2026-03-04-parallel-dev-backups/`
- **备份时间：** _待填写_

---

## ✅ 完成定义（DoD）

Worktree-B Agent 必须确认以下所有项才能标记为"已完成"：

- [ ] 所有任务清单已勾选
- [ ] 每个任务完成后已单独提交 git
- [ ] 自动化测试全部通过
- [ ] 手工测试清单全部通过
- [ ] 所有任务完成后已打包备份，文件已归档
- [ ] 本文档状态字段已更新为"已完成"
- [ ] 本文档所有 `_待填写_` 字段已填写
- [ ] 已通知 Master Agent 可以合并

---

## 📝 Agent 操作日志

_Worktree-B Agent 在此记录关键操作和问题_

### 2026-03-04
- 创建 Worktree B 执行计划文档

<!-- Worktree-B Agent 追加日志到此处 -->
