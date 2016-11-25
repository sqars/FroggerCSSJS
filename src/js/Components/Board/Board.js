import Frogger from '../Frogger.js';
import Water from '../Water/Water.js';
import CarService from '../Cars/CarService.js';
import TurtleService from '../Turtles/TurtleService.js';
import WoodService from '../Wood/WoodService.js';
import GrassService from '../LastLineObjs/GrassService.js';
import WinningSpotService from '../LastLineObjs/WinningSpotService.js';
import DrawFunctions from '../../Utilities/DrawFunctions.js';
import EventEmitter from '../../Utilities/EventEmitter.js';
import InfoBar from '../InfoBar/InfoBar.js';
import EndScreen from '../EndScreen/EndScreen.js';

export default class Board {
    constructor() {
        this.emitter = new EventEmitter();
        this.gameLevel = 1;
        this.gameScore = 0;
        this.levelTimeout = 100;
        this.board = document.getElementById('canvas');
        this.context = this.board.getContext("2d");
        this.infoBar = new InfoBar();
        this.endScreen = new EndScreen();
        this.water = new Water();
        this.grass = GrassService.createGrass();
        this.frogger = new Frogger(this.emitter);
        this.winningSpots = [];
        this.cars = [];
        this.turtles = [];
        this.woods = [];

        this.init = () => {
            this.resetBoard();
            setInterval(() =>{
              this.levelTimeout--;
              this.checkTimeOut();
            }, 1000);
            this.emitter.subscribe('levelComplete', this.levelUp.bind(this));
            this.emitter.subscribe('updateScore', this.updateScore.bind(this));
            this.emitter.subscribe('gameOver', this.gameOver.bind(this));
        };

        this.init();
    }

    setBoard() {
        this.drawAll();
        this.moveAll();
        requestAnimationFrame(this.setBoard.bind(this));
    }

    drawAll() {
        this.context.clearRect(0, 0, this.board.width, this.board.height); // clear board
        this.infoBar.drawInfoBar(this.context, this.gameLevel, this.frogger.lives, this.gameScore, this.levelTimeout);
        this.water.drawWater(this.context); // draw Water
        this.grass.forEach(grass => grass.drawGrass(this.context)); // draw Grass
        this.winningSpots.forEach(spot => spot.drawSpot(this.context)); // draw winningSpots
        this.cars.forEach(car => car.drawCar(this.context)); // draw Cars
        this.turtles.forEach(turtle => turtle.drawTurtle(this.context)); // draw Turtles
        this.woods.forEach(wood => wood.drawWood(this.context)); // draw Woods
        this.frogger.drawFrogger(this.context); // draw Frogger

        DrawFunctions.colorText(this.context, 'posX: ' + this.frogger.posX + ', posY: ' + this.frogger.posY, this.frogger.posX, this.frogger.posY, 'black'); // cheat to display frogger positon
    }

    moveAll() {
        this.cars.forEach(car => car.move(this.cars)); // move Cars
        this.turtles.forEach(turtle => turtle.move(this.turtles)); // move Turtles
        this.woods.forEach(wood => wood.move(this.woods)); // move Woods
        this.frogger.move();
        this.frogger.handleCollisions(this.board, this.grass, this.cars, this.turtles, this.woods, this.winningSpots, this.context);
    }

    resetBoard(){
      this.cars = CarService.createCars(this.gameLevel);
      this.turtles = TurtleService.createTurtles(this.gameLevel);
      this.woods = WoodService.createWood(this.gameLevel);
      this.winningSpots = WinningSpotService.createWinningSpots();
    }

    updateScore(){
      this.gameScore += 50;
    }

    levelUp() {
        this.gameLevel++;
        this.levelTimeout = 100;
        this.gameScore += 1500;
        this.resetBoard();
    }

    checkTimeOut(){
      if(this.levelTimeout < 0){
        this.levelTimeout = 5;
        this.frogger.killFrogger();
        this.frogger.resetFrogger();
      }
    }

    gameOver(){
      unsubscribeAll(this.emitter);
      this.endScreen.showGameOverScreen(this.gameScore);
    }
}

function unsubscribeAll(emitter){
  let unsubscribeAll = [
    emitter.subscribe('levelComplete', null),
    emitter.subscribe('updateScore', null),
    emitter.subscribe('gameOver', null)
  ];
  unsubscribeAll.forEach(unsubscribe => unsubscribe());
}
