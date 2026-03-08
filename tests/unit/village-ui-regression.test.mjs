import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

function readModuleCode(relPath) {
  return fs.readFileSync(new URL(`../../${relPath}`, import.meta.url), "utf8");
}

function runScriptInContext(context, relPath) {
  vm.runInContext(readModuleCode(relPath), context, { filename: relPath });
}

function testBedHouseInteriorUsesEnlargedBedWithLegs() {
  const calls = [];
  const ctx = {
    fillStyle: "",
    fillRect(...args) {
      calls.push({ fillStyle: this.fillStyle, args });
    }
  };

  const context = { console };
  vm.createContext(context);
  runScriptInContext(context, "src/modules/18-village-render.js");
  context.drawVillageBed(ctx, 100, 200, { log: "#8D6E63" });

  assert.deepEqual(
    calls[0]?.args,
    [100, 200, 96, 28],
    "床屋室内应使用肉眼可见的大床体尺寸 96x28"
  );

  const legCalls = calls.filter(({ args }) => args[2] === 6 && args[3] === 8);
  assert.equal(legCalls.length, 2, "床屋室内应绘制两条床腿装饰");
}

function testBedHouseInteriorUsesLargerDoor() {
  const context = { console, Math, Date };
  vm.createContext(context);
  runScriptInContext(context, "src/modules/18-village.js");

  const renderSource = String(context.renderVillageInterior);
  assert.match(renderSource, /const doorW = 56\b/, "床屋室内门宽应放大到 56");
  assert.match(renderSource, /const doorH = 96\b/, "床屋室内门高应放大到 96");
}

function testTraderDialogUsesMultiColumnGrid() {
  const context = { console, Math, Date };
  vm.createContext(context);
  runScriptInContext(context, "src/modules/18-village.js");

  const renderSource = String(context.renderTraderBuyMaterials);
  assert.match(
    renderSource,
    /display:grid;grid-template-columns:repeat\(auto-fit,minmax\(180px,1fr\)\)/,
    "商人购买面板应使用多列 grid 布局"
  );
  assert.match(renderSource, /width:100%/, "商人购买按钮应撑满网格单元宽度");
}

function run() {
  testBedHouseInteriorUsesEnlargedBedWithLegs();
  testBedHouseInteriorUsesLargerDoor();
  testTraderDialogUsesMultiColumnGrid();
  console.log("village UI regression checks passed");
}

run();
