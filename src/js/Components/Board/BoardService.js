import CarService from '../Cars/CarService.js';
import TurtleService from '../Turtles/TurtleService.js';
import WoodService from '../Wood/WoodService.js';
import WinningSpotService from '../LastLineObjs/WinningSpotService.js';

export function clearBoard(context, board) {
    context.clearRect(0, 0, board.width, board.height);
}

export function drawGrass(grassArr, context) {
    grassArr.forEach(grass => grass.drawGrass(context));
}

export function drawWinningSpots(winningSpotsArr, context){
    winningSpotsArr.forEach(spot => spot.drawSpot(context));
}

export function drawCars(carsArr, context){
    carsArr.forEach(car => car.drawCar(context));
}

export function drawTurtles(turtlesArr, context){
    turtlesArr.forEach(turtle => turtle.drawTurtle(context));
}

export function drawWood(woodArr, context){
    woodArr.forEach(wood => wood.drawWood(context));
}

export function resetBoard(cars, turtles, woods, winningSpots, gameLevel) {
    console.log(gameLevel);
        cars = CarService.createCars(gameLevel);
        turtles = TurtleService.createTurtles(gameLevel);
        woods = WoodService.createWood(gameLevel);
        winningSpots = WinningSpotService.createWinningSpots();
    }