import { default as data } from "../../public/patterns.json" with { type: "json"};

export class PatternBundle {
    constructor() {
        this.currentIndex = 0;
        this.patterns = new Map();

        data.patterns.forEach((item, index) => this.patterns.set(index, item));
    }

    next() {
        this.currentIndex = this.currentIndex + 1 < this.patterns.size ? this.currentIndex + 1 : 0;
    }

    getCurrent() {
        return this.patterns.get(this.currentIndex);
    }
}
