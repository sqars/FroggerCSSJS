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
                    max = 1000;
                    min = 700;
                    this.posX = Math.random() * (max - min) + min;
                    let filteredObjs = filterObjs(this, objects);
                    filteredObjs.forEach((obj) => {
                        while (this.checkCollision(obj)) {
                            this.posX = Math.random() * (max - min) + min;
                        }
                    });
                };
                this.posX -= this.speed;
                break;
            case 'right':
                if (this.posX > 750) {
                    max = -250;
                    min = -650;
                    this.posX = Math.random() * (max - min) + min;
                    let filteredObjs = filterObjs(this, objects);
                    filteredObjs.forEach((obj) => {
                        while (this.checkCollision(obj)) {
                            this.posX = Math.random() * (max - min) + min;
                        }
                    });
                };
                this.posX += this.speed;
                break;
            default:
                break;
        };

    };

    checkCollision(obj) {
        let result = false;
        this.posX >= obj.posX - obj.width - 50 && this.posX <= obj.posX + obj.width + 50 ? result = true : false;
        return result;
    };

};

function filterObjs(checkedObj, objs) {
    let filteredObjs = objs.filter(obj => obj.line === checkedObj.line);
    let index = filteredObjs.indexOf(checkedObj);
    filteredObjs.splice(index, 1);
    return filteredObjs;
}
