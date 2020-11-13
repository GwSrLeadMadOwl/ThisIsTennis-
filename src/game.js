import Paddle from "./paddle.js";
import Ball from "./ball.js";
import InputHandler from "./input.js";

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start() {
        this.ball = new Ball(this);
        this.paddle1 = new Paddle(this, "p1");
        this.paddle2 = new Paddle(this, "p2");

        this.gameObjects = [this.ball, this.paddle1, this.paddle2];

        new InputHandler(this.paddle1, "p1");
        new InputHandler(this.paddle2, "p2");
    }

    update(deltaTime) {
        // @ts-ignore
        this.gameObjects.forEach((obj) => obj.update(deltaTime));
        this.ball.updateScore();
    }

    draw(ctx) {
        this.gameObjects.forEach((obj) => obj.draw(ctx));
    }
}