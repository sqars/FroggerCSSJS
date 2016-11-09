import Frogger from '../Frogger.js';
import Water from '../Water/Water.js';
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
        this.water = new Water();
        this.turtles = TurtleService.createTurtles();
        this.woods = WoodService.createWood();
    }

    setBoard() {
        this.context.clearRect(0, 0, this.board.width, this.board.height);
        this.water.drawWater(this.context);
        this.cars.forEach(car => car.drawCar(this.context));
        this.cars.forEach(car => car.move(this.cars));
        this.turtles.forEach(turtle => turtle.drawTurtle(this.context));
        this.turtles.forEach(turtle => turtle.move(this.turtles));
        this.woods.forEach(wood => wood.drawWood(this.context));
        this.woods.forEach(wood => wood.move(this.woods));
        this.frogger.drawFrogger(this.context);
        this.froggerMoving ? this.moveFrogger() : false;
        this.frogger.speed = 2;
        WoodService.checkSail(this.frogger, this.woods, this.froggerMoving);
        TurtleService.checkSail(this.frogger, this.turtles, this.froggerMoving);
        requestAnimationFrame(this.setBoard.bind(this));
    }

    setFroggerMove(event) {
        if (!this.froggerMoving) {
            let isMoving = this.frogger.setDirection(event);
            isMoving ? this.froggerMoving = true : false;
        }
    }

    moveFrogger() {
        this.froggerMoving = this.frogger.move(this.frogger.direction);
    }

    checkCollision() {
        this.cars.forEach((car) => {
            Math.abs(car.posX - this.frogger.posX) < car.width && car.posY === this.frogger.posY ? console.log('collision') : false;
        })
    }

}
