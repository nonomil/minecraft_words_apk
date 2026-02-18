#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const ROOT = process.cwd();
const DB_PATH = path.join(ROOT, "data", "vocab.db");
const OUT = path.join(ROOT, "reports", "vocab_db", "entries_preview.md");

function main() {
  if (!fs.existsSync(DB_PATH)) throw new Error("Missing data/vocab.db. Run vocabdb:init first.");
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  const rows = db
    .prepare(
      `SELECT id, lemma_key, word, chinese, difficulty, category, status
       FROM entries
       ORDER BY lemma_key
       LIMIT 300`
    )
    .all();

  const lines = [];
  lines.push("# Entries Preview (Top 300)");
  lines.push("");
  lines.push("| id | lemma_key | word | chinese | difficulty | category | status |");
  lines.push("|---:|---|---|---|---|---|---|");
  for (const r of rows) {
    lines.push(
      `| ${r.id} | ${String(r.lemma_key || "").replace(/\|/g, "\\|")} | ${String(r.word || "").replace(/\|/g, "\\|")} | ${String(r.chinese || "").replace(/\|/g, "\\|")} | ${String(r.difficulty || "").replace(/\|/g, "\\|")} | ${String(r.category || "").replace(/\|/g, "\\|")} | ${String(r.status || "").replace(/\|/g, "\\|")} |`
    );
  }
  fs.writeFileSync(OUT, lines.join("\n"), "utf8");
  console.log(JSON.stringify({ out: path.relative(ROOT, OUT), rows: rows.length }, null, 2));
}

main();

