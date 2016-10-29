import MovingObject from '../MovingObject.js';
import CarService from './CarService';

export default class Car extends MovingObject{

  constructor(posX, line){
    super(posX);
    this.line = line;
    this.posY = CarService.generateYPos(line);
    this.direction = CarService.generateDirection(line);
    this.size = 1;
  }

  setCarPosition(board){
    board[this.getPosition(this.posX, this.posY)].className = "car";
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

}
