const BoardService = {

  clearBoard: (board) => {
    board.forEach((div)=>{
      div.className = "";
    })
  },

  checkCollision(frogger, elements){
    let froggerPos = frogger.getPosition();
    let result = false;
    elements.forEach(elem => elem.getPosition() === froggerPos ? result = froggerPos : false);
    return result;
  },

};

export default BoardService;
