# Worktree C：PWA 基础设施 - 执行计划

> **负责 Agent：** Worktree-C Agent
> **分支名称：** `feature/parallel-pwa`
> **Worktree 路径：** `../worktree-C/`
> **创建时间：** 2026-03-04
> **最后更新：** 2026-03-04
> **当前状态：** `待开始` ← Worktree-C Agent 更新此字段

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

完成 PWA 基础设施的 2 个功能：
1. vC-Task3: 补齐 SW 注册
2. vC-Task4: 版本化缓存策略

---

## 📂 涉及文件清单

### 主要修改文件
- `src/modules/17-bootstrap.js` - 启动流程，SW 注册
- `service-worker.js` - Service Worker 实现
- `version.json` - 版本号配置（可能需要新建）

### 只读参考文件
- `manifest.json` - PWA 配置
- `src/modules/02-utils.js` - 工具函数

### 测试文件
- `tests/e2e/specs/opt-0226-task7-pwa.spec.mjs`

---

## ✅ 任务清单（逐项勾选）

### Task 1: 补齐 SW 注册（vC-Task3）

#### 1.1 检查现有代码
- [ ] 读取 `src/modules/17-bootstrap.js`，确认是否已有 SW 注册逻辑
- [ ] 读取 `service-worker.js`，确认文件是否存在

#### 1.2 实现 SW 注册
- [ ] 在 `17-bootstrap.js` 的启动流程中增加 SW 注册：
  ```javascript
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('SW registered:', reg))
      .catch(err => console.warn('SW registration failed:', err));
  }
  ```
- [ ] 失败只 warn，不阻塞主流程
- [ ] 注册时机：在 DOM 加载完成后，游戏初始化前

#### 1.3 创建/更新 service-worker.js
- [ ] 如文件不存在，创建基础 SW 文件
- [ ] 实现基本的 install 和 activate 事件监听
- [ ] 实现 fetch 事件监听（缓存策略在 Task 2 实现）

#### 1.4 自检
- [ ] 打开浏览器 DevTools → Application → Service Workers
- [ ] 确认 SW 被注册且状态为 "activated"
- [ ] 刷新页面，确认 SW 仍然存在

#### 1.5 提交
```bash
git add src/modules/17-bootstrap.js service-worker.js
git commit -m "feat(worktree-C): register service worker in bootstrap

- Add SW registration in bootstrap flow
- Create basic service-worker.js with install/activate/fetch handlers
- Fail gracefully if SW not supported"
```

---

### Task 2: 版本化缓存策略（vC-Task4）

#### 2.1 创建版本配置文件
- [ ] 创建 `version.json`：
  ```json
  {
    "version": "1.19.8",
    "build": "20260304"
  }
  ```
- [ ] 或从现有配置文件读取版本号

#### 2.2 实现版本化缓存
- [ ] 在 `service-worker.js` 中读取版本号
- [ ] 缓存名绑定版本号：`const CACHE_NAME = 'mmwg-v' + VERSION;`
- [ ] install 事件：预缓存核心资源
  ```javascript
  const urlsToCache = [
    '/',
    '/Game.html',
    '/src/styles.css',
    '/src/modules/01-config.js',
    // ... 其他核心文件
  ];
  ```

#### 2.3 实现缓存清理
- [ ] activate 事件：清理旧版本缓存
  ```javascript
  caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName !== CACHE_NAME) {
          return caches.delete(cacheName);
        }
      })
    );
  });
  ```

#### 2.4 实现 fetch 策略
- [ ] 采用 "Cache First, Network Fallback" 策略
- [ ] 对于 API 请求，采用 "Network First" 策略

#### 2.5 自检
- [ ] DevTools → Application → Cache Storage
- [ ] 确认缓存名包含版本号
- [ ] 修改 `version.json` 版本号，刷新页面
- [ ] 确认旧缓存被删除，新缓存被创建

#### 2.6 提交
```bash
git add service-worker.js version.json
git commit -m "feat(worktree-C): add versioned cache strategy

- Bind cache name to version number
- Pre-cache core resources in install event
- Clean old caches in activate event
- Implement cache-first fetch strategy"
```

---

## 🧪 测试与验证

### 自动化测试
```bash
# 在 worktree-C 目录内执行
cd /g/UserCode/Mario_Minecraft/mario-minecraft-game_APK_V1.19.8

# 运行相关测试
npx playwright test -c tests/e2e/playwright.config.mjs \
  tests/e2e/specs/opt-0226-task7-pwa.spec.mjs
```

**测试结果记录：**
- [ ] `opt-0226-task7-pwa.spec.mjs` - _待填写（通过/失败）_

### 手工测试清单
- [ ] DevTools 可见 SW 注册
- [ ] 缓存版本号绑定正确
- [ ] 离线模式下页面可访问（基本资源）
- [ ] 版本更新后旧缓存被清理
- [ ] 主流程无回归（进入游戏 → 暂停 → 继续 → 存档）

---

## 📦 打包与备份

### 提交策略
**重要：** 每完成一个任务就提交一次 git，但**只在所有任务完成后才打包压缩备份**。

- Task 1 完成 → git commit（标注 worktree-C 进展）
- Task 2 完成 → git commit（标注 worktree-C 进展）
- **所有任务完成** → 打包压缩备份

### 打包命令（所有任务完成后执行）
```bash
# 在 worktree-C 的父目录执行
cd /g/UserCode/Mario_Minecraft/

# 确认所有改动已提交
cd worktree-C
git status
git log --oneline -5

# 返回父目录打包
cd ..
tar -czf worktree-C-pwa-$(date +%Y%m%d-%H%M%S).tar.gz worktree-C/

# 或使用 zip（Windows）
7z a -tzip worktree-C-pwa-$(date +%Y%m%d-%H%M%S).zip worktree-C/
```

### 备份文件信息
- **文件名：** _待填写（例：worktree-C-pwa-20260304-153000.tar.gz）_
- **文件大小：** _待填写_
- **存放路径：** `docs/archive/2026-03-04-parallel-dev-backups/`
- **备份时间：** _待填写_

---

## ✅ 完成定义（DoD）

Worktree-C Agent 必须确认以下所有项才能标记为"已完成"：

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

_Worktree-C Agent 在此记录关键操作和问题_

### 2026-03-04
- 创建 Worktree C 执行计划文档

<!-- Worktree-C Agent 追加日志到此处 -->
