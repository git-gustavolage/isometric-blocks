import { CheckboxComp } from "../components/CheckboxComp.js";
import { InputComp } from "../components/InputComp.js";
import { MenuSelectorComp } from "../components/MenuSelectorComp.js";
import { RangeComp } from "../components/RangeComp.js";
import { UIComp } from "../components/UIComp.js";
import { config } from "../config.js";
import { Engine } from "../core/Engine.js";

export class OptionsSystem {
    constructor(em, ctx) {
        this.em = em;
        this.ctx = ctx;
    }

    update(dt) {
        for (const [eid, input, selector, ui] of this.em.query(InputComp, MenuSelectorComp, UIComp).get()) {
            if (input.keyboard.isPressed("ArrowUp")) selector.up();
            if (input.keyboard.isPressed("ArrowDown")) selector.down();

            const selected = selector.selectedIndex;

            const checkbox = this.em.getComponent(eid, CheckboxComp);
            const range = this.em.getComponent(eid, RangeComp);

            if (selected === 0) {
                if (input.keyboard.isPressed("Enter") && checkbox) {
                    checkbox.toggle();
                    config.game_increment_speed = checkbox.value;
                    const mark = ui.get(checkbox.markId);
                    if (mark) mark.text = checkbox.value ? "X" : "";
                }
            }

            if (selected === 1) {
                if (input.keyboard.isPressed("ArrowLeft") && range) {
                    range.decrease();
                    config.game_base_speed_multiplier = range.value;
                }
                if (input.keyboard.isPressed("ArrowRight") && range) {
                    range.increase();
                    config.game_base_speed_multiplier = range.value;
                }
            }

            if (selected === 2) {
                if (input.keyboard.isPressed("Enter")) {
                    Engine.getInstance().sceneManager.switchTo("menu");
                }
            }

            const borders = [
                "opt_box_checkbox_border",
                "opt_box_range_border",
                "opt_box_back_border"
            ];

            for (let i = 0; i < borders.length; i++) {
                const rect = ui.get(borders[i]);
                if (!rect) continue;
                rect.borderColor = i === selected ? "#FFDD55" : null;
                rect.borderWidth = i === selected ? 3 : 0;
            }

            if (range) {
                const pointerLabel = ui.get(range.pointerId);
                const baseLine = ui.get("opt_range_line");
                if (pointerLabel && baseLine) {
                    const spacing = 30;
                    const idx = range.index();
                    pointerLabel.x = baseLine.x + idx * spacing;
                    pointerLabel.y = baseLine.y + 12;
                }

                const valueLabel = ui.get(range.labelId);
                if (valueLabel) {
                    valueLabel.text = String(range.value);
                }

                const baseText = ui.get("opt_range_text");
                if (baseText) {
                    baseText.text = "Velocidade Base:";
                }
            }

            input.keyboard.clear();
        }
    }
}
