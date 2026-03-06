import { test, expect } from "@playwright/test";

async function openDebug(page) {
  await page.goto(`/tests/debug-pages/GameDebug.html?ts=${Date.now()}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(6000);
}

async function gameEval(page, expression) {
  return page.evaluate((expr) => {
    const frame = document.getElementById("game");
    const w = frame && frame.contentWindow ? frame.contentWindow : null;
    if (!w) throw new Error("game_window_missing");
    return w.eval(expr);
  }, expression);
}

test("debug page buttons mutate real game state", async ({ page }) => {
  await openDebug(page);

  await gameEval(page, "enemies.length = 0; inventory.diamond = 0; true;");

  await page.locator("#biome").selectOption("snow");
  await page.getByRole("button", { name: "切换群系" }).click();
  await expect.poll(() => gameEval(page, "currentBiome")).toBe("snow");

  await page.locator("#enemy").selectOption("zombie");
  await page.getByRole("button", { name: "生成敌人" }).click();
  const enemyState = await gameEval(page, "({ count: enemies.length, lastType: enemies[enemies.length - 1]?.type || null })");
  expect(enemyState.count).toBeGreaterThan(0);
  expect(enemyState.lastType).toBe("zombie");

  await page.locator("#item").fill("diamond");
  await page.locator("#count").fill("5");
  await page.getByRole("button", { name: "给予物品" }).click();
  await expect.poll(() => gameEval(page, "inventory.diamond || 0")).toBe(5);
});
