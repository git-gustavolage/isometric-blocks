import { InputComp } from "../components/InputComp.js";

export class InputSystem {
    constructor(em) {
        this.em = em;
    }

    update(dt) {
        for (const [eid, input] of this.em.query(InputComp).get()) {
            // input.keyboard.clear();
        }
    }
}