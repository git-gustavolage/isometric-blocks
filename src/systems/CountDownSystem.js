import { AudioComp } from "../components/AudioComp.js";
import { CountDownComp } from "../components/CountdownComp.js";
import { RenderableCounterComp } from "../components/RenderableCounterComp.js";
import { UIComp } from "../components/UIComp.js";
import { config } from "../config.js";
import { audioPlayer } from "../core/AudioManager.js";

export class CountDownSystem {
    constructor(em) {
        this.em = em;
        this.oldTimer = null;
        this.audioPlayer = audioPlayer;
    }

    update(dt) {
        for (const [eid, counter] of this.em.query(CountDownComp).get()) {
            if (!counter.dispatched) {
                counter.remaining -= dt * config.game_base_speed_multiplier;
            }

            const currentInSeconds = Math.ceil(counter.remaining / 1000);

            if (this.oldTimer != currentInSeconds) {
                this.oldTimer = currentInSeconds;
                const audio = this.em.getComponent(eid, AudioComp);
                if (audio && currentInSeconds != 0) {
                    audioPlayer.play(audio.path);
                }
            }

            if (this.em.getComponent(eid, RenderableCounterComp)) {
                const label = this.em.getComponent(eid, UIComp).get("countdown");
                if (label) {
                    label.text = currentInSeconds;
                }
            }

            if (!counter.dispatched && counter.remaining <= 0) {
                counter.remaining = 0;
                counter.dispatch();
            }
        }
    }
}
