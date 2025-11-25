import { EventBus } from "./EventBus.js";
import { SceneManager } from "./SceneManager.js";

export class Engine {
    static #instance = null;

    constructor(ctx, entityManager = null, targetFps = 60, fixedFps = 60, renderWhilePaused = true) {
        if (Engine.#instance) return Engine.#instance;

        this.ctx = ctx;
        this.em = entityManager;
        this.eventBus = new EventBus();
        this.sceneManager = new SceneManager(this);

        this.targetFps = targetFps;
        this.fixedDt = 1000 / fixedFps;
        this.timeScale = 1;
        this.running = false;
        this.paused = false;
        this.renderWhilePaused = renderWhilePaused;

        this._lastTime = 0;
        this._accumulator = 0;

        this._frameCount = 0;
        this._fpsStart = 0;
        this.currentFps = 0;

        Engine.#instance = this;
    }

    static make(ctx, em, targetFps = 60, fixedFps = 60, renderWhilePaused = true) {
        if (!Engine.#instance) {
            new Engine(ctx, em, targetFps, fixedFps, renderWhilePaused);
        }
        return Engine.#instance;
    }

    static getInstance() {
        if (!Engine.#instance) {
            throw new Error("Engine ainda não foi inicializado. Use Engine.make(ctx, em) primeiro.");
        }
        return Engine.#instance;
    }

    setup(cb) {
        if (cb) cb();
        this.eventBus.emit("engine:setup");
    }

    start() {
        if (this.running) return;
        this.running = true;
        this._lastTime = performance.now();
        this._fpsStart = this._lastTime;
        this._frameCount = 0;
        requestAnimationFrame(this._loop);
        this.eventBus.emit("engine:start");
    }

    stop() {
        this.running = false;
        this.eventBus.emit("engine:stop");
    }

    pause() {
        if (!this.paused) {
            this.paused = true;
            this.eventBus.emit("engine:pause");
        }
    }

    resume() {
        if (this.paused) {
            this.paused = false;
            this._lastTime = performance.now();
            this._accumulator = 0;
            this.eventBus.emit("engine:resume");
        }
    }

    togglePause() { this.paused ? this.resume() : this.pause(); }

    _loop = (ts) => {
        if (!this.running) return;
        requestAnimationFrame(this._loop);

        const rawDelta = ts - this._lastTime;
        const delta = rawDelta * this.timeScale;
        this._lastTime = ts;

        this._frameCount++;
        if (ts - this._fpsStart >= 1000) {
            this.currentFps = Math.round((this._frameCount / (ts - this._fpsStart)) * 1000);
            this._frameCount = 0;
            this._fpsStart = ts;
        }

        if (!this.paused) {
            this._accumulator += delta;
            this.sceneManager.update(delta);
        }

        if (!this.paused || this.renderWhilePaused) {
            this.sceneManager.render(this.ctx);
        }
    };

    emit(evt, payload) { this.eventBus.emit(evt, payload); }
    on(evt, fn) { return this.eventBus.on(evt, fn); }

    static getCtx() {
        if (Engine.getInstance()) {
            return Engine.getInstance().ctx;
        }
    }

    static getBounds() {
        const ctx = Engine.getInstance().ctx;
        const canvas = ctx.canvas;

        return {
            width: canvas.width,
            height: canvas.height
        };
    }
}
