export default class StaticObject{
  constructor(posX, posY){
    this.posX = posX;
    this.posY = posY;
  }

  getPosition(){
      return this.posX + this.posY * 14;
  }
}
