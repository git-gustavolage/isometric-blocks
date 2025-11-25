import { TimedTransition } from "../components/TimedTransition.js";

export class TimedTransitionSystem {
    constructor(em) {
        this.em = em;
    }

    update(dt) {
        for (const [eid, timer] of this.em.query(TimedTransition).get()) {
            timer.duration -= dt;

            if (timer.duration <= 0) {
                timer.duration = 0;
            }
        }
    }
}