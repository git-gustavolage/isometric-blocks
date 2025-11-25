import { EntityManager } from "../core/EntityManager.js";

export class Scene {
    constructor(name, { onEnter, onExit } = {}) {
        this.name = name;
        this.em = new EntityManager();
        this.systems = [];
        this.onEnter = onEnter || (() => { });
        this.onExit = onExit || (() => { });
    }

    enter() {
        this.onEnter(this.em);
    }

    registerSystem(system) {
        this.systems.push(system);
    }

    exit() {
        this.onExit(this.em);
        for (const eid of this.em.getEntities()) {
            this.em.removeEntity(eid);
        }
    }

    update(dt) {
        for (const sys of this.systems) {
            if (typeof sys.update === "function") {
                sys.update?.(dt);
            }
        }
    }

    render(ctx) {
        for (const sys of this.systems) {
            sys.render?.(ctx);
        }
    }
}
