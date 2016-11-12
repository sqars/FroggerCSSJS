import WaterService from './WaterService.js';
import DrawFunctions from '../../Utilities/DrawFunctions.js';

export default class Water{
  constructor(){
    this.posX = 0;
    this.posY = 50;
    this.height = 250;
    this.width = 700;
  }

  drawWater(ctx){
    DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'blue');
  }

}
