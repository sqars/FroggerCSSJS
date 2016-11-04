import Wood from './Wood.js';

const WoodService = {
    createWood: () => {
        let woods = [];
        for (let i = 1, line = 1, posX = Math.random() * (100 - 0) + 0; i <= 8; i++) {
            let wood = new Wood(posX, line, 1);
            if (line === 1) {
              posX = posX + Math.random() * (400 - 300) + 300;
            } else if (line === 2) {
              posX = posX + Math.random() * (600 - 500) + 500;
            } else {
              posX = posX + Math.random() * (500 - 400) + 400;
            }
            woods.push(wood);
            if (i == 3) {
                posX = Math.random() * (100 - 0) + 0;
                line = 2;
            } else if (i == 5) {
                posX = Math.random() * (100 - 0) + 0;
                line = 3;
            }
        }
        return woods;
    },

    generateWidth: (line) => {
        switch (line) {
            case 1:
                return 150;
                break;
            case 2:
                return 250;
                break
            case 3:
                return 200;
            default:
                break;
        };
    },

    generateYPos: (line) => {
        switch (line) {
            case 1:
                return 200;
                break;
            case 2:
                return 100;
                break
            case 3:
                return 50;
            default:
                break;
        };
    }
};

export default WoodService;
