import DrawFunctions from '../../Utilities/DrawFunctions.js';

export default class EndScreen {
    constructor() {
    }

    drawEndScreen(ctx) {
        const {
            drawRect,
            drawText
        } = DrawFunctions;
        drawRect(ctx, 0, 0, 700, 700, 'black');
        drawText(ctx, 'Arial', 100, 'white', 'Game Over', 100, 350);
    }
}
