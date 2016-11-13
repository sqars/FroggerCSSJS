import MovingObject from '../MovingObject.js';
import CarService from './CarService';
import DrawFunctions from '../../Utilities/DrawFunctions.js';
import Generators from '../../Utilities/Generators.js';

export default class Car extends MovingObject {

    constructor(posX, line, speed) {
        super(posX);
        this.posY = CarService.generateYPos(line);
        this.line = line;
        this.height = 50;
        this.width = CarService.generateWidth(line);
        this.direction = CarService.generateDirection(line);
        this.speed = Generators.generateSpeed(this.width);
    }

    drawCar(ctx) {
        DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'red');
    }

}
