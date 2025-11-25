import { InputDevice } from "./InputDevice.js";

class KeyboardInput extends InputDevice {
    static #instance = null;

    constructor() {
        if (KeyboardInput.#instance) return KeyboardInput.#instance;
        super();
        this.keys = {};
        document.addEventListener("keydown", e => this.keys[e.key] = true);
        document.addEventListener("keyup", e => this.keys[e.key] = false);
        KeyboardInput.#instance = this;
    }

    static getInstance() {
        if (!KeyboardInput.#instance) KeyboardInput.#instance = new KeyboardInput();
        return KeyboardInput.#instance;
    }

    isPressed(key) {
        return !!this.keys[key];
    }

    clear() {
        this.keys = {};
    }

    getKeys() {
        return this.keys;
    }
}

export const keyboard = KeyboardInput.getInstance();
