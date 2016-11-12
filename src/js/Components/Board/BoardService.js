const BoardService = {

  clearBoard: (board) => {
    board.forEach((div)=>{
      div.className = "";
    })
  },

  checkOutOfMap(frogger, board){
    let result = false;
    if( frogger.nextPosX >= board.width || frogger.nextPosX < 0 ||
        frogger.nextPosY >= board.height || frogger.nextPosY < 0){
      result = true;
    }
    return result;
  },

};

export default BoardService;
