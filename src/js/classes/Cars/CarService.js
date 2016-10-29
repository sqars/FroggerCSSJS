import Car from './Car.js';

const CarService = {

    createCars: () => {
        let cars = [];
        for (let i = 1, line = 1, posX = 0; i <= 25; i++) {
            let car = new Car(posX, line);
            posX = posX + 2;
            if (i % 5 == 0) {
                line++;
                switch (line) {
                    case 2:
                        posX = 5;
                        break
                    case 3:
                        posX = 0;
                        break;
                    case 4:
                        posX = 5;
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
    }
}

export default CarService;
