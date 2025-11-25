export class BlockComp {
    constructor(i = 0, j = 0, k = 0) {
        this.i = i;
        this.j = j;
        this.k = k;
        this.topColor = "#e9f0f5";
        this.leftColor = "#ced0dc";
        this.rightColor = "#9d9ba9";
        this.strokeStyle = "#00000060";
        this.tilePadding = 0;
        this.ref = { ...this };
    }

    static from(block) {
        return new BlockComp(block.i, block.j, block.k);
    }

    restore() {
        this.duration = this.ref.duration;
    }
}
