import Frogger from '../Frogger.js';
import CarService from '../cars/CarService.js';
import BoardService from './BoardService.js';

export default class Board {
    constructor() {
        this.board = null;
        this.frogger = new Frogger();
        this.cars = CarService.createCars();
    };

    setBoard() {
        this.board = document.querySelectorAll('#board div');
        BoardService.clearBoard(this.board);
        this.frogger.setFroggerPosition(this.board);
        this.cars.forEach((car) => {
            car.setCarPosition(this.board);
        });
    };

    moveFrogger(event) {
        this.frogger.move(event);
        this.setBoard();
        this.checkCollision();
    };

    checkCollision() {
        this.cars.forEach((car) => {
          if(car.getPosition() === this.frogger.getPosition()){
            console.log('game over');
          };
        });
    };

    startBoard() {
        for (let i = 1, speed = 1100; i <= 5; i++) {
            BoardService.startCarLine(this, this.cars, i, speed);
            speed = speed - 100;
            i > 4 ? speed = 1100 : false;
        }
    }

}
