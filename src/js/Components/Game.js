import Board from './Board/Board.js';

export default class Game {
    constructor() {
        this.board = new Board();
    }

    startGame() {
        this.board.setBoard();
        document.addEventListener('keydown',() => this.board.frogger.triggerMove(event));
    }
}
