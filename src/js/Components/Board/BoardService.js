const BoardService = {

  clearBoard: (board) => {
    board.forEach((div)=>{
      div.className = "";
    })
  },

};

export default BoardService;
