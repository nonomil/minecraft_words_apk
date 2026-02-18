#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const VOCAB_ROOT = path.join(ROOT, "js", "vocabularies");
const REPORT_DIR = path.join(ROOT, "reports", "vocab");

const EXCLUDE = [
  "backup",
  "cleanup_backups",
  "backups",
  "node_modules",
  "merge_vocabularies.js",
  "mappings.js",
  `${path.sep}normalized${path.sep}`,
];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (EXCLUDE.some((x) => full.includes(x))) continue;
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".js")) out.push(full);
  }
  return out;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function addIssue(issues, sev, type, file, count) {
  if (!count) return;
  issues.push({ severity: sev, type, file: path.relative(ROOT, file), count });
}

function main() {
  ensureDir(REPORT_DIR);
  const files = walk(VOCAB_ROOT);
  const issues = [];
  const totals = {
    emptyChinese: 0,
    emptyImageArray: 0,
    emptyImageUrl: 0,
    badUnsplashQuery: 0,
  };

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    const emptyChinese = [...text.matchAll(/"chinese"\s*:\s*""/g)].length;
    const emptyImageArray = [...text.matchAll(/"imageURLs"\s*:\s*\[\s*\]/g)].length;
    const emptyImageUrl = [...text.matchAll(/"url"\s*:\s*""/g)].length;
    const badUnsplashQuery = [...text.matchAll(/w=1080\?w=/g)].length;

    totals.emptyChinese += emptyChinese;
    totals.emptyImageArray += emptyImageArray;
    totals.emptyImageUrl += emptyImageUrl;
    totals.badUnsplashQuery += badUnsplashQuery;

    addIssue(issues, "P0", "empty_chinese", file, emptyChinese);
    addIssue(issues, "P1", "empty_image_array", file, emptyImageArray);
    addIssue(issues, "P1", "empty_image_url", file, emptyImageUrl);
    addIssue(issues, "P1", "bad_unsplash_query", file, badUnsplashQuery);
  }

  const bySeverity = issues.reduce((acc, it) => {
    acc[it.severity] = (acc[it.severity] || 0) + it.count;
    return acc;
  }, {});

  const summary = {
    generatedAt: new Date().toISOString(),
    scannedFiles: files.length,
    totals,
    bySeverity,
  };

  const csv = ["severity,type,file,count"];
  for (const it of issues) {
    csv.push(`${it.severity},${it.type},"${it.file.replace(/"/g, '""')}",${it.count}`);
  }

  fs.writeFileSync(path.join(REPORT_DIR, "quality_issues.csv"), csv.join("\n"), "utf8");
  fs.writeFileSync(path.join(REPORT_DIR, "quality_summary.json"), JSON.stringify(summary, null, 2), "utf8");

  console.log(JSON.stringify(summary, null, 2));
}

main();
