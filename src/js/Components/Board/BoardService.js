const BoardService = {

  clearBoard: (board) => {
    board.forEach((div)=>{
      div.className = "";
    })
  },

  startMovingLine: (Board, objects, line, speed = 1000) =>{
    return window.setInterval(() =>{
      let filteredLine = objects.filter((obj) =>{
        return obj.line == line;
      });
      filteredLine.forEach((obj) =>{
          obj.move();
      });
      Board.setBoard();
    }, speed); // TODO: add speed functionality
  },

  startTurtleLine: (Board, turtles, line, speed = 1000) =>{

  }
};

export default BoardService;
