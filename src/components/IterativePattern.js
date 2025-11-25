export class IterativePattern {
    constructor(duration) {
        this.duration = duration * 1000;
        this.elapsed = 0;
        this.completedElapsed = 0;
        this.lastReveal = 0;
        this.delayAfterWin = 0;
    }
}