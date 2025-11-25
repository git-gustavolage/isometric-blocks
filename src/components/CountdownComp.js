export class CountDownComp {
    constructor(remaining, callable, renderable) {
        this.remaining = remaining * 1000;
        this.callable = callable;
        this.renderable = renderable;
        this.dispatched = false;
    }

    dispatch() {
        this.callable();
        this.dispatched = true;
    }
}