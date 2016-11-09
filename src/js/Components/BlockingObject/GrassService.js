import Grass from './Grass.js';

const GrassService = {
  createGrass: () =>{
    return [
      ...createSmallGrass(),
      ...createBigGrass()
    ];
  }
};

function createSmallGrass(){
  let grassLeft = new Grass(0, 25);
  let grassRight = new Grass(675, 75);
  return [grassLeft, grassRight];
}

function createBigGrass(){
  let grassArr = [];
  for (let i = 0, posX = 87.5; i < 4; i++){
    let grass = new Grass(posX, 75);
    posX += 150;
    grassArr.push(grass);
  }
  return grassArr;
}

export default GrassService;
