export default class Paddle {
    constructor(game, player) {
        this.gameHeight = game.gameHeight;

        this.width = 9;
        this.height = 70;

        let pos;
        this.maxSpeed = 3.5;
        this.speed = 0;

        if (player === "p1") {
            pos = this.width + 10;
        } else {
            pos = game.gameWidth - this.width * 2 - 10;
        }

        this.position = {
            x: pos, y: game.gameHeight / 2 - this.height / 2
        };
    }

    moveUp() {
        this.speed = -this.maxSpeed;
    }

    moveDown() {
        this.speed = this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }

    draw(ctx) {
        ctx.fillStyle = "#e8e8e8";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.y += this.speed;
        if (this.position.y < 0) this.position.y = 0;
        if (this.position.y + this.height > this.gameHeight) this.position.y = this.gameHeight - this.height;
    }
}
