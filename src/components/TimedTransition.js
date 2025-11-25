export class TimedTransition {
    constructor(duration, nextState) {
        this.duration = duration * 1000;
        this.nextState = nextState;
    }
}