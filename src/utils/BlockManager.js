import { BlockComp } from "../components/BlockComp.js";
import { GridComp } from "../components/GridComp.js";

export class BlockManager {
    constructor({ em, canvas } = {}) {
        if (!em) throw new Error("BlockManager requires an EntityManager (em)");
        this.em = em;
        this.canvas = canvas || null;
    }

    getGrid() {
        const entry = this.em.query(GridComp)[0];
        if (!entry) return null;
        return entry[1];
    }

    inBounds(i, j) {
        const grid = this.getGrid();
        if (!grid) return false;
        return i >= 0 && j >= 0 && i < grid.cols && j < grid.rows;
    }

    existsBlock(i, j, k) {
        for (const [, block] of this.em.query(BlockComp)) {
            if (block.i === i && block.j === j && block.k === k) return true;
        }
        return false;
    }

    clearBlocks() {
        for (const [eid] of this.em.query(BlockComp)) {
            this.em.removeComponent(eid, BlockComp);
        }
        this.lastGeneratedPattern = null;
    }

    createBlockAt(i, j, k, opts = {}) {
        const grid = this.getGrid();
        if (!grid) return false;
        if (!this.inBounds(i, j)) return false;
        if (k < 0 || k >= grid.depth) return false;
        if (this.existsBlock(i, j, k)) return false;

        const eid = this.em.createEntity();
        this.em.addComponent(eid, new BlockComp(i, j, k, opts));
        return true;
    }

    applyPattern(pattern, offsetI = 0, offsetJ = 0, opts = { fillBase: true }) {
        const grid = this.getGrid();
        if (!grid) throw new Error("No grid found");

        const created = [];
        for (const b of pattern.blocks) {
            const ti = b.i + offsetI;
            const tj = b.j + offsetJ;
            const tk = b.k;

            if (!this.inBounds(ti, tj)) continue;

            if (tk > 0 && opts.fillBase) {
                for (let kk = 0; kk < tk; kk++) {
                    if (!this.existsBlock(ti, tj, kk)) {
                        if (this.createBlockAt(ti, tj, kk, b.opts || {})) created.push({ i: ti, j: tj, k: kk });
                    }
                }
            }

            if (!this.existsBlock(ti, tj, tk)) {
                if (this.createBlockAt(ti, tj, tk, b.opts || {})) created.push({ i: ti, j: tj, k: tk });
            }
        }
        return created;
    }

    createFromPattern(blocks, grid) {
        for (const b of blocks) {
            const entity = this.em.createEntity();
            this.em.addComponent(entity, { type: "BlockComp", i: b.i, j: b.j, k: b.k });
        }
    }

    clearAll() {
        // remove todas entidades com BlockComp
        const toRemove = [];
        for (const [eid, comp] of this.em.queryByName("BlockComp")) {
            toRemove.push(eid);
        }
        for (const eid of toRemove) this.em.removeEntity(eid);
    }

}
