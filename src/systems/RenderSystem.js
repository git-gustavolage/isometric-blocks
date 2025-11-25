import { GridComp } from "../components/GridComp.js";
import { LabelComp } from "../components/LabelComp.js";
import { PatternComp } from "../components/PatternComp.js";
import { RectComp } from "../components/RectComp.js";
import { RenderablePointCounterComp } from "../components/RenderablePointCounterComp.js";
import { TransformComp } from "../components/TransformComp.js";
import { UIComp } from "../components/UIComp.js";

export class RenderSystem {
    constructor(em, ctx) {
        this.em = em;
        this.ctx = ctx;
    }

    render() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (const [eid, ui] of this.em.query(UIComp).get()) {
            ui.components.forEach(comp => {
                if (comp instanceof RectComp) {
                    this._drawRect(ctx, comp);
                }
                if (comp instanceof LabelComp) {
                    this._drawLabel(ctx, comp);
                }
            })
        }

        for (const [eid, ui] of this.em.query(RenderablePointCounterComp).get()) {
            ui.components.forEach(comp => {
                if (comp instanceof LabelComp) {
                    this._drawLabel(ctx, comp);
                }
            })
        }

        for (const [eid, grid, transform] of this.em.query(GridComp, TransformComp).get()) {
            const { tiles, strokeColor, lineWidth } = grid;

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = lineWidth;

            for (const tile of tiles) {
                ctx.beginPath();
                ctx.moveTo(tile[0].x, tile[0].y);
                for (let t = 1; t < tile.length; t++) ctx.lineTo(tile[t].x, tile[t].y);
                ctx.closePath();
                ctx.stroke();
            }

            for (const [eid, pattern] of this.em.query(PatternComp).get()) {
                pattern.blocks.forEach(block => this._drawBlock(ctx, block, transform));
            }
        }
    }

    _drawLabel(ctx, label) {
        ctx.save();

        ctx.font = label.font;

        const metrics = ctx.measureText(label.text);
        const textWidth = metrics.width;
        const textHeight = label.size;

        const { x, y } = this._resolveAlignment(label, textWidth, textHeight);

        if (label.circle) {
            ctx.beginPath();
            ctx.lineWidth = label.circle.lineWidth;
            ctx.strokeStyle = label.circle.color;

            ctx.arc(x, y, label.circle.radius, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.fillStyle = label.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(label.text, x, y);

        ctx.restore();
    }

    _drawBlock(ctx, block, transform) {
        const { width, height } = transform;
        const blockHeight = height - 20;

        const { i, j, k, topColor, leftColor, rightColor, strokeStyle, tilePadding } = block;

        const { posX, posY } = this.isoToScreen(i, j, k, transform);
        let top = this.getTilePoints(posX, posY - blockHeight, width, height);

        if (tilePadding > 0) {
            const cx = posX;
            const cy = posY - blockHeight;
            const halfW = (width / 2);
            const shrink = Math.max(0, (halfW - tilePadding) / halfW);
            top = top.map(p => ({ x: cx + (p.x - cx) * shrink, y: cy + (p.y - cy) * shrink }));
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = strokeStyle;

        ctx.beginPath();
        ctx.moveTo(top[3].x, top[3].y);
        ctx.lineTo(top[2].x, top[2].y);
        ctx.lineTo(top[2].x, top[2].y + blockHeight);
        ctx.lineTo(top[3].x, top[3].y + blockHeight);
        ctx.closePath();
        ctx.fillStyle = leftColor;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(top[1].x, top[1].y);
        ctx.lineTo(top[2].x, top[2].y);
        ctx.lineTo(top[2].x, top[2].y + blockHeight);
        ctx.lineTo(top[1].x, top[1].y + blockHeight);
        ctx.closePath();
        ctx.fillStyle = rightColor;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(top[0].x, top[0].y);
        for (let t = 1; t < top.length; t++) ctx.lineTo(top[t].x, top[t].y);
        ctx.closePath();
        ctx.fillStyle = topColor;
        ctx.fill();
        ctx.stroke();
    }


    _drawRect(ctx, rect) {
        if (rect.background) {
            ctx.fillStyle = rect.background;
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
        if (rect.borderColor && rect.borderWidth > 0) {
            ctx.strokeStyle = rect.borderColor;
            ctx.lineWidth = rect.borderWidth;
            ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        }
    }

    isoToScreen(i, j, k, transform) {
        const { x, y, width, height } = transform;
        const posX = x + (i - j) * (width / 2);
        const blockHeight = height;
        const posY = y + (i + j) * (height / 2) - k * (blockHeight - 20);
        return { posX, posY };
    }

    getTilePoints(x, y, width, height) {
        return [
            { x: x, y: y - height / 2 },
            { x: x + width / 2, y: y },
            { x: x, y: y + height / 2 },
            { x: x - width / 2, y: y },
        ];
    }

    _resolveAlignment(label, w, h) {
        let x = label.x;
        let y = label.y;

        if (label.alignX === "center") x = label.x;
        else if (label.alignX === "end") x = label.x - w / 2;
        else if (label.alignX === "start") x = label.x + w / 2;

        if (label.alignY === "center") y = label.y;
        else if (label.alignY === "end") y = label.y - h / 2;
        else if (label.alignY === "start") y = label.y + h / 2;

        return { x, y };
    }
}
