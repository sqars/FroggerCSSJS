import MovingObject from '../MovingObject.js';
import WoodService from './WoodService.js';

export default class Wood extends MovingObject{
  constructor(posX, line, speed){
    super(posX);
    this.line = line;
    this.speed = speed;
    this.height = 50;
    this.width = WoodService.generateWidth(line)
    this.posY = WoodService.generateYPos(line);
    this.direction = 'right';
  }

  drawWood(ctx) {
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.fillStyle = "beige";
      ctx.fill();
      ctx.closePath();
  }

}
