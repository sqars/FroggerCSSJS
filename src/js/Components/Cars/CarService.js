import Car from './Car.js';
import BoardService from '../Board/BoardService.js';

const CarService = {

    createCars: () => {
        let cars = [];
        for (let i = 1, line = 1, posX = 0; i <= 15; i++) {
            let car = new Car(posX, line);
            posX = posX + 3;
            if (i % 3 == 0) {
                line++;
                switch (line) {
                    case 2:
                        posX = 7;
                        break
                    case 3:
                        posX = 0;
                        break;
                    case 4:
                        posX = 7;
                        break;
                    case 5:
                        posX = 0;
                        break;
                    default:
                        break;
                }
            };
            cars.push(car);
        }
        return cars;
    },

     generateYPos: (line) => {
      switch(line){
        case 1:
          return 11;
          break;
        case 2:
          return 10;
          break
        case 3:
          return 9;
          break;
        case 4:
          return 8;
          break;
        case 5:
          return 7;
          break;
        default:
          break;
      }
    },

    generateDirection: (line) =>{
      switch(line){
        case 1:
          return 'right';
          break;
        case 2:
          return 'left';
          break
        case 3:
          return 'right';
          break;
        case 4:
          return 'left';
          break;
        case 5:
          return 'right';
          break;
        default:
          break;
      }
    }
}

export default CarService;
