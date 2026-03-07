(function () {
    const PHASE_INTENTS = {
        1: ["orbit_crystal_heal"],
        2: ["dive_charge", "fireball_breath"],
        3: ["perch_frenzy", "low_sweep"]
    };

    function clampPhase(value) {
        return Math.max(1, Math.min(3, Number(value) || 1));
    }

    class EnderDragonBoss {
        constructor(phase = 1, state = "intro") {
            this.name = "Ender Dragon";
            this.maxHp = 300;
            this.hp = 300;
            this.phase = clampPhase(phase);
            this.state = String(state || "intro");
            this.alive = true;
            this.x = 420;
            this.y = 150;
            this.vx = 0;
            this.vy = 0;
            this.intentKey = "orbit_crystal_heal";
            this.updateCount = 0;
            this.fireballs = [];
            this.refreshIntent();
        }

        refreshIntent() {
            const intents = PHASE_INTENTS[this.phase] || PHASE_INTENTS[1];
            const index = intents.length <= 1 ? 0 : Math.floor(this.updateCount / 8) % intents.length;
            this.intentKey = intents[index];
        }

        setPhase(phase) {
            this.phase = clampPhase(phase);
            this.updateCount = 0;
            if (this.phase > 1 && this.state === "intro") {
                this.state = "combat";
            }
            this.refreshIntent();
        }

        takeDamage(amount) {
            const damage = Math.max(0, Number(amount) || 0);
            this.hp = Math.max(0, this.hp - damage);
            if (this.hp <= 0) {
                this.alive = false;
                this.state = "defeated";
            }
        }

        update() {
            if (!this.alive) return;
            this.updateCount += 1;
            if (this.state === "intro") {
                this.state = "combat";
            }
            this.x = 420 + Math.sin(this.updateCount / 10) * (this.phase === 1 ? 90 : this.phase === 2 ? 120 : 70);
            this.y = 150 + Math.cos(this.updateCount / 14) * (this.phase === 3 ? 24 : 50);
            this.refreshIntent();
        }
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
            this.phase = clampPhase(options.phase);
            this.dragon = new EnderDragonBoss(this.phase, this.state);
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
        setPhase(phase) {
            this.phase = clampPhase(phase);
            if (this.dragon && typeof this.dragon.setPhase === "function") {
                this.dragon.setPhase(this.phase);
            }
            if (this.state === "idle") {
                this.state = "combat";
            }
        },
        damageDragon(amount) {
            if (!this.dragon || typeof this.dragon.takeDamage !== "function") return;
            this.dragon.takeDamage(amount);
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
        update() {
            if (!this.active || !this.dragon) return;
            if (this.state === "intro") {
                this.state = "combat";
            }
            this.dragon.update();
            this.phase = this.dragon.phase;
        },
        renderBackground() {},
        renderEntities() {},
        renderHud() {}
    });
})();
