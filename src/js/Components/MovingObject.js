export default class MovingObject{
  constructor(posX, posY, direction){
    this.posX = posX;
    this.posY = posY;
    this.direction = direction;
  }

  getPosition(){
      return this.posX + this.posY * 14;
  }
}
