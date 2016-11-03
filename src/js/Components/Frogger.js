import MovingObject from './MovingObject.js';

export default class Frogger extends MovingObject{
  constructor(board, posX, posY, direction, lives){
    super();
    this.height = 50;
    this.width = 50;
    this.posX = board.width * 0.5;
    this.posY = board.height - this.height;
    this.direction = 'up';
    this.lives = 3;
  };

  drawFrogger(ctx) {
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, 50, 50);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

  setFroggerPosition(board){
    board[this.getPosition()].className = "frogger";
  };

  move(event){
    switch(event.which){
      case 37:
        this.direction = 'left';
        this.posX--;
        break;
      case 38:
        this.direction = 'up';
        this.posY--;
        break;
      case 39:
        this.direction = 'right';
        this.posX++;
        break;
      case 40:
        this.direction = 'down';
        this.posY++;
        break;
      default:
        break;
    };
  }

}
