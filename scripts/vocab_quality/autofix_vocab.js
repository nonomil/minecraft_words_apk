#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const VOCAB_ROOT = path.join(ROOT, "js", "vocabularies");
const REPORT_DIR = path.join(ROOT, "reports", "vocab");

const EXCLUDE = [
  "backup",
  "cleanup_backups",
  "backups",
  "node_modules",
  "merge_vocabularies.js",
  "mappings.js",
  `${path.sep}normalized${path.sep}`,
];

const MANUAL_CHINESE_MAP = {
  add: "加",
  subtract: "减",
  multiply: "乘",
  divide: "除",
  sit: "坐",
  speak: "说",
  island: "岛",
  run: "跑",
  close: "关闭",
};

const MANUAL_IMAGE_MAP = {
  duration: "https://minecraft.wiki/w/File:Clock_JE3_BE3.png",
  amplifier: "https://minecraft.wiki/w/File:Redstone_JE2_BE2.png",
  particles: "https://minecraft.wiki/w/File:Splash_Potion_JE2_BE2.png",
  ambient: "https://minecraft.wiki/w/File:Beacon_JE4_BE2.png",
  tick: "https://minecraft.wiki/w/File:Clock_JE3_BE3.png",
};

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (EXCLUDE.some((x) => full.includes(x))) continue;
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

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function parseWordChinesePairs(text) {
  const pairs = [];
  const re = /"word"\s*:\s*"([^"]+)"[\s\S]{0,220}?"chinese"\s*:\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const word = normalizeWord(m[1]);
    const chinese = String(m[2] || "").trim();
    if (!word) continue;
    pairs.push({ word, chinese });
  }
  return pairs;
}

function buildChineseMap(files) {
  const map = new Map();
  for (const f of files) {
    const text = fs.readFileSync(f, "utf8");
    const pairs = parseWordChinesePairs(text);
    for (const p of pairs) {
      if (!p.chinese) continue;
      if (!map.has(p.word)) map.set(p.word, new Map());
      const cMap = map.get(p.word);
      cMap.set(p.chinese, (cMap.get(p.chinese) || 0) + 1);
    }
  }
  const out = new Map();
  for (const [word, cMap] of map.entries()) {
    const sorted = [...cMap.entries()].sort((a, b) => b[1] - a[1]);
    if (!sorted.length) continue;
    if (sorted.length > 1 && sorted[0][1] === sorted[1][1]) continue; // ambiguous
    out.set(word, sorted[0][0]);
  }
  return out;
}

function buildImageMap(files) {
  const map = new Map();
  const re = /"word"\s*:\s*"([^"]+)"[\s\S]{0,1400}?"url"\s*:\s*"([^"]+)"/g;
  for (const f of files) {
    const text = fs.readFileSync(f, "utf8");
    let m;
    while ((m = re.exec(text)) !== null) {
      const key = normalizeWord(m[1]);
      const url = String(m[2] || "").trim();
      if (!key || !url) continue;
      if (!/^https?:\/\//i.test(url)) continue;
      if (!map.has(key)) map.set(key, url);
    }
  }
  return map;
}

function fixUnsplashUrl(url) {
  if (!url || !url.includes("images.unsplash.com")) return url;
  let v = url;
  if (v.includes("?")) {
    const [base, ...rest] = v.split("?");
    v = `${base}?${rest.join("&")}`;
  }
  v = v.replace(/([?&])w=1080&\s*w=(\d+)/g, "$1w=$2");
  v = v.replace(/([?&])w=1080\?w=(\d+)/g, "$1w=$2");
  v = v.replace(/w=1080\?w=(\d+)/g, "w=$1");
  return v;
}

function fixChinese(text, chineseMap) {
  let replaced = 0;
  const re = /("word"\s*:\s*"([^"]+)"[\s\S]{0,220}?"chinese"\s*:\s*)""/g;
  const out = text.replace(re, (all, prefix, word) => {
    const key = normalizeWord(word);
    const zh = chineseMap.get(key) || MANUAL_CHINESE_MAP[key];
    if (!zh) return all;
    replaced++;
    return `${prefix}"${zh}"`;
  });
  return { text: out, replaced };
}

function fixUrls(text) {
  let fixed = 0;
  const out = text.replace(/("url"\s*:\s*")([^"]*)(")/g, (all, p1, url, p3) => {
    const nu = fixUnsplashUrl(url);
    if (nu !== url) fixed++;
    return `${p1}${nu}${p3}`;
  });
  return { text: out, fixed };
}

function fixImages(text, imageMap) {
  let emptyArrayFixed = 0;
  let emptyUrlFixed = 0;

  const arrayRe = /("word"\s*:\s*"([^"]+)"[\s\S]{0,1200}?"imageURLs"\s*:\s*)\[\s*\]/g;
  let out = text.replace(arrayRe, (all, prefix, word) => {
    const key = normalizeWord(word);
    const url = imageMap.get(key) || MANUAL_IMAGE_MAP[key];
    if (!url) return all;
    emptyArrayFixed++;
    return (
      prefix +
      `[{"filename":"auto.jpg","url":"${url.replace(/"/g, '\\"')}","type":"Concept Image"}]`
    );
  });

  const urlRe = /("word"\s*:\s*"([^"]+)"[\s\S]{0,1200}?"url"\s*:\s*)""/g;
  out = out.replace(urlRe, (all, prefix, word) => {
    const key = normalizeWord(word);
    const url = imageMap.get(key) || MANUAL_IMAGE_MAP[key];
    if (!url) return all;
    emptyUrlFixed++;
    return `${prefix}"${url.replace(/"/g, '\\"')}"`;
  });

  return { text: out, emptyArrayFixed, emptyUrlFixed };
}

function main() {
  ensureDir(REPORT_DIR);
  const files = walk(VOCAB_ROOT);
  const chineseMap = buildChineseMap(files);
  const imageMap = buildImageMap(files);
  const report = [];
  let totalChineseFixed = 0;
  let totalUrlFixed = 0;
  let totalImageArrayFixed = 0;
  let totalImageUrlFilled = 0;

  for (const f of files) {
    const orig = fs.readFileSync(f, "utf8");
    let next = orig;

    const chineseRes = fixChinese(next, chineseMap);
    next = chineseRes.text;

    const urlRes = fixUrls(next);
    next = urlRes.text;
    const imageRes = fixImages(next, imageMap);
    next = imageRes.text;

    if (next !== orig) {
      fs.writeFileSync(f, next, "utf8");
    }

    if (chineseRes.replaced || urlRes.fixed || imageRes.emptyArrayFixed || imageRes.emptyUrlFixed) {
      report.push({
        file: path.relative(ROOT, f),
        chineseFixed: chineseRes.replaced,
        unsplashFixed: urlRes.fixed,
        imageArrayFixed: imageRes.emptyArrayFixed,
        imageUrlFilled: imageRes.emptyUrlFixed,
      });
      totalChineseFixed += chineseRes.replaced;
      totalUrlFixed += urlRes.fixed;
      totalImageArrayFixed += imageRes.emptyArrayFixed;
      totalImageUrlFilled += imageRes.emptyUrlFixed;
    }
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    changedFiles: report.length,
    totalChineseFixed,
    totalUrlFixed,
    totalImageArrayFixed,
    totalImageUrlFilled,
  };

  fs.writeFileSync(path.join(REPORT_DIR, "autofix_report.json"), JSON.stringify({ summary, report }, null, 2), "utf8");
  console.log(JSON.stringify(summary, null, 2));
}

main();
