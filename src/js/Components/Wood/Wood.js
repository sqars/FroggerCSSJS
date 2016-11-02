import MovingObject from '../MovingObject.js';
import WoodService from './WoodService.js';

export default class Wood extends MovingObject{
  constructor(posX, line){
    super(posX);
    this.line = line;
    this.posY = WoodService.generateYPos(line);
    this.direction = 'right';
  }

  setWoodPosition(board){
    this.posX > 13 ? this.posX = 0 : false;
    board[this.getPosition()].className = "wood";
  }
}
