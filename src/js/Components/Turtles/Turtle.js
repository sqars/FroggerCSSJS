import MovingObject from '../MovingObject.js';
import TurtleService from './TurtleService.js';
import DrawFunctions from '../../Utilities/DrawFunctions.js';

export default class Turtle extends MovingObject{
  constructor(posX, line, speed, diving){
    super(posX);
    this.line = line;
    this.speed = speed;
    this.height = 50;
    this.width = TurtleService.generateWidth(line);
    this.posY = TurtleService.generateYPos(line);
    this.diving = diving;
    this.direction = 'left';
  }

  drawTurtle(ctx) {
      DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'brown');
  }
}
