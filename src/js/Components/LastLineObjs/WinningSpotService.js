import WinningSpot from './WinningSpot.js';

const WinningSpotService = {
  createWinningSpots: () =>{
    let spotsArr = [];
    for (let i = 0, posX = 25; i < 5; i++){
      let spot = new WinningSpot(posX);
      posX += 144.44;
      spotsArr.push(spot);
    }
    return spotsArr;
  }
};

export default WinningSpotService;
