import { audioPlayer } from "./core/AudioManager.js";
import { Engine } from "./core/Engine.js";
import { EntityManager } from "./core/EntityManager.js";
import { gamemode1, gameOver, menu, options, transition } from "./scenes.js";

const canvas = document.getElementById("app");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const em = new EntityManager();
const engine = Engine.make(ctx, em);

engine.sceneManager.addScene("gameover", gameOver);
engine.sceneManager.addScene("menu", menu);
engine.sceneManager.addScene("options", options);
engine.sceneManager.addScene("transition", transition);
engine.sceneManager.addScene("gamemode1", gamemode1);

engine.setup(() => {
    audioPlayer.play("public/audio/silencio.mp3");
    engine.sceneManager.switchTo("menu");
});

engine.start();