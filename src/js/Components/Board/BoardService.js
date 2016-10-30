const BoardService = {

  clearBoard: (board) => {
    board.forEach((div)=>{
      div.className = "";
    })
  },

  startCarLine: (Board, cars, line, speed = 1000) =>{
    return window.setInterval(() =>{
      let filteredLine = cars.filter((car) =>{
        return car.line == line;
      });
      let counter = 0;
      filteredLine.forEach((car) =>{
          car.move();
      });
      Board.setBoard();
    }, speed); // TODO: add speed functionality
  },

  startTurtleLine: (Board, turtles, line, speed = 1000) =>{

  }
};

export default BoardService;
