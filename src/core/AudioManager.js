class AudioManager {
    static #instance = null;

    constructor() {
        if (AudioManager.#instance) return AudioManager.#instance;

        this.cache = new Map();

        AudioManager.#instance = this;
    }

    static getInstance() {
        if (!AudioManager.#instance) AudioManager.#instance = new AudioManager();
        return AudioManager.#instance;
    }

    async load(path) {
        if (this.cache.has(path)) return this.cache.get(path);

        const audio = new Audio(path);
        audio.preload = "auto";

        await audio.play().catch(() => { });
        audio.pause();
        audio.currentTime = 0;

        this.cache.set(path, audio);
        return audio;
    }

    async play(path) {
        const audio = await this.load(path);

        const clone = audio.cloneNode(true);
        clone.play();
        return true;
    }

}

export const audioPlayer = AudioManager.getInstance();
