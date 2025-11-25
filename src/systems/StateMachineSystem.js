import { StateTransitionComp } from "../components/StateTransitionComp.js";
import { StateMachine } from "../components/StateMachine.js";

export class StateMachineSystem {
    constructor(em) {
        this.em = em;
    }

    update(dt) {
        for (const [eid, sm] of this.em.query(StateMachine).get()) {

            if (!sm.currentState) {
                sm.init(this.em, eid);
            }

            const transition = this.em.getComponent(eid, StateTransitionComp);
            if (transition && transition.ready) {
                sm.switchStates(this.em, eid, transition.nextState);
            }
        }
    }
}
