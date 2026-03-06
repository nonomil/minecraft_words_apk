# 末影龙召唤系统 + 火药增强 Plan 方案

> 生成日期：2026-03-06
> 状态：草稿

## 流程进度
- [ ] Phase 1：Plan 文档生成，用户确认内容
- [ ] Phase 2：Codex 工程审查完成，用户确认采纳意见
- [ ] Phase 3：交叉 Review 收敛，用户确认定稿
- [ ] Phase 4：各 worktree 独立 steps 文档生成，用户确认
- [ ] Phase 4.5：解耦审查通过，用户确认
- [ ] Phase 6：用户说"开始开发"，进入执行阶段

## 需求理解

### 功能1：末影龙召唤系统
- 龙蛋从BOSS宝箱掉落（稀有道具）
- 使用龙蛋召唤末影龙（一次性消耗品）
- 同时只能存在1只末影龙
- 玩家跳到龙身上自动骑乘
- 骑乘时可用WASD/屏幕按键控制飞行
- 玩家按键触发火球攻击
- 末影龙血量30点，耗尽后消失
- 骑乘时玩家可被攻击（非无敌）

### 功能2：火药效果增强
- 当前：小范围爆炸 + 燃烧debuff
- 目标：保留爆炸伤害，增加大范围地面火焰效果
- 范围：前方200px，宽度100px，持续3秒

### 排除项
- 不实现末影龙的复杂AI（如自动追击、躲避）
- 不实现多只末影龙同时存在
- 不实现龙蛋的合成/升级系统

## 技术方案

### 方案选择

**方案A：基于现有 Golem 系统扩展**（选定）
- 优点：复用 SnowGolem 的 faction 机制、投射物系统、AI框架
- 优点：与现有战斗系统兼容性好
- 缺点：需要新增骑乘系统（现有代码库无此功能）

**方案B：独立实现末影龙系统**
- 优点：不受现有系统约束，灵活度高
- 缺点：需要重新实现碰撞检测、faction判定、投射物交互
- 缺点：代码重复，维护成本高
- **不采纳**

**方案C：将末影龙作为"可控制的敌人"**
- 优点：复用敌人的渲染和物理系统
- 缺点：faction 逻辑混乱（敌人攻击敌人）
- 缺点：与现有敌人生成逻辑冲突
- **不采纳**

### 选定方案详述

#### 架构设计

```
玩家使用龙蛋 (consumables.json)
    ↓
触发召唤逻辑 (13-game-loop.js)
    ↓
创建 EnderDragon 实例 (15-entities-combat.js)
    ↓
加入 golemList（复用傀儡管理）
    ↓
玩家碰撞检测 → 进入骑乘状态
    ↓
骑乘状态下：
  - 玩家位置跟随末影龙
  - WASD 控制末影龙移动
  - 攻击键触发火球发射
    ↓
末影龙血量耗尽 → 自动下龙 → 移除实例
```

#### 关键设计决策

**1. 末影龙类继承关系**
```javascript
class EnderDragon extends Entity {
  // 继承基础实体属性
  // 新增：rideable（可骑乘）、rider（当前骑手）、fireballCooldown
}
```

**2. 骑乘状态管理**
```javascript
// 全局状态（13-game-loop.js）
let ridingDragon = null; // 当前骑乘的末影龙引用

// 每帧更新
if (ridingDragon) {
  player.x = ridingDragon.x;
  player.y = ridingDragon.y - ridingDragon.height;
  player.velX = 0;
  player.velY = 0;
  player.grounded = false; // 禁用重力
}
```

**3. 火球发射机制**
```javascript
// 复用现有 DragonFireball 类，修改 faction
class EnderDragonFireball extends Projectile {
  constructor(x, y, targetX, targetY) {
    super(x, y, targetX, targetY, 3, "player"); // faction: player
    this.damage = 25;
    this.aoeRadius = 30; // AOE 效果
  }
}
```

**4. 火药效果增强**
```javascript
// 04-weapons.js 中修改 gunpowder 使用逻辑
function useGunpowder() {
  // 保留原有爆炸伤害
  dealExplosionDamage(player.x, player.y, 150, 30);

  // 新增：生成地面火焰区域
  createGroundFire(
    player.x,
    player.y,
    200,  // 前方范围
    100,  // 宽度
    180   // 持续帧数
  );
}
```

#### 数据流

```
龙蛋使用流程：
inventory.dragonEgg-- → spawnEnderDragon() → golemList.push(dragon)

骑乘流程：
player碰撞dragon → ridingDragon = dragon → 每帧同步位置

火球发射流程：
按键触发 → dragon.shootFireball() → projectileList.push(fireball)

末影龙死亡流程：
dragon.hp <= 0 → ridingDragon = null → dragon.remove = true
```

### 涉及文件

| 文件 | 操作 | 说明 | 预估行数 |
|------|------|------|---------|
| `src/modules/15-entities-combat.js` | 修改 | 新增 EnderDragon 类、EnderDragonFireball 类 | +120 |
| `src/modules/13-game-loop.js` | 修改 | 骑乘状态管理、龙蛋使用逻辑、碰撞检测 | +80 |
| `src/modules/04-weapons.js` | 修改 | 火药效果增强（地面火焰） | +50 |
| `config/consumables.json` | 修改 | 更新龙蛋配置（type: summon_dragon） | +5 |
| `src/modules/10-ui.js` | 修改（可选） | 骑乘状态UI提示 | +20 |

**总计：~275 行**

## Worktree 并行计划

由于涉及文件有交叉依赖（13-game-loop.js 需要调用 15-entities-combat.js 的新类），建议拆分为2个串行任务：

| Worktree | 分支 | 任务 | 依赖 | 预估行数 |
|----------|------|------|------|---------|
| task-1-dragon-entity | feat/summon-dragon-entity | 实现 EnderDragon 和 EnderDragonFireball 类 | 无 | ~120 |
| task-2-integration | feat/summon-dragon-integration | 骑乘逻辑、火药增强、配置更新 | task-1 | ~155 |

**依赖关系**：task-2 需要 task-1 的 EnderDragon 类定义

## 风险点

| 风险 | 概率 | 影响 | 缓解方案 |
|------|------|------|----------|
| 骑乘状态下玩家碰撞检测异常 | 中 | 高 | 骑乘时禁用玩家的地面碰撞，只保留敌人伤害判定 |
| 末影龙飞出屏幕边界 | 中 | 中 | 限制飞行范围在 camera 视野内 |
| 火球 AOE 伤害误伤玩家 | 低 | 中 | faction 设为 "player"，跳过玩家碰撞检测 |
| 大范围火焰粒子影响性能 | 中 | 中 | 限制同时存在的火焰粒子数量（最多50个） |
| 末影龙与现有傀儡冲突 | 低 | 低 | 使用独立的 dragonList 管理，或在 golemList 中标记 type |

## 待确认问题

- [ ] 末影龙的视觉表现？（颜色、尺寸、图标）
- [ ] 是否需要飞行音效和火球音效？
- [ ] 骑乘状态下是否显示特殊UI（如"按X下龙"提示）？
- [ ] 火焰粒子的视觉效果？（颜色、动画）

## 验收标准

### 功能验收
- [ ] 使用龙蛋可成功召唤末影龙
- [ ] 跳到末影龙身上自动进入骑乘状态
- [ ] 骑乘时可用WASD控制飞行方向
- [ ] 按攻击键可发射火球
- [ ] 火球命中敌人造成25点伤害 + AOE效果
- [ ] 末影龙血量耗尽后自动消失，玩家安全落地
- [ ] 同时只能存在1只末影龙
- [ ] 火药使用后前方地面大范围起火

### 技术验收
- [ ] 末影龙的 faction 为 "golem"，不攻击玩家
- [ ] 火球的 faction 为 "player"，不伤害玩家和其他傀儡
- [ ] 骑乘时玩家位置正确同步
- [ ] 末影龙不会飞出屏幕边界
- [ ] 火焰粒子数量控制在合理范围，不影响性能

### 兼容性验收
- [ ] 不影响现有雪傀儡系统
- [ ] 不影响现有投射物系统
- [ ] 不影响现有敌人AI
- [ ] 不影响其他消耗品功能

## 已知权衡

暂无（等待 Phase 2 Codex 审查）

## 实施顺序

1. **Task 1**：实现 EnderDragon 和 EnderDragonFireball 类
   - 定义类结构
   - 实现基础移动和攻击逻辑
   - 实现血量管理和死亡逻辑

2. **Task 2**：集成骑乘系统和火药增强
   - 实现骑乘状态管理
   - 实现龙蛋使用逻辑
   - 实现火药地面火焰效果
   - 更新配置文件

3. **测试与调优**
   - 测试骑乘流畅度
   - 测试火球伤害和AOE
   - 测试性能（火焰粒子）
   - 边界情况测试（末影龙死亡时玩家状态）

## 预估工作量

- Task 1：2-3小时（实体类实现）
- Task 2：3-4小时（集成和测试）
- 总计：5-7小时

---

**Phase 1 完成，等待用户确认 Plan 内容。**
