import { CountDownComp } from "./components/CountdownComp.js";
import { GridComp } from "./components/GridComp.js";
import { LabelComp } from "./components/LabelComp.js";
import { RenderableCounterComp } from "./components/RenderableCounterComp.js";
import { StateMachine } from "./components/StateMachine.js";
import { TransformComp } from "./components/TransformComp.js";
import { AudioComp } from "./components/AudioComp.js";
import { Engine } from "./core/Engine.js";
import { Scene } from "./scenes/Scene.js";
import { CountDownSystem } from "./systems/CountDownSystem.js";
import { GridSystem } from "./systems/GridSystem.js";
import { RenderSystem } from "./systems/RenderSystem.js";
import { StateMachineSystem } from "./systems/StateMachineSystem.js";
import { PatternBundle } from "./components/PatternBundle.js";
import { InputComp } from "./components/InputComp.js";
import { InputSystem } from "./systems/InputSystem.js";
import { DataComp } from "./components/DataComp.js";
import { GuestSystem } from "./systems/GuestSystem.js";
import { CounterComp } from "./components/CounterComp.js";
import { StateTransitionComp } from "./components/StateTransitionComp.js";
import { BlockPatternSystem } from "./systems/BlockPatternSystem.js";
import { PatternComp } from "./components/PatternComp.js";
import { IterativePattern } from "./components/IterativePattern.js";
import { UIComp } from "./components/UIComp.js";
import { RenderablePointCounterComp } from "./components/RenderablePointCounterComp.js";
import { PointSystem } from "./systems/PointSystem.js";
import { RectComp } from "./components/RectComp.js";
import { MenuNavigationSystem } from "./systems/MenuNavigationSystem.js";
import { MenuSelectorComp } from "./components/MenuSelectorComp.js";
import { OptionsSystem } from "./systems/OptionSystem.js";
import { config } from "./config.js";
import { CheckboxComp } from "./components/CheckboxComp.js";
import { RangeComp } from "./components/RangeComp.js";
import { GameOverSystem } from "./systems/GameOverSystem.js";

export function menu() {
    const scene = new Scene("menu");

    scene.registerSystem(new InputSystem(scene.em));
    scene.registerSystem(new RenderSystem(scene.em, Engine.getCtx()));
    scene.registerSystem(new MenuNavigationSystem(scene.em));

    const centerX = Engine.getBounds().width / 2;
    const centerY = Engine.getBounds().height / 2;

    const menuEntity = scene.em.createEntity();

    const uiItems = [
        new LabelComp({ id: "title", text: "Isometric Blocks", x: centerX, y: centerY - 200, size: 48, color: "#222", alignX: "center" }),
        new LabelComp({ id: "menu_opt_0", text: "Iniciar", x: centerX, y: centerY - 20, size: 32, color: "#222", alignX: "center" }),
    ];

    scene.em.addComponent(menuEntity, new InputComp());
    scene.em.addComponent(menuEntity, new UIComp(uiItems));
    const selector = new MenuSelectorComp({ selectedIndex: 0, optionsCount: 2 });
    scene.em.addComponent(menuEntity, selector);

    return scene;
}

export function gameOver() {
    const scene = new Scene("gameover");

    scene.registerSystem(new InputSystem(scene.em));
    scene.registerSystem(new GameOverSystem(scene.em));
    scene.registerSystem(new RenderSystem(scene.em, Engine.getCtx()));
    scene.registerSystem(new MenuNavigationSystem(scene.em));

    const centerX = Engine.getBounds().width / 2;
    const centerY = Engine.getBounds().height / 2;

    const menuEntity = scene.em.createEntity();

    const uiItems = [
        new LabelComp({ id: "title", text: "Você perdeu!", x: centerX, y: centerY - 200, size: 48, color: "#222", alignX: "center" }),
        new LabelComp({ id: "pontuacao", text: "Sua pontuação: ", x: centerX, y: centerY - 100, size: 24, color: "#222", alignX: "center" }),
        new LabelComp({ id: "inpt_01", text: "Voltar para o início", x: centerX, y: centerY - 20, size: 24, color: "#0000ee", alignX: "center" }),
    ];

    scene.em.addComponent(menuEntity, new InputComp());
    scene.em.addComponent(menuEntity, new UIComp(uiItems));
    scene.em.addComponent(menuEntity, new DataComp({}));


    return scene;
}

export function options() {
    const scene = new Scene("options");

    scene.registerSystem(new InputSystem(scene.em));
    scene.registerSystem(new RenderSystem(scene.em, Engine.getCtx()));
    scene.registerSystem(new OptionsSystem(scene.em, Engine.getCtx()));

    const cx = Engine.getBounds().width / 2;
    const cy = Engine.getBounds().height / 2;

    const e = scene.em.createEntity();

    const modalW = 520;
    const modalH = 300;
    const modalX = cx - modalW / 2;
    const modalY = cy - modalH / 2;

    const uiItems = [
        new RectComp({ x: modalX, y: modalY, width: modalW, height: modalH, background: "#ffffffff" }),
        new LabelComp({ id: "options_title", text: "Opções", x: cx, y: modalY + 20, size: 28, color: "#222", alignX: "center" }),

        new RectComp({ id: "opt_box_checkbox_border", x: modalX + 40, y: modalY + 76, width: 360, height: 68, background: null, borderColor: null, borderWidth: 0 }),
        new RectComp({ id: "opt_checkbox_box", x: modalX + 64, y: modalY + 92, width: 30, height: 30, background: "#ddd" }),
        new LabelComp({ id: "opt_checkbox_mark", text: (config.game_increment_speed ? "X" : ""), x: modalX + 64 + 15, y: modalY + 92 + 20, size: 20, color: "#000", alignX: "center" }),
        new LabelComp({ id: "opt_checkbox_label", text: "Incrementar Velocidade", x: modalX + 110, y: modalY + 102, size: 20, color: "#222", alignX: "left" }),

        new RectComp({ id: "opt_box_range_border", x: modalX + 40, y: modalY + 150, width: 360, height: 100, background: null, borderColor: null, borderWidth: 0 }),
        new LabelComp({ id: "opt_range_text", text: "Velocidade Base:", x: modalX + 70, y: modalY + 175, size: 18, color: "#222", alignX: "left" }),
        new RectComp({ id: "opt_range_line", x: modalX + 210, y: modalY + 176, width: 30 * 4, height: 2, background: "#000" })
    ];

    const startX = modalX + 210;
    const spacing = 30;
    const min = 1, max = 5;
    for (let i = 0; i <= (max - min); i++) {
        const tx = startX + i * spacing;
        uiItems.push(new RectComp({ id: `opt_range_tick_${i}`, x: tx - 1, y: modalY + 176 - 5, width: 2, height: 5, background: "#000" }));
        uiItems.push(new LabelComp({ id: `opt_range_num_${i}`, text: String(min + i), x: tx, y: modalY + 176 - 18, size: 12, color: "#000", alignX: "center" }));
    }

    uiItems.push(new LabelComp({ id: "opt_range_pointer", text: "▲", x: startX + (config.game_base_speed_multiplier - 1) * spacing, y: modalY + 176 + 12, size: 18, color: "#000", alignX: "center" }));
    uiItems.push(new LabelComp({ id: "opt_range_value", text: String(config.game_base_speed_multiplier), x: startX + (config.game_base_speed_multiplier - 1) * spacing, y: modalY + 176 + 40, size: 14, color: "#222", alignX: "center" }));

    uiItems.push(new RectComp({ id: "opt_box_back_border", x: modalX + 40, y: modalY + modalH - 70, width: 360, height: 50, background: null }));
    uiItems.push(new LabelComp({ id: "opt_back_label", text: "Voltar", x: cx, y: modalY + modalH - 40, size: 20, color: "#222", alignX: "center" }));

    scene.em.addComponent(e, new UIComp(uiItems));
    scene.em.addComponent(e, new InputComp());

    const menuSelector = new MenuSelectorComp({ selectedIndex: 0, optionsCount: 3 });
    scene.em.addComponent(e, menuSelector);

    scene.em.addComponent(e, new CheckboxComp({
        value: config.game_increment_speed,
        labelId: "opt_checkbox_label",
        boxId: "opt_checkbox_box",
        markId: "opt_checkbox_mark"
    }));

    const tickIds = [];
    for (let i = 0; i <= 4; i++) tickIds.push(`opt_range_tick_${i}`);
    scene.em.addComponent(e, new RangeComp({
        min: 1,
        max: 5,
        value: config.game_base_speed_multiplier || 1,
        step: 1,
        pointerId: "opt_range_pointer",
        tickIds,
        labelId: "opt_range_value"
    }));

    return scene;
}

export function transition() {
    const scene = new Scene("transition");

    scene.registerSystem(new CountDownSystem(scene.em));
    scene.registerSystem(new RenderSystem(scene.em, Engine.getCtx()));

    const countDown = scene.em.createEntity();

    scene.em.addComponent(countDown, new CountDownComp(3, () => Engine.getInstance().sceneManager.switchTo("gamemode1")));
    scene.em.addComponent(countDown, new RenderableCounterComp());
    scene.em.addComponent(countDown, new AudioComp("public/audio/countdown.mp3"));
    scene.em.addComponent(countDown, new UIComp([
        new LabelComp({ id: "countdown", x: Engine.getBounds().width / 2, y: 250, size: 128, color: "#222", alignX: "center", circle: { lineWidth: 10 } }),
    ]));

    return scene;
}

export function gamemode1() {
    const mode1 = new Scene("gamemode1");

    mode1.registerSystem(new InputSystem(mode1.em));
    mode1.registerSystem(new RenderSystem(mode1.em, Engine.getCtx()));
    mode1.registerSystem(new PointSystem(mode1.em));
    mode1.registerSystem(new CountDownSystem(mode1.em));
    mode1.registerSystem(new StateMachineSystem(mode1.em));
    mode1.registerSystem(new GridSystem(mode1.em));
    mode1.registerSystem(new BlockPatternSystem(mode1.em));
    mode1.registerSystem(new GuestSystem(mode1.em));

    const grid = mode1.em.createEntity();
    const gridSm = new StateMachine();

    gridSm.createState("preparing", [
        new StateTransitionComp("showing"),
        new GridComp(5, 5),
        new CountDownComp(3, () => gridSm.switchStates(mode1.em, grid, "showing")),
        new RenderableCounterComp(),
        new UIComp([
            new LabelComp({ id: "countdown", x: Engine.getBounds().width / 2, y: Engine.getBounds().height * 0.1, size: 32, color: "#222", alignX: "center" }),
        ]),
        new AudioComp("public/audio/start.mp3"),
    ]);

    gridSm.createState("showing", [
        new StateTransitionComp("guesting"),
        new GridComp(5, 5),
        new PatternComp(),
    ]);

    gridSm.createState("guesting", [
        new StateTransitionComp("evaluating"),
        new GridComp(5, 5),
        new InputComp(),
        new CounterComp(),
        new UIComp([
            new RectComp({
                x: Engine.getBounds().width * 0.1 - 35,
                y: Engine.getBounds().height * 0.8 - 17,
                width: 70,
                height: 90,
                background: "#666"
            }),
            new RectComp({
                x: Engine.getBounds().width * 0.1 + 45,
                y: Engine.getBounds().height * 0.8 - 17,
                width: 70,
                height: 90,
                background: "#666"
            }),
            new LabelComp({ id: "player_guest_dozens", text: "0", x: Engine.getBounds().width * 0.1, y: Engine.getBounds().height * 0.8, size: 64, color: "#fff", alignX: "center", }),
            new LabelComp({ id: "player_guest_units", text: "0", x: Engine.getBounds().width * 0.1 + 80, y: Engine.getBounds().height * 0.8, size: 64, color: "#fff", alignX: "center", }),
            new LabelComp({ id: "label_player_guest", text: "Quantos Blocos?", x: Engine.getBounds().width / 2, y: Engine.getBounds().height * 0.1, size: 32, color: "#222", alignX: "center", }),
        ])
    ]);

    gridSm.createState("evaluating", [
        new StateTransitionComp("preparing"),
        new GridComp(5, 5),
        new UIComp([
            new LabelComp({ id: "blocks_counter", text: "0", x: Engine.getBounds().width / 2, y: Engine.getBounds().height * 0.1, size: 32, color: "#222", alignX: "center" }),
        ]),
        new PatternComp(),
        new IterativePattern(2),
    ]);

    mode1.em.addComponent(grid, new TransformComp(Engine.getBounds().width / 2, Engine.getBounds().height * 0.4, 110, 65));
    mode1.em.addComponent(grid, new PatternBundle());
    mode1.em.addComponent(grid, new DataComp({ points: 0 }));
    mode1.em.addComponent(grid, new RenderablePointCounterComp([
        new LabelComp({ id: "points", text: "0 pontos", x: Engine.getBounds().width * 0.1, y: Engine.getBounds().height * 0.1, size: 24, color: "#222", alignX: "center" }),
    ]));
    mode1.em.addComponent(grid, gridSm);

    return mode1;
}
