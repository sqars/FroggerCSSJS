import DrawFunctions from '../../Utilities/DrawFunctions.js';

export default class WinningSpot{
  constructor(posX){
    this.posX = posX;
    this.posY = 0;
    this.width = 72.22;
    this.height = 50;
  };

  drawSpot(ctx){
    DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, '#9ddfe1');
  };
};
