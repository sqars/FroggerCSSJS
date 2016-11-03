import MovingObject from './MovingObject.js';

export default class Frogger extends MovingObject {
    constructor(board, posX, posY, direction, lives) {
        super();
        this.height = 50;
        this.width = 50;
        this.posX = board.width * 0.5;
        this.posY = board.height - this.height;
        this.direction = 'up';
        this.lives = 3;
        this.movingCount = 0;
    };

    drawFrogger(ctx) {
        ctx.beginPath();
        ctx.rect(this.posX, this.posY, 50, 50);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }

    setDirection(event) {
        let result = false;
        switch (event.which) {
            case 37:
                this.direction = 'left';
                result = true;
                break;
            case 38:
                this.direction = 'up';
                result = true;
                break;
            case 39:
                this.direction = 'right';
                result = true;
                break;
            case 40:
                this.direction = 'down';
                result = true;
                break;
            default:
                result = false;
        };
        return result;
    }

    move(direction) {
        let result = false;
        switch (direction) {
            case 'left':
                this.posX -= 2;
                break;
            case 'up':
                this.posY -= 2;
                break;
            case 'right':
                this.posX += 2;
                break;
            case 'down':
                this.posY += 2;
                break;
            default:
                break;
        };
        this.movingCount++;
        this.movingCount < 25 ? result = true : this.movingCount = 0;
        return result;
    }

}
