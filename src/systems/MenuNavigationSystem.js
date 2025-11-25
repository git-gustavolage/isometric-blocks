import { InputComp } from "../components/InputComp.js";
import { MenuSelectorComp } from "../components/MenuSelectorComp.js";
import { UIComp } from "../components/UIComp.js";
import { Engine } from "../core/Engine.js";

export class MenuNavigationSystem {
    constructor(em) {
        this.em = em;
    }

    update(dt) {
        for (const [eid, input, selector, ui] of this.em.query(InputComp, MenuSelectorComp, UIComp).get()) {
            if (input.keyboard.isPressed("ArrowUp")) {
                selector.up();
            }
            if (input.keyboard.isPressed("ArrowDown")) {
                selector.down();
            }

            for (let i = 0; i < selector.optionsCount; i++) {
                const label = ui.get(`menu_opt_${i}`);
                if (!label) continue;
                label.color = (i === selector.selectedIndex) ? "#0078FF" : "#222";
            }

            if (input.keyboard.isPressed("Enter")) {
                const selectedLabel = ui.get(`menu_opt_${selector.selectedIndex}`);
                const text = selectedLabel?.text ?? "";

                if (text === "Iniciar") {
                    Engine.getInstance().sceneManager.switchTo("transition");
                } else if (text === "Opções") {
                    Engine.getInstance().sceneManager.switchTo("options");
                }
            }

            input.keyboard.clear();
        }
    }
}
