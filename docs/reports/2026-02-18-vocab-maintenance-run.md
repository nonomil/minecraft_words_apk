# 2026-02-18 词库维护执行记录

## 执行环境

1. 路径：`g:\UserCode\minecraft_words\minecraft_words_apk-main`
2. Node：`v22.17.1`
3. 日期：`2026-02-18`

## 执行命令与结果

### 1. 重建 + 去重 + 校验

命令：

```bash
npm run vocabdb:pipeline
```

关键结果：

1. scannedFiles: `62`
2. rawRows: `9627`
3. mergedRows: `2922`
4. duplicateCollapsed: `6705`
5. quality totals:
   - emptyChinese: `0`
   - emptyImageArray: `0`
   - emptyImageUrl: `0`
   - badUnsplashQuery: `0`

---

### 2. 核心词库去重快照

命令：

```bash
npm run vocab:merge-core
```

关键结果：

1. rawRows: `7919`
2. uniqueKeys: `2906`
3. duplicateClusters: `1235`
4. output: `js/vocabularies/normalized/core_merged_dedup.js`

---

### 3. 外部词库覆盖对比

命令：

```bash
npm run vocabdb:compare-external
```

关键结果：

1. 项目 singleTokenEnglish: `1877`
2. Google 10k overlap: `1031`（coverage `10.43%`）
3. dwyl words overlap: `1665`（coverage `0.45%`）
4. candidate words（已限高频）: `2466`

输出：

1. `reports/vocab/external_compare_summary.json`
2. `reports/vocab/external_compare_summary.md`
3. `reports/vocab/external_candidates_to_review.csv`

---

### 4. 候选词导入候选表

命令：

```bash
npm run vocabdb:import-candidates
```

关键结果：

1. imported: `2466`
2. totalInTable: `2466`
3. output: `reports/vocab_db/external_candidates.csv`

## 问题与修复

1. 问题：`Missing external_candidates_to_review.csv`
2. 根因：并行执行 compare/import，import 先启动。
3. 修复：改为顺序执行。

1. 问题：`database is locked`
2. 根因：超时后的导入进程仍占用 `vocab.db`。
3. 修复：结束占用进程，再重跑。

1. 问题：候选导入太慢
2. 根因：候选量过大 + 逐条写库无事务。
3. 修复：
   - compare 阶段只保留高频候选（Google 前 3000）
   - import 阶段使用事务批量写入
   - 默认清空 `external_candidates` 再导入，避免历史脏数据累积

## 结论

当前词库维护流程可稳定复现，且已具备：

1. 自动去重
2. 自动质量校验
3. 外部词库覆盖分析
4. 候选词库分层管理（不直接污染生产词库）
