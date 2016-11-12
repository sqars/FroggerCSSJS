import MovingObject from '../MovingObject.js';
import WoodService from './WoodService.js';
import DrawFunctions from '../../Utilities/DrawFunctions.js';

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
      DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'beige');
  }

} 
