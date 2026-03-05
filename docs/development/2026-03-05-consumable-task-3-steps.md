# Task-3: 消耗品 UI + 配置 + 集成测试 - 实施步骤

> 生成日期：2026-03-05
> Worktree: task-3
> 分支: feat/consumable-ui
> 依赖: task-1 (feat/consumable-input), task-2 (feat/consumable-effects)

---

## 任务概述

### 目标
实现消耗品系统的 UI 显示、配置加载和集成测试，确保与 task-1（长按检测+装备槽）和 task-2（Debuff+粒子）协同工作。

### 依赖关系
- **依赖 task-1**：需要 `equipConsumable()` 和 `useEquippedConsumable()` 函数
- **依赖 task-2**：需要 `Enemy.addDebuff()` 和粒子系统扩展
- **执行顺序**：必须在 task-1 和 task-2 合并后执行

### 核心功能
1. 创建消耗品配置文件（`config/consumables.json`）
2. 实现配置加载机制（`01-config.js` + `17-bootstrap.js`）
3. 实现消耗品槽 UI 更新函数（`10-ui.js`）
4. 添加 UI 元素和样式（`Game.html`）
5. 扩展 `useInventoryItem` 支持 debuff（`13-game-loop.js`）
6. 集成测试确认三个 task 协同工作

### 改动量
- 预估：~160 行
- 分布：
  - `config/consumables.json`（新建）：~80 行
  - `01-config.js`：~10 行
  - `17-bootstrap.js`：~15 行
  - `13-game-loop.js`：~15 行
  - `10-ui.js`：~40 行
  - `Game.html`：~60 行（CSS + DOM）

---

## 涉及文件

| 文件 | 操作 | 说明 |
|------|------|------|
| `config/consumables.json` | 新建 | 消耗品配置（特效参数） |
| `src/modules/01-config.js` | 修改 | 定义 CONSUMABLES_CONFIG 全局变量 |
| `src/modules/17-bootstrap.js` | 修改 | 加载 consumables.json 配置 |
| `src/modules/13-game-loop.js` | 修改 | 扩展 useInventoryItem 支持 debuff |
| `src/modules/10-ui.js` | 修改 | 消耗品槽 UI 更新函数 |
| `Game.html` | 修改 | 进度条元素 + 消耗品槽 DOM + CSS |

---

## 实施步骤

### Step 1: 创建消耗品配置文件

**文件**: `config/consumables.json`（新建）

**说明**: 定义所有消耗品的特效参数，包括炸药、末影珍珠、雪球、岩浆桶。

**完整代码**:
```json
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
  },
  "snowball": {
    "name": "雪球",
    "icon": "⚪",
    "effect": {
      "type": "projectile",
      "radius": 100,
      "damage": 5,
      "debuff": {
        "type": "slow",
        "duration": 120,
        "speedMult": 0.5
      },
      "particles": {
        "type": "snow",
        "count": 15,
        "color": ["#FFFFFF", "#E0F7FA"]
      }
    }
  },
  "lava_bucket": {
    "name": "岩浆桶",
    "icon": "🪣",
    "effect": {
      "type": "area_hazard",
      "width": 96,
      "height": 96,
      "duration": 300,
      "debuff": {
        "type": "burn",
        "duration": 180,
        "damagePerSecond": 0.15
      },
      "particles": {
        "type": "lava",
        "count": 25,
        "color": ["#FF4500", "#FF8C00"]
      }
    }
  }
}
```

---

### Step 2: 定义全局配置变量

**文件**: `src/modules/01-config.js`

**说明**: 在全局配置中添加 `CONSUMABLES_CONFIG` 和 `equippedConsumable` 变量定义。

**修改位置**: 在文件末尾，现有全局变量定义之后添加。

**完整代码**:
```javascript
// ============================================
// 消耗品系统全局变量（新增）
// ============================================

// 消耗品配置（从 config/consumables.json 加载）
let CONSUMABLES_CONFIG = {};

// 当前装备的消耗品状态
let equippedConsumable = {
  itemKey: null,      // 当前装备的材料 key（如 "gunpowder"）
  count: 0,           // 剩余数量
  icon: null          // 图标 emoji
};
```

---

### Step 3: 实现配置加载机制

**文件**: `src/modules/17-bootstrap.js`

**说明**: 在游戏初始化时加载 `consumables.json` 配置，提供默认配置 fallback。

**修改位置**: 在现有配置加载函数之后添加新函数，并在 bootstrap 初始化流程中调用。

**完整代码**:
```javascript
// ============================================
// 消耗品配置加载（新增）
// ============================================

/**
 * 加载消耗品配置
 */
async function loadConsumablesConfig() {
  try {
    const response = await fetch('config/consumables.json');
    if (!response.ok) {
      console.warn('Failed to load consumables.json, using defaults');
      CONSUMABLES_CONFIG = getDefaultConsumablesConfig();
      return;
    }
    CONSUMABLES_CONFIG = await response.json();
    console.log('✅ Consumables config loaded:', Object.keys(CONSUMABLES_CONFIG).length, 'items');
  } catch (error) {
    console.warn('Error loading consumables.json:', error);
    CONSUMABLES_CONFIG = getDefaultConsumablesConfig();
  }
}

/**
 * 默认消耗品配置（fallback）
 */
function getDefaultConsumablesConfig() {
  return {
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
        }
      }
    },
    "ender_pearl": {
      "name": "末影珍珠",
      "icon": "🔮",
      "effect": {
        "type": "teleport",
        "range": 250
      }
    },
    "snowball": {
      "name": "雪球",
      "icon": "⚪",
      "effect": {
        "type": "projectile",
        "radius": 100,
        "damage": 5,
        "debuff": {
          "type": "slow",
          "duration": 120,
          "speedMult": 0.5
        }
      }
    },
    "lava_bucket": {
      "name": "岩浆桶",
      "icon": "🪣",
      "effect": {
        "type": "area_hazard",
        "width": 96,
        "height": 96,
        "duration": 300,
        "debuff": {
          "type": "burn",
          "duration": 180,
          "damagePerSecond": 0.15
        }
      }
    }
  };
}

// ============================================
// 修改现有 bootstrap 初始化流程
// ============================================

// 在现有的配置加载之后添加（找到类似 await loadGameConfig() 的位置）
// 添加以下调用：
await loadConsumablesConfig();
```

---

### Step 4: 扩展物品使用逻辑支持 Debuff

**文件**: `src/modules/13-game-loop.js`

**说明**: 扩展现有的 `useInventoryItem` 函数，根据配置对范围内敌人应用 debuff。

**修改位置**: 在 `useInventoryItem` 函数末尾添加 debuff 应用逻辑。

**完整代码**:
```javascript
// 在 useInventoryItem 函数末尾添加以下代码
// （保留现有的炸药、末影珍珠等逻辑，只在末尾追加）

function useInventoryItem(itemKey) {
  // ... 现有逻辑（炸药爆炸、末影珍珠传送等）...

  // ============================================
  // 新增：根据配置应用 Debuff（新增）
  // ============================================
  const config = CONSUMABLES_CONFIG[itemKey];
  if (config && config.effect && config.effect.debuff) {
    const debuff = config.effect.debuff;
    const effectRadius = config.effect.radius || 150;

    // 对范围内敌人应用 debuff
    enemies.forEach(enemy => {
      const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
      if (dist < effectRadius) {
        enemy.addDebuff(
          debuff.type,
          debuff.duration,
          {
            damagePerFrame: debuff.damagePerSecond ? debuff.damagePerSecond / 60 : 0,
            speedMult: debuff.speedMult || 1.0
          }
        );
      }
    });
  }
}
```

---

### Step 5: 实现消耗品槽 UI 更新函数

**文件**: `src/modules/10-ui.js`

**说明**: 添加 `updateConsumableUI` 函数，根据 `equippedConsumable` 状态更新 UI 显示。

**修改位置**: 在文件末尾添加新函数。

**完整代码**:
```javascript
// ============================================
// 消耗品槽 UI 更新（新增）
// ============================================

/**
 * 更新消耗品槽 UI 显示
 */
function updateConsumableUI() {
  const statusEl = document.getElementById("consumable-status");
  const iconEl = document.getElementById("consumable-icon");
  const nameEl = document.getElementById("consumable-name");
  const countEl = document.getElementById("consumable-count");

  // 未装备消耗品时隐藏
  if (!equippedConsumable.itemKey) {
    if (statusEl) {
      statusEl.style.display = "none";
      statusEl.classList.remove("active");
    }
    return;
  }

  // 获取配置
  const config = CONSUMABLES_CONFIG[equippedConsumable.itemKey];
  if (!config) {
    console.warn('Unknown consumable:', equippedConsumable.itemKey);
    return;
  }

  // 更新 UI 元素
  if (statusEl) {
    statusEl.style.display = "block";
    statusEl.classList.add("active");
  }
  if (iconEl) iconEl.innerText = config.icon;
  if (nameEl) nameEl.innerText = config.name;
  if (countEl) countEl.innerText = `x${equippedConsumable.count}`;
}
```

---

### Step 6: 添加 UI 元素和样式

**文件**: `Game.html`

**说明**: 添加消耗品槽 DOM 元素、长按进度条元素和相关 CSS 样式。

**修改位置 1**: 在 `<style>` 标签内添加 CSS（找到现有的 `.hud-box` 样式附近）

**完整代码（CSS 部分）**:
```css
/* ============================================
   消耗品系统样式（新增）
   ============================================ */

/* 长按进度条动画 */
@keyframes hold-fill {
  from {
    background: conic-gradient(#4CAF50 0deg, transparent 0deg);
  }
  to {
    background: conic-gradient(#4CAF50 360deg, transparent 360deg);
  }
}

.hold-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.6;
  pointer-events: none;
  display: none;
  z-index: 1;
}

/* 消耗品槽样式 */
#consumable-status {
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #FFD700;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 16px;
  color: white;
  display: none;
  margin-top: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  white-space: nowrap;
}

#consumable-status.active {
  border-color: #4CAF50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(76, 175, 80, 0.8);
  }
}

#consumable-icon {
  font-size: 20px;
  margin-right: 6px;
}

#consumable-name {
  margin-right: 8px;
}

#consumable-count {
  color: #FFD700;
  font-weight: bold;
}
```

**修改位置 2**: 在 HUD 右侧区域添加消耗品槽元素（找到 `.hud-right` 或 `#equip-status`）

**完整代码（DOM 部分）**:
```html
<!-- 在 .hud-right 区域内，#equip-status 下方添加 -->
<div class="hud-right">
  <div class="hud-box" id="equip-status">⚔️ 剑</div>

  <!-- 消耗品槽（新增） -->
  <div class="hud-box" id="consumable-status">
    <span id="consumable-icon">💣</span>
    <span id="consumable-name">炸药</span>
    <span id="consumable-count">x3</span>
  </div>
</div>
```

**修改位置 3**: 在攻击按钮内添加进度条元素（找到 `#btn-attack`）

**完整代码（进度条部分）**:
```html
<!-- 修改现有的攻击按钮，添加进度条子元素 -->
<button class="touch-btn" id="btn-attack" data-action="attack">
  🗡️
  <div class="hold-progress"></div>
</button>
```

---

## 验收标准

### 功能验收

#### 1. 配置加载
- [ ] 游戏启动时成功加载 `consumables.json`
- [ ] 配置加载失败时使用默认配置（控制台显示警告）
- [ ] `CONSUMABLES_CONFIG` 包含 4 个消耗品（gunpowder, ender_pearl, snowball, lava_bucket）

#### 2. UI 显示
- [ ] 未装备消耗品时，消耗品槽隐藏
- [ ] 装备消耗品后，消耗品槽显示正确的图标、名称和数量
- [ ] 消耗品槽有绿色边框和发光效果
- [ ] 长按攻击按钮时显示圆形进度条动画

#### 3. 集成测试（依赖 task-1 和 task-2）
- [ ] 选择背包材料后，调用 `equipConsumable()` 成功装备
- [ ] 短按攻击按钮：正常攻击（task-1 功能）
- [ ] 长按攻击按钮 800ms：触发 `useEquippedConsumable()`
- [ ] 使用炸药：敌人受到燃烧 debuff（task-2 功能）
- [ ] 使用雪球：敌人受到减速 debuff（task-2 功能）
- [ ] 使用后消耗品数量减少，UI 同步更新
- [ ] 消耗品用完后自动卸载，UI 隐藏

#### 4. Debuff 应用
- [ ] 炸药：范围内敌人燃烧 3 秒（180 帧），每秒损失 10% HP
- [ ] 雪球：范围内敌人减速 50%，持续 2 秒（120 帧）
- [ ] 岩浆桶：范围内敌人燃烧 3 秒，伤害更高（15% HP/秒）
- [ ] 同类型 debuff 不叠加，刷新持续时间

### 性能验收
- [ ] 配置加载时间 < 100ms
- [ ] UI 更新不影响帧率（保持 ≥ 55 FPS）
- [ ] 无内存泄漏（长时间游戏后内存稳定）

### 兼容性验收
- [ ] 不影响现有武器攻击逻辑
- [ ] 不影响现有背包功能
- [ ] 移动端触摸长按正常工作
- [ ] 桌面端鼠标长按正常工作

---

## 测试步骤

### 1. 配置加载测试
```bash
# 启动游戏，打开浏览器控制台
# 检查是否有 "✅ Consumables config loaded: 4 items" 日志
# 在控制台输入：
console.log(CONSUMABLES_CONFIG);
# 应该显示 4 个消耗品配置
```

### 2. UI 显示测试
```javascript
// 在控制台手动装备消耗品
equipConsumable('gunpowder');
// 检查消耗品槽是否显示 "💣 炸药 x[数量]"

// 手动卸载
equippedConsumable = { itemKey: null, count: 0, icon: null };
updateConsumableUI();
// 检查消耗品槽是否隐藏
```

### 3. 长按进度条测试
```
1. 进入游戏
2. 长按攻击按钮（不松开）
3. 观察按钮内是否出现绿色圆形进度条
4. 进度条应在 800ms 内从 0° 填充到 360°
5. 松开按钮，进度条应立即消失
```

### 4. 集成测试（需要 task-1 和 task-2 合并后）
```
1. 打开背包，选择炸药
2. 检查消耗品槽显示 "💣 炸药 x[数量]"
3. 短按攻击按钮 → 应该正常攻击（挥剑）
4. 长按攻击按钮 800ms → 应该使用炸药
5. 检查：
   - 炸药数量减 1
   - 范围内敌人受到伤害
   - 敌人身上出现火焰粒子（燃烧效果）
   - 敌人 HP 持续下降 3 秒
6. 重复测试雪球（减速效果）
```

### 5. Debuff 叠加测试
```
1. 对同一敌人连续使用 2 次炸药
2. 检查敌人只有 1 个燃烧 debuff（不叠加）
3. 第二次使用应刷新持续时间
4. 在控制台查看：
   console.log(enemies[0].debuffs);
   // 应该只有 1 个 burn debuff
```

---

## 注意事项

### 1. 依赖顺序
- **必须先合并 task-1 和 task-2**，再开始 task-3 开发
- task-3 依赖的函数：
  - `equipConsumable()` (task-1)
  - `useEquippedConsumable()` (task-1)
  - `Enemy.addDebuff()` (task-2)
  - `EmberParticle` 类 (task-2)

### 2. 全局变量作用域
- `equippedConsumable` 在 `01-config.js` 中定义，所有模块可访问
- `CONSUMABLES_CONFIG` 在 `17-bootstrap.js` 中加载，游戏启动后可用
- 不要在其他模块中重复定义这些变量

### 3. 配置文件路径
- 确保 `config/consumables.json` 路径正确
- 如果使用相对路径，注意 `Game.html` 的位置
- 提供默认配置 fallback，避免加载失败导致游戏崩溃

### 4. UI 元素定位
- 消耗品槽在 `.hud-right` 区域，`#equip-status` 下方
- 使用 `margin-top: 8px` 与装备槽保持间距
- 进度条在 `#btn-attack` 内部，使用绝对定位覆盖按钮

### 5. CSS 动画性能
- 使用 `conic-gradient` 实现圆形进度条
- 使用 CSS animation 而非 JavaScript 动画（性能更好）
- 进度条隐藏时设置 `display: none` 避免不必要的渲染

---

## 回滚方案

如果集成测试失败，按以下顺序回滚：

1. **检查依赖**：确认 task-1 和 task-2 已正确合并
2. **检查配置**：确认 `consumables.json` 加载成功
3. **检查全局变量**：确认 `equippedConsumable` 和 `CONSUMABLES_CONFIG` 可访问
4. **逐步测试**：
   - 先测试配置加载
   - 再测试 UI 显示
   - 最后测试集成功能
5. **完全回滚**：如果无法修复，执行 `git reset --hard HEAD~1`

---

## 完成标志

- [ ] 所有文件修改完成
- [ ] 配置加载测试通过
- [ ] UI 显示测试通过
- [ ] 长按进度条测试通过
- [ ] 集成测试通过（与 task-1 和 task-2 协同）
- [ ] Debuff 应用测试通过
- [ ] 性能验收通过
- [ ] 代码审查通过（两轮 Review）
- [ ] 提交 commit：`feat: add consumable UI and config system`

---

## 相关文档

- Plan 文档：`docs/plan/plan-2026-03-05-inventory-item-usage.md`
- Task-1 文档：`docs/development/2026-03-05-consumable-task-1-steps.md`
- Task-2 文档：`docs/development/2026-03-05-consumable-task-2-steps.md`
- 审查报告：`docs/plan/plan-2026-03-05-inventory-item-usage-review.md`
