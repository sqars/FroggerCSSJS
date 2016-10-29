import Frogger from './Frogger.js';

export default class Board{
  constructor(){
    this.board = null;
    this.frogger = new Frogger();
  }

  setBoard(){
    let board = document.getElementById('board');
    generateDivs(board);
    this.board = document.querySelectorAll('#board div');
    this.frogger.setFroggerPosition(this.board, this.frogger);
    document.addEventListener('keydown', this.frogger.move);
  }

}

function generateDivs(board){
  for(let i = 0; i < 182; i++){
    let div = document.createElement('div');
    board.appendChild(div);
  }
}
