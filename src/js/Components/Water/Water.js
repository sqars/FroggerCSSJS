import StaticObject from '../StaticObject.js';
import WaterService from './WaterService.js';

export default class Water extends StaticObject{
  constructor(posX, line){
    super(posX);
    this.posY = WaterService.generateYPos(line);
  }

  setWaterPosition(board){
    board[this.getPosition()].className = "water";
  }
}
