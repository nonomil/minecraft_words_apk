# 词库学习效果优化 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 建立“可持续维护 + 可量化提升学习效果”的词库流程，避免人工混乱增删词。  
**Architecture:** 以 `data/vocab.db` 为主库；外部词先进入 `external_candidates` 候选池；人工审核后再入正式词库；全程通过质量门禁验证。  
**Tech Stack:** Node.js, SQLite (`node:sqlite`), CSV/Markdown 报告, npm scripts

---

### Task 1: 稳定主词库重建流程

**Files:**
- Verify: `scripts/vocab_db/build_vocab_db.js`
- Verify: `scripts/vocab_db/export_vocab_db_csv.js`
- Verify: `scripts/vocab_quality/validate_vocab.js`
- Output: `reports/vocab/quality_summary.json`

**Step 1:** 执行 `npm run vocabdb:pipeline`  
**Step 2:** 检查 `mergedRows`、`duplicateCollapsed` 是否有输出  
**Step 3:** 检查质量 4 指标是否全 0  
**Step 4:** 将结果写入执行报告

---

### Task 2: 建立外部词库覆盖分析

**Files:**
- Create/Modify: `scripts/vocab_db/compare_external_vocab.js`
- Output: `reports/vocab/external_compare_summary.json`
- Output: `reports/vocab/external_compare_summary.md`
- Output: `reports/vocab/external_candidates_to_review.csv`
- Output: `reports/vocab/recommended_additions_top200.csv`

**Step 1:** 下载并解析外部词表（Google 10k + dwyl）  
**Step 2:** 与本地单 token 词表做覆盖对比  
**Step 3:** 生成候选词 CSV（仅 `pending_review`）  
**Step 4:** 生成推荐补词 Top200

---

### Task 3: 建立候选词数据库分层

**Files:**
- Create/Modify: `scripts/vocab_db/import_external_candidates.js`
- Output: `reports/vocab_db/external_candidates.csv`
- DB Table: `external_candidates`

**Step 1:** 创建 `external_candidates` 表  
**Step 2:** 事务批量导入候选词  
**Step 3:** 默认清空旧候选，保证结果可复现  
**Step 4:** 导出候选总表 CSV

---

### Task 4: 维护文档与图文手册

**Files:**
- Create: `docs/VOCAB_MAINTENANCE_ILLUSTRATED_GUIDE.md`
- Create: `docs/assets/vocab-guide/README.md`
- Create: `docs/reports/2026-02-18-vocab-maintenance-run.md`
- Modify: `docs/VOCAB_DB.md`
- Modify: `README.md`

**Step 1:** 编写面向新手的图文步骤  
**Step 2:** 补截图位规范与文件名  
**Step 3:** 写本次实际执行报告  
**Step 4:** 将新流程接入现有文档入口

---

### Task 5: 技能化沉淀（可重复调用）

**Files:**
- Create: `skills/vocab-external-merge/SKILL.md`

**Step 1:** 固化“外部词库对比 -> 候选入库 -> 人工审核 -> 正式合入”流程  
**Step 2:** 安装到本地技能目录  
**Step 3:** 作为后续维护 SOP 使用

---

### 验收标准

1. `npm run vocabdb:pipeline` 成功。  
2. `reports/vocab/quality_summary.json` 四项质量指标全 0。  
3. 外部对比与候选清单生成成功。  
4. 有图文手册 + 执行报告 + 技能文档。  
5. 候选词不会直接污染运行时词库。
