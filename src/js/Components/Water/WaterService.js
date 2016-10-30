import Water from './Water.js';

const WaterService = {
  createWater: () => {
      let waterObjs = [];
      for (let i = 1, line = 1, posX = 0; i <= 70; i++) {
            let water = new Water(posX, line);
            posX = posX + 1
            waterObjs.push(water);
          if (i % 14 == 0) {
              line++;
              posX = 0;
          }
      }
      return waterObjs;
  },

  generateYPos: (line) => {
      switch (line) {
          case 1:
              return 5;
              break;
          case 2:
              return 4;
              break
          case 3:
              return 3;
              break;
          case 4:
              return 2;
              break;
          case 5:
              return 1;
              break;
          default:
              break;
      }
  },
};

export default WaterService;
