(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Frogger = require('../Frogger.js');

var _Frogger2 = _interopRequireDefault(_Frogger);

var _Water = require('../Water/Water.js');

var _Water2 = _interopRequireDefault(_Water);

var _CarService = require('../Cars/CarService.js');

var _CarService2 = _interopRequireDefault(_CarService);

var _TurtleService = require('../Turtles/TurtleService.js');

var _TurtleService2 = _interopRequireDefault(_TurtleService);

var _WoodService = require('../Wood/WoodService.js');

var _WoodService2 = _interopRequireDefault(_WoodService);

var _GrassService = require('../LastLineObjs/GrassService.js');

var _GrassService2 = _interopRequireDefault(_GrassService);

var _WinningSpotService = require('../LastLineObjs/WinningSpotService.js');

var _WinningSpotService2 = _interopRequireDefault(_WinningSpotService);

var _DrawFunctions = require('../../Utilities/DrawFunctions.js');

var _DrawFunctions2 = _interopRequireDefault(_DrawFunctions);

var _EventEmitter = require('../../Utilities/EventEmitter.js');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _InfoBar = require('../InfoBar/InfoBar.js');

var _InfoBar2 = _interopRequireDefault(_InfoBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    var _this = this;

    _classCallCheck(this, Board);

    this.game = true;
    this.emitter = new _EventEmitter2.default();
    this.gameLevel = 1;
    this.gameScore = 0;
    this.levelTimeout = 100;
    this.board = document.getElementById('canvas');
    this.context = this.board.getContext("2d");
    this.infoBar = new _InfoBar2.default();
    this.water = new _Water2.default();
    this.grass = _GrassService2.default.createGrass();
    this.frogger = new _Frogger2.default(this.emitter);
    this.winningSpots = [];
    this.cars = [];
    this.turtles = [];
    this.woods = [];

    this.init = function () {
      _this.resetBoard();
      setInterval(function () {
        _this.levelTimeout--;
        _this.checkTimeOut();
      }, 1000);
      _this.emitter.subscribe('levelComplete', _this.levelUp.bind(_this));
      _this.emitter.subscribe('updateScore', _this.updateScore.bind(_this));
      _this.emitter.subscribe('gameOver', _this.gameOver.bind(_this));
    };

    this.init();
  }

  _createClass(Board, [{
    key: 'setBoard',
    value: function setBoard() {
      if (this.game) {
        this.drawAll();
        this.moveAll();
      } else {}
      requestAnimationFrame(this.setBoard.bind(this));
    }
  }, {
    key: 'drawAll',
    value: function drawAll() {
      var _this2 = this;

      this.context.clearRect(0, 0, this.board.width, this.board.height); // clear board
      this.infoBar.drawInfoBar(this.context, this.gameLevel, this.frogger.lives, this.gameScore, this.levelTimeout);
      this.water.drawWater(this.context); // draw Water
      this.grass.forEach(function (grass) {
        return grass.drawGrass(_this2.context);
      }); // draw Grass
      this.winningSpots.forEach(function (spot) {
        return spot.drawSpot(_this2.context);
      }); // draw winningSpots
      this.cars.forEach(function (car) {
        return car.drawCar(_this2.context);
      }); // draw Cars
      this.turtles.forEach(function (turtle) {
        return turtle.drawTurtle(_this2.context);
      }); // draw Turtles
      this.woods.forEach(function (wood) {
        return wood.drawWood(_this2.context);
      }); // draw Woods
      this.frogger.drawFrogger(this.context); // draw Frogger

      _DrawFunctions2.default.colorText(this.context, 'posX: ' + this.frogger.posX + ', posY: ' + this.frogger.posY, this.frogger.posX, this.frogger.posY, 'black'); // cheat to display frogger positon
    }
  }, {
    key: 'moveAll',
    value: function moveAll() {
      var _this3 = this;

      this.cars.forEach(function (car) {
        return car.move(_this3.cars);
      }); // move Cars
      this.turtles.forEach(function (turtle) {
        return turtle.move(_this3.turtles);
      }); // move Turtles
      this.woods.forEach(function (wood) {
        return wood.move(_this3.woods);
      }); // move Woods
      this.frogger.move();
      this.frogger.handleCollisions(this.board, this.grass, this.cars, this.turtles, this.woods, this.winningSpots, this.context);
    }
  }, {
    key: 'resetBoard',
    value: function resetBoard() {
      this.cars = _CarService2.default.createCars(this.gameLevel);
      this.turtles = _TurtleService2.default.createTurtles(this.gameLevel);
      this.woods = _WoodService2.default.createWood(this.gameLevel);
      this.winningSpots = _WinningSpotService2.default.createWinningSpots();
    }
  }, {
    key: 'updateScore',
    value: function updateScore() {
      this.gameScore += 50;
    }
  }, {
    key: 'levelUp',
    value: function levelUp() {
      this.gameLevel++;
      this.levelTimeout = 100;
      this.gameScore += 1500;
      this.resetBoard();
    }
  }, {
    key: 'checkTimeOut',
    value: function checkTimeOut() {
      if (this.levelTimeout < 0) {
        this.levelTimeout = 5;
        this.frogger.killFrogger();
        this.frogger.resetFrogger();
      }
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      this.game = false;
    }
  }]);

  return Board;
}();

exports.default = Board;

},{"../../Utilities/DrawFunctions.js":20,"../../Utilities/EventEmitter.js":21,"../Cars/CarService.js":3,"../Frogger.js":4,"../InfoBar/InfoBar.js":6,"../LastLineObjs/GrassService.js":8,"../LastLineObjs/WinningSpotService.js":10,"../Turtles/TurtleService.js":13,"../Water/Water.js":14,"../Wood/WoodService.js":17}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MovingObject2 = require('../MovingObject.js');

var _MovingObject3 = _interopRequireDefault(_MovingObject2);

var _CarService = require('./CarService');

var _CarService2 = _interopRequireDefault(_CarService);

var _DrawFunctions = require('../../Utilities/DrawFunctions.js');

var _DrawFunctions2 = _interopRequireDefault(_DrawFunctions);

var _Generators = require('../../Utilities/Generators.js');

var _Generators2 = _interopRequireDefault(_Generators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Car = function (_MovingObject) {
    _inherits(Car, _MovingObject);

    function Car(posX, line, level) {
        _classCallCheck(this, Car);

        var _this = _possibleConstructorReturn(this, (Car.__proto__ || Object.getPrototypeOf(Car)).call(this, posX));

        _this.posY = _CarService2.default.generateYPos(line);
        _this.line = line;
        _this.height = 50;
        _this.width = _CarService2.default.generateWidth(line);
        _this.direction = _CarService2.default.generateDirection(line);
        _this.speed = _Generators2.default.generateSpeed(_this.width, level);
        return _this;
    }

    _createClass(Car, [{
        key: 'drawCar',
        value: function drawCar(ctx) {
            _DrawFunctions2.default.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'red');
        }
    }]);

    return Car;
}(_MovingObject3.default);

exports.default = Car;

},{"../../Utilities/DrawFunctions.js":20,"../../Utilities/Generators.js":22,"../MovingObject.js":11,"./CarService":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Car = require('./Car.js');

var _Car2 = _interopRequireDefault(_Car);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CarService = {

    createCars: function createCars(level) {
        var cars = [];
        var placed = 0;
        var line = 1;
        var attempts = 0;

        var _loop = function _loop() {
            var posX = (Math.floor(Math.random() * (1 + 14 - 1)) + 1) * 50;
            var available = true;
            var filteredLine = cars.filter(function (car) {
                return car.line === line;
            });
            filteredLine.forEach(function (checkedCar) {
                Math.abs(checkedCar.posX - posX) < checkedCar.width + 50 ? available = false : false;
            });
            if (available) {
                var car = new _Car2.default(posX, line, level);
                cars.push(car);
                placed++;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                var _car = new _Car2.default(-500, line, level);
                cars.push(_car);
                placed++;
            }

            if (placed % 3 == 0) {
                line++;
            }
        };

        while (placed <= 15) {
            _loop();
        };
        return cars;
    },

    generateYPos: function generateYPos(line) {
        switch (line) {
            case 1:
                return 550;
                break;
            case 2:
                return 500;
                break;
            case 3:
                return 450;
                break;
            case 4:
                return 400;
                break;
            case 5:
                return 350;
                break;
            default:
                break;
        }
    },

    generateWidth: function generateWidth(line) {
        switch (line) {
            case 5:
                return 150;
                break;
            default:
                return 50;
                break;
        }
    },

    generateDirection: function generateDirection(line) {
        switch (line) {
            case 1:
                return 'right';
                break;
            case 2:
                return 'left';
                break;
            case 3:
                return 'right';
                break;
            case 4:
                return 'left';
                break;
            case 5:
                return 'right';
                break;
            default:
                break;
        }
    }
};

exports.default = CarService;

},{"./Car.js":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MovingObject2 = require('./MovingObject.js');

var _MovingObject3 = _interopRequireDefault(_MovingObject2);

var _DrawFunctions = require('../Utilities/DrawFunctions.js');

var _DrawFunctions2 = _interopRequireDefault(_DrawFunctions);

var _CheckArea = require('../Utilities/CheckArea.js');

var _CheckArea2 = _interopRequireDefault(_CheckArea);

var _EventEmitter = require('../Utilities/EventEmitter.js');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _CollisionDetection = require('../Utilities/CollisionDetection.js');

var _CollisionDetection2 = _interopRequireDefault(_CollisionDetection);

var _SailService = require('../Utilities/SailService.js');

var _SailService2 = _interopRequireDefault(_SailService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Frogger = function (_MovingObject) {
    _inherits(Frogger, _MovingObject);

    function Frogger(emitter) {
        _classCallCheck(this, Frogger);

        var _this = _possibleConstructorReturn(this, (Frogger.__proto__ || Object.getPrototypeOf(Frogger)).call(this));

        _this.height = 50;
        _this.width = 50;
        _this.posX = 350;
        _this.posY = 600;
        _this.prevPosX = null;
        _this.prevPosY = null;
        _this.prevDirection = null;
        _this.direction = null;
        _this.moving = false;
        _this.movingCount = 0;
        _this.sailing = false;
        _this.sailingObj = null;
        _this.speed = 5;
        _this.lives = 3;
        _this.emitter = emitter;
        return _this;
    }

    _createClass(Frogger, [{
        key: 'drawFrogger',
        value: function drawFrogger(ctx) {
            _DrawFunctions2.default.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'green');
        }
    }, {
        key: 'triggerMove',
        value: function triggerMove(event) {
            if (!this.moving) {
                this.calculateFroggerPrevPos();
                this.setDirection(event);
                this.moving = true;
            }
        }
    }, {
        key: 'setDirection',
        value: function setDirection(event) {
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
        }
    }, {
        key: 'calculateFroggerPrevPos',
        value: function calculateFroggerPrevPos() {
            this.prevDirection = this.direction;
            this.prevPosX = this.posX;
            this.prevPosY = this.posY;
        }
    }, {
        key: 'revertFroggerPosition',
        value: function revertFroggerPosition() {
            this.posX = this.prevPosX;
            this.posY = this.prevPosY;
            this.direction = this.prevDirection;
            this.moving = false;
            this.movingCount = 0;
        }
    }, {
        key: 'handleCollisions',
        value: function handleCollisions(board, grass, cars, turtles, woods, winningSpots, context) {
            var checkIfOutOfMapArea = _CheckArea2.default.checkIfOutOfMapArea,
                checkIfLastLineArea = _CheckArea2.default.checkIfLastLineArea,
                checkIfCarArea = _CheckArea2.default.checkIfCarArea,
                checkIfTurtleArea = _CheckArea2.default.checkIfTurtleArea,
                checkIfWoodArea = _CheckArea2.default.checkIfWoodArea,
                checkIfWaterArea = _CheckArea2.default.checkIfWaterArea,
                checkIfOutOfWaterArea = _CheckArea2.default.checkIfOutOfWaterArea;
            var findCollision = _CollisionDetection2.default.findCollision,
                checkOutOfMap = _CollisionDetection2.default.checkOutOfMap,
                findTurtleCollision = _CollisionDetection2.default.findTurtleCollision;


            if (this.moving) {

                var blockersCollisions = [];

                if (checkIfLastLineArea(this)) {
                    // check collision on lastline only if frogger is on lastline area
                    var winningSpot = findCollision(this, winningSpots);
                    if (winningSpot && !winningSpot.taken) {
                        this.posX = winningSpot.posX + 11.11;
                        if (this.posY <= 5) {
                            winningSpot.taken = true;
                            var checkLevelComplete = winningSpots.filter(function (spot) {
                                return !spot.taken;
                            });
                            if (checkLevelComplete.length === 4) {
                                this.emitter.emit('levelComplete', null);
                            }
                            this.resetFrogger();
                        }
                    } else if (winningSpot.taken) {
                        blockersCollisions.push(true);
                    } else {
                        blockersCollisions.push(findCollision(this, grass));
                    }
                }

                if (checkIfOutOfMapArea(this)) {
                    // check leaving board if frogger is in the edge of board
                    blockersCollisions.push(checkOutOfMap(this, board));
                }

                for (var i = 0; i < blockersCollisions.length; i++) {
                    if (blockersCollisions[i]) {
                        this.revertFroggerPosition();
                        break;
                    }
                };
            };

            if (checkIfCarArea(this)) {
                // check collision with cars only if frogger is in 'road' area
                if (findCollision(this, cars)) {
                    // this.resetFrogger();
                }
            }

            if (checkIfTurtleArea(this)) {
                // check collision with turtles only if frogger is in 'turtle' area
                var sailingTurtle = findTurtleCollision(this, turtles);
                if (sailingTurtle) {
                    this.sailing = true;
                    this.sailingObj = sailingTurtle;
                    if (!this.moving) {
                        _SailService2.default.sail(this, sailingTurtle);
                    }
                } else {
                    this.sailing = false;
                }
            }

            if (checkIfWoodArea(this)) {
                // check collision with turtles only if frogger is in 'woods' area
                var sailingWood = findCollision(this, woods);
                if (sailingWood) {
                    this.sailing = true;
                    this.sailingObj = sailingWood;
                    if (!this.moving) {
                        _SailService2.default.sail(this, sailingWood);
                    }
                } else {
                    this.sailing = false;
                }
            }

            if (checkIfWaterArea(this) && !(findTurtleCollision(this, turtles) || findCollision(this, woods))) {// check if frogger is in water
                // this.resetFrogger();
                // this.killFrogger();
            }
        }
    }, {
        key: 'move',
        value: function move() {
            var checkIfOutOfWaterArea = _CheckArea2.default.checkIfOutOfWaterArea;

            if (this.moving) {
                var sailSpeed = 0;
                if (this.sailing) {
                    if (this.sailingObj.direction === 'left') {
                        sailSpeed = this.sailingObj.speed;
                    } else if (this.sailingObj.direction === 'right') {
                        sailSpeed = -this.sailingObj.speed;
                    }
                }
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
                if (this.movingCount >= 50 / this.speed) {
                    // end of movement
                    this.direction == 'up' ? this.emitter.emit('updateScore', null) : false;
                    this.movingCount = 0;
                    this.moving = false;
                    if (checkIfOutOfWaterArea(this)) {
                        //check if frogger moves out of water(moves down turtle)
                        this.posX = 50 * Math.round(this.posX / 50); // fix frogger position when leaving turtle
                    }
                };
            };
        }
    }, {
        key: 'waitForEndMoving',
        value: function waitForEndMoving(frogger) {
            return new Promise(function (resolve, reject) {
                if (!frogger.moving) {
                    resolve();
                }
            });
        }
    }, {
        key: 'killFrogger',
        value: function killFrogger() {
            this.lives--;
            this.lives < 0 ? this.emitter.emit('gameOver', null) : false;
        }
    }, {
        key: 'resetFrogger',
        value: function resetFrogger() {
            this.posX = 350;
            this.posY = 600;
            this.direction = null;
            this.moving = false;
            this.movingCount = 0;
            this.sailing = false;
            this.sailingObj = null;
        }
    }]);

    return Frogger;
}(_MovingObject3.default);

exports.default = Frogger;

},{"../Utilities/CheckArea.js":18,"../Utilities/CollisionDetection.js":19,"../Utilities/DrawFunctions.js":20,"../Utilities/EventEmitter.js":21,"../Utilities/SailService.js":23,"./MovingObject.js":11}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Board = require('./Board/Board.js');

var _Board2 = _interopRequireDefault(_Board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.board = new _Board2.default();
    }

    _createClass(Game, [{
        key: 'startGame',
        value: function startGame() {
            var _this = this;

            this.board.setBoard();
            document.addEventListener('keydown', function () {
                return _this.board.frogger.triggerMove(event);
            });
        }
    }]);

    return Game;
}();

exports.default = Game;

},{"./Board/Board.js":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DrawFunctions = require('../../Utilities/DrawFunctions.js');

var _DrawFunctions2 = _interopRequireDefault(_DrawFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfoBoard = function () {
    function InfoBoard() {
        _classCallCheck(this, InfoBoard);
    }

    _createClass(InfoBoard, [{
        key: 'drawInfoBar',
        value: function drawInfoBar(ctx, gameLevel, froggerLives, gameScore, levelTimeout) {
            var drawRect = _DrawFunctions2.default.drawRect,
                drawText = _DrawFunctions2.default.drawText;

            drawRect(ctx, 0, 650, 700, 50, '#e6e6fa');
            drawRect(ctx, 0, 650, 700, 2, 'black');
            drawText(ctx, 'Arial', 25, 'black', 'Level: ' + gameLevel, 10, 685);
            drawText(ctx, 'Arial', 25, 'black', 'Lives: ' + froggerLives, 600, 685);
            drawText(ctx, 'Arial', 25, 'black', 'Score: ' + gameScore, 130, 685);
            drawText(ctx, 'Arial', 25, 'black', 'Time', 320, 685);
            drawRect(ctx, 385, 660, 200 * levelTimeout / 100, 30, 'orange');
        }
    }]);

    return InfoBoard;
}();

exports.default = InfoBoard;

},{"../../Utilities/DrawFunctions.js":20}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DrawFunctions = require('../../Utilities/DrawFunctions.js');

var _DrawFunctions2 = _interopRequireDefault(_DrawFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grass = function () {
  function Grass(posX, width) {
    _classCallCheck(this, Grass);

    this.posX = posX;;
    this.posY = 0;
    this.width = width;
    this.height = 50;
  }

  _createClass(Grass, [{
    key: 'drawGrass',
    value: function drawGrass(ctx) {
      _DrawFunctions2.default.drawRect(ctx, this.posX, this.posY, this.width, this.height, '#7eaea8');
    }
  }]);

  return Grass;
}();

exports.default = Grass;
;

},{"../../Utilities/DrawFunctions.js":20}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Grass = require('./Grass.js');

var _Grass2 = _interopRequireDefault(_Grass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var GrassService = {
  createGrass: function createGrass() {
    return [].concat(_toConsumableArray(createSmallGrass()), _toConsumableArray(createBigGrass()));
  }
};

function createSmallGrass() {
  var grassLeft = new _Grass2.default(0, 25);
  var grassRight = new _Grass2.default(675, 25);
  return [grassLeft, grassRight];
};

function createBigGrass() {
  var grassArr = [];
  for (var i = 0, posX = 97.22; i < 4; i++) {
    var grass = new _Grass2.default(posX, 72.22);
    posX += 144.44;
    grassArr.push(grass);
  }
  return grassArr;
};

exports.default = GrassService;

},{"./Grass.js":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DrawFunctions = require('../../Utilities/DrawFunctions.js');

var _DrawFunctions2 = _interopRequireDefault(_DrawFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WinningSpot = function () {
  function WinningSpot(posX) {
    _classCallCheck(this, WinningSpot);

    this.posX = posX;
    this.posY = 0;
    this.width = 72.22;
    this.height = 50;
    this.taken = false;
  }

  _createClass(WinningSpot, [{
    key: 'drawSpot',
    value: function drawSpot(ctx) {
      var color = '#9ddfe1';
      if (this.taken) {
        color = 'green';
      }
      _DrawFunctions2.default.drawRect(ctx, this.posX, this.posY, this.width, this.height, color);
    }
  }]);

  return WinningSpot;
}();

exports.default = WinningSpot;
;

},{"../../Utilities/DrawFunctions.js":20}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WinningSpot = require('./WinningSpot.js');

var _WinningSpot2 = _interopRequireDefault(_WinningSpot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WinningSpotService = {
  createWinningSpots: function createWinningSpots() {
    var spotsArr = [];
    for (var i = 0, posX = 25; i < 5; i++) {
      var spot = new _WinningSpot2.default(posX);
      posX += 144.44;
      spotsArr.push(spot);
    }
    return spotsArr;
  }
};

exports.default = WinningSpotService;

},{"./WinningSpot.js":9}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MovingObject = function () {
    function MovingObject(posX, posY, direction, speed) {
        _classCallCheck(this, MovingObject);

        this.posX = posX;
        this.posY = posY;
        this.direction = direction;
        this.speed = speed;
    }

    _createClass(MovingObject, [{
        key: 'move',
        value: function move(objects) {
            var _this = this;

            var max = void 0;
            var min = void 0;
            switch (this.direction) {
                case 'left':
                    if (this.posX < -150) {
                        (function () {
                            max = 18;
                            min = 14;
                            _this.posX = (Math.floor(Math.random() * (1 + max - min)) + min) * 50;
                            var filteredObjs = filterObjs(_this, objects);
                            var attempts = 0;
                            filteredObjs.forEach(function (obj) {
                                attempts = 0;
                                while (_this.checkCollision(obj) && attempts < 15) {
                                    _this.posX = (Math.floor(Math.random() * (1 + max - min)) + min) * 50;
                                    attempts++;
                                }
                            });
                            attempts >= 15 ? _this.posX = 1400 : false;
                        })();
                    };
                    this.posX -= this.speed;
                    break;
                case 'right':
                    if (this.posX > 750) {
                        (function () {
                            max = -5;
                            min = -11;
                            _this.posX = (Math.floor(Math.random() * (1 + max - min)) + min) * 50;
                            var filteredObjs = filterObjs(_this, objects);
                            var attempts = 0;
                            filteredObjs.forEach(function (obj) {
                                attempts = 0;
                                while (_this.checkCollision(obj) && attempts < 15) {
                                    _this.posX = (Math.floor(Math.random() * (1 + max - min)) + min) * 50;
                                    attempts++;
                                }
                            });
                            attempts >= 15 ? _this.posX = -1000 : false;
                        })();
                    };
                    this.posX += this.speed;
                    break;
                default:
                    break;
            };
        }
    }, {
        key: 'checkCollision',
        value: function checkCollision(obj) {
            var result = false;
            Math.abs(obj.posX - this.posX) < this.width + 50 ? result = true : result = false;
            return result;
        }
    }]);

    return MovingObject;
}();

exports.default = MovingObject;
;

function filterObjs(checkedObj, objs) {
    var filteredObjs = objs.filter(function (obj) {
        return obj.line === checkedObj.line;
    });
    var index = filteredObjs.indexOf(checkedObj);
    filteredObjs.splice(index, 1);
    return filteredObjs;
}

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MovingObject2 = require('../MovingObject.js');

var _MovingObject3 = _interopRequireDefault(_MovingObject2);

var _TurtleService = require('./TurtleService.js');

var _TurtleService2 = _interopRequireDefault(_TurtleService);

var _DrawFunctions = require('../../Utilities/DrawFunctions.js');

var _DrawFunctions2 = _interopRequireDefault(_DrawFunctions);

var _Generators = require('../../Utilities/Generators.js');

var _Generators2 = _interopRequireDefault(_Generators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Turtle = function (_MovingObject) {
    _inherits(Turtle, _MovingObject);

    function Turtle(posX, line, diving, level) {
        _classCallCheck(this, Turtle);

        var _this = _possibleConstructorReturn(this, (Turtle.__proto__ || Object.getPrototypeOf(Turtle)).call(this, posX));

        _this.line = line;
        _this.height = 50;
        _this.width = _TurtleService2.default.generateWidth(line);
        _this.posY = _TurtleService2.default.generateYPos(line);
        _this.speed = _Generators2.default.generateSpeed(_this.width, level);
        _this.diving = diving;
        _this.dived = false;
        _this.direction = 'left';
        _this.divingCounter = 0;
        return _this;
    }

    _createClass(Turtle, [{
        key: 'drawTurtle',
        value: function drawTurtle(ctx) {
            if (this.diving) {
                if (this.divingCounter < 100) {
                    this.dived = false;
                    _DrawFunctions2.default.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'brown');
                } else if (this.divingCounter > 200) {
                    this.divingCounter = 0;
                } else {
                    this.dived = true;
                }
                this.divingCounter++;
            } else {
                _DrawFunctions2.default.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'brown');
            }
        }
    }]);

    return Turtle;
}(_MovingObject3.default);

exports.default = Turtle;

},{"../../Utilities/DrawFunctions.js":20,"../../Utilities/Generators.js":22,"../MovingObject.js":11,"./TurtleService.js":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Turtle = require('./Turtle.js');

var _Turtle2 = _interopRequireDefault(_Turtle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TurtleService = {

    createTurtles: function createTurtles(level) {
        var turtles = [];
        var placed = 0;
        var line = 1;
        var attempts = 0;
        var diving = false;

        var _loop = function _loop() {
            if (placed == 2 || placed == 6) {
                diving = true;
            } else {
                diving = false;
            }
            var posX = (Math.floor(Math.random() * (1 + 14 - 1)) + 1) * 50;
            var available = true;
            var filteredLine = turtles.filter(function (turtle) {
                return turtle.line === line;
            });
            filteredLine.forEach(function (checkedTurtle) {
                Math.abs(checkedTurtle.posX - posX) < checkedTurtle.width + 50 ? available = false : false;
            });
            if (available) {
                var turtle = new _Turtle2.default(posX, line, diving, level);
                turtles.push(turtle);
                placed++;
                attempts = 0;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                var _turtle = new _Turtle2.default(-500, line, diving, level);
                turtles.push(_turtle);
                placed++;
            }

            if (placed == 4) {
                line = 2;
            }
        };

        while (placed <= 7) {
            _loop();
        }
        return turtles;
    },

    generateYPos: function generateYPos(line) {
        switch (line) {
            case 1:
                return 150;
                break;
            case 2:
                return 250;
                break;
            default:
                break;
        }
    },

    generateWidth: function generateWidth(line) {
        switch (line) {
            case 1:
                return 100;
                break;
            default:
                return 150;
                break;
        }
    }

};

exports.default = TurtleService;

},{"./Turtle.js":12}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WaterService = require('./WaterService.js');

var _WaterService2 = _interopRequireDefault(_WaterService);

var _DrawFunctions = require('../../Utilities/DrawFunctions.js');

var _DrawFunctions2 = _interopRequireDefault(_DrawFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Water = function () {
  function Water() {
    _classCallCheck(this, Water);

    this.posX = 0;
    this.posY = 50;
    this.height = 250;
    this.width = 700;
  }

  _createClass(Water, [{
    key: 'drawWater',
    value: function drawWater(ctx) {
      _DrawFunctions2.default.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'blue');
    }
  }]);

  return Water;
}();

exports.default = Water;

},{"../../Utilities/DrawFunctions.js":20,"./WaterService.js":15}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Water = require('./Water.js');

var _Water2 = _interopRequireDefault(_Water);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WaterService = {
    createWater: function createWater() {
        var waterObjs = [];
        for (var i = 1, line = 1, posX = 0; i <= 70; i++) {
            var water = new _Water2.default(posX, line);
            posX = posX + 1;
            waterObjs.push(water);
            if (i % 14 == 0) {
                line++;
                posX = 0;
            }
        }
        return waterObjs;
    }
};

exports.default = WaterService;

},{"./Water.js":14}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MovingObject2 = require('../MovingObject.js');

var _MovingObject3 = _interopRequireDefault(_MovingObject2);

var _WoodService = require('./WoodService.js');

var _WoodService2 = _interopRequireDefault(_WoodService);

var _DrawFunctions = require('../../Utilities/DrawFunctions.js');

var _DrawFunctions2 = _interopRequireDefault(_DrawFunctions);

var _Generators = require('../../Utilities/Generators.js');

var _Generators2 = _interopRequireDefault(_Generators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wood = function (_MovingObject) {
    _inherits(Wood, _MovingObject);

    function Wood(posX, line, level) {
        _classCallCheck(this, Wood);

        var _this = _possibleConstructorReturn(this, (Wood.__proto__ || Object.getPrototypeOf(Wood)).call(this, posX));

        _this.line = line;
        _this.height = 50;
        _this.width = _WoodService2.default.generateWidth(line);
        _this.posY = _WoodService2.default.generateYPos(line);
        _this.speed = _Generators2.default.generateSpeed(_this.width, level);
        _this.direction = 'right';
        return _this;
    }

    _createClass(Wood, [{
        key: 'drawWood',
        value: function drawWood(ctx) {
            _DrawFunctions2.default.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'beige');
        }
    }]);

    return Wood;
}(_MovingObject3.default);

exports.default = Wood;

},{"../../Utilities/DrawFunctions.js":20,"../../Utilities/Generators.js":22,"../MovingObject.js":11,"./WoodService.js":17}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Wood = require('./Wood.js');

var _Wood2 = _interopRequireDefault(_Wood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WoodService = {
    createWood: function createWood(level) {
        var woods = [];
        var placed = 0;
        var line = 1;
        var attempts = 0;

        var _loop = function _loop() {
            var posX = (Math.floor(Math.random() * (1 + 14 - 1)) + 1) * 50;
            var available = true;
            var filteredLine = woods.filter(function (wood) {
                return wood.line === line;
            });
            filteredLine.forEach(function (checkedWood) {
                Math.abs(checkedWood.posX - posX) < checkedWood.width + 50 ? available = false : false;
            });
            if (available) {
                var wood = new _Wood2.default(posX, line, level);
                woods.push(wood);
                placed++;
                attempts = 0;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                var _wood = new _Wood2.default(-500, line, level);
                woods.push(_wood);
                placed++;
            }

            if (placed == 3) {
                line = 2;
            } else if (placed == 5) {
                line = 3;
            }
        };

        while (placed <= 7) {
            _loop();
        }
        return woods;
    },

    generateWidth: function generateWidth(line) {
        switch (line) {
            case 1:
                return 150;
                break;
            case 2:
                return 250;
                break;
            case 3:
                return 200;
            default:
                break;
        };
    },

    generateYPos: function generateYPos(line) {
        switch (line) {
            case 1:
                return 200;
                break;
            case 2:
                return 100;
                break;
            case 3:
                return 50;
            default:
                break;
        };
    }
};

exports.default = WoodService;

},{"./Wood.js":16}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CheckArea = {
  checkIfOutOfMapArea: function checkIfOutOfMapArea(frogger) {
    var result = false;
    if (frogger.posX <= 0 || frogger.posX >= 650 || frogger.posY <= 0 || frogger.posY >= 600) {
      result = true;
    }
    return result;
  },

  checkIfCarArea: function checkIfCarArea(frogger) {
    var result = false;
    if (frogger.posY >= 350 && frogger.posY <= 550) {
      result = true;
    }
    return result;
  },

  checkIfLastLineArea: function checkIfLastLineArea(frogger) {
    var result = false;
    if (frogger.posY <= 50 && frogger.posY >= 0) {
      result = true;
    }
    return result;
  },

  checkIfTurtleArea: function checkIfTurtleArea(frogger) {
    var result = false;
    if (frogger.posY <= 300 && frogger.posY >= 150) {
      result = true;
    }
    return result;
  },

  checkIfWoodArea: function checkIfWoodArea(frogger) {
    var result = false;
    if (frogger.posY <= 250 && frogger.posY >= 50) {
      result = true;
    }
    return result;
  },

  checkIfWaterArea: function checkIfWaterArea(frogger) {
    var result = false;
    if (frogger.posY < 300 && frogger.posY > 50) {
      result = true;
    }
    return result;
  },

  checkIfOutOfWaterArea: function checkIfOutOfWaterArea(frogger) {
    var result = false;
    if (frogger.posY <= 350 && frogger.posY >= 300) {
      result = true;
    }
    return result;
  }
};

exports.default = CheckArea;

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var CollisionDetection = {
    checkCollision: function checkCollision(frogger, obj) {
        var result = false;

        var objLeftSide = obj.posX; // 150
        var objRightSide = obj.posX + obj.width; // 200
        var objTopSide = obj.posY; // 0
        var objBottomSide = obj.posY + obj.height; // 50

        var froggerLeftSide = frogger.posX; // 150
        var froggerRightSide = frogger.posX + frogger.width; // 200
        var froggerTopSide = frogger.posY; // 45
        var froggerBottomSide = frogger.posY + frogger.height; // 95


        if ((froggerRightSide > objLeftSide && froggerRightSide <= objRightSide || froggerLeftSide < objRightSide && froggerLeftSide >= objLeftSide) && froggerTopSide < objBottomSide && froggerBottomSide > objTopSide) {
            result = true;
        };
        return result;
    },

    findCollision: function findCollision(frogger, objectsArr) {
        var result = false;
        for (var i = 0; i < objectsArr.length; i++) {
            if (CollisionDetection.checkCollision(frogger, objectsArr[i])) {
                result = objectsArr[i];
                break;
            }
        };
        return result;
    },

    findTurtleCollision: function findTurtleCollision(frogger, turtlesArr) {
        // we need this to filter diving turtles
        var result = false;
        var notDivingTurtles = turtlesArr.filter(function (turtle) {
            return !turtle.dived;
        });
        for (var i = 0; i < notDivingTurtles.length; i++) {
            if (CollisionDetection.checkCollision(frogger, notDivingTurtles[i])) {
                result = notDivingTurtles[i];
                break;
            }
        };
        return result;
    },

    checkOutOfMap: function checkOutOfMap(frogger, board) {
        var result = false;
        if (frogger.posX > board.width - 50 || frogger.posX < 0 || frogger.posY > board.height - 100 || frogger.posY < 0) {
            result = true;
        }
        return result;
    }
};

exports.default = CollisionDetection;

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DrawFunctions = {
  drawRect: function drawRect(ctx, posX, posY, width, height, color) {
    ctx.beginPath();
    ctx.rect(posX, posY, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  },

  colorText: function colorText(ctx, showWords, textX, textY, color) {
    ctx.font = "10px Arial";
    ctx.fillStyle = color;
    ctx.fillText(showWords, textX, textY);
  },

  drawText: function drawText(ctx, fontFamily, fontSize, color, text, posX, posY) {
    ctx.font = fontSize + "px " + fontFamily;
    ctx.fillText(text, posX, posY);
  }
};

exports.default = DrawFunctions;

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.events = {};
  }

  _createClass(EventEmitter, [{
    key: "subscribe",
    value: function subscribe(eventName, fn) {
      var _this = this;

      !this.events[eventName] ? this.events[eventName] = [] : false;
      this.events[eventName].push(fn);

      return function () {
        _this.events[eventName] = _this.events[eventName].filter(function (eventFn) {
          return fn !== eventFn;
        });
      };
    }
  }, {
    key: "emit",
    value: function emit(eventName, data) {
      var event = this.events[eventName];
      if (event) {
        event.forEach(function (fn) {
          fn.call(null, data);
        });
      }
    }
  }]);

  return EventEmitter;
}();

exports.default = EventEmitter;

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Generators = {
    generateSpeed: function generateSpeed(width, level) {
        return Math.sqrt(width * 1 / 100) + Math.sqrt(Math.pow(level, 3) / width);
    }
};

exports.default = Generators;

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var SailService = {
    sail: function sail(frogger, obj) {
        if (50 * Math.round((frogger.posX - obj.posX) / 50) == obj.width) {
            frogger.posX = obj.posX + obj.width - frogger.width;
        } else if (50 * Math.round((frogger.posX - obj.posX) / 50) > 0) {
            frogger.posX = obj.posX + 50 * Math.round((frogger.posX - obj.posX) / 50);
        } else {
            frogger.posX = obj.posX;
        }
    }
};

exports.default = SailService;

},{}],24:[function(require,module,exports){
'use strict';

var _Game = require('./Components/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./Components/Game.js":5}]},{},[24])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9JbmZvQmFyL0luZm9CYXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3MuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3NTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90U2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL01vdmluZ09iamVjdC5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9XYXRlci9XYXRlclNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2RTZXJ2aWNlLmpzIiwic3JjL2pzL1V0aWxpdGllcy9DaGVja0FyZWEuanMiLCJzcmMvanMvVXRpbGl0aWVzL0NvbGxpc2lvbkRldGVjdGlvbi5qcyIsInNyYy9qcy9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyIsInNyYy9qcy9VdGlsaXRpZXMvRXZlbnRFbWl0dGVyLmpzIiwic3JjL2pzL1V0aWxpdGllcy9HZW5lcmF0b3JzLmpzIiwic3JjL2pzL1V0aWxpdGllcy9TYWlsU2VydmljZS5qcyIsInNyYy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQixLO0FBQ2pCLG1CQUFjO0FBQUE7O0FBQUE7O0FBQ1YsU0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUssT0FBTCxHQUFlLDRCQUFmO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsU0FBSyxZQUFMLEdBQW9CLEdBQXBCO0FBQ0EsU0FBSyxLQUFMLEdBQWEsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQWI7QUFDQSxTQUFLLE9BQUwsR0FBZSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLElBQXRCLENBQWY7QUFDQSxTQUFLLE9BQUwsR0FBZSx1QkFBZjtBQUNBLFNBQUssS0FBTCxHQUFhLHFCQUFiO0FBQ0EsU0FBSyxLQUFMLEdBQWEsdUJBQWEsV0FBYixFQUFiO0FBQ0EsU0FBSyxPQUFMLEdBQWUsc0JBQVksS0FBSyxPQUFqQixDQUFmO0FBQ0EsU0FBSyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsU0FBSyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUssT0FBTCxHQUFlLEVBQWY7QUFDQSxTQUFLLEtBQUwsR0FBYSxFQUFiOztBQUVBLFNBQUssSUFBTCxHQUFZLFlBQU07QUFDZCxZQUFLLFVBQUw7QUFDQSxrQkFBWSxZQUFLO0FBQ2YsY0FBSyxZQUFMO0FBQ0EsY0FBSyxZQUFMO0FBQ0QsT0FIRCxFQUdHLElBSEg7QUFJQSxZQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLGVBQXZCLEVBQXdDLE1BQUssT0FBTCxDQUFhLElBQWIsT0FBeEM7QUFDQSxZQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLGFBQXZCLEVBQXNDLE1B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LHVCQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWtCO0FBQzdCLGVBQU8sS0FBSyxJQUFMLENBQVUsUUFBUSxDQUFSLEdBQVUsR0FBcEIsSUFBMkIsS0FBSyxJQUFMLENBQVUsS0FBSyxHQUFMLENBQVMsS0FBVCxFQUFnQixDQUFoQixJQUFtQixLQUE3QixDQUFsQztBQUNIO0FBSGMsQ0FBbkI7O2tCQU1lLFU7Ozs7Ozs7O0FDTmYsSUFBTSxjQUFjO0FBQ2hCLFVBQU0sY0FBQyxPQUFELEVBQVUsR0FBVixFQUFrQjtBQUNwQixZQUFJLEtBQUssS0FBSyxLQUFMLENBQVcsQ0FBQyxRQUFRLElBQVIsR0FBZSxJQUFJLElBQXBCLElBQTRCLEVBQXZDLENBQUwsSUFBbUQsSUFBSSxLQUEzRCxFQUFrRTtBQUM5RCxvQkFBUSxJQUFSLEdBQWUsSUFBSSxJQUFKLEdBQVcsSUFBSSxLQUFmLEdBQXVCLFFBQVEsS0FBOUM7QUFDSCxTQUZELE1BRU8sSUFBSSxLQUFLLEtBQUssS0FBTCxDQUFXLENBQUMsUUFBUSxJQUFSLEdBQWUsSUFBSSxJQUFwQixJQUE0QixFQUF2QyxDQUFMLEdBQWtELENBQXRELEVBQXlEO0FBQzVELG9CQUFRLElBQVIsR0FBZSxJQUFJLElBQUosR0FBWSxLQUFLLEtBQUssS0FBTCxDQUFXLENBQUMsUUFBUSxJQUFSLEdBQWUsSUFBSSxJQUFwQixJQUE0QixFQUF2QyxDQUFoQztBQUNILFNBRk0sTUFFQTtBQUNILG9CQUFRLElBQVIsR0FBZSxJQUFJLElBQW5CO0FBQ0g7QUFDSjtBQVRlLENBQXBCOztrQkFZZSxXOzs7OztBQ1pmOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFLO0FBQ2pELE1BQUksT0FBTyxvQkFBWDtBQUNBLE9BQUssU0FBTDtBQUNELENBSEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEZyb2dnZXIgZnJvbSAnLi4vRnJvZ2dlci5qcyc7XG5pbXBvcnQgV2F0ZXIgZnJvbSAnLi4vV2F0ZXIvV2F0ZXIuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi4vQ2Fycy9DYXJTZXJ2aWNlLmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4uL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi4vV29vZC9Xb29kU2VydmljZS5qcyc7XG5pbXBvcnQgR3Jhc3NTZXJ2aWNlIGZyb20gJy4uL0xhc3RMaW5lT2Jqcy9HcmFzc1NlcnZpY2UuanMnO1xuaW1wb3J0IFdpbm5pbmdTcG90U2VydmljZSBmcm9tICcuLi9MYXN0TGluZU9ianMvV2lubmluZ1Nwb3RTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0V2ZW50RW1pdHRlci5qcyc7XG5pbXBvcnQgSW5mb0JhciBmcm9tICcuLi9JbmZvQmFyL0luZm9CYXIuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5nYW1lTGV2ZWwgPSAxO1xuICAgICAgICB0aGlzLmdhbWVTY29yZSA9IDA7XG4gICAgICAgIHRoaXMubGV2ZWxUaW1lb3V0ID0gMTAwO1xuICAgICAgICB0aGlzLmJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmJvYXJkLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy5pbmZvQmFyID0gbmV3IEluZm9CYXIoKTtcbiAgICAgICAgdGhpcy53YXRlciA9IG5ldyBXYXRlcigpO1xuICAgICAgICB0aGlzLmdyYXNzID0gR3Jhc3NTZXJ2aWNlLmNyZWF0ZUdyYXNzKCk7XG4gICAgICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKHRoaXMuZW1pdHRlcik7XG4gICAgICAgIHRoaXMud2lubmluZ1Nwb3RzID0gW107XG4gICAgICAgIHRoaXMuY2FycyA9IFtdO1xuICAgICAgICB0aGlzLnR1cnRsZXMgPSBbXTtcbiAgICAgICAgdGhpcy53b29kcyA9IFtdO1xuXG4gICAgICAgIHRoaXMuaW5pdCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRCb2FyZCgpO1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT57XG4gICAgICAgICAgICAgIHRoaXMubGV2ZWxUaW1lb3V0LS07XG4gICAgICAgICAgICAgIHRoaXMuY2hlY2tUaW1lT3V0KCk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5zdWJzY3JpYmUoJ2xldmVsQ29tcGxldGUnLCB0aGlzLmxldmVsVXAuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuc3Vic2NyaWJlKCd1cGRhdGVTY29yZScsIHRoaXMudXBkYXRlU2NvcmUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuc3Vic2NyaWJlKCdnYW1lT3ZlcicsIHRoaXMuZ2FtZU92ZXIuYmluZCh0aGlzKSk7IFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHNldEJvYXJkKCkge1xuICAgICAgaWYodGhpcy5nYW1lKXtcbiAgICAgICAgdGhpcy5kcmF3QWxsKCk7XG4gICAgICAgIHRoaXMubW92ZUFsbCgpO1xuICAgICAgfSBlbHNlIHtcblxuICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5zZXRCb2FyZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBkcmF3QWxsKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuYm9hcmQud2lkdGgsIHRoaXMuYm9hcmQuaGVpZ2h0KTsgLy8gY2xlYXIgYm9hcmRcbiAgICAgICAgdGhpcy5pbmZvQmFyLmRyYXdJbmZvQmFyKHRoaXMuY29udGV4dCwgdGhpcy5nYW1lTGV2ZWwsIHRoaXMuZnJvZ2dlci5saXZlcywgdGhpcy5nYW1lU2NvcmUsIHRoaXMubGV2ZWxUaW1lb3V0KTtcbiAgICAgICAgdGhpcy53YXRlci5kcmF3V2F0ZXIodGhpcy5jb250ZXh0KTsgLy8gZHJhdyBXYXRlclxuICAgICAgICB0aGlzLmdyYXNzLmZvckVhY2goZ3Jhc3MgPT4gZ3Jhc3MuZHJhd0dyYXNzKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IEdyYXNzXG4gICAgICAgIHRoaXMud2lubmluZ1Nwb3RzLmZvckVhY2goc3BvdCA9PiBzcG90LmRyYXdTcG90KHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IHdpbm5pbmdTcG90c1xuICAgICAgICB0aGlzLmNhcnMuZm9yRWFjaChjYXIgPT4gY2FyLmRyYXdDYXIodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgQ2Fyc1xuICAgICAgICB0aGlzLnR1cnRsZXMuZm9yRWFjaCh0dXJ0bGUgPT4gdHVydGxlLmRyYXdUdXJ0bGUodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgVHVydGxlc1xuICAgICAgICB0aGlzLndvb2RzLmZvckVhY2god29vZCA9PiB3b29kLmRyYXdXb29kKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IFdvb2RzXG4gICAgICAgIHRoaXMuZnJvZ2dlci5kcmF3RnJvZ2dlcih0aGlzLmNvbnRleHQpOyAvLyBkcmF3IEZyb2dnZXJcblxuICAgICAgICBEcmF3RnVuY3Rpb25zLmNvbG9yVGV4dCh0aGlzLmNvbnRleHQsICdwb3NYOiAnICsgdGhpcy5mcm9nZ2VyLnBvc1ggKyAnLCBwb3NZOiAnICsgdGhpcy5mcm9nZ2VyLnBvc1ksIHRoaXMuZnJvZ2dlci5wb3NYLCB0aGlzLmZyb2dnZXIucG9zWSwgJ2JsYWNrJyk7IC8vIGNoZWF0IHRvIGRpc3BsYXkgZnJvZ2dlciBwb3NpdG9uXG4gICAgfVxuXG4gICAgbW92ZUFsbCgpIHtcbiAgICAgICAgdGhpcy5jYXJzLmZvckVhY2goY2FyID0+IGNhci5tb3ZlKHRoaXMuY2FycykpOyAvLyBtb3ZlIENhcnNcbiAgICAgICAgdGhpcy50dXJ0bGVzLmZvckVhY2godHVydGxlID0+IHR1cnRsZS5tb3ZlKHRoaXMudHVydGxlcykpOyAvLyBtb3ZlIFR1cnRsZXNcbiAgICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5tb3ZlKHRoaXMud29vZHMpKTsgLy8gbW92ZSBXb29kc1xuICAgICAgICB0aGlzLmZyb2dnZXIubW92ZSgpO1xuICAgICAgICB0aGlzLmZyb2dnZXIuaGFuZGxlQ29sbGlzaW9ucyh0aGlzLmJvYXJkLCB0aGlzLmdyYXNzLCB0aGlzLmNhcnMsIHRoaXMudHVydGxlcywgdGhpcy53b29kcywgdGhpcy53aW5uaW5nU3BvdHMsIHRoaXMuY29udGV4dCk7XG4gICAgfVxuXG4gICAgcmVzZXRCb2FyZCgpe1xuICAgICAgdGhpcy5jYXJzID0gQ2FyU2VydmljZS5jcmVhdGVDYXJzKHRoaXMuZ2FtZUxldmVsKTtcbiAgICAgIHRoaXMudHVydGxlcyA9IFR1cnRsZVNlcnZpY2UuY3JlYXRlVHVydGxlcyh0aGlzLmdhbWVMZXZlbCk7XG4gICAgICB0aGlzLndvb2RzID0gV29vZFNlcnZpY2UuY3JlYXRlV29vZCh0aGlzLmdhbWVMZXZlbCk7XG4gICAgICB0aGlzLndpbm5pbmdTcG90cyA9IFdpbm5pbmdTcG90U2VydmljZS5jcmVhdGVXaW5uaW5nU3BvdHMoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTY29yZSgpe1xuICAgICAgdGhpcy5nYW1lU2NvcmUgKz0gNTA7XG4gICAgfVxuXG4gICAgbGV2ZWxVcCgpIHtcbiAgICAgICAgdGhpcy5nYW1lTGV2ZWwrKztcbiAgICAgICAgdGhpcy5sZXZlbFRpbWVvdXQgPSAxMDA7XG4gICAgICAgIHRoaXMuZ2FtZVNjb3JlICs9IDE1MDA7XG4gICAgICAgIHRoaXMucmVzZXRCb2FyZCgpO1xuICAgIH1cblxuICAgIGNoZWNrVGltZU91dCgpe1xuICAgICAgaWYodGhpcy5sZXZlbFRpbWVvdXQgPCAwKXtcbiAgICAgICAgdGhpcy5sZXZlbFRpbWVvdXQgPSA1O1xuICAgICAgICB0aGlzLmZyb2dnZXIua2lsbEZyb2dnZXIoKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyLnJlc2V0RnJvZ2dlcigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdhbWVPdmVyKCl7XG4gICAgICB0aGlzLmdhbWUgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuL0NhclNlcnZpY2UnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuaW1wb3J0IEdlbmVyYXRvcnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0dlbmVyYXRvcnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuXG4gICAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgbGV2ZWwpIHtcbiAgICAgICAgc3VwZXIocG9zWCk7XG4gICAgICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgICAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gQ2FyU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IENhclNlcnZpY2UuZ2VuZXJhdGVEaXJlY3Rpb24obGluZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBHZW5lcmF0b3JzLmdlbmVyYXRlU3BlZWQodGhpcy53aWR0aCwgbGV2ZWwpO1xuICAgIH1cblxuICAgIGRyYXdDYXIoY3R4KSB7XG4gICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdyZWQnKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBDYXIgZnJvbSAnLi9DYXIuanMnO1xuXG5jb25zdCBDYXJTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlQ2FyczogKGxldmVsKSA9PiB7XG4gICAgICAgIGxldCBjYXJzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDFcbiAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgd2hpbGUgKHBsYWNlZCA8PSAxNSkge1xuICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSBjYXJzLmZpbHRlcihjYXIgPT4gY2FyLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRDYXIpID0+IHtcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkQ2FyLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRDYXIud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FyID0gbmV3IENhcihwb3NYLCBsaW5lLCBsZXZlbCk7XG4gICAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIoLTUwMCwgbGluZSwgbGV2ZWwpO1xuICAgICAgICAgICAgICAgIGNhcnMucHVzaChjYXIpO1xuICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGxhY2VkICUgMyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY2FycztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gNDUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiA0MDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDM1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVXaWR0aDogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlRGlyZWN0aW9uOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuaW1wb3J0IENoZWNrQXJlYSBmcm9tICcuLi9VdGlsaXRpZXMvQ2hlY2tBcmVhLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vVXRpbGl0aWVzL0V2ZW50RW1pdHRlci5qcyc7XG5pbXBvcnQgQ29sbGlzaW9uRGV0ZWN0aW9uIGZyb20gJy4uL1V0aWxpdGllcy9Db2xsaXNpb25EZXRlY3Rpb24uanMnO1xuaW1wb3J0IFNhaWxTZXJ2aWNlIGZyb20gJy4uL1V0aWxpdGllcy9TYWlsU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb2dnZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKGVtaXR0ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICAgICAgdGhpcy53aWR0aCA9IDUwO1xuICAgICAgICB0aGlzLnBvc1ggPSAzNTA7XG4gICAgICAgIHRoaXMucG9zWSA9IDYwMDtcbiAgICAgICAgdGhpcy5wcmV2UG9zWCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldlBvc1kgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZEaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnNhaWxpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zYWlsaW5nT2JqID0gbnVsbDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDU7XG4gICAgICAgIHRoaXMubGl2ZXMgPSAzO1xuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBlbWl0dGVyO1xuICAgIH07XG5cbiAgICBkcmF3RnJvZ2dlcihjdHgpIHtcbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2dyZWVuJyk7XG4gICAgfTtcblxuICAgIHRyaWdnZXJNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlRnJvZ2dlclByZXZQb3MoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzZXREaXJlY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjYWxjdWxhdGVGcm9nZ2VyUHJldlBvcygpIHtcbiAgICAgICAgdGhpcy5wcmV2RGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb247XG4gICAgICAgIHRoaXMucHJldlBvc1ggPSB0aGlzLnBvc1g7XG4gICAgICAgIHRoaXMucHJldlBvc1kgPSB0aGlzLnBvc1k7XG4gICAgfTtcblxuICAgIHJldmVydEZyb2dnZXJQb3NpdGlvbigpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gdGhpcy5wcmV2UG9zWDtcbiAgICAgICAgdGhpcy5wb3NZID0gdGhpcy5wcmV2UG9zWTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLnByZXZEaXJlY3Rpb247XG4gICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbGxpc2lvbnMoYm9hcmQsIGdyYXNzLCBjYXJzLCB0dXJ0bGVzLCB3b29kcywgd2lubmluZ1Nwb3RzLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNoZWNrSWZPdXRPZk1hcEFyZWEsXG4gICAgICAgICAgICBjaGVja0lmTGFzdExpbmVBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZkNhckFyZWEsXG4gICAgICAgICAgICBjaGVja0lmVHVydGxlQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZXb29kQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZXYXRlckFyZWEsXG4gICAgICAgICAgICBjaGVja0lmT3V0T2ZXYXRlckFyZWFcbiAgICAgICAgfSA9IENoZWNrQXJlYTtcblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBmaW5kQ29sbGlzaW9uLFxuICAgICAgICAgICAgY2hlY2tPdXRPZk1hcCxcbiAgICAgICAgICAgIGZpbmRUdXJ0bGVDb2xsaXNpb25cbiAgICAgICAgfSA9IENvbGxpc2lvbkRldGVjdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5tb3ZpbmcpIHtcblxuICAgICAgICAgICAgbGV0IGJsb2NrZXJzQ29sbGlzaW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoY2hlY2tJZkxhc3RMaW5lQXJlYSh0aGlzKSkgeyAvLyBjaGVjayBjb2xsaXNpb24gb24gbGFzdGxpbmUgb25seSBpZiBmcm9nZ2VyIGlzIG9uIGxhc3RsaW5lIGFyZWFcbiAgICAgICAgICAgICAgICBjb25zdCB3aW5uaW5nU3BvdCA9IGZpbmRDb2xsaXNpb24odGhpcywgd2lubmluZ1Nwb3RzKTtcbiAgICAgICAgICAgICAgICBpZiAod2lubmluZ1Nwb3QgJiYgIXdpbm5pbmdTcG90LnRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IHdpbm5pbmdTcG90LnBvc1ggKyAxMS4xMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWSA8PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5uaW5nU3BvdC50YWtlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hlY2tMZXZlbENvbXBsZXRlID0gd2lubmluZ1Nwb3RzLmZpbHRlcihzcG90ID0+ICFzcG90LnRha2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja0xldmVsQ29tcGxldGUubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2xldmVsQ29tcGxldGUnLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRGcm9nZ2VyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdpbm5pbmdTcG90LnRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrZXJzQ29sbGlzaW9ucy5wdXNoKHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrZXJzQ29sbGlzaW9ucy5wdXNoKGZpbmRDb2xsaXNpb24odGhpcywgZ3Jhc3MpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGVja0lmT3V0T2ZNYXBBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGxlYXZpbmcgYm9hcmQgaWYgZnJvZ2dlciBpcyBpbiB0aGUgZWRnZSBvZiBib2FyZFxuICAgICAgICAgICAgICAgIGJsb2NrZXJzQ29sbGlzaW9ucy5wdXNoKGNoZWNrT3V0T2ZNYXAodGhpcywgYm9hcmQpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja2Vyc0NvbGxpc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tlcnNDb2xsaXNpb25zW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJ0RnJvZ2dlclBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY2hlY2tJZkNhckFyZWEodGhpcykpIHsgLy8gY2hlY2sgY29sbGlzaW9uIHdpdGggY2FycyBvbmx5IGlmIGZyb2dnZXIgaXMgaW4gJ3JvYWQnIGFyZWFcbiAgICAgICAgICAgIGlmIChmaW5kQ29sbGlzaW9uKHRoaXMsIGNhcnMpKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5yZXNldEZyb2dnZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGVja0lmVHVydGxlQXJlYSh0aGlzKSkgeyAvLyBjaGVjayBjb2xsaXNpb24gd2l0aCB0dXJ0bGVzIG9ubHkgaWYgZnJvZ2dlciBpcyBpbiAndHVydGxlJyBhcmVhXG4gICAgICAgICAgICBjb25zdCBzYWlsaW5nVHVydGxlID0gZmluZFR1cnRsZUNvbGxpc2lvbih0aGlzLCB0dXJ0bGVzKTtcbiAgICAgICAgICAgIGlmIChzYWlsaW5nVHVydGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmdPYmogPSBzYWlsaW5nVHVydGxlO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgU2FpbFNlcnZpY2Uuc2FpbCh0aGlzLCBzYWlsaW5nVHVydGxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrSWZXb29kQXJlYSh0aGlzKSkgeyAvLyBjaGVjayBjb2xsaXNpb24gd2l0aCB0dXJ0bGVzIG9ubHkgaWYgZnJvZ2dlciBpcyBpbiAnd29vZHMnIGFyZWFcbiAgICAgICAgICAgIGNvbnN0IHNhaWxpbmdXb29kID0gZmluZENvbGxpc2lvbih0aGlzLCB3b29kcyk7XG4gICAgICAgICAgICBpZiAoc2FpbGluZ1dvb2QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZ09iaiA9IHNhaWxpbmdXb29kO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgU2FpbFNlcnZpY2Uuc2FpbCh0aGlzLCBzYWlsaW5nV29vZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGVja0lmV2F0ZXJBcmVhKHRoaXMpICYmICEoZmluZFR1cnRsZUNvbGxpc2lvbih0aGlzLCB0dXJ0bGVzKSB8fCBmaW5kQ29sbGlzaW9uKHRoaXMsIHdvb2RzKSkpIHsgLy8gY2hlY2sgaWYgZnJvZ2dlciBpcyBpbiB3YXRlclxuICAgICAgICAgICAgLy8gdGhpcy5yZXNldEZyb2dnZXIoKTtcbiAgICAgICAgICAgIC8vIHRoaXMua2lsbEZyb2dnZXIoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIG1vdmUoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNoZWNrSWZPdXRPZldhdGVyQXJlYVxuICAgICAgICB9ID0gQ2hlY2tBcmVhO1xuICAgICAgICBpZiAodGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgICAgIGxldCBzYWlsU3BlZWQgPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2FpbGluZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNhaWxpbmdPYmouZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2FpbFNwZWVkID0gdGhpcy5zYWlsaW5nT2JqLnNwZWVkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zYWlsaW5nT2JqLmRpcmVjdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgICAgICBzYWlsU3BlZWQgPSAtdGhpcy5zYWlsaW5nT2JqLnNwZWVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYIC09IHRoaXMuc3BlZWQgKyBzYWlsU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NZIC09IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYICs9IHRoaXMuc3BlZWQgLSBzYWlsU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1kgKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCsrO1xuICAgICAgICAgICAgaWYgKHRoaXMubW92aW5nQ291bnQgPj0gNTAgLyB0aGlzLnNwZWVkKSB7IC8vIGVuZCBvZiBtb3ZlbWVudFxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID09ICd1cCcgPyB0aGlzLmVtaXR0ZXIuZW1pdCgndXBkYXRlU2NvcmUnLCBudWxsKSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrSWZPdXRPZldhdGVyQXJlYSh0aGlzKSkgeyAvL2NoZWNrIGlmIGZyb2dnZXIgbW92ZXMgb3V0IG9mIHdhdGVyKG1vdmVzIGRvd24gdHVydGxlKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSA1MCAqIE1hdGgucm91bmQodGhpcy5wb3NYIC8gNTApOyAvLyBmaXggZnJvZ2dlciBwb3NpdGlvbiB3aGVuIGxlYXZpbmcgdHVydGxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgd2FpdEZvckVuZE1vdmluZyhmcm9nZ2VyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmICghZnJvZ2dlci5tb3ZpbmcpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBraWxsRnJvZ2dlcigpe1xuICAgICAgdGhpcy5saXZlcy0tO1xuICAgICAgdGhpcy5saXZlcyA8IDAgPyB0aGlzLmVtaXR0ZXIuZW1pdCgnZ2FtZU92ZXInLCBudWxsKSA6IGZhbHNlO1xuICAgIH1cblxuICAgIHJlc2V0RnJvZ2dlcigpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gMzUwO1xuICAgICAgICB0aGlzLnBvc1kgPSA2MDA7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuc2FpbGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNhaWxpbmdPYmogPSBudWxsO1xuICAgIH07XG5cbn1cbiIsImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkL0JvYXJkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQuc2V0Qm9hcmQoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsKCkgPT4gdGhpcy5ib2FyZC5mcm9nZ2VyLnRyaWdnZXJNb3ZlKGV2ZW50KSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmZvQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGRyYXdJbmZvQmFyKGN0eCwgZ2FtZUxldmVsLCBmcm9nZ2VyTGl2ZXMsIGdhbWVTY29yZSwgbGV2ZWxUaW1lb3V0KSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGRyYXdSZWN0LFxuICAgICAgICAgICAgZHJhd1RleHRcbiAgICAgICAgfSA9IERyYXdGdW5jdGlvbnM7XG4gICAgICAgIGRyYXdSZWN0KGN0eCwgMCwgNjUwLCA3MDAsIDUwLCAnI2U2ZTZmYScpO1xuICAgICAgICBkcmF3UmVjdChjdHgsIDAsIDY1MCwgNzAwLCAyLCAnYmxhY2snKTtcbiAgICAgICAgZHJhd1RleHQoY3R4LCAnQXJpYWwnLCAyNSwgJ2JsYWNrJywgJ0xldmVsOiAnICsgZ2FtZUxldmVsLCAxMCwgNjg1KTtcbiAgICAgICAgZHJhd1RleHQoY3R4LCAnQXJpYWwnLCAyNSwgJ2JsYWNrJywgJ0xpdmVzOiAnICsgZnJvZ2dlckxpdmVzLCA2MDAsIDY4NSk7XG4gICAgICAgIGRyYXdUZXh0KGN0eCwgJ0FyaWFsJywgMjUsICdibGFjaycsICdTY29yZTogJyArIGdhbWVTY29yZSwgMTMwLCA2ODUpO1xuICAgICAgICBkcmF3VGV4dChjdHgsICdBcmlhbCcsIDI1LCAnYmxhY2snLCAnVGltZScsIDMyMCwgNjg1KTtcbiAgICAgICAgZHJhd1JlY3QoY3R4LCAzODUsIDY2MCwgKDIwMCpsZXZlbFRpbWVvdXQpLzEwMCwgMzAsICdvcmFuZ2UnKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXNze1xuICBjb25zdHJ1Y3Rvcihwb3NYLCB3aWR0aCl7XG4gICAgdGhpcy5wb3NYID0gcG9zWDs7XG4gICAgdGhpcy5wb3NZID0gMDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgfTtcblxuICBkcmF3R3Jhc3MoY3R4KXtcbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnIzdlYWVhOCcpO1xuICB9O1xufTtcbiIsImltcG9ydCBHcmFzcyBmcm9tICcuL0dyYXNzLmpzJztcblxuY29uc3QgR3Jhc3NTZXJ2aWNlID0ge1xuICBjcmVhdGVHcmFzczogKCkgPT57XG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLmNyZWF0ZVNtYWxsR3Jhc3MoKSxcbiAgICAgIC4uLmNyZWF0ZUJpZ0dyYXNzKClcbiAgICBdO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVTbWFsbEdyYXNzKCl7XG4gIGxldCBncmFzc0xlZnQgPSBuZXcgR3Jhc3MoMCwgMjUpO1xuICBsZXQgZ3Jhc3NSaWdodCA9IG5ldyBHcmFzcyg2NzUsIDI1KTtcbiAgcmV0dXJuIFtncmFzc0xlZnQsIGdyYXNzUmlnaHRdO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQmlnR3Jhc3MoKXtcbiAgbGV0IGdyYXNzQXJyID0gW107XG4gIGZvciAobGV0IGkgPSAwLCBwb3NYID0gOTcuMjI7IGkgPCA0OyBpKyspe1xuICAgIGxldCBncmFzcyA9IG5ldyBHcmFzcyhwb3NYLCA3Mi4yMik7XG4gICAgcG9zWCArPSAxNDQuNDQ7XG4gICAgZ3Jhc3NBcnIucHVzaChncmFzcyk7XG4gIH1cbiAgcmV0dXJuIGdyYXNzQXJyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR3Jhc3NTZXJ2aWNlO1xuIiwiaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5uaW5nU3BvdHtcbiAgY29uc3RydWN0b3IocG9zWCl7XG4gICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICB0aGlzLnBvc1kgPSAwO1xuICAgIHRoaXMud2lkdGggPSA3Mi4yMjtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgIHRoaXMudGFrZW4gPSBmYWxzZTtcbiAgfTtcblxuICBkcmF3U3BvdChjdHgpe1xuICAgIGxldCBjb2xvciA9ICcjOWRkZmUxJztcbiAgICBpZih0aGlzLnRha2VuKXtcbiAgICAgIGNvbG9yID0gJ2dyZWVuJztcbiAgICB9XG4gICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgY29sb3IpO1xuICB9O1xufTtcbiIsImltcG9ydCBXaW5uaW5nU3BvdCBmcm9tICcuL1dpbm5pbmdTcG90LmpzJztcblxuY29uc3QgV2lubmluZ1Nwb3RTZXJ2aWNlID0ge1xuICBjcmVhdGVXaW5uaW5nU3BvdHM6ICgpID0+e1xuICAgIGxldCBzcG90c0FyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBwb3NYID0gMjU7IGkgPCA1OyBpKyspe1xuICAgICAgbGV0IHNwb3QgPSBuZXcgV2lubmluZ1Nwb3QocG9zWCk7XG4gICAgICBwb3NYICs9IDE0NC40NDtcbiAgICAgIHNwb3RzQXJyLnB1c2goc3BvdCk7XG4gICAgfVxuICAgIHJldHVybiBzcG90c0FycjtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgV2lubmluZ1Nwb3RTZXJ2aWNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIHNwZWVkKSB7XG4gICAgICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgICAgIHRoaXMucG9zWSA9IHBvc1k7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgfVxuXG4gICAgbW92ZShvYmplY3RzKSB7XG4gICAgICAgIGxldCBtYXg7XG4gICAgICAgIGxldCBtaW47XG4gICAgICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc1ggPCAtMTUwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heCA9IDE4O1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSAxNDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZE9ianMgPSBmaWx0ZXJPYmpzKHRoaXMsIG9iamVjdHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE9ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5jaGVja0NvbGxpc2lvbihvYmopICYmIGF0dGVtcHRzIDwgMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPj0xNSA/IHRoaXMucG9zWCA9IDE0MDAgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWCAtPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc1ggPiA3NTApIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gLTU7XG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IC0xMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZE9ianMgPSBmaWx0ZXJPYmpzKHRoaXMsIG9iamVjdHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE9ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5jaGVja0NvbGxpc2lvbihvYmopICYmIGF0dGVtcHRzIDwgMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPj0xNSA/IHRoaXMucG9zWCA9IC0xMDAwIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1ggKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNoZWNrQ29sbGlzaW9uKG9iaikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIE1hdGguYWJzKG9iai5wb3NYIC0gdGhpcy5wb3NYKSA8IHRoaXMud2lkdGggKyA1MCA/IHJlc3VsdCA9IHRydWUgOiByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG59O1xuXG5mdW5jdGlvbiBmaWx0ZXJPYmpzKGNoZWNrZWRPYmosIG9ianMpIHtcbiAgICBsZXQgZmlsdGVyZWRPYmpzID0gb2Jqcy5maWx0ZXIob2JqID0+IG9iai5saW5lID09PSBjaGVja2VkT2JqLmxpbmUpO1xuICAgIGxldCBpbmRleCA9IGZpbHRlcmVkT2Jqcy5pbmRleE9mKGNoZWNrZWRPYmopO1xuICAgIGZpbHRlcmVkT2Jqcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiBmaWx0ZXJlZE9ianM7XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuL1R1cnRsZVNlcnZpY2UuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuaW1wb3J0IEdlbmVyYXRvcnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0dlbmVyYXRvcnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdXJ0bGUgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIGRpdmluZywgbGV2ZWwpIHtcbiAgICAgICAgc3VwZXIocG9zWCk7XG4gICAgICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMud2lkdGggPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlV2lkdGgobGluZSk7XG4gICAgICAgIHRoaXMucG9zWSA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgICAgICB0aGlzLnNwZWVkID0gR2VuZXJhdG9ycy5nZW5lcmF0ZVNwZWVkKHRoaXMud2lkdGgsIGxldmVsKTtcbiAgICAgICAgdGhpcy5kaXZpbmcgPSBkaXZpbmc7XG4gICAgICAgIHRoaXMuZGl2ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgIHRoaXMuZGl2aW5nQ291bnRlciA9IDA7XG4gICAgfVxuXG4gICAgZHJhd1R1cnRsZShjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGl2aW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXZpbmdDb3VudGVyIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdicm93bicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpdmluZ0NvdW50ZXIgPiAyMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpdmluZ0NvdW50ZXIgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGl2aW5nQ291bnRlcisrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2Jyb3duJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgVHVydGxlIGZyb20gJy4vVHVydGxlLmpzJztcblxuY29uc3QgVHVydGxlU2VydmljZSA9IHtcblxuICAgIGNyZWF0ZVR1cnRsZXM6IChsZXZlbCkgPT4ge1xuICAgICAgICBsZXQgdHVydGxlcyA9IFtdO1xuICAgICAgICBsZXQgcGxhY2VkID0gMDtcbiAgICAgICAgbGV0IGxpbmUgPSAxO1xuICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICBsZXQgZGl2aW5nID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChwbGFjZWQgPD0gNykge1xuICAgICAgICAgICAgaWYgKHBsYWNlZCA9PSAyIHx8IHBsYWNlZCA9PSA2KSB7XG4gICAgICAgICAgICAgICAgZGl2aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGl2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIDE0IC0gMSkpICsgMSkgKiA1MDtcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGZpbHRlcmVkTGluZSA9IHR1cnRsZXMuZmlsdGVyKHR1cnRsZSA9PiB0dXJ0bGUubGluZSA9PT0gbGluZSk7XG4gICAgICAgICAgICBmaWx0ZXJlZExpbmUuZm9yRWFjaCgoY2hlY2tlZFR1cnRsZSkgPT4ge1xuICAgICAgICAgICAgICAgIE1hdGguYWJzKGNoZWNrZWRUdXJ0bGUucG9zWCAtIHBvc1gpIDwgY2hlY2tlZFR1cnRsZS53aWR0aCArIDUwID8gYXZhaWxhYmxlID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgIGxldCB0dXJ0bGUgPSBuZXcgVHVydGxlKHBvc1gsIGxpbmUsIGRpdmluZywgbGV2ZWwpO1xuICAgICAgICAgICAgICAgIHR1cnRsZXMucHVzaCh0dXJ0bGUpO1xuICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGF0dGVtcHRzID4gMTUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHVydGxlID0gbmV3IFR1cnRsZSgtNTAwLCBsaW5lLCBkaXZpbmcsIGxldmVsKTtcbiAgICAgICAgICAgICAgICB0dXJ0bGVzLnB1c2godHVydGxlKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBsYWNlZCA9PSA0KSB7XG4gICAgICAgICAgICAgICAgbGluZSA9IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR1cnRsZXM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjUwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHVydGxlU2VydmljZTtcbiIsImltcG9ydCBXYXRlclNlcnZpY2UgZnJvbSAnLi9XYXRlclNlcnZpY2UuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRlcntcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLnBvc1ggPSAwO1xuICAgIHRoaXMucG9zWSA9IDUwO1xuICAgIHRoaXMuaGVpZ2h0ID0gMjUwO1xuICAgIHRoaXMud2lkdGggPSA3MDA7XG4gIH1cblxuICBkcmF3V2F0ZXIoY3R4KXtcbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnYmx1ZScpO1xuICB9XG5cbn1cbiIsImltcG9ydCBXYXRlciBmcm9tICcuL1dhdGVyLmpzJztcblxuY29uc3QgV2F0ZXJTZXJ2aWNlID0ge1xuICBjcmVhdGVXYXRlcjogKCkgPT4ge1xuICAgICAgbGV0IHdhdGVyT2JqcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSA3MDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgd2F0ZXIgPSBuZXcgV2F0ZXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICBwb3NYID0gcG9zWCArIDFcbiAgICAgICAgICAgIHdhdGVyT2Jqcy5wdXNoKHdhdGVyKTtcbiAgICAgICAgICBpZiAoaSAlIDE0ID09IDApIHtcbiAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgICBwb3NYID0gMDtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2F0ZXJPYmpzO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXYXRlclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi9Xb29kU2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgR2VuZXJhdG9ycyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvR2VuZXJhdG9ycy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvb2QgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIGxldmVsKSB7XG4gICAgICAgIHN1cGVyKHBvc1gpO1xuICAgICAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKVxuICAgICAgICB0aGlzLnBvc1kgPSBXb29kU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBHZW5lcmF0b3JzLmdlbmVyYXRlU3BlZWQodGhpcy53aWR0aCwgbGV2ZWwpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgfVxuXG4gICAgZHJhd1dvb2QoY3R4KSB7XG4gICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdiZWlnZScpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IFdvb2QgZnJvbSAnLi9Xb29kLmpzJztcblxuY29uc3QgV29vZFNlcnZpY2UgPSB7XG4gICAgICAgIGNyZWF0ZVdvb2Q6IChsZXZlbCkgPT4ge1xuICAgICAgICAgICAgbGV0IHdvb2RzID0gW107XG4gICAgICAgICAgICBsZXQgcGxhY2VkID0gMDtcbiAgICAgICAgICAgIGxldCBsaW5lID0gMTtcbiAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICB3aGlsZSAocGxhY2VkIDw9IDcpIHtcbiAgICAgICAgICAgICAgICBsZXQgcG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIDE0IC0gMSkpICsgMSkgKiA1MDtcbiAgICAgICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gd29vZHMuZmlsdGVyKHdvb2QgPT4gd29vZC5saW5lID09PSBsaW5lKTtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZExpbmUuZm9yRWFjaCgoY2hlY2tlZFdvb2QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoY2hlY2tlZFdvb2QucG9zWCAtIHBvc1gpIDwgY2hlY2tlZFdvb2Qud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgd29vZCA9IG5ldyBXb29kKHBvc1gsIGxpbmUsIGxldmVsKTtcbiAgICAgICAgICAgICAgICAgICAgd29vZHMucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QoLTUwMCwgbGluZSwgbGV2ZWwpO1xuICAgICAgICAgICAgICAgICAgICB3b29kcy5wdXNoKHdvb2QpO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocGxhY2VkID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwbGFjZWQgPT0gNSkge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gMztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdvb2RzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAyNTA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjAwO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMDA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBXb29kU2VydmljZTtcbiIsImNvbnN0IENoZWNrQXJlYSA9IHtcbiAgICBjaGVja0lmT3V0T2ZNYXBBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgaWYgKGZyb2dnZXIucG9zWCA8PSAwIHx8IGZyb2dnZXIucG9zWCA+PSA2NTAgfHwgZnJvZ2dlci5wb3NZIDw9IDAgfHwgZnJvZ2dlci5wb3NZID49IDYwMCkge1xuICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmQ2FyQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAoZnJvZ2dlci5wb3NZID49IDM1MCAmJiBmcm9nZ2VyLnBvc1kgPD0gNTUwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZMYXN0TGluZUFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGZyb2dnZXIucG9zWSA8PSA1MCAmJiBmcm9nZ2VyLnBvc1kgPj0gMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmVHVydGxlQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8PSAzMDAgJiYgZnJvZ2dlci5wb3NZID49IDE1MCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmV29vZEFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZihmcm9nZ2VyLnBvc1kgPD0gMjUwICYmIGZyb2dnZXIucG9zWSA+PSA1MCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmV2F0ZXJBcmVhOiAoZnJvZ2dlcikgPT57XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZihmcm9nZ2VyLnBvc1kgPCAzMDAgJiYgZnJvZ2dlci5wb3NZID4gNTApe1xuICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZk91dE9mV2F0ZXJBcmVhOiAoZnJvZ2dlcikgPT57XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZihmcm9nZ2VyLnBvc1kgPD0gMzUwICYmIGZyb2dnZXIucG9zWSA+PSAzMDApe1xuICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrQXJlYTtcbiIsImNvbnN0IENvbGxpc2lvbkRldGVjdGlvbiA9IHtcbiAgICBjaGVja0NvbGxpc2lvbjogKGZyb2dnZXIsIG9iaikgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgY29uc3Qgb2JqTGVmdFNpZGUgPSBvYmoucG9zWDsgLy8gMTUwXG4gICAgICAgIGNvbnN0IG9ialJpZ2h0U2lkZSA9IG9iai5wb3NYICsgb2JqLndpZHRoOyAvLyAyMDBcbiAgICAgICAgY29uc3Qgb2JqVG9wU2lkZSA9IG9iai5wb3NZOyAvLyAwXG4gICAgICAgIGNvbnN0IG9iakJvdHRvbVNpZGUgPSBvYmoucG9zWSArIG9iai5oZWlnaHQ7IC8vIDUwXG5cbiAgICAgICAgY29uc3QgZnJvZ2dlckxlZnRTaWRlID0gZnJvZ2dlci5wb3NYOyAvLyAxNTBcbiAgICAgICAgY29uc3QgZnJvZ2dlclJpZ2h0U2lkZSA9IGZyb2dnZXIucG9zWCArIGZyb2dnZXIud2lkdGg7IC8vIDIwMFxuICAgICAgICBjb25zdCBmcm9nZ2VyVG9wU2lkZSA9IGZyb2dnZXIucG9zWTsgLy8gNDVcbiAgICAgICAgY29uc3QgZnJvZ2dlckJvdHRvbVNpZGUgPSBmcm9nZ2VyLnBvc1kgKyBmcm9nZ2VyLmhlaWdodDsgLy8gOTVcblxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICggKGZyb2dnZXJSaWdodFNpZGUgPiBvYmpMZWZ0U2lkZSAmJiBmcm9nZ2VyUmlnaHRTaWRlIDw9IG9ialJpZ2h0U2lkZSkgfHxcbiAgICAgICAgICAgICAgKGZyb2dnZXJMZWZ0U2lkZSA8IG9ialJpZ2h0U2lkZSAmJiBmcm9nZ2VyTGVmdFNpZGUgPj0gb2JqTGVmdFNpZGUpKSAmJlxuICAgICAgICAgICAgICAoZnJvZ2dlclRvcFNpZGUgPCBvYmpCb3R0b21TaWRlICYmIGZyb2dnZXJCb3R0b21TaWRlID4gb2JqVG9wU2lkZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBmaW5kQ29sbGlzaW9uOiAoZnJvZ2dlciwgb2JqZWN0c0FycikgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0c0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKENvbGxpc2lvbkRldGVjdGlvbi5jaGVja0NvbGxpc2lvbihmcm9nZ2VyLCBvYmplY3RzQXJyW2ldKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9iamVjdHNBcnJbaV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGZpbmRUdXJ0bGVDb2xsaXNpb246IChmcm9nZ2VyLCB0dXJ0bGVzQXJyKSA9PnsgLy8gd2UgbmVlZCB0aGlzIHRvIGZpbHRlciBkaXZpbmcgdHVydGxlc1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgbGV0IG5vdERpdmluZ1R1cnRsZXMgPSB0dXJ0bGVzQXJyLmZpbHRlcih0dXJ0bGUgPT4gIXR1cnRsZS5kaXZlZCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vdERpdmluZ1R1cnRsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoQ29sbGlzaW9uRGV0ZWN0aW9uLmNoZWNrQ29sbGlzaW9uKGZyb2dnZXIsIG5vdERpdmluZ1R1cnRsZXNbaV0pKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IG5vdERpdmluZ1R1cnRsZXNbaV07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja091dE9mTWFwOiAoZnJvZ2dlciwgYm9hcmQpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAoZnJvZ2dlci5wb3NYID4gYm9hcmQud2lkdGggLSA1MCB8fCBmcm9nZ2VyLnBvc1ggPCAwIHx8XG4gICAgICAgICAgICBmcm9nZ2VyLnBvc1kgPiBib2FyZC5oZWlnaHQgLSAxMDAgfHwgZnJvZ2dlci5wb3NZIDwgMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sbGlzaW9uRGV0ZWN0aW9uO1xuIiwiY29uc3QgRHJhd0Z1bmN0aW9ucyA9IHtcbiAgZHJhd1JlY3Q6IChjdHgsIHBvc1gsIHBvc1ksIHdpZHRoLCBoZWlnaHQsIGNvbG9yKSA9PntcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgucmVjdChwb3NYLCBwb3NZLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gIH0sXG5cbiAgY29sb3JUZXh0OiAoY3R4LCBzaG93V29yZHMsIHRleHRYLCB0ZXh0WSwgY29sb3IpID0+IHtcbiAgICBjdHguZm9udCA9IFwiMTBweCBBcmlhbFwiO1xuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICBjdHguZmlsbFRleHQoc2hvd1dvcmRzLCB0ZXh0WCwgdGV4dFkpO1xuICB9LFxuXG4gIGRyYXdUZXh0OiAoY3R4LCBmb250RmFtaWx5LCBmb250U2l6ZSwgY29sb3IsIHRleHQsIHBvc1gsIHBvc1kpID0+e1xuICAgIGN0eC5mb250ID0gZm9udFNpemUgKyBcInB4IFwiICsgZm9udEZhbWlseTtcbiAgICBjdHguZmlsbFRleHQodGV4dCwgcG9zWCwgcG9zWSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhd0Z1bmN0aW9ucztcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgfTtcblxuICAgIHN1YnNjcmliZShldmVudE5hbWUsIGZuKSB7XG4gICAgICAhdGhpcy5ldmVudHNbZXZlbnROYW1lXSA/IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXSA6IGZhbHNlO1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcblxuICAgICAgcmV0dXJuICgpID0+e1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoZXZlbnRGbiA9PiBmbiAhPT0gZXZlbnRGbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGVtaXQoZXZlbnROYW1lLCBkYXRhKXtcbiAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXTtcbiAgICAgIGlmKGV2ZW50KXtcbiAgICAgICAgZXZlbnQuZm9yRWFjaChmbiA9PntcbiAgICAgICAgICBmbi5jYWxsKG51bGwsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xufVxuIiwiY29uc3QgR2VuZXJhdG9ycyA9IHtcbiAgICBnZW5lcmF0ZVNwZWVkOiAod2lkdGgsIGxldmVsKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQod2lkdGggKiAxLzEwMCkgKyBNYXRoLnNxcnQoTWF0aC5wb3cobGV2ZWwsIDMpL3dpZHRoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdlbmVyYXRvcnM7XG4iLCJjb25zdCBTYWlsU2VydmljZSA9IHtcbiAgICBzYWlsOiAoZnJvZ2dlciwgb2JqKSA9PiB7XG4gICAgICAgIGlmICg1MCAqIE1hdGgucm91bmQoKGZyb2dnZXIucG9zWCAtIG9iai5wb3NYKSAvIDUwKSA9PSBvYmoud2lkdGgpIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYICsgb2JqLndpZHRoIC0gZnJvZ2dlci53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmICg1MCAqIE1hdGgucm91bmQoKGZyb2dnZXIucG9zWCAtIG9iai5wb3NYKSAvIDUwKSA+IDApIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYICsgKDUwICogTWF0aC5yb3VuZCgoZnJvZ2dlci5wb3NYIC0gb2JqLnBvc1gpIC8gNTApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTYWlsU2VydmljZTtcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vQ29tcG9uZW50cy9HYW1lLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+e1xuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG59KTtcbiJdfQ==
