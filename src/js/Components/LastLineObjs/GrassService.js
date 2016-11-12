import Grass from './Grass.js';
import checkCollision from '../../Utilities/CollisionDetection.js';

const GrassService = {
  createGrass: () =>{
    return [
      ...createSmallGrass(),
      ...createBigGrass()
    ];
  },

  checkCollision: (frogger, grassArr) =>{
    let result = false;
    grassArr.forEach((grass) =>{
      if(checkCollision(frogger, grass)){
        result = true;
      }
    });
    return result;
  }
};

function createSmallGrass(){
  let grassLeft = new Grass(0, 25);
  let grassRight = new Grass(675, 25);
  return [grassLeft, grassRight];
};

function createBigGrass(){
  let grassArr = [];
  for (let i = 0, posX = 97.22; i < 4; i++){
    let grass = new Grass(posX, 72.22);
    posX += 144.44;
    grassArr.push(grass);
  }
  return grassArr;
};

export default GrassService;
