#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports", "vocab");
const UNIQUE_WORDS_FILE = path.join(REPORT_DIR, "unique_words.txt");
const CONFIG_FILE = path.join(ROOT, "scripts", "vocab_quality", "benchmarks.json");

function normalizeWord(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMinecraftKeyWord(key) {
  // Example: item.minecraft.diamond_sword => diamond sword
  const parts = String(key || "").split(".");
  const tail = parts[parts.length - 1] || "";
  return normalizeWord(tail.replace(/_/g, " "));
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
        if (res.statusCode !== 200) {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            resolve(fetchText(res.headers.location));
            return;
          }
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        let data = "";
        res.on("data", (d) => (data += d));
        res.on("end", () => resolve(data));
      });
    req.setTimeout(15000, () => {
      req.destroy(new Error(`Timeout for ${url}`));
    });
    req.on("error", reject);
  });
}

async function loadSource(source) {
  const raw = await fetchText(source.url);
  if (source.type === "url_txt") {
    const lines = raw
      .split(/\r?\n/)
      .map(normalizeWord)
      .filter(Boolean);
    return source.top_n ? lines.slice(0, source.top_n) : lines;
  }
  if (source.type === "url_json_keys") {
    const obj = JSON.parse(raw);
    let arr = Object.keys(obj || {});
    if (source.minecraft_key_mode) arr = arr.map(extractMinecraftKeyWord);
    return arr.map(normalizeWord).filter(Boolean);
  }
  throw new Error(`Unsupported source type: ${source.type}`);
}

function ensurePrerequisites() {
  if (!fs.existsSync(UNIQUE_WORDS_FILE)) {
    throw new Error(`Missing ${path.relative(ROOT, UNIQUE_WORDS_FILE)}. Run vocab:extract first.`);
  }
  if (!fs.existsSync(CONFIG_FILE)) {
    throw new Error(`Missing ${path.relative(ROOT, CONFIG_FILE)}`);
  }
}

async function main() {
  ensurePrerequisites();
  const vocabWords = new Set(
    fs
      .readFileSync(UNIQUE_WORDS_FILE, "utf8")
      .split(/\r?\n/)
      .map(normalizeWord)
      .filter(Boolean)
  );
  const cfg = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
  const report = {
    generatedAt: new Date().toISOString(),
    uniqueVocabWords: vocabWords.size,
    benchmarks: [],
  };

  for (const src of cfg.sources || []) {
    try {
      const words = [...new Set(await loadSource(src))];
      const covered = words.filter((w) => vocabWords.has(w));
      const missing = words.filter((w) => !vocabWords.has(w));
      report.benchmarks.push({
        name: src.name,
        source: src.url,
        benchmarkSize: words.length,
        covered: covered.length,
        coverageRate: words.length ? Number(((covered.length / words.length) * 100).toFixed(2)) : 0,
        missingTop100: missing.slice(0, 100),
      });
    } catch (e) {
      report.benchmarks.push({
        name: src.name,
        source: src.url,
        error: e.message,
      });
    }
  }

  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(path.join(REPORT_DIR, "benchmark_coverage.json"), JSON.stringify(report, null, 2), "utf8");

  const md = [];
  md.push("# Benchmark Coverage Report");
  md.push("");
  md.push(`Generated: ${report.generatedAt}`);
  md.push(`Unique vocab words: ${report.uniqueVocabWords}`);
  md.push("");
  for (const b of report.benchmarks) {
    md.push(`## ${b.name}`);
    md.push(`Source: ${b.source}`);
    if (b.error) {
      md.push(`Status: ERROR - ${b.error}`);
      md.push("");
      continue;
    }
    md.push(`Coverage: ${b.covered}/${b.benchmarkSize} (${b.coverageRate}%)`);
    md.push(`Missing sample (top 20): ${b.missingTop100.slice(0, 20).join(", ")}`);
    md.push("");
  }
  fs.writeFileSync(path.join(REPORT_DIR, "benchmark_coverage.md"), md.join("\n"), "utf8");

  console.log(JSON.stringify(report, null, 2));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
