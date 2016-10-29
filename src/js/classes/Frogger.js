import MovingObject from './MovingObject.js';
import Board from './Board.js';

export default class Frogger extends MovingObject{
  constructor(posX, posY, direction, lives){
    super(posX, posY, direction);
    this.posX = 7;
    this.posY = 12;
    this.direction = 'up';
    this.lives = 3;
  }

  setFroggerPosition(board, frogger){
    board[this.getPosition(frogger.posX, frogger.posY)].className = "frogger";
  }

}
