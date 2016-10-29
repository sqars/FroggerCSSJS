export default class MovingObject{
  constructor(posX, posY, direction){
    this.posX = posX;
    this.posY = posY;
    this.direction = direction;
  }

  getPosition(posX, posY){
      return posX + posY * 14;
  }
}
