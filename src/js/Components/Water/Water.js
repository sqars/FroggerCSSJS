import WaterService from './WaterService.js';

export default class Water{
  constructor(){
    this.posX = 0;
    this.posY = 50;
    this.height = 250;
    this.width = 700;
  }

  drawWater(ctx){
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, this.width, this.height);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }

}
