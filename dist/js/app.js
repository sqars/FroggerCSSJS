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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board() {
        _classCallCheck(this, Board);

        this.board = document.getElementById('canvas');
        this.context = this.board.getContext("2d");
        this.water = new _Water2.default();
        this.frogger = new _Frogger2.default();
        this.cars = _CarService2.default.createCars();
        this.turtles = _TurtleService2.default.createTurtles();
        this.woods = _WoodService2.default.createWood();
        this.grass = _GrassService2.default.createGrass();
        this.winningSpots = _WinningSpotService2.default.createWinningSpots();
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
            var _this = this;

            this.context.clearRect(0, 0, this.board.width, this.board.height); // clear board
            this.water.drawWater(this.context); // draw Water
            this.grass.forEach(function (grass) {
                return grass.drawGrass(_this.context);
            }); // draw Grass
            this.winningSpots.forEach(function (spot) {
                return spot.drawSpot(_this.context);
            }); // draw winningSpots
            this.cars.forEach(function (car) {
                return car.drawCar(_this.context);
            }); // draw Cars
            this.turtles.forEach(function (turtle) {
                return turtle.drawTurtle(_this.context);
            }); // draw Turtles
            this.woods.forEach(function (wood) {
                return wood.drawWood(_this.context);
            }); // draw Woods
            this.frogger.drawFrogger(this.context); // draw Frogger

            _DrawFunctions2.default.colorText(this.context, 'posX: ' + this.frogger.posX + ', posY: ' + this.frogger.posY, this.frogger.posX, this.frogger.posY, 'black'); // cheat to display frogger positon
        }
    }, {
        key: 'moveAll',
        value: function moveAll() {
            var _this2 = this;

            this.cars.forEach(function (car) {
                return car.move(_this2.cars);
            }); // move Cars
            this.turtles.forEach(function (turtle) {
                return turtle.move(_this2.turtles);
            }); // move Turtles
            this.woods.forEach(function (wood) {
                return wood.move(_this2.woods);
            }); // move Woods
            this.frogger.move();
            this.frogger.handleCollisions(this.board, this.grass, this.cars, this.turtles, this.woods, this.winningSpots, this.context);
        }
    }]);

    return Board;
}();

exports.default = Board;

},{"../../Utilities/DrawFunctions.js":19,"../Cars/CarService.js":3,"../Frogger.js":4,"../LastLineObjs/GrassService.js":7,"../LastLineObjs/WinningSpotService.js":9,"../Turtles/TurtleService.js":12,"../Water/Water.js":13,"../Wood/WoodService.js":16}],2:[function(require,module,exports){
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

    function Frogger(posX, posY, direction, lives) {
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
                // console.log('drowned');
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
            // this.board.startBoard();
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
    return Math.sqrt(width * 1 / 50);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3MuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3NTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90U2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL01vdmluZ09iamVjdC5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9XYXRlci9XYXRlclNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2RTZXJ2aWNlLmpzIiwic3JjL2pzL1V0aWxpdGllcy9DaGVja0FyZWEuanMiLCJzcmMvanMvVXRpbGl0aWVzL0NvbGxpc2lvbkRldGVjdGlvbi5qcyIsInNyYy9qcy9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyIsInNyYy9qcy9VdGlsaXRpZXMvRXZlbnRFbWl0dGVyLmpzIiwic3JjL2pzL1V0aWxpdGllcy9HZW5lcmF0b3JzLmpzIiwic3JjL2pzL1V0aWxpdGllcy9TYWlsU2VydmljZS5q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RUFBdEIsQ0FBUDtBQUNEO0FBSGdCLENBQW5COztrQkFNZSxVOzs7Ozs7OztBQ05mLElBQU0sY0FBYztBQUNoQixVQUFNLGNBQUMsT0FBRCxFQUFVLEdBQVYsRUFBa0I7QUFDcEIsWUFBSSxLQUFLLEtBQUssS0FBTCxDQUFXLENBQUMsUUFBUSxJQUFSLEdBQWUsSUFBSSxJQUFwQixJQUE0QixFQUF2QyxDQUFMLElBQW1ELElBQUksS0FBM0QsRUFBa0U7QUFDOUQsb0JBQVEsSUFBUixHQUFlLElBQUksSUFBSixHQUFXLElBQUksS0FBZixHQUF1QixRQUFRLEtBQTlDO0FBQ0gsU0FGRCxNQUVPLElBQUksS0FBSyxLQUFLLEtBQUwsQ0FBVyxDQUFDLFFBQVEsSUFBUixHQUFlLElBQUksSUFBcEIsSUFBNEIsRUFBdkMsQ0FBTCxHQUFrRCxDQUF0RCxFQUF5RDtBQUM1RCxvQkFBUSxJQUFSLEdBQWUsSUFBSSxJQUFKLEdBQVksS0FBSyxLQUFLLEtBQUwsQ0FBVyxDQUFDLFFBQVEsSUFBUixHQUFlLElBQUksSUFBcEIsSUFBNEIsRUFBdkMsQ0FBaEM7QUFDSCxTQUZNLE1BRUE7QUFDSCxvQkFBUSxJQUFSLEdBQWUsSUFBSSxJQUFuQjtBQUNIO0FBQ0o7QUFUZSxDQUFwQjs7a0JBWWUsVzs7QUFFZjtBQUNBOztBQUVBOzs7OztBQ2pCQTs7Ozs7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBSztBQUNqRCxNQUFJLE9BQU8sb0JBQVg7QUFDQSxPQUFLLFNBQUw7QUFDRCxDQUhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBGcm9nZ2VyIGZyb20gJy4uL0Zyb2dnZXIuanMnO1xuaW1wb3J0IFdhdGVyIGZyb20gJy4uL1dhdGVyL1dhdGVyLmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4uL0NhcnMvQ2FyU2VydmljZS5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuLi9UdXJ0bGVzL1R1cnRsZVNlcnZpY2UuanMnO1xuaW1wb3J0IFdvb2RTZXJ2aWNlIGZyb20gJy4uL1dvb2QvV29vZFNlcnZpY2UuanMnO1xuaW1wb3J0IEdyYXNzU2VydmljZSBmcm9tICcuLi9MYXN0TGluZU9ianMvR3Jhc3NTZXJ2aWNlLmpzJztcbmltcG9ydCBXaW5uaW5nU3BvdFNlcnZpY2UgZnJvbSAnLi4vTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90U2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5ib2FyZC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMud2F0ZXIgPSBuZXcgV2F0ZXIoKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyID0gbmV3IEZyb2dnZXIoKTtcbiAgICAgICAgdGhpcy5jYXJzID0gQ2FyU2VydmljZS5jcmVhdGVDYXJzKCk7XG4gICAgICAgIHRoaXMudHVydGxlcyA9IFR1cnRsZVNlcnZpY2UuY3JlYXRlVHVydGxlcygpO1xuICAgICAgICB0aGlzLndvb2RzID0gV29vZFNlcnZpY2UuY3JlYXRlV29vZCgpO1xuICAgICAgICB0aGlzLmdyYXNzID0gR3Jhc3NTZXJ2aWNlLmNyZWF0ZUdyYXNzKCk7XG4gICAgICAgIHRoaXMud2lubmluZ1Nwb3RzID0gV2lubmluZ1Nwb3RTZXJ2aWNlLmNyZWF0ZVdpbm5pbmdTcG90cygpO1xuICAgIH1cblxuICAgIHNldEJvYXJkKCkge1xuICAgICAgICB0aGlzLmRyYXdBbGwoKTtcbiAgICAgICAgdGhpcy5tb3ZlQWxsKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnNldEJvYXJkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGRyYXdBbGwoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5ib2FyZC53aWR0aCwgdGhpcy5ib2FyZC5oZWlnaHQpOyAvLyBjbGVhciBib2FyZFxuICAgICAgICB0aGlzLndhdGVyLmRyYXdXYXRlcih0aGlzLmNvbnRleHQpOyAvLyBkcmF3IFdhdGVyXG4gICAgICAgIHRoaXMuZ3Jhc3MuZm9yRWFjaChncmFzcyA9PiBncmFzcy5kcmF3R3Jhc3ModGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgR3Jhc3NcbiAgICAgICAgdGhpcy53aW5uaW5nU3BvdHMuZm9yRWFjaChzcG90ID0+IHNwb3QuZHJhd1Nwb3QodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgd2lubmluZ1Nwb3RzXG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIuZHJhd0Nhcih0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBDYXJzXG4gICAgICAgIHRoaXMudHVydGxlcy5mb3JFYWNoKHR1cnRsZSA9PiB0dXJ0bGUuZHJhd1R1cnRsZSh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBUdXJ0bGVzXG4gICAgICAgIHRoaXMud29vZHMuZm9yRWFjaCh3b29kID0+IHdvb2QuZHJhd1dvb2QodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgV29vZHNcbiAgICAgICAgdGhpcy5mcm9nZ2VyLmRyYXdGcm9nZ2VyKHRoaXMuY29udGV4dCk7IC8vIGRyYXcgRnJvZ2dlclxuXG4gICAgICAgIERyYXdGdW5jdGlvbnMuY29sb3JUZXh0KHRoaXMuY29udGV4dCwgJ3Bvc1g6ICcgKyB0aGlzLmZyb2dnZXIucG9zWCArICcsIHBvc1k6ICcgKyB0aGlzLmZyb2dnZXIucG9zWSwgdGhpcy5mcm9nZ2VyLnBvc1gsIHRoaXMuZnJvZ2dlci5wb3NZLCAnYmxhY2snKTsgLy8gY2hlYXQgdG8gZGlzcGxheSBmcm9nZ2VyIHBvc2l0b25cbiAgICB9XG5cbiAgICBtb3ZlQWxsKCkge1xuICAgICAgICB0aGlzLmNhcnMuZm9yRWFjaChjYXIgPT4gY2FyLm1vdmUodGhpcy5jYXJzKSk7IC8vIG1vdmUgQ2Fyc1xuICAgICAgICB0aGlzLnR1cnRsZXMuZm9yRWFjaCh0dXJ0bGUgPT4gdHVydGxlLm1vdmUodGhpcy50dXJ0bGVzKSk7IC8vIG1vdmUgVHVydGxlc1xuICAgICAgICB0aGlzLndvb2RzLmZvckVhY2god29vZCA9PiB3b29kLm1vdmUodGhpcy53b29kcykpOyAvLyBtb3ZlIFdvb2RzXG4gICAgICAgIHRoaXMuZnJvZ2dlci5tb3ZlKCk7XG4gICAgICAgIHRoaXMuZnJvZ2dlci5oYW5kbGVDb2xsaXNpb25zKHRoaXMuYm9hcmQsIHRoaXMuZ3Jhc3MsIHRoaXMuY2FycywgdGhpcy50dXJ0bGVzLCB0aGlzLndvb2RzLCB0aGlzLndpbm5pbmdTcG90cywgdGhpcy5jb250ZXh0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuL0NhclNlcnZpY2UnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuaW1wb3J0IEdlbmVyYXRvcnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0dlbmVyYXRvcnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuXG4gICAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgc3BlZWQpIHtcbiAgICAgICAgc3VwZXIocG9zWCk7XG4gICAgICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgICAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gQ2FyU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IENhclNlcnZpY2UuZ2VuZXJhdGVEaXJlY3Rpb24obGluZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBHZW5lcmF0b3JzLmdlbmVyYXRlU3BlZWQodGhpcy53aWR0aCk7XG4gICAgfVxuXG4gICAgZHJhd0NhcihjdHgpIHtcbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ3JlZCcpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IENhciBmcm9tICcuL0Nhci5qcyc7XG5cbmNvbnN0IENhclNlcnZpY2UgPSB7XG5cbiAgICBjcmVhdGVDYXJzOiAoKSA9PiB7XG4gICAgICAgIGxldCBjYXJzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDFcbiAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgd2hpbGUgKHBsYWNlZCA8PSAxNSkge1xuICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSBjYXJzLmZpbHRlcihjYXIgPT4gY2FyLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRDYXIpID0+IHtcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkQ2FyLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRDYXIud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FyID0gbmV3IENhcihwb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICBjYXJzLnB1c2goY2FyKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGF0dGVtcHRzID4gMTUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FyID0gbmV3IENhcigtNTAwLCBsaW5lKTtcbiAgICAgICAgICAgICAgICBjYXJzLnB1c2goY2FyKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBsYWNlZCAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGNhcnM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDU1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDQ1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gNDAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAzNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZURpcmVjdGlvbjogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmltcG9ydCBDaGVja0FyZWEgZnJvbSAnLi4vVXRpbGl0aWVzL0NoZWNrQXJlYS5qcyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL1V0aWxpdGllcy9FdmVudEVtaXR0ZXIuanMnO1xuaW1wb3J0IENvbGxpc2lvbkRldGVjdGlvbiBmcm9tICcuLi9VdGlsaXRpZXMvQ29sbGlzaW9uRGV0ZWN0aW9uLmpzJztcbmltcG9ydCBTYWlsU2VydmljZSBmcm9tICcuLi9VdGlsaXRpZXMvU2FpbFNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9nZ2VyIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIGxpdmVzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcbiAgICAgICAgdGhpcy5wb3NYID0gMzUwO1xuICAgICAgICB0aGlzLnBvc1kgPSA2MDA7XG4gICAgICAgIHRoaXMucHJldlBvc1ggPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZQb3NZID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmV2RGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5zYWlsaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2FpbGluZ09iaiA9IG51bGw7XG4gICAgICAgIHRoaXMuc3BlZWQgPSA1O1xuICAgICAgICB0aGlzLmxpdmVzID0gMztcbiAgICB9O1xuXG4gICAgZHJhd0Zyb2dnZXIoY3R4KSB7XG4gICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdncmVlbicpO1xuICAgIH07XG5cbiAgICB0cmlnZ2VyTW92ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMubW92aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUZyb2dnZXJQcmV2UG9zKCk7XG4gICAgICAgICAgICB0aGlzLnNldERpcmVjdGlvbihldmVudCk7XG4gICAgICAgICAgICB0aGlzLm1vdmluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2V0RGlyZWN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdkb3duJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2FsY3VsYXRlRnJvZ2dlclByZXZQb3MoKSB7XG4gICAgICAgIHRoaXMucHJldkRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLnByZXZQb3NYID0gdGhpcy5wb3NYO1xuICAgICAgICB0aGlzLnByZXZQb3NZID0gdGhpcy5wb3NZO1xuICAgIH07XG5cbiAgICByZXZlcnRGcm9nZ2VyUG9zaXRpb24oKSB7XG4gICAgICAgIHRoaXMucG9zWCA9IHRoaXMucHJldlBvc1g7XG4gICAgICAgIHRoaXMucG9zWSA9IHRoaXMucHJldlBvc1k7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5wcmV2RGlyZWN0aW9uO1xuICAgICAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICB9XG5cbiAgICBoYW5kbGVDb2xsaXNpb25zKGJvYXJkLCBncmFzcywgY2FycywgdHVydGxlcywgd29vZHMsIHdpbm5pbmdTcG90cywgY29udGV4dCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBjaGVja0lmT3V0T2ZNYXBBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZkxhc3RMaW5lQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZDYXJBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZlR1cnRsZUFyZWEsXG4gICAgICAgICAgICBjaGVja0lmV29vZEFyZWEsXG4gICAgICAgICAgICBjaGVja0lmV2F0ZXJBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZk91dE9mV2F0ZXJBcmVhXG4gICAgICAgIH0gPSBDaGVja0FyZWE7XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZmluZENvbGxpc2lvbixcbiAgICAgICAgICAgIGNoZWNrT3V0T2ZNYXAsXG4gICAgICAgICAgICBmaW5kVHVydGxlQ29sbGlzaW9uXG4gICAgICAgIH0gPSBDb2xsaXNpb25EZXRlY3Rpb247XG5cbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG5cbiAgICAgICAgICAgIGxldCBibG9ja2Vyc0NvbGxpc2lvbnMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrSWZMYXN0TGluZUFyZWEodGhpcykpIHsgLy8gY2hlY2sgY29sbGlzaW9uIG9uIGxhc3RsaW5lIG9ubHkgaWYgZnJvZ2dlciBpcyBvbiBsYXN0bGluZSBhcmVhXG4gICAgICAgICAgICAgICAgY29uc3Qgd2lubmluZ1Nwb3QgPSBmaW5kQ29sbGlzaW9uKHRoaXMsIHdpbm5pbmdTcG90cyk7XG4gICAgICAgICAgICAgICAgaWYgKHdpbm5pbmdTcG90ICYmICF3aW5uaW5nU3BvdC50YWtlbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSB3aW5uaW5nU3BvdC5wb3NYICsgMTEuMTE7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc1kgPD0gNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lubmluZ1Nwb3QudGFrZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEZyb2dnZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2lubmluZ1Nwb3QudGFrZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tlcnNDb2xsaXNpb25zLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tlcnNDb2xsaXNpb25zLnB1c2goZmluZENvbGxpc2lvbih0aGlzLCBncmFzcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoZWNrSWZPdXRPZk1hcEFyZWEodGhpcykpIHsgLy8gY2hlY2sgbGVhdmluZyBib2FyZCBpZiBmcm9nZ2VyIGlzIGluIHRoZSBlZGdlIG9mIGJvYXJkXG4gICAgICAgICAgICAgICAgYmxvY2tlcnNDb2xsaXNpb25zLnB1c2goY2hlY2tPdXRPZk1hcCh0aGlzLCBib2FyZCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsb2NrZXJzQ29sbGlzaW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChibG9ja2Vyc0NvbGxpc2lvbnNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXZlcnRGcm9nZ2VyUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjaGVja0lmQ2FyQXJlYSh0aGlzKSkgeyAvLyBjaGVjayBjb2xsaXNpb24gd2l0aCBjYXJzIG9ubHkgaWYgZnJvZ2dlciBpcyBpbiAncm9hZCcgYXJlYVxuICAgICAgICAgICAgaWYgKGZpbmRDb2xsaXNpb24odGhpcywgY2FycykpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJlc2V0RnJvZ2dlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrSWZUdXJ0bGVBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIHR1cnRsZXMgb25seSBpZiBmcm9nZ2VyIGlzIGluICd0dXJ0bGUnIGFyZWFcbiAgICAgICAgICAgIGNvbnN0IHNhaWxpbmdUdXJ0bGUgPSBmaW5kVHVydGxlQ29sbGlzaW9uKHRoaXMsIHR1cnRsZXMpO1xuICAgICAgICAgICAgaWYgKHNhaWxpbmdUdXJ0bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZ09iaiA9IHNhaWxpbmdUdXJ0bGU7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vdmluZykge1xuICAgICAgICAgICAgICAgICAgICBTYWlsU2VydmljZS5zYWlsKHRoaXMsIHNhaWxpbmdUdXJ0bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hlY2tJZldvb2RBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIHR1cnRsZXMgb25seSBpZiBmcm9nZ2VyIGlzIGluICd3b29kcycgYXJlYVxuICAgICAgICAgICAgY29uc3Qgc2FpbGluZ1dvb2QgPSBmaW5kQ29sbGlzaW9uKHRoaXMsIHdvb2RzKTtcbiAgICAgICAgICAgIGlmIChzYWlsaW5nV29vZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nT2JqID0gc2FpbGluZ1dvb2Q7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vdmluZykge1xuICAgICAgICAgICAgICAgICAgICBTYWlsU2VydmljZS5zYWlsKHRoaXMsIHNhaWxpbmdXb29kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrSWZXYXRlckFyZWEodGhpcykgJiYgIShmaW5kVHVydGxlQ29sbGlzaW9uKHRoaXMsIHR1cnRsZXMpIHx8IGZpbmRDb2xsaXNpb24odGhpcywgd29vZHMpKSkgeyAvLyBjaGVjayBpZiBmcm9nZ2VyIGlzIGluIHdhdGVyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZHJvd25lZCcpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbW92ZSgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2hlY2tJZk91dE9mV2F0ZXJBcmVhXG4gICAgICAgIH0gPSBDaGVja0FyZWE7XG4gICAgICAgIGlmICh0aGlzLm1vdmluZykge1xuICAgICAgICAgICAgbGV0IHNhaWxTcGVlZCA9IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5zYWlsaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2FpbGluZ09iai5kaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgICAgICBzYWlsU3BlZWQgPSB0aGlzLnNhaWxpbmdPYmouc3BlZWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNhaWxpbmdPYmouZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNhaWxTcGVlZCA9IC10aGlzLnNhaWxpbmdPYmouc3BlZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggLT0gdGhpcy5zcGVlZCArIHNhaWxTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1kgLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggKz0gdGhpcy5zcGVlZCAtIHNhaWxTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWSArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm1vdmluZ0NvdW50Kys7XG4gICAgICAgICAgICBpZiAodGhpcy5tb3ZpbmdDb3VudCA+PSA1MCAvIHRoaXMuc3BlZWQpIHsgLy8gZW5kIG9mIG1vdmVtZW50XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tJZk91dE9mV2F0ZXJBcmVhKHRoaXMpKSB7IC8vY2hlY2sgaWYgZnJvZ2dlciBtb3ZlcyBvdXQgb2Ygd2F0ZXIobW92ZXMgZG93biB0dXJ0bGUpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IDUwICogTWF0aC5yb3VuZCh0aGlzLnBvc1ggLyA1MCk7IC8vIGZpeCBmcm9nZ2VyIHBvc2l0aW9uIHdoZW4gbGVhdmluZyB0dXJ0bGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB3YWl0Rm9yRW5kTW92aW5nKGZyb2dnZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKCFmcm9nZ2VyLm1vdmluZykge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJlc2V0RnJvZ2dlcigpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gMzUwO1xuICAgICAgICB0aGlzLnBvc1kgPSA2MDA7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuc2FpbGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNhaWxpbmdPYmogPSBudWxsO1xuICAgIH07XG5cbn1cbiIsImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkL0JvYXJkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQuc2V0Qm9hcmQoKTtcbiAgICAgICAgLy8gdGhpcy5ib2FyZC5zdGFydEJvYXJkKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCgpID0+IHRoaXMuYm9hcmQuZnJvZ2dlci50cmlnZ2VyTW92ZShldmVudCkpO1xuICAgIH1cbn1cbiIsImltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhc3N7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHdpZHRoKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYOztcbiAgICB0aGlzLnBvc1kgPSAwO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICB9O1xuXG4gIGRyYXdHcmFzcyhjdHgpe1xuICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICcjN2VhZWE4Jyk7XG4gIH07XG59O1xuIiwiaW1wb3J0IEdyYXNzIGZyb20gJy4vR3Jhc3MuanMnO1xuXG5jb25zdCBHcmFzc1NlcnZpY2UgPSB7XG4gIGNyZWF0ZUdyYXNzOiAoKSA9PntcbiAgICByZXR1cm4gW1xuICAgICAgLi4uY3JlYXRlU21hbGxHcmFzcygpLFxuICAgICAgLi4uY3JlYXRlQmlnR3Jhc3MoKVxuICAgIF07XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVNtYWxsR3Jhc3MoKXtcbiAgbGV0IGdyYXNzTGVmdCA9IG5ldyBHcmFzcygwLCAyNSk7XG4gIGxldCBncmFzc1JpZ2h0ID0gbmV3IEdyYXNzKDY3NSwgMjUpO1xuICByZXR1cm4gW2dyYXNzTGVmdCwgZ3Jhc3NSaWdodF07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCaWdHcmFzcygpe1xuICBsZXQgZ3Jhc3NBcnIgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDAsIHBvc1ggPSA5Ny4yMjsgaSA8IDQ7IGkrKyl7XG4gICAgbGV0IGdyYXNzID0gbmV3IEdyYXNzKHBvc1gsIDcyLjIyKTtcbiAgICBwb3NYICs9IDE0NC40NDtcbiAgICBncmFzc0Fyci5wdXNoKGdyYXNzKTtcbiAgfVxuICByZXR1cm4gZ3Jhc3NBcnI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHcmFzc1NlcnZpY2U7XG4iLCJpbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbm5pbmdTcG90e1xuICBjb25zdHJ1Y3Rvcihwb3NYKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgIHRoaXMucG9zWSA9IDA7XG4gICAgdGhpcy53aWR0aCA9IDcyLjIyO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgdGhpcy50YWtlbiA9IGZhbHNlO1xuICB9O1xuXG4gIGRyYXdTcG90KGN0eCl7XG4gICAgbGV0IGNvbG9yID0gJyM5ZGRmZTEnO1xuICAgIGlmKHRoaXMudGFrZW4pe1xuICAgICAgY29sb3IgPSAnZ3JlZW4nO1xuICAgIH1cbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBjb2xvcik7XG4gIH07XG59O1xuIiwiaW1wb3J0IFdpbm5pbmdTcG90IGZyb20gJy4vV2lubmluZ1Nwb3QuanMnO1xuXG5jb25zdCBXaW5uaW5nU3BvdFNlcnZpY2UgPSB7XG4gIGNyZWF0ZVdpbm5pbmdTcG90czogKCkgPT57XG4gICAgbGV0IHNwb3RzQXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIHBvc1ggPSAyNTsgaSA8IDU7IGkrKyl7XG4gICAgICBsZXQgc3BvdCA9IG5ldyBXaW5uaW5nU3BvdChwb3NYKTtcbiAgICAgIHBvc1ggKz0gMTQ0LjQ0O1xuICAgICAgc3BvdHNBcnIucHVzaChzcG90KTtcbiAgICB9XG4gICAgcmV0dXJuIHNwb3RzQXJyO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXaW5uaW5nU3BvdFNlcnZpY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbiwgc3BlZWQpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICAgICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB9XG5cbiAgICBtb3ZlKG9iamVjdHMpIHtcbiAgICAgICAgbGV0IG1heDtcbiAgICAgICAgbGV0IG1pbjtcbiAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWCA8IC0xNTApIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gMTg7XG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IDE0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkT2JqcyA9IGZpbHRlck9ianModGhpcywgb2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkT2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmNoZWNrQ29sbGlzaW9uKG9iaikgJiYgYXR0ZW1wdHMgPCAxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA+PTE1ID8gdGhpcy5wb3NYID0gMTQwMCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYIC09IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWCA+IDc1MCkge1xuICAgICAgICAgICAgICAgICAgICBtYXggPSAtNTtcbiAgICAgICAgICAgICAgICAgICAgbWluID0gLTExO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkT2JqcyA9IGZpbHRlck9ianModGhpcywgb2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkT2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmNoZWNrQ29sbGlzaW9uKG9iaikgJiYgYXR0ZW1wdHMgPCAxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA+PTE1ID8gdGhpcy5wb3NYID0gLTEwMDAgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWCArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY2hlY2tDb2xsaXNpb24ob2JqKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgTWF0aC5hYnMob2JqLnBvc1ggLSB0aGlzLnBvc1gpIDwgdGhpcy53aWR0aCArIDUwID8gcmVzdWx0ID0gdHJ1ZSA6IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbn07XG5cbmZ1bmN0aW9uIGZpbHRlck9ianMoY2hlY2tlZE9iaiwgb2Jqcykge1xuICAgIGxldCBmaWx0ZXJlZE9ianMgPSBvYmpzLmZpbHRlcihvYmogPT4gb2JqLmxpbmUgPT09IGNoZWNrZWRPYmoubGluZSk7XG4gICAgbGV0IGluZGV4ID0gZmlsdGVyZWRPYmpzLmluZGV4T2YoY2hlY2tlZE9iaik7XG4gICAgZmlsdGVyZWRPYmpzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkT2Jqcztcbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4vVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgR2VuZXJhdG9ycyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvR2VuZXJhdG9ycy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1cnRsZSBleHRlbmRzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgZGl2aW5nKSB7XG4gICAgICAgIHN1cGVyKHBvc1gpO1xuICAgICAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gVHVydGxlU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpO1xuICAgICAgICB0aGlzLnBvc1kgPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IEdlbmVyYXRvcnMuZ2VuZXJhdGVTcGVlZCh0aGlzLndpZHRoKTtcbiAgICAgICAgdGhpcy5kaXZpbmcgPSBkaXZpbmc7XG4gICAgICAgIHRoaXMuZGl2ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgIHRoaXMuZGl2aW5nQ291bnRlciA9IDA7XG4gICAgfVxuXG4gICAgZHJhd1R1cnRsZShjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGl2aW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXZpbmdDb3VudGVyIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdicm93bicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpdmluZ0NvdW50ZXIgPiAyMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpdmluZ0NvdW50ZXIgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGl2aW5nQ291bnRlcisrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2Jyb3duJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgVHVydGxlIGZyb20gJy4vVHVydGxlLmpzJztcblxuY29uc3QgVHVydGxlU2VydmljZSA9IHtcblxuICAgIGNyZWF0ZVR1cnRsZXM6ICgpID0+IHtcbiAgICAgICAgbGV0IHR1cnRsZXMgPSBbXTtcbiAgICAgICAgbGV0IHBsYWNlZCA9IDA7XG4gICAgICAgIGxldCBsaW5lID0gMTtcbiAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgbGV0IGRpdmluZyA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAocGxhY2VkIDw9IDcpIHtcbiAgICAgICAgICAgIGlmIChwbGFjZWQgPT0gMiB8fCBwbGFjZWQgPT0gNikge1xuICAgICAgICAgICAgICAgIGRpdmluZyA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSB0dXJ0bGVzLmZpbHRlcih0dXJ0bGUgPT4gdHVydGxlLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRUdXJ0bGUpID0+IHtcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkVHVydGxlLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRUdXJ0bGUud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHVydGxlID0gbmV3IFR1cnRsZShwb3NYLCBsaW5lLCBkaXZpbmcpO1xuICAgICAgICAgICAgICAgIHR1cnRsZXMucHVzaCh0dXJ0bGUpO1xuICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGF0dGVtcHRzID4gMTUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHVydGxlID0gbmV3IFR1cnRsZSgtNTAwLCBsaW5lLCBkaXZpbmcpO1xuICAgICAgICAgICAgICAgIHR1cnRsZXMucHVzaCh0dXJ0bGUpO1xuICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGxhY2VkID09IDQpIHtcbiAgICAgICAgICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHVydGxlcztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAyNTA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVXaWR0aDogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGVTZXJ2aWNlO1xuIiwiaW1wb3J0IFdhdGVyU2VydmljZSBmcm9tICcuL1dhdGVyU2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVye1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMucG9zWCA9IDA7XG4gICAgdGhpcy5wb3NZID0gNTA7XG4gICAgdGhpcy5oZWlnaHQgPSAyNTA7XG4gICAgdGhpcy53aWR0aCA9IDcwMDtcbiAgfVxuXG4gIGRyYXdXYXRlcihjdHgpe1xuICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdibHVlJyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFdhdGVyIGZyb20gJy4vV2F0ZXIuanMnO1xuXG5jb25zdCBXYXRlclNlcnZpY2UgPSB7XG4gIGNyZWF0ZVdhdGVyOiAoKSA9PiB7XG4gICAgICBsZXQgd2F0ZXJPYmpzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDcwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3YXRlciA9IG5ldyBXYXRlcihwb3NYLCBsaW5lKTtcbiAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgMVxuICAgICAgICAgICAgd2F0ZXJPYmpzLnB1c2god2F0ZXIpO1xuICAgICAgICAgIGlmIChpICUgMTQgPT0gMCkge1xuICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICAgIHBvc1ggPSAwO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3YXRlck9ianM7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdhdGVyU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBXb29kU2VydmljZSBmcm9tICcuL1dvb2RTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcbmltcG9ydCBHZW5lcmF0b3JzIGZyb20gJy4uLy4uL1V0aWxpdGllcy9HZW5lcmF0b3JzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29vZCBleHRlbmRzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zWCwgbGluZSkge1xuICAgICAgICBzdXBlcihwb3NYKTtcbiAgICAgICAgdGhpcy5saW5lID0gbGluZTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICAgICAgdGhpcy53aWR0aCA9IFdvb2RTZXJ2aWNlLmdlbmVyYXRlV2lkdGgobGluZSlcbiAgICAgICAgdGhpcy5wb3NZID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgICAgICB0aGlzLnNwZWVkID0gR2VuZXJhdG9ycy5nZW5lcmF0ZVNwZWVkKHRoaXMud2lkdGgpO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgfVxuXG4gICAgZHJhd1dvb2QoY3R4KSB7XG4gICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdiZWlnZScpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IFdvb2QgZnJvbSAnLi9Xb29kLmpzJztcblxuY29uc3QgV29vZFNlcnZpY2UgPSB7XG4gICAgICAgIGNyZWF0ZVdvb2Q6ICgpID0+IHtcbiAgICAgICAgICAgIGxldCB3b29kcyA9IFtdO1xuICAgICAgICAgICAgbGV0IHBsYWNlZCA9IDA7XG4gICAgICAgICAgICBsZXQgbGluZSA9IDE7XG4gICAgICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKHBsYWNlZCA8IDgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIDE0IC0gMSkpICsgMSkgKiA1MDtcbiAgICAgICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gd29vZHMuZmlsdGVyKHdvb2QgPT4gd29vZC5saW5lID09PSBsaW5lKTtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZExpbmUuZm9yRWFjaCgoY2hlY2tlZFdvb2QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoY2hlY2tlZFdvb2QucG9zWCAtIHBvc1gpIDwgY2hlY2tlZFdvb2Qud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgd29vZCA9IG5ldyBXb29kKHBvc1gsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICB3b29kcy5wdXNoKHdvb2QpO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGVtcHRzID4gMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZCgtNTAwLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgd29vZHMucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHBsYWNlZCA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSAyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGxhY2VkID09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IDM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIHJldHVybiB3b29kcztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVXaWR0aDogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjUwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDIwMDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDIwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgV29vZFNlcnZpY2U7XG4iLCJjb25zdCBDaGVja0FyZWEgPSB7XG4gICAgY2hlY2tJZk91dE9mTWFwQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmIChmcm9nZ2VyLnBvc1ggPD0gMCB8fCBmcm9nZ2VyLnBvc1ggPj0gNjUwIHx8IGZyb2dnZXIucG9zWSA8PSAwIHx8IGZyb2dnZXIucG9zWSA+PSA2MDApIHtcbiAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZkNhckFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGZyb2dnZXIucG9zWSA+PSAzNTAgJiYgZnJvZ2dlci5wb3NZIDw9IDU1MCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmTGFzdExpbmVBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmIChmcm9nZ2VyLnBvc1kgPD0gNTAgJiYgZnJvZ2dlci5wb3NZID49IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZlR1cnRsZUFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZihmcm9nZ2VyLnBvc1kgPD0gMzAwICYmIGZyb2dnZXIucG9zWSA+PSAxNTApe1xuICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZldvb2RBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgaWYoZnJvZ2dlci5wb3NZIDw9IDI1MCAmJiBmcm9nZ2VyLnBvc1kgPj0gNTApe1xuICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZldhdGVyQXJlYTogKGZyb2dnZXIpID0+e1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgaWYoZnJvZ2dlci5wb3NZIDwgMzAwICYmIGZyb2dnZXIucG9zWSA+IDUwKXtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZPdXRPZldhdGVyQXJlYTogKGZyb2dnZXIpID0+e1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgaWYoZnJvZ2dlci5wb3NZIDw9IDM1MCAmJiBmcm9nZ2VyLnBvc1kgPj0gMzAwKXtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGVja0FyZWE7XG4iLCJjb25zdCBDb2xsaXNpb25EZXRlY3Rpb24gPSB7XG4gICAgY2hlY2tDb2xsaXNpb246IChmcm9nZ2VyLCBvYmopID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IG9iakxlZnRTaWRlID0gb2JqLnBvc1g7IC8vIDE1MFxuICAgICAgICBjb25zdCBvYmpSaWdodFNpZGUgPSBvYmoucG9zWCArIG9iai53aWR0aDsgLy8gMjAwXG4gICAgICAgIGNvbnN0IG9ialRvcFNpZGUgPSBvYmoucG9zWTsgLy8gMFxuICAgICAgICBjb25zdCBvYmpCb3R0b21TaWRlID0gb2JqLnBvc1kgKyBvYmouaGVpZ2h0OyAvLyA1MFxuXG4gICAgICAgIGNvbnN0IGZyb2dnZXJMZWZ0U2lkZSA9IGZyb2dnZXIucG9zWDsgLy8gMTUwXG4gICAgICAgIGNvbnN0IGZyb2dnZXJSaWdodFNpZGUgPSBmcm9nZ2VyLnBvc1ggKyBmcm9nZ2VyLndpZHRoOyAvLyAyMDBcbiAgICAgICAgY29uc3QgZnJvZ2dlclRvcFNpZGUgPSBmcm9nZ2VyLnBvc1k7IC8vIDQ1XG4gICAgICAgIGNvbnN0IGZyb2dnZXJCb3R0b21TaWRlID0gZnJvZ2dlci5wb3NZICsgZnJvZ2dlci5oZWlnaHQ7IC8vIDk1XG5cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAoIChmcm9nZ2VyUmlnaHRTaWRlID4gb2JqTGVmdFNpZGUgJiYgZnJvZ2dlclJpZ2h0U2lkZSA8PSBvYmpSaWdodFNpZGUpIHx8XG4gICAgICAgICAgICAgIChmcm9nZ2VyTGVmdFNpZGUgPCBvYmpSaWdodFNpZGUgJiYgZnJvZ2dlckxlZnRTaWRlID49IG9iakxlZnRTaWRlKSkgJiZcbiAgICAgICAgICAgICAgKGZyb2dnZXJUb3BTaWRlIDwgb2JqQm90dG9tU2lkZSAmJiBmcm9nZ2VyQm90dG9tU2lkZSA+IG9ialRvcFNpZGUpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgZmluZENvbGxpc2lvbjogKGZyb2dnZXIsIG9iamVjdHNBcnIpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdHNBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChDb2xsaXNpb25EZXRlY3Rpb24uY2hlY2tDb2xsaXNpb24oZnJvZ2dlciwgb2JqZWN0c0FycltpXSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBvYmplY3RzQXJyW2ldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBmaW5kVHVydGxlQ29sbGlzaW9uOiAoZnJvZ2dlciwgdHVydGxlc0FycikgPT57IC8vIHdlIG5lZWQgdGhpcyB0byBmaWx0ZXIgZGl2aW5nIHR1cnRsZXNcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGxldCBub3REaXZpbmdUdXJ0bGVzID0gdHVydGxlc0Fyci5maWx0ZXIodHVydGxlID0+ICF0dXJ0bGUuZGl2ZWQpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3REaXZpbmdUdXJ0bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKENvbGxpc2lvbkRldGVjdGlvbi5jaGVja0NvbGxpc2lvbihmcm9nZ2VyLCBub3REaXZpbmdUdXJ0bGVzW2ldKSkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBub3REaXZpbmdUdXJ0bGVzW2ldO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tPdXRPZk1hcDogKGZyb2dnZXIsIGJvYXJkKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGZyb2dnZXIucG9zWCA+IGJvYXJkLndpZHRoIC0gNTAgfHwgZnJvZ2dlci5wb3NYIDwgMCB8fFxuICAgICAgICAgICAgZnJvZ2dlci5wb3NZID4gYm9hcmQuaGVpZ2h0IC0gNTAgfHwgZnJvZ2dlci5wb3NZIDwgMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sbGlzaW9uRGV0ZWN0aW9uO1xuIiwiY29uc3QgRHJhd0Z1bmN0aW9ucyA9IHtcbiAgZHJhd1JlY3Q6IChjdHgsIHBvc1gsIHBvc1ksIHdpZHRoLCBoZWlnaHQsIGNvbG9yKSA9PntcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgucmVjdChwb3NYLCBwb3NZLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gIH0sXG5cbiAgY29sb3JUZXh0OiAoY3R4LCBzaG93V29yZHMsIHRleHRYLCB0ZXh0WSwgY29sb3IpID0+IHtcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgY3R4LmZpbGxUZXh0KHNob3dXb3JkcywgdGV4dFgsIHRleHRZKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEcmF3RnVuY3Rpb25zO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9O1xuXG4gICAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICF0aGlzLmV2ZW50c1tldmVudE5hbWVdID8gdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdIDogZmFsc2U7XG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXG4gICAgICByZXR1cm4gKCkgPT57XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcihldmVudEZuID0+IGZuICE9PSBldmVudEZuKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZW1pdChldmVudE5hbWUsIGRhdGEpe1xuICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgaWYoZXZlbnQpe1xuICAgICAgICBldmVudC5mb3JFYWNoKGZuID0+e1xuICAgICAgICAgIGZuLmNhbGwobnVsbCwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG59XG4iLCJjb25zdCBHZW5lcmF0b3JzID0ge1xuICBnZW5lcmF0ZVNwZWVkOiAod2lkdGgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHdpZHRoICogMSAvIDUwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHZW5lcmF0b3JzO1xuIiwiY29uc3QgU2FpbFNlcnZpY2UgPSB7XG4gICAgc2FpbDogKGZyb2dnZXIsIG9iaikgPT4ge1xuICAgICAgICBpZiAoNTAgKiBNYXRoLnJvdW5kKChmcm9nZ2VyLnBvc1ggLSBvYmoucG9zWCkgLyA1MCkgPT0gb2JqLndpZHRoKSB7XG4gICAgICAgICAgICBmcm9nZ2VyLnBvc1ggPSBvYmoucG9zWCArIG9iai53aWR0aCAtIGZyb2dnZXIud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoNTAgKiBNYXRoLnJvdW5kKChmcm9nZ2VyLnBvc1ggLSBvYmoucG9zWCkgLyA1MCkgPiAwKSB7XG4gICAgICAgICAgICBmcm9nZ2VyLnBvc1ggPSBvYmoucG9zWCArICg1MCAqIE1hdGgucm91bmQoKGZyb2dnZXIucG9zWCAtIG9iai5wb3NYKSAvIDUwKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9nZ2VyLnBvc1ggPSBvYmoucG9zWDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2FpbFNlcnZpY2U7XG5cbi8vIHw0MDB8NDUwfDUwMHxcbi8vICAgICAgICAgICAgfDUzMHxcblxuLy8gNTMwIC0gNDAwID0gMTMwIH4gMTUwXG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0NvbXBvbmVudHMvR2FtZS5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PntcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xufSk7XG4iXX0=
