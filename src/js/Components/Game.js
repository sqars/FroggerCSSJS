import Board from './Board/Board.js';

export default class Game {
    constructor() {
        this.board = new Board();
    }

    startGame() {
        this.board.setBoard();
        // this.board.startBoard();
        document.addEventListener('keydown',() => this.board.frogger.triggerMove(event));
    }
}
