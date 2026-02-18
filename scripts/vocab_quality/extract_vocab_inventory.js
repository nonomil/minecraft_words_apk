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

function normalizeWord(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function main() {
  ensureDir(REPORT_DIR);
  const files = walk(VOCAB_ROOT);
  const fileStats = [];
  const unique = new Map();
  let totalWordKeys = 0;

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    const wordMatches = [...text.matchAll(/"(?:standardized|word)"\s*:\s*"([^"]+)"/g)];
    const chineseMatches = [...text.matchAll(/"chinese"\s*:\s*"([^"]*)"/g)];
    const imageEmpty = [...text.matchAll(/"imageURLs"\s*:\s*\[\s*\]/g)].length;
    const urlEmpty = [...text.matchAll(/"url"\s*:\s*""/g)].length;

    totalWordKeys += wordMatches.length;
    for (const m of wordMatches) {
      const w = normalizeWord(m[1]);
      if (!w) continue;
      unique.set(w, (unique.get(w) || 0) + 1);
    }

    fileStats.push({
      file: path.relative(ROOT, file),
      wordKeys: wordMatches.length,
      chineseKeys: chineseMatches.length,
      emptyImageArrays: imageEmpty,
      emptyImageUrls: urlEmpty,
    });
  }

  fileStats.sort((a, b) => b.wordKeys - a.wordKeys);
  const duplicates = [...unique.entries()]
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]);

  const summary = {
    generatedAt: new Date().toISOString(),
    scannedFiles: files.length,
    totalWordKeys,
    uniqueNormalizedWords: unique.size,
    duplicatedWords: duplicates.length,
  };

  fs.writeFileSync(
    path.join(REPORT_DIR, "inventory_summary.json"),
    JSON.stringify(summary, null, 2),
    "utf8"
  );
  fs.writeFileSync(
    path.join(REPORT_DIR, "file_stats.json"),
    JSON.stringify(fileStats, null, 2),
    "utf8"
  );
  fs.writeFileSync(
    path.join(REPORT_DIR, "unique_words.txt"),
    [...unique.keys()].sort().join("\n"),
    "utf8"
  );

  const dupCsv = ["word,occurrences"];
  for (const [w, c] of duplicates) dupCsv.push(`"${w.replace(/"/g, '""')}",${c}`);
  fs.writeFileSync(path.join(REPORT_DIR, "duplicate_words.csv"), dupCsv.join("\n"), "utf8");

  console.log(JSON.stringify(summary, null, 2));
}

main();
