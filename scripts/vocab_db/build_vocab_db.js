#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const ROOT = process.cwd();
const SRC_ROOT = path.join(ROOT, "js", "vocabularies");
const DB_DIR = path.join(ROOT, "data");
const DB_PATH = path.join(DB_DIR, "vocab.db");

const EXCLUDE_SEGMENTS = [
  "backup",
  "cleanup_backups",
  "backups",
  "node_modules",
  `${path.sep}normalized${path.sep}`,
  "mappings.js",
  "merge_vocabularies.js",
];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (EXCLUDE_SEGMENTS.some((x) => full.includes(x))) continue;
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

function extractArrayLiteral(text) {
  const m = text.match(/const\s+[A-Za-z0-9_]+\s*=\s*(\[[\s\S]*\])\s*;?\s*$/m);
  if (!m) return null;
  return m[1];
}

function loadArray(file) {
  try {
    const text = fs.readFileSync(file, "utf8");
    const literal = extractArrayLiteral(text);
    if (!literal) return null;
    // eslint-disable-next-line no-new-func
    const arr = new Function(`return (${literal});`)();
    return Array.isArray(arr) ? arr : null;
  } catch {
    return null;
  }
}

function scoreEntry(e) {
  let s = 0;
  if (e.chinese) s += 3;
  if (e.phonetic) s += 1;
  if (e.phrase) s += 1;
  if (Array.isArray(e.imageURLs) && e.imageURLs.length > 0) s += 2;
  if (e.difficulty) s += 1;
  if (e.category) s += 1;
  return s;
}

function mergeMissing(base, incoming) {
  const out = { ...base };
  for (const k of Object.keys(incoming || {})) {
    const v = incoming[k];
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      if (!Array.isArray(out[k]) || out[k].length === 0) out[k] = v;
      continue;
    }
    if (typeof v === "string") {
      if (!out[k] || String(out[k]).trim() === "") out[k] = v;
      continue;
    }
    if (typeof out[k] === "undefined") out[k] = v;
  }
  return out;
}

function ensureSchema(db) {
  db.exec(`
    PRAGMA foreign_keys=ON;

    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lemma_key TEXT NOT NULL UNIQUE,
      word TEXT,
      standardized TEXT,
      chinese TEXT,
      phonetic TEXT,
      phrase TEXT,
      phrase_translation TEXT,
      difficulty TEXT,
      category TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS entry_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entry_id INTEGER NOT NULL,
      filename TEXT,
      url TEXT,
      type TEXT,
      is_primary INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY(entry_id) REFERENCES entries(id) ON DELETE CASCADE
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_entry_images_unique
      ON entry_images(entry_id, url);

    CREATE TABLE IF NOT EXISTS entry_sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entry_id INTEGER NOT NULL,
      source_file TEXT NOT NULL,
      source_group TEXT,
      source_version TEXT,
      FOREIGN KEY(entry_id) REFERENCES entries(id) ON DELETE CASCADE
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_entry_sources_unique
      ON entry_sources(entry_id, source_file);

    CREATE TABLE IF NOT EXISTS entry_aliases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entry_id INTEGER NOT NULL,
      alias TEXT NOT NULL,
      lang TEXT NOT NULL DEFAULT 'en',
      FOREIGN KEY(entry_id) REFERENCES entries(id) ON DELETE CASCADE
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_entry_aliases_unique
      ON entry_aliases(entry_id, alias, lang);

    CREATE TABLE IF NOT EXISTS import_runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      started_at TEXT NOT NULL,
      finished_at TEXT,
      scanned_files INTEGER NOT NULL DEFAULT 0,
      raw_rows INTEGER NOT NULL DEFAULT 0,
      merged_rows INTEGER NOT NULL DEFAULT 0,
      notes TEXT
    );
  `);
}

function sourceGroup(relFile) {
  if (relFile.includes(`${path.sep}minecraft${path.sep}`)) return "minecraft";
  if (relFile.includes(`${path.sep}stage${path.sep}`)) return "stage";
  if (relFile.includes(`${path.sep}kindergarten${path.sep}`)) return "kindergarten";
  if (relFile.includes(`${path.sep}common${path.sep}`)) return "common";
  return "other";
}

function main() {
  fs.mkdirSync(DB_DIR, { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  ensureSchema(db);

  db.exec(`
    DELETE FROM entry_aliases;
    DELETE FROM entry_sources;
    DELETE FROM entry_images;
    DELETE FROM entries;
  `);

  const startedAt = new Date().toISOString();
  const runStmt = db.prepare(
    `INSERT INTO import_runs(started_at, scanned_files, raw_rows, merged_rows, notes)
     VALUES(?, 0, 0, 0, ?)`
  );
  const runRes = runStmt.run(startedAt, "rebuild from js/vocabularies");
  const runId = Number(runRes.lastInsertRowid);

  const files = walk(SRC_ROOT);
  const grouped = new Map();
  let rawRows = 0;

  for (const file of files) {
    const arr = loadArray(file);
    if (!arr) continue;
    const rel = path.relative(ROOT, file);
    for (const item of arr) {
      if (!item || typeof item !== "object") continue;
      const key = normalizeWord(item.standardized || item.word);
      if (!key) continue;
      rawRows++;
      const row = { item, sourceFile: rel, sourceGroup: sourceGroup(rel) };
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(row);
    }
  }

  const insertEntry = db.prepare(`
    INSERT INTO entries(
      lemma_key, word, standardized, chinese, phonetic, phrase, phrase_translation, difficulty, category, status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?)
  `);
  const insertImage = db.prepare(`
    INSERT OR IGNORE INTO entry_images(entry_id, filename, url, type, is_primary)
    VALUES (?, ?, ?, ?, ?)
  `);
  const insertSource = db.prepare(`
    INSERT OR IGNORE INTO entry_sources(entry_id, source_file, source_group, source_version)
    VALUES (?, ?, ?, ?)
  `);
  const insertAlias = db.prepare(`
    INSERT OR IGNORE INTO entry_aliases(entry_id, alias, lang)
    VALUES (?, ?, 'en')
  `);

  const now = new Date().toISOString();
  let mergedRows = 0;

  for (const [key, rows] of grouped.entries()) {
    rows.sort((a, b) => scoreEntry(b.item) - scoreEntry(a.item));
    let canonical = { ...rows[0].item };
    for (let i = 1; i < rows.length; i++) canonical = mergeMissing(canonical, rows[i].item);

    const entryRes = insertEntry.run(
      key,
      canonical.word || canonical.standardized || key,
      canonical.standardized || canonical.word || key,
      canonical.chinese || "",
      canonical.phonetic || "",
      canonical.phrase || "",
      canonical.phraseTranslation || "",
      canonical.difficulty || "",
      canonical.category || "",
      now,
      now
    );
    const entryId = Number(entryRes.lastInsertRowid);
    mergedRows++;

    const seenUrls = new Set();
    const images = Array.isArray(canonical.imageURLs) ? canonical.imageURLs : [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i] || {};
      const url = String(img.url || "").trim();
      if (!url || seenUrls.has(url)) continue;
      seenUrls.add(url);
      insertImage.run(entryId, img.filename || "", url, img.type || "", i === 0 ? 1 : 0);
    }

    for (const row of rows) {
      insertSource.run(entryId, row.sourceFile, row.sourceGroup, "2.2.3");
      const alias = normalizeWord(row.item.word || row.item.standardized);
      if (alias && alias !== key) insertAlias.run(entryId, alias);
    }
  }

  db.prepare(
    `UPDATE import_runs
       SET finished_at=?, scanned_files=?, raw_rows=?, merged_rows=?
     WHERE id=?`
  ).run(new Date().toISOString(), files.length, rawRows, mergedRows, runId);

  const summary = {
    database: path.relative(ROOT, DB_PATH),
    scannedFiles: files.length,
    rawRows,
    mergedRows,
    duplicateCollapsed: rawRows - mergedRows,
    importRunId: runId,
  };
  console.log(JSON.stringify(summary, null, 2));
}

main();

