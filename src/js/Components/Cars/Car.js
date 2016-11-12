import MovingObject from '../MovingObject.js';
import CarService from './CarService';
import DrawFunctions from '../../Utilities/DrawFunctions.js';

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
    DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'red');
  }

}
