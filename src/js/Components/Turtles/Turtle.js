import MovingObject from '../MovingObject.js';
import TurtleService from './TurtleService.js';

export default class Turtle extends MovingObject{
  constructor(posX, line){
    super(posX);
    this.line = line;
    this.posY = TurtleService.generateYPos(line);
    this.direction = 'left';
  }

  setTurtlePosition(board){
    this.posX < 0 ? this.posX = 13 : false;
    board[this.getPosition()].className = "turtle";
  }
}
