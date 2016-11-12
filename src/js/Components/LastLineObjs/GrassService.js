import Grass from './Grass.js';

const GrassService = {
  createGrass: () =>{
    return [
      ...createSmallGrass(),
      ...createBigGrass()
    ];
  },

  checkCollision: (frogger, grass) =>{
    let result = false;
    grass.forEach((grass) =>{
      if(frogger.posX > grass.posX && frogger.posX < grass.posX + grass.width && frogger.posY < grass.posY + grass.height){
        frogger.posY += frogger.speed;
        result = true
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
