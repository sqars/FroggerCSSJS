import Wood from './Wood.js';
import Utils from '../../Utilities/ObjectCreationUtils.js';

const WoodService = {

    createWood: (level) => {
        const {
            filterLine,
            checkAvalable
        } = Utils;

        let posX,
            filteredLine,
            woods = [],
            placed = 0, 
            line = 1,
            attempts = 0,
            overlaps = [];
        while (placed <= 7) {
            posX = (Math.floor(Math.random() * (1 + 14 - 1)) + 1) * 50;
            filteredLine = woods.filter(filterLine.bind(null, line));
            overlaps = filteredLine.filter(checkAvalable.bind(null, posX));
            if (overlaps.length === 0) {
                let wood = new Wood(posX, line, level);
                woods.push(wood);
                placed++;
                attempts = 0;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                let wood = new Wood(-500, line, level);
                woods.push(wood);
                placed++;
            }

            if (placed === 3) {
                line = 2;
            } else if (placed === 5) {
                line = 3;
            }

        }
        return woods;
    },

    generateWidth: (line) => {
        switch (line) {
            case 1:
                return 150;
            case 2:
                return 250;
            case 3:
                return 200;
            default:
                break;
        }
    },

    generateYPos: (line) => {
        switch (line) {
            case 1:
                return 200;
            case 2:
                return 100;
            case 3:
                return 50;
            default:
                break;
        }
    },
};

export default WoodService;
