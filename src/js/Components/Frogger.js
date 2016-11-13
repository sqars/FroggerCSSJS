import MovingObject from './MovingObject.js';
import DrawFunctions from '../Utilities/DrawFunctions.js';

import CheckArea from '../Utilities/CheckArea.js';
import CollisionDetection from '../Utilities/CollisionDetection.js';
import SailService from '../Utilities/SailService.js';

export default class Frogger extends MovingObject {
    constructor(board, posX, posY, direction, lives) {
        super();
        this.height = 50;
        this.width = 50;
        this.posX = board.width * 0.5;
        this.posY = board.height - this.height;
        this.prevPosX = null;
        this.prevPosY = null;
        this.prevDirection = null;
        this.direction = null;
        this.moving = false;
        this.movingCount = 0;
        this.sailing = false;
        this.sailingObj = null;
        this.speed = 5;
        this.lives = 3;
    };

    drawFrogger(ctx) {
        DrawFunctions.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'green');
    };

    triggerMove(event) {
        if (!this.moving) {
            this.calculateFroggerPrevPos();
            this.setDirection(event);
            this.moving = true;
        }
    };

    setDirection(event) {
        switch (event.which) {
            case 37:
                this.direction = 'left';
                break;
            case 38:
                this.direction = 'up';
                break;
            case 39:
                this.direction = 'right';
                break;
            case 40:
                this.direction = 'down';
                break;
            default:
                false;
        }
    };

    calculateFroggerPrevPos() {
        this.prevDirection = this.direction;
        this.prevPosX = this.posX;
        this.prevPosY = this.posY;
    };

    revertFroggerPosition() {
        this.posX = this.prevPosX;
        this.posY = this.prevPosY;
        this.direction = this.prevDirection;
        this.moving = false;
        this.movingCount = 0;
    }

    checkCollisions(board, grass, cars, turtles, woods, winningSpots) {
        const {
            checkIfOutOfMapArea,
            checkIfLastLineArea,
            checkIfCarArea,
            checkIfTurtleArea,
            checkIfWoodArea,
            checkIfWaterArea,
            checkIfOutOfWaterArea
        } = CheckArea;

        const {
            findCollision,
            checkOutOfMap
        } = CollisionDetection;

        if (this.moving) {

            let blockersCollisions = [];

            if (checkIfLastLineArea(this)) { // check collision on lastline only if frogger is on lastline area
                const winningSpot = findCollision(this, winningSpots);
                if (winningSpot) {
                    this.posX = winningSpot.posX + 11.11;
                    //TODO: add function for reseting frogger
                } else {
                    blockersCollisions.push(findCollision(this, grass));
                }
            }

            if (checkIfOutOfMapArea(this)) { // check leaving board if frogger is in the edge of board
                blockersCollisions.push(checkOutOfMap(this, board));
            }

            for (let i = 0; i < blockersCollisions.length; i++) {
                if (blockersCollisions[i]) {
                    this.revertFroggerPosition();
                    break;
                }
            };

        };

        let objsCollisions = [];

        if (checkIfCarArea(this)) { // check collision with cars only if frogger is in 'road' area
            objsCollisions.push(findCollision(this, cars));
        }

        if (checkIfTurtleArea(this)) { // check collision with turtles only if frogger is in 'turtle' area
            const sailingTurtle = findCollision(this, turtles);
            if (sailingTurtle) {
                this.sailing = true;
                this.sailingObj = sailingTurtle;
                if (!this.moving) {
                    SailService.sail(this, sailingTurtle);
                }
            } else {
                this.sailing = false;
            }
        }

        if (checkIfWoodArea(this)) { // check collision with turtles only if frogger is in 'woods' area
            const sailingWood = findCollision(this, woods);
            if (sailingWood) {
                this.sailing = true;
                this.sailingObj = sailingWood;
                if (!this.moving) {
                    SailService.sail(this, sailingWood);
                }
            } else {
                this.sailing = false;
            }
        }

        for (let i = 0; i < objsCollisions.length; i++) {
            if (objsCollisions[i]) {
                // console.log('kolizja');
                break;
            }
        };

    };

    move() {
      const { checkIfOutOfWaterArea } = CheckArea;
        if (this.moving) {
            let sailSpeed = 0;
            this.sailing ? sailSpeed = this.sailingObj.speed : false;
            switch (this.direction) {
                case 'left':
                    this.posX -= this.speed + sailSpeed;
                    break;
                case 'up':
                    this.posY -= this.speed;
                    break;
                case 'right':
                    this.posX += this.speed - sailSpeed;
                    break;
                case 'down':
                    this.posY += this.speed;
                    break;
                default:
                    break;
            };
            this.movingCount++;
            if (this.movingCount >= 50 / this.speed) { // end of movement
                this.movingCount = 0;
                this.moving = false;
                if(checkIfOutOfWaterArea(this)){//check if frogger moves out of water(moves down turtle)
                  this.posX = 50 * Math.round(this.posX / 50); // fix frogger position when leaving turtle
                }
            };
        };
    };

}
