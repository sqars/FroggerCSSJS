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
  },

  checkWin: (frogger, winningSpots) =>{
    winningSpots.forEach((spot) =>{
      if(frogger.posX > spot.posX && frogger.posX < spot.posX + spot.width && frogger.posY === spot.posY){
        frogger.posX = spot.posX + 11.11;
      }
    });
  }
};

export default WinningSpotService;
