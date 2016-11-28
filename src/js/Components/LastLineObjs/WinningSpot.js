import DrawFunctions from '../../Utilities/DrawFunctions.js';

export default class WinningSpot{
  constructor(posX){
    this.posX = posX;
    this.posY = 0;
    this.width = 72.22;
    this.height = 50;
    this.taken = false;
  }

  drawSpot(ctx){
    let color = this.taken ? 'green' : '#9ddfe1';
    DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, color);
  }

}
