import Car from './Car.js';

const CarService = {

    createCars: () => {
        let cars = [];
        for (let i = 1, line = 1, posX = 0; i <= 15; i++) {
            let car;
            if(line === 5){
              let size3Car = [];
              for (let j = 0, newPosX = posX; j < 3; j++) {
                  car = new Car(newPosX, line);
                  newPosX++;
                  size3Car.push(car);
              }
              posX = posX + 4;
              cars = [
                  ...cars,
                  ...size3Car
              ];
            } else{
              car = new Car(posX, line);
              posX = posX + 3
              cars.push(car);
            }
            if (i % 3 == 0) {
                line++;
                switch (line) {
                    case 2:
                        posX = 6;
                        break
                    case 3:
                        posX = 2;
                        break;
                    case 4:
                        posX = 4;
                        break;
                    case 5:
                        posX = 1;
                        break;
                    default:
                        break;
                };
            }
        }
        return cars;
    },

    generateYPos: (line) => {
        switch (line) {
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

    generateDirection: (line) => {
        switch (line) {
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
