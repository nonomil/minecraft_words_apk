# 词库维护新手指南（看这一份就够）

适用人群：不熟悉数据库/脚本，但需要长期维护单词库的人。  
目标：让你知道“现在这套改造到底有什么用”，并且能按步骤安全地增删改单词。

---

## 1. 先说结论：这些改动对你有什么实际帮助？

有，而且是长期维护最关键的帮助。  
以前维护词库，你可能会遇到这些问题：

1. 同一个词在多个文件里重复，改一次要改很多处，容易漏。
2. 图片链接、中文释义、格式问题只能靠人工找，容易出错。
3. 不知道改完有没有把词库弄坏，缺少统一校验。
4. 想导出“总表格”给人看或批量处理，不方便。

现在这套改造把它们变成了“有流程可控”：

1. **有主数据库**：`Data/vocab.db`  
   你以后可以把它理解成“词库总后台”。
2. **可导出总表格**：`reports/vocab_db/*.csv`  
   你可以直接用 Excel 看/筛选/协作。
3. **有自动校验**：`npm run vocab:validate` / `npm run vocab:audit`  
   自动告诉你有没有空中文、空图片、坏链接等问题。
4. **有一键流水线**：`npm run vocabdb:pipeline`  
   自动：建库 -> 导出 -> 同步运行时词库 -> 质量检查。

---

## 2. 你可以怎么理解现在的结构？

把它想成三层：

1. **源词库层（原始 JS 文件）**  
   路径：`js/vocabularies/**`  
   这是原有数据来源。

2. **数据库层（主维护层）**  
   路径：`Data/vocab.db`  
   这是你后续建议重点维护的一层。

3. **产物层（导出给你看/给程序用）**  
   表格：`reports/vocab_db/*.csv`  
   运行时词库：`js/vocabularies/normalized/*.js` 和 `android-app/web/js/vocabularies/normalized/*.js`

一句话：  
**数据库是“主稿”，CSV/JS 是“导出件”。**

---

## 3. 日常维护你只要记住这 5 条命令

在项目根目录运行：

1. 初始化/重建数据库（从现有词库导入）
```bash
npm run vocabdb:init
```

2. 看前 10 条词（确认数据库可读）
```bash
npm run vocabdb:manage -- list 10
```

3. 查看某个词详情
```bash
npm run vocabdb:manage -- show speed
```

4. 一键全流程（最常用）
```bash
npm run vocabdb:pipeline
```

5. 全量质量审计（需要更完整报告时）
```bash
npm run vocab:audit
```

---

## 4. 最常见的维护操作（一步一步）

## 4.1 新增一个词

示例：新增 `speedrun = 速通`

```bash
npm run vocabdb:manage -- add speedrun 速通 speedrun advanced gameplay
```

参数顺序是：
`add <word> <chinese> <standardized可选> <difficulty可选> <category可选>`

然后给它加图：
```bash
npm run vocabdb:manage -- add-image speedrun https://example.com/speedrun.png speedrun.png "Concept Image"
```

最后跑流水线：
```bash
npm run vocabdb:pipeline
```

---

## 4.2 修改一个词（比如中文释义）

示例：把 `speedrun` 中文改成“速通玩法”

```bash
npm run vocabdb:manage -- update speedrun chinese 速通玩法
```

字段可改：`word standardized chinese phonetic phrase phrase_translation difficulty category status`

改完执行：
```bash
npm run vocabdb:pipeline
```

---

## 4.3 不想删，先“停用”某个词（推荐）

```bash
npm run vocabdb:manage -- deactivate speedrun
```

这比物理删除更安全，可追踪、可恢复。

---

## 4.4 增加/删除图片

新增图片：
```bash
npm run vocabdb:manage -- add-image speed https://example.com/speed.png speed.png "Concept Image"
```

删除图片：
```bash
npm run vocabdb:manage -- remove-image speed https://example.com/speed.png
```

---

## 4.5 增加/删除来源记录（用于追踪“这个词来自哪”）

新增来源：
```bash
npm run vocabdb:manage -- add-source speed manual/speed.json other 2.2.3
```

删除来源：
```bash
npm run vocabdb:manage -- remove-source speed manual/speed.json
```

---

## 5. 怎么判断“这次维护是安全的”？

每次改完至少做这 2 步：

1. 跑：
```bash
npm run vocabdb:pipeline
```

2. 看质量结果文件：  
`reports/vocab/quality_summary.json`

你希望看到：

1. `emptyChinese = 0`
2. `emptyImageArray = 0`
3. `emptyImageUrl = 0`
4. `badUnsplashQuery = 0`

如果不是 0，就先别发布，先修再发。

---

## 6. 你最关心的“表格在哪里？”

在这里：

1. `reports/vocab_db/entries.csv`（主表）
2. `reports/vocab_db/entry_images.csv`（图片）
3. `reports/vocab_db/entry_sources.csv`（来源）
4. `reports/vocab_db/entry_aliases.csv`（别名）
5. `reports/vocab_db/entries_preview.md`（可读预览）

你可以把 `entries.csv` 直接给运营/教研做标注。

---

## 7. 推荐的每周维护节奏（简单版）

1. 周一：收集新增词/问题词（Excel 或 issue）。
2. 周二：用 `vocabdb:manage` 改数据库。
3. 周三：跑 `vocabdb:pipeline`，修复校验问题。
4. 周四：导出 CSV 给复核。
5. 周五：确认无误后提交发布。

---

## 8. 出问题怎么回退？

你现在有 3 层回退手段：

1. Git 提交回退（最推荐）
2. 本地压缩备份回退（你之前已做版本备份 zip）
3. 数据库重建回退：  
   如果 DB 出问题，直接重新执行：
```bash
npm run vocabdb:init
```
会从 `js/vocabularies/**` 重建一份新的数据库。

---

## 9. 你现在可以怎么开始（最短路径）

只做这三步：

1. `npm run vocabdb:init`
2. `npm run vocabdb:manage -- list 10`
3. `npm run vocabdb:pipeline`

这三步跑通，你就已经具备“可维护词库”的能力了。

---

## 10. 术语翻译（避免被概念劝退）

1. `SQLite`：一个本地小型数据库文件（`vocab.db`）。
2. `pipeline`：一键把一整套流程自动跑完。
3. `validate`：自动体检，检查词库有没有坏数据。
4. `dedup`：去重合并。
5. `runtime_vocab`：程序运行时直接读取的词库产物。

---

如果你愿意，下一步我可以给你再做一份“纯图文版操作手册”（每条命令配截图位），你可以直接发给任何协作者照着做。

