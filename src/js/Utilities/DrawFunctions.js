const DrawFunctions = {
  drawRect: (ctx, posX, posY, width, height, color) =>{
        ctx.beginPath();
        ctx.rect(posX, posY, width, height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
  }
}

export default DrawFunctions;
