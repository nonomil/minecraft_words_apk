#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports", "vocab");
const COVERAGE_FILE = path.join(REPORT_DIR, "benchmark_coverage.json");
const DUP_FILE = path.join(REPORT_DIR, "duplicate_words.csv");
const UNIQUE_FILE = path.join(REPORT_DIR, "unique_words.txt");

const WEB_NOISE = new Set([
  "page",
  "site",
  "search",
  "online",
  "business",
  "contact",
  "services",
  "service",
  "copyright",
  "email",
  "software",
  "product",
  "products",
  "info",
  "date",
  "click",
  "price",
  "post",
  "policy",
  "data",
]);

function normalize(s) {
  return String(s || "").trim().toLowerCase();
}

function readUnique() {
  return new Set(
    fs
      .readFileSync(UNIQUE_FILE, "utf8")
      .split(/\r?\n/)
      .map(normalize)
      .filter(Boolean)
  );
}

function parseDuplicateCsv() {
  if (!fs.existsSync(DUP_FILE)) return [];
  const lines = fs.readFileSync(DUP_FILE, "utf8").split(/\r?\n/).slice(1).filter(Boolean);
  return lines.map((line) => {
    const m = line.match(/^"?(.*?)"?,(\d+)$/);
    if (!m) return null;
    return { word: normalize(m[1].replace(/""/g, '"')), occurrences: Number(m[2]) };
  }).filter(Boolean);
}

function main() {
  if (!fs.existsSync(COVERAGE_FILE) || !fs.existsSync(UNIQUE_FILE)) {
    throw new Error("Missing coverage or unique words report. Run vocab:audit first.");
  }
  const coverage = JSON.parse(fs.readFileSync(COVERAGE_FILE, "utf8"));
  const unique = readUnique();
  const duplicates = parseDuplicateCsv();

  const top3000 = coverage.benchmarks.find((b) => b.name === "google_10000_top3000");
  const minecraft = coverage.benchmarks.find((b) => b.name === "minecraft_lang_keys");

  const addCandidates = [];
  if (top3000 && Array.isArray(top3000.missingTop100)) {
    for (const w of top3000.missingTop100) {
      const nw = normalize(w);
      if (!nw || nw.length < 2 || WEB_NOISE.has(nw)) continue;
      if (unique.has(nw)) continue;
      addCandidates.push({ word: nw, source: "google_top3000", priority: "high" });
    }
  }

  if (minecraft && Array.isArray(minecraft.missingTop100)) {
    for (const w of minecraft.missingTop100) {
      const nw = normalize(w);
      if (!nw || nw.length < 3) continue;
      if (unique.has(nw)) continue;
      addCandidates.push({ word: nw, source: "minecraft_lang", priority: "medium" });
    }
  }

  const dedupAdd = [];
  const seenAdd = new Set();
  for (const c of addCandidates) {
    const key = c.word;
    if (seenAdd.has(key)) continue;
    seenAdd.add(key);
    dedupAdd.push(c);
  }

  const removeCandidates = duplicates
    .filter((d) => d.occurrences >= 8)
    .map((d) => ({
      word: d.word,
      reason: "high_duplicate_frequency",
      occurrences: d.occurrences,
      action: "merge_not_delete",
    }));

  const addCsv = ["word,source,priority"];
  for (const r of dedupAdd) addCsv.push(`${r.word},${r.source},${r.priority}`);
  const removeCsv = ["word,reason,occurrences,action"];
  for (const r of removeCandidates) removeCsv.push(`${r.word},${r.reason},${r.occurrences},${r.action}`);

  fs.writeFileSync(path.join(REPORT_DIR, "add_candidates.csv"), addCsv.join("\n"), "utf8");
  fs.writeFileSync(path.join(REPORT_DIR, "remove_candidates.csv"), removeCsv.join("\n"), "utf8");

  const summary = {
    generatedAt: new Date().toISOString(),
    addCandidates: dedupAdd.length,
    removeCandidates: removeCandidates.length,
  };
  fs.writeFileSync(path.join(REPORT_DIR, "candidate_summary.json"), JSON.stringify(summary, null, 2), "utf8");
  console.log(JSON.stringify(summary, null, 2));
}

main();

