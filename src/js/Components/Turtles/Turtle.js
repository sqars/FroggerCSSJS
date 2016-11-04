import MovingObject from '../MovingObject.js';
import TurtleService from './TurtleService.js';

export default class Turtle extends MovingObject{
  constructor(posX, line, speed){
    super(posX);
    this.line = line;
    this.speed = speed;
    this.height = 50;
    this.width = TurtleService.generateWidth(line);
    this.posY = TurtleService.generateYPos(line);
    this.direction = 'left';
  }

  drawTurtle(ctx) {
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.fillStyle = "brown";
      ctx.fill();
      ctx.closePath();
  }
}
