import DrawFunctions from '../../Utilities/DrawFunctions.js';

export default class InfoBoard {
    constructor() {
    }

    drawInfoBar(ctx, gameLevel, froggerLives, gameScore, levelTimeout) {
        const {
            drawRect,
            drawText
        } = DrawFunctions;
        drawRect(ctx, 0, 650, 700, 50, '#e6e6fa');
        drawRect(ctx, 0, 650, 700, 2, 'black');
        drawText(ctx, 'Arial', 25, 'black', 'Level: ' + gameLevel, 10, 685);
        drawText(ctx, 'Arial', 25, 'black', 'Lives: ' + froggerLives, 600, 685);
        drawText(ctx, 'Arial', 25, 'black', 'Score: ' + gameScore, 130, 685);
        drawText(ctx, 'Arial', 25, 'black', 'Time', 320, 685);
        drawRect(ctx, 385, 660, (200*levelTimeout)/100, 30, 'orange');
    }
}
