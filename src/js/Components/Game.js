import Board from './Board/Board.js';
import $ from 'jquery';

export default class Game {
    constructor() {
        this.board = new Board();
    }

    startGame() {
        this.board.setBoard();
        $(document).on('keydown',() => this.board.frogger.triggerMove(event));
    }
}
