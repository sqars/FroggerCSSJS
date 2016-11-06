import Car from './Car.js';

const CarService = {

    createCars: () => {
        let cars = [];
        let placed = 0;
        let line = 1
        let attempts = 0;
        while (placed <= 15) {
            let posX = (Math.floor(Math.random() * (1 + 14 - 1)) + 1) * 50;
            let available = true;
            let filteredLine = cars.filter(car => car.line === line);
            filteredLine.forEach((checkedCar) => {
                Math.abs(checkedCar.posX - posX) < checkedCar.width + 50 ? available = false : false;
            });
            if (available) {
                let car = new Car(posX, line, 1);
                cars.push(car);
                placed++;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                placed++;
            }

            if (placed % 3 == 0) {
                line++;
            }
        };
        return cars;
    },

    generateYPos: (line) => {
        switch (line) {
            case 1:
                return 550;
                break;
            case 2:
                return 500;
                break
            case 3:
                return 450;
                break;
            case 4:
                return 400;
                break;
            case 5:
                return 350;
                break;
            default:
                break;
        }
    },

    generateWidth: (line) => {
        switch (line) {
            case 5:
                return 150;
                break;
            default:
                return 50;
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
