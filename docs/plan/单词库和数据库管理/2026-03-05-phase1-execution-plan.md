# 阶段 1 执行计划 - 紧急修复

> 生成时间：2026-03-05
> 阶段：1/4
> 预计时间：1-2 周（40 工时）

## 概述

本阶段聚焦于解决 P0 级问题，确保系统稳定运行，为后续迁移做准备。

**核心目标**：
1. 解决 LocalStorage 容量溢出问题
2. 实现基础的导入/导出功能
3. 完善错误处理和日志系统

---

## Task 1.1：LocalStorage 容量优化（3 天）

### 子任务 1.1.1：实现数据压缩（1 天）

**文件**：`src/storage.js`

**步骤**：

1. **引入 LZString 库**（已存在，确认可用）
   ```javascript
   // 检查 LZString 是否已加载
   if (typeof LZString === 'undefined') {
     console.error('LZString not loaded');
   }
   ```

2. **修改 saveJson 方法**
   ```javascript
   // 位置：src/storage.js:68-73
   // 修改前：
   saveJson(key, value) {
     try {
       window.localStorage.setItem(key, JSON.stringify(value));
     } catch {
       console.warn("Storage save failed:", key);
     }
   }

   // 修改后：
   saveJson(key, value, compress = true) {
     try {
       const jsonStr = JSON.stringify(value);
       const data = compress ? LZString.compress(jsonStr) : jsonStr;
       window.localStorage.setItem(key, data);

       // 记录压缩率
       if (compress) {
         const ratio = (data.length / jsonStr.length * 100).toFixed(1);
         console.log(`Compressed ${key}: ${ratio}%`);
       }
     } catch (e) {
       console.error("Storage save failed:", key, e);
       throw e;
     }
   }
   ```

3. **修改 loadJson 方法**
   ```javascript
   // 位置：src/storage.js:59-66
   // 修改后：
   loadJson(key, fallback) {
     try {
       const raw = window.localStorage.getItem(key);
       if (!raw) return clone(fallback);

       // 尝试解压
       let jsonStr = raw;
       if (raw[0] !== '{' && raw[0] !== '[') {
         // 可能是压缩数据
         try {
           jsonStr = LZString.decompress(raw);
         } catch {
           // 解压失败，可能是未压缩数据
         }
       }

       return JSON.parse(jsonStr);
     } catch (e) {
       console.error("Storage load failed:", key, e);
       return clone(fallback);
     }
   }
   ```

4. **测试压缩效果**
   ```javascript
   // 测试代码
   const testData = MMWG_STORAGE.getAccountList();
   const original = JSON.stringify(testData);
   const compressed = LZString.compress(original);
   console.log(`Original: ${original.length} bytes`);
   console.log(`Compressed: ${compressed.length} bytes`);
   console.log(`Ratio: ${(compressed.length / original.length * 100).toFixed(1)}%`);
   ```

**验收**：
- ✅ 压缩率 > 50%
- ✅ 加载/保存功能正常
- ✅ 兼容未压缩数据

---

### 子任务 1.1.2：清理冗余数据（1 天）

**文件**：`src/storage.js`

**步骤**：

1. **删除 wordStats 字段**
   ```javascript
   // 位置：ACCOUNT_SCHEMA
   // 删除：
   vocabulary: {
     wordStats: {},  // ← 删除此行
   }
   ```

2. **合并 learnedWords 和 packProgress.unique**
   ```javascript
   // 新增清理函数
   function cleanupAccountData(account) {
     // 1. 删除 wordStats
     if (account.vocabulary?.wordStats) {
       delete account.vocabulary.wordStats;
     }

     // 2. 从 packProgress 重建 learnedWords
     const learnedWords = new Set();
     const packProgress = account.vocabulary?.packProgress || {};

     for (const [packId, progress] of Object.entries(packProgress)) {
       const unique = progress.unique || {};
       for (const word of Object.keys(unique)) {
         if (unique[word].seen > 0) {
           learnedWords.add(word);
         }
       }
     }

     account.vocabulary.learnedWords = Array.from(learnedWords);

     return account;
   }
   ```

3. **清理过期备份**
   ```javascript
   // 修改 createBackup 函数
   // 位置：src/storage.js:312-336
   function createBackup(accountId, accountData) {
     try {
       const backupKey = `mmwg_backup_${accountId}`;
       const backups = JSON.parse(window.localStorage.getItem(backupKey) || "[]");

       const backup = {
         timestamp: Date.now(),
         data: clone(accountData),
         checksum: calculateChecksum(accountData)
       };

       backups.push(backup);

       // 保留最近 3 个备份
       if (backups.length > 3) {
         backups.shift();
       }

       // 删除 30 天前的备份
       const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
       const filtered = backups.filter(b => b.timestamp > thirtyDaysAgo);

       window.localStorage.setItem(backupKey, JSON.stringify(filtered));
       return true;
     } catch (e) {
       console.warn("Backup creation failed:", e);
       return false;
     }
   }
   ```

4. **执行一次性清理**
   ```javascript
   // 新增全局清理函数
   window.MMWG_STORAGE.cleanupAllData = function() {
     const accounts = this.getAccountList();
     let totalSaved = 0;

     accounts.forEach(account => {
       const before = JSON.stringify(account).length;
       const cleaned = cleanupAccountData(account);
       const after = JSON.stringify(cleaned).length;

       this.saveAccount(cleaned);
       totalSaved += (before - after);
     });

     console.log(`Cleanup complete. Saved ${totalSaved} bytes.`);
     return totalSaved;
   };
   ```

**验收**：
- ✅ wordStats 字段已删除
- ✅ learnedWords 从 packProgress 重建
- ✅ 过期备份已清理
- ✅ 数据大小减少 > 30%

---

### 子任务 1.1.3：添加容量监控（1 天）

**文件**：`src/storage.js`

**步骤**：

1. **实现容量检测函数**
   ```javascript
   // 新增函数
   function getStorageUsage() {
     let totalSize = 0;
     const keys = [];

     for (let i = 0; i < localStorage.length; i++) {
       const key = localStorage.key(i);
       if (key.startsWith('mmwg')) {
         const value = localStorage.getItem(key) || '';
         const size = key.length + value.length;
         totalSize += size;
         keys.push({ key, size });
       }
     }

     // 估算配额（通常 5-10MB）
     const estimatedQuota = 5 * 1024 * 1024;  // 5MB
     const usagePercent = (totalSize / estimatedQuota * 100).toFixed(1);

     return {
       totalSize,
       totalSizeKB: (totalSize / 1024).toFixed(1),
       estimatedQuota,
       usagePercent: parseFloat(usagePercent),
       keys: keys.sort((a, b) => b.size - a.size)
     };
   }

   window.MMWG_STORAGE.getStorageUsage = getStorageUsage;
   ```

2. **添加容量警告**
   ```javascript
   // 修改 saveJson 方法，添加容量检查
   saveJson(key, value, compress = true) {
     try {
       const jsonStr = JSON.stringify(value);
       const data = compress ? LZString.compress(jsonStr) : jsonStr;

       // 容量检查
       const usage = getStorageUsage();
       if (usage.usagePercent > 80) {
         console.warn(`Storage usage high: ${usage.usagePercent}%`);

         // 触发警告事件
         window.dispatchEvent(new CustomEvent('mmwg:storage:warning', {
           detail: usage
         }));
       }

       window.localStorage.setItem(key, data);
     } catch (e) {
       if (e.name === 'QuotaExceededError') {
         console.error('Storage quota exceeded!');
         window.dispatchEvent(new CustomEvent('mmwg:storage:full', {
           detail: getStorageUsage()
         }));
       }
       throw e;
     }
   }
   ```

3. **UI 警告提示**
   ```javascript
   // 在游戏初始化时添加监听
   // 位置：src/modules/11-game-init.js 或 src/modules/17-bootstrap.js

   window.addEventListener('mmwg:storage:warning', (e) => {
     const usage = e.detail;
     showNotification({
       type: 'warning',
       title: '存储空间不足',
       message: `已使用 ${usage.usagePercent}%，建议清理数据或导出备份。`,
       actions: [
         { label: '查看详情', action: () => showStorageDetails() },
         { label: '导出备份', action: () => exportBackup() }
       ]
     });
   });

   window.addEventListener('mmwg:storage:full', (e) => {
     showNotification({
       type: 'error',
       title: '存储空间已满',
       message: '无法保存数据，请立即清理或导出备份。',
       actions: [
         { label: '导出备份', action: () => exportBackup() },
         { label: '清理数据', action: () => showCleanupDialog() }
       ]
     });
   });
   ```

**验收**：
- ✅ 可查看存储使用情况
- ✅ 达到 80% 时显示警告
- ✅ 存储满时显示错误提示

## Task 1.2：基础导入/导出功能（4 天）

### 子任务 1.2.1：实现 JSON 导出（1.5 天）

**新增文件**：`src/modules/24-import-export.js`

**步骤**：

1. **创建导出服务类**
   ```javascript
   // src/modules/24-import-export.js
   class ImportExportService {
     constructor() {
       this.version = "2.0.0";
     }

     // 导出完整数据
     async exportToJSON(accountId, options = {}) {
       const {
         includeProgress = true,
         includeCustomPacks = true,
         includeStatistics = false
       } = options;

       const account = window.MMWG_STORAGE.getAccount(accountId);
       if (!account) {
         throw new Error(`Account not found: ${accountId}`);
       }

       const exportData = {
         version: this.version,
         exportDate: new Date().toISOString(),
         type: "full",
         account: {
           id: account.id,
           username: account.username,
           avatar: account.avatar,
           createdAt: account.createdAt,
           settings: account.vocabulary || {}
         }
       };

       // 导出学习进度
       if (includeProgress) {
         exportData.progress = this.exportProgress(account);
       }

       // 导出自定义词库（如果有）
       if (includeCustomPacks) {
         exportData.customPacks = this.exportCustomPacks(account);
       }

       return exportData;
     }

     exportProgress(account) {
       const progress = [];
       const packProgress = account.vocabulary?.packProgress || {};

       for (const [packId, pack] of Object.entries(packProgress)) {
         const unique = pack.unique || {};

         for (const [word, stats] of Object.entries(unique)) {
           progress.push({
             packId,
             word,
             seen: stats.seen || 0,
             correct: stats.correct || 0,
             wrong: stats.wrong || 0,
             quality: stats.quality || "new",
             lastSeen: stats.lastSeen || Date.now()
           });
         }
       }

       return progress;
     }

     exportCustomPacks(account) {
       // 暂时返回空数组，后续实现
       return [];
     }

     // 下载为文件
     downloadJSON(data, filename) {
       const jsonStr = JSON.stringify(data, null, 2);
       const blob = new Blob([jsonStr], { type: 'application/json' });
       const url = URL.createObjectURL(blob);

       const a = document.createElement('a');
       a.href = url;
       a.download = filename || `mmwg-backup-${Date.now()}.json`;
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
       URL.revokeObjectURL(url);
     }
   }

   // 全局实例
   window.MMWG_IMPORT_EXPORT = new ImportExportService();
   ```

2. **添加导出 UI**
   ```javascript
   // 在账户管理界面添加导出按钮
   // 位置：需要确定具体的 UI 文件

   function showExportDialog(accountId) {
     const dialog = createDialog({
       title: '导出数据',
       content: `
         <div class="export-options">
           <label>
             <input type="checkbox" id="export-progress" checked>
             导出学习进度
           </label>
           <label>
             <input type="checkbox" id="export-custom-packs" checked>
             导出自定义词库
           </label>
           <label>
             <input type="checkbox" id="export-statistics">
             导出统计数据（实验性）
           </label>
         </div>
       `,
       buttons: [
         {
           label: '取消',
           action: () => dialog.close()
         },
         {
           label: '导出',
           primary: true,
           action: async () => {
             const options = {
               includeProgress: document.getElementById('export-progress').checked,
               includeCustomPacks: document.getElementById('export-custom-packs').checked,
               includeStatistics: document.getElementById('export-statistics').checked
             };

             try {
               const data = await window.MMWG_IMPORT_EXPORT.exportToJSON(accountId, options);
               const account = window.MMWG_STORAGE.getAccount(accountId);
               const filename = `mmwg-${account.username}-${Date.now()}.json`;

               window.MMWG_IMPORT_EXPORT.downloadJSON(data, filename);

               showNotification({
                 type: 'success',
                 message: '数据导出成功！'
               });

               dialog.close();
             } catch (e) {
               showNotification({
                 type: 'error',
                 message: `导出失败：${e.message}`
               });
             }
           }
         }
       ]
     });

     dialog.show();
   }
   ```

**验收**：
- ✅ 可导出账户数据为 JSON
- ✅ JSON 格式正确且可读
- ✅ 文件自动下载

---

### 子任务 1.2.2：实现 JSON 导入（1.5 天）

**文件**：`src/modules/24-import-export.js`

**步骤**：

1. **添加导入方法**
   ```javascript
   // 在 ImportExportService 类中添加

   async importFromJSON(jsonData, options = {}) {
     const {
       mergeMode = 'merge',  // 'merge' | 'replace'
       skipValidation = false
     } = options;

     // 1. 验证格式
     if (!skipValidation) {
       this.validateImportData(jsonData);
     }

     // 2. 检查版本兼容性
     if (jsonData.version !== this.version) {
       console.warn(`Version mismatch: ${jsonData.version} vs ${this.version}`);
       // 尝试迁移
       jsonData = this.migrateVersion(jsonData);
     }

     // 3. 导入账户
     const importedAccount = await this.importAccount(jsonData.account, mergeMode);

     // 4. 导入进度
     if (jsonData.progress) {
       await this.importProgress(importedAccount.id, jsonData.progress, mergeMode);
     }

     // 5. 导入自定义词库
     if (jsonData.customPacks) {
       await this.importCustomPacks(jsonData.customPacks);
     }

     return {
       success: true,
       accountId: importedAccount.id,
       imported: {
         progress: jsonData.progress?.length || 0,
         customPacks: jsonData.customPacks?.length || 0
       }
     };
   }

   validateImportData(data) {
     if (!data.version) {
       throw new Error('Invalid format: missing version');
     }

     if (!data.account) {
       throw new Error('Invalid format: missing account data');
     }

     if (!data.account.username) {
       throw new Error('Invalid format: missing username');
     }

     return true;
   }

   async importAccount(accountData, mergeMode) {
     // 检查是否已存在同名账户
     const accounts = window.MMWG_STORAGE.getAccountList();
     const existing = accounts.find(a => a.username === accountData.username);

     if (existing && mergeMode === 'replace') {
       // 替换模式：删除旧账户
       window.MMWG_STORAGE.deleteAccount(existing.id);
     }

     if (existing && mergeMode === 'merge') {
       // 合并模式：使用现有账户
       return existing;
     }

     // 创建新账户
     const newAccount = window.MMWG_STORAGE.createAccount(accountData.username);
     newAccount.avatar = accountData.avatar || 'default';
     newAccount.vocabulary = accountData.settings || {};

     window.MMWG_STORAGE.saveAccount(newAccount);
     return newAccount;
   }

   async importProgress(accountId, progressData, mergeMode) {
     const account = window.MMWG_STORAGE.getAccount(accountId);
     if (!account) {
       throw new Error('Account not found');
     }

     const packProgress = account.vocabulary?.packProgress || {};

     for (const item of progressData) {
       const { packId, word, seen, correct, wrong, quality, lastSeen } = item;

       if (!packProgress[packId]) {
         packProgress[packId] = {
           unique: {},
           uniqueCount: 0,
           total: 0,
           completed: false
         };
       }

       const existing = packProgress[packId].unique[word];

       if (mergeMode === 'merge' && existing) {
         // 合并：取最大值
         packProgress[packId].unique[word] = {
           seen: Math.max(existing.seen || 0, seen),
           correct: Math.max(existing.correct || 0, correct),
           wrong: Math.max(existing.wrong || 0, wrong),
           quality: quality || existing.quality,
           lastSeen: Math.max(existing.lastSeen || 0, lastSeen)
         };
       } else {
         // 替换或新增
         packProgress[packId].unique[word] = {
           seen, correct, wrong, quality, lastSeen
         };
       }

       packProgress[packId].uniqueCount = Object.keys(packProgress[packId].unique).length;
     }

     account.vocabulary.packProgress = packProgress;
     window.MMWG_STORAGE.saveAccount(account);
   }

   migrateVersion(data) {
     // 版本迁移逻辑
     console.log(`Migrating from ${data.version} to ${this.version}`);
     // 暂时直接返回
     return data;
   }
   ```

2. **添加导入 UI**
   ```javascript
   function showImportDialog() {
     const dialog = createDialog({
       title: '导入数据',
       content: `
         <div class="import-container">
           <input type="file" id="import-file" accept=".json" style="display:none">
           <button id="select-file-btn" class="btn">选择文件</button>
           <div id="file-info" style="margin-top: 10px;"></div>

           <div class="import-options" style="margin-top: 20px;">
             <label>导入模式：</label>
             <select id="import-mode">
               <option value="merge">合并（保留现有数据）</option>
               <option value="replace">替换（覆盖现有数据）</option>
             </select>
           </div>
         </div>
       `,
       buttons: [
         {
           label: '取消',
           action: () => dialog.close()
         },
         {
           label: '导入',
           primary: true,
           disabled: true,
           id: 'import-btn',
           action: async () => {
             const fileInput = document.getElementById('import-file');
             const file = fileInput.files[0];
             const mode = document.getElementById('import-mode').value;

             try {
               const text = await file.text();
               const data = JSON.parse(text);

               const result = await window.MMWG_IMPORT_EXPORT.importFromJSON(data, {
                 mergeMode: mode
               });

               showNotification({
                 type: 'success',
                 message: `导入成功！已导入 ${result.imported.progress} 条学习记录。`
               });

               dialog.close();

               // 刷新界面
               location.reload();
             } catch (e) {
               showNotification({
                 type: 'error',
                 message: `导入失败：${e.message}`
               });
             }
           }
         }
       ]
     });

     // 文件选择逻辑
     const fileInput = document.getElementById('import-file');
     const selectBtn = document.getElementById('select-file-btn');
     const fileInfo = document.getElementById('file-info');
     const importBtn = document.getElementById('import-btn');

     selectBtn.onclick = () => fileInput.click();

     fileInput.onchange = () => {
       const file = fileInput.files[0];
       if (file) {
         fileInfo.textContent = `已选择：${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
         importBtn.disabled = false;
       }
     };

     dialog.show();
   }
   ```

**验收**：
- ✅ 可从 JSON 文件导入数据
- ✅ 支持合并和替换模式
- ✅ 有格式验证和错误提示

### 子任务 1.2.3：UI 集成（1 天）

**修改文件**：需要确定具体的 UI 文件（可能是账户管理界面）

**步骤**：

1. **在账户管理界面添加按钮**
   ```javascript
   // 假设在账户管理界面
   function renderAccountActions(accountId) {
     return `
       <div class="account-actions">
         <button onclick="showExportDialog('${accountId}')" class="btn btn-primary">
           📤 导出数据
         </button>
         <button onclick="showImportDialog()" class="btn btn-secondary">
           📥 导入数据
         </button>
         <button onclick="showStorageInfo()" class="btn btn-info">
           💾 存储信息
         </button>
       </div>
     `;
   }
   ```

2. **添加存储信息界面**
   ```javascript
   function showStorageInfo() {
     const usage = window.MMWG_STORAGE.getStorageUsage();

     const dialog = createDialog({
       title: '存储信息',
       content: `
         <div class="storage-info">
           <div class="info-row">
             <span>已使用空间：</span>
             <span>${usage.totalSizeKB} KB</span>
           </div>
           <div class="info-row">
             <span>使用率：</span>
             <span class="${usage.usagePercent > 80 ? 'text-danger' : ''}">
               ${usage.usagePercent}%
             </span>
           </div>
           <div class="progress-bar">
             <div class="progress-fill" style="width: ${usage.usagePercent}%"></div>
           </div>

           <h4 style="margin-top: 20px;">存储明细：</h4>
           <table class="storage-details">
             <thead>
               <tr>
                 <th>键名</th>
                 <th>大小</th>
               </tr>
             </thead>
             <tbody>
               ${usage.keys.slice(0, 10).map(k => `
                 <tr>
                   <td>${k.key}</td>
                   <td>${(k.size / 1024).toFixed(1)} KB</td>
                 </tr>
               `).join('')}
             </tbody>
           </table>

           ${usage.usagePercent > 80 ? `
             <div class="alert alert-warning" style="margin-top: 20px;">
               ⚠️ 存储空间不足，建议导出备份或清理数据。
             </div>
           ` : ''}
         </div>
       `,
       buttons: [
         {
           label: '关闭',
           action: () => dialog.close()
         },
         {
           label: '清理数据',
           action: () => {
             dialog.close();
             showCleanupDialog();
           }
         }
       ]
     });

     dialog.show();
   }

   function showCleanupDialog() {
     const dialog = createDialog({
       title: '清理数据',
       content: `
         <div class="cleanup-options">
           <p>选择要清理的数据：</p>
           <label>
             <input type="checkbox" id="cleanup-backups">
             清理过期备份（保留最近 3 个）
           </label>
           <label>
             <input type="checkbox" id="cleanup-redundant">
             清理冗余数据（wordStats 等）
           </label>
           <label>
             <input type="checkbox" id="cleanup-compress">
             压缩现有数据
           </label>
         </div>
       `,
       buttons: [
         {
           label: '取消',
           action: () => dialog.close()
         },
         {
           label: '开始清理',
           primary: true,
           action: () => {
             const cleanupBackups = document.getElementById('cleanup-backups').checked;
             const cleanupRedundant = document.getElementById('cleanup-redundant').checked;
             const cleanupCompress = document.getElementById('cleanup-compress').checked;

             let saved = 0;

             if (cleanupRedundant) {
               saved += window.MMWG_STORAGE.cleanupAllData();
             }

             if (cleanupBackups) {
               // 清理备份逻辑
               saved += cleanupOldBackups();
             }

             if (cleanupCompress) {
               // 重新压缩所有数据
               saved += recompressAllData();
             }

             showNotification({
               type: 'success',
               message: `清理完成！释放了 ${(saved / 1024).toFixed(1)} KB 空间。`
             });

             dialog.close();
           }
         }
       ]
     });

     dialog.show();
   }
   ```

3. **添加进度提示**
   ```javascript
   function showProgressDialog(title, message) {
     const dialog = createDialog({
       title,
       content: `
         <div class="progress-container">
           <p>${message}</p>
           <div class="spinner"></div>
         </div>
       `,
       buttons: [],
       closable: false
     });

     dialog.show();
     return dialog;
   }

   // 使用示例
   async function exportWithProgress(accountId) {
     const progress = showProgressDialog('导出中', '正在导出数据，请稍候...');

     try {
       const data = await window.MMWG_IMPORT_EXPORT.exportToJSON(accountId);
       window.MMWG_IMPORT_EXPORT.downloadJSON(data);

       progress.close();
       showNotification({
         type: 'success',
         message: '导出成功！'
       });
     } catch (e) {
       progress.close();
       showNotification({
         type: 'error',
         message: `导出失败：${e.message}`
       });
     }
   }
   ```

**验收**：
- ✅ UI 按钮正确显示
- ✅ 导入/导出流程流畅
- ✅ 有进度提示和结果反馈

---

## Task 1.3：错误处理和日志（2 天）

### 子任务 1.3.1：添加错误捕获（0.5 天）

**修改文件**：`src/storage.js`, `src/modules/09-vocab.js`

**步骤**：

1. **统一错误处理**
   ```javascript
   // 新增错误类
   class MMWGError extends Error {
     constructor(message, code, details = {}) {
       super(message);
       this.name = 'MMWGError';
       this.code = code;
       this.details = details;
       this.timestamp = Date.now();
     }
   }

   // 错误代码定义
   const ERROR_CODES = {
     STORAGE_FULL: 'STORAGE_FULL',
     STORAGE_FAILED: 'STORAGE_FAILED',
     VOCAB_LOAD_FAILED: 'VOCAB_LOAD_FAILED',
     IMPORT_INVALID: 'IMPORT_INVALID',
     EXPORT_FAILED: 'EXPORT_FAILED'
   };

   window.MMWGError = MMWGError;
   window.ERROR_CODES = ERROR_CODES;
   ```

2. **改进存储错误处理**
   ```javascript
   // 修改 src/storage.js 中的方法
   saveJson(key, value, compress = true) {
     try {
       const jsonStr = JSON.stringify(value);
       const data = compress ? LZString.compress(jsonStr) : jsonStr;

       window.localStorage.setItem(key, data);
     } catch (e) {
       if (e.name === 'QuotaExceededError') {
         throw new MMWGError(
           '存储空间已满，无法保存数据',
           ERROR_CODES.STORAGE_FULL,
           { key, size: jsonStr.length }
         );
       } else {
         throw new MMWGError(
           '保存数据失败',
           ERROR_CODES.STORAGE_FAILED,
           { key, error: e.message }
         );
       }
     }
   }
   ```

3. **全局错误处理器**
   ```javascript
   // 在 bootstrap 或 game-init 中添加
   window.addEventListener('error', (event) => {
     if (event.error instanceof MMWGError) {
       handleMMWGError(event.error);
       event.preventDefault();
     }
   });

   window.addEventListener('unhandledrejection', (event) => {
     if (event.reason instanceof MMWGError) {
       handleMMWGError(event.reason);
       event.preventDefault();
     }
   });

   function handleMMWGError(error) {
     console.error('MMWG Error:', error);

     // 记录到日志
     if (window.MMWG_LOGGER) {
       window.MMWG_LOGGER.error(error.message, error.details);
     }

     // 显示用户友好的错误信息
     showNotification({
       type: 'error',
       title: '错误',
       message: error.message,
       actions: getErrorActions(error.code)
     });
   }

   function getErrorActions(errorCode) {
     switch (errorCode) {
       case ERROR_CODES.STORAGE_FULL:
         return [
           { label: '导出备份', action: () => showExportDialog() },
           { label: '清理数据', action: () => showCleanupDialog() }
         ];
       case ERROR_CODES.VOCAB_LOAD_FAILED:
         return [
           { label: '重试', action: () => location.reload() }
         ];
       default:
         return [];
     }
   }
   ```

**验收**：
- ✅ 所有错误有统一处理
- ✅ 错误信息清晰易懂
- ✅ 提供解决方案

---

### 子任务 1.3.2：实现日志系统（1 天）

**新增文件**：`src/modules/25-logger.js`

**步骤**：

1. **创建日志类**
   ```javascript
   // src/modules/25-logger.js
   class Logger {
     constructor() {
       this.logs = [];
       this.maxLogs = 1000;
       this.levels = {
         DEBUG: 0,
         INFO: 1,
         WARN: 2,
         ERROR: 3
       };
       this.currentLevel = this.levels.INFO;
     }

     log(level, message, details = {}) {
       if (this.levels[level] < this.currentLevel) {
         return;
       }

       const logEntry = {
         timestamp: Date.now(),
         level,
         message,
         details,
         stack: new Error().stack
       };

       this.logs.push(logEntry);

       // 限制日志数量
       if (this.logs.length > this.maxLogs) {
         this.logs.shift();
       }

       // 输出到控制台
       const consoleMethod = level.toLowerCase();
       if (console[consoleMethod]) {
         console[consoleMethod](`[${level}] ${message}`, details);
       }

       // 持久化关键日志
       if (level === 'ERROR' || level === 'WARN') {
         this.persistLog(logEntry);
       }
     }

     debug(message, details) {
       this.log('DEBUG', message, details);
     }

     info(message, details) {
       this.log('INFO', message, details);
     }

     warn(message, details) {
       this.log('WARN', message, details);
     }

     error(message, details) {
       this.log('ERROR', message, details);
     }

     persistLog(logEntry) {
       try {
         const key = 'mmwg_logs';
         const logs = JSON.parse(localStorage.getItem(key) || '[]');
         logs.push(logEntry);

         // 只保留最近 100 条
         if (logs.length > 100) {
           logs.shift();
         }

         localStorage.setItem(key, JSON.stringify(logs));
       } catch (e) {
         // 忽略持久化失败
       }
     }

     getLogs(filter = {}) {
       let filtered = this.logs;

       if (filter.level) {
         filtered = filtered.filter(log => log.level === filter.level);
       }

       if (filter.since) {
         filtered = filtered.filter(log => log.timestamp >= filter.since);
       }

       return filtered;
     }

     exportLogs() {
       const data = {
         exportDate: new Date().toISOString(),
         logs: this.logs
       };

       const jsonStr = JSON.stringify(data, null, 2);
       const blob = new Blob([jsonStr], { type: 'application/json' });
       const url = URL.createObjectURL(blob);

       const a = document.createElement('a');
       a.href = url;
       a.download = `mmwg-logs-${Date.now()}.json`;
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
       URL.revokeObjectURL(url);
     }

     clear() {
       this.logs = [];
       localStorage.removeItem('mmwg_logs');
     }
   }

   window.MMWG_LOGGER = new Logger();
   ```

2. **集成到现有代码**
   ```javascript
   // 在关键操作中添加日志
   // 示例：src/storage.js

   saveAccount(account) {
     window.MMWG_LOGGER.info('Saving account', { accountId: account.id });

     try {
       // ... 保存逻辑
       window.MMWG_LOGGER.info('Account saved successfully', { accountId: account.id });
     } catch (e) {
       window.MMWG_LOGGER.error('Failed to save account', {
         accountId: account.id,
         error: e.message
       });
       throw e;
     }
   }
   ```

**验收**：
- ✅ 日志正确记录
- ✅ 可查看和导出日志
- ✅ 关键操作有日志

### 子任务 1.3.3：添加诊断工具（0.5 天）

**新增文件**：`src/modules/26-diagnostics.js`

**步骤**：

1. **创建诊断工具**
   ```javascript
   // src/modules/26-diagnostics.js
   class DiagnosticsTool {
     async runFullDiagnostics() {
       const results = {
         timestamp: Date.now(),
         storage: this.checkStorage(),
         vocab: await this.checkVocab(),
         accounts: this.checkAccounts(),
         performance: this.checkPerformance()
       };

       return results;
     }

     checkStorage() {
       const usage = window.MMWG_STORAGE.getStorageUsage();
       const issues = [];

       if (usage.usagePercent > 80) {
         issues.push({
           severity: 'warning',
           message: `存储使用率过高：${usage.usagePercent}%`
         });
       }

       if (usage.usagePercent > 95) {
         issues.push({
           severity: 'error',
           message: '存储空间即将耗尽'
         });
       }

       return {
         usage,
         issues,
         status: issues.length === 0 ? 'ok' : 'warning'
       };
     }

     async checkVocab() {
       const issues = [];

       try {
         // 检查词汇引擎
         if (!window.MMWG_VOCAB_ENGINE) {
           issues.push({
             severity: 'error',
             message: '词汇引擎未初始化'
           });
         }

         // 检查词汇包
         const manifest = window.MMWG_VOCAB_MANIFEST;
         if (!manifest || !manifest.packs) {
           issues.push({
             severity: 'error',
             message: '词汇包清单缺失'
           });
         }

         return {
           packsCount: manifest?.packs?.length || 0,
           issues,
           status: issues.length === 0 ? 'ok' : 'error'
         };
       } catch (e) {
         return {
           issues: [{ severity: 'error', message: e.message }],
           status: 'error'
         };
       }
     }

     checkAccounts() {
       const accounts = window.MMWG_STORAGE.getAccountList();
       const issues = [];

       accounts.forEach(account => {
         // 检查数据完整性
         if (!account.id || !account.username) {
           issues.push({
             severity: 'error',
             message: `账户数据不完整：${account.id}`
           });
         }

         // 检查进度数据
         const packProgress = account.vocabulary?.packProgress || {};
         const progressSize = JSON.stringify(packProgress).length;

         if (progressSize > 500 * 1024) {  // 500KB
           issues.push({
             severity: 'warning',
             message: `账户 ${account.username} 的进度数据过大：${(progressSize / 1024).toFixed(1)} KB`
           });
         }
       });

       return {
         accountsCount: accounts.length,
         issues,
         status: issues.length === 0 ? 'ok' : 'warning'
       };
     }

     checkPerformance() {
       const issues = [];

       // 检查内存使用（如果可用）
       if (performance.memory) {
         const usedMB = performance.memory.usedJSHeapSize / 1024 / 1024;
         const limitMB = performance.memory.jsHeapSizeLimit / 1024 / 1024;
         const usagePercent = (usedMB / limitMB * 100).toFixed(1);

         if (usagePercent > 80) {
           issues.push({
             severity: 'warning',
             message: `内存使用率过高：${usagePercent}%`
           });
         }
       }

       return {
         memory: performance.memory ? {
           used: (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1) + ' MB',
           limit: (performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(1) + ' MB'
         } : null,
         issues,
         status: issues.length === 0 ? 'ok' : 'warning'
       };
     }

     generateReport(results) {
       let report = '# 系统诊断报告\n\n';
       report += `生成时间：${new Date(results.timestamp).toLocaleString()}\n\n`;

       // 存储状态
       report += '## 存储状态\n';
       report += `- 使用量：${results.storage.usage.totalSizeKB} KB\n`;
       report += `- 使用率：${results.storage.usage.usagePercent}%\n`;
       report += `- 状态：${results.storage.status}\n`;
       if (results.storage.issues.length > 0) {
         report += '\n问题：\n';
         results.storage.issues.forEach(issue => {
           report += `- [${issue.severity}] ${issue.message}\n`;
         });
       }
       report += '\n';

       // 词汇系统
       report += '## 词汇系统\n';
       report += `- 词汇包数量：${results.vocab.packsCount}\n`;
       report += `- 状态：${results.vocab.status}\n`;
       if (results.vocab.issues.length > 0) {
         report += '\n问题：\n';
         results.vocab.issues.forEach(issue => {
           report += `- [${issue.severity}] ${issue.message}\n`;
         });
       }
       report += '\n';

       // 账户
       report += '## 账户\n';
       report += `- 账户数量：${results.accounts.accountsCount}\n`;
       report += `- 状态：${results.accounts.status}\n`;
       if (results.accounts.issues.length > 0) {
         report += '\n问题：\n';
         results.accounts.issues.forEach(issue => {
           report += `- [${issue.severity}] ${issue.message}\n`;
         });
       }
       report += '\n';

       // 性能
       report += '## 性能\n';
       if (results.performance.memory) {
         report += `- 内存使用：${results.performance.memory.used} / ${results.performance.memory.limit}\n`;
       }
       report += `- 状态：${results.performance.status}\n`;
       if (results.performance.issues.length > 0) {
         report += '\n问题：\n';
         results.performance.issues.forEach(issue => {
           report += `- [${issue.severity}] ${issue.message}\n`;
         });
       }

       return report;
     }
   }

   window.MMWG_DIAGNOSTICS = new DiagnosticsTool();
   ```

2. **添加诊断 UI**
   ```javascript
   async function showDiagnosticsDialog() {
     const progress = showProgressDialog('诊断中', '正在检查系统状态...');

     try {
       const results = await window.MMWG_DIAGNOSTICS.runFullDiagnostics();
       progress.close();

       const report = window.MMWG_DIAGNOSTICS.generateReport(results);

       const dialog = createDialog({
         title: '系统诊断',
         content: `
           <div class="diagnostics-report">
             <pre>${report}</pre>
           </div>
         `,
         buttons: [
           {
             label: '关闭',
             action: () => dialog.close()
           },
           {
             label: '导出报告',
             action: () => {
               const blob = new Blob([report], { type: 'text/plain' });
               const url = URL.createObjectURL(blob);
               const a = document.createElement('a');
               a.href = url;
               a.download = `mmwg-diagnostics-${Date.now()}.txt`;
               a.click();
               URL.revokeObjectURL(url);
             }
           }
         ]
       });

       dialog.show();
     } catch (e) {
       progress.close();
       showNotification({
         type: 'error',
         message: `诊断失败：${e.message}`
       });
     }
   }
   ```

**验收**：
- ✅ 可运行完整诊断
- ✅ 诊断报告清晰
- ✅ 可导出报告

---

## 测试计划

### 单元测试

**测试文件**：`tests/unit/storage.test.js`

```javascript
describe('Storage Compression', () => {
  test('should compress data correctly', () => {
    const testData = { test: 'data'.repeat(100) };
    window.MMWG_STORAGE.saveJson('test_key', testData, true);
    const loaded = window.MMWG_STORAGE.loadJson('test_key', {});
    expect(loaded).toEqual(testData);
  });

  test('should handle uncompressed data', () => {
    const testData = { test: 'data' };
    window.MMWG_STORAGE.saveJson('test_key', testData, false);
    const loaded = window.MMWG_STORAGE.loadJson('test_key', {});
    expect(loaded).toEqual(testData);
  });
});

describe('Import/Export', () => {
  test('should export account data', async () => {
    const account = window.MMWG_STORAGE.createAccount('test_user');
    const exported = await window.MMWG_IMPORT_EXPORT.exportToJSON(account.id);

    expect(exported.version).toBe('2.0.0');
    expect(exported.account.username).toBe('test_user');
  });

  test('should import account data', async () => {
    const exportData = {
      version: '2.0.0',
      account: { username: 'imported_user', settings: {} },
      progress: []
    };

    const result = await window.MMWG_IMPORT_EXPORT.importFromJSON(exportData);
    expect(result.success).toBe(true);

    const account = window.MMWG_STORAGE.getAccountList()
      .find(a => a.username === 'imported_user');
    expect(account).toBeDefined();
  });
});
```

### 集成测试

**测试文件**：`tests/e2e/phase1.spec.js`

```javascript
test('complete export/import workflow', async ({ page }) => {
  // 1. 创建测试账户
  await page.goto('http://localhost:4173/Game.html');
  await page.click('#create-account-btn');
  await page.fill('#username-input', 'test_user');
  await page.click('#confirm-btn');

  // 2. 添加一些学习进度
  await page.click('#start-game-btn');
  // ... 玩游戏，收集词汇

  // 3. 导出数据
  await page.click('#account-menu-btn');
  await page.click('#export-data-btn');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#export-confirm-btn')
  ]);

  // 4. 验证导出文件
  const path = await download.path();
  const content = fs.readFileSync(path, 'utf-8');
  const data = JSON.parse(content);
  expect(data.version).toBe('2.0.0');
  expect(data.account.username).toBe('test_user');

  // 5. 删除账户
  await page.click('#delete-account-btn');
  await page.click('#confirm-delete-btn');

  // 6. 导入数据
  await page.click('#import-data-btn');
  await page.setInputFiles('#import-file', path);
  await page.click('#import-confirm-btn');

  // 7. 验证数据恢复
  await page.waitForSelector('#account-menu-btn');
  const username = await page.textContent('#current-username');
  expect(username).toBe('test_user');
});
```

### 性能测试

```javascript
test('storage compression performance', () => {
  const largeData = {
    accounts: Array.from({ length: 10 }, (_, i) => ({
      id: `account_${i}`,
      username: `user_${i}`,
      vocabulary: {
        packProgress: {
          'vocab.test': {
            unique: Object.fromEntries(
              Array.from({ length: 1000 }, (_, j) => [
                `word_${j}`,
                { seen: 10, correct: 8, wrong: 2 }
              ])
            )
          }
        }
      }
    }))
  };

  const start = performance.now();
  window.MMWG_STORAGE.saveJson('test_large', largeData, true);
  const saveTime = performance.now() - start;

  const loadStart = performance.now();
  const loaded = window.MMWG_STORAGE.loadJson('test_large', {});
  const loadTime = performance.now() - loadStart;

  console.log(`Save time: ${saveTime.toFixed(2)}ms`);
  console.log(`Load time: ${loadTime.toFixed(2)}ms`);

  expect(saveTime).toBeLessThan(1000);  // < 1s
  expect(loadTime).toBeLessThan(500);   // < 0.5s
});
```

---

## 部署检查清单

### 代码检查
- [ ] 所有代码已提交到 Git
- [ ] 代码通过 ESLint 检查
- [ ] 单元测试通过率 100%
- [ ] 集成测试通过

### 功能检查
- [ ] LocalStorage 压缩功能正常
- [ ] 导出功能正常
- [ ] 导入功能正常
- [ ] 错误处理正常
- [ ] 日志记录正常
- [ ] 诊断工具正常

### 性能检查
- [ ] 压缩率 > 50%
- [ ] 保存/加载时间 < 1s
- [ ] 导入/导出时间 < 5s

### 兼容性检查
- [ ] Chrome 90+ 测试通过
- [ ] Firefox 88+ 测试通过
- [ ] Safari 14+ 测试通过
- [ ] 移动端测试通过

### 文档检查
- [ ] 导入/导出使用指南已完成
- [ ] API 文档已更新
- [ ] CHANGELOG 已更新

---

## 总结

阶段 1 完成后，将实现：

**核心功能**：
- ✅ LocalStorage 容量优化（压缩 + 清理）
- ✅ 基础导入/导出功能（JSON 格式）
- ✅ 完善的错误处理和日志系统
- ✅ 系统诊断工具

**预期效果**：
- 存储空间使用减少 50-70%
- 支持 10+ 账户不溢出
- 用户可以备份和恢复数据
- 错误提示清晰，易于排查问题

**下一步**：
- 进入阶段 2：IndexedDB 迁移
- 开始 Task 2.1 的开发工作

---

**相关文档**：
- [技术设计方案](2026-03-05-technical-design.md)
- [分阶段实施计划](2026-03-05-implementation-plan.md)
- [阶段 2 执行计划](2026-03-05-phase2-execution-plan.md)（待生成）

