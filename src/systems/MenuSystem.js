import { MenuComp } from "../components/MenuComp.js";
import { keyboard } from "../core/input/KeyboardInput.js";

export class MenuSystem {
    constructor(em) {
        this.em = em;
    }

    update() {
        for (const [eid, menu] of this.em.query(MenuComp).get()) {

            if (keyboard.isPressed("ArrowUp")) {
                menu.moveUp();
                keyboard.clear();
            }

            if (keyboard.isPressed("ArrowDown")) {
                menu.moveDown();
                keyboard.clear();
            }

            if (keyboard.isPressed("Enter")) {
                EventManager.emit("scene:game");
            }
        }
    }

    render(ctx) {
        for (const [eid, menu] of this.em.query(MenuComp).get()) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = "#ecf2fc";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            ctx.fillStyle = "#000";
            ctx.font = "bold 32px sans-serif";
            ctx.textAlign = "center";

            ctx.fillText("ISO Blocks", ctx.canvas.width / 2, 200);

            ctx.font = "24px sans-serif";
            menu.options.forEach((opt, i) => {
                const y = 300 + i * 40;
                ctx.fillStyle = i === menu.selected ? "#000" : "#888";
                ctx.textAlign = "start";
                ctx.fillText((i === menu.selected ? "> " : "  ") + opt, ctx.canvas.width / 2 - 80, y);
            });
        }
    }
}
