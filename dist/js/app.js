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

var _EndScreen = require('../EndScreen/EndScreen.js');

var _EndScreen2 = _interopRequireDefault(_EndScreen);

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
    this.endScreen = new _EndScreen2.default();
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
      } else {
        this.endScreen.drawEndScreen(this.context);
      }
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
      unsubscribeAll(this.emitter);
      this.game = false;
    }
  }]);

  return Board;
}();

exports.default = Board;


function unsubscribeAll(emitter) {
  var unsubscribeAll = [emitter.subscribe('levelComplete', null), emitter.subscribe('updateScore', null), emitter.subscribe('gameOver', null)];
  unsubscribeAll.forEach(function (unsubscribe) {
    return unsubscribe();
  });
}

},{"../../Utilities/DrawFunctions.js":21,"../../Utilities/EventEmitter.js":22,"../Cars/CarService.js":3,"../EndScreen/EndScreen.js":4,"../Frogger.js":5,"../InfoBar/InfoBar.js":7,"../LastLineObjs/GrassService.js":9,"../LastLineObjs/WinningSpotService.js":11,"../Turtles/TurtleService.js":14,"../Water/Water.js":15,"../Wood/WoodService.js":18}],2:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":21,"../../Utilities/Generators.js":23,"../MovingObject.js":12,"./CarService":3}],3:[function(require,module,exports){
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

var _DrawFunctions = require('../../Utilities/DrawFunctions.js');

var _DrawFunctions2 = _interopRequireDefault(_DrawFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EndScreen = function () {
    function EndScreen() {
        _classCallCheck(this, EndScreen);
    }

    _createClass(EndScreen, [{
        key: 'drawEndScreen',
        value: function drawEndScreen(ctx) {
            var drawRect = _DrawFunctions2.default.drawRect,
                drawText = _DrawFunctions2.default.drawText;

            drawRect(ctx, 0, 0, 700, 700, 'black');
            drawText(ctx, 'Arial', 100, 'white', 'Game Over', 100, 350);
        }
    }]);

    return EndScreen;
}();

exports.default = EndScreen;

},{"../../Utilities/DrawFunctions.js":21}],5:[function(require,module,exports){
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

            if (checkIfWaterArea(this) && !(findTurtleCollision(this, turtles) || findCollision(this, woods))) {
                // check if frogger is in water
                this.resetFrogger();
                this.killFrogger();
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

},{"../Utilities/CheckArea.js":19,"../Utilities/CollisionDetection.js":20,"../Utilities/DrawFunctions.js":21,"../Utilities/EventEmitter.js":22,"../Utilities/SailService.js":24,"./MovingObject.js":12}],6:[function(require,module,exports){
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

},{"./Board/Board.js":1}],7:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":21}],8:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":21}],9:[function(require,module,exports){
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

},{"./Grass.js":8}],10:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":21}],11:[function(require,module,exports){
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

},{"./WinningSpot.js":10}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":21,"../../Utilities/Generators.js":23,"../MovingObject.js":12,"./TurtleService.js":14}],14:[function(require,module,exports){
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

},{"./Turtle.js":13}],15:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":21,"./WaterService.js":16}],16:[function(require,module,exports){
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

},{"./Water.js":15}],17:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":21,"../../Utilities/Generators.js":23,"../MovingObject.js":12,"./WoodService.js":18}],18:[function(require,module,exports){
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

},{"./Wood.js":17}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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
    ctx.fillStyle = color;
    ctx.fillText(text, posX, posY);
  }
};

exports.default = DrawFunctions;

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
'use strict';

var _Game = require('./Components/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./Components/Game.js":6}]},{},[25])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRW5kU2NyZWVuL0VuZFNjcmVlbi5qcyIsInNyYy9qcy9Db21wb25lbnRzL0Zyb2dnZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9HYW1lLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvSW5mb0Jhci9JbmZvQmFyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL0dyYXNzLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL0dyYXNzU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0xhc3RMaW5lT2Jqcy9XaW5uaW5nU3BvdC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0xhc3RMaW5lT2Jqcy9XaW5uaW5nU3BvdFNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Nb3ZpbmdPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9UdXJ0bGVzL1R1cnRsZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1dhdGVyL1dhdGVyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kU2VydmljZS5qcyIsInNyYy9qcy9VdGlsaXRpZXMvQ2hlY2tBcmVhLmpzIiwic3JjL2pzL1V0aWxpdGllcy9Db2xsaXNpb25EZXRlY3Rpb24uanMiLCJzcmMvanMvVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMiLCJzcmMvanMvVXRpbGl0aWVzL0V2ZW50RW1pdHRlci5qcyIsInNyYy9qcy9VdGlsaXRpZXMvR2VuZXJhdG9ycy5qcyIsInNyYy9qcy9VdGlsaXRpZXMvU2FpbFNlcnZpY2UuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQixLO0FBQ2pCLG1CQUFjO0FBQUE7O0FBQUE7O0FBQ1YsU0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUssT0FBTCxHQUFlLDRCQUFmO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsU0FBSyxZQUFMLEdBQW9CLEdBQXBCO0FBQ0EsU0FBSyxLQUFMLEdBQWEsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQWI7QUFDQSxTQUFLLE9BQUwsR0FBZSxLQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLElBQXRCLENBQWY7QUFDQSxTQUFLLE9BQUwsR0FBZSx1QkFBZjtBQUNBLFNBQUssU0FBTCxHQUFpQix5QkFBakI7QUFDQSxTQUFLLEtBQUwsR0FBYSxxQkFBYjtBQUNBLFNBQUssS0FBTCxHQUFhLHVCQUFhLFdBQWIsRUFBYjtBQUNBLFNBQUssT0FBTCxHQUFlLHNCQUFZLEtBQUssT0FBakIsQ0FBZjtBQUNBLFNBQUssWUFBTCxHQUFvQixFQUFwQjtBQUNBLFNBQUssSUFBTCxHQUFZLEVBQVo7QUFDQSxTQUFLLE9BQUwsR0FBZSxFQUFmO0FBQ0EsU0FBSyxLQUFMLEdBQWEsRUFBYjs7QUFFQSxTQUFLLElBQUwsR0FBWSxZQUFNO0FBQ2QsWUFBSyxVQUFMO0FBQ0Esa0JBQVksWUFBSztBQUNmLGNBQUssWUFBTDtBQUNBLGNBQUssWUFBTDtBQUNELE9BSEQsRUFHRyxJQUhIO0FBSUEsWUFBSyxPQUFMLENBQWEsU0FBYixDQUF1QixlQUF2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SGMsQ0FBbkI7O2tCQU1lLFU7Ozs7Ozs7O0FDTmYsSUFBTSxjQUFjO0FBQ2hCLFVBQU0sY0FBQyxPQUFELEVBQVUsR0FBVixFQUFrQjtBQUNwQixZQUFJLEtBQUssS0FBSyxLQUFMLENBQVcsQ0FBQyxRQUFRLElBQVIsR0FBZSxJQUFJLElBQXBCLElBQTRCLEVBQXZDLENBQUwsSUFBbUQsSUFBSSxLQUEzRCxFQUFrRTtBQUM5RCxvQkFBUSxJQUFSLEdBQWUsSUFBSSxJQUFKLEdBQVcsSUFBSSxLQUFmLEdBQXVCLFFBQVEsS0FBOUM7QUFDSCxTQUZELE1BRU8sSUFBSSxLQUFLLEtBQUssS0FBTCxDQUFXLENBQUMsUUFBUSxJQUFSLEdBQWUsSUFBSSxJQUFwQixJQUE0QixFQUF2QyxDQUFMLEdBQWtELENBQXRELEVBQXlEO0FBQzVELG9CQUFRLElBQVIsR0FBZSxJQUFJLElBQUosR0FBWSxLQUFLLEtBQUssS0FBTCxDQUFXLENBQUMsUUFBUSxJQUFSLEdBQWUsSUFBSSxJQUFwQixJQUE0QixFQUF2QyxDQUFoQztBQUNILFNBRk0sTUFFQTtBQUNILG9CQUFRLElBQVIsR0FBZSxJQUFJLElBQW5CO0FBQ0g7QUFDSjtBQVRlLENBQXBCOztrQkFZZSxXOzs7OztBQ1pmOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFLO0FBQ2pELE1BQUksT0FBTyxvQkFBWDtBQUNBLE9BQUssU0FBTDtBQUNELENBSEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEZyb2dnZXIgZnJvbSAnLi4vRnJvZ2dlci5qcyc7XG5pbXBvcnQgV2F0ZXIgZnJvbSAnLi4vV2F0ZXIvV2F0ZXIuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi4vQ2Fycy9DYXJTZXJ2aWNlLmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4uL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi4vV29vZC9Xb29kU2VydmljZS5qcyc7XG5pbXBvcnQgR3Jhc3NTZXJ2aWNlIGZyb20gJy4uL0xhc3RMaW5lT2Jqcy9HcmFzc1NlcnZpY2UuanMnO1xuaW1wb3J0IFdpbm5pbmdTcG90U2VydmljZSBmcm9tICcuLi9MYXN0TGluZU9ianMvV2lubmluZ1Nwb3RTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0V2ZW50RW1pdHRlci5qcyc7XG5pbXBvcnQgSW5mb0JhciBmcm9tICcuLi9JbmZvQmFyL0luZm9CYXIuanMnO1xuaW1wb3J0IEVuZFNjcmVlbiBmcm9tICcuLi9FbmRTY3JlZW4vRW5kU2NyZWVuLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdhbWUgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuZ2FtZUxldmVsID0gMTtcbiAgICAgICAgdGhpcy5nYW1lU2NvcmUgPSAwO1xuICAgICAgICB0aGlzLmxldmVsVGltZW91dCA9IDEwMDtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5ib2FyZC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMuaW5mb0JhciA9IG5ldyBJbmZvQmFyKCk7XG4gICAgICAgIHRoaXMuZW5kU2NyZWVuID0gbmV3IEVuZFNjcmVlbigpO1xuICAgICAgICB0aGlzLndhdGVyID0gbmV3IFdhdGVyKCk7XG4gICAgICAgIHRoaXMuZ3Jhc3MgPSBHcmFzc1NlcnZpY2UuY3JlYXRlR3Jhc3MoKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyID0gbmV3IEZyb2dnZXIodGhpcy5lbWl0dGVyKTtcbiAgICAgICAgdGhpcy53aW5uaW5nU3BvdHMgPSBbXTtcbiAgICAgICAgdGhpcy5jYXJzID0gW107XG4gICAgICAgIHRoaXMudHVydGxlcyA9IFtdO1xuICAgICAgICB0aGlzLndvb2RzID0gW107XG5cbiAgICAgICAgdGhpcy5pbml0ID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNldEJvYXJkKCk7XG4gICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PntcbiAgICAgICAgICAgICAgdGhpcy5sZXZlbFRpbWVvdXQtLTtcbiAgICAgICAgICAgICAgdGhpcy5jaGVja1RpbWVPdXQoKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLnN1YnNjcmliZSgnbGV2ZWxDb21wbGV0ZScsIHRoaXMubGV2ZWxVcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5zdWJzY3JpYmUoJ3VwZGF0ZVNjb3JlJywgdGhpcy51cGRhdGVTY29yZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5zdWJzY3JpYmUoJ2dhbWVPdmVyJywgdGhpcy5nYW1lT3Zlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBzZXRCb2FyZCgpIHtcbiAgICAgIGlmKHRoaXMuZ2FtZSl7XG4gICAgICAgIHRoaXMuZHJhd0FsbCgpO1xuICAgICAgICB0aGlzLm1vdmVBbGwoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW5kU2NyZWVuLmRyYXdFbmRTY3JlZW4odGhpcy5jb250ZXh0KTtcbiAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc2V0Qm9hcmQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgZHJhd0FsbCgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmJvYXJkLndpZHRoLCB0aGlzLmJvYXJkLmhlaWdodCk7IC8vIGNsZWFyIGJvYXJkXG4gICAgICAgIHRoaXMuaW5mb0Jhci5kcmF3SW5mb0Jhcih0aGlzLmNvbnRleHQsIHRoaXMuZ2FtZUxldmVsLCB0aGlzLmZyb2dnZXIubGl2ZXMsIHRoaXMuZ2FtZVNjb3JlLCB0aGlzLmxldmVsVGltZW91dCk7XG4gICAgICAgIHRoaXMud2F0ZXIuZHJhd1dhdGVyKHRoaXMuY29udGV4dCk7IC8vIGRyYXcgV2F0ZXJcbiAgICAgICAgdGhpcy5ncmFzcy5mb3JFYWNoKGdyYXNzID0+IGdyYXNzLmRyYXdHcmFzcyh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBHcmFzc1xuICAgICAgICB0aGlzLndpbm5pbmdTcG90cy5mb3JFYWNoKHNwb3QgPT4gc3BvdC5kcmF3U3BvdCh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyB3aW5uaW5nU3BvdHNcbiAgICAgICAgdGhpcy5jYXJzLmZvckVhY2goY2FyID0+IGNhci5kcmF3Q2FyKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IENhcnNcbiAgICAgICAgdGhpcy50dXJ0bGVzLmZvckVhY2godHVydGxlID0+IHR1cnRsZS5kcmF3VHVydGxlKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IFR1cnRsZXNcbiAgICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5kcmF3V29vZCh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBXb29kc1xuICAgICAgICB0aGlzLmZyb2dnZXIuZHJhd0Zyb2dnZXIodGhpcy5jb250ZXh0KTsgLy8gZHJhdyBGcm9nZ2VyXG5cbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5jb2xvclRleHQodGhpcy5jb250ZXh0LCAncG9zWDogJyArIHRoaXMuZnJvZ2dlci5wb3NYICsgJywgcG9zWTogJyArIHRoaXMuZnJvZ2dlci5wb3NZLCB0aGlzLmZyb2dnZXIucG9zWCwgdGhpcy5mcm9nZ2VyLnBvc1ksICdibGFjaycpOyAvLyBjaGVhdCB0byBkaXNwbGF5IGZyb2dnZXIgcG9zaXRvblxuICAgIH1cblxuICAgIG1vdmVBbGwoKSB7XG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIubW92ZSh0aGlzLmNhcnMpKTsgLy8gbW92ZSBDYXJzXG4gICAgICAgIHRoaXMudHVydGxlcy5mb3JFYWNoKHR1cnRsZSA9PiB0dXJ0bGUubW92ZSh0aGlzLnR1cnRsZXMpKTsgLy8gbW92ZSBUdXJ0bGVzXG4gICAgICAgIHRoaXMud29vZHMuZm9yRWFjaCh3b29kID0+IHdvb2QubW92ZSh0aGlzLndvb2RzKSk7IC8vIG1vdmUgV29vZHNcbiAgICAgICAgdGhpcy5mcm9nZ2VyLm1vdmUoKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyLmhhbmRsZUNvbGxpc2lvbnModGhpcy5ib2FyZCwgdGhpcy5ncmFzcywgdGhpcy5jYXJzLCB0aGlzLnR1cnRsZXMsIHRoaXMud29vZHMsIHRoaXMud2lubmluZ1Nwb3RzLCB0aGlzLmNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlc2V0Qm9hcmQoKXtcbiAgICAgIHRoaXMuY2FycyA9IENhclNlcnZpY2UuY3JlYXRlQ2Fycyh0aGlzLmdhbWVMZXZlbCk7XG4gICAgICB0aGlzLnR1cnRsZXMgPSBUdXJ0bGVTZXJ2aWNlLmNyZWF0ZVR1cnRsZXModGhpcy5nYW1lTGV2ZWwpO1xuICAgICAgdGhpcy53b29kcyA9IFdvb2RTZXJ2aWNlLmNyZWF0ZVdvb2QodGhpcy5nYW1lTGV2ZWwpO1xuICAgICAgdGhpcy53aW5uaW5nU3BvdHMgPSBXaW5uaW5nU3BvdFNlcnZpY2UuY3JlYXRlV2lubmluZ1Nwb3RzKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2NvcmUoKXtcbiAgICAgIHRoaXMuZ2FtZVNjb3JlICs9IDUwO1xuICAgIH1cblxuICAgIGxldmVsVXAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZUxldmVsKys7XG4gICAgICAgIHRoaXMubGV2ZWxUaW1lb3V0ID0gMTAwO1xuICAgICAgICB0aGlzLmdhbWVTY29yZSArPSAxNTAwO1xuICAgICAgICB0aGlzLnJlc2V0Qm9hcmQoKTtcbiAgICB9XG5cbiAgICBjaGVja1RpbWVPdXQoKXtcbiAgICAgIGlmKHRoaXMubGV2ZWxUaW1lb3V0IDwgMCl7XG4gICAgICAgIHRoaXMubGV2ZWxUaW1lb3V0ID0gNTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyLmtpbGxGcm9nZ2VyKCk7XG4gICAgICAgIHRoaXMuZnJvZ2dlci5yZXNldEZyb2dnZXIoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnYW1lT3Zlcigpe1xuICAgICAgdW5zdWJzY3JpYmVBbGwodGhpcy5lbWl0dGVyKTtcbiAgICAgIHRoaXMuZ2FtZSA9IGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdW5zdWJzY3JpYmVBbGwoZW1pdHRlcil7XG4gIGxldCB1bnN1YnNjcmliZUFsbCA9IFtcbiAgICBlbWl0dGVyLnN1YnNjcmliZSgnbGV2ZWxDb21wbGV0ZScsIG51bGwpLFxuICAgIGVtaXR0ZXIuc3Vic2NyaWJlKCd1cGRhdGVTY29yZScsIG51bGwpLFxuICAgIGVtaXR0ZXIuc3Vic2NyaWJlKCdnYW1lT3ZlcicsIG51bGwpXG4gIF07XG4gIHVuc3Vic2NyaWJlQWxsLmZvckVhY2godW5zdWJzY3JpYmUgPT4gdW5zdWJzY3JpYmUoKSk7XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuL0NhclNlcnZpY2UnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuaW1wb3J0IEdlbmVyYXRvcnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0dlbmVyYXRvcnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuXG4gICAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgbGV2ZWwpIHtcbiAgICAgICAgc3VwZXIocG9zWCk7XG4gICAgICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgICAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gQ2FyU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IENhclNlcnZpY2UuZ2VuZXJhdGVEaXJlY3Rpb24obGluZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBHZW5lcmF0b3JzLmdlbmVyYXRlU3BlZWQodGhpcy53aWR0aCwgbGV2ZWwpO1xuICAgIH1cblxuICAgIGRyYXdDYXIoY3R4KSB7XG4gICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdyZWQnKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBDYXIgZnJvbSAnLi9DYXIuanMnO1xuXG5jb25zdCBDYXJTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlQ2FyczogKGxldmVsKSA9PiB7XG4gICAgICAgIGxldCBjYXJzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDFcbiAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgd2hpbGUgKHBsYWNlZCA8PSAxNSkge1xuICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSBjYXJzLmZpbHRlcihjYXIgPT4gY2FyLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRDYXIpID0+IHtcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkQ2FyLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRDYXIud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FyID0gbmV3IENhcihwb3NYLCBsaW5lLCBsZXZlbCk7XG4gICAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIoLTUwMCwgbGluZSwgbGV2ZWwpO1xuICAgICAgICAgICAgICAgIGNhcnMucHVzaChjYXIpO1xuICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGxhY2VkICUgMyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY2FycztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gNDUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiA0MDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDM1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVXaWR0aDogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlRGlyZWN0aW9uOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhclNlcnZpY2U7XG4iLCJpbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZFNjcmVlbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZHJhd0VuZFNjcmVlbihjdHgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZHJhd1JlY3QsXG4gICAgICAgICAgICBkcmF3VGV4dFxuICAgICAgICB9ID0gRHJhd0Z1bmN0aW9ucztcbiAgICAgICAgZHJhd1JlY3QoY3R4LCAwLCAwLCA3MDAsIDcwMCwgJ2JsYWNrJyk7XG4gICAgICAgIGRyYXdUZXh0KGN0eCwgJ0FyaWFsJywgMTAwLCAnd2hpdGUnLCAnR2FtZSBPdmVyJywgMTAwLCAzNTApO1xuICAgIH1cbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5pbXBvcnQgQ2hlY2tBcmVhIGZyb20gJy4uL1V0aWxpdGllcy9DaGVja0FyZWEuanMnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9VdGlsaXRpZXMvRXZlbnRFbWl0dGVyLmpzJztcbmltcG9ydCBDb2xsaXNpb25EZXRlY3Rpb24gZnJvbSAnLi4vVXRpbGl0aWVzL0NvbGxpc2lvbkRldGVjdGlvbi5qcyc7XG5pbXBvcnQgU2FpbFNlcnZpY2UgZnJvbSAnLi4vVXRpbGl0aWVzL1NhaWxTZXJ2aWNlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJvZ2dlciBleHRlbmRzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IoZW1pdHRlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gNTA7XG4gICAgICAgIHRoaXMucG9zWCA9IDM1MDtcbiAgICAgICAgdGhpcy5wb3NZID0gNjAwO1xuICAgICAgICB0aGlzLnByZXZQb3NYID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmV2UG9zWSA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldkRpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuc2FpbGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNhaWxpbmdPYmogPSBudWxsO1xuICAgICAgICB0aGlzLnNwZWVkID0gNTtcbiAgICAgICAgdGhpcy5saXZlcyA9IDM7XG4gICAgICAgIHRoaXMuZW1pdHRlciA9IGVtaXR0ZXI7XG4gICAgfTtcblxuICAgIGRyYXdGcm9nZ2VyKGN0eCkge1xuICAgICAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnZ3JlZW4nKTtcbiAgICB9O1xuXG4gICAgdHJpZ2dlck1vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vdmluZykge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVGcm9nZ2VyUHJldlBvcygpO1xuICAgICAgICAgICAgdGhpcy5zZXREaXJlY3Rpb24oZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5tb3ZpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHNldERpcmVjdGlvbihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnZG93bic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNhbGN1bGF0ZUZyb2dnZXJQcmV2UG9zKCkge1xuICAgICAgICB0aGlzLnByZXZEaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICAgICAgdGhpcy5wcmV2UG9zWCA9IHRoaXMucG9zWDtcbiAgICAgICAgdGhpcy5wcmV2UG9zWSA9IHRoaXMucG9zWTtcbiAgICB9O1xuXG4gICAgcmV2ZXJ0RnJvZ2dlclBvc2l0aW9uKCkge1xuICAgICAgICB0aGlzLnBvc1ggPSB0aGlzLnByZXZQb3NYO1xuICAgICAgICB0aGlzLnBvc1kgPSB0aGlzLnByZXZQb3NZO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMucHJldkRpcmVjdGlvbjtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgaGFuZGxlQ29sbGlzaW9ucyhib2FyZCwgZ3Jhc3MsIGNhcnMsIHR1cnRsZXMsIHdvb2RzLCB3aW5uaW5nU3BvdHMsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2hlY2tJZk91dE9mTWFwQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZMYXN0TGluZUFyZWEsXG4gICAgICAgICAgICBjaGVja0lmQ2FyQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZUdXJ0bGVBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZldvb2RBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZldhdGVyQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZPdXRPZldhdGVyQXJlYVxuICAgICAgICB9ID0gQ2hlY2tBcmVhO1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGZpbmRDb2xsaXNpb24sXG4gICAgICAgICAgICBjaGVja091dE9mTWFwLFxuICAgICAgICAgICAgZmluZFR1cnRsZUNvbGxpc2lvblxuICAgICAgICB9ID0gQ29sbGlzaW9uRGV0ZWN0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLm1vdmluZykge1xuXG4gICAgICAgICAgICBsZXQgYmxvY2tlcnNDb2xsaXNpb25zID0gW107XG5cbiAgICAgICAgICAgIGlmIChjaGVja0lmTGFzdExpbmVBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiBvbiBsYXN0bGluZSBvbmx5IGlmIGZyb2dnZXIgaXMgb24gbGFzdGxpbmUgYXJlYVxuICAgICAgICAgICAgICAgIGNvbnN0IHdpbm5pbmdTcG90ID0gZmluZENvbGxpc2lvbih0aGlzLCB3aW5uaW5nU3BvdHMpO1xuICAgICAgICAgICAgICAgIGlmICh3aW5uaW5nU3BvdCAmJiAhd2lubmluZ1Nwb3QudGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gd2lubmluZ1Nwb3QucG9zWCArIDExLjExO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3NZIDw9IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbm5pbmdTcG90LnRha2VuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGVja0xldmVsQ29tcGxldGUgPSB3aW5uaW5nU3BvdHMuZmlsdGVyKHNwb3QgPT4gIXNwb3QudGFrZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrTGV2ZWxDb21wbGV0ZS5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnbGV2ZWxDb21wbGV0ZScsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEZyb2dnZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2lubmluZ1Nwb3QudGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tlcnNDb2xsaXNpb25zLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tlcnNDb2xsaXNpb25zLnB1c2goZmluZENvbGxpc2lvbih0aGlzLCBncmFzcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoZWNrSWZPdXRPZk1hcEFyZWEodGhpcykpIHsgLy8gY2hlY2sgbGVhdmluZyBib2FyZCBpZiBmcm9nZ2VyIGlzIGluIHRoZSBlZGdlIG9mIGJvYXJkXG4gICAgICAgICAgICAgICAgYmxvY2tlcnNDb2xsaXNpb25zLnB1c2goY2hlY2tPdXRPZk1hcCh0aGlzLCBib2FyZCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsb2NrZXJzQ29sbGlzaW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChibG9ja2Vyc0NvbGxpc2lvbnNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXZlcnRGcm9nZ2VyUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjaGVja0lmQ2FyQXJlYSh0aGlzKSkgeyAvLyBjaGVjayBjb2xsaXNpb24gd2l0aCBjYXJzIG9ubHkgaWYgZnJvZ2dlciBpcyBpbiAncm9hZCcgYXJlYVxuICAgICAgICAgICAgaWYgKGZpbmRDb2xsaXNpb24odGhpcywgY2FycykpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJlc2V0RnJvZ2dlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrSWZUdXJ0bGVBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIHR1cnRsZXMgb25seSBpZiBmcm9nZ2VyIGlzIGluICd0dXJ0bGUnIGFyZWFcbiAgICAgICAgICAgIGNvbnN0IHNhaWxpbmdUdXJ0bGUgPSBmaW5kVHVydGxlQ29sbGlzaW9uKHRoaXMsIHR1cnRsZXMpO1xuICAgICAgICAgICAgaWYgKHNhaWxpbmdUdXJ0bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZ09iaiA9IHNhaWxpbmdUdXJ0bGU7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vdmluZykge1xuICAgICAgICAgICAgICAgICAgICBTYWlsU2VydmljZS5zYWlsKHRoaXMsIHNhaWxpbmdUdXJ0bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hlY2tJZldvb2RBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIHR1cnRsZXMgb25seSBpZiBmcm9nZ2VyIGlzIGluICd3b29kcycgYXJlYVxuICAgICAgICAgICAgY29uc3Qgc2FpbGluZ1dvb2QgPSBmaW5kQ29sbGlzaW9uKHRoaXMsIHdvb2RzKTtcbiAgICAgICAgICAgIGlmIChzYWlsaW5nV29vZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nT2JqID0gc2FpbGluZ1dvb2Q7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vdmluZykge1xuICAgICAgICAgICAgICAgICAgICBTYWlsU2VydmljZS5zYWlsKHRoaXMsIHNhaWxpbmdXb29kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrSWZXYXRlckFyZWEodGhpcykgJiYgIShmaW5kVHVydGxlQ29sbGlzaW9uKHRoaXMsIHR1cnRsZXMpIHx8IGZpbmRDb2xsaXNpb24odGhpcywgd29vZHMpKSkgeyAvLyBjaGVjayBpZiBmcm9nZ2VyIGlzIGluIHdhdGVyXG4gICAgICAgICAgICB0aGlzLnJlc2V0RnJvZ2dlcigpO1xuICAgICAgICAgICAgdGhpcy5raWxsRnJvZ2dlcigpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbW92ZSgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2hlY2tJZk91dE9mV2F0ZXJBcmVhXG4gICAgICAgIH0gPSBDaGVja0FyZWE7XG4gICAgICAgIGlmICh0aGlzLm1vdmluZykge1xuICAgICAgICAgICAgbGV0IHNhaWxTcGVlZCA9IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5zYWlsaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2FpbGluZ09iai5kaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICBzYWlsU3BlZWQgPSB0aGlzLnNhaWxpbmdPYmouc3BlZWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNhaWxpbmdPYmouZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNhaWxTcGVlZCA9IC10aGlzLnNhaWxpbmdPYmouc3BlZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggLT0gdGhpcy5zcGVlZCArIHNhaWxTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1kgLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggKz0gdGhpcy5zcGVlZCAtIHNhaWxTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWSArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm1vdmluZ0NvdW50Kys7XG4gICAgICAgICAgICBpZiAodGhpcy5tb3ZpbmdDb3VudCA+PSA1MCAvIHRoaXMuc3BlZWQpIHsgLy8gZW5kIG9mIG1vdmVtZW50XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPT0gJ3VwJyA/IHRoaXMuZW1pdHRlci5lbWl0KCd1cGRhdGVTY29yZScsIG51bGwpIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tJZk91dE9mV2F0ZXJBcmVhKHRoaXMpKSB7IC8vY2hlY2sgaWYgZnJvZ2dlciBtb3ZlcyBvdXQgb2Ygd2F0ZXIobW92ZXMgZG93biB0dXJ0bGUpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IDUwICogTWF0aC5yb3VuZCh0aGlzLnBvc1ggLyA1MCk7IC8vIGZpeCBmcm9nZ2VyIHBvc2l0aW9uIHdoZW4gbGVhdmluZyB0dXJ0bGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB3YWl0Rm9yRW5kTW92aW5nKGZyb2dnZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKCFmcm9nZ2VyLm1vdmluZykge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGtpbGxGcm9nZ2VyKCl7XG4gICAgICB0aGlzLmxpdmVzLS07XG4gICAgICB0aGlzLmxpdmVzIDwgMCA/IHRoaXMuZW1pdHRlci5lbWl0KCdnYW1lT3ZlcicsIG51bGwpIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcmVzZXRGcm9nZ2VyKCkge1xuICAgICAgICB0aGlzLnBvc1ggPSAzNTA7XG4gICAgICAgIHRoaXMucG9zWSA9IDYwMDtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5zYWlsaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2FpbGluZ09iaiA9IG51bGw7XG4gICAgfTtcblxufVxuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQvQm9hcmQuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICAgIH1cblxuICAgIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgdGhpcy5ib2FyZC5zZXRCb2FyZCgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoKSA9PiB0aGlzLmJvYXJkLmZyb2dnZXIudHJpZ2dlck1vdmUoZXZlbnQpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZm9Cb2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZHJhd0luZm9CYXIoY3R4LCBnYW1lTGV2ZWwsIGZyb2dnZXJMaXZlcywgZ2FtZVNjb3JlLCBsZXZlbFRpbWVvdXQpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZHJhd1JlY3QsXG4gICAgICAgICAgICBkcmF3VGV4dFxuICAgICAgICB9ID0gRHJhd0Z1bmN0aW9ucztcbiAgICAgICAgZHJhd1JlY3QoY3R4LCAwLCA2NTAsIDcwMCwgNTAsICcjZTZlNmZhJyk7XG4gICAgICAgIGRyYXdSZWN0KGN0eCwgMCwgNjUwLCA3MDAsIDIsICdibGFjaycpO1xuICAgICAgICBkcmF3VGV4dChjdHgsICdBcmlhbCcsIDI1LCAnYmxhY2snLCAnTGV2ZWw6ICcgKyBnYW1lTGV2ZWwsIDEwLCA2ODUpO1xuICAgICAgICBkcmF3VGV4dChjdHgsICdBcmlhbCcsIDI1LCAnYmxhY2snLCAnTGl2ZXM6ICcgKyBmcm9nZ2VyTGl2ZXMsIDYwMCwgNjg1KTtcbiAgICAgICAgZHJhd1RleHQoY3R4LCAnQXJpYWwnLCAyNSwgJ2JsYWNrJywgJ1Njb3JlOiAnICsgZ2FtZVNjb3JlLCAxMzAsIDY4NSk7XG4gICAgICAgIGRyYXdUZXh0KGN0eCwgJ0FyaWFsJywgMjUsICdibGFjaycsICdUaW1lJywgMzIwLCA2ODUpO1xuICAgICAgICBkcmF3UmVjdChjdHgsIDM4NSwgNjYwLCAoMjAwKmxldmVsVGltZW91dCkvMTAwLCAzMCwgJ29yYW5nZScpO1xuICAgIH1cbn1cbiIsImltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhc3N7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHdpZHRoKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYOztcbiAgICB0aGlzLnBvc1kgPSAwO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICB9O1xuXG4gIGRyYXdHcmFzcyhjdHgpe1xuICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICcjN2VhZWE4Jyk7XG4gIH07XG59O1xuIiwiaW1wb3J0IEdyYXNzIGZyb20gJy4vR3Jhc3MuanMnO1xuXG5jb25zdCBHcmFzc1NlcnZpY2UgPSB7XG4gIGNyZWF0ZUdyYXNzOiAoKSA9PntcbiAgICByZXR1cm4gW1xuICAgICAgLi4uY3JlYXRlU21hbGxHcmFzcygpLFxuICAgICAgLi4uY3JlYXRlQmlnR3Jhc3MoKVxuICAgIF07XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVNtYWxsR3Jhc3MoKXtcbiAgbGV0IGdyYXNzTGVmdCA9IG5ldyBHcmFzcygwLCAyNSk7XG4gIGxldCBncmFzc1JpZ2h0ID0gbmV3IEdyYXNzKDY3NSwgMjUpO1xuICByZXR1cm4gW2dyYXNzTGVmdCwgZ3Jhc3NSaWdodF07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCaWdHcmFzcygpe1xuICBsZXQgZ3Jhc3NBcnIgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDAsIHBvc1ggPSA5Ny4yMjsgaSA8IDQ7IGkrKyl7XG4gICAgbGV0IGdyYXNzID0gbmV3IEdyYXNzKHBvc1gsIDcyLjIyKTtcbiAgICBwb3NYICs9IDE0NC40NDtcbiAgICBncmFzc0Fyci5wdXNoKGdyYXNzKTtcbiAgfVxuICByZXR1cm4gZ3Jhc3NBcnI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHcmFzc1NlcnZpY2U7XG4iLCJpbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbm5pbmdTcG90e1xuICBjb25zdHJ1Y3Rvcihwb3NYKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgIHRoaXMucG9zWSA9IDA7XG4gICAgdGhpcy53aWR0aCA9IDcyLjIyO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgdGhpcy50YWtlbiA9IGZhbHNlO1xuICB9O1xuXG4gIGRyYXdTcG90KGN0eCl7XG4gICAgbGV0IGNvbG9yID0gJyM5ZGRmZTEnO1xuICAgIGlmKHRoaXMudGFrZW4pe1xuICAgICAgY29sb3IgPSAnZ3JlZW4nO1xuICAgIH1cbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBjb2xvcik7XG4gIH07XG59O1xuIiwiaW1wb3J0IFdpbm5pbmdTcG90IGZyb20gJy4vV2lubmluZ1Nwb3QuanMnO1xuXG5jb25zdCBXaW5uaW5nU3BvdFNlcnZpY2UgPSB7XG4gIGNyZWF0ZVdpbm5pbmdTcG90czogKCkgPT57XG4gICAgbGV0IHNwb3RzQXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIHBvc1ggPSAyNTsgaSA8IDU7IGkrKyl7XG4gICAgICBsZXQgc3BvdCA9IG5ldyBXaW5uaW5nU3BvdChwb3NYKTtcbiAgICAgIHBvc1ggKz0gMTQ0LjQ0O1xuICAgICAgc3BvdHNBcnIucHVzaChzcG90KTtcbiAgICB9XG4gICAgcmV0dXJuIHNwb3RzQXJyO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXaW5uaW5nU3BvdFNlcnZpY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbiwgc3BlZWQpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICAgICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB9XG5cbiAgICBtb3ZlKG9iamVjdHMpIHtcbiAgICAgICAgbGV0IG1heDtcbiAgICAgICAgbGV0IG1pbjtcbiAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWCA8IC0xNTApIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gMTg7XG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IDE0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkT2JqcyA9IGZpbHRlck9ianModGhpcywgb2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkT2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmNoZWNrQ29sbGlzaW9uKG9iaikgJiYgYXR0ZW1wdHMgPCAxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA+PTE1ID8gdGhpcy5wb3NYID0gMTQwMCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYIC09IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWCA+IDc1MCkge1xuICAgICAgICAgICAgICAgICAgICBtYXggPSAtNTtcbiAgICAgICAgICAgICAgICAgICAgbWluID0gLTExO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkT2JqcyA9IGZpbHRlck9ianModGhpcywgb2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkT2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmNoZWNrQ29sbGlzaW9uKG9iaikgJiYgYXR0ZW1wdHMgPCAxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA+PTE1ID8gdGhpcy5wb3NYID0gLTEwMDAgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWCArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY2hlY2tDb2xsaXNpb24ob2JqKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgTWF0aC5hYnMob2JqLnBvc1ggLSB0aGlzLnBvc1gpIDwgdGhpcy53aWR0aCArIDUwID8gcmVzdWx0ID0gdHJ1ZSA6IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbn07XG5cbmZ1bmN0aW9uIGZpbHRlck9ianMoY2hlY2tlZE9iaiwgb2Jqcykge1xuICAgIGxldCBmaWx0ZXJlZE9ianMgPSBvYmpzLmZpbHRlcihvYmogPT4gb2JqLmxpbmUgPT09IGNoZWNrZWRPYmoubGluZSk7XG4gICAgbGV0IGluZGV4ID0gZmlsdGVyZWRPYmpzLmluZGV4T2YoY2hlY2tlZE9iaik7XG4gICAgZmlsdGVyZWRPYmpzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkT2Jqcztcbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4vVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgR2VuZXJhdG9ycyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvR2VuZXJhdG9ycy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1cnRsZSBleHRlbmRzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgZGl2aW5nLCBsZXZlbCkge1xuICAgICAgICBzdXBlcihwb3NYKTtcbiAgICAgICAgdGhpcy5saW5lID0gbGluZTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICAgICAgdGhpcy53aWR0aCA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKTtcbiAgICAgICAgdGhpcy5wb3NZID0gVHVydGxlU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBHZW5lcmF0b3JzLmdlbmVyYXRlU3BlZWQodGhpcy53aWR0aCwgbGV2ZWwpO1xuICAgICAgICB0aGlzLmRpdmluZyA9IGRpdmluZztcbiAgICAgICAgdGhpcy5kaXZlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgdGhpcy5kaXZpbmdDb3VudGVyID0gMDtcbiAgICB9XG5cbiAgICBkcmF3VHVydGxlKGN0eCkge1xuICAgICAgICBpZiAodGhpcy5kaXZpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpdmluZ0NvdW50ZXIgPCAxMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpdmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2Jyb3duJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGl2aW5nQ291bnRlciA+IDIwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGl2aW5nQ291bnRlciA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGl2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kaXZpbmdDb3VudGVyKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnYnJvd24nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBUdXJ0bGUgZnJvbSAnLi9UdXJ0bGUuanMnO1xuXG5jb25zdCBUdXJ0bGVTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlVHVydGxlczogKGxldmVsKSA9PiB7XG4gICAgICAgIGxldCB0dXJ0bGVzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDE7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIGxldCBkaXZpbmcgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKHBsYWNlZCA8PSA3KSB7XG4gICAgICAgICAgICBpZiAocGxhY2VkID09IDIgfHwgcGxhY2VkID09IDYpIHtcbiAgICAgICAgICAgICAgICBkaXZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gdHVydGxlcy5maWx0ZXIodHVydGxlID0+IHR1cnRsZS5saW5lID09PSBsaW5lKTtcbiAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkVHVydGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgTWF0aC5hYnMoY2hlY2tlZFR1cnRsZS5wb3NYIC0gcG9zWCkgPCBjaGVja2VkVHVydGxlLndpZHRoICsgNTAgPyBhdmFpbGFibGUgPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHR1cnRsZSA9IG5ldyBUdXJ0bGUocG9zWCwgbGluZSwgZGl2aW5nLCBsZXZlbCk7XG4gICAgICAgICAgICAgICAgdHVydGxlcy5wdXNoKHR1cnRsZSk7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAxNSkge1xuICAgICAgICAgICAgICAgIGxldCB0dXJ0bGUgPSBuZXcgVHVydGxlKC01MDAsIGxpbmUsIGRpdmluZywgbGV2ZWwpO1xuICAgICAgICAgICAgICAgIHR1cnRsZXMucHVzaCh0dXJ0bGUpO1xuICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGxhY2VkID09IDQpIHtcbiAgICAgICAgICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHVydGxlcztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAyNTA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVXaWR0aDogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGVTZXJ2aWNlO1xuIiwiaW1wb3J0IFdhdGVyU2VydmljZSBmcm9tICcuL1dhdGVyU2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVye1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMucG9zWCA9IDA7XG4gICAgdGhpcy5wb3NZID0gNTA7XG4gICAgdGhpcy5oZWlnaHQgPSAyNTA7XG4gICAgdGhpcy53aWR0aCA9IDcwMDtcbiAgfVxuXG4gIGRyYXdXYXRlcihjdHgpe1xuICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdibHVlJyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFdhdGVyIGZyb20gJy4vV2F0ZXIuanMnO1xuXG5jb25zdCBXYXRlclNlcnZpY2UgPSB7XG4gIGNyZWF0ZVdhdGVyOiAoKSA9PiB7XG4gICAgICBsZXQgd2F0ZXJPYmpzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDcwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3YXRlciA9IG5ldyBXYXRlcihwb3NYLCBsaW5lKTtcbiAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgMVxuICAgICAgICAgICAgd2F0ZXJPYmpzLnB1c2god2F0ZXIpO1xuICAgICAgICAgIGlmIChpICUgMTQgPT0gMCkge1xuICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICAgIHBvc1ggPSAwO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3YXRlck9ianM7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdhdGVyU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBXb29kU2VydmljZSBmcm9tICcuL1dvb2RTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcbmltcG9ydCBHZW5lcmF0b3JzIGZyb20gJy4uLy4uL1V0aWxpdGllcy9HZW5lcmF0b3JzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29vZCBleHRlbmRzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgbGV2ZWwpIHtcbiAgICAgICAgc3VwZXIocG9zWCk7XG4gICAgICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMud2lkdGggPSBXb29kU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpXG4gICAgICAgIHRoaXMucG9zWSA9IFdvb2RTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IEdlbmVyYXRvcnMuZ2VuZXJhdGVTcGVlZCh0aGlzLndpZHRoLCBsZXZlbCk7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICB9XG5cbiAgICBkcmF3V29vZChjdHgpIHtcbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2JlaWdlJyk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgV29vZCBmcm9tICcuL1dvb2QuanMnO1xuXG5jb25zdCBXb29kU2VydmljZSA9IHtcbiAgICAgICAgY3JlYXRlV29vZDogKGxldmVsKSA9PiB7XG4gICAgICAgICAgICBsZXQgd29vZHMgPSBbXTtcbiAgICAgICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICAgICAgbGV0IGxpbmUgPSAxO1xuICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChwbGFjZWQgPD0gNykge1xuICAgICAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSB3b29kcy5maWx0ZXIod29vZCA9PiB3b29kLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkV29vZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkV29vZC5wb3NYIC0gcG9zWCkgPCBjaGVja2VkV29vZC53aWR0aCArIDUwID8gYXZhaWxhYmxlID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QocG9zWCwgbGluZSwgbGV2ZWwpO1xuICAgICAgICAgICAgICAgICAgICB3b29kcy5wdXNoKHdvb2QpO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGVtcHRzID4gMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZCgtNTAwLCBsaW5lLCBsZXZlbCk7XG4gICAgICAgICAgICAgICAgICAgIHdvb2RzLnB1c2god29vZCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwbGFjZWQgPT0gMykge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBsYWNlZCA9PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSAzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICByZXR1cm4gd29vZHM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1MDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAyMDA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAyMDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdvb2RTZXJ2aWNlO1xuIiwiY29uc3QgQ2hlY2tBcmVhID0ge1xuICAgIGNoZWNrSWZPdXRPZk1hcEFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZiAoZnJvZ2dlci5wb3NYIDw9IDAgfHwgZnJvZ2dlci5wb3NYID49IDY1MCB8fCBmcm9nZ2VyLnBvc1kgPD0gMCB8fCBmcm9nZ2VyLnBvc1kgPj0gNjAwKSB7XG4gICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZDYXJBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmIChmcm9nZ2VyLnBvc1kgPj0gMzUwICYmIGZyb2dnZXIucG9zWSA8PSA1NTApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZkxhc3RMaW5lQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAoZnJvZ2dlci5wb3NZIDw9IDUwICYmIGZyb2dnZXIucG9zWSA+PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZUdXJ0bGVBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgaWYoZnJvZ2dlci5wb3NZIDw9IDMwMCAmJiBmcm9nZ2VyLnBvc1kgPj0gMTUwKXtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZXb29kQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8PSAyNTAgJiYgZnJvZ2dlci5wb3NZID49IDUwKXtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZXYXRlckFyZWE6IChmcm9nZ2VyKSA9PntcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8IDMwMCAmJiBmcm9nZ2VyLnBvc1kgPiA1MCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmT3V0T2ZXYXRlckFyZWE6IChmcm9nZ2VyKSA9PntcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8PSAzNTAgJiYgZnJvZ2dlci5wb3NZID49IDMwMCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tBcmVhO1xuIiwiY29uc3QgQ29sbGlzaW9uRGV0ZWN0aW9uID0ge1xuICAgIGNoZWNrQ29sbGlzaW9uOiAoZnJvZ2dlciwgb2JqKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBvYmpMZWZ0U2lkZSA9IG9iai5wb3NYOyAvLyAxNTBcbiAgICAgICAgY29uc3Qgb2JqUmlnaHRTaWRlID0gb2JqLnBvc1ggKyBvYmoud2lkdGg7IC8vIDIwMFxuICAgICAgICBjb25zdCBvYmpUb3BTaWRlID0gb2JqLnBvc1k7IC8vIDBcbiAgICAgICAgY29uc3Qgb2JqQm90dG9tU2lkZSA9IG9iai5wb3NZICsgb2JqLmhlaWdodDsgLy8gNTBcblxuICAgICAgICBjb25zdCBmcm9nZ2VyTGVmdFNpZGUgPSBmcm9nZ2VyLnBvc1g7IC8vIDE1MFxuICAgICAgICBjb25zdCBmcm9nZ2VyUmlnaHRTaWRlID0gZnJvZ2dlci5wb3NYICsgZnJvZ2dlci53aWR0aDsgLy8gMjAwXG4gICAgICAgIGNvbnN0IGZyb2dnZXJUb3BTaWRlID0gZnJvZ2dlci5wb3NZOyAvLyA0NVxuICAgICAgICBjb25zdCBmcm9nZ2VyQm90dG9tU2lkZSA9IGZyb2dnZXIucG9zWSArIGZyb2dnZXIuaGVpZ2h0OyAvLyA5NVxuXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKCAoZnJvZ2dlclJpZ2h0U2lkZSA+IG9iakxlZnRTaWRlICYmIGZyb2dnZXJSaWdodFNpZGUgPD0gb2JqUmlnaHRTaWRlKSB8fFxuICAgICAgICAgICAgICAoZnJvZ2dlckxlZnRTaWRlIDwgb2JqUmlnaHRTaWRlICYmIGZyb2dnZXJMZWZ0U2lkZSA+PSBvYmpMZWZ0U2lkZSkpICYmXG4gICAgICAgICAgICAgIChmcm9nZ2VyVG9wU2lkZSA8IG9iakJvdHRvbVNpZGUgJiYgZnJvZ2dlckJvdHRvbVNpZGUgPiBvYmpUb3BTaWRlKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGZpbmRDb2xsaXNpb246IChmcm9nZ2VyLCBvYmplY3RzQXJyKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoQ29sbGlzaW9uRGV0ZWN0aW9uLmNoZWNrQ29sbGlzaW9uKGZyb2dnZXIsIG9iamVjdHNBcnJbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb2JqZWN0c0FycltpXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgZmluZFR1cnRsZUNvbGxpc2lvbjogKGZyb2dnZXIsIHR1cnRsZXNBcnIpID0+eyAvLyB3ZSBuZWVkIHRoaXMgdG8gZmlsdGVyIGRpdmluZyB0dXJ0bGVzXG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBsZXQgbm90RGl2aW5nVHVydGxlcyA9IHR1cnRsZXNBcnIuZmlsdGVyKHR1cnRsZSA9PiAhdHVydGxlLmRpdmVkKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm90RGl2aW5nVHVydGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChDb2xsaXNpb25EZXRlY3Rpb24uY2hlY2tDb2xsaXNpb24oZnJvZ2dlciwgbm90RGl2aW5nVHVydGxlc1tpXSkpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gbm90RGl2aW5nVHVydGxlc1tpXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrT3V0T2ZNYXA6IChmcm9nZ2VyLCBib2FyZCkgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmIChmcm9nZ2VyLnBvc1ggPiBib2FyZC53aWR0aCAtIDUwIHx8IGZyb2dnZXIucG9zWCA8IDAgfHxcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWSA+IGJvYXJkLmhlaWdodCAtIDEwMCB8fCBmcm9nZ2VyLnBvc1kgPCAwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xsaXNpb25EZXRlY3Rpb247XG4iLCJjb25zdCBEcmF3RnVuY3Rpb25zID0ge1xuICBkcmF3UmVjdDogKGN0eCwgcG9zWCwgcG9zWSwgd2lkdGgsIGhlaWdodCwgY29sb3IpID0+e1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yZWN0KHBvc1gsIHBvc1ksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfSxcblxuICBjb2xvclRleHQ6IChjdHgsIHNob3dXb3JkcywgdGV4dFgsIHRleHRZLCBjb2xvcikgPT4ge1xuICAgIGN0eC5mb250ID0gXCIxMHB4IEFyaWFsXCI7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIGN0eC5maWxsVGV4dChzaG93V29yZHMsIHRleHRYLCB0ZXh0WSk7XG4gIH0sXG5cbiAgZHJhd1RleHQ6IChjdHgsIGZvbnRGYW1pbHksIGZvbnRTaXplLCBjb2xvciwgdGV4dCwgcG9zWCwgcG9zWSkgPT57XG4gICAgY3R4LmZvbnQgPSBmb250U2l6ZSArIFwicHggXCIgKyBmb250RmFtaWx5O1xuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICBjdHguZmlsbFRleHQodGV4dCwgcG9zWCwgcG9zWSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhd0Z1bmN0aW9ucztcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgfTtcblxuICAgIHN1YnNjcmliZShldmVudE5hbWUsIGZuKSB7XG4gICAgICAhdGhpcy5ldmVudHNbZXZlbnROYW1lXSA/IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXSA6IGZhbHNlO1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcblxuICAgICAgcmV0dXJuICgpID0+e1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoZXZlbnRGbiA9PiBmbiAhPT0gZXZlbnRGbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGVtaXQoZXZlbnROYW1lLCBkYXRhKXtcbiAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXTtcbiAgICAgIGlmKGV2ZW50KXtcbiAgICAgICAgZXZlbnQuZm9yRWFjaChmbiA9PntcbiAgICAgICAgICBmbi5jYWxsKG51bGwsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xufVxuIiwiY29uc3QgR2VuZXJhdG9ycyA9IHtcbiAgICBnZW5lcmF0ZVNwZWVkOiAod2lkdGgsIGxldmVsKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQod2lkdGggKiAxLzEwMCkgKyBNYXRoLnNxcnQoTWF0aC5wb3cobGV2ZWwsIDMpL3dpZHRoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdlbmVyYXRvcnM7XG4iLCJjb25zdCBTYWlsU2VydmljZSA9IHtcbiAgICBzYWlsOiAoZnJvZ2dlciwgb2JqKSA9PiB7XG4gICAgICAgIGlmICg1MCAqIE1hdGgucm91bmQoKGZyb2dnZXIucG9zWCAtIG9iai5wb3NYKSAvIDUwKSA9PSBvYmoud2lkdGgpIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYICsgb2JqLndpZHRoIC0gZnJvZ2dlci53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmICg1MCAqIE1hdGgucm91bmQoKGZyb2dnZXIucG9zWCAtIG9iai5wb3NYKSAvIDUwKSA+IDApIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYICsgKDUwICogTWF0aC5yb3VuZCgoZnJvZ2dlci5wb3NYIC0gb2JqLnBvc1gpIC8gNTApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTYWlsU2VydmljZTtcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vQ29tcG9uZW50cy9HYW1lLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+e1xuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG59KTtcbiJdfQ==
