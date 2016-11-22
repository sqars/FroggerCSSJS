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
        this.board = document.getElementById('canvas');
        this.context = this.board.getContext("2d");
        this.water = new _Water2.default();
        this.frogger = new _Frogger2.default(this.emitter);
        this.cars = _CarService2.default.createCars();
        this.turtles = _TurtleService2.default.createTurtles();
        this.woods = _WoodService2.default.createWood();
        this.grass = _GrassService2.default.createGrass();
        this.winningSpots = _WinningSpotService2.default.createWinningSpots();
        this.level = 1;
        this.init = function () {
            _this.emitter.subscribe('levelComplete', function () {
                _this.levelUp();
            });
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
        key: 'levelUp',
        value: function levelUp() {
            this.level++;
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

    function Car(posX, line, speed) {
        _classCallCheck(this, Car);

        var _this = _possibleConstructorReturn(this, (Car.__proto__ || Object.getPrototypeOf(Car)).call(this, posX));

        _this.posY = _CarService2.default.generateYPos(line);
        _this.line = line;
        _this.height = 50;
        _this.width = _CarService2.default.generateWidth(line);
        _this.direction = _CarService2.default.generateDirection(line);
        _this.speed = _Generators2.default.generateSpeed(_this.width);
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

    createCars: function createCars() {
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
                var car = new _Car2.default(posX, line);
                cars.push(car);
                placed++;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                var _car = new _Car2.default(-500, line);
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
                            if (checkLevelComplete.length == 0) {
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

    function Turtle(posX, line, diving) {
        _classCallCheck(this, Turtle);

        var _this = _possibleConstructorReturn(this, (Turtle.__proto__ || Object.getPrototypeOf(Turtle)).call(this, posX));

        _this.line = line;
        _this.height = 50;
        _this.width = _TurtleService2.default.generateWidth(line);
        _this.posY = _TurtleService2.default.generateYPos(line);
        _this.speed = _Generators2.default.generateSpeed(_this.width);
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

    createTurtles: function createTurtles() {
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
                var turtle = new _Turtle2.default(posX, line, diving);
                turtles.push(turtle);
                placed++;
                attempts = 0;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                var _turtle = new _Turtle2.default(-500, line, diving);
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

    function Wood(posX, line) {
        _classCallCheck(this, Wood);

        var _this = _possibleConstructorReturn(this, (Wood.__proto__ || Object.getPrototypeOf(Wood)).call(this, posX));

        _this.line = line;
        _this.height = 50;
        _this.width = _WoodService2.default.generateWidth(line);
        _this.posY = _WoodService2.default.generateYPos(line);
        _this.speed = _Generators2.default.generateSpeed(_this.width);
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
    createWood: function createWood() {
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
                var wood = new _Wood2.default(posX, line);
                woods.push(wood);
                placed++;
                attempts = 0;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                var _wood = new _Wood2.default(-500, line);
                woods.push(_wood);
                placed++;
            }

            if (placed == 3) {
                line = 2;
            } else if (placed == 5) {
                line = 3;
            }
        };

        while (placed < 8) {
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
  generateSpeed: function generateSpeed(width) {
    return Math.sqrt(width * 1 / 100);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3MuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3NTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90U2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL01vdmluZ09iamVjdC5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9XYXRlci9XYXRlclNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2RTZXJ2aWNlLmpzIiwic3JjL2pzL1V0aWxpdGllcy9DaGVja0FyZWEuanMiLCJzcmMvanMvVXRpbGl0aWVzL0NvbGxpc2lvbkRldGVjdGlvbi5qcyIsInNyYy9qcy9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyIsInNyYy9qcy9VdGlsaXRpZXMvRXZlbnRFbWl0dGVyLmpzIiwic3JjL2pzL1V0aWxpdGllcy9HZW5lcmF0b3JzLmpzIiwic3JjL2pzL1V0aWxpdGllcy9TYWlsU2VydmljZS5q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QVIsR0FBZSxJQUFJLElBQW5CO0FBQ0g7QUFDSjtBQVRlLENBQXBCOztrQkFZZSxXOztBQUVmO0FBQ0E7O0FBRUE7Ozs7O0FDakJBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFLO0FBQ2pELE1BQUksT0FBTyxvQkFBWDtBQUNBLE9BQUssU0FBTDtBQUNELENBSEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEZyb2dnZXIgZnJvbSAnLi4vRnJvZ2dlci5qcyc7XG5pbXBvcnQgV2F0ZXIgZnJvbSAnLi4vV2F0ZXIvV2F0ZXIuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi4vQ2Fycy9DYXJTZXJ2aWNlLmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4uL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi4vV29vZC9Xb29kU2VydmljZS5qcyc7XG5pbXBvcnQgR3Jhc3NTZXJ2aWNlIGZyb20gJy4uL0xhc3RMaW5lT2Jqcy9HcmFzc1NlcnZpY2UuanMnO1xuaW1wb3J0IFdpbm5pbmdTcG90U2VydmljZSBmcm9tICcuLi9MYXN0TGluZU9ianMvV2lubmluZ1Nwb3RTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0V2ZW50RW1pdHRlci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLmJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmJvYXJkLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy53YXRlciA9IG5ldyBXYXRlcigpO1xuICAgICAgICB0aGlzLmZyb2dnZXIgPSBuZXcgRnJvZ2dlcih0aGlzLmVtaXR0ZXIpO1xuICAgICAgICB0aGlzLmNhcnMgPSBDYXJTZXJ2aWNlLmNyZWF0ZUNhcnMoKTtcbiAgICAgICAgdGhpcy50dXJ0bGVzID0gVHVydGxlU2VydmljZS5jcmVhdGVUdXJ0bGVzKCk7XG4gICAgICAgIHRoaXMud29vZHMgPSBXb29kU2VydmljZS5jcmVhdGVXb29kKCk7XG4gICAgICAgIHRoaXMuZ3Jhc3MgPSBHcmFzc1NlcnZpY2UuY3JlYXRlR3Jhc3MoKTtcbiAgICAgICAgdGhpcy53aW5uaW5nU3BvdHMgPSBXaW5uaW5nU3BvdFNlcnZpY2UuY3JlYXRlV2lubmluZ1Nwb3RzKCk7XG4gICAgICAgIHRoaXMubGV2ZWwgPSAxO1xuICAgICAgICB0aGlzLmluaXQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuc3Vic2NyaWJlKCdsZXZlbENvbXBsZXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxVcCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgc2V0Qm9hcmQoKSB7XG4gICAgICAgIHRoaXMuZHJhd0FsbCgpO1xuICAgICAgICB0aGlzLm1vdmVBbGwoKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc2V0Qm9hcmQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgZHJhd0FsbCgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmJvYXJkLndpZHRoLCB0aGlzLmJvYXJkLmhlaWdodCk7IC8vIGNsZWFyIGJvYXJkXG4gICAgICAgIHRoaXMud2F0ZXIuZHJhd1dhdGVyKHRoaXMuY29udGV4dCk7IC8vIGRyYXcgV2F0ZXJcbiAgICAgICAgdGhpcy5ncmFzcy5mb3JFYWNoKGdyYXNzID0+IGdyYXNzLmRyYXdHcmFzcyh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBHcmFzc1xuICAgICAgICB0aGlzLndpbm5pbmdTcG90cy5mb3JFYWNoKHNwb3QgPT4gc3BvdC5kcmF3U3BvdCh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyB3aW5uaW5nU3BvdHNcbiAgICAgICAgdGhpcy5jYXJzLmZvckVhY2goY2FyID0+IGNhci5kcmF3Q2FyKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IENhcnNcbiAgICAgICAgdGhpcy50dXJ0bGVzLmZvckVhY2godHVydGxlID0+IHR1cnRsZS5kcmF3VHVydGxlKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IFR1cnRsZXNcbiAgICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5kcmF3V29vZCh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBXb29kc1xuICAgICAgICB0aGlzLmZyb2dnZXIuZHJhd0Zyb2dnZXIodGhpcy5jb250ZXh0KTsgLy8gZHJhdyBGcm9nZ2VyXG5cbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5jb2xvclRleHQodGhpcy5jb250ZXh0LCAncG9zWDogJyArIHRoaXMuZnJvZ2dlci5wb3NYICsgJywgcG9zWTogJyArIHRoaXMuZnJvZ2dlci5wb3NZLCB0aGlzLmZyb2dnZXIucG9zWCwgdGhpcy5mcm9nZ2VyLnBvc1ksICdibGFjaycpOyAvLyBjaGVhdCB0byBkaXNwbGF5IGZyb2dnZXIgcG9zaXRvblxuICAgIH1cblxuICAgIG1vdmVBbGwoKSB7XG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIubW92ZSh0aGlzLmNhcnMpKTsgLy8gbW92ZSBDYXJzXG4gICAgICAgIHRoaXMudHVydGxlcy5mb3JFYWNoKHR1cnRsZSA9PiB0dXJ0bGUubW92ZSh0aGlzLnR1cnRsZXMpKTsgLy8gbW92ZSBUdXJ0bGVzXG4gICAgICAgIHRoaXMud29vZHMuZm9yRWFjaCh3b29kID0+IHdvb2QubW92ZSh0aGlzLndvb2RzKSk7IC8vIG1vdmUgV29vZHNcbiAgICAgICAgdGhpcy5mcm9nZ2VyLm1vdmUoKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyLmhhbmRsZUNvbGxpc2lvbnModGhpcy5ib2FyZCwgdGhpcy5ncmFzcywgdGhpcy5jYXJzLCB0aGlzLnR1cnRsZXMsIHRoaXMud29vZHMsIHRoaXMud2lubmluZ1Nwb3RzLCB0aGlzLmNvbnRleHQpO1xuICAgIH1cblxuICAgIGxldmVsVXAoKSB7XG4gICAgICAgIHRoaXMubGV2ZWwrKztcbiAgICB9XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuL0NhclNlcnZpY2UnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuaW1wb3J0IEdlbmVyYXRvcnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0dlbmVyYXRvcnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuXG4gICAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgc3BlZWQpIHtcbiAgICAgICAgc3VwZXIocG9zWCk7XG4gICAgICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgICAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gQ2FyU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IENhclNlcnZpY2UuZ2VuZXJhdGVEaXJlY3Rpb24obGluZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBHZW5lcmF0b3JzLmdlbmVyYXRlU3BlZWQodGhpcy53aWR0aCk7XG4gICAgfVxuXG4gICAgZHJhd0NhcihjdHgpIHtcbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ3JlZCcpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IENhciBmcm9tICcuL0Nhci5qcyc7XG5cbmNvbnN0IENhclNlcnZpY2UgPSB7XG5cbiAgICBjcmVhdGVDYXJzOiAoKSA9PiB7XG4gICAgICAgIGxldCBjYXJzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDFcbiAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgd2hpbGUgKHBsYWNlZCA8PSAxNSkge1xuICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSBjYXJzLmZpbHRlcihjYXIgPT4gY2FyLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRDYXIpID0+IHtcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkQ2FyLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRDYXIud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FyID0gbmV3IENhcihwb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICBjYXJzLnB1c2goY2FyKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGF0dGVtcHRzID4gMTUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FyID0gbmV3IENhcigtNTAwLCBsaW5lKTtcbiAgICAgICAgICAgICAgICBjYXJzLnB1c2goY2FyKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBsYWNlZCAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGNhcnM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDU1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDQ1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gNDAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAzNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZURpcmVjdGlvbjogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmltcG9ydCBDaGVja0FyZWEgZnJvbSAnLi4vVXRpbGl0aWVzL0NoZWNrQXJlYS5qcyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL1V0aWxpdGllcy9FdmVudEVtaXR0ZXIuanMnO1xuaW1wb3J0IENvbGxpc2lvbkRldGVjdGlvbiBmcm9tICcuLi9VdGlsaXRpZXMvQ29sbGlzaW9uRGV0ZWN0aW9uLmpzJztcbmltcG9ydCBTYWlsU2VydmljZSBmcm9tICcuLi9VdGlsaXRpZXMvU2FpbFNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9nZ2VyIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihlbWl0dGVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcbiAgICAgICAgdGhpcy5wb3NYID0gMzUwO1xuICAgICAgICB0aGlzLnBvc1kgPSA2MDA7XG4gICAgICAgIHRoaXMucHJldlBvc1ggPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZQb3NZID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmV2RGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5zYWlsaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2FpbGluZ09iaiA9IG51bGw7XG4gICAgICAgIHRoaXMuc3BlZWQgPSA1O1xuICAgICAgICB0aGlzLmxpdmVzID0gMztcbiAgICAgICAgdGhpcy5lbWl0dGVyID0gZW1pdHRlcjtcbiAgICB9O1xuXG4gICAgZHJhd0Zyb2dnZXIoY3R4KSB7XG4gICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdncmVlbicpO1xuICAgIH07XG5cbiAgICB0cmlnZ2VyTW92ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMubW92aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUZyb2dnZXJQcmV2UG9zKCk7XG4gICAgICAgICAgICB0aGlzLnNldERpcmVjdGlvbihldmVudCk7XG4gICAgICAgICAgICB0aGlzLm1vdmluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2V0RGlyZWN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdkb3duJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2FsY3VsYXRlRnJvZ2dlclByZXZQb3MoKSB7XG4gICAgICAgIHRoaXMucHJldkRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLnByZXZQb3NYID0gdGhpcy5wb3NYO1xuICAgICAgICB0aGlzLnByZXZQb3NZID0gdGhpcy5wb3NZO1xuICAgIH07XG5cbiAgICByZXZlcnRGcm9nZ2VyUG9zaXRpb24oKSB7XG4gICAgICAgIHRoaXMucG9zWCA9IHRoaXMucHJldlBvc1g7XG4gICAgICAgIHRoaXMucG9zWSA9IHRoaXMucHJldlBvc1k7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5wcmV2RGlyZWN0aW9uO1xuICAgICAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICB9XG5cbiAgICBoYW5kbGVDb2xsaXNpb25zKGJvYXJkLCBncmFzcywgY2FycywgdHVydGxlcywgd29vZHMsIHdpbm5pbmdTcG90cywgY29udGV4dCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBjaGVja0lmT3V0T2ZNYXBBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZkxhc3RMaW5lQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZDYXJBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZlR1cnRsZUFyZWEsXG4gICAgICAgICAgICBjaGVja0lmV29vZEFyZWEsXG4gICAgICAgICAgICBjaGVja0lmV2F0ZXJBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZk91dE9mV2F0ZXJBcmVhXG4gICAgICAgIH0gPSBDaGVja0FyZWE7XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZmluZENvbGxpc2lvbixcbiAgICAgICAgICAgIGNoZWNrT3V0T2ZNYXAsXG4gICAgICAgICAgICBmaW5kVHVydGxlQ29sbGlzaW9uXG4gICAgICAgIH0gPSBDb2xsaXNpb25EZXRlY3Rpb247XG5cbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG5cbiAgICAgICAgICAgIGxldCBibG9ja2Vyc0NvbGxpc2lvbnMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrSWZMYXN0TGluZUFyZWEodGhpcykpIHsgLy8gY2hlY2sgY29sbGlzaW9uIG9uIGxhc3RsaW5lIG9ubHkgaWYgZnJvZ2dlciBpcyBvbiBsYXN0bGluZSBhcmVhXG4gICAgICAgICAgICAgICAgY29uc3Qgd2lubmluZ1Nwb3QgPSBmaW5kQ29sbGlzaW9uKHRoaXMsIHdpbm5pbmdTcG90cyk7XG4gICAgICAgICAgICAgICAgaWYgKHdpbm5pbmdTcG90ICYmICF3aW5uaW5nU3BvdC50YWtlbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSB3aW5uaW5nU3BvdC5wb3NYICsgMTEuMTE7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc1kgPD0gNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lubmluZ1Nwb3QudGFrZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoZWNrTGV2ZWxDb21wbGV0ZSA9IHdpbm5pbmdTcG90cy5maWx0ZXIoc3BvdCA9PiAhc3BvdC50YWtlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tMZXZlbENvbXBsZXRlLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2xldmVsQ29tcGxldGUnLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRGcm9nZ2VyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdpbm5pbmdTcG90LnRha2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrZXJzQ29sbGlzaW9ucy5wdXNoKHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7IFxuICAgICAgICAgICAgICAgICAgICBibG9ja2Vyc0NvbGxpc2lvbnMucHVzaChmaW5kQ29sbGlzaW9uKHRoaXMsIGdyYXNzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2hlY2tJZk91dE9mTWFwQXJlYSh0aGlzKSkgeyAvLyBjaGVjayBsZWF2aW5nIGJvYXJkIGlmIGZyb2dnZXIgaXMgaW4gdGhlIGVkZ2Ugb2YgYm9hcmRcbiAgICAgICAgICAgICAgICBibG9ja2Vyc0NvbGxpc2lvbnMucHVzaChjaGVja091dE9mTWFwKHRoaXMsIGJvYXJkKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tlcnNDb2xsaXNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrZXJzQ29sbGlzaW9uc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldmVydEZyb2dnZXJQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGNoZWNrSWZDYXJBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIGNhcnMgb25seSBpZiBmcm9nZ2VyIGlzIGluICdyb2FkJyBhcmVhXG4gICAgICAgICAgICBpZiAoZmluZENvbGxpc2lvbih0aGlzLCBjYXJzKSkge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMucmVzZXRGcm9nZ2VyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hlY2tJZlR1cnRsZUFyZWEodGhpcykpIHsgLy8gY2hlY2sgY29sbGlzaW9uIHdpdGggdHVydGxlcyBvbmx5IGlmIGZyb2dnZXIgaXMgaW4gJ3R1cnRsZScgYXJlYVxuICAgICAgICAgICAgY29uc3Qgc2FpbGluZ1R1cnRsZSA9IGZpbmRUdXJ0bGVDb2xsaXNpb24odGhpcywgdHVydGxlcyk7XG4gICAgICAgICAgICBpZiAoc2FpbGluZ1R1cnRsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nT2JqID0gc2FpbGluZ1R1cnRsZTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubW92aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIFNhaWxTZXJ2aWNlLnNhaWwodGhpcywgc2FpbGluZ1R1cnRsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGVja0lmV29vZEFyZWEodGhpcykpIHsgLy8gY2hlY2sgY29sbGlzaW9uIHdpdGggdHVydGxlcyBvbmx5IGlmIGZyb2dnZXIgaXMgaW4gJ3dvb2RzJyBhcmVhXG4gICAgICAgICAgICBjb25zdCBzYWlsaW5nV29vZCA9IGZpbmRDb2xsaXNpb24odGhpcywgd29vZHMpO1xuICAgICAgICAgICAgaWYgKHNhaWxpbmdXb29kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmdPYmogPSBzYWlsaW5nV29vZDtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubW92aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIFNhaWxTZXJ2aWNlLnNhaWwodGhpcywgc2FpbGluZ1dvb2QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hlY2tJZldhdGVyQXJlYSh0aGlzKSAmJiAhKGZpbmRUdXJ0bGVDb2xsaXNpb24odGhpcywgdHVydGxlcykgfHwgZmluZENvbGxpc2lvbih0aGlzLCB3b29kcykpKSB7IC8vIGNoZWNrIGlmIGZyb2dnZXIgaXMgaW4gd2F0ZXJcbiAgICAgICAgICAgIC8vIHRoaXMucmVzZXRGcm9nZ2VyKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBtb3ZlKCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBjaGVja0lmT3V0T2ZXYXRlckFyZWFcbiAgICAgICAgfSA9IENoZWNrQXJlYTtcbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG4gICAgICAgICAgICBsZXQgc2FpbFNwZWVkID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNhaWxpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zYWlsaW5nT2JqLmRpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNhaWxTcGVlZCA9IHRoaXMuc2FpbGluZ09iai5zcGVlZDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2FpbGluZ09iai5kaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2FpbFNwZWVkID0gLXRoaXMuc2FpbGluZ09iai5zcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCAtPSB0aGlzLnNwZWVkICsgc2FpbFNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWSAtPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCArPSB0aGlzLnNwZWVkIC0gc2FpbFNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NZICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMubW92aW5nQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aGlzLm1vdmluZ0NvdW50ID49IDUwIC8gdGhpcy5zcGVlZCkgeyAvLyBlbmQgb2YgbW92ZW1lbnRcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChjaGVja0lmT3V0T2ZXYXRlckFyZWEodGhpcykpIHsgLy9jaGVjayBpZiBmcm9nZ2VyIG1vdmVzIG91dCBvZiB3YXRlcihtb3ZlcyBkb3duIHR1cnRsZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gNTAgKiBNYXRoLnJvdW5kKHRoaXMucG9zWCAvIDUwKTsgLy8gZml4IGZyb2dnZXIgcG9zaXRpb24gd2hlbiBsZWF2aW5nIHR1cnRsZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHdhaXRGb3JFbmRNb3ZpbmcoZnJvZ2dlcikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpZiAoIWZyb2dnZXIubW92aW5nKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmVzZXRGcm9nZ2VyKCkge1xuICAgICAgICB0aGlzLnBvc1ggPSAzNTA7XG4gICAgICAgIHRoaXMucG9zWSA9IDYwMDtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5zYWlsaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2FpbGluZ09iaiA9IG51bGw7XG4gICAgfTtcblxufVxuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQvQm9hcmQuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICAgIH1cblxuICAgIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgdGhpcy5ib2FyZC5zZXRCb2FyZCgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoKSA9PiB0aGlzLmJvYXJkLmZyb2dnZXIudHJpZ2dlck1vdmUoZXZlbnQpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXNze1xuICBjb25zdHJ1Y3Rvcihwb3NYLCB3aWR0aCl7XG4gICAgdGhpcy5wb3NYID0gcG9zWDs7XG4gICAgdGhpcy5wb3NZID0gMDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgfTtcblxuICBkcmF3R3Jhc3MoY3R4KXtcbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnIzdlYWVhOCcpO1xuICB9O1xufTtcbiIsImltcG9ydCBHcmFzcyBmcm9tICcuL0dyYXNzLmpzJztcblxuY29uc3QgR3Jhc3NTZXJ2aWNlID0ge1xuICBjcmVhdGVHcmFzczogKCkgPT57XG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLmNyZWF0ZVNtYWxsR3Jhc3MoKSxcbiAgICAgIC4uLmNyZWF0ZUJpZ0dyYXNzKClcbiAgICBdO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVTbWFsbEdyYXNzKCl7XG4gIGxldCBncmFzc0xlZnQgPSBuZXcgR3Jhc3MoMCwgMjUpO1xuICBsZXQgZ3Jhc3NSaWdodCA9IG5ldyBHcmFzcyg2NzUsIDI1KTtcbiAgcmV0dXJuIFtncmFzc0xlZnQsIGdyYXNzUmlnaHRdO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQmlnR3Jhc3MoKXtcbiAgbGV0IGdyYXNzQXJyID0gW107XG4gIGZvciAobGV0IGkgPSAwLCBwb3NYID0gOTcuMjI7IGkgPCA0OyBpKyspe1xuICAgIGxldCBncmFzcyA9IG5ldyBHcmFzcyhwb3NYLCA3Mi4yMik7XG4gICAgcG9zWCArPSAxNDQuNDQ7XG4gICAgZ3Jhc3NBcnIucHVzaChncmFzcyk7XG4gIH1cbiAgcmV0dXJuIGdyYXNzQXJyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR3Jhc3NTZXJ2aWNlO1xuIiwiaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5uaW5nU3BvdHtcbiAgY29uc3RydWN0b3IocG9zWCl7XG4gICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICB0aGlzLnBvc1kgPSAwO1xuICAgIHRoaXMud2lkdGggPSA3Mi4yMjtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgIHRoaXMudGFrZW4gPSBmYWxzZTtcbiAgfTtcblxuICBkcmF3U3BvdChjdHgpe1xuICAgIGxldCBjb2xvciA9ICcjOWRkZmUxJztcbiAgICBpZih0aGlzLnRha2VuKXtcbiAgICAgIGNvbG9yID0gJ2dyZWVuJztcbiAgICB9XG4gICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgY29sb3IpO1xuICB9O1xufTtcbiIsImltcG9ydCBXaW5uaW5nU3BvdCBmcm9tICcuL1dpbm5pbmdTcG90LmpzJztcblxuY29uc3QgV2lubmluZ1Nwb3RTZXJ2aWNlID0ge1xuICBjcmVhdGVXaW5uaW5nU3BvdHM6ICgpID0+e1xuICAgIGxldCBzcG90c0FyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBwb3NYID0gMjU7IGkgPCA1OyBpKyspe1xuICAgICAgbGV0IHNwb3QgPSBuZXcgV2lubmluZ1Nwb3QocG9zWCk7XG4gICAgICBwb3NYICs9IDE0NC40NDtcbiAgICAgIHNwb3RzQXJyLnB1c2goc3BvdCk7XG4gICAgfVxuICAgIHJldHVybiBzcG90c0FycjtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgV2lubmluZ1Nwb3RTZXJ2aWNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIHNwZWVkKSB7XG4gICAgICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgICAgIHRoaXMucG9zWSA9IHBvc1k7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgfVxuXG4gICAgbW92ZShvYmplY3RzKSB7XG4gICAgICAgIGxldCBtYXg7XG4gICAgICAgIGxldCBtaW47XG4gICAgICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc1ggPCAtMTUwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heCA9IDE4O1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSAxNDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZE9ianMgPSBmaWx0ZXJPYmpzKHRoaXMsIG9iamVjdHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE9ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5jaGVja0NvbGxpc2lvbihvYmopICYmIGF0dGVtcHRzIDwgMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPj0xNSA/IHRoaXMucG9zWCA9IDE0MDAgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWCAtPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc1ggPiA3NTApIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gLTU7XG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IC0xMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZE9ianMgPSBmaWx0ZXJPYmpzKHRoaXMsIG9iamVjdHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE9ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5jaGVja0NvbGxpc2lvbihvYmopICYmIGF0dGVtcHRzIDwgMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPj0xNSA/IHRoaXMucG9zWCA9IC0xMDAwIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1ggKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNoZWNrQ29sbGlzaW9uKG9iaikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIE1hdGguYWJzKG9iai5wb3NYIC0gdGhpcy5wb3NYKSA8IHRoaXMud2lkdGggKyA1MCA/IHJlc3VsdCA9IHRydWUgOiByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG59O1xuXG5mdW5jdGlvbiBmaWx0ZXJPYmpzKGNoZWNrZWRPYmosIG9ianMpIHtcbiAgICBsZXQgZmlsdGVyZWRPYmpzID0gb2Jqcy5maWx0ZXIob2JqID0+IG9iai5saW5lID09PSBjaGVja2VkT2JqLmxpbmUpO1xuICAgIGxldCBpbmRleCA9IGZpbHRlcmVkT2Jqcy5pbmRleE9mKGNoZWNrZWRPYmopO1xuICAgIGZpbHRlcmVkT2Jqcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiBmaWx0ZXJlZE9ianM7XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuL1R1cnRsZVNlcnZpY2UuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuaW1wb3J0IEdlbmVyYXRvcnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0dlbmVyYXRvcnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdXJ0bGUgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIGRpdmluZykge1xuICAgICAgICBzdXBlcihwb3NYKTtcbiAgICAgICAgdGhpcy5saW5lID0gbGluZTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICAgICAgdGhpcy53aWR0aCA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKTtcbiAgICAgICAgdGhpcy5wb3NZID0gVHVydGxlU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBHZW5lcmF0b3JzLmdlbmVyYXRlU3BlZWQodGhpcy53aWR0aCk7XG4gICAgICAgIHRoaXMuZGl2aW5nID0gZGl2aW5nO1xuICAgICAgICB0aGlzLmRpdmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICB0aGlzLmRpdmluZ0NvdW50ZXIgPSAwO1xuICAgIH1cblxuICAgIGRyYXdUdXJ0bGUoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLmRpdmluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGl2aW5nQ291bnRlciA8IDEwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGl2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnYnJvd24nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXZpbmdDb3VudGVyID4gMjAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXZpbmdDb3VudGVyID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXZlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRpdmluZ0NvdW50ZXIrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdicm93bicpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFR1cnRsZSBmcm9tICcuL1R1cnRsZS5qcyc7XG5cbmNvbnN0IFR1cnRsZVNlcnZpY2UgPSB7XG5cbiAgICBjcmVhdGVUdXJ0bGVzOiAoKSA9PiB7XG4gICAgICAgIGxldCB0dXJ0bGVzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDE7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIGxldCBkaXZpbmcgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKHBsYWNlZCA8PSA3KSB7XG4gICAgICAgICAgICBpZiAocGxhY2VkID09IDIgfHwgcGxhY2VkID09IDYpIHtcbiAgICAgICAgICAgICAgICBkaXZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gdHVydGxlcy5maWx0ZXIodHVydGxlID0+IHR1cnRsZS5saW5lID09PSBsaW5lKTtcbiAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkVHVydGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgTWF0aC5hYnMoY2hlY2tlZFR1cnRsZS5wb3NYIC0gcG9zWCkgPCBjaGVja2VkVHVydGxlLndpZHRoICsgNTAgPyBhdmFpbGFibGUgPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHR1cnRsZSA9IG5ldyBUdXJ0bGUocG9zWCwgbGluZSwgZGl2aW5nKTtcbiAgICAgICAgICAgICAgICB0dXJ0bGVzLnB1c2godHVydGxlKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgbGV0IHR1cnRsZSA9IG5ldyBUdXJ0bGUoLTUwMCwgbGluZSwgZGl2aW5nKTtcbiAgICAgICAgICAgICAgICB0dXJ0bGVzLnB1c2godHVydGxlKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBsYWNlZCA9PSA0KSB7XG4gICAgICAgICAgICAgICAgbGluZSA9IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR1cnRsZXM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjUwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHVydGxlU2VydmljZTtcbiIsImltcG9ydCBXYXRlclNlcnZpY2UgZnJvbSAnLi9XYXRlclNlcnZpY2UuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRlcntcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLnBvc1ggPSAwO1xuICAgIHRoaXMucG9zWSA9IDUwO1xuICAgIHRoaXMuaGVpZ2h0ID0gMjUwO1xuICAgIHRoaXMud2lkdGggPSA3MDA7XG4gIH1cblxuICBkcmF3V2F0ZXIoY3R4KXtcbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnYmx1ZScpO1xuICB9XG5cbn1cbiIsImltcG9ydCBXYXRlciBmcm9tICcuL1dhdGVyLmpzJztcblxuY29uc3QgV2F0ZXJTZXJ2aWNlID0ge1xuICBjcmVhdGVXYXRlcjogKCkgPT4ge1xuICAgICAgbGV0IHdhdGVyT2JqcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSA3MDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgd2F0ZXIgPSBuZXcgV2F0ZXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICBwb3NYID0gcG9zWCArIDFcbiAgICAgICAgICAgIHdhdGVyT2Jqcy5wdXNoKHdhdGVyKTtcbiAgICAgICAgICBpZiAoaSAlIDE0ID09IDApIHtcbiAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgICBwb3NYID0gMDtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2F0ZXJPYmpzO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXYXRlclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi9Xb29kU2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgR2VuZXJhdG9ycyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvR2VuZXJhdG9ycy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvb2QgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUpIHtcbiAgICAgICAgc3VwZXIocG9zWCk7XG4gICAgICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMud2lkdGggPSBXb29kU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpXG4gICAgICAgIHRoaXMucG9zWSA9IFdvb2RTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IEdlbmVyYXRvcnMuZ2VuZXJhdGVTcGVlZCh0aGlzLndpZHRoKTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgIH1cblxuICAgIGRyYXdXb29kKGN0eCkge1xuICAgICAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnYmVpZ2UnKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBXb29kIGZyb20gJy4vV29vZC5qcyc7XG5cbmNvbnN0IFdvb2RTZXJ2aWNlID0ge1xuICAgICAgICBjcmVhdGVXb29kOiAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgd29vZHMgPSBbXTtcbiAgICAgICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICAgICAgbGV0IGxpbmUgPSAxO1xuICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChwbGFjZWQgPCA4KSB7XG4gICAgICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkTGluZSA9IHdvb2RzLmZpbHRlcih3b29kID0+IHdvb2QubGluZSA9PT0gbGluZSk7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRXb29kKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKGNoZWNrZWRXb29kLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRXb29kLndpZHRoICsgNTAgPyBhdmFpbGFibGUgPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZChwb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgd29vZHMucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QoLTUwMCwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIHdvb2RzLnB1c2god29vZCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwbGFjZWQgPT0gMykge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBsYWNlZCA9PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSAzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICByZXR1cm4gd29vZHM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1MDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAyMDA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAyMDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdvb2RTZXJ2aWNlO1xuIiwiY29uc3QgQ2hlY2tBcmVhID0ge1xuICAgIGNoZWNrSWZPdXRPZk1hcEFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZiAoZnJvZ2dlci5wb3NYIDw9IDAgfHwgZnJvZ2dlci5wb3NYID49IDY1MCB8fCBmcm9nZ2VyLnBvc1kgPD0gMCB8fCBmcm9nZ2VyLnBvc1kgPj0gNjAwKSB7XG4gICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZDYXJBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmIChmcm9nZ2VyLnBvc1kgPj0gMzUwICYmIGZyb2dnZXIucG9zWSA8PSA1NTApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZkxhc3RMaW5lQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAoZnJvZ2dlci5wb3NZIDw9IDUwICYmIGZyb2dnZXIucG9zWSA+PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZUdXJ0bGVBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgaWYoZnJvZ2dlci5wb3NZIDw9IDMwMCAmJiBmcm9nZ2VyLnBvc1kgPj0gMTUwKXtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZXb29kQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8PSAyNTAgJiYgZnJvZ2dlci5wb3NZID49IDUwKXtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZXYXRlckFyZWE6IChmcm9nZ2VyKSA9PntcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8IDMwMCAmJiBmcm9nZ2VyLnBvc1kgPiA1MCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmT3V0T2ZXYXRlckFyZWE6IChmcm9nZ2VyKSA9PntcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8PSAzNTAgJiYgZnJvZ2dlci5wb3NZID49IDMwMCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tBcmVhO1xuIiwiY29uc3QgQ29sbGlzaW9uRGV0ZWN0aW9uID0ge1xuICAgIGNoZWNrQ29sbGlzaW9uOiAoZnJvZ2dlciwgb2JqKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBvYmpMZWZ0U2lkZSA9IG9iai5wb3NYOyAvLyAxNTBcbiAgICAgICAgY29uc3Qgb2JqUmlnaHRTaWRlID0gb2JqLnBvc1ggKyBvYmoud2lkdGg7IC8vIDIwMFxuICAgICAgICBjb25zdCBvYmpUb3BTaWRlID0gb2JqLnBvc1k7IC8vIDBcbiAgICAgICAgY29uc3Qgb2JqQm90dG9tU2lkZSA9IG9iai5wb3NZICsgb2JqLmhlaWdodDsgLy8gNTBcblxuICAgICAgICBjb25zdCBmcm9nZ2VyTGVmdFNpZGUgPSBmcm9nZ2VyLnBvc1g7IC8vIDE1MFxuICAgICAgICBjb25zdCBmcm9nZ2VyUmlnaHRTaWRlID0gZnJvZ2dlci5wb3NYICsgZnJvZ2dlci53aWR0aDsgLy8gMjAwXG4gICAgICAgIGNvbnN0IGZyb2dnZXJUb3BTaWRlID0gZnJvZ2dlci5wb3NZOyAvLyA0NVxuICAgICAgICBjb25zdCBmcm9nZ2VyQm90dG9tU2lkZSA9IGZyb2dnZXIucG9zWSArIGZyb2dnZXIuaGVpZ2h0OyAvLyA5NVxuXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKCAoZnJvZ2dlclJpZ2h0U2lkZSA+IG9iakxlZnRTaWRlICYmIGZyb2dnZXJSaWdodFNpZGUgPD0gb2JqUmlnaHRTaWRlKSB8fFxuICAgICAgICAgICAgICAoZnJvZ2dlckxlZnRTaWRlIDwgb2JqUmlnaHRTaWRlICYmIGZyb2dnZXJMZWZ0U2lkZSA+PSBvYmpMZWZ0U2lkZSkpICYmXG4gICAgICAgICAgICAgIChmcm9nZ2VyVG9wU2lkZSA8IG9iakJvdHRvbVNpZGUgJiYgZnJvZ2dlckJvdHRvbVNpZGUgPiBvYmpUb3BTaWRlKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGZpbmRDb2xsaXNpb246IChmcm9nZ2VyLCBvYmplY3RzQXJyKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoQ29sbGlzaW9uRGV0ZWN0aW9uLmNoZWNrQ29sbGlzaW9uKGZyb2dnZXIsIG9iamVjdHNBcnJbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb2JqZWN0c0FycltpXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgZmluZFR1cnRsZUNvbGxpc2lvbjogKGZyb2dnZXIsIHR1cnRsZXNBcnIpID0+eyAvLyB3ZSBuZWVkIHRoaXMgdG8gZmlsdGVyIGRpdmluZyB0dXJ0bGVzXG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBsZXQgbm90RGl2aW5nVHVydGxlcyA9IHR1cnRsZXNBcnIuZmlsdGVyKHR1cnRsZSA9PiAhdHVydGxlLmRpdmVkKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm90RGl2aW5nVHVydGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChDb2xsaXNpb25EZXRlY3Rpb24uY2hlY2tDb2xsaXNpb24oZnJvZ2dlciwgbm90RGl2aW5nVHVydGxlc1tpXSkpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gbm90RGl2aW5nVHVydGxlc1tpXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrT3V0T2ZNYXA6IChmcm9nZ2VyLCBib2FyZCkgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmIChmcm9nZ2VyLnBvc1ggPiBib2FyZC53aWR0aCAtIDUwIHx8IGZyb2dnZXIucG9zWCA8IDAgfHxcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWSA+IGJvYXJkLmhlaWdodCAtIDUwIHx8IGZyb2dnZXIucG9zWSA8IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxpc2lvbkRldGVjdGlvbjtcbiIsImNvbnN0IERyYXdGdW5jdGlvbnMgPSB7XG4gIGRyYXdSZWN0OiAoY3R4LCBwb3NYLCBwb3NZLCB3aWR0aCwgaGVpZ2h0LCBjb2xvcikgPT57XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnJlY3QocG9zWCwgcG9zWSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICB9LFxuXG4gIGNvbG9yVGV4dDogKGN0eCwgc2hvd1dvcmRzLCB0ZXh0WCwgdGV4dFksIGNvbG9yKSA9PiB7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIGN0eC5maWxsVGV4dChzaG93V29yZHMsIHRleHRYLCB0ZXh0WSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhd0Z1bmN0aW9ucztcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgfTtcblxuICAgIHN1YnNjcmliZShldmVudE5hbWUsIGZuKSB7XG4gICAgICAhdGhpcy5ldmVudHNbZXZlbnROYW1lXSA/IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXSA6IGZhbHNlO1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcblxuICAgICAgcmV0dXJuICgpID0+e1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoZXZlbnRGbiA9PiBmbiAhPT0gZXZlbnRGbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGVtaXQoZXZlbnROYW1lLCBkYXRhKXtcbiAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXTtcbiAgICAgIGlmKGV2ZW50KXtcbiAgICAgICAgZXZlbnQuZm9yRWFjaChmbiA9PntcbiAgICAgICAgICBmbi5jYWxsKG51bGwsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xufVxuIiwiY29uc3QgR2VuZXJhdG9ycyA9IHtcbiAgZ2VuZXJhdGVTcGVlZDogKHdpZHRoKSA9PiB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh3aWR0aCAqIDEgLyAxMDApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdlbmVyYXRvcnM7XG4iLCJjb25zdCBTYWlsU2VydmljZSA9IHtcbiAgICBzYWlsOiAoZnJvZ2dlciwgb2JqKSA9PiB7XG4gICAgICAgIGlmICg1MCAqIE1hdGgucm91bmQoKGZyb2dnZXIucG9zWCAtIG9iai5wb3NYKSAvIDUwKSA9PSBvYmoud2lkdGgpIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYICsgb2JqLndpZHRoIC0gZnJvZ2dlci53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmICg1MCAqIE1hdGgucm91bmQoKGZyb2dnZXIucG9zWCAtIG9iai5wb3NYKSAvIDUwKSA+IDApIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYICsgKDUwICogTWF0aC5yb3VuZCgoZnJvZ2dlci5wb3NYIC0gb2JqLnBvc1gpIC8gNTApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTYWlsU2VydmljZTtcblxuLy8gfDQwMHw0NTB8NTAwfFxuLy8gICAgICAgICAgICB8NTMwfFxuXG4vLyA1MzAgLSA0MDAgPSAxMzAgfiAxNTBcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vQ29tcG9uZW50cy9HYW1lLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+e1xuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG59KTtcbiJdfQ==
