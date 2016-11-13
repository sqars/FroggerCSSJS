import Turtle from './Turtle.js';

const TurtleService = {

    createTurtles: () => {
        let turtles = [];
        let placed = 0;
        let line = 1;
        let attempts = 0;
        let diving = false;
        while (placed <= 7) {
            if (placed == 2 || placed == 6) {
                diving = true;
            } else {
                diving = false;
            }
            let posX = (Math.floor(Math.random() * (1 + 14 - 1)) + 1) * 50;
            let available = true;
            let filteredLine = turtles.filter(turtle => turtle.line === line);
            filteredLine.forEach((checkedTurtle) => {
                Math.abs(checkedTurtle.posX - posX) < checkedTurtle.width + 50 ? available = false : false;
            });
            if (available) {
                let turtle = new Turtle(posX, line, 1, diving);
                turtles.push(turtle);
                placed++;
                attempts = 0;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                let turtle = new Turtle(-500, line, 1, diving);
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
                break;
            case 2:
                return 250;
                break
            default:
                break;
        }
    },

    generateWidth: (line) => {
        switch (line) {
            case 1:
                return 100;
                break;
            default:
                return 150;
                break;
        }
    }

}

export default TurtleService;
