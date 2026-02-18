#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const ROOT = process.cwd();
const DB_PATH = path.join(ROOT, "data", "vocab.db");
const OUT_DIR = path.join(ROOT, "js", "vocabularies", "normalized");

const GROUPS = ["minecraft", "kindergarten", "stage", "common", "other"];

function sanitizeConstName(name) {
  return name.toUpperCase().replace(/[^A-Z0-9]+/g, "_");
}

function pickMainGroup(sources) {
  const score = new Map();
  for (const s of sources) {
    const g = s.source_group || "other";
    score.set(g, (score.get(g) || 0) + 1);
  }
  const arr = [...score.entries()].sort((a, b) => b[1] - a[1]);
  return arr.length ? arr[0][0] : "other";
}

function main() {
  if (!fs.existsSync(DB_PATH)) throw new Error("Missing data/vocab.db. Run vocabdb:init first.");
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const db = new DatabaseSync(DB_PATH);

  const entries = db
    .prepare(
      `SELECT id, lemma_key, word, standardized, chinese, phonetic, phrase, phrase_translation, difficulty, category
       FROM entries
       WHERE status='active'
       ORDER BY lemma_key`
    )
    .all();
  const srcStmt = db.prepare(
    `SELECT source_group, source_file FROM entry_sources WHERE entry_id=? ORDER BY id`
  );
  const imgStmt = db.prepare(
    `SELECT filename, url, type FROM entry_images WHERE entry_id=? ORDER BY is_primary DESC, id ASC`
  );

  const buckets = new Map();
  for (const g of GROUPS) buckets.set(g, []);

  for (const e of entries) {
    const sources = srcStmt.all(e.id);
    const group = buckets.has(pickMainGroup(sources)) ? pickMainGroup(sources) : "other";
    const images = imgStmt.all(e.id).map((x) => ({
      filename: x.filename || "",
      url: x.url || "",
      type: x.type || "",
    }));
    buckets.get(group).push({
      word: e.word || e.standardized || e.lemma_key,
      standardized: e.standardized || e.word || e.lemma_key,
      chinese: e.chinese || "",
      phonetic: e.phonetic || "",
      phrase: e.phrase || "",
      phraseTranslation: e.phrase_translation || "",
      difficulty: e.difficulty || "",
      category: e.category || "",
      imageURLs: images,
    });
  }

  const summary = { generatedAt: new Date().toISOString(), files: [] };
  for (const [group, arr] of buckets.entries()) {
    const constName = `VOCAB_DB_${sanitizeConstName(group)}`;
    const fileName = `db_${group}.js`;
    const file = path.join(OUT_DIR, fileName);
    const content =
      `// Auto-generated from data/vocab.db by scripts/vocab_db/export_vocab_db_grouped_js.js\n` +
      `// Group: ${group}\n` +
      `const ${constName} = ${JSON.stringify(arr, null, 2)};\n`;
    fs.writeFileSync(file, content, "utf8");
    summary.files.push({ group, file: path.relative(ROOT, file), entries: arr.length });
  }

  fs.writeFileSync(
    path.join(ROOT, "reports", "vocab_db", "grouped_js_summary.json"),
    JSON.stringify(summary, null, 2),
    "utf8"
  );
  console.log(JSON.stringify(summary, null, 2));
}

main();

