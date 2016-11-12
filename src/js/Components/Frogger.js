import MovingObject from './MovingObject.js';
import DrawFunctions from '../Utilities/DrawFunctions.js';
import BoardService from './Board/BoardService.js';

export default class Frogger extends MovingObject {
    constructor(board, posX, posY, direction, lives) {
        super();
        this.height = 50;
        this.width = 50;
        this.posX = board.width * 0.5;
        this.posY = board.height - this.height;
        this.nextPosX = null;
        this.nextPosY = null;
        this.direction = null;
        this.moving = false;
        this.movingCount = 0;
        this.speed = 5;
        this.lives = 3;
    };

    drawFrogger(ctx) {
        DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'green');
    }

    triggerMove(event){
      if(!this.moving){
        this.setDirection(event);
        this.calculateFroggerNextPos();
        this.moving = true;
      }
    }

    setDirection(event) {
        switch (event.which) {
            case 37:
                this.direction = 'left';
                break;
            case 38:
                this.direction = 'up';
                break;
            case 39:
                this.direction = 'right';
                break;
            case 40:
                this.direction = 'down';
                break;
            default:
                false;
        };
    }

    calculateFroggerNextPos(){
      switch (this.direction) {
          case 'left':
              this.nextPosX = this.posX - 50;
              break;
          case 'up':
              this.nextPosY = this.posY - 50;
              break;
          case 'right':
              this.nextPosX = this.posX + 50;
              break;
          case 'down':
              this.nextPosY = this.posX + 50;
              break;
          default:
              this.nextPosY = null;
              this.nextPosX = null;
      };
    }

    move() {
        if(this.moving){
          switch (this.direction) {
              case 'left':
                  this.posX -= this.speed;
                  break;
              case 'up':
                  this.posY -= this.speed;
                  break;
              case 'right':
                  this.posX += this.speed;
                  break;
              case 'down':
                  this.posY += this.speed;
                  break;
              default:
                  break;
          };
          this.movingCount++;
          if(this.movingCount >= 50 / this.speed){
            this.movingCount = 0;
            this.moving = false;
          };
        }
    }

}
