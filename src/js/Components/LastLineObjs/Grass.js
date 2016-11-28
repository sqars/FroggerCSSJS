import DrawFunctions from '../../Utilities/DrawFunctions.js';

export default class Grass{
  constructor(posX, width){
    this.posX = posX;
    this.posY = 0;
    this.width = width;
    this.height = 50;
  }

  drawGrass(ctx){
    DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, '#7eaea8');
  }
}
