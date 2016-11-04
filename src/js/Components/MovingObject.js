export default class MovingObject{
  constructor(posX, posY, direction, speed){
    this.posX = posX;
    this.posY = posY;
    this.direction = direction;
    this.speed = speed;
  }

  move(objects){
    switch(this.direction){
          case 'left':
            if(this.posX < -50){
              let max = 900;
              let min = 700;
              this.posX = Math.random() * (max - min) + min;
              let filteredObjs = objects.filter(obj => obj.line === this.line);
              let index = filteredObjs.indexOf(this);
              filteredObjs.splice(index, 1);
              filteredObjs.forEach((obj) =>{
                while(this.posX >= obj.posX - obj.width - 50 && this.posX <= obj.posX + obj.width + 50){
                  console.log('this X', this.posX, 'car X', obj.posX, 'car width', obj.posX + obj.width);
                  this.posX = Math.random() * (max - min) + min;
                }
              });
            };
            this.posX -= this.speed;
            break;
          case 'right':
            if(this.posX > 750){
              let max = -150;
              let min = -400;
              this.posX = Math.random() * (max - min) + min;
              let filteredObjs = objects.filter(obj => obj.line === this.line);
              let index = filteredObjs.indexOf(this);
              filteredObjs.splice(index, 1);
              filteredObjs.forEach((obj) =>{
                while(this.posX >= obj.posX - obj.width - 50 && this.posX <= obj.posX + obj.width + 50){
                  console.log('this X', this.posX, 'car X', obj.posX, 'car width', obj.posX + obj.width);
                  this.posX = Math.random() * (max - min) + min;
                }
              });
            };
            this.posX += this.speed;
            break;
          default:
            break;
        }
  }
}
