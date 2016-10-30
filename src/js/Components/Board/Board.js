import Frogger from '../Frogger.js';
import CarService from '../Cars/CarService.js';
import BoardService from './BoardService.js';
import TurtleService from '../Turtles/TurtleService.js';

export default class Board {
    constructor() {
        this.board = null;
        this.frogger = new Frogger();
        this.cars = CarService.createCars();
        this.turtles = TurtleService.createTurtles();
    };

    setBoard() {
        this.board = document.querySelectorAll('#board div');
        BoardService.clearBoard(this.board);
        this.frogger.setFroggerPosition(this.board);
        this.cars.forEach((car) => {
            car.setCarPosition(this.board);
        });
        this.turtles.forEach((turtle) =>{
          turtle.setTurtlePosition(this.board);
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
            BoardService.startMovingLine(this, this.cars, i, speed);
            speed = speed - 100;
        }
        for(let i = 1, speed = 900; i <=2; i++){
          BoardService.startMovingLine(this, this.turtles, i, speed);
          speed = 700;
        }
    }

}
