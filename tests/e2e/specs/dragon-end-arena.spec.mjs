import { expect, test } from "@playwright/test";
import { openDebugPage } from "./helpers.mjs";

test("GameDebug can enter the dedicated dragon arena", async ({ page }) => {
  await openDebugPage(page);

  const apiType = await page.evaluate(() => typeof window.MMDBG.enterDragonArena);
  expect(apiType).toBe("function");

  const state = await page.evaluate(() => {
    window.MMDBG.enterDragonArena();
    return window.MMDBG.getState();
  });

  expect(state.dragonArenaActive).toBeTruthy();
  expect(["intro", "combat"]).toContain(state.dragonArenaState);
  expect(state.dragonBossName).toBe("Ender Dragon");
  expect(state.dragonCrystalCount).toBeGreaterThanOrEqual(4);
});
