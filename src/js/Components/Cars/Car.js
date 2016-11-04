import MovingObject from '../MovingObject.js';
import CarService from './CarService';

export default class Car extends MovingObject{

  constructor(posX, line, speed){
    super(posX);
    this.line = line;
    this.speed = speed;
    this.height = 50;
    this.width = CarService.generateWidth(line);
    this.posY = CarService.generateYPos(line);
    this.direction = CarService.generateDirection(line);
  }

  drawCar(ctx) {
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.strokeStyle = "red";
      ctx.stroke();
  }

}
