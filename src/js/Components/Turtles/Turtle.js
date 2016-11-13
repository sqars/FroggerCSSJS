import MovingObject from '../MovingObject.js';
import TurtleService from './TurtleService.js';
import DrawFunctions from '../../Utilities/DrawFunctions.js';
import Generators from '../../Utilities/Generators.js';

export default class Turtle extends MovingObject {
    constructor(posX, line, diving) {
        super(posX);
        this.line = line;
        this.height = 50;
        this.width = TurtleService.generateWidth(line);
        this.posY = TurtleService.generateYPos(line);
        this.speed = Generators.generateSpeed(this.width);
        this.diving = diving;
        this.dived = false;
        this.direction = 'left';
        this.divingCounter = 0;
    }

    drawTurtle(ctx) {
        if (this.diving) {
            if (this.divingCounter < 100) {
                this.dived = false;
                DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'brown');
            } else if (this.divingCounter > 200) {
                this.divingCounter = 0;
            } else {
                this.dived = true;
            }
            this.divingCounter++;
        } else {
            DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'brown');
        }
    }
}
