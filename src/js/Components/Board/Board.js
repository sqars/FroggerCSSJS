import Frogger from '../Frogger.js';
import CarService from '../cars/CarService.js';
import BoardService from './BoardService.js';

export default class Board{
  constructor(){
    this.board = null;
    this.frogger = new Frogger();
    this.cars = CarService.createCars();
  }

  setBoard(){
    this.board = document.querySelectorAll('#board div');
    BoardService.clearBoard(this.board);
    this.frogger.setFroggerPosition(this.board);
    this.cars.forEach((car) =>{
      car.setCarPosition(this.board);
    });
  }

  moveFrogger(event){
    this.frogger.move(event);
    this.setBoard();
  }

  startBoard(){
      return window.setInterval(() =>{
        let firstLineCars = this.cars.filter((car) =>{
          return car.line == 1;
        });
        this.cars.forEach((car) =>{
          car.move();
        });
        this.setBoard();
      }, 1000); // TODO: add speed functionality
  }

}
