# 词汇系统优化 - 最终方案（CSV + 验证工具）

> 生成时间：2026-03-05
> 方案类型：轻量级、易维护、面向非技术用户

## 执行摘要

**核心思路**：使用现有 CSV 数据 + 简单验证工具，让老师能够自己维护词库。

**关键优势**：
- ✅ 老师用 Excel 编辑，无需编程
- ✅ 提供验证工具，防止格式错误
- ✅ 扩展新语言（拼音、汉字）只需添加列
- ✅ 开发时间：2 天
- ✅ 数据已存在（6,544 条）

---

## 方案概述

### 1. 数据存储：CSV 文件

**位置**：`words/db/csv/entries.csv`

**当前结构**：
```csv
id,lemma_key,learn_type,word,standardized,chinese,phonetic,phrase,phraseTranslation,difficulty,category,status,primary_image_url,source_files
```

**优点**：
- Excel 可直接编辑
- 格式简单，易于理解
- 数据已存在（6,544 条）
- 扩展容易（添加列）

### 2. 加载机制：启动时加载到内存

```javascript
// 游戏启动时一次性加载
const vocabDatabase = await loadVocabFromCSV('words/db/csv/entries.csv');

// 构建索引（快速查询）
const vocabIndex = buildVocabIndex(vocabDatabase);

// 查询接口
vocabAPI.getByDifficulty('basic');      // 按难度
vocabAPI.getByCategory('kindergarten'); // 按分类
vocabAPI.getRandom(10, { difficulty: 'basic' }); // 随机
```

### 3. 验证工具：防止格式错误

**工具页面**：`tools/vocab-validator.html`

**功能**：
- 上传 CSV 文件
- 检查必需字段
- 检查格式错误
- 显示统计信息

### 4. 多语言扩展：添加列即可

**英语词汇**（当前）：
```csv
word,chinese,phonetic,phrase,difficulty,type
apple,苹果,/ˈæpl/,An apple a day,basic,english
```

**添加汉字支持**：
```csv
word,chinese,phonetic,phrase,difficulty,type,pinyin,strokes,radical
苹,苹果,píng,,basic,hanzi,píng,8,艹
```

**添加拼音支持**：
```csv
word,chinese,phonetic,phrase,difficulty,type,initial,final,tone
píng,拼音,píng,,basic,pinyin,p,ing,2
```

---

## 架构设计

### 系统架构图

```
┌─────────────────────────────────────────────────────────────┐
│                    新词汇系统架构                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │  entries.csv     │────────▶│  CSV Loader      │          │
│  │  (6,544 条词汇)  │         │  (PapaParse)     │          │
│  └──────────────────┘         └──────────────────┘          │
│                                        │                    │
│                                        ▼                    │
│                               ┌──────────────────┐          │
│                               │  Vocab Database  │          │
│                               │  (内存数组)      │          │
│                               └──────────────────┘          │
│                                        │                    │
│                                        ▼                    │
│                               ┌──────────────────┐          │
│                               │  Vocab Index     │          │
│                               │  (快速查询)      │          │
│                               └──────────────────┘          │
│                                        │                    │
│                                        ▼                    │
│                               ┌──────────────────┐          │
│                               │  Vocab API       │          │
│                               │  (查询接口)      │          │
│                               └──────────────────┘          │
│                                        │                    │
│                                        ▼                    │
│                               ┌──────────────────┐          │
│                               │  Game Loop       │          │
│                               │  (游戏循环)      │          │
│                               └──────────────────┘          │
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │  LocalStorage    │         │  Progress Data   │          │
│  │  (学习进度)      │◀────────│  (压缩存储)      │          │
│  └──────────────────┘         └──────────────────┘          │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    维护工具                                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │  Excel           │────────▶│  entries.csv     │          │
│  │  (老师编辑)      │         │  (词库数据)      │          │
│  └──────────────────┘         └──────────────────┘          │
│                                        │                    │
│                                        ▼                    │
│                               ┌──────────────────┐          │
│                               │  Validator Tool  │          │
│                               │  (格式验证)      │          │
│                               └──────────────────┘          │
│                                        │                    │
│                                        ▼                    │
│                               ┌──────────────────┐          │
│                               │  Error Report    │          │
│                               │  (错误报告)      │          │
│                               └──────────────────┘          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 数据流图

```
游戏启动
  │
  ▼
加载 entries.csv (fetch)
  │
  ▼
解析 CSV (PapaParse)
  │
  ▼
过滤 status=active
  │
  ▼
构建内存数据库 (Array)
  │
  ▼
构建索引 (Object)
  ├─ byDifficulty: { basic: [...], intermediate: [...] }
  ├─ byCategory: { kindergarten: [...], junior_high: [...] }
  └─ byType: { english: [...], hanzi: [...], pinyin: [...] }
  │
  ▼
提供查询 API
  │
  ▼
游戏循环使用
  ├─ vocabAPI.getRandom(10, { difficulty: 'basic' })
  ├─ vocabAPI.getByCategory('kindergarten')
  └─ vocabAPI.search('apple')
  │
  ▼
记录学习进度
  │
  ▼
保存到 LocalStorage (压缩)
```

---

## 核心模块设计

### 模块 1：CSV 加载器

**文件**：`src/modules/24-vocab-csv-loader.js`

**功能**：
- 加载 CSV 文件
- 解析为 JSON 数组
- 过滤无效数据
- 构建索引

**API**：
```javascript
class VocabCSVLoader {
  // 加载 CSV
  async loadCSV(url) {
    const response = await fetch(url);
    const csvText = await response.text();
    return this.parseCSV(csvText);
  }

  // 解析 CSV（使用 PapaParse）
  parseCSV(csvText) {
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim()
    });
    return result.data;
  }

  // 过滤有效数据
  filterActive(data) {
    return data.filter(entry => entry.status === 'active');
  }

  // 构建索引
  buildIndex(data) {
    const index = {
      byDifficulty: {},
      byCategory: {},
      byType: {},
      byId: {}
    };

    data.forEach(entry => {
      // 按难度索引
      if (!index.byDifficulty[entry.difficulty]) {
        index.byDifficulty[entry.difficulty] = [];
      }
      index.byDifficulty[entry.difficulty].push(entry);

      // 按分类索引
      if (!index.byCategory[entry.category]) {
        index.byCategory[entry.category] = [];
      }
      index.byCategory[entry.category].push(entry);

      // 按类型索引
      const type = entry.type || 'english';
      if (!index.byType[type]) {
        index.byType[type] = [];
      }
      index.byType[type].push(entry);

      // 按 ID 索引
      index.byId[entry.id] = entry;
    });

    return index;
  }
}
```

### 模块 2：词汇查询 API

**文件**：`src/modules/25-vocab-api.js`

**功能**：
- 提供统一的查询接口
- 支持多种查询方式
- 支持随机选择

**API**：
```javascript
class VocabAPI {
  constructor(database, index) {
    this.database = database;
    this.index = index;
  }

  // 按难度查询
  getByDifficulty(difficulty) {
    return this.index.byDifficulty[difficulty] || [];
  }

  // 按分类查询
  getByCategory(category) {
    return this.index.byCategory[category] || [];
  }

  // 按类型查询
  getByType(type) {
    return this.index.byType[type] || [];
  }

  // 按 ID 查询
  getById(id) {
    return this.index.byId[id];
  }

  // 组合查询
  query(filter = {}) {
    let result = this.database;

    if (filter.difficulty) {
      result = result.filter(e => e.difficulty === filter.difficulty);
    }
    if (filter.category) {
      result = result.filter(e => e.category === filter.category);
    }
    if (filter.type) {
      result = result.filter(e => (e.type || 'english') === filter.type);
    }
    if (filter.status) {
      result = result.filter(e => e.status === filter.status);
    }

    return result;
  }

  // 随机获取
  getRandom(count, filter = {}) {
    const pool = this.query(filter);
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // 搜索
  search(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return this.database.filter(entry => {
      return entry.word.toLowerCase().includes(lowerKeyword) ||
             entry.chinese.includes(keyword) ||
             (entry.phrase && entry.phrase.toLowerCase().includes(lowerKeyword));
    });
  }

  // 统计
  getStats() {
    return {
      total: this.database.length,
      byDifficulty: Object.keys(this.index.byDifficulty).reduce((acc, key) => {
        acc[key] = this.index.byDifficulty[key].length;
        return acc;
      }, {}),
      byCategory: Object.keys(this.index.byCategory).reduce((acc, key) => {
        acc[key] = this.index.byCategory[key].length;
        return acc;
      }, {}),
      byType: Object.keys(this.index.byType).reduce((acc, key) => {
        acc[key] = this.index.byType[key].length;
        return acc;
      }, {})
    };
  }
}
```

### 模块 3：验证工具

**文件**：`tools/vocab-validator.html`

**功能**：
- 上传 CSV 文件
- 验证格式
- 显示错误和统计

**界面**：
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>词库验证工具</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    .upload-area {
      border: 2px dashed #ccc;
      padding: 40px;
      text-align: center;
      margin-bottom: 20px;
    }
    .result {
      margin-top: 20px;
      padding: 20px;
      border-radius: 5px;
    }
    .success {
      background: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
    }
    .error {
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
    }
    .stats {
      margin-top: 20px;
    }
    .stats table {
      width: 100%;
      border-collapse: collapse;
    }
    .stats th, .stats td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
</head>
<body>
  <h1>📚 词库验证工具</h1>

  <div class="upload-area">
    <input type="file" id="csvFile" accept=".csv" style="display:none">
    <button onclick="document.getElementById('csvFile').click()"
            style="padding: 10px 20px; font-size: 16px;">
      选择 CSV 文件
    </button>
    <p style="margin-top: 10px; color: #666;">
      支持格式：entries.csv
    </p>
  </div>

  <div id="result"></div>

  <script>
    document.getElementById('csvFile').addEventListener('change', validateCSV);

    function validateCSV(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const csvText = e.target.result;

        // 解析 CSV
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data;
            const errors = [];
            const warnings = [];

            // 验证必需字段
            const requiredFields = ['id', 'word', 'standardized', 'chinese', 'difficulty', 'status'];
            const headers = Object.keys(data[0] || {});

            requiredFields.forEach(field => {
              if (!headers.includes(field)) {
                errors.push(`缺少必需字段: ${field}`);
              }
            });

            // 验证每一行
            data.forEach((entry, index) => {
              const lineNum = index + 2; // +2 因为有表头且从1开始

              // 检查必需字段是否为空
              if (!entry.id) {
                errors.push(`第 ${lineNum} 行: id 为空`);
              }
              if (!entry.word) {
                errors.push(`第 ${lineNum} 行: word 为空`);
              }
              if (!entry.chinese) {
                warnings.push(`第 ${lineNum} 行: chinese 为空`);
              }

              // 检查 difficulty 是否有效
              const validDifficulties = ['basic', 'intermediate', 'advanced', 'expert', 'master'];
              if (entry.difficulty && !validDifficulties.includes(entry.difficulty)) {
                warnings.push(`第 ${lineNum} 行: difficulty "${entry.difficulty}" 不在标准列表中`);
              }

              // 检查 status 是否有效
              const validStatuses = ['active', 'inactive'];
              if (entry.status && !validStatuses.includes(entry.status)) {
                errors.push(`第 ${lineNum} 行: status "${entry.status}" 无效（应为 active 或 inactive）`);
              }
            });

            // 显示结果
            displayResults(data, errors, warnings);
          }
        });
      };
      reader.readAsText(file);
    }

    function displayResults(data, errors, warnings) {
      const resultDiv = document.getElementById('result');

      if (errors.length === 0) {
        // 成功
        const activeCount = data.filter(e => e.status === 'active').length;
        const inactiveCount = data.filter(e => e.status === 'inactive').length;

        // 统计难度分布
        const difficultyStats = {};
        data.forEach(entry => {
          const diff = entry.difficulty || 'unknown';
          difficultyStats[diff] = (difficultyStats[diff] || 0) + 1;
        });

        // 统计分类分布
        const categoryStats = {};
        data.forEach(entry => {
          const cat = entry.category || 'unknown';
          categoryStats[cat] = (categoryStats[cat] || 0) + 1;
        });

        resultDiv.innerHTML = `
          <div class="result success">
            <h2>✅ 验证通过！</h2>
            <p>词库格式正确，可以使用。</p>
          </div>

          <div class="stats">
            <h3>📊 统计信息</h3>
            <table>
              <tr>
                <th>总词汇数</th>
                <td>${data.length}</td>
              </tr>
              <tr>
                <th>激活词汇</th>
                <td>${activeCount}</td>
              </tr>
              <tr>
                <th>未激活词汇</th>
                <td>${inactiveCount}</td>
              </tr>
            </table>

            <h4>按难度分布</h4>
            <table>
              ${Object.entries(difficultyStats).map(([key, value]) => `
                <tr>
                  <th>${key}</th>
                  <td>${value}</td>
                </tr>
              `).join('')}
            </table>

            <h4>按分类分布（前10）</h4>
            <table>
              ${Object.entries(categoryStats)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([key, value]) => `
                  <tr>
                    <th>${key}</th>
                    <td>${value}</td>
                  </tr>
                `).join('')}
            </table>
          </div>

          ${warnings.length > 0 ? `
            <div class="result" style="background: #fff3cd; border: 1px solid #ffeaa7; color: #856404;">
              <h3>⚠️ 警告 (${warnings.length})</h3>
              <ul>
                ${warnings.slice(0, 10).map(w => `<li>${w}</li>`).join('')}
                ${warnings.length > 10 ? `<li>... 还有 ${warnings.length - 10} 个警告</li>` : ''}
              </ul>
            </div>
          ` : ''}
        `;
      } else {
        // 失败
        resultDiv.innerHTML = `
          <div class="result error">
            <h2>❌ 验证失败</h2>
            <p>发现 ${errors.length} 个错误：</p>
            <ul>
              ${errors.slice(0, 20).map(e => `<li>${e}</li>`).join('')}
              ${errors.length > 20 ? `<li>... 还有 ${errors.length - 20} 个错误</li>` : ''}
            </ul>
          </div>
        `;
      }
    }
  </script>
</body>
</html>
```

### 模块 4：进度管理（优化 LocalStorage）

**文件**：`src/modules/26-progress-manager.js`

**功能**：
- 压缩进度数据
- 导入/导出进度
- 清理冗余数据

**API**：
```javascript
class ProgressManager {
  constructor() {
    this.compression = true; // 使用 LZString 压缩
  }

  // 保存进度（压缩）
  saveProgress(accountId, progressData) {
    const key = `mmwg_progress_${accountId}`;
    const jsonStr = JSON.stringify(progressData);

    if (this.compression) {
      const compressed = LZString.compress(jsonStr);
      localStorage.setItem(key, compressed);
      console.log(`Progress saved: ${jsonStr.length} → ${compressed.length} bytes (${(compressed.length / jsonStr.length * 100).toFixed(1)}%)`);
    } else {
      localStorage.setItem(key, jsonStr);
    }
  }

  // 加载进度（解压）
  loadProgress(accountId) {
    const key = `mmwg_progress_${accountId}`;
    const data = localStorage.getItem(key);

    if (!data) return null;

    try {
      // 尝试解压
      if (data[0] !== '{' && data[0] !== '[') {
        const decompressed = LZString.decompress(data);
        return JSON.parse(decompressed);
      } else {
        // 未压缩数据
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
      return null;
    }
  }

  // 导出进度为 JSON
  exportProgress(accountId) {
    const progress = this.loadProgress(accountId);
    const account = window.MMWG_STORAGE.getAccount(accountId);

    const exportData = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      account: {
        id: account.id,
        username: account.username
      },
      progress: progress
    };

    return exportData;
  }

  // 导入进度
  importProgress(importData) {
    // 验证格式
    if (!importData.version || !importData.account || !importData.progress) {
      throw new Error('Invalid import data format');
    }

    // 查找或创建账户
    let account = window.MMWG_STORAGE.getAccountList()
      .find(a => a.username === importData.account.username);

    if (!account) {
      account = window.MMWG_STORAGE.createAccount(importData.account.username);
    }

    // 导入进度
    this.saveProgress(account.id, importData.progress);

    return account;
  }

  // 下载为文件
  downloadJSON(data, filename) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `progress-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
```

---

## 多语言扩展方案

### 当前 CSV 结构（英语）

```csv
id,word,standardized,chinese,phonetic,phrase,phraseTranslation,difficulty,category,status,primary_image_url
1,apple,apple,苹果,/ˈæpl/,An apple a day,一天一个苹果,basic,kindergarten,active,https://...
```

### 扩展方案 1：添加 type 字段

```csv
id,word,standardized,chinese,phonetic,phrase,phraseTranslation,difficulty,category,status,type,metadata
1,apple,apple,苹果,/ˈæpl/,An apple a day,一天一个苹果,basic,kindergarten,active,english,
2,苹,苹,苹果,píng,苹果树,Apple tree,basic,hanzi,active,hanzi,"{""strokes"":8,""radical"":""艹"",""pinyin"":""píng""}"
3,píng,píng,拼音,píng,,,,basic,pinyin,active,pinyin,"{""initial"":""p"",""final"":""ing"",""tone"":2}"
```

### 扩展方案 2：独立 CSV 文件

**英语词库**：`entries_english.csv`
```csv
id,word,chinese,phonetic,phrase,difficulty
1,apple,苹果,/ˈæpl/,An apple a day,basic
```

**汉字词库**：`entries_hanzi.csv`
```csv
id,character,pinyin,strokes,radical,meaning,words
1,苹,píng,8,艹,苹果,苹果:píng guǒ:apple
```

**拼音词库**：`entries_pinyin.csv`
```csv
id,pinyin,initial,final,tone,examples
1,píng,p,ing,2,苹:píng:apple
```

**推荐**：方案 1（添加 type 字段），因为：
- 统一管理，不需要多个文件
- 查询简单（按 type 过滤）
- metadata 字段可以存储类型特定数据（JSON 格式）

---

## 完整实施计划（Step by Step）

### Phase 1：基础功能（Day 1）

#### Task 1.1：引入 PapaParse 库（30 分钟）

**步骤**：
1. 下载 PapaParse（或使用 CDN）
2. 添加到 `Game.html`

```html
<!-- 在 Game.html 中添加 -->
<script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
```

**验收**：
- ✅ 控制台输入 `Papa` 有输出
- ✅ 无加载错误

---

#### Task 1.2：实现 CSV 加载器（2 小时）

**文件**：`src/modules/24-vocab-csv-loader.js`

**步骤**：
1. 创建 `VocabCSVLoader` 类
2. 实现 `loadCSV()` 方法
3. 实现 `parseCSV()` 方法
4. 实现 `filterActive()` 方法
5. 实现 `buildIndex()` 方法

**代码**：（见上方"模块 1"）

**测试**：
```javascript
// 在浏览器控制台测试
const loader = new VocabCSVLoader();
const data = await loader.loadCSV('words/db/csv/entries.csv');
console.log('Loaded:', data.length, 'entries');

const active = loader.filterActive(data);
console.log('Active:', active.length, 'entries');

const index = loader.buildIndex(active);
console.log('Index:', Object.keys(index.byDifficulty));
```

**验收**：
- ✅ 成功加载 CSV
- ✅ 解析为 JSON 数组
- ✅ 过滤出 active 词汇
- ✅ 构建索引成功

---

#### Task 1.3：实现词汇查询 API（2 小时）

**文件**：`src/modules/25-vocab-api.js`

**步骤**：
1. 创建 `VocabAPI` 类
2. 实现查询方法（见上方"模块 2"）
3. 实现统计方法

**测试**：
```javascript
// 在浏览器控制台测试
const api = new VocabAPI(active, index);

// 测试查询
console.log('Basic words:', api.getByDifficulty('basic').length);
console.log('Kindergarten words:', api.getByCategory('kindergarten').length);
console.log('Random 10:', api.getRandom(10, { difficulty: 'basic' }));

// 测试搜索
console.log('Search "apple":', api.search('apple'));

// 测试统计
console.log('Stats:', api.getStats());
```

**验收**：
- ✅ 按难度查询正确
- ✅ 按分类查询正确
- ✅ 随机选择正确
- ✅ 搜索功能正确
- ✅ 统计数据正确

---

#### Task 1.4：集成到游戏（2 小时）

**文件**：`src/modules/09-vocab.js`

**步骤**：
1. 修改 `ensureVocabEngine()` 使用新的 CSV 加载器
2. 保持 API 兼容性（不破坏现有代码）
3. 添加降级方案（如果 CSV 加载失败，回退到 manifest.js）

**代码**：
```javascript
// 修改 src/modules/09-vocab.js

async function ensureVocabEngine() {
  if (window.MMWG_VOCAB_ENGINE) {
    return window.MMWG_VOCAB_ENGINE;
  }

  try {
    // 尝试加载 CSV
    const loader = new VocabCSVLoader();
    const data = await loader.loadCSV('words/db/csv/entries.csv');
    const active = loader.filterActive(data);
    const index = loader.buildIndex(active);

    // 创建 API
    const api = new VocabAPI(active, index);

    // 保存到全局
    window.MMWG_VOCAB_DATABASE = active;
    window.MMWG_VOCAB_INDEX = index;
    window.MMWG_VOCAB_API = api;

    // 兼容旧 API
    window.MMWG_VOCAB_ENGINE = {
      version: '2.0-csv',
      packIds: Object.keys(index.byCategory),
      getWords: (filter) => api.query(filter),
      getRandom: (count, filter) => api.getRandom(count, filter)
    };

    console.log('✅ Vocab engine initialized (CSV mode)');
    return window.MMWG_VOCAB_ENGINE;

  } catch (error) {
    console.error('❌ Failed to load CSV, falling back to manifest.js', error);

    // 降级到旧方案
    return ensureVocabEngineOld();
  }
}

// 保留旧的加载逻辑作为降级方案
function ensureVocabEngineOld() {
  // 原有的 manifest.js 加载逻辑
  // ...
}
```

**验收**：
- ✅ 游戏启动成功
- ✅ 词汇显示正确
- ✅ 控制台显示 "Vocab engine initialized (CSV mode)"
- ✅ 如果 CSV 加载失败，自动降级到 manifest.js

---

### Phase 2：验证工具（Day 1 下午）

#### Task 2.1：创建验证工具页面（2 小时）

**文件**：`tools/vocab-validator.html`

**步骤**：
1. 创建 HTML 页面（见上方"模块 3"）
2. 实现文件上传
3. 实现 CSV 解析和验证
4. 实现结果显示

**验收**：
- ✅ 可以上传 CSV 文件
- ✅ 显示验证结果
- ✅ 显示统计信息
- ✅ 显示错误和警告

---

#### Task 2.2：测试验证工具（30 分钟）

**步骤**：
1. 用正确的 CSV 测试（`entries.csv`）
2. 用错误的 CSV 测试（故意删除字段）
3. 用空 CSV 测试
4. 验证错误提示是否清晰

**验收**：
- ✅ 正确的 CSV 显示"验证通过"
- ✅ 错误的 CSV 显示具体错误
- ✅ 统计信息准确

---

### Phase 3：进度管理优化（Day 2 上午）

#### Task 3.1：实现进度压缩（1 小时）

**文件**：`src/modules/26-progress-manager.js`

**步骤**：
1. 创建 `ProgressManager` 类
2. 实现压缩保存
3. 实现解压加载
4. 兼容未压缩数据

**代码**：（见上方"模块 4"）

**测试**：
```javascript
// 测试压缩
const pm = new ProgressManager();
const testData = { /* 大量进度数据 */ };

pm.saveProgress('test_account', testData);
const loaded = pm.loadProgress('test_account');

console.log('Original:', JSON.stringify(testData).length);
console.log('Compressed:', localStorage.getItem('mmwg_progress_test_account').length);
console.log('Match:', JSON.stringify(testData) === JSON.stringify(loaded));
```

**验收**：
- ✅ 压缩率 > 50%
- ✅ 加载数据正确
- ✅ 兼容未压缩数据

---

#### Task 3.2：实现导入/导出（2 小时）

**文件**：`src/modules/26-progress-manager.js`

**步骤**：
1. 实现 `exportProgress()` 方法
2. 实现 `importProgress()` 方法
3. 实现 `downloadJSON()` 方法
4. 添加 UI 按钮

**UI 集成**：
```javascript
// 在账户管理界面添加按钮
function renderAccountActions(accountId) {
  return `
    <button onclick="exportAccountProgress('${accountId}')">
      📤 导出进度
    </button>
    <button onclick="importAccountProgress()">
      📥 导入进度
    </button>
  `;
}

function exportAccountProgress(accountId) {
  const pm = new ProgressManager();
  const data = pm.exportProgress(accountId);
  const account = window.MMWG_STORAGE.getAccount(accountId);
  pm.downloadJSON(data, `progress-${account.username}-${Date.now()}.json`);
}

function importAccountProgress() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    const text = await file.text();
    const data = JSON.parse(text);

    const pm = new ProgressManager();
    const account = pm.importProgress(data);

    alert(`✅ 导入成功！账户：${account.username}`);
    location.reload();
  };
  input.click();
}
```

**验收**：
- ✅ 可以导出进度为 JSON
- ✅ 可以导入 JSON 恢复进度
- ✅ 导入后数据正确

---

### Phase 4：测试和优化（Day 2 下午）

#### Task 4.1：完整测试（2 小时）

**测试清单**：

1. **词汇加载测试**
   - [ ] 游戏启动，词汇正确加载
   - [ ] 按难度筛选正确
   - [ ] 按分类筛选正确
   - [ ] 随机选择不重复

2. **进度保存测试**
   - [ ] 学习进度正确保存
   - [ ] 压缩后容量减少
   - [ ] 重启游戏，进度正确加载

3. **导入/导出测试**
   - [ ] 导出进度为 JSON
   - [ ] 删除账户
   - [ ] 导入 JSON 恢复进度
   - [ ] 数据完全一致

4. **验证工具测试**
   - [ ] 上传正确 CSV，显示"验证通过"
   - [ ] 上传错误 CSV，显示具体错误
   - [ ] 统计信息准确

5. **兼容性测试**
   - [ ] Chrome 测试通过
   - [ ] Firefox 测试通过
   - [ ] Edge 测试通过

---

#### Task 4.2：性能优化（1 小时）

**优化点**：

1. **CSV 加载优化**
   - 使用 Web Worker 后台加载（可选）
   - 添加加载进度提示

2. **索引优化**
   - 使用 Map 代替 Object（查询更快）
   - 添加缓存

3. **压缩优化**
   - 仅压缩大数据（> 10KB）
   - 小数据不压缩（避免性能损失）

**代码示例**：
```javascript
// 优化：仅压缩大数据
saveProgress(accountId, progressData) {
  const key = `mmwg_progress_${accountId}`;
  const jsonStr = JSON.stringify(progressData);

  // 只有数据 > 10KB 才压缩
  if (jsonStr.length > 10 * 1024) {
    const compressed = LZString.compress(jsonStr);
    localStorage.setItem(key, compressed);
  } else {
    localStorage.setItem(key, jsonStr);
  }
}
```

**验收**：
- ✅ CSV 加载时间 < 1 秒
- ✅ 查询响应时间 < 100ms
- ✅ 进度保存时间 < 500ms

---

#### Task 4.3：文档编写（1 小时）

**文档清单**：

1. **用户文档**：`docs/词库维护指南.md`
   - 如何用 Excel 编辑 CSV
   - 如何使用验证工具
   - 如何添加新词汇
   - 如何扩展新语言

2. **开发文档**：`docs/词汇系统API.md`
   - VocabAPI 使用方法
   - 查询示例
   - 扩展指南

3. **更新 CHANGELOG**：记录本次改动

---

## 验收标准

### 功能验收

- [ ] **词汇加载**
  - ✅ 从 CSV 加载 6,544 条词汇
  - ✅ 按难度/分类/类型查询正确
  - ✅ 随机选择不重复

- [ ] **进度管理**
  - ✅ 进度压缩率 > 50%
  - ✅ 导出/导入功能正常
  - ✅ 数据不丢失

- [ ] **验证工具**
  - ✅ 可以验证 CSV 格式
  - ✅ 显示统计信息
  - ✅ 错误提示清晰

- [ ] **兼容性**
  - ✅ 向后兼容（旧数据可用）
  - ✅ 降级方案可用（CSV 失败时回退）

### 性能验收

- [ ] CSV 加载时间 < 1 秒
- [ ] 查询响应时间 < 100ms
- [ ] 进度保存时间 < 500ms
- [ ] 压缩率 > 50%

### 用户体验验收

- [ ] 老师可以用 Excel 编辑 CSV
- [ ] 验证工具易于使用
- [ ] 错误提示清晰易懂
- [ ] 导入/导出流程流畅

---

## 风险和缓解

### 风险 1：CSV 解析错误

**风险**：CSV 中有特殊字符（逗号、引号、换行）导致解析错误

**缓解**：
- 使用成熟的 PapaParse 库
- 提供验证工具检查格式
- 添加错误处理和降级方案

### 风险 2：性能问题

**风险**：6,544 条数据加载慢

**缓解**：
- 一次性加载到内存（现代浏览器可以处理）
- 构建索引加速查询
- 使用 Web Worker 后台加载（可选）

### 风险 3：兼容性问题

**风险**：旧数据无法使用

**缓解**：
- 保持 API 兼容性
- 提供降级方案（回退到 manifest.js）
- 兼容未压缩数据

---

## 总结

### 核心优势

1. ✅ **简单**：CSV 格式，Excel 可编辑
2. ✅ **易维护**：老师可以自己添加词库
3. ✅ **不容易出错**：有验证工具
4. ✅ **易扩展**：添加列即可支持新语言
5. ✅ **快速**：2 天完成

### 实施时间线

- **Day 1 上午**：CSV 加载器 + 词汇 API（4 小时）
- **Day 1 下午**：验证工具（2.5 小时）
- **Day 2 上午**：进度管理优化（3 小时）
- **Day 2 下午**：测试和优化（4 小时）

**总计**：2 天（13.5 小时）

### 下一步

1. 用户确认方案
2. 开始 Phase 1 开发
3. 每个 Phase 完成后验收

---

**相关文档**：
- [轻量级方案头脑风暴](2026-03-05-alternative-solutions.md)
- [SQLite 数据库分析](2026-03-05-sqlite-analysis.md)
- [现状分析报告](2026-03-05-vocabulary-system-analysis.md)
