---
name: vocab-quality-governor
description: Validate vocabulary quality, image integrity, and benchmark coverage for all vocabulary files.
---

# Vocab Quality Governor

## Goal
Provide a repeatable workflow to audit all vocabulary files and generate actionable reports for:
- schema/data quality
- duplicate words and conflicts
- image-link health indicators
- coverage against external benchmark vocab lists

## Commands

Run full audit:
```bash
npm run vocab:audit
```

Run modules separately:
```bash
npm run vocab:extract
npm run vocab:validate
npm run vocab:bench
npm run vocab:candidates
npm run vocab:autofix
npm run vocab:missing-images
npm run vocab:merge-core
```

## Outputs

All outputs are generated under:
`reports/vocab/`

Key files:
- `inventory_summary.json`
- `file_stats.json`
- `unique_words.txt`
- `duplicate_words.csv`
- `quality_summary.json`
- `quality_issues.csv`
- `benchmark_coverage.json`
- `benchmark_coverage.md`
- `autofix_report.json`
- `missing_images.csv`
- `merge_summary.json`
- `merge_clusters.csv`

## Decision Rules

P0 blockers:
- empty or missing Chinese translation on production vocab entries
- conflicting duplicate canonical words that map to incompatible meanings

P1 issues:
- empty image arrays or empty image URLs
- malformed URL patterns (for example duplicated query fragments)
- low benchmark coverage in core learning sets

P2 improvements:
- rebalance uncommon words into advanced packs
- add high-frequency missing words from benchmark gap list

## Maintenance

Benchmark sources are configured in:
`scripts/vocab_quality/benchmarks.json`

Update sources there, then rerun:
```bash
npm run vocab:bench
```
