import Turtle from './Turtle.js';

const TurtleService = {

  createTurtles: () =>{
    let turtles = [];
    for (let i = 1, line = 1, posX = 0; i <= 7; i++) {
      let turtle;
      if(line == 1){
        let size2Turtle = [];
        for (let j = 0, newPosX = posX; j < 2; j++) {
            turtle = new Turtle(newPosX, line);
            newPosX++;
            size2Turtle.push(turtle);
        }
        posX = posX + 3;
        turtles = [
            ...turtles,
            ...size2Turtle
        ];
        console.log(turtles);
      } else{
        let size3Turtle = [];
        for (let j = 0, newPosX = posX; j < 3; j++) {
            turtle = new Turtle(newPosX, line);
            newPosX++;
            size3Turtle.push(turtle);
        }
        posX = posX + 4;
        turtles = [
            ...turtles,
            ...size3Turtle
        ];
      }
      if(i == 4){
        line = 2;
        posX = 0;
      }
    }
    return turtles;
  },

  generateYPos: (line) => {
      switch (line) {
          case 1:
              return 5;
              break;
          case 2:
              return 2;
              break
          default:
              break;
      }
  }

}

export default TurtleService;
