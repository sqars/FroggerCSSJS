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
      filteredLine.forEach((car) =>{
        car.move();
      });
      Board.setBoard();
    }, speed); // TODO: add speed functionality
  }
};

export default BoardService;
