import Frogger from '../Frogger.js';
import CarService from '../Cars/CarService.js';
import BoardService from './BoardService.js';
import TurtleService from '../Turtles/TurtleService.js';
import WaterService from '../Water/WaterService.js';

export default class Board {
    constructor() {
        this.board = null;
        this.frogger = new Frogger();
        this.cars = CarService.createCars();
        this.turtles = TurtleService.createTurtles();
        this.water = WaterService.createWater();
    };

    setBoard() {
        this.board = document.querySelectorAll('#board div');
        BoardService.clearBoard(this.board);
        this.water.forEach((waterObj) => {
            waterObj.setWaterPosition(this.board);
        });
        this.turtles.forEach((turtle) => {
            turtle.setTurtlePosition(this.board);
        });
        this.frogger.setFroggerPosition(this.board);
        this.cars.forEach((car) => {
            car.setCarPosition(this.board);
        });
        this.checkCollision();
    };

    sailFrogger(){
      let turtleCollision = BoardService.checkCollision(this.frogger, this.turtles);
      if(turtleCollision !== false){
        this.frogger.posX--;
      }
    }

    moveFrogger(event) {
        this.frogger.move(event);
        this.setBoard();
    };

    checkCollision() {
      let collision = false;
      let carCollision = BoardService.checkCollision(this.frogger, this.cars);
      let waterCollision = BoardService.checkCollision(this.frogger, this.water);
      let turtleCollision = BoardService.checkCollision(this.frogger, this.turtles);
      carCollision !== false || waterCollision !== false ? collision = true : false; // TODO: check this condition
      turtleCollision ? collision = turtleCollision : false;
      return collision;
    };

    startBoard() {
        for (let i = 1, speed = 1100; i <= 5; i++) {
            BoardService.startMovingLine(this, this.cars, i, speed);
            speed = speed - 100;
        }
        for (let i = 1, speed = 900; i <= 2; i++) {
            BoardService.startMovingLine(this, this.turtles, i, speed);
            speed = 700;
        }
    }

}
