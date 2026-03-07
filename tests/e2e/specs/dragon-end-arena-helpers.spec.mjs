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
