# 词库数据库维护指南

本项目提供 SQLite 词库主库，方便后续增删改与审计。

## 1. 初始化数据库

```bash
npm run vocabdb:init
```

该命令会：
1. 从 `js/vocabularies/**` 导入词条到 `data/vocab.db`
2. 导出表格到 `reports/vocab_db/*.csv`

## 2. 数据表

- `entries`: 词条主表
- `entry_images`: 图片表
- `entry_sources`: 来源表
- `entry_aliases`: 别名表
- `import_runs`: 导入记录

## 3. 常用维护命令

查看词条：
```bash
npm run vocabdb:manage -- list --limit 20
```

查看单词详情：
```bash
npm run vocabdb:manage -- show --lemma_key speed
```

新增词条：
```bash
npm run vocabdb:manage -- add --word speedrun --chinese 速通 --difficulty advanced --category gameplay
```

更新字段：
```bash
npm run vocabdb:manage -- update --lemma_key speedrun --field chinese --value 速通玩法
```

停用词条（不物理删除）：
```bash
npm run vocabdb:manage -- deactivate --lemma_key speedrun
```

给词条新增图片：
```bash
npm run vocabdb:manage -- add-image --lemma_key speedrun --url https://example.com/speedrun.png --filename speedrun.png --type "Concept Image" --primary
```

删除词条图片：
```bash
npm run vocabdb:manage -- remove-image --lemma_key speedrun --url https://example.com/speedrun.png
```

给词条新增来源：
```bash
npm run vocabdb:manage -- add-source --lemma_key speedrun --source_file "manual/speedrun.json" --source_group other --source_version 2.2.3
```

删除词条来源：
```bash
npm run vocabdb:manage -- remove-source --lemma_key speedrun --source_file "manual/speedrun.json"
```

导出业务可用 JS 词库（从 DB 反向生成）：
```bash
npm run vocabdb:export-js
```
输出文件：
`js/vocabularies/normalized/core_from_db.js`

按分组导出 JS（minecraft/kindergarten/stage/common）：
```bash
npm run vocabdb:export-grouped-js
```
输出目录：
`js/vocabularies/normalized/db_*.js`

同步运行时词库（Web + Android）：
```bash
npm run vocabdb:sync-runtime
```
输出文件：
- `js/vocabularies/normalized/runtime_vocab.js`
- `js/vocabularies/normalized/runtime_vocab_manifest.json`
- `android-app/web/js/vocabularies/normalized/runtime_vocab.js`
- `android-app/web/js/vocabularies/normalized/runtime_vocab_manifest.json`

端到端流水线（建库+导出+校验）：
```bash
npm run vocabdb:pipeline
```

## 4. 推荐工作流

1. 数据维护：在 DB 中增删改
2. 导出表格：`npm run vocabdb:export`
3. 导出业务 JS：`npm run vocabdb:export-js`
4. 导出分组 JS：`npm run vocabdb:export-grouped-js`
5. 同步运行时词库：`npm run vocabdb:sync-runtime`
6. 质量检查：`npm run vocab:validate`（或 `npm run vocab:audit`）
7. 通过后发布

## 5. 外部词库接入（候选模式）

先对比覆盖率并生成候选词：

```bash
npm run vocabdb:compare-external
```

输出：
- `reports/vocab/external_compare_summary.md`
- `reports/vocab/external_candidates_to_review.csv`

将候选词导入 DB 的 `external_candidates` 表（默认会清空旧候选后导入新候选）：

```bash
npm run vocabdb:import-candidates
```

输出：
- `reports/vocab_db/external_candidates.csv`

注意：
1. 外部词先进入 `pending_review`，不会直接进入运行时词库。
2. 必须补全中文释义、图片与来源后，才建议通过 `vocabdb:manage` 加入正式词条。
