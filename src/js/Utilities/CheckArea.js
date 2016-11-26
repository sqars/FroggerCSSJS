const CheckArea = {
    checkIfOutOfMapArea: (frogger) => {
      let result = false;
      if (frogger.posX <= 0 || frogger.posX >= 650 || frogger.posY <= 0 || frogger.posY >= 600) {
          result = true;
      }
      return result;
    },

    checkIfCarArea: (frogger) => {
        let result = false;
        if (frogger.posY >= 350 && frogger.posY <= 550) {
            result = true;
        }
        return result;
    },

    checkIfLastLineArea: (frogger) => {
        let result = false;
        if (frogger.posY <= 50 && frogger.posY >= 0) {
            result = true;
        }
        return result;
    },

    checkIfTurtleArea: (frogger) => {
      let result = false;
      if(frogger.posY <= 300 && frogger.posY >= 150){
        result = true;
      }
      return result;
    },

    checkIfWoodArea: (frogger) => {
      let result = false;
      if(frogger.posY <= 250 && frogger.posY >= 50){
        result = true;
      }
      return result;
    },

    checkIfWaterArea: (frogger) =>{
      let result = false;
      if(frogger.posY < 300 && frogger.posY > 50){
        result = true;
      }
      return result;
    },

    checkIfOutOfWaterArea: (frogger) =>{
      let result = false;
      if(frogger.posY <= 350 && frogger.posY >= 300){
        result = true;
      }
      return result;
    }
};

export default CheckArea;
