# 🛠️ 开发指南

本文档介绍如何设置开发环境和参与项目开发。

## 目录
- [环境要求](#环境要求)
- [项目结构](#项目结构)
- [开发环境配置](#开发环境配置)
- [代码规范](#代码规范)
- [调试技巧](#调试技巧)
- [贡献指南](#贡献指南)

---

## 环境要求

### 基础开发
- **浏览器**: Chrome 90+ / Firefox 88+ / Edge 90+
- **代码编辑器**: VS Code (推荐) / WebStorm
- **Git**: 2.0+

### Android开发
- **Node.js**: 16.0+ (推荐 18.x LTS)
- **npm**: 8.0+
- **Android Studio**: 2021.1.1+
- **JDK**: 17
- **Capacitor CLI**: 5.0+

### 可选工具
- **Python**: 3.8+ (用于词库处理脚本)
- **http-server**: 本地Web服务器

---

## 项目结构

```
MineCraft学单词游戏-v2/
├── index.html              # 主HTML文件
├── css/                    # 样式文件
│   ├── styles.css         # 主样式
│   ├── mobile-app.css     # 移动端样式
│   ├── variables.css      # CSS变量
│   └── ...
├── js/                     # JavaScript文件
│   ├── config.js          # 配置文件
│   ├── game.js            # 游戏核心逻辑
│   ├── vocabulary.js      # 词库管理
│   ├── quiz.js            # 拼写测试
│   ├── settings.js        # 设置管理
│   ├── mobile-app.js      # 移动端UI管理
│   ├── device-mode.js     # 设备模式切换
│   ├── data-migration.js  # 数据迁移和备份
│   └── ...
├── Data/                   # 词库数据
│   ├── vocabulary_kindergarten.json
│   ├── vocabulary_primary.json
│   └── ...
├── android-app/            # Android项目
│   ├── android/           # 原生Android代码
│   ├── web/               # Web资源(同步自根目录)
│   ├── capacitor.config.json
│   └── package.json
├── docs/                   # 文档
│   ├── FEATURES.md
│   ├── DEVELOPMENT.md
│   └── ...
├── .github/                # GitHub配置
│   └── workflows/         # GitHub Actions
│       ├── android-debug.yml
│       └── win-exe-online.yml
├── scripts/                # 工具脚本
├── README.md
└── package.json
```

---

## 开发环境配置

### 1. 克隆项目

```bash
git clone https://github.com/你的用户名/MineCraft学单词游戏-v2.git
cd MineCraft学单词游戏-v2
```

### 2. Web开发

#### 方法A: 直接打开HTML
双击 `index.html` 在浏览器中打开。

#### 方法B: 使用本地服务器 (推荐)

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx http-server -p 8000

# 使用 VS Code Live Server 扩展
# 右键 index.html -> Open with Live Server
```

访问 `http://localhost:8000`

### 3. Android开发

#### 安装依赖

```bash
cd android-app
npm install
```

#### 同步Web资源

```bash
npm run sync
```

这会将根目录的 `index.html`, `css/`, `js/`, `Data/` 复制到 `android-app/web/`

#### 同步Capacitor配置

```bash
npx cap sync
```

#### 在Android Studio中打开

```bash
npx cap open android
```

#### 构建APK

在Android Studio中:
1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. 或者 Build → Generate Signed Bundle / APK (发布版本)

---

## 代码规范

### JavaScript

#### 命名规范
- **变量/函数**: camelCase
  ```javascript
  let currentWordIndex = 0;
  function updateWordDisplay() { }
  ```

- **常量**: UPPER_SNAKE_CASE
  ```javascript
  const MAX_TRIAL_WORDS = 20;
  const STORAGE_KEYS = { ... };
  ```

- **类**: PascalCase
  ```javascript
  class MobileAppManager { }
  ```

#### 代码风格
- 使用 ES6+ 语法
- 优先使用 `const`, 其次 `let`, 避免 `var`
- 使用箭头函数
- 使用模板字符串

```javascript
// ✅ 推荐
const greet = (name) => `Hello, ${name}!`;

// ❌ 不推荐
var greet = function(name) {
  return 'Hello, ' + name + '!';
};
```

#### 注释规范

```javascript
/**
 * 更新单词显示
 * @param {number} index - 单词索引
 * @returns {void}
 */
function updateWordDisplay(index) {
  // 实现代码
}
```

### CSS

#### 命名规范
- 使用 kebab-case
- 使用BEM命名法(可选)

```css
/* 组件 */
.word-card { }

/* 元素 */
.word-card__title { }

/* 修饰符 */
.word-card--highlighted { }
```

#### 组织结构
1. 布局属性 (display, position, float)
2. 盒模型 (width, height, margin, padding)
3. 视觉属性 (color, background, border)
4. 文本属性 (font, text-align)
5. 其他 (cursor, transition)

```css
.example {
  /* 布局 */
  display: flex;
  position: relative;
  
  /* 盒模型 */
  width: 100%;
  padding: 16px;
  
  /* 视觉 */
  background: white;
  border-radius: 8px;
  
  /* 文本 */
  font-size: 14px;
  
  /* 其他 */
  transition: all 0.3s;
}
```

### HTML

- 使用语义化标签
- 合理使用 `id` 和 `class`
- 添加必要的 `aria-*` 属性

```html
<!-- ✅ 推荐 -->
<button class="btn btn-primary" aria-label="下一个单词">
  下一个
</button>

<!-- ❌ 不推荐 -->
<div onclick="next()">下一个</div>
```

---

## 调试技巧

### 浏览器开发者工具

#### Console调试
```javascript
// 在代码中添加断点
debugger;

// 输出调试信息
console.log('Current word:', currentWord);
console.table(vocabularyData);
```

#### LocalStorage检查
```javascript
// 查看所有存储
console.log(localStorage);

// 查看特定键
console.log(localStorage.getItem('settings'));

// 清除存储
localStorage.clear();
```

### 移动端调试

#### Chrome远程调试
1. 手机开启USB调试
2. 连接电脑
3. Chrome访问 `chrome://inspect`
4. 选择设备和页面

#### Android Studio Logcat
查看WebView日志:
```
adb logcat | grep -i "chromium"
```

### 常见问题调试

#### 词库加载失败
```javascript
// 检查词库路径
console.log('Vocabulary path:', vocabularyPath);

// 检查fetch响应
fetch(vocabularyPath)
  .then(r => console.log('Response:', r))
  .catch(e => console.error('Error:', e));
```

#### TTS不工作
```javascript
// 检查浏览器支持
if ('speechSynthesis' in window) {
  console.log('TTS supported');
  console.log('Voices:', speechSynthesis.getVoices());
} else {
  console.error('TTS not supported');
}
```

#### 移动端布局问题
```javascript
// 检查设备模式
console.log('Device mode:', getSettings().deviceMode);
console.log('Window width:', window.innerWidth);

// 检查移动端UI状态
if (window.mobileApp) {
  console.log('Mobile app active:', window.mobileApp.currentView);
}
```

---

## 贡献指南

### 提交Issue

提交Bug报告时请包含:
- 问题描述
- 复现步骤
- 预期行为
- 实际行为
- 浏览器/设备信息
- 截图(如适用)

### 提交Pull Request

1. Fork项目
2. 创建特性分支
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. 提交更改
   ```bash
   git commit -m "Add amazing feature"
   ```

4. 推送到分支
   ```bash
   git push origin feature/amazing-feature
   ```

5. 创建Pull Request

### Commit规范

使用语义化提交信息:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type类型**:
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式(不影响功能)
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具相关

**示例**:
```
feat(quiz): 添加听写模式

- 实现听写模式逻辑
- 添加模式切换UI
- 更新测试流程

Closes #123
```

---

## 测试

### 手动测试清单

#### 基础功能
- [ ] 词库加载正常
- [ ] 单词切换正常
- [ ] TTS语音正常
- [ ] 图片显示正常

#### 拼写测试
- [ ] 标准拼写模式
- [ ] 首字母拼写模式
- [ ] 听写模式
- [ ] 提示功能
- [ ] 成绩计算

#### 移动端
- [ ] 手机模式自动切换
- [ ] 底部导航正常
- [ ] 视图切换正常
- [ ] 触摸操作流畅

#### 数据管理
- [ ] 进度保存
- [ ] 数据导出
- [ ] 数据导入
- [ ] 备份/恢复

### 浏览器兼容性测试
- [ ] Chrome (最新版)
- [ ] Firefox (最新版)
- [ ] Safari (最新版)
- [ ] Edge (最新版)
- [ ] 移动端浏览器

---

## 性能优化

### 建议
1. **延迟加载**: 词库按需加载
2. **图片优化**: 使用WebP格式,压缩图片
3. **缓存策略**: 合理使用LocalStorage
4. **代码分割**: 按功能模块分割JS文件
5. **CSS优化**: 避免复杂选择器,使用CSS变量

### 性能监控
```javascript
// 测量加载时间
console.time('vocabulary-load');
loadVocabulary().then(() => {
  console.timeEnd('vocabulary-load');
});

// 测量函数执行时间
performance.mark('start');
someFunction();
performance.mark('end');
performance.measure('duration', 'start', 'end');
console.log(performance.getEntriesByName('duration')[0].duration);
```

---

## 发布流程

### 版本号规范
遵循语义化版本 (Semantic Versioning):
- **主版本号**: 不兼容的API修改
- **次版本号**: 向下兼容的功能新增
- **修订号**: 向下兼容的问题修正

示例: `2.2.0`

### 发布步骤

1. 更新版本号
   - `package.json`
   - `android-app/android/app/build.gradle` (versionCode和versionName)
   - `version.json`

2. 更新 CHANGELOG.md

3. 提交更改
   ```bash
   git add .
   git commit -m "chore: release v2.2.0"
   git tag v2.2.0
   ```

4. 推送到GitHub
   ```bash
   git push origin main
   git push origin v2.2.0
   ```

5. GitHub Actions自动构建APK

6. 在GitHub Releases创建发布说明

---

## 资源

### 学习资源
- [MDN Web Docs](https://developer.mozilla.org/)
- [Capacitor文档](https://capacitorjs.com/docs)
- [Android开发文档](https://developer.android.com/)

### 工具推荐
- [VS Code](https://code.visualstudio.com/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Android Studio](https://developer.android.com/studio)

---

## 获取帮助

- 提交Issue: [GitHub Issues](https://github.com/你的用户名/MineCraft学单词游戏-v2/issues)
- 讨论区: [GitHub Discussions](https://github.com/你的用户名/MineCraft学单词游戏-v2/discussions)
- 邮件: your-email@example.com
