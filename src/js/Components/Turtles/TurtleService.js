import Turtle from './Turtle.js';

const TurtleService = {

  createTurtles: () =>{
    let turtles = [];
    for (let i = 1, line = 1, posX = Math.random() * (100 - 0) + 0; i <= 7; i++) {
      let turtle = new Turtle(posX, line, 1);
      if(line == 1){
        posX = posX + Math.random() * (350 - 200) + 200;
      } else {
        posX = posX + Math.random() * (400 - 300) + 300;
      }
      turtles.push(turtle);
      if(i == 4){
        line = 2;
        posX = Math.random() * (300 - 100) + 100;
      };
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
              return 150;
              break;
          default:
              return 100;
              break;
      }
  },

}

export default TurtleService;
