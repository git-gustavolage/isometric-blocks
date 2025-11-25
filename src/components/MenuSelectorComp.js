export class MenuSelectorComp {
    constructor({ selectedIndex = 0, optionsCount = 0 } = {}) {
        this.selectedIndex = selectedIndex;
        this.optionsCount = optionsCount;
    }

    up() {
        if (this.optionsCount === 0) return;
        this.selectedIndex = (this.selectedIndex - 1 + this.optionsCount) % this.optionsCount;
    }

    down() {
        if (this.optionsCount === 0) return;
        this.selectedIndex = (this.selectedIndex + 1) % this.optionsCount;
    }

    setCount(count) {
        this.optionsCount = count;
        if (this.selectedIndex >= count) this.selectedIndex = 0;
    }
}
