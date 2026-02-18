#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const ROOT = process.cwd();
const DB_PATH = path.join(ROOT, "data", "vocab.db");
const INPUT_CSV = path.join(ROOT, "reports", "vocab", "external_candidates_to_review.csv");
const OUT_CSV = path.join(ROOT, "reports", "vocab_db", "external_candidates.csv");

function ensureDbAndTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS external_candidates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT NOT NULL UNIQUE,
      best_rank INTEGER,
      source_ids TEXT,
      status TEXT NOT NULL DEFAULT 'pending_review',
      chinese TEXT,
      category_hint TEXT,
      note TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
}

function parseCsv(text) {
  const rows = [];
  let i = 0;
  let cur = "";
  let row = [];
  let inQuotes = false;
  while (i < text.length) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      cur += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === ",") {
      row.push(cur);
      cur = "";
      i++;
      continue;
    }
    if (ch === "\n") {
      row.push(cur);
      rows.push(row);
      row = [];
      cur = "";
      i++;
      continue;
    }
    if (ch !== "\r") cur += ch;
    i++;
  }
  if (cur.length || row.length) {
    row.push(cur);
    rows.push(row);
  }
  if (rows.length === 0) return [];
  const headers = rows[0];
  return rows.slice(1).map((r) => {
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = r[idx] || "";
    });
    return obj;
  });
}

function toCsv(rows, headers) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}

function main() {
  const keepExisting = process.argv.includes("--keep-existing");
  if (!fs.existsSync(DB_PATH)) {
    throw new Error(`Missing ${path.relative(ROOT, DB_PATH)}. Run npm run vocabdb:build first.`);
  }
  if (!fs.existsSync(INPUT_CSV)) {
    throw new Error(`Missing ${path.relative(ROOT, INPUT_CSV)}. Run npm run vocabdb:compare-external first.`);
  }

  const db = new DatabaseSync(DB_PATH);
  ensureDbAndTable(db);
  db.exec("PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL;");

  const text = fs.readFileSync(INPUT_CSV, "utf8");
  const rows = parseCsv(text);
  const now = new Date().toISOString();

  const upsert = db.prepare(`
    INSERT INTO external_candidates(word, best_rank, source_ids, status, chinese, category_hint, note, created_at, updated_at)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(word) DO UPDATE SET
      best_rank=excluded.best_rank,
      source_ids=excluded.source_ids,
      status=excluded.status,
      chinese=excluded.chinese,
      category_hint=excluded.category_hint,
      note=excluded.note,
      updated_at=excluded.updated_at
  `);

  let imported = 0;
  if (!keepExisting) {
    db.exec("DELETE FROM external_candidates;");
  }
  db.exec("BEGIN");
  try {
    for (const r of rows) {
      const word = String(r.word || "").trim().toLowerCase();
      if (!word) continue;
      upsert.run(
        word,
        Number(r.best_rank || 0) || null,
        String(r.source_ids || ""),
        String(r.status || "pending_review"),
        String(r.chinese || ""),
        String(r.category_hint || "common"),
        String(r.note || ""),
        now,
        now
      );
      imported++;
    }
    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }

  fs.mkdirSync(path.dirname(OUT_CSV), { recursive: true });
  const outRows = db
    .prepare(
      "SELECT id, word, best_rank, source_ids, status, chinese, category_hint, note, created_at, updated_at FROM external_candidates ORDER BY best_rank, word"
    )
    .all();
  fs.writeFileSync(
    OUT_CSV,
    toCsv(outRows, [
      "id",
      "word",
      "best_rank",
      "source_ids",
      "status",
      "chinese",
      "category_hint",
      "note",
      "created_at",
      "updated_at",
    ]),
    "utf8"
  );

  console.log(
    JSON.stringify(
      {
        imported,
        totalInTable: outRows.length,
        output: path.relative(ROOT, OUT_CSV),
      },
      null,
      2
    )
  );
}

main();
