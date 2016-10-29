export default class Game{
  constructor(){

  }

  setBoard(){
    let board = document.getElementById('board');
    generateDivs(board);
  }

  startGame(){
    console.log('game started');
    this.setBoard();
  }
}


function generateDivs(board){
  for(let i = 0; i < 182; i++){
    let div = document.createElement('div');
    board.appendChild(div);
  }
}
