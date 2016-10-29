import Board from './Board.js';

export default class Game{
  constructor(){
    this.board = new Board();
  }

  startGame(){
    console.log('game started');
    this.board.setBoard();
  }

}
