import Frogger from './Frogger.js';
import Car from './Car.js';

export default class Board{
  constructor(){
    this.board = null;
    this.frogger = new Frogger();
    this.cars = createCars();
  }

  setBoard(){
    this.board = document.querySelectorAll('#board div');
    clearBoard(this.board);
    this.frogger.setFroggerPosition(this.board);
    this.cars.forEach((car) =>{
      car.setCarPosition(this.board);
    });
  }

  moveFrogger(event){
    this.frogger.move(event);
    this.setBoard();
  }

  moveCar(){

  }

}

function clearBoard(board){
  board.forEach((div)=>{
    div.className = "";
  })
};

function createCars(){
  let cars = [];
  for(let i = 1, line = 1, posX = 0; i <= 25; i++){
    let car = new Car(posX, line);
    posX = posX + 2;
    if(i % 5 == 0){
      line++;
      switch(line){
        case 2:
          posX = 5;
          break
        case 3:
          posX = 0;
          break;
        case 4:
          posX = 5;
          break;
        case 5:
          posX = 0;
          break;
        default:
          break;
      }
    };
    cars.push(car);
  }
  return cars;
}
