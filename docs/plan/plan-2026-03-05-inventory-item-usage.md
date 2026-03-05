# 背包材料使用机制优化 - 实施计划

> 生成日期：2026-03-05
> 状态：Phase 1 - 草稿待审查

## 流程进度
- [x] Phase 0：需求澄清与技术决策
- [x] Phase 1：Plan 文档生成，用户确认内容
- [x] Phase 2：Codex 工程审查完成（见 `plan-2026-03-05-inventory-item-usage-review.md`）
- [ ] Phase 2.1：根据审查意见修改 Plan
- [ ] Phase 3：交叉 Review 收敛，用户确认定稿
- [ ] Phase 4：各 worktree 独立 steps 文档生成，用户确认
- [ ] Phase 4.5：解耦审查通过，用户确认
- [ ] Phase 6：用户说"开始开发"，进入执行阶段

---

## 需求理解

### 核心需求
1. **使用触发机制变更**：背包材料（炸药、末影珍珠等）选择后不立即使用，需长按武器按钮触发
2. **特效系统增强**：为材料使用添加视觉特效（火焰、粒子、减速等）

### 边界条件
- 仅影响背包材料，不影响现有武器系统
- 材料占用独立消耗品槽，不占用武器槽
- 长按检测需要视觉反馈（进度条）
- 特效需要配置化，便于后续扩展

### 排除项
- 不修改现有武器攻击逻辑
- 不改变背包 UI 布局（仅增加消耗品槽显示）
- 不涉及新材料添加（仅为现有材料添加特效）

---

## 技术方案

### 方案选择

**方案 A：独立消耗品系统（选定）**
- 优点：与武器系统解耦，易于扩展，不影响现有逻辑
- 缺点：需要新增状态管理
- 选择理由：符合单一职责原则，降低回归风险

**方案 B：扩展武器系统**
- 优点：复用现有代码
- 缺点：武器系统已复杂，增加耦合度
- 不选理由：违反开闭原则，回归风险高

**方案 C：统一物品使用系统**
- 优点：架构最优
- 缺点：需要大规模重构
- 不选理由：改动量超过 200 行限制

### 选定方案详述

#### 架构设计（已根据审查意见修改）
```
┌─────────────────────────────────────────────────┐
│                  Game Loop                      │
│              (13-game-loop.js)                  │
└────────────┬────────────────────────────────────┘
             │
             ├─→ 16-events.js (扩展触摸控制)
             │   - bindTapOrHold("attack", onTap, onHold, 800)
             │   - 短按：handleAttack("tap")
             │   - 长按：useEquippedConsumable()
             │
             ├─→ 13-game-loop.js (扩展现有逻辑)
             │   - equippedConsumable 状态管理
             │   - 重构 useInventoryItem 支持装备槽
             │   - 复用现有炸药/末影珍珠逻辑
             │
             ├─→ 15-entities-particles.js (扩展粒子系统)
             │   - 粒子池复用机制
             │   - 新增火焰/传送粒子类
             │
             └─→ 15-entities-combat.js (扩展 Enemy 类)
                 - Enemy.debuffs 数组
                 - Enemy.updateDebuffs() 方法
                 - Enemy.addDebuff(type, duration, params)
```

#### 数据流
1. **装备流程**：背包选择材料 → 装备到消耗品槽 → UI 显示
2. **使用流程**：长按武器按钮 → 检测消耗品槽 → 扣除数量 → 触发特效 → 更新 UI
3. **特效流程**：使用材料 → 查询特效配置 → 生成粒子/debuff → 渲染/更新

#### 关键设计决策

**1. 长按检测机制**
- 阈值：800ms
- 实现：在 input handler 中记录按下时间戳，每帧检查
- 视觉反馈：武器按钮显示圆形进度条（CSS animation）

**2. 消耗品槽设计**
```javascript
// 新增全局状态
let equippedConsumable = {
  itemKey: null,      // 当前装备的材料 key（如 "gunpowder"）
  count: 0,           // 剩余数量
  icon: null          // 图标 emoji
};
```

**3. 特效配置化**
```json
// config/consumables.json (新建)
{
  "gunpowder": {
    "name": "炸药",
    "icon": "💣",
    "effect": {
      "type": "explosion",
      "radius": 150,
      "damage": 30,
      "debuff": {
        "type": "burn",
        "duration": 180,
        "damagePerSecond": 0.1
      },
      "particles": {
        "type": "fire",
        "count": 20,
        "color": ["#FF4500", "#FF6347"]
      }
    }
  },
  "ender_pearl": {
    "name": "末影珍珠",
    "icon": "🔮",
    "effect": {
      "type": "teleport",
      "range": 250,
      "particles": {
        "type": "sparkle",
        "count": 30,
        "color": ["#9B59B6", "#8E44AD"]
      }
    }
  }
}
```

**4. Debuff 系统**
```javascript
// 敌人新增状态
enemy.debuffs = [
  {
    type: "burn",
    duration: 180,      // 剩余帧数
    damagePerFrame: 0.033,  // 每帧伤害（10% HP / 3秒 / 60fps）
    particleTimer: 0
  }
];
```

---

## 涉及文件（已根据审查意见修正）

| 文件 | 操作 | 说明 | 预估行数 |
|------|------|------|---------|
| `config/consumables.json` | 新建 | 消耗品配置（特效参数） | ~80 |
| `src/modules/13-game-loop.js` | 修改 | 装备槽逻辑 + 长按检测集成 | ~80 |
| `src/modules/16-events.js` | 修改 | 扩展触摸控制（bindTapOrHold） | ~80 |
| `src/modules/15-entities-combat.js` | 修改 | Enemy debuff 系统 | ~40 |
| `src/modules/15-entities-particles.js` | 修改 | 粒子池 + 新粒子类 | ~60 |
| `src/modules/10-ui.js` | 修改 | 消耗品槽 UI + 长按进度条 | ~70 |
| `Game.html` | 修改 | 进度条元素 + 消耗品槽 DOM | ~10 |
| **总计** | - | - | **~420 行** |

**关键变更**：
- ❌ 删除 `24-consumables.js` 和 `25-effects.js`（复用现有逻辑）
- ✅ 扩展 `16-events.js` 支持长按检测
- ✅ 改动量从 535 行降至 420 行（减少 21%）

---

## Worktree 并行计划（已根据审查意见修正）

由于总改动量 ~420 行，超过 200 行限制，需拆分为 3 个独立任务：

| Worktree | 分支 | 任务 | 依赖 | 预估行数 | Steps 文档 |
|----------|------|------|------|---------|-----------|
| task-1 | feat/consumable-input | 长按检测 + 装备槽状态 | 无 | ~160 | docs/development/2026-03-05-consumable-task-1-steps.md |
| task-2 | feat/consumable-effects | Debuff 系统 + 粒子扩展 | 无 | ~140 | docs/development/2026-03-05-consumable-task-2-steps.md |
| task-3 | feat/consumable-ui | UI + 配置 + 集成测试 | task-1, task-2 | ~120 | docs/development/2026-03-05-consumable-task-3-steps.md |

**并行策略**：
- task-1 和 task-2 可并行开发（无文件重叠）
  - task-1：修改 `16-events.js` + `13-game-loop.js`（装备槽部分）
  - task-2：修改 `15-entities-combat.js` + `15-entities-particles.js`
- task-3 串行依赖前两者（需要集成接口）
  - task-3：修改 `10-ui.js` + `Game.html` + 新建 `config/consumables.json`

**文件改动矩阵**（验证无冲突）：
| 文件 | task-1 | task-2 | task-3 |
|------|--------|--------|--------|
| `16-events.js` | ✅ | - | - |
| `13-game-loop.js` | ✅ | - | - |
| `15-entities-combat.js` | - | ✅ | - |
| `15-entities-particles.js` | - | ✅ | - |
| `10-ui.js` | - | - | ✅ |
| `Game.html` | - | - | ✅ |
| `config/consumables.json` | - | - ✅ (新建) |

---

## 风险点

| 风险 | 概率 | 影响 | 缓解方案 |
|------|------|------|----------|
| 长按检测与现有输入冲突 | 中 | 高 | 在 input handler 中增加状态机，区分短按/长按 |
| 特效性能影响（大量粒子） | 中 | 中 | 粒子池复用，限制同屏粒子数量（<100） |
| Debuff 系统与现有伤害逻辑冲突 | 低 | 高 | 独立 debuff 更新函数，在敌人 update 中调用 |
| 配置文件加载失败 | 低 | 中 | 提供默认配置 fallback |
| 消耗品槽 UI 与现有 HUD 重叠 | 低 | 低 | 使用绝对定位，避开现有元素 |

---

## 待确认问题

- [x] 长按时长阈值（已定：800ms）
- [x] 材料清单（已定：炸药、末影珍珠、雪球、岩浆桶）
- [x] 特效参数（已定：见配置设计）
- [ ] 是否需要音效？（建议：炸药爆炸音、传送音）
- [ ] 是否需要长按取消机制？（建议：松开按钮时若未达到阈值则取消）

---

## 验收标准

### 功能验收
- [ ] 选择背包材料后，显示在消耗品槽
- [ ] 短按武器按钮：正常攻击
- [ ] 长按武器按钮 800ms：触发消耗品使用
- [ ] 长按期间显示进度条
- [ ] 炸药：爆炸范围内敌人受伤并燃烧 3 秒
- [ ] 末影珍珠：玩家传送到前方 5 格
- [ ] 雪球：敌人减速 50%，持续 2 秒
- [ ] 岩浆桶：地面生成 3x3 岩浆池，持续 5 秒

### 性能验收
- [ ] 同屏粒子数 < 100
- [ ] 帧率保持 ≥ 55 FPS（在有特效时）
- [ ] 无内存泄漏（长时间游戏后内存稳定）

### 兼容性验收
- [ ] 不影响现有武器攻击
- [ ] 不影响现有背包功能
- [ ] 移动端触摸长按正常工作

---

## 已知权衡（CC vs Codex 分歧）

| 分歧点 | CC 观点 | Codex 观点 | 决策 | 理由 |
|--------|---------|------------|------|------|
| （待 Phase 2 审查后填写） | - | - | - | - |

---

## 下一步

等待用户确认 Plan 内容，然后进入 Phase 2（Codex 工程审查）。
