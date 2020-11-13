let scoreText = document.querySelector("#score");

let p1Score = 0;
let p2Score = 0;

scoreText.innerHTML = `${p1Score} - ${p2Score}`;

export default class Ball {
    constructor(game) {
        this.ballRadius = 5;
        this.gameHeight = game.gameHeight;
        this.gameWidth = game.gameWidth;

        this.game = game;

        this.speed = { x: (Math.sign(0.5 - Math.random())) * 6, y: 0 };

        this.position = {
            x: game.gameWidth / 2, y: game.gameHeight / 2
        };
    }

    draw(ctx) {
        ctx.fillStyle = "#e8e8e8";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.ballRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    reset(dir) {
        this.position.x = this.gameWidth / 2;
        this.position.y = this.gameHeight / 2;
        this.speed = { x: dir, y: 0 };
    }

    resetInTheEnd(dir) {
        document.addEventListener("keydown", e => {
            if (e.keyCode === 82) {
                this.reset(dir);
            }
        });
    }

    updateScore() {
        if (this.position.x - this.ballRadius < 0) {
            p2Score++;
            scoreText.innerHTML = `${p1Score} - ${p2Score}`;
            this.reset(6);
        }

        if (this.position.x + this.ballRadius > this.gameWidth) {
            p1Score++;
            scoreText.innerHTML = `${p1Score} - ${p2Score}`;
            this.reset(-6);
        }

        if (p1Score === 3) {
            scoreText.innerHTML = `p1 won`;
            p1Score = 0;
            p2Score = 0;
            this.speed = { x: 0, y: 0 };
            this.resetInTheEnd(-6);
        }

        if (p2Score === 3) {
            scoreText.innerHTML = `p2 won`;
            p1Score = 0;
            p2Score = 0;
            this.speed = { x: 0, y: 0 };
            this.resetInTheEnd(6);
        }
    }

    update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        //bounce from walls
        if (this.position.x - this.ballRadius < 0 || this.position.x + this.ballRadius > this.gameWidth) { this.speed.x = -this.speed.x; }
        if (this.position.y - this.ballRadius < 0 || this.position.y + this.ballRadius > this.gameHeight) { this.speed.y = -this.speed.y; }

        //bounce from shitty paddles
        let stupidBall = this.position.x;
        let stupidPaddle1 = this.game.paddle1.position.x + this.game.paddle1.width;
        let stupidPaddle2 = this.game.paddle2.position.x;

        if (stupidBall - this.ballRadius <= stupidPaddle1
            &&
            this.position.y >= this.game.paddle1.position.y
            &&
            this.position.y <= this.game.paddle1.position.y + this.game.paddle1.height) {
            let collidePoint = (this.position.y - (this.game.paddle1.position.y + this.game.paddle1.height / 2));
            collidePoint = collidePoint / (this.game.paddle1.height / 2);
            let angleRad = (Math.PI / 4) * collidePoint;
            this.speed = { x: 6 * (Math.cos(angleRad)), y: 6 * (Math.sin(angleRad)) };
        }

        if (stupidBall + this.ballRadius >= stupidPaddle2
            &&
            this.position.y >= this.game.paddle2.position.y
            &&
            this.position.y <= this.game.paddle2.position.y + this.game.paddle2.height) {
            let collidePoint = (this.position.y - (this.game.paddle2.position.y + this.game.paddle2.height / 2));
            collidePoint = collidePoint / (this.game.paddle2.height / 2);
            let angleRad = (Math.PI / 4) * collidePoint;
            this.speed = { x: -6 * (Math.cos(angleRad)), y: 6 * (Math.sin(angleRad)) };
        }
    }
}