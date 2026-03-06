# 需求文档：汉语学习模式

**创建时间**: 2026-03-06
**状态**: ✅ 功能已部分实现，需要完善和测试

## 需求理解（已确认）

用户希望添加"汉语学习模式"功能：

1. **游戏内容变化**：在汉语学习模式下，游戏中显示的英文单词要改为显示汉字或短语
2. **UI 入口**：
   - 在选择档案的界面，当前选项下方增加学习模式选择
   - 游戏中可以在设置中切换学习模式
3. **影响范围**：所有显示单词的地方都需要切换
   - 黄色圆圈上的单词
   - 单词测验（挑战系统）
   - 单词闸门
   - 单词书（词汇表）
   - 复活时的连线匹配
4. **词汇数据来源**：使用现有英文词汇包的中文翻译
5. **语音朗读**：汉语模式用中文 TTS

## 🎉 重大发现：功能已部分实现！

### 已实现的部分

通过代码审查发现，双语功能的核心架构已经存在：

#### 1. UI 层（已完成）
- ✅ [Game.html:20-27](../../../Game.html#L20-L27) - 登录界面已有语言模式选择按钮
- ✅ [Game.html:204-212](../../../Game.html#L204-L212) - 设置面板已有学习语言模式下拉框和拼音显示选项

#### 2. 存储系统（已完成）
- ✅ [src/storage.js:401-469](../../../src/storage.js#L401-L469) - 已有完整的双语迁移逻辑 `migrateToBilingualV2_2_0()`
- ✅ 已支持 `languageMode` (english/chinese) 和 `showPinyin` 的存储

#### 3. 词汇系统（已完成）
- ✅ [src/modules/09-vocab.js:710-791](../../../src/modules/09-vocab.js#L710-L791) - 已有完整的双语词汇支持
  - `normalizeWordContent()` - 标准化词汇内容
  - `getCurrentLanguageMode()` - 获取当前语言模式
  - `filterWordsByLanguageMode()` - 按语言模式过滤单词
  - `getDisplayContent()` - 根据语言模式返回显示内容
  - 导出为 `window.BilingualVocab` 对象

#### 4. 词汇数据结构（已支持）
从 `normalizeWordContent()` 可以看到，词汇数据已支持：
- `word` / `en` / `standardized` - 英文单词
- `chinese` / `zh` - 中文翻译
- `pinyin` - 拼音
- `phonetic` / `uk` / `us` - 音标
- `phrase` - 英文短语
- `phraseTranslation` / `phraseZh` - 中文短语翻译
- `mode` - 词汇模式 (english/chinese/bilingual)

### 可能缺失的部分

需要检查以下模块是否已连接到 `BilingualVocab` 系统：

1. **游戏循环中的单词显示** - 黄色圆圈上的单词
2. **挑战系统** - [src/modules/12-challenges.js](../../../src/modules/12-challenges.js)
3. **单词卡显示** - `updateWordUI()` 函数
4. **TTS 系统** - 是否根据语言模式切换朗读语言
5. **UI 事件绑定** - 登录界面和设置面板的按钮是否已绑定事件

## 复杂度重新判断

### 判断结果：**可能是简单模式或 Debug 模式**

理由：
1. ✅ 核心架构已存在（双语词汇系统）
2. ✅ UI 已存在（登录界面 + 设置面板）
3. ✅ 存储系统已支持
4. ❓ 需要检查各模块是否已调用 `BilingualVocab.getDisplayContent()`
5. ❓ 需要检查 UI 事件是否已绑定

### 两种可能性

**可能性 A：功能已实现但有 Bug**
- 如果各模块已调用 `BilingualVocab` 但不工作 → 按 **Debug 流程**处理

**可能性 B：功能框架已搭建但未连接**
- 如果各模块未调用 `BilingualVocab` → 按**简单模式**处理（连接现有系统）

## 下一步行动

### Step 1: 代码审查（确认完整性）

需要检查以下文件：

1. **游戏循环和渲染**
   - [ ] `src/modules/13-game-loop.js` - 检查单词生成逻辑
   - [ ] `src/modules/14-renderer-main.js` - 检查黄色圆圈渲染
   - [ ] `src/modules/10-ui.js` - 检查 `updateWordUI()` 函数

2. **挑战系统**
   - [ ] `src/modules/12-challenges.js` - 检查挑战、闸门、复活连线

3. **事件绑定**
   - [ ] `src/modules/17-bootstrap.js` - 检查启动时的事件绑定
   - [ ] `src/modules/08-account.js` - 检查登录界面事件

4. **TTS 系统**
   - [ ] `src/tts/index.js` - 检查语音朗读逻辑

### Step 2: 根据审查结果选择流程

- 如果功能已完整实现 → 直接测试，如有问题按 Debug 流程
- 如果功能部分实现 → 按简单模式完成连接
- 如果发现架构问题 → 按复杂模式重新设计

## 存档方式设计（已确认）

基于 `migrateToBilingualV2_2_0()` 的实现，存储方式为：

**全局设置**：
```javascript
localStorage.setItem('languageMode', 'english' | 'chinese');
localStorage.setItem('showPinyin', 'true' | 'false');
```

**进度分离**：
```javascript
// 英语模式进度
localStorage.setItem('englishProgress_kg', JSON.stringify({}));
localStorage.setItem('englishProgress_game', JSON.stringify({}));

// 汉语模式进度
localStorage.setItem('chineseProgress_kg', JSON.stringify());
localStorage.setItem('chineseProgress_game', JSON.stringify({}));
```

这种设计允许：
- 全局切换学习模式
- 两种模式的进度独立保存
- 向后兼容（旧存档自动迁移到英语模式）

## 技术债务提示

从代码中发现的潜在问题：

1. **数据版本管理**：`dataVersion: '2.2.0'` 表明之前有过版本迁移
2. **迁移逻辑位置**：迁移函数在 `storage.js` 中，但可能未在启动时调用
3. **UI 状态同步**：需要确保设置面板和登录界面的状态同步

## 待确认问题

1. ✅ 现有 UI 中的语言模式选择是否已连接到后端逻辑？ → **需要检查事件绑定**
2. ✅ 词汇数据中是否已有中文字段？ → **已支持，通过 `chinese`/`zh` 字段**
3. ❓ 功能的完整性如何？哪些部分已实现，哪些未实现？ → **需要代码审查确认**
4. ❓ `initializeBilingualMigration()` 是否在启动时被调用？
