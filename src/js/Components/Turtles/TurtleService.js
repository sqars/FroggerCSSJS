import Turtle from './Turtle.js';
import Utils from '../../Utilities/ObjectCreationUtils.js';

const TurtleService = {

    createTurtles: (level) => {
        const {
            filterLine,
            checkAvalable
        } = Utils;

        let posX,
            filteredLine,
            turtles = [],
            placed = 0,
            line = 1,
            attempts = 0,
            diving = false,
            overlaps = [];
        while (placed <= 7) {
            diving = (placed === 2 || placed === 6) ? true : false;
            posX = (Math.floor(Math.random() * (1 + 14 - 1)) + 1) * 50;
            filteredLine = turtles.filter(filterLine.bind(null, line));
            overlaps = filteredLine.filter(checkAvalable.bind(null, posX));
            if (overlaps.length === 0) {
                let turtle = new Turtle(posX, line, diving, level);
                turtles.push(turtle);
                placed++;
                attempts = 0;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                let turtle = new Turtle(-500, line, diving, level);
                turtles.push(turtle);
                placed++;
            }

            if (placed == 4) {
                line = 2;
            }
        }
        return turtles;
    },

    generateYPos: (line) => {
        switch (line) {
            case 1:
                return 150;
            case 2:
                return 250;
            default:
                break;
        }
    },

    generateWidth: (line) => {
        switch (line) {
            case 1:
                return 100;
            default:
                return 150;
        }
    }

};

export default TurtleService;
