import { DataComp } from "../components/DataComp.js";
import { InputComp } from "../components/InputComp.js";
import { UIComp } from "../components/UIComp.js";
import { Engine } from "../core/Engine.js";

export class GameOverSystem {
    constructor(em) {
        this.em = em;
        this.max = window.localStorage.getItem("max_points") || 0;
    }

    update(dt) {
        for (const [eid, ui, input, data] of this.em.query(UIComp, InputComp, DataComp).get()) {

            if (input.keyboard.isPressed("Enter")) {
                Engine.getInstance().sceneManager.switchTo("menu");
            }

            ui.get("pontuacao").text = "Sua pontuação mais alta: " + this.max + " pontos";

            input.keyboard.clear();
        }
    }
}