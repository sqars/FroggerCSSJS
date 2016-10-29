import MovingObject from './MovingObject.js';

export default class Car extends MovingObject{

  constructor(posX, line){
    super(posX);
    this.posY = generateYPos(line);
    this.direction = generateDirection(line);
    this.size = 1;
  }

  setCarPosition(board){
    board[this.getPosition(this.posX, this.posY)].className = "car";
  }

}

function generateYPos(line){
  switch(line){
    case 1:
      return 11;
      break;
    case 2:
      return 10;
      break
    case 3:
      return 9;
      break;
    case 4:
      return 8;
      break;
    case 5:
      return 7;
      break;
    default:
      break;
  }
};

function generateDirection(line){
  switch(line){
    case 1:
      return 'left';
      break;
    case 2:
      return 'right';
      break
    case 3:
      return 'left';
      break;
    case 4:
      return 'right';
      break;
    case 5:
      return 'left';
      break;
    default:
      break;
  }
}
