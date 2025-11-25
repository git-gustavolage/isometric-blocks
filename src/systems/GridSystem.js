import { GridComp } from "../components/GridComp.js";
import { TransformComp } from "../components/TransformComp.js";

export class GridSystem {
    constructor(em) {
        this.em = em;
    }

    update(dt) {
        for (const [eid, grid, transform] of this.em.query(GridComp, TransformComp).get()) {
            const { width, height } = transform;
            const { cols, rows } = grid;

            grid.tiles = [];

            for (let j = 0; j < rows; j++) {
                for (let i = 0; i < cols; i++) {
                    const { posX, posY } = this.isoToScreen(i, j, 0, transform);
                    const top = this.getTilePoints(posX, posY, width, height);
                    grid.tiles.push(top);
                }
            }
        }
    }

    isoToScreen(i, j, k, transform) {
        const { x, y, width, height } = transform;
        const posX = x + (i - j) * (width / 2);
        const posY = y + (i + j) * (height / 2) - k * (height / 2);
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
}
