#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const https = require("https");
const { DatabaseSync } = require("node:sqlite");

const ROOT = process.cwd();
const DB_PATH = path.join(ROOT, "data", "vocab.db");
const OUT_DIR = path.join(ROOT, "reports", "vocab");

const SOURCES = [
  {
    id: "google_10000_en",
    label: "Google 10000 English (first20hours)",
    wordsUrl:
      "https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa-no-swears.txt",
    license: "MIT",
    licenseUrl: "https://github.com/first20hours/google-10000-english/blob/master/LICENSE.md",
    candidateRankLimit: 3000,
  },
  {
    id: "dwyl_words_alpha",
    label: "dwyl English Words Alpha",
    wordsUrl: "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt",
    license: "Unlicense",
    licenseUrl: "https://github.com/dwyl/english-words/blob/master/LICENSE.md",
    candidateRankLimit: 0,
  },
];

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "if",
  "in",
  "is",
  "it",
  "not",
  "of",
  "on",
  "or",
  "that",
  "the",
  "this",
  "to",
  "was",
  "with",
]);

const NOISY_WEB_TERMS = new Set([
  "www",
  "com",
  "page",
  "search",
  "free",
  "home",
  "site",
  "web",
  "click",
  "online",
  "information",
]);

function normalizeWord(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function isSingleTokenEnWord(word) {
  return /^[a-z][a-z'-]*$/.test(word);
}

function requestText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          resolve(requestText(res.headers.location));
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`GET ${url} failed with ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      })
      .on("error", reject);
  });
}

function loadProjectWords() {
  if (!fs.existsSync(DB_PATH)) {
    throw new Error(`Missing ${path.relative(ROOT, DB_PATH)}. Run npm run vocabdb:build first.`);
  }
  const db = new DatabaseSync(DB_PATH);
  const rows = db
    .prepare("SELECT lemma_key, word, standardized, category FROM entries WHERE status='active' ORDER BY lemma_key")
    .all();

  const allLemmaSet = new Set();
  const singleWordSet = new Set();
  for (const row of rows) {
    const lemma = normalizeWord(row.lemma_key || row.standardized || row.word);
    if (!lemma) continue;
    allLemmaSet.add(lemma);
    if (!lemma.includes(" ") && isSingleTokenEnWord(lemma)) {
      singleWordSet.add(lemma);
    }
  }
  return {
    totalEntries: rows.length,
    allLemmaSet,
    singleWordSet,
  };
}

function parseWordLines(text) {
  const out = [];
  const seen = new Set();
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const w = normalizeWord(line);
    if (!w || !isSingleTokenEnWord(w)) continue;
    if (seen.has(w)) continue;
    seen.add(w);
    out.push(w);
  }
  return out;
}

function toCsv(rows, headers) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}

function buildMarkdownReport(summary) {
  const lines = [];
  lines.push("# External Vocabulary Coverage Report");
  lines.push("");
  lines.push(`Generated at: ${summary.generatedAt}`);
  lines.push("");
  lines.push("## Project Baseline");
  lines.push("");
  lines.push(`- Active entries: ${summary.project.totalEntries}`);
  lines.push(`- Normalized lemmas: ${summary.project.normalizedLemmas}`);
  lines.push(`- Single-token English lemmas: ${summary.project.singleTokenEnglish}`);
  lines.push("");
  lines.push("## Source Comparison");
  lines.push("");
  lines.push("| Source | License | External Words | Overlap (single-token) | Coverage | Missing (single-token) |");
  lines.push("|---|---|---:|---:|---:|---:|");
  for (const s of summary.sources) {
    lines.push(
      `| ${s.label} | ${s.license} | ${s.externalWords} | ${s.overlapSingleToken} | ${s.coverageSingleTokenPct}% | ${s.missingSingleToken} |`
    );
  }
  lines.push("");
  lines.push("## Candidate Intake Rule");
  lines.push("");
  lines.push("- Only stage external words as `pending` candidates.");
  lines.push("- Do not merge directly into runtime vocab without Chinese + image checks.");
  lines.push("- Prioritize words by rank, then by gameplay relevance.");
  lines.push("");
  lines.push("## License Links");
  lines.push("");
  for (const s of summary.sources) {
    lines.push(`- ${s.label}: ${s.licenseUrl}`);
  }
  lines.push("");
  return lines.join("\n");
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const project = loadProjectWords();

  const summary = {
    generatedAt: new Date().toISOString(),
    project: {
      totalEntries: project.totalEntries,
      normalizedLemmas: project.allLemmaSet.size,
      singleTokenEnglish: project.singleWordSet.size,
    },
    sources: [],
  };

  const candidateMap = new Map();

  for (const source of SOURCES) {
    const rawText = await requestText(source.wordsUrl);
    const words = parseWordLines(rawText);
    let overlapSingleToken = 0;
    const missingTop = [];

    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      if (project.singleWordSet.has(w)) {
        overlapSingleToken++;
      } else if (missingTop.length < 500) {
        missingTop.push({ rank: i + 1, word: w });
      }
      if (!project.singleWordSet.has(w) && source.candidateRankLimit > 0 && i + 1 <= source.candidateRankLimit) {
        const old = candidateMap.get(w);
        if (!old) {
          candidateMap.set(w, {
            word: w,
            best_rank: i + 1,
            sources: [source.id],
          });
        } else {
          old.best_rank = Math.min(old.best_rank, i + 1);
          if (!old.sources.includes(source.id)) old.sources.push(source.id);
        }
      }
    }

    const coverage = words.length ? ((overlapSingleToken / words.length) * 100).toFixed(2) : "0.00";
    summary.sources.push({
      id: source.id,
      label: source.label,
      license: source.license,
      licenseUrl: source.licenseUrl,
      wordsUrl: source.wordsUrl,
      externalWords: words.length,
      overlapSingleToken,
      coverageSingleTokenPct: coverage,
      missingSingleToken: words.length - overlapSingleToken,
      topMissingPreview: missingTop.slice(0, 50),
    });
  }

  const candidateRows = Array.from(candidateMap.values())
    .sort((a, b) => a.best_rank - b.best_rank || a.word.localeCompare(b.word))
    .map((r) => ({
      word: r.word,
      best_rank: r.best_rank,
      source_ids: r.sources.join("|"),
      status: "pending_review",
      chinese: "",
      category_hint: "common",
      note: "Need Chinese translation + image verification before activation",
    }));

  const summaryPath = path.join(OUT_DIR, "external_compare_summary.json");
  const markdownPath = path.join(OUT_DIR, "external_compare_summary.md");
  const candidatesPath = path.join(OUT_DIR, "external_candidates_to_review.csv");
  const recommendedPath = path.join(OUT_DIR, "recommended_additions_top200.csv");
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf8");
  fs.writeFileSync(markdownPath, buildMarkdownReport(summary), "utf8");
  fs.writeFileSync(
    candidatesPath,
    toCsv(candidateRows, ["word", "best_rank", "source_ids", "status", "chinese", "category_hint", "note"]),
    "utf8"
  );
  const recommendedRows = candidateRows
    .filter((r) => r.source_ids.includes("google_10000_en"))
    .filter((r) => !STOPWORDS.has(r.word))
    .filter((r) => !NOISY_WEB_TERMS.has(r.word))
    .filter((r) => r.word.length >= 3)
    .slice(0, 200)
    .map((r) => ({
      word: r.word,
      best_rank: r.best_rank,
      category_hint: "common",
      priority: r.best_rank <= 300 ? "P1" : r.best_rank <= 1000 ? "P2" : "P3",
      note: "Recommended for general learning coverage",
    }));
  fs.writeFileSync(recommendedPath, toCsv(recommendedRows, ["word", "best_rank", "category_hint", "priority", "note"]), "utf8");

  console.log(
    JSON.stringify(
      {
        generatedAt: summary.generatedAt,
        project: summary.project,
        sources: summary.sources.map((s) => ({
          id: s.id,
          externalWords: s.externalWords,
          overlapSingleToken: s.overlapSingleToken,
          coverageSingleTokenPct: s.coverageSingleTokenPct,
        })),
        candidates: candidateRows.length,
        outputs: {
          summaryJson: path.relative(ROOT, summaryPath),
          summaryMarkdown: path.relative(ROOT, markdownPath),
          candidatesCsv: path.relative(ROOT, candidatesPath),
          recommendedCsv: path.relative(ROOT, recommendedPath),
        },
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err.stack || String(err));
  process.exit(1);
});
