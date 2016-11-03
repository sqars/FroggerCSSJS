export default class MovingObject{
  constructor(posX, posY, direction, speed){
    this.posX = posX;
    this.posY = posY;
    this.direction = direction;
    this.speed = speed;
  }

  getPosition(){
      return this.posX + this.posY * 14;
  }

  move(){
    switch(this.direction){
          case 'left':
            this.posX < -100 ? this.posX = Math.random() * (900 - 700) + 700 : false;
            this.posX -= this.speed;
            break;
          case 'right':
            this.posX > 750 ? this.posX = Math.random() * (-50 + 200) - 200 : false;
            this.posX += this.speed;
            break;
          default:
            break;
        }
  }

  sailFrogger(frogger){
    frogger.posX = this.posX;
  }
}
