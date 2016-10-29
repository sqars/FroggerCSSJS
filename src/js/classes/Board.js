import Frogger from './Frogger.js';
import CarService from './cars/CarService.js';

export default class Board{
  constructor(){
    this.board = null;
    this.frogger = new Frogger();
    this.cars = CarService.createCars();
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
