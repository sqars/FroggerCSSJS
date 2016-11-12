const BoardService = {

    clearBoard: (board) => {
        board.forEach((div) => {
            div.className = "";
        })
    },

    checkOutOfMap(frogger, board) {
        let result = false;
        if (frogger.posX > board.width - 50 || frogger.posX < 0 ||
            frogger.posY > board.height - 50 || frogger.posY < 0) {
            result = true;
        }
        return result;
    },

};

export default BoardService;
