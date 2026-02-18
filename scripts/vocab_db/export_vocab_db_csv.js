#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const ROOT = process.cwd();
const DB_PATH = path.join(ROOT, "data", "vocab.db");
const OUT_DIR = path.join(ROOT, "reports", "vocab_db");

function csvEscape(v) {
  const s = String(v ?? "");
  return `"${s.replace(/"/g, '""')}"`;
}

function writeCsv(file, headers, rows) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => csvEscape(row[h])).join(","));
  }
  fs.writeFileSync(file, lines.join("\n"), "utf8");
}

function main() {
  if (!fs.existsSync(DB_PATH)) {
    throw new Error(`Missing database: ${path.relative(ROOT, DB_PATH)}. Run vocabdb:build first.`);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const db = new DatabaseSync(DB_PATH);

  const entries = db.prepare("SELECT * FROM entries ORDER BY lemma_key").all();
  const images = db.prepare("SELECT * FROM entry_images ORDER BY entry_id, id").all();
  const sources = db.prepare("SELECT * FROM entry_sources ORDER BY entry_id, id").all();
  const aliases = db.prepare("SELECT * FROM entry_aliases ORDER BY entry_id, id").all();
  const runs = db.prepare("SELECT * FROM import_runs ORDER BY id DESC").all();

  writeCsv(path.join(OUT_DIR, "entries.csv"), [
    "id","lemma_key","word","standardized","chinese","phonetic","phrase","phrase_translation","difficulty","category","status","created_at","updated_at"
  ], entries);

  writeCsv(path.join(OUT_DIR, "entry_images.csv"), [
    "id","entry_id","filename","url","type","is_primary"
  ], images);

  writeCsv(path.join(OUT_DIR, "entry_sources.csv"), [
    "id","entry_id","source_file","source_group","source_version"
  ], sources);

  writeCsv(path.join(OUT_DIR, "entry_aliases.csv"), [
    "id","entry_id","alias","lang"
  ], aliases);

  writeCsv(path.join(OUT_DIR, "import_runs.csv"), [
    "id","started_at","finished_at","scanned_files","raw_rows","merged_rows","notes"
  ], runs);

  const summary = {
    generatedAt: new Date().toISOString(),
    database: path.relative(ROOT, DB_PATH),
    outDir: path.relative(ROOT, OUT_DIR),
    entries: entries.length,
    images: images.length,
    sources: sources.length,
    aliases: aliases.length,
    importRuns: runs.length,
  };
  fs.writeFileSync(path.join(OUT_DIR, "summary.json"), JSON.stringify(summary, null, 2), "utf8");
  console.log(JSON.stringify(summary, null, 2));
}

main();

