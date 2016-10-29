import Frogger from './Frogger.js';

export default class Board{
  constructor(){
    this.board = null;
    this.frogger = new Frogger();
  }

  setBoard(){
    this.board = document.querySelectorAll('#board div');
    clearBoard(this.board);
    this.frogger.setFroggerPosition(this.board, this.frogger);
  }

  move(event){
    switch(event.which){
      case 37:
        this.frogger.direction = 'left';
        this.frogger.posX--;
        break;
      case 38:
        this.frogger.direction = 'up';
        this.frogger.posY--;
        break;
      case 39:
        this.frogger.direction = 'right';
        this.frogger.posX++;
        break;
      case 40:
        this.frogger.direction = 'down';
        this.frogger.posY++;
        break;
      default:
        break;
    };
    this.setBoard();
  }

}

function clearBoard(board){
  board.forEach((div)=>{
    div.className = "";
  })
};
