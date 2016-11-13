import MovingObject from '../MovingObject.js';
import WoodService from './WoodService.js';
import DrawFunctions from '../../Utilities/DrawFunctions.js';
import Generators from '../../Utilities/Generators.js';

export default class Wood extends MovingObject {
    constructor(posX, line) {
        super(posX);
        this.line = line;
        this.height = 50;
        this.width = WoodService.generateWidth(line)
        this.posY = WoodService.generateYPos(line);
        this.speed = Generators.generateSpeed(this.width);
        this.direction = 'right';
    }

    drawWood(ctx) {
        DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'beige');
    }

}
