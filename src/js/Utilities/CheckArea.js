const CheckArea = {
    checkIfCarArea: (frogger) => {
        let result = false;
        if (frogger.posY >= 350 && frogger.posY <= 550) {
            result = true;
        }
        return result;
    },

    checkIfGrassArea: (frogger) => {
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
    }
}

export default CheckArea;
