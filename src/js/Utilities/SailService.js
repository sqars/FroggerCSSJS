const SailService = {
    sail: (frogger, obj) => {
        if (50 * Math.round((frogger.posX - obj.posX) / 50) == obj.width) {
            frogger.posX = obj.posX + obj.width - frogger.width;
        } else if (50 * Math.round((frogger.posX - obj.posX) / 50) > 0) {
            frogger.posX = obj.posX + (50 * Math.round((frogger.posX - obj.posX) / 50));
        } else {
            frogger.posX = obj.posX;
        }
    }
};

export default SailService;
