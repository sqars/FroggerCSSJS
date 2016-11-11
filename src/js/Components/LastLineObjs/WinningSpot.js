export default class WinningSpot{
  constructor(posX){
    this.posX = posX;
    this.posY = 0;
    this.width = 72.22;
    this.height = 50;
  };

  drawSpot(ctx){
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, this.width, this.height);
    ctx.fillStyle = "#9ddfe1";
    ctx.fill();
    ctx.closePath();
  };
};
