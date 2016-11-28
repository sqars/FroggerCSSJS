const Utils = {
  filterLine: (line, item) => {
    return item.line === line;
  },

  checkAvalable(posX, checkedCar){
    return checkItemOverlap(checkedCar, posX);

    function checkItemOverlap(item, posX){
      return Math.abs(checkedCar.posX - posX) < checkedCar.width + 50;
    }
  }

};

export default Utils;
