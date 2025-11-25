import { CounterComp } from "../components/CounterComp.js";
import { DataComp } from "../components/DataComp.js";
import { InputComp } from "../components/InputComp.js";
import { StateTransitionComp } from "../components/StateTransitionComp.js";
import { UIComp } from "../components/UIComp.js";

export class GuestSystem {
    constructor(em) {
        this.em = em;
    }

    update(dt) {
        for (const [eid, data, transition, input, counter, ui] of this.em.query(DataComp, StateTransitionComp, InputComp, CounterComp, UIComp).get()) {
            if (input.keyboard.isPressed("Enter")) {
                transition.ready = true;
                data.set("player_guest", counter.value);
            }

            if (input.keyboard.isPressed("ArrowUp")) {
                counter.value++;
            }

            if (input.keyboard.isPressed("ArrowDown")) {
                counter.value = Math.max(counter.value - 1, 0);
            }

            const dozens = Math.floor(counter.value / 10);
            const units = counter.value % 10;
            ui.get("player_guest_dozens").text = dozens;
            ui.get("player_guest_units").text = units;
            input.keyboard.clear();
        }
    }
}
