import Board from './Board/Board.js';
import EventEmitter from '../EventEmitter.js';

export default class Game {
    constructor() {
        this.board = new Board();
    }

    startGame() {
        let board = document.getElementById('board');
        generateDivs(board);
        this.board.setBoard();
        this.board.startBoard();
        document.addEventListener('keydown', () => this.board.moveFrogger(event));
    }
}

function generateDivs(board) {
    for (let i = 0; i < 182; i++) {
        let div = document.createElement('div');
        board.appendChild(div);
    }
};
