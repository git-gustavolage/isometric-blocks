export class SceneManager {
    constructor(engine) {
        this.engine = engine;
        this.currentScene = null;
        this.sceneFactoryMap = new Map();
    }

    addScene(name, factory) {
        this.sceneFactoryMap.set(name, factory);
    }

    switchTo(name) {
        const factory = this.sceneFactoryMap.get(name);
        if (!factory) {
            console.warn(`Scene "${name}" not found`);
            return;
        }

        if (this.currentScene) {
            this.currentScene.exit();
        }

        this.currentScene = factory();
        this.currentScene.enter();
    }

    update(dt) {
        this.currentScene?.update(dt);
    }

    fixedUpdate(dt) {
        this.currentScene?.fixedUpdate(dt);
    }

    render(ctx) {
        this.currentScene?.render(ctx);
    }
}
