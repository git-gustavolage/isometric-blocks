import { BlockComp } from "./BlockComp.js";

export class PatternComp {
    constructor() {
        this.name = null;
        this.duration = null;
        this.blocks = [];
    }

    from(pattern) {
        this.name = pattern.name;
        this.duration = pattern.duration;
        this.blocks = [];
        pattern.blocks.forEach(block => this.blocks.push(BlockComp.from(block)));
    }
}
