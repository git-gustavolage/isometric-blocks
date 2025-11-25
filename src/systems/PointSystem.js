import { DataComp } from "../components/DataComp.js";
import { RenderablePointCounterComp } from "../components/RenderablePointCounterComp.js";

export class PointSystem {
    constructor(em) {
        this.em = em;
    }

    update(dt) {
        for (const [eid, data, renderable] of this.em.query(DataComp, RenderablePointCounterComp).get()) {
            renderable.get("points").text = data.data.points + " pontos";
        }
    }
}