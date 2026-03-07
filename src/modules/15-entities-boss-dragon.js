(function () {
    function createPlaceholderDragon() {
        return {
            name: "Ender Dragon",
            hp: 300,
            maxHp: 300,
            phase: 1,
            state: "intro",
            alive: true
        };
    }

    function createPlaceholderCrystals() {
        return [
            { id: 1, alive: true, x: 180, y: 120 },
            { id: 2, alive: true, x: 320, y: 96 },
            { id: 3, alive: true, x: 520, y: 110 },
            { id: 4, alive: true, x: 700, y: 132 }
        ];
    }

    const existing = globalThis.endDragonArena || {};

    globalThis.endDragonArena = Object.assign(existing, {
        active: false,
        state: "idle",
        phase: 1,
        dragon: null,
        crystals: [],
        hazards: [],
        victoryReady: false,
        exitPortalReady: false,
        entryContext: null,
        returnContext: null,
        enter(options = {}) {
            this.active = true;
            this.state = String(options.state || "intro");
            this.phase = Math.max(1, Number(options.phase) || 1);
            this.dragon = createPlaceholderDragon();
            this.dragon.phase = this.phase;
            this.dragon.state = this.state;
            this.crystals = createPlaceholderCrystals();
            this.hazards = [];
            this.victoryReady = false;
            this.exitPortalReady = false;
            this.entryContext = {
                biome: typeof globalThis.currentBiome !== "undefined" ? globalThis.currentBiome : null
            };
            this.returnContext = this.entryContext;
            return this;
        },
        exit() {
            this.reset();
        },
        reset() {
            this.active = false;
            this.state = "idle";
            this.phase = 1;
            this.dragon = null;
            this.crystals = [];
            this.hazards = [];
            this.victoryReady = false;
            this.exitPortalReady = false;
            this.entryContext = null;
            this.returnContext = null;
        },
        update() {},
        renderBackground() {},
        renderEntities() {},
        renderHud() {}
    });
})();
