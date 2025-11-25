export class RangeComp {
    constructor({ min = 1, max = 5, value = 1, step = 1, pointerId = null, tickIds = [], labelId = null } = {}) {
        this.min = min;
        this.max = max;
        this.step = step;
        this.value = Math.max(min, Math.min(max, value));
        this.pointerId = pointerId; // id do LabelComp que representa o triângulo ▲
        this.tickIds = tickIds;     // ids dos ticks (RectComp) - normalmente não necessários para lógica, mas úteis para desenhar
        this.labelId = labelId;     // id do label que exibe numericamente o value (opcional)
    }

    increase() {
        this.value = Math.min(this.max, this.value + this.step);
    }

    decrease() {
        this.value = Math.max(this.min, this.value - this.step);
    }

    set(v) {
        this.value = Math.max(this.min, Math.min(this.max, v));
    }

    index() {
        return (this.value - this.min) / this.step; // 0 .. (max-min)/step
    }
}
