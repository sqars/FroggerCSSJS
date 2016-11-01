import Frogger from '../Frogger.js';
import CarService from '../Cars/CarService.js';
import BoardService from './BoardService.js';
import TurtleService from '../Turtles/TurtleService.js';
import WaterService from '../Water/WaterService.js';

import EventEmitter from '../../EventEmitter.js';
import { watch, unwatch } from 'watch-object';

export default class Board {
    constructor() {
        this.board = null;
        this.frogger = new Frogger();
        this.cars = CarService.createCars();
        this.turtles = TurtleService.createTurtles();
        this.water = WaterService.createWater();
        this.emitter = new EventEmitter();
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

    moveFrogger(event) {
        this.frogger.move(event);
        let turtleCollision = BoardService.checkCollision(this.frogger, this.turtles);
        if(turtleCollision){
          this.emitter.emit('sailOnTurtle', turtleCollision);
        }
        this.setBoard();
    };

    checkCollision() {
      let collision = false;
      let carCollision = BoardService.checkCollision(this.frogger, this.cars);
      let waterCollision = BoardService.checkCollision(this.frogger, this.water);
      let turtleCollision = BoardService.checkCollision(this.frogger, this.turtles);
      carCollision !== false || waterCollision !== false ? collision = true : false; // TODO: check this condition
      turtleCollision ? collision = false : false;
      return collision;
    };

    startMovingLine(objects, line, speed = 1000){
      return window.setInterval(() =>{
        let filteredLine = objects.filter(obj => obj.line == line);
        filteredLine.forEach(obj => obj.move());
        this.setBoard();
      }, speed); // TODO: add speed functionality
    };

    startBoard() {
        this.emitter.subscribe('sailOnTurtle', (position) =>{
          let sailTurtle = this.turtles.filter((turtle) =>{
            return turtle.getPosition() === position;
          });
          watch(sailTurtle[0], 'posX', ()=>{
            this.frogger.posX = sailTurtle[0].posX;
          });
        });
        for (let i = 1, speed = 1100; i <= 5; i++) {
            this.startMovingLine(this.cars, i, speed);
            speed = speed - 100;
        }
        for (let i = 1, speed = 900; i <= 2; i++) {
            this.startMovingLine(this.turtles, i, speed);
            speed = 700;
        }
    };

}
