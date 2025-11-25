import { ComponentBundle } from "./ComponentBundle.js";

export class StateMachine {
    constructor() {
        this.currentState = null;
        this.stateMap = new Map();
    }

    init(em, eid) {
        const first = this.stateMap.keys().next().value;
        if (first) this.switchStates(em, eid, first);
    }

    createState(state, ...components) {
        const bundle = new ComponentBundle(...components);
        this.stateMap.set(state, bundle);
    }

    switchStates(em, entityId, newState) {
        if (!newState) return;
        const oldBundle = this.stateMap.get(this.currentState);
        if (oldBundle) oldBundle.removeFromEntity(em, entityId);

        this.currentState = newState;

        const newBundle = this.stateMap.get(newState);

        if (newBundle) newBundle.addToEntity(em, entityId);

        console.log("state switched to", this.currentState);
    }
}
