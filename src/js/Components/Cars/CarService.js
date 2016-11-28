import Car from './Car.js';
import Utils from '../../Utilities/ObjectCreationUtils.js';

const CarService = {

    createCars: (level) => {
        const {
            filterLine,
            checkAvalable
        } = Utils;

        let posX,
            filteredLine,
            cars = [],
            placed = 0,
            line = 1,
            attempts = 0,
            overlaps = [];
        while (placed <= 15) {
            posX = (Math.floor(Math.random() * (1 + 14 - 1)) + 1) * 50;
            filteredLine = cars.filter(filterLine.bind(null, line));
            overlaps = filteredLine.filter(checkAvalable.bind(null, posX));
            if (overlaps.length === 0) {
                let car = new Car(posX, line, level);
                cars.push(car);
                placed++;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                let car = new Car(-500, line, level);
                cars.push(car);
                placed++;
            }

            if (placed % 3 === 0) {
                line++;
            }
        }
        return cars;
    },

    generateYPos: (line) => {
        switch (line) {
            case 1:
                return 550;
            case 2:
                return 500;
            case 3:
                return 450;
            case 4:
                return 400;
            case 5:
                return 350;
            default:
                break;
        }
    },

    generateWidth: (line) => {
        switch (line) {
            case 5:
                return 150;
            default:
                return 50;
        }
    },

    generateDirection: (line) => {
        switch (line) {
            case 1:
                return 'right';
            case 2:
                return 'left';
            case 3:
                return 'right';
            case 4:
                return 'left';
            case 5:
                return 'right';
            default:
                break;
        }
    }
};

export default CarService;
