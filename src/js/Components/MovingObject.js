export default class MovingObject{
  constructor(posX, posY, direction){
    this.posX = posX;
    this.posY = posY;
    this.direction = direction;
  }

  getPosition(){
      return this.posX + this.posY * 14;
  }

  move(){
    switch(this.direction){
          case 'left':
            this.posX--;
            break;
          case 'right':
            this.posX++;
            break;
          default:
            break;
        }
  }

  sailFrogger(frogger){
    frogger.posX = this.posX;
  }
}
