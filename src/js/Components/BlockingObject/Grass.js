export default class Grass{
  constructor(posX, width){
    this.posX = posX;;
    this.posY = 0;
    this.width = width;
    this.height = 50;
  };

  drawGrass(ctx){
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, this.width, this.height);
    ctx.fillStyle = "lightgreen";
    ctx.fill();
    ctx.closePath();
  };
};
