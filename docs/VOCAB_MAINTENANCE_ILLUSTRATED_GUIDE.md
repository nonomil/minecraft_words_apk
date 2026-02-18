# 词库维护图文指南（一步一步照做）

适用对象：第一次维护词库的人。  
目标：你只要照着执行，就能完成「去重、校验、导入候选词、导出可维护表格」。

---

## 1. 你会得到什么

执行完成后，你会拿到这些关键文件：

1. `data/vocab.db`：主词库数据库（后续维护都改这里）。
2. `reports/vocab_db/entries.csv`：全量词库主表（可直接 Excel 打开）。
3. `reports/vocab/quality_summary.json`：质量校验结果（必须全 0）。
4. `reports/vocab/external_candidates_to_review.csv`：外部词库候选词（待人工审核）。
5. `reports/vocab_db/external_candidates.csv`：候选词已入库后的总表。

---

## 2. 准备环境（只做一次）

1. 打开项目根目录终端：`g:\UserCode\minecraft_words\minecraft_words_apk-main`
2. 执行：

```bash
npm install
```

截图位（请自行替换）：
![step-01-open-terminal](./assets/vocab-guide/step-01-open-terminal.png)

---

## 3. 一键重建与去重（核心步骤）

执行：

```bash
npm run vocabdb:pipeline
```

这一步会自动完成：

1. 从原始 `js/vocabularies/**` 扫描并重建数据库。
2. 合并重复词（dedup）。
3. 导出 CSV/JS 产物。
4. 同步运行时词库（web + android）。
5. 自动质量校验。

你要关注终端里这几行（示例）：

1. `rawRows: 9627`
2. `mergedRows: 2922`
3. `duplicateCollapsed: 6705`
4. `emptyChinese: 0`
5. `emptyImageArray: 0`
6. `emptyImageUrl: 0`
7. `badUnsplashQuery: 0`

截图位：
![step-02-pipeline-success](./assets/vocab-guide/step-02-pipeline-success.png)

---

## 4. 查看全量词表（用于人工维护）

打开：

1. `reports/vocab_db/entries.csv`
2. `reports/vocab_db/entry_images.csv`
3. `reports/vocab_db/entry_sources.csv`

建议操作：

1. 在 `entries.csv` 里按 `category`、`difficulty` 筛选。
2. 把需要删除的词先标记，不直接删库。
3. 不常用词先做 `inactive`，避免误删。

截图位：
![step-03-open-csv](./assets/vocab-guide/step-03-open-csv.png)

---

## 5. 外部词库覆盖分析（判断要不要补词）

执行：

```bash
npm run vocabdb:compare-external
```

输出文件：

1. `reports/vocab/external_compare_summary.md`
2. `reports/vocab/external_candidates_to_review.csv`

当前结果（2026-02-18）：

1. 项目单词词条（单 token）：`1877`
2. 与 Google 10k（无脏词）重叠：`1031`
3. 覆盖率：`10.43%`

解释：

1. 你当前词库偏「Minecraft + 场景词」。
2. 相比通用高频词库仍有大量“通用词”未覆盖，这是正常的。
3. 是否补词取决于教学目标（游戏词优先 or 通用英语优先）。

---

## 6. 候选词入库（仅候选，不直接上线）

执行：

```bash
npm run vocabdb:import-candidates
```

输出：

1. `reports/vocab_db/external_candidates.csv`
2. SQLite 表：`external_candidates`

注意：

1. 候选词状态默认是 `pending_review`。
2. 还没有中文释义和配图，不会直接进入运行时词库。
3. 必须人工审核后再转为正式词条。

---

## 7. 日常维护最小流程（每周）

1. `npm run vocabdb:pipeline`
2. 查看 `reports/vocab/quality_summary.json`（4 项都必须为 0）
3. `npm run vocabdb:compare-external`
4. 从 `external_candidates.csv` 选一小批高价值词补充中文与配图
5. 再跑一次 `npm run vocabdb:pipeline` 验证

---

## 8. 常见问题

1. 报 `database is locked`：
先结束占用数据库的 `node` 进程，再重跑命令。
2. 覆盖率很低是不是有问题：
不是。当前是主题词库，不是通用高频词库。
3. 我怕删错词：
不要物理删除，先 `deactivate`。

---

## 9. 维护原则（非常重要）

1. 数据库是主库：`data/vocab.db`
2. 导出文件是产物：`reports/**` 和 `js/vocabularies/normalized/**`
3. 新词先候选、后审核、再上线
4. 先保质量，再谈数量

