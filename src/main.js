import Game from "./game.js";

const canvas = document.getElementById("gameScreen");
// @ts-ignore
const ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();

let lastTime = 0;
let isPaused = true;
let gameBegin = false;

function render(timestamp) {
    if (!isPaused) {
        let deltaTime = timestamp - lastTime;
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        game.update(deltaTime);
        game.draw(ctx);
    }
    requestAnimationFrame(render);
}

document.addEventListener("keydown", e => {
    if (e.keyCode === 32) {
        if (!gameBegin) {
            render();
            gameBegin = true;
        }
        isPaused = !isPaused;
    }
});