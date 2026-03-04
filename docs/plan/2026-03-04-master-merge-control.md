# 主分支合并控制文档

> **管理者：** 主分支 Agent（Master Agent）
> **创建时间：** 2026-03-04
> **最后更新：** 2026-03-04
> **状态：** 等待 worktree 完成

---

## 📊 Worktree 状态监控

### Worktree A（账号统计增强）
- **状态：** `待开始` ← Master Agent 更新此字段
- **分支：** `feature/parallel-account-stats`
- **计划文档：** `worktree-A-account-stats-plan.md`
- **负责 Agent：** Worktree-A Agent
- **预估工时：** 6-8h
- **开始时间：** _待填写_
- **完成时间：** _待填写_
- **备份文件：** _待填写_
- **测试结果：** _待填写_

### Worktree B（存档与UI增强）
- **状态：** `待开始` ← Master Agent 更新此字段
- **分支：** `feature/parallel-save-ui`
- **计划文档：** `worktree-B-save-ui-plan.md`
- **负责 Agent：** Worktree-B Agent
- **预估工时：** 2-3h
- **开始时间：** _待填写_
- **完成时间：** _待填写_
- **备份文件：** _待填写_
- **测试结果：** _待填写_

### Worktree C（PWA 基础设施）
- **状态：** `待开始` ← Master Agent 更新此字段
- **分支：** `feature/parallel-pwa`
- **计划文档：** `worktree-C-pwa-plan.md`
- **负责 Agent：** Worktree-C Agent
- **预估工时：** 3-4h
- **开始时间：** _待填写_
- **完成时间：** _待填写_
- **备份文件：** _待填写_
- **测试结果：** _待填写_

### Worktree D（音频系统串行开发）
- **状态：** `待开始` ← Master Agent 更新此字段
- **分支：** `feature/serial-audio-system`
- **计划文档：** `worktree-D-audio-system-plan.md`
- **负责 Agent：** Worktree-D Agent
- **预估工时：** 13-21h（分 3 个阶段：D1/D2/E）
- **当前阶段：** _待填写_
- **D1 完成时间：** _待填写_
- **D2 完成时间：** _待填写_
- **E 完成时间：** _待填写_
- **备份文件：** _待填写（每个阶段一个）_
- **测试结果：** _待填写_

---

## 🔀 合并决策逻辑

### 合并顺序规则

**优先级排序：**
1. Worktree A（P0，账号统计）
2. Worktree B（P0，存档UI）
3. Worktree C（P1，PWA）
4. Worktree D-Phase1+2（P0+P1，音频基础+增强）
5. Worktree D-Phase3（P2，TTS Provider 重构）

**合并触发条件（Master Agent 检查）：**

```
IF (worktree.status == "已完成" AND worktree.测试结果 == "通过" AND worktree.备份文件 != "")
  THEN worktree.status = "待合并"

IF (所有高优先级 worktree.status == "待合并" OR "已合并")
  THEN 可以合并当前 worktree
```

**具体决策流程：**

1. **检查 Worktree A**
   - 状态 == "已完成" ？
   - 测试结果 == "通过" ？
   - 备份文件存在 ？
   - → 是：标记为"待合并"，执行合并流程

2. **检查 Worktree B**
   - 状态 == "已完成" ？
   - 测试结果 == "通过" ？
   - 备份文件存在 ？
   - Worktree A 已合并 ？
   - → 是：标记为"待合并"，执行合并流程

3. **检查 Worktree C**
   - 状态 == "已完成" ？
   - 测试结果 == "通过" ？
   - 备份文件存在 ？
   - Worktree A, B 已合并 ？
   - → 是：标记为"待合并"，执行合并流程

4. **检查 Worktree D（分阶段）**
   - **D1+D2 合并条件：**
     - D1, D2 阶段都完成 ？
     - 测试结果 == "通过" ？
     - 备份文件存在 ？
     - Worktree A, B, C 已合并 ？
     - → 是：标记为"待合并"，执行合并流程

   - **E 合并条件：**
     - E 阶段完成 ？
     - 测试结果 == "通过" ？
     - 备份文件存在 ？
     - D1+D2 已合并 ？
     - → 是：标记为"待合并"，执行合并流程

---

## ✅ 合并前检查清单（Master Agent 执行）

每次合并前必须逐项检查：

### 通用检查项
- [ ] 目标 worktree 状态为"待合并"
- [ ] 主分支 `main` 工作区干净（`git status` 无未提交改动）
- [ ] 目标分支存在且可访问
- [ ] 备份文件已归档到 `docs/archive/2026-03-04-parallel-dev-backups/`

### 冲突预检查
- [ ] 运行 `git diff main..feature/parallel-X` 预览改动
- [ ] 检查是否有意外的文件修改（不在计划内的文件）
- [ ] 检查改动行数是否在预期范围内（单个 worktree ≤ 500 行）

### 合并执行
```bash
# 1. 切换到主分支
git checkout main

# 2. 确认干净
git status

# 3. 合并（保留合并记录）
git merge --no-ff feature/parallel-X -m "merge: integrate parallel-X [功能描述]"

# 4. 如有冲突，手动解决
# 编辑冲突文件
git add [冲突文件]
git commit -m "merge: resolve conflicts from parallel-X"
```

### 合并后验证
- [ ] 运行全量回归测试：`npx playwright test -c tests/e2e/playwright.config.mjs`
- [ ] 手工验证主流程：进入游戏 → 暂停 → 继续 → 存档 → 设置 → 档案
- [ ] 检查本次合并引入的功能是否正常工作
- [ ] 检查历史功能是否有回归

### 验证通过后
- [ ] 更新本文档中对应 worktree 的状态为"已合并"
- [ ] 记录合并时间戳
- [ ] 记录验证结果
- [ ] 清理 worktree（可选）：`git worktree remove ../worktree-X`

---

## 📝 合并记录

### Worktree A 合并记录
- **合并时间：** _待填写_
- **合并提交：** _待填写（commit hash）_
- **冲突情况：** _待填写（无冲突 / 已解决）_
- **验证结果：** _待填写（通过 / 失败）_
- **备注：** _待填写_

### Worktree B 合并记录
- **合并时间：** _待填写_
- **合并提交：** _待填写（commit hash）_
- **冲突情况：** _待填写（无冲突 / 已解决）_
- **验证结果：** _待填写（通过 / 失败）_
- **备注：** _待填写_

### Worktree C 合并记录
- **合并时间：** _待填写_
- **合并提交：** _待填写（commit hash）_
- **冲突情况：** _待填写（无冲突 / 已解决）_
- **验证结果：** _待填写（通过 / 失败）_
- **备注：** _待填写_

### Worktree D（D1+D2）合并记录
- **合并时间：** _待填写_
- **合并提交：** _待填写（commit hash）_
- **冲突情况：** _待填写（无冲突 / 已解决）_
- **验证结果：** _待填写（通过 / 失败）_
- **备注：** _待填写_

### Worktree D（E）合并记录
- **合并时间：** _待填写_
- **合并提交：** _待填写（commit hash）_
- **冲突情况：** _待填写（无冲突 / 已解决）_
- **验证结果：** _待填写（通过 / 失败）_
- **备注：** _待填写_

---

## 🚨 异常处理

### 场景 1：Worktree 测试失败
**处理流程：**
1. Master Agent 标记该 worktree 状态为"测试失败"
2. 通知对应 worktree agent 修复
3. 其他 worktree 继续合并流程（不阻塞）
4. 修复完成后重新进入合并队列

### 场景 2：合并后回归测试失败
**处理流程：**
1. Master Agent 立即回滚合并：`git reset --hard HEAD~1`
2. 标记该 worktree 状态为"合并失败"
3. 通知对应 worktree agent 分析原因
4. 在 worktree 中修复后重新合并

### 场景 3：合并冲突无法自动解决
**处理流程：**
1. Master Agent 记录冲突文件和冲突内容
2. 通知相关 worktree agents 协商解决方案
3. 手动解决冲突后继续合并
4. 将冲突解决方案记录到 `tasks/lessons.md`

### 场景 4：Worktree 长时间未完成
**处理流程：**
1. Master Agent 检测到 worktree 超时（预估工时 * 1.5）
2. 通知对应 worktree agent 报告进度
3. 评估是否需要拆分任务或调整优先级
4. 其他 worktree 继续正常流程

---

## 📊 整体进度监控

### 进度计算公式
```
总进度 = (已合并 worktree 数 / 总 worktree 数) * 100%

注：Worktree D 算作 2 个单元（D1+D2 为 1 个，E 为 1 个）
总 worktree 数 = 5（A, B, C, D-Phase1+2, D-Phase3）
```

### 当前进度
- **已完成：** 0 / 5
- **进度百分比：** 0%
- **预计完成时间：** _待计算_

---

## 🎯 最终验收标准

所有 worktree 合并完成后，Master Agent 执行最终验收：

- [ ] 所有 5 个 worktree 状态为"已合并"
- [ ] 全量回归测试通过
- [ ] 手工验证完整游戏流程（从登录到存档）
- [ ] 所有备份文件已归档
- [ ] 所有 worktree 已清理（`git worktree list` 仅显示 main）
- [ ] 文档已更新（本文档 + 各 worktree 计划文档）
- [ ] 历史教训已记录到 `tasks/lessons.md`

---

## 📝 Master Agent 操作日志

_Master Agent 在此记录关键操作和决策_

### 2026-03-04
- 创建主分支合并控制文档
- 初始化 4 个 worktree 状态为"待开始"

<!-- Master Agent 追加日志到此处 -->
