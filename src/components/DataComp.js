export class DataComp {
    constructor(data) {
        this.data = data;

        for (const key in data) {
            window.localStorage.setItem(key, JSON.stringify(data[key]));
        }
    }

    set(key, value) {
        this.data[key] = value;
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    get(key, defaultValue) {
        const value = window.localStorage.getItem(key);
        return value !== null ? JSON.parse(value) : defaultValue;
    }
}