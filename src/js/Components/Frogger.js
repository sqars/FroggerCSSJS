import MovingObject from './MovingObject.js';

export default class Frogger extends MovingObject{
  constructor(posX, posY, direction, lives){
    super();
    this.posX = 7;
    this.posY = 12;
    this.direction = 'up';
    this.lives = 3;
  };

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
