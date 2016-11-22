const DrawFunctions = {
  drawRect: (ctx, posX, posY, width, height, color) =>{
        ctx.beginPath();
        ctx.rect(posX, posY, width, height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
  },

  colorText: (ctx, showWords, textX, textY, color) => {
    ctx.font = "10px Arial";
    ctx.fillStyle = color;
    ctx.fillText(showWords, textX, textY);
  },

  drawText: (ctx, fontFamily, fontSize, color, text, posX, posY) =>{
    ctx.font = fontSize + "px " + fontFamily;
    ctx.fillText(text, posX, posY);
  }
}

export default DrawFunctions;
