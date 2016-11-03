import MovingObject from '../MovingObject.js';
import TurtleService from './TurtleService.js';

export default class Turtle extends MovingObject{
  constructor(posX, line, diving){
    super(posX);
    this.line = line;
    this.posY = TurtleService.generateYPos(line);
    this.direction = 'left';
    this.diving = diving;
    this.dived = false;
  }

  setTurtlePosition(board){
    this.posX < 0 ? this.posX = 13 : false;
    this.dived ? board[this.getPosition()].className = "turtle-diving" : board[this.getPosition()].className = "turtle";
    // board[this.getPosition()].className = "turtle";
  }
}
