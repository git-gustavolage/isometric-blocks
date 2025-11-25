export class LabelComp {
    constructor({
        id = null,
        text = "",
        x = 0,
        y = 0,
        size = 20,
        color = "#000",
        fontFamily = "Arial",
        alignX = "start",
        alignY = "start",
        circle = null,
    }) {
        this.id = id;
        this.text = text;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.fontFamily = fontFamily;
        this.alignX = alignX;
        this.alignY = alignY;

        this.circle = circle ? {
            radius: circle.radius ?? size * 0.8,
            color: circle.color ?? color,
            lineWidth: circle.lineWidth ?? 4,
        } : null;

        this.updateFont();
    }

    updateFont() {
        this.font = `${this.size}px ${this.fontFamily}`;
    }
}
