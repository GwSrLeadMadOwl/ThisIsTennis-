export default class InputHandler {
    constructor(paddle, player) {
        document.addEventListener("keydown", e => {
            // alert(e.keyCode);

            if (player === "p1") {
                switch (e.keyCode) {
                    case 87: paddle.moveUp();
                        break;
                    case 83: paddle.moveDown();
                        break;
                }
            }
            if (player === "p2") {
                switch (e.keyCode) {
                    case 38: paddle.moveUp();
                        break;
                    case 40: paddle.moveDown();
                        break;
                }
            }

        });

        document.addEventListener("keyup", e => {
            if (player === "p1") {
                switch (e.keyCode) {
                    case 87: if (paddle.speed < 0) paddle.stop();
                        break;
                    case 83: if (paddle.speed > 0) paddle.stop();
                        break;
                }
            }
            if (player === "p2") {
                switch (e.keyCode) {
                    case 38: if (paddle.speed < 0) paddle.stop();
                        break;
                    case 40: if (paddle.speed > 0) paddle.stop();
                        break;
                }
            }
        });
    }
}