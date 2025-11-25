import { PatternComp } from "../components/PatternComp.js";
import { StateTransitionComp } from "../components/StateTransitionComp.js";
import { config } from "../config.js";
import { default as data } from "../../public/patterns.json" with { type: "json"};
import { IterativePattern } from "../components/IterativePattern.js";
import { BlockComp } from "../components/BlockComp.js";
import { UIComp } from "../components/UIComp.js";
import { DataComp } from "../components/DataComp.js";
import { audioPlayer } from "../core/AudioManager.js";
import { Engine } from "../core/Engine.js";

export class BlockPatternSystem {
    constructor(em) {
        this.em = em;
        this.patterns = data.patterns;
        this.currentIndex = -1;
        this.current = null;
        this.toRevel = null;
        this.lastPicked = [];
        this.lastLimit = 30;
    }

    update(dt) {
        for (const [eid, pattern] of this.em.query(PatternComp).without(IterativePattern).get()) {
            if (!this.current) {
                this.current = this.random()
                pattern.from(this.current);
                console.log(this.current.name);
            }

            pattern.duration -= dt * config.game_pattern_base_speed;

            if (pattern.duration <= 0) {
                this.em.getComponent(eid, StateTransitionComp).ready = true;
                this.toRevel = this.current;
                this.current = null;
            }
        }

        for (const [eid, pattern, iterative, ui] of this.em.query(PatternComp, IterativePattern, UIComp).get()) {
            if (!this.toRevel || !this.toRevel.blocks) continue;

            const blocks = this.toRevel.blocks;
            const totalBlocks = blocks.length;

            const speed = dt * config.game_pattern_base_speed;

            if (iterative.elapsed < iterative.duration) {

                iterative.elapsed += speed;

                const progress = Math.min(iterative.elapsed / iterative.duration, 1);
                const revealCount = Math.floor(progress * totalBlocks);

                if (revealCount > iterative.lastReveal) {
                    audioPlayer.play("public/audio/timer.mp3");
                    iterative.lastReveal = revealCount;
                }

                pattern.blocks.length = 0;
                for (let i = 0; i < revealCount; i++) {
                    const block = BlockComp.from(blocks[i]);
                    block.topColor = "#c8f3dcff";
                    block.leftColor = "#a1e0beff";
                    block.rightColor = "#76b495ff";
                    block.strokeStyle = "#0e912cff";
                    pattern.blocks.push(block);
                }

                ui.get("blocks_counter").text = revealCount;
                continue;
            }

            iterative.completedElapsed += speed;

            if (iterative.completedElapsed >= 1000) {
                if (iterative.delayAfterWin === 0) {
                    const data = this.em.getComponent(eid, DataComp);
                    const player_guest = data.get("player_guest", 0);

                    if (blocks.length == player_guest) {
                        data.set("points", data.get("points", 0) + 1);
                        audioPlayer.play("public/audio/win.wav");
                    } else {
                        const max = data.get("max_points", 0);
                        const curr = data.get("points", 0);
                        if (curr > max) {
                            data.set("max_points", curr);
                        }
                        config.game_base_speed_multiplier = 1;
                        Engine.getInstance().sceneManager.switchTo("gameover");
                    }
                    iterative.delayAfterWin = 1000;
                }

                iterative.delayAfterWin -= speed;

                if (iterative.delayAfterWin > 0) {
                    return;
                }

                pattern.blocks = [];
                this.em.getComponent(eid, StateTransitionComp).ready = true;
                this.toRevel = null;

                config.game_base_speed_multiplier = Math.min(4, config.game_base_speed_multiplier * 1.2);
            }
        }
    }

    _next() {
        this.currentIndex = this.currentIndex + 1 < this.patterns.length ? this.currentIndex + 1 : 0;
        this.current = this.patterns[this.currentIndex];
    }

    random() {
        const arr = data.patterns;

        if (!Array.isArray(arr) || arr.length === 0)
            return undefined;

        const filtered = arr.filter(p => !this.lastPicked.includes(p));

        if (filtered.length === 0) {
            this.lastPicked = [];
            filtered.push(...arr);
        }

        const index = Math.floor(Math.random() * filtered.length);
        const result = filtered[index];

        this.lastPicked.push(result);
        if (this.lastPicked.length > this.lastLimit) {
            this.lastPicked.shift();
        }

        return result;
    }
}