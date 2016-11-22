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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board() {
        var _this = this;

        _classCallCheck(this, Board);

        this.emitter = new _EventEmitter2.default();
        this.level = 1;
        this.board = document.getElementById('canvas');
        this.context = this.board.getContext("2d");
        this.water = new _Water2.default();
        this.grass = _GrassService2.default.createGrass();
        this.frogger = new _Frogger2.default(this.emitter);
        this.winningSpots = [];
        this.cars = [];
        this.turtles = [];
        this.woods = [];

        this.init = function () {
            _this.resetBoard();
            _this.emitter.subscribe('levelComplete', _this.levelUp.bind(_this));
        };

        this.init();
    }

    _createClass(Board, [{
        key: 'setBoard',
        value: function setBoard() {
            this.drawAll();
            this.moveAll();
            requestAnimationFrame(this.setBoard.bind(this));
        }
    }, {
        key: 'drawAll',
        value: function drawAll() {
            var _this2 = this;

            this.context.clearRect(0, 0, this.board.width, this.board.height); // clear board
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
            this.cars = _CarService2.default.createCars(this.level);
            this.turtles = _TurtleService2.default.createTurtles(this.level);
            this.woods = _WoodService2.default.createWood(this.level);
            this.winningSpots = _WinningSpotService2.default.createWinningSpots();
        }
    }, {
        key: 'levelUp',
        value: function levelUp() {
            this.level++;
            this.resetBoard();
        }
    }]);

    return Board;
}();

exports.default = Board;

},{"../../Utilities/DrawFunctions.js":19,"../../Utilities/EventEmitter.js":20,"../Cars/CarService.js":3,"../Frogger.js":4,"../LastLineObjs/GrassService.js":7,"../LastLineObjs/WinningSpotService.js":9,"../Turtles/TurtleService.js":12,"../Water/Water.js":13,"../Wood/WoodService.js":16}],2:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":19,"../../Utilities/Generators.js":21,"../MovingObject.js":10,"./CarService":3}],3:[function(require,module,exports){
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

},{"../Utilities/CheckArea.js":17,"../Utilities/CollisionDetection.js":18,"../Utilities/DrawFunctions.js":19,"../Utilities/EventEmitter.js":20,"../Utilities/SailService.js":22,"./MovingObject.js":10}],5:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":19}],7:[function(require,module,exports){
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

},{"./Grass.js":6}],8:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":19}],9:[function(require,module,exports){
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

},{"./WinningSpot.js":8}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":19,"../../Utilities/Generators.js":21,"../MovingObject.js":10,"./TurtleService.js":12}],12:[function(require,module,exports){
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

},{"./Turtle.js":11}],13:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":19,"./WaterService.js":14}],14:[function(require,module,exports){
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

},{"./Water.js":13}],15:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":19,"../../Utilities/Generators.js":21,"../MovingObject.js":10,"./WoodService.js":16}],16:[function(require,module,exports){
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

},{"./Wood.js":15}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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
        if (frogger.posX > board.width - 50 || frogger.posX < 0 || frogger.posY > board.height - 50 || frogger.posY < 0) {
            result = true;
        }
        return result;
    }
};

exports.default = CollisionDetection;

},{}],19:[function(require,module,exports){
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
    ctx.fillStyle = color;
    ctx.fillText(showWords, textX, textY);
  }
};

exports.default = DrawFunctions;

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

// |400|450|500|
//            |530|

// 530 - 400 = 130 ~ 150

},{}],23:[function(require,module,exports){
'use strict';

var _Game = require('./Components/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./Components/Game.js":5}]},{},[23])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3MuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3NTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90U2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL01vdmluZ09iamVjdC5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9XYXRlci9XYXRlclNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2RTZXJ2aWNlLmpzIiwic3JjL2pzL1V0aWxpdGllcy9DaGVja0FyZWEuanMiLCJzcmMvanMvVXRpbGl0aWVzL0NvbGxpc2lvbkRldGVjdGlvbi5qcyIsInNyYy9qcy9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyIsInNyYy9qcy9VdGlsaXRpZXMvRXZlbnRFbWl0dGVyLmpzIiwic3JjL2pzL1V0aWxpdGllcy9HZW5lcmF0b3JzLmpzIiwic3JjL2pzL1V0aWxpdGllcy9TYWlsU2VydmljZS5q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O0FBQ2hCLFVBQU0sY0FBQyxPQUFELEVBQVUsR0FBVixFQUFrQjtBQUNwQixZQUFJLEtBQUssS0FBSyxLQUFMLENBQVcsQ0FBQyxRQUFRLElBQVIsR0FBZSxJQUFJLElBQXBCLElBQTRCLEVBQXZDLENBQUwsSUFBbUQsSUFBSSxLQUEzRCxFQUFrRTtBQUM5RCxvQkFBUSxJQUFSLEdBQWUsSUFBSSxJQUFKLEdBQVcsSUFBSSxLQUFmLEdBQXVCLFFBQVEsS0FBOUM7QUFDSCxTQUZELE1BRU8sSUFBSSxLQUFLLEtBQUssS0FBTCxDQUFXLENBQUMsUUFBUSxJQUFSLEdBQWUsSUFBSSxJQUFwQixJQUE0QixFQUF2QyxDQUFMLEdBQWtELENBQXRELEVBQXlEO0FBQzVELG9CQUFRLElBQVIsR0FBZSxJQUFJLElBQUosR0FBWSxLQUFLLEtBQUssS0FBTCxDQUFXLENBQUMsUUFBUSxJQUFSLEdBQWUsSUFBSSxJQUFwQixJQUE0QixFQUF2QyxDQUFoQztBQUNILFNBRk0sTUFFQTtBQUNILG9CQUFRLElBQVIsR0FBZSxJQUFJLElBQW5CO0FBQ0g7QUFDSjtBQVRlLENBQXBCOztrQkFZZSxXOztBQUVmO0FBQ0E7O0FBRUE7Ozs7O0FDakJBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFLO0FBQ2pELE1BQUksT0FBTyxvQkFBWDtBQUNBLE9BQUssU0FBTDtBQUNELENBSEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEZyb2dnZXIgZnJvbSAnLi4vRnJvZ2dlci5qcyc7XG5pbXBvcnQgV2F0ZXIgZnJvbSAnLi4vV2F0ZXIvV2F0ZXIuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi4vQ2Fycy9DYXJTZXJ2aWNlLmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4uL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi4vV29vZC9Xb29kU2VydmljZS5qcyc7XG5pbXBvcnQgR3Jhc3NTZXJ2aWNlIGZyb20gJy4uL0xhc3RMaW5lT2Jqcy9HcmFzc1NlcnZpY2UuanMnO1xuaW1wb3J0IFdpbm5pbmdTcG90U2VydmljZSBmcm9tICcuLi9MYXN0TGluZU9ianMvV2lubmluZ1Nwb3RTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0V2ZW50RW1pdHRlci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLmxldmVsID0gMTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5ib2FyZC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMud2F0ZXIgPSBuZXcgV2F0ZXIoKTtcbiAgICAgICAgdGhpcy5ncmFzcyA9IEdyYXNzU2VydmljZS5jcmVhdGVHcmFzcygpO1xuICAgICAgICB0aGlzLmZyb2dnZXIgPSBuZXcgRnJvZ2dlcih0aGlzLmVtaXR0ZXIpO1xuICAgICAgICB0aGlzLndpbm5pbmdTcG90cyA9IFtdO1xuICAgICAgICB0aGlzLmNhcnMgPSBbXTtcbiAgICAgICAgdGhpcy50dXJ0bGVzID0gW107XG4gICAgICAgIHRoaXMud29vZHMgPSBbXTtcblxuICAgICAgICB0aGlzLmluaXQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0Qm9hcmQoKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5zdWJzY3JpYmUoJ2xldmVsQ29tcGxldGUnLCB0aGlzLmxldmVsVXAuYmluZCh0aGlzKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgc2V0Qm9hcmQoKSB7XG4gICAgICAgIHRoaXMuZHJhd0FsbCgpO1xuICAgICAgICB0aGlzLm1vdmVBbGwoKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc2V0Qm9hcmQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgZHJhd0FsbCgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmJvYXJkLndpZHRoLCB0aGlzLmJvYXJkLmhlaWdodCk7IC8vIGNsZWFyIGJvYXJkXG4gICAgICAgIHRoaXMud2F0ZXIuZHJhd1dhdGVyKHRoaXMuY29udGV4dCk7IC8vIGRyYXcgV2F0ZXJcbiAgICAgICAgdGhpcy5ncmFzcy5mb3JFYWNoKGdyYXNzID0+IGdyYXNzLmRyYXdHcmFzcyh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBHcmFzc1xuICAgICAgICB0aGlzLndpbm5pbmdTcG90cy5mb3JFYWNoKHNwb3QgPT4gc3BvdC5kcmF3U3BvdCh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyB3aW5uaW5nU3BvdHNcbiAgICAgICAgdGhpcy5jYXJzLmZvckVhY2goY2FyID0+IGNhci5kcmF3Q2FyKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IENhcnNcbiAgICAgICAgdGhpcy50dXJ0bGVzLmZvckVhY2godHVydGxlID0+IHR1cnRsZS5kcmF3VHVydGxlKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IFR1cnRsZXNcbiAgICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5kcmF3V29vZCh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBXb29kc1xuICAgICAgICB0aGlzLmZyb2dnZXIuZHJhd0Zyb2dnZXIodGhpcy5jb250ZXh0KTsgLy8gZHJhdyBGcm9nZ2VyXG5cbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5jb2xvclRleHQodGhpcy5jb250ZXh0LCAncG9zWDogJyArIHRoaXMuZnJvZ2dlci5wb3NYICsgJywgcG9zWTogJyArIHRoaXMuZnJvZ2dlci5wb3NZLCB0aGlzLmZyb2dnZXIucG9zWCwgdGhpcy5mcm9nZ2VyLnBvc1ksICdibGFjaycpOyAvLyBjaGVhdCB0byBkaXNwbGF5IGZyb2dnZXIgcG9zaXRvblxuICAgIH1cblxuICAgIG1vdmVBbGwoKSB7XG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIubW92ZSh0aGlzLmNhcnMpKTsgLy8gbW92ZSBDYXJzXG4gICAgICAgIHRoaXMudHVydGxlcy5mb3JFYWNoKHR1cnRsZSA9PiB0dXJ0bGUubW92ZSh0aGlzLnR1cnRsZXMpKTsgLy8gbW92ZSBUdXJ0bGVzXG4gICAgICAgIHRoaXMud29vZHMuZm9yRWFjaCh3b29kID0+IHdvb2QubW92ZSh0aGlzLndvb2RzKSk7IC8vIG1vdmUgV29vZHNcbiAgICAgICAgdGhpcy5mcm9nZ2VyLm1vdmUoKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyLmhhbmRsZUNvbGxpc2lvbnModGhpcy5ib2FyZCwgdGhpcy5ncmFzcywgdGhpcy5jYXJzLCB0aGlzLnR1cnRsZXMsIHRoaXMud29vZHMsIHRoaXMud2lubmluZ1Nwb3RzLCB0aGlzLmNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlc2V0Qm9hcmQoKXtcbiAgICAgIHRoaXMuY2FycyA9IENhclNlcnZpY2UuY3JlYXRlQ2Fycyh0aGlzLmxldmVsKTtcbiAgICAgIHRoaXMudHVydGxlcyA9IFR1cnRsZVNlcnZpY2UuY3JlYXRlVHVydGxlcyh0aGlzLmxldmVsKTtcbiAgICAgIHRoaXMud29vZHMgPSBXb29kU2VydmljZS5jcmVhdGVXb29kKHRoaXMubGV2ZWwpO1xuICAgICAgdGhpcy53aW5uaW5nU3BvdHMgPSBXaW5uaW5nU3BvdFNlcnZpY2UuY3JlYXRlV2lubmluZ1Nwb3RzKCk7XG4gICAgfVxuXG4gICAgbGV2ZWxVcCgpIHtcbiAgICAgICAgdGhpcy5sZXZlbCsrO1xuICAgICAgICB0aGlzLnJlc2V0Qm9hcmQoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuL0NhclNlcnZpY2UnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuaW1wb3J0IEdlbmVyYXRvcnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0dlbmVyYXRvcnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuXG4gICAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgbGV2ZWwpIHtcbiAgICAgICAgc3VwZXIocG9zWCk7XG4gICAgICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgICAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gQ2FyU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IENhclNlcnZpY2UuZ2VuZXJhdGVEaXJlY3Rpb24obGluZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBHZW5lcmF0b3JzLmdlbmVyYXRlU3BlZWQodGhpcy53aWR0aCwgbGV2ZWwpO1xuICAgIH1cblxuICAgIGRyYXdDYXIoY3R4KSB7XG4gICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdyZWQnKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBDYXIgZnJvbSAnLi9DYXIuanMnO1xuXG5jb25zdCBDYXJTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlQ2FyczogKGxldmVsKSA9PiB7XG4gICAgICAgIGxldCBjYXJzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDFcbiAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgd2hpbGUgKHBsYWNlZCA8PSAxNSkge1xuICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSBjYXJzLmZpbHRlcihjYXIgPT4gY2FyLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRDYXIpID0+IHtcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkQ2FyLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRDYXIud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FyID0gbmV3IENhcihwb3NYLCBsaW5lLCBsZXZlbCk7XG4gICAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIoLTUwMCwgbGluZSwgbGV2ZWwpO1xuICAgICAgICAgICAgICAgIGNhcnMucHVzaChjYXIpO1xuICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGxhY2VkICUgMyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gY2FycztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gNDUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiA0MDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDM1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVXaWR0aDogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlRGlyZWN0aW9uOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuaW1wb3J0IENoZWNrQXJlYSBmcm9tICcuLi9VdGlsaXRpZXMvQ2hlY2tBcmVhLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vVXRpbGl0aWVzL0V2ZW50RW1pdHRlci5qcyc7XG5pbXBvcnQgQ29sbGlzaW9uRGV0ZWN0aW9uIGZyb20gJy4uL1V0aWxpdGllcy9Db2xsaXNpb25EZXRlY3Rpb24uanMnO1xuaW1wb3J0IFNhaWxTZXJ2aWNlIGZyb20gJy4uL1V0aWxpdGllcy9TYWlsU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb2dnZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKGVtaXR0ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICAgICAgdGhpcy53aWR0aCA9IDUwO1xuICAgICAgICB0aGlzLnBvc1ggPSAzNTA7XG4gICAgICAgIHRoaXMucG9zWSA9IDYwMDtcbiAgICAgICAgdGhpcy5wcmV2UG9zWCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldlBvc1kgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZEaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnNhaWxpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zYWlsaW5nT2JqID0gbnVsbDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDU7XG4gICAgICAgIHRoaXMubGl2ZXMgPSAzO1xuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBlbWl0dGVyO1xuICAgIH07XG5cbiAgICBkcmF3RnJvZ2dlcihjdHgpIHtcbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2dyZWVuJyk7XG4gICAgfTtcblxuICAgIHRyaWdnZXJNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlRnJvZ2dlclByZXZQb3MoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzZXREaXJlY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjYWxjdWxhdGVGcm9nZ2VyUHJldlBvcygpIHtcbiAgICAgICAgdGhpcy5wcmV2RGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb247XG4gICAgICAgIHRoaXMucHJldlBvc1ggPSB0aGlzLnBvc1g7XG4gICAgICAgIHRoaXMucHJldlBvc1kgPSB0aGlzLnBvc1k7XG4gICAgfTtcblxuICAgIHJldmVydEZyb2dnZXJQb3NpdGlvbigpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gdGhpcy5wcmV2UG9zWDtcbiAgICAgICAgdGhpcy5wb3NZID0gdGhpcy5wcmV2UG9zWTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLnByZXZEaXJlY3Rpb247XG4gICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgIH1cblxuICAgIGhhbmRsZUNvbGxpc2lvbnMoYm9hcmQsIGdyYXNzLCBjYXJzLCB0dXJ0bGVzLCB3b29kcywgd2lubmluZ1Nwb3RzLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNoZWNrSWZPdXRPZk1hcEFyZWEsXG4gICAgICAgICAgICBjaGVja0lmTGFzdExpbmVBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZkNhckFyZWEsXG4gICAgICAgICAgICBjaGVja0lmVHVydGxlQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZXb29kQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZXYXRlckFyZWEsXG4gICAgICAgICAgICBjaGVja0lmT3V0T2ZXYXRlckFyZWFcbiAgICAgICAgfSA9IENoZWNrQXJlYTtcblxuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBmaW5kQ29sbGlzaW9uLFxuICAgICAgICAgICAgY2hlY2tPdXRPZk1hcCxcbiAgICAgICAgICAgIGZpbmRUdXJ0bGVDb2xsaXNpb25cbiAgICAgICAgfSA9IENvbGxpc2lvbkRldGVjdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5tb3ZpbmcpIHtcblxuICAgICAgICAgICAgbGV0IGJsb2NrZXJzQ29sbGlzaW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAoY2hlY2tJZkxhc3RMaW5lQXJlYSh0aGlzKSkgeyAvLyBjaGVjayBjb2xsaXNpb24gb24gbGFzdGxpbmUgb25seSBpZiBmcm9nZ2VyIGlzIG9uIGxhc3RsaW5lIGFyZWFcbiAgICAgICAgICAgICAgICBjb25zdCB3aW5uaW5nU3BvdCA9IGZpbmRDb2xsaXNpb24odGhpcywgd2lubmluZ1Nwb3RzKTtcbiAgICAgICAgICAgICAgICBpZiAod2lubmluZ1Nwb3QgJiYgIXdpbm5pbmdTcG90LnRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IHdpbm5pbmdTcG90LnBvc1ggKyAxMS4xMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWSA8PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5uaW5nU3BvdC50YWtlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hlY2tMZXZlbENvbXBsZXRlID0gd2lubmluZ1Nwb3RzLmZpbHRlcihzcG90ID0+ICFzcG90LnRha2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja0xldmVsQ29tcGxldGUubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2xldmVsQ29tcGxldGUnLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRGcm9nZ2VyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdpbm5pbmdTcG90LnRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrZXJzQ29sbGlzaW9ucy5wdXNoKHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrZXJzQ29sbGlzaW9ucy5wdXNoKGZpbmRDb2xsaXNpb24odGhpcywgZ3Jhc3MpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGVja0lmT3V0T2ZNYXBBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGxlYXZpbmcgYm9hcmQgaWYgZnJvZ2dlciBpcyBpbiB0aGUgZWRnZSBvZiBib2FyZFxuICAgICAgICAgICAgICAgIGJsb2NrZXJzQ29sbGlzaW9ucy5wdXNoKGNoZWNrT3V0T2ZNYXAodGhpcywgYm9hcmQpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja2Vyc0NvbGxpc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tlcnNDb2xsaXNpb25zW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJ0RnJvZ2dlclBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY2hlY2tJZkNhckFyZWEodGhpcykpIHsgLy8gY2hlY2sgY29sbGlzaW9uIHdpdGggY2FycyBvbmx5IGlmIGZyb2dnZXIgaXMgaW4gJ3JvYWQnIGFyZWFcbiAgICAgICAgICAgIGlmIChmaW5kQ29sbGlzaW9uKHRoaXMsIGNhcnMpKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5yZXNldEZyb2dnZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGVja0lmVHVydGxlQXJlYSh0aGlzKSkgeyAvLyBjaGVjayBjb2xsaXNpb24gd2l0aCB0dXJ0bGVzIG9ubHkgaWYgZnJvZ2dlciBpcyBpbiAndHVydGxlJyBhcmVhXG4gICAgICAgICAgICBjb25zdCBzYWlsaW5nVHVydGxlID0gZmluZFR1cnRsZUNvbGxpc2lvbih0aGlzLCB0dXJ0bGVzKTtcbiAgICAgICAgICAgIGlmIChzYWlsaW5nVHVydGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmdPYmogPSBzYWlsaW5nVHVydGxlO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgU2FpbFNlcnZpY2Uuc2FpbCh0aGlzLCBzYWlsaW5nVHVydGxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrSWZXb29kQXJlYSh0aGlzKSkgeyAvLyBjaGVjayBjb2xsaXNpb24gd2l0aCB0dXJ0bGVzIG9ubHkgaWYgZnJvZ2dlciBpcyBpbiAnd29vZHMnIGFyZWFcbiAgICAgICAgICAgIGNvbnN0IHNhaWxpbmdXb29kID0gZmluZENvbGxpc2lvbih0aGlzLCB3b29kcyk7XG4gICAgICAgICAgICBpZiAoc2FpbGluZ1dvb2QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZ09iaiA9IHNhaWxpbmdXb29kO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgU2FpbFNlcnZpY2Uuc2FpbCh0aGlzLCBzYWlsaW5nV29vZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGVja0lmV2F0ZXJBcmVhKHRoaXMpICYmICEoZmluZFR1cnRsZUNvbGxpc2lvbih0aGlzLCB0dXJ0bGVzKSB8fCBmaW5kQ29sbGlzaW9uKHRoaXMsIHdvb2RzKSkpIHsgLy8gY2hlY2sgaWYgZnJvZ2dlciBpcyBpbiB3YXRlclxuICAgICAgICAgICAgLy8gdGhpcy5yZXNldEZyb2dnZXIoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIG1vdmUoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNoZWNrSWZPdXRPZldhdGVyQXJlYVxuICAgICAgICB9ID0gQ2hlY2tBcmVhO1xuICAgICAgICBpZiAodGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgICAgIGxldCBzYWlsU3BlZWQgPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2FpbGluZykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNhaWxpbmdPYmouZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2FpbFNwZWVkID0gdGhpcy5zYWlsaW5nT2JqLnNwZWVkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zYWlsaW5nT2JqLmRpcmVjdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgICAgICBzYWlsU3BlZWQgPSAtdGhpcy5zYWlsaW5nT2JqLnNwZWVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYIC09IHRoaXMuc3BlZWQgKyBzYWlsU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NZIC09IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYICs9IHRoaXMuc3BlZWQgLSBzYWlsU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1kgKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCsrO1xuICAgICAgICAgICAgaWYgKHRoaXMubW92aW5nQ291bnQgPj0gNTAgLyB0aGlzLnNwZWVkKSB7IC8vIGVuZCBvZiBtb3ZlbWVudFxuICAgICAgICAgICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrSWZPdXRPZldhdGVyQXJlYSh0aGlzKSkgeyAvL2NoZWNrIGlmIGZyb2dnZXIgbW92ZXMgb3V0IG9mIHdhdGVyKG1vdmVzIGRvd24gdHVydGxlKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSA1MCAqIE1hdGgucm91bmQodGhpcy5wb3NYIC8gNTApOyAvLyBmaXggZnJvZ2dlciBwb3NpdGlvbiB3aGVuIGxlYXZpbmcgdHVydGxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgd2FpdEZvckVuZE1vdmluZyhmcm9nZ2VyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmICghZnJvZ2dlci5tb3ZpbmcpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXNldEZyb2dnZXIoKSB7XG4gICAgICAgIHRoaXMucG9zWCA9IDM1MDtcbiAgICAgICAgdGhpcy5wb3NZID0gNjAwO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnNhaWxpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zYWlsaW5nT2JqID0gbnVsbDtcbiAgICB9O1xuXG59XG4iLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZC9Cb2FyZC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XG4gICAgfVxuXG4gICAgc3RhcnRHYW1lKCkge1xuICAgICAgICB0aGlzLmJvYXJkLnNldEJvYXJkKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCgpID0+IHRoaXMuYm9hcmQuZnJvZ2dlci50cmlnZ2VyTW92ZShldmVudCkpO1xuICAgIH1cbn1cbiIsImltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhc3N7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHdpZHRoKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYOztcbiAgICB0aGlzLnBvc1kgPSAwO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICB9O1xuXG4gIGRyYXdHcmFzcyhjdHgpe1xuICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICcjN2VhZWE4Jyk7XG4gIH07XG59O1xuIiwiaW1wb3J0IEdyYXNzIGZyb20gJy4vR3Jhc3MuanMnO1xuXG5jb25zdCBHcmFzc1NlcnZpY2UgPSB7XG4gIGNyZWF0ZUdyYXNzOiAoKSA9PntcbiAgICByZXR1cm4gW1xuICAgICAgLi4uY3JlYXRlU21hbGxHcmFzcygpLFxuICAgICAgLi4uY3JlYXRlQmlnR3Jhc3MoKVxuICAgIF07XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVNtYWxsR3Jhc3MoKXtcbiAgbGV0IGdyYXNzTGVmdCA9IG5ldyBHcmFzcygwLCAyNSk7XG4gIGxldCBncmFzc1JpZ2h0ID0gbmV3IEdyYXNzKDY3NSwgMjUpO1xuICByZXR1cm4gW2dyYXNzTGVmdCwgZ3Jhc3NSaWdodF07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCaWdHcmFzcygpe1xuICBsZXQgZ3Jhc3NBcnIgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDAsIHBvc1ggPSA5Ny4yMjsgaSA8IDQ7IGkrKyl7XG4gICAgbGV0IGdyYXNzID0gbmV3IEdyYXNzKHBvc1gsIDcyLjIyKTtcbiAgICBwb3NYICs9IDE0NC40NDtcbiAgICBncmFzc0Fyci5wdXNoKGdyYXNzKTtcbiAgfVxuICByZXR1cm4gZ3Jhc3NBcnI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHcmFzc1NlcnZpY2U7XG4iLCJpbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbm5pbmdTcG90e1xuICBjb25zdHJ1Y3Rvcihwb3NYKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgIHRoaXMucG9zWSA9IDA7XG4gICAgdGhpcy53aWR0aCA9IDcyLjIyO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgdGhpcy50YWtlbiA9IGZhbHNlO1xuICB9O1xuXG4gIGRyYXdTcG90KGN0eCl7XG4gICAgbGV0IGNvbG9yID0gJyM5ZGRmZTEnO1xuICAgIGlmKHRoaXMudGFrZW4pe1xuICAgICAgY29sb3IgPSAnZ3JlZW4nO1xuICAgIH1cbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBjb2xvcik7XG4gIH07XG59O1xuIiwiaW1wb3J0IFdpbm5pbmdTcG90IGZyb20gJy4vV2lubmluZ1Nwb3QuanMnO1xuXG5jb25zdCBXaW5uaW5nU3BvdFNlcnZpY2UgPSB7XG4gIGNyZWF0ZVdpbm5pbmdTcG90czogKCkgPT57XG4gICAgbGV0IHNwb3RzQXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIHBvc1ggPSAyNTsgaSA8IDU7IGkrKyl7XG4gICAgICBsZXQgc3BvdCA9IG5ldyBXaW5uaW5nU3BvdChwb3NYKTtcbiAgICAgIHBvc1ggKz0gMTQ0LjQ0O1xuICAgICAgc3BvdHNBcnIucHVzaChzcG90KTtcbiAgICB9XG4gICAgcmV0dXJuIHNwb3RzQXJyO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXaW5uaW5nU3BvdFNlcnZpY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbiwgc3BlZWQpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICAgICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB9XG5cbiAgICBtb3ZlKG9iamVjdHMpIHtcbiAgICAgICAgbGV0IG1heDtcbiAgICAgICAgbGV0IG1pbjtcbiAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWCA8IC0xNTApIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gMTg7XG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IDE0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkT2JqcyA9IGZpbHRlck9ianModGhpcywgb2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkT2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmNoZWNrQ29sbGlzaW9uKG9iaikgJiYgYXR0ZW1wdHMgPCAxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA+PTE1ID8gdGhpcy5wb3NYID0gMTQwMCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYIC09IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWCA+IDc1MCkge1xuICAgICAgICAgICAgICAgICAgICBtYXggPSAtNTtcbiAgICAgICAgICAgICAgICAgICAgbWluID0gLTExO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkT2JqcyA9IGZpbHRlck9ianModGhpcywgb2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkT2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmNoZWNrQ29sbGlzaW9uKG9iaikgJiYgYXR0ZW1wdHMgPCAxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA+PTE1ID8gdGhpcy5wb3NYID0gLTEwMDAgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWCArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY2hlY2tDb2xsaXNpb24ob2JqKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgTWF0aC5hYnMob2JqLnBvc1ggLSB0aGlzLnBvc1gpIDwgdGhpcy53aWR0aCArIDUwID8gcmVzdWx0ID0gdHJ1ZSA6IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbn07XG5cbmZ1bmN0aW9uIGZpbHRlck9ianMoY2hlY2tlZE9iaiwgb2Jqcykge1xuICAgIGxldCBmaWx0ZXJlZE9ianMgPSBvYmpzLmZpbHRlcihvYmogPT4gb2JqLmxpbmUgPT09IGNoZWNrZWRPYmoubGluZSk7XG4gICAgbGV0IGluZGV4ID0gZmlsdGVyZWRPYmpzLmluZGV4T2YoY2hlY2tlZE9iaik7XG4gICAgZmlsdGVyZWRPYmpzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkT2Jqcztcbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4vVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgR2VuZXJhdG9ycyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvR2VuZXJhdG9ycy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1cnRsZSBleHRlbmRzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgZGl2aW5nLCBsZXZlbCkge1xuICAgICAgICBzdXBlcihwb3NYKTtcbiAgICAgICAgdGhpcy5saW5lID0gbGluZTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICAgICAgdGhpcy53aWR0aCA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKTtcbiAgICAgICAgdGhpcy5wb3NZID0gVHVydGxlU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBHZW5lcmF0b3JzLmdlbmVyYXRlU3BlZWQodGhpcy53aWR0aCwgbGV2ZWwpO1xuICAgICAgICB0aGlzLmRpdmluZyA9IGRpdmluZztcbiAgICAgICAgdGhpcy5kaXZlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgdGhpcy5kaXZpbmdDb3VudGVyID0gMDtcbiAgICB9XG5cbiAgICBkcmF3VHVydGxlKGN0eCkge1xuICAgICAgICBpZiAodGhpcy5kaXZpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpdmluZ0NvdW50ZXIgPCAxMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpdmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2Jyb3duJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGl2aW5nQ291bnRlciA+IDIwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGl2aW5nQ291bnRlciA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGl2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kaXZpbmdDb3VudGVyKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnYnJvd24nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBUdXJ0bGUgZnJvbSAnLi9UdXJ0bGUuanMnO1xuXG5jb25zdCBUdXJ0bGVTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlVHVydGxlczogKGxldmVsKSA9PiB7XG4gICAgICAgIGxldCB0dXJ0bGVzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDE7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIGxldCBkaXZpbmcgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKHBsYWNlZCA8PSA3KSB7XG4gICAgICAgICAgICBpZiAocGxhY2VkID09IDIgfHwgcGxhY2VkID09IDYpIHtcbiAgICAgICAgICAgICAgICBkaXZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gdHVydGxlcy5maWx0ZXIodHVydGxlID0+IHR1cnRsZS5saW5lID09PSBsaW5lKTtcbiAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkVHVydGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgTWF0aC5hYnMoY2hlY2tlZFR1cnRsZS5wb3NYIC0gcG9zWCkgPCBjaGVja2VkVHVydGxlLndpZHRoICsgNTAgPyBhdmFpbGFibGUgPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHR1cnRsZSA9IG5ldyBUdXJ0bGUocG9zWCwgbGluZSwgZGl2aW5nLCBsZXZlbCk7XG4gICAgICAgICAgICAgICAgdHVydGxlcy5wdXNoKHR1cnRsZSk7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAxNSkge1xuICAgICAgICAgICAgICAgIGxldCB0dXJ0bGUgPSBuZXcgVHVydGxlKC01MDAsIGxpbmUsIGRpdmluZywgbGV2ZWwpO1xuICAgICAgICAgICAgICAgIHR1cnRsZXMucHVzaCh0dXJ0bGUpO1xuICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGxhY2VkID09IDQpIHtcbiAgICAgICAgICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHVydGxlcztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAyNTA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVXaWR0aDogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGVTZXJ2aWNlO1xuIiwiaW1wb3J0IFdhdGVyU2VydmljZSBmcm9tICcuL1dhdGVyU2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVye1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMucG9zWCA9IDA7XG4gICAgdGhpcy5wb3NZID0gNTA7XG4gICAgdGhpcy5oZWlnaHQgPSAyNTA7XG4gICAgdGhpcy53aWR0aCA9IDcwMDtcbiAgfVxuXG4gIGRyYXdXYXRlcihjdHgpe1xuICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdibHVlJyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFdhdGVyIGZyb20gJy4vV2F0ZXIuanMnO1xuXG5jb25zdCBXYXRlclNlcnZpY2UgPSB7XG4gIGNyZWF0ZVdhdGVyOiAoKSA9PiB7XG4gICAgICBsZXQgd2F0ZXJPYmpzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDcwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3YXRlciA9IG5ldyBXYXRlcihwb3NYLCBsaW5lKTtcbiAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgMVxuICAgICAgICAgICAgd2F0ZXJPYmpzLnB1c2god2F0ZXIpO1xuICAgICAgICAgIGlmIChpICUgMTQgPT0gMCkge1xuICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICAgIHBvc1ggPSAwO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3YXRlck9ianM7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdhdGVyU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBXb29kU2VydmljZSBmcm9tICcuL1dvb2RTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcbmltcG9ydCBHZW5lcmF0b3JzIGZyb20gJy4uLy4uL1V0aWxpdGllcy9HZW5lcmF0b3JzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29vZCBleHRlbmRzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgbGV2ZWwpIHtcbiAgICAgICAgc3VwZXIocG9zWCk7XG4gICAgICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMud2lkdGggPSBXb29kU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpXG4gICAgICAgIHRoaXMucG9zWSA9IFdvb2RTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IEdlbmVyYXRvcnMuZ2VuZXJhdGVTcGVlZCh0aGlzLndpZHRoLCBsZXZlbCk7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICB9XG5cbiAgICBkcmF3V29vZChjdHgpIHtcbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2JlaWdlJyk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgV29vZCBmcm9tICcuL1dvb2QuanMnO1xuXG5jb25zdCBXb29kU2VydmljZSA9IHtcbiAgICAgICAgY3JlYXRlV29vZDogKGxldmVsKSA9PiB7XG4gICAgICAgICAgICBsZXQgd29vZHMgPSBbXTtcbiAgICAgICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICAgICAgbGV0IGxpbmUgPSAxO1xuICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChwbGFjZWQgPD0gNykge1xuICAgICAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSB3b29kcy5maWx0ZXIod29vZCA9PiB3b29kLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkV29vZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkV29vZC5wb3NYIC0gcG9zWCkgPCBjaGVja2VkV29vZC53aWR0aCArIDUwID8gYXZhaWxhYmxlID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QocG9zWCwgbGluZSwgbGV2ZWwpO1xuICAgICAgICAgICAgICAgICAgICB3b29kcy5wdXNoKHdvb2QpO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGVtcHRzID4gMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZCgtNTAwLCBsaW5lLCBsZXZlbCk7XG4gICAgICAgICAgICAgICAgICAgIHdvb2RzLnB1c2god29vZCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwbGFjZWQgPT0gMykge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBsYWNlZCA9PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSAzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICByZXR1cm4gd29vZHM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1MDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAyMDA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAyMDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdvb2RTZXJ2aWNlO1xuIiwiY29uc3QgQ2hlY2tBcmVhID0ge1xuICAgIGNoZWNrSWZPdXRPZk1hcEFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZiAoZnJvZ2dlci5wb3NYIDw9IDAgfHwgZnJvZ2dlci5wb3NYID49IDY1MCB8fCBmcm9nZ2VyLnBvc1kgPD0gMCB8fCBmcm9nZ2VyLnBvc1kgPj0gNjAwKSB7XG4gICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZDYXJBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmIChmcm9nZ2VyLnBvc1kgPj0gMzUwICYmIGZyb2dnZXIucG9zWSA8PSA1NTApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZkxhc3RMaW5lQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAoZnJvZ2dlci5wb3NZIDw9IDUwICYmIGZyb2dnZXIucG9zWSA+PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZUdXJ0bGVBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgaWYoZnJvZ2dlci5wb3NZIDw9IDMwMCAmJiBmcm9nZ2VyLnBvc1kgPj0gMTUwKXtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZXb29kQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8PSAyNTAgJiYgZnJvZ2dlci5wb3NZID49IDUwKXtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZXYXRlckFyZWE6IChmcm9nZ2VyKSA9PntcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8IDMwMCAmJiBmcm9nZ2VyLnBvc1kgPiA1MCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmT3V0T2ZXYXRlckFyZWE6IChmcm9nZ2VyKSA9PntcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8PSAzNTAgJiYgZnJvZ2dlci5wb3NZID49IDMwMCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tBcmVhO1xuIiwiY29uc3QgQ29sbGlzaW9uRGV0ZWN0aW9uID0ge1xuICAgIGNoZWNrQ29sbGlzaW9uOiAoZnJvZ2dlciwgb2JqKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBvYmpMZWZ0U2lkZSA9IG9iai5wb3NYOyAvLyAxNTBcbiAgICAgICAgY29uc3Qgb2JqUmlnaHRTaWRlID0gb2JqLnBvc1ggKyBvYmoud2lkdGg7IC8vIDIwMFxuICAgICAgICBjb25zdCBvYmpUb3BTaWRlID0gb2JqLnBvc1k7IC8vIDBcbiAgICAgICAgY29uc3Qgb2JqQm90dG9tU2lkZSA9IG9iai5wb3NZICsgb2JqLmhlaWdodDsgLy8gNTBcblxuICAgICAgICBjb25zdCBmcm9nZ2VyTGVmdFNpZGUgPSBmcm9nZ2VyLnBvc1g7IC8vIDE1MFxuICAgICAgICBjb25zdCBmcm9nZ2VyUmlnaHRTaWRlID0gZnJvZ2dlci5wb3NYICsgZnJvZ2dlci53aWR0aDsgLy8gMjAwXG4gICAgICAgIGNvbnN0IGZyb2dnZXJUb3BTaWRlID0gZnJvZ2dlci5wb3NZOyAvLyA0NVxuICAgICAgICBjb25zdCBmcm9nZ2VyQm90dG9tU2lkZSA9IGZyb2dnZXIucG9zWSArIGZyb2dnZXIuaGVpZ2h0OyAvLyA5NVxuXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKCAoZnJvZ2dlclJpZ2h0U2lkZSA+IG9iakxlZnRTaWRlICYmIGZyb2dnZXJSaWdodFNpZGUgPD0gb2JqUmlnaHRTaWRlKSB8fFxuICAgICAgICAgICAgICAoZnJvZ2dlckxlZnRTaWRlIDwgb2JqUmlnaHRTaWRlICYmIGZyb2dnZXJMZWZ0U2lkZSA+PSBvYmpMZWZ0U2lkZSkpICYmXG4gICAgICAgICAgICAgIChmcm9nZ2VyVG9wU2lkZSA8IG9iakJvdHRvbVNpZGUgJiYgZnJvZ2dlckJvdHRvbVNpZGUgPiBvYmpUb3BTaWRlKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGZpbmRDb2xsaXNpb246IChmcm9nZ2VyLCBvYmplY3RzQXJyKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoQ29sbGlzaW9uRGV0ZWN0aW9uLmNoZWNrQ29sbGlzaW9uKGZyb2dnZXIsIG9iamVjdHNBcnJbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb2JqZWN0c0FycltpXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgZmluZFR1cnRsZUNvbGxpc2lvbjogKGZyb2dnZXIsIHR1cnRsZXNBcnIpID0+eyAvLyB3ZSBuZWVkIHRoaXMgdG8gZmlsdGVyIGRpdmluZyB0dXJ0bGVzXG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBsZXQgbm90RGl2aW5nVHVydGxlcyA9IHR1cnRsZXNBcnIuZmlsdGVyKHR1cnRsZSA9PiAhdHVydGxlLmRpdmVkKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm90RGl2aW5nVHVydGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChDb2xsaXNpb25EZXRlY3Rpb24uY2hlY2tDb2xsaXNpb24oZnJvZ2dlciwgbm90RGl2aW5nVHVydGxlc1tpXSkpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gbm90RGl2aW5nVHVydGxlc1tpXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrT3V0T2ZNYXA6IChmcm9nZ2VyLCBib2FyZCkgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmIChmcm9nZ2VyLnBvc1ggPiBib2FyZC53aWR0aCAtIDUwIHx8IGZyb2dnZXIucG9zWCA8IDAgfHxcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWSA+IGJvYXJkLmhlaWdodCAtIDUwIHx8IGZyb2dnZXIucG9zWSA8IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxpc2lvbkRldGVjdGlvbjtcbiIsImNvbnN0IERyYXdGdW5jdGlvbnMgPSB7XG4gIGRyYXdSZWN0OiAoY3R4LCBwb3NYLCBwb3NZLCB3aWR0aCwgaGVpZ2h0LCBjb2xvcikgPT57XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnJlY3QocG9zWCwgcG9zWSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICB9LFxuXG4gIGNvbG9yVGV4dDogKGN0eCwgc2hvd1dvcmRzLCB0ZXh0WCwgdGV4dFksIGNvbG9yKSA9PiB7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIGN0eC5maWxsVGV4dChzaG93V29yZHMsIHRleHRYLCB0ZXh0WSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhd0Z1bmN0aW9ucztcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgfTtcblxuICAgIHN1YnNjcmliZShldmVudE5hbWUsIGZuKSB7XG4gICAgICAhdGhpcy5ldmVudHNbZXZlbnROYW1lXSA/IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXSA6IGZhbHNlO1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcblxuICAgICAgcmV0dXJuICgpID0+e1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoZXZlbnRGbiA9PiBmbiAhPT0gZXZlbnRGbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGVtaXQoZXZlbnROYW1lLCBkYXRhKXtcbiAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXTtcbiAgICAgIGlmKGV2ZW50KXtcbiAgICAgICAgZXZlbnQuZm9yRWFjaChmbiA9PntcbiAgICAgICAgICBmbi5jYWxsKG51bGwsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xufVxuIiwiY29uc3QgR2VuZXJhdG9ycyA9IHtcbiAgICBnZW5lcmF0ZVNwZWVkOiAod2lkdGgsIGxldmVsKSA9PiB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQod2lkdGggKiAxLzEwMCkgKyBNYXRoLnNxcnQoTWF0aC5wb3cobGV2ZWwsIDMpL3dpZHRoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdlbmVyYXRvcnM7XG4iLCJjb25zdCBTYWlsU2VydmljZSA9IHtcbiAgICBzYWlsOiAoZnJvZ2dlciwgb2JqKSA9PiB7XG4gICAgICAgIGlmICg1MCAqIE1hdGgucm91bmQoKGZyb2dnZXIucG9zWCAtIG9iai5wb3NYKSAvIDUwKSA9PSBvYmoud2lkdGgpIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYICsgb2JqLndpZHRoIC0gZnJvZ2dlci53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmICg1MCAqIE1hdGgucm91bmQoKGZyb2dnZXIucG9zWCAtIG9iai5wb3NYKSAvIDUwKSA+IDApIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYICsgKDUwICogTWF0aC5yb3VuZCgoZnJvZ2dlci5wb3NYIC0gb2JqLnBvc1gpIC8gNTApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTYWlsU2VydmljZTtcblxuLy8gfDQwMHw0NTB8NTAwfFxuLy8gICAgICAgICAgICB8NTMwfFxuXG4vLyA1MzAgLSA0MDAgPSAxMzAgfiAxNTBcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vQ29tcG9uZW50cy9HYW1lLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+e1xuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG59KTtcbiJdfQ==
