import Frogger from '../Frogger.js';
import CarService from '../Cars/CarService.js';
import BoardService from './BoardService.js';
import TurtleService from '../Turtles/TurtleService.js';
import WaterService from '../Water/WaterService.js';
import WoodService from '../Wood/WoodService.js';

export default class Board {
    constructor() {
        this.board = document.getElementById('canvas');
        this.context = this.board.getContext("2d");
        this.frogger = new Frogger(this.board);
        this.froggerMoving = false;
        this.cars = CarService.createCars();
    };

    setBoard() {
        this.context.clearRect(0, 0, this.board.width, this.board.height);
        this.frogger.drawFrogger(this.context);
        this.froggerMoving ? this.moveFrogger() : false;
        requestAnimationFrame(this.setBoard.bind(this));
    };

    setFroggerMove(event){
      let isMoving = this.frogger.setDirection(event);
      isMoving ? this.froggerMoving = true : false;
    }

    moveFrogger() {
      this.froggerMoving = this.frogger.move(this.frogger.direction);
    };

}
