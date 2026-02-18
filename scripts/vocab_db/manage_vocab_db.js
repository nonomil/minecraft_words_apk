#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const ROOT = process.cwd();
const DB_PATH = path.join(ROOT, "data", "vocab.db");

function normalizeWord(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const cur = argv[i];
    if (cur.startsWith("--")) {
      const key = cur.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) args[key] = true;
      else {
        args[key] = next;
        i++;
      }
    } else args._.push(cur);
  }
  return args;
}

function requireDb() {
  if (!fs.existsSync(DB_PATH)) throw new Error(`Missing ${path.relative(ROOT, DB_PATH)}. Run vocabdb:build first.`);
  return new DatabaseSync(DB_PATH);
}

function cmdList(db, args) {
  const positionalLimit = Number(args._[1] || 0);
  const limit = Number(args.limit || (positionalLimit > 0 ? positionalLimit : 30));
  const rows = db
    .prepare("SELECT id, lemma_key, word, chinese, difficulty, category, status FROM entries ORDER BY lemma_key LIMIT ?")
    .all(limit);
  console.table(rows);
}

function cmdAdd(db, args) {
  const word = String(args.word || args._[1] || "").trim();
  const chinese = String(args.chinese || args._[2] || "").trim();
  if (!word || !chinese) throw new Error("add requires --word and --chinese");
  const standardized = String(args.standardized || args._[3] || word).trim();
  const lemmaKey = normalizeWord(standardized || word);
  const now = new Date().toISOString();

  const exists = db.prepare("SELECT id FROM entries WHERE lemma_key=?").get(lemmaKey);
  if (exists) throw new Error(`lemma_key already exists: ${lemmaKey}`);

  const res = db
    .prepare(
      `INSERT INTO entries(
        lemma_key, word, standardized, chinese, phonetic, phrase, phrase_translation, difficulty, category, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?)`
    )
    .run(
      lemmaKey,
      word,
      standardized,
      chinese,
      args.phonetic || "",
      args.phrase || "",
      args.phrase_translation || "",
      args.difficulty || args._[4] || "",
      args.category || args._[5] || "",
      now,
      now
    );
  console.log(`Added entry id=${res.lastInsertRowid}, lemma_key=${lemmaKey}`);
}

function cmdUpdate(db, args) {
  const lemmaKey = normalizeWord(args.lemma_key || args._[1] || "");
  const field = String(args.field || args._[2] || "").trim();
  const value = String(args.value ?? args._[3] ?? "");
  const allowed = new Set([
    "word",
    "standardized",
    "chinese",
    "phonetic",
    "phrase",
    "phrase_translation",
    "difficulty",
    "category",
    "status",
  ]);
  if (!lemmaKey || !field) throw new Error("update requires --lemma_key and --field");
  if (!allowed.has(field)) throw new Error(`field not allowed: ${field}`);
  const now = new Date().toISOString();
  const sql = `UPDATE entries SET ${field}=?, updated_at=? WHERE lemma_key=?`;
  const res = db.prepare(sql).run(value, now, lemmaKey);
  console.log(`Updated rows=${res.changes} for lemma_key=${lemmaKey}`);
}

function cmdDeactivate(db, args) {
  const lemmaKey = normalizeWord(args.lemma_key || args._[1] || "");
  if (!lemmaKey) throw new Error("deactivate requires --lemma_key");
  const now = new Date().toISOString();
  const res = db
    .prepare("UPDATE entries SET status='inactive', updated_at=? WHERE lemma_key=?")
    .run(now, lemmaKey);
  console.log(`Deactivated rows=${res.changes} for lemma_key=${lemmaKey}`);
}

function cmdShow(db, args) {
  const lemmaKey = normalizeWord(args.lemma_key || args._[1] || "");
  if (!lemmaKey) throw new Error("show requires --lemma_key");
  const entry = db.prepare("SELECT * FROM entries WHERE lemma_key=?").get(lemmaKey);
  if (!entry) {
    console.log("Not found.");
    return;
  }
  const images = db.prepare("SELECT * FROM entry_images WHERE entry_id=? ORDER BY id").all(entry.id);
  const sources = db.prepare("SELECT * FROM entry_sources WHERE entry_id=? ORDER BY id").all(entry.id);
  const aliases = db.prepare("SELECT * FROM entry_aliases WHERE entry_id=? ORDER BY id").all(entry.id);
  console.log(JSON.stringify({ entry, images, sources, aliases }, null, 2));
}

function getEntryByLemma(db, lemmaKey) {
  return db.prepare("SELECT id, lemma_key FROM entries WHERE lemma_key=?").get(lemmaKey);
}

function cmdAddImage(db, args) {
  const lemmaKey = normalizeWord(args.lemma_key || args._[1] || "");
  const url = String(args.url || args._[2] || "").trim();
  if (!lemmaKey || !url) throw new Error("add-image requires --lemma_key and --url");
  const entry = getEntryByLemma(db, lemmaKey);
  if (!entry) throw new Error(`lemma_key not found: ${lemmaKey}`);
  const filename = String(args.filename || args._[3] || "manual.jpg");
  const type = String(args.type || args._[4] || "Concept Image");
  const isPrimary = args.primary ? 1 : 0;
  const res = db
    .prepare(
      `INSERT OR IGNORE INTO entry_images(entry_id, filename, url, type, is_primary)
       VALUES(?, ?, ?, ?, ?)`
    )
    .run(entry.id, filename, url, type, isPrimary);
  console.log(`add-image changes=${res.changes} for lemma_key=${lemmaKey}`);
}

function cmdRemoveImage(db, args) {
  const lemmaKey = normalizeWord(args.lemma_key || args._[1] || "");
  const url = String(args.url || args._[2] || "").trim();
  if (!lemmaKey || !url) throw new Error("remove-image requires --lemma_key and --url");
  const entry = getEntryByLemma(db, lemmaKey);
  if (!entry) throw new Error(`lemma_key not found: ${lemmaKey}`);
  const res = db.prepare("DELETE FROM entry_images WHERE entry_id=? AND url=?").run(entry.id, url);
  console.log(`remove-image changes=${res.changes} for lemma_key=${lemmaKey}`);
}

function cmdAddSource(db, args) {
  const lemmaKey = normalizeWord(args.lemma_key || args._[1] || "");
  const sourceFile = String(args.source_file || args._[2] || "").trim();
  if (!lemmaKey || !sourceFile) throw new Error("add-source requires --lemma_key and --source_file");
  const entry = getEntryByLemma(db, lemmaKey);
  if (!entry) throw new Error(`lemma_key not found: ${lemmaKey}`);
  const sourceGroup = String(args.source_group || args._[3] || "other").trim();
  const sourceVersion = String(args.source_version || args._[4] || "manual").trim();
  const res = db
    .prepare(
      `INSERT OR IGNORE INTO entry_sources(entry_id, source_file, source_group, source_version)
       VALUES(?, ?, ?, ?)`
    )
    .run(entry.id, sourceFile, sourceGroup, sourceVersion);
  console.log(`add-source changes=${res.changes} for lemma_key=${lemmaKey}`);
}

function cmdRemoveSource(db, args) {
  const lemmaKey = normalizeWord(args.lemma_key || args._[1] || "");
  const sourceFile = String(args.source_file || args._[2] || "").trim();
  if (!lemmaKey || !sourceFile) throw new Error("remove-source requires --lemma_key and --source_file");
  const entry = getEntryByLemma(db, lemmaKey);
  if (!entry) throw new Error(`lemma_key not found: ${lemmaKey}`);
  const res = db.prepare("DELETE FROM entry_sources WHERE entry_id=? AND source_file=?").run(entry.id, sourceFile);
  console.log(`remove-source changes=${res.changes} for lemma_key=${lemmaKey}`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0] || "list";
  const db = requireDb();

  if (cmd === "list") return cmdList(db, args);
  if (cmd === "add") return cmdAdd(db, args);
  if (cmd === "update") return cmdUpdate(db, args);
  if (cmd === "deactivate") return cmdDeactivate(db, args);
  if (cmd === "show") return cmdShow(db, args);
  if (cmd === "add-image") return cmdAddImage(db, args);
  if (cmd === "remove-image") return cmdRemoveImage(db, args);
  if (cmd === "add-source") return cmdAddSource(db, args);
  if (cmd === "remove-source") return cmdRemoveSource(db, args);

  throw new Error(`Unknown command: ${cmd}`);
}

main();
