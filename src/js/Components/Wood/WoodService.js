import Wood from './Wood.js';

const WoodService = {
    createWood: () => {
        let woods = [];
        for (let i = 1, line = 1, posX = 0; i <= 7; i++) {
            let turtle;
            if (line === 1) {
                let size3Wood = [];
                for (let j = 0, newPosX = posX; j < 3; j++) {
                    let wood = new Wood(newPosX, line);
                    newPosX++;
                    size3Wood.push(wood);
                }
                posX = posX + 5;
                woods = [
                    ...woods,
                    ...size3Wood
                ];
            } else if (line === 2) {
                let size5Wood = [];
                for (let j = 0, newPosX = posX; j < 5; j++) {
                    let wood = new Wood(newPosX, line);
                    newPosX++;
                    size5Wood.push(wood);
                }
                posX = posX + 7;
                woods = [
                    ...woods,
                    ...size5Wood
                ];

            } else {
                let size4Wood = [];
                for (let j = 0, newPosX = posX; j < 4; j++) {
                    let wood = new Wood(newPosX, line);
                    newPosX++;
                    size4Wood.push(wood);
                }
                posX = posX + 8;
                woods = [
                    ...woods,
                    ...size4Wood
                ];
            }
            if (i == 3) {
                posX = 1;
                line = 2;
            } else if (i == 5) {
                posX = 0
                line = 3;
            }
        }
        return woods;
    },

    generateYPos: (line) => {
        switch (line) {
            case 1:
                return 4;
                break;
            case 2:
                return 3;
                break
            case 3:
                return 1;
            default:
                break;
        };
    }
};

export default WoodService;
