export default class MovingObject {
    constructor(posX, posY, direction, speed) {
        this.posX = posX;
        this.posY = posY;
        this.direction = direction;
        this.speed = speed;
    }

    move(objects) {
        let max;
        let min;
        switch (this.direction) {
            case 'left':
                if (this.posX < -150) {
                    max = 18;
                    min = 14;
                    this.posX = (Math.floor(Math.random() * (1 + max - min)) + min) * 50;
                    let filteredObjs = filterObjs(this, objects);
                    let attempts = 0;
                    filteredObjs.forEach((obj) => {
                        attempts = 0;
                        while (this.checkCollision(obj) && attempts < 15) {
                            console.log(attempts);
                            this.posX = (Math.floor(Math.random() * (1 + max - min)) + min) * 50;
                            attempts++;
                        }
                    });
                    attempts >=15 ? this.posX = 1400 : false;
                };
                this.posX -= this.speed;
                break;
            case 'right':
                if (this.posX > 750) {
                    max = -5;
                    min = -11;
                    this.posX = (Math.floor(Math.random() * (1 + max - min)) + min) * 50;
                    let filteredObjs = filterObjs(this, objects);
                    let attempts = 0;
                    filteredObjs.forEach((obj) => {
                        attempts = 0;
                        while (this.checkCollision(obj) && attempts < 15) {
                            console.log(attempts);
                            this.posX = (Math.floor(Math.random() * (1 + max - min)) + min) * 50;
                            attempts++;
                        }
                    });
                    attempts >=15 ? this.posX = -1000 : false;
                };
                this.posX += this.speed;
                break;
            default:
                break;
        };
    };

    checkCollision(obj) {
        let result = false;
        Math.abs(obj.posX - this.posX) < this.width + 50 ? result = true : result = false;
        return result;
    };

};

function filterObjs(checkedObj, objs) {
    let filteredObjs = objs.filter(obj => obj.line === checkedObj.line);
    let index = filteredObjs.indexOf(checkedObj);
    filteredObjs.splice(index, 1);
    return filteredObjs;
}
