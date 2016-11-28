import Water from './Water.js';

const WaterService = {
  createWater: () => {
      let waterObjs = [];
      for (let i = 1, line = 1, posX = 0; i <= 70; i++) {
            let water = new Water(posX, line);
            posX = posX + 1;
            waterObjs.push(water);
          if (i % 14 === 0) {
              line++;
              posX = 0;
          }
      }
      return waterObjs;
  }
};

export default WaterService;
