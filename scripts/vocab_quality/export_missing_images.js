#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGETS = [
  path.join(ROOT, "js", "vocabularies", "minecraft_status_effects.js"),
  path.join(ROOT, "js", "vocabularies", "minecraft", "minecraft_status_effects.js"),
];
const OUT = path.join(ROOT, "reports", "vocab", "missing_images.csv");

function collect(text) {
  const out = [];
  const re = /"word"\s*:\s*"([^"]+)"[\s\S]{0,260}?"chinese"\s*:\s*"([^"]*)"[\s\S]{0,400}?"imageURLs"\s*:\s*\[\s*\]/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    out.push({ word: m[1], chinese: m[2] || "" });
  }
  return out;
}

function main() {
  const rows = [];
  for (const file of TARGETS) {
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    const items = collect(text);
    for (const it of items) {
      rows.push({
        file: path.relative(ROOT, file),
        word: it.word,
        chinese: it.chinese,
        suggested_source: "minecraft.wiki / official icon",
      });
    }
  }
  const csv = ["file,word,chinese,suggested_source"];
  for (const r of rows) {
    csv.push(
      `"${r.file.replace(/"/g, '""')}","${String(r.word).replace(/"/g, '""')}","${String(
        r.chinese
      ).replace(/"/g, '""')}","${r.suggested_source}"`
    );
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, csv.join("\n"), "utf8");
  console.log(JSON.stringify({ generatedAt: new Date().toISOString(), rows: rows.length, out: path.relative(ROOT, OUT) }, null, 2));
}

main();

