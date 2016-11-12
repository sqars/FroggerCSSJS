import MovingObject from './MovingObject.js';
import DrawFunctions from '../Utilities/DrawFunctions.js';
import BoardService from './Board/BoardService.js';

import CheckArea from '../Utilities/CheckArea.js';
import CollisionDetection from '../Utilities/CollisionDetection.js';

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

    checkCollisions(board, grass, cars, turtles, winningSpots) {
        const {
            checkIfOutOfMapArea,
            checkIfLastLineArea,
            checkIfCarArea,
            checkIfTurtleArea
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

        let movingObjsCollisions = [];

        if (checkIfCarArea(this)) { // check collision with cars only if frogger is in 'road' area
            movingObjsCollisions.push(findCollision(this, cars));
        }

        if (checkIfTurtleArea(this)) { // check collision with turtles only if frogger is in 'turtle' area
            movingObjsCollisions.push(findCollision(this, turtles));
        }

        for (let i = 0; i < movingObjsCollisions.length; i++) {
            if (movingObjsCollisions[i]) {
                console.log('kolizja');
                break;
            }
        };

    };

    move() {
        if (this.moving) {
            switch (this.direction) {
                case 'left':
                    this.posX -= this.speed;
                    break;
                case 'up':
                    this.posY -= this.speed;
                    break;
                case 'right':
                    this.posX += this.speed;
                    break;
                case 'down':
                    this.posY += this.speed;
                    break;
                default:
                    break;
            };
            this.movingCount++;
            if (this.movingCount >= 50 / this.speed) {
                this.movingCount = 0;
                this.moving = false;
            };
        }
    };

}
