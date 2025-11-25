export class RectComp {
    constructor({
        x = 0,
        y = 0,
        width = 10,
        height = 10,
        background = "#000",
        fillStyle = "#ffffff",
        strokeStyle = "#000000",
        strokeWidth = 1,
        visible = true,
    } = {}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.background = background;

        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.strokeWidth = strokeWidth;

        this.visible = visible;
    }

    static from(other) {
        return new RectComp({
            x: other.x,
            y: other.y,
            width: other.width,
            height: other.height,
            fillStyle: other.fillStyle,
            strokeStyle: other.strokeStyle,
            strokeWidth: other.strokeWidth,
            visible: other.visible,
        });
    }
}
