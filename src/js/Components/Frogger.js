import MovingObject from './MovingObject.js';
import DrawFunctions from '../Utilities/DrawFunctions.js';

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
        this.speed = 2;
    };

    drawFrogger(ctx) {
        DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'green');
    }

    setDirection(event) {
        let result = false;
        switch (event.which) {
            case 37:
                this.direction = 'left';
                result = true;
                this.posX - 50 < 0 ? result = false : false;
                break;
            case 38:
                this.direction = 'up';
                result = true;
                this.posY - 50 < 0 ? result = false : false;
                break;
            case 39:
                this.direction = 'right';
                result = true;
                this.posX + 50 > 650 ? result = false : false;
                break;
            case 40:
                this.direction = 'down';
                result = true;
                this.posY + 50 > 600 ? result = false : false;
                break;
            default:
                result = false;
        };
        return result;
    }

    move(direction) {
        let result = false;
        let speed = this.speed;
        switch (direction) {
            case 'left':
                this.posX -= speed;
                break;
            case 'up':
                this.posY -= speed;
                break;
            case 'right':
                this.posX += speed;
                break;
            case 'down':
                this.posY += speed;
                break;
            default:
                break;
        };
        this.movingCount++;
        this.movingCount < 25 ? result = true : this.movingCount = 0;
        return result;
    }

}
