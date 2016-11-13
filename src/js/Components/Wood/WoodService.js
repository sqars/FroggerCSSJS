import Wood from './Wood.js';

const WoodService = {
        createWood: () => {
            let woods = [];
            let placed = 0;
            let line = 1;
            let attempts = 0;
            while (placed < 8) {
                let posX = (Math.floor(Math.random() * (1 + 14 - 1)) + 1) * 50;
                let available = true;
                let filteredLine = woods.filter(wood => wood.line === line);
                filteredLine.forEach((checkedWood) => {
                    Math.abs(checkedWood.posX - posX) < checkedWood.width + 50 ? available = false : false;
                });
                if (available) {
                    let wood = new Wood(posX, line);
                    woods.push(wood);
                    placed++;
                    attempts = 0;
                } else {
                    attempts++;
                }

                if (attempts > 15) {
                    let wood = new Wood(-500, line);
                    woods.push(wood);
                    placed++;
                }

                if (placed == 3) {
                    line = 2;
                } else if (placed == 5) {
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
    },
};

export default WoodService;
