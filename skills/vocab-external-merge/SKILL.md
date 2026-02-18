---
name: vocab-external-merge
description: 对接外部词库到本项目的标准流程（对比、候选入库、人工审核、最终合入）
---

# External Vocab Merge Workflow

## Purpose

Safely integrate external vocabulary into this project without breaking quality gates.

## Rules

1. Never auto-merge external words into runtime vocab.
2. All external words must go through `pending_review`.
3. Chinese translation and image validation are mandatory before activation.

## Steps

1. Build latest DB baseline:

```bash
npm run vocabdb:pipeline
```

2. Run external coverage analysis:

```bash
npm run vocabdb:compare-external
```

3. Import candidates into staging table:

```bash
npm run vocabdb:import-candidates
```

4. Review candidate sheet:
- `reports/vocab_db/external_candidates.csv`

5. Curate shortlist (recommended 50-100 words per batch), then manually add via:
- `npm run vocabdb:manage -- add ...`
- `npm run vocabdb:manage -- add-image ...`
- `npm run vocabdb:manage -- add-source ...`

6. Re-run full quality gate:

```bash
npm run vocabdb:pipeline
```

7. Verify zero quality issues in:
- `reports/vocab/quality_summary.json`

## Done Criteria

1. Added words have Chinese + at least one valid image URL.
2. `emptyChinese/emptyImageArray/emptyImageUrl/badUnsplashQuery` are all 0.
3. Export artifacts updated in `reports/vocab_db/` and `js/vocabularies/normalized/`.
