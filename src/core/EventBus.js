export class EventBus {
    constructor() {
        this._listeners = new Map();
    }

    on(event, action) {
        if (!this._listeners.has(event)) {
            this._listeners.set(event, []);
        }
        this._listeners.get(event).push(action);
        return () => this.off(event, action);
    }

    off(event, action) {
        const arr = this._listeners.get(event);
        if (!arr) return;

        const i = arr.indexOf(action);

        if (i >= 0) {
            arr.splice(i, 1);
        }
    }

    emit(event, payload) {
        const arr = this._listeners.get(event);
        if (!arr) return;

        for (const handler of arr.slice()) {
            handler(payload);
        }
    }
}

export const eventBus = new EventBus();