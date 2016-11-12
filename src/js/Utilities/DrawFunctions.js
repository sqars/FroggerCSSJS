const DrawFunctions = {
  drawRect: (ctx, posX, posY, width, height, color) =>{
        ctx.beginPath();
        ctx.rect(posX, posY, width, height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
  },

  colorText: (ctx, showWords, textX, textY, color) => {
    ctx.fillStyle = color;
    ctx.fillText(showWords, textX, textY);
  }
}

export default DrawFunctions;
