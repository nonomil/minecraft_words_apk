import { expect, test } from "@playwright/test";
import { enterDragonArena, exitDragonArena, getDragonArenaState, openDebugPage, setDragonArenaPhase, tickGame } from "./helpers.mjs";

test("Dragon arena helpers can enter, inspect, phase shift, and exit", async ({ page }) => {
  await openDebugPage(page);

  const entered = await enterDragonArena(page);
  expect(entered.dragonArenaActive).toBeTruthy();
  expect(entered.dragonBossName).toBe("Ender Dragon");

  await setDragonArenaPhase(page, 3);
  await tickGame(page, 10);
  const shifted = await getDragonArenaState(page);
  expect(shifted.dragonArenaPhase).toBe(3);
  expect(shifted.dragonBossIntentKey).toBeTruthy();

  const exited = await exitDragonArena(page);
  expect(exited.dragonArenaActive).toBeFalsy();
  expect(exited.dragonArenaState).toBeNull();
});


test("Dragon arena switches biome context and restores it on exit", async ({ page }) => {
  await openDebugPage(page);

  const state = await page.evaluate(() => {
    window.MMDBG.setBiome("end");
    const before = window.MMDBG.getState();
    window.MMDBG.enterDragonArena();
    const during = window.MMDBG.getDragonArenaState();
    window.MMDBG.exitDragonArena();
    const after = window.MMDBG.getState();
    return { before, during, after };
  });

  expect(state.before.biome).toBe("end");
  expect(state.during.biome).toBe("end_arena");
  expect(state.after.biome).toBe("end");
  expect(state.after.dragonArenaActive).toBeFalsy();
});
