import Frogger from '../Frogger.js';
import Water from '../Water/Water.js';
import CarService from '../Cars/CarService.js';
import BoardService from './BoardService.js';
import TurtleService from '../Turtles/TurtleService.js';
import WaterService from '../Water/WaterService.js';
import WoodService from '../Wood/WoodService.js';
import GrassService from '../LastLineObjs/GrassService.js';
import WinningSpotService from '../LastLineObjs/WinningSpotService.js';
import DrawFunctions from '../../Utilities/DrawFunctions.js';

export default class Board {
    constructor() {
        this.board = document.getElementById('canvas');
        this.context = this.board.getContext("2d");
        this.water = new Water();
        this.frogger = new Frogger(this.board);
        this.cars = CarService.createCars();
        this.turtles = TurtleService.createTurtles();
        this.woods = WoodService.createWood();
        this.grass = GrassService.createGrass();
        this.winningSpots = WinningSpotService.createWinningSpots();
    }

    setBoard() {
        this.drawAll();
        this.moveAll();
        requestAnimationFrame(this.setBoard.bind(this));
    }

    drawAll(){
      this.context.clearRect(0, 0, this.board.width, this.board.height); // clear board
      this.water.drawWater(this.context); // draw Water
      this.grass.forEach(grass => grass.drawGrass(this.context)); // draw Grass
      this.winningSpots.forEach(spot => spot.drawSpot(this.context)); // draw winningSpots
      this.cars.forEach(car => car.drawCar(this.context)); // draw Cars
      this.turtles.forEach(turtle => turtle.drawTurtle(this.context)); // draw Turtles
      this.woods.forEach(wood => wood.drawWood(this.context)); // draw Woods
      this.frogger.drawFrogger(this.context); // draw Frogger

      DrawFunctions.colorText(this.context, 'posX: ' + this.frogger.posX + ', posY: ' + this.frogger.posY, this.frogger.posX, this.frogger.posY, 'black'); // cheat to display frogger positon
    }

    moveAll(){
      this.cars.forEach(car => car.move(this.cars)); // move Cars
      this.turtles.forEach(turtle => turtle.move(this.turtles)); // move Turtles
      this.woods.forEach(wood => wood.move(this.woods)); // move Woods
      this.frogger.move();
      this.frogger.checkCollisions(this.board, this.grass, this.cars, this.turtles, this.woods, this.winningSpots);
    }
}
