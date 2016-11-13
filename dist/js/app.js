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

var _BoardService = require('./BoardService.js');

var _BoardService2 = _interopRequireDefault(_BoardService);

var _TurtleService = require('../Turtles/TurtleService.js');

var _TurtleService2 = _interopRequireDefault(_TurtleService);

var _WaterService = require('../Water/WaterService.js');

var _WaterService2 = _interopRequireDefault(_WaterService);

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
        this.frogger = new _Frogger2.default(this.board);
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
                return !turtle.diving ? turtle.drawTurtle(_this.context) : false;
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
            this.frogger.checkCollisions(this.board, this.grass, this.cars, this.turtles, this.woods, this.winningSpots);
        }
    }]);

    return Board;
}();

exports.default = Board;

},{"../../Utilities/DrawFunctions.js":20,"../Cars/CarService.js":4,"../Frogger.js":5,"../LastLineObjs/GrassService.js":8,"../LastLineObjs/WinningSpotService.js":10,"../Turtles/TurtleService.js":13,"../Water/Water.js":14,"../Water/WaterService.js":15,"../Wood/WoodService.js":17,"./BoardService.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BoardService = {};

exports.default = BoardService;

},{}],3:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Car = function (_MovingObject) {
  _inherits(Car, _MovingObject);

  function Car(posX, line, speed) {
    _classCallCheck(this, Car);

    var _this = _possibleConstructorReturn(this, (Car.__proto__ || Object.getPrototypeOf(Car)).call(this, posX));

    _this.line = line;
    _this.speed = speed;
    _this.height = 50;
    _this.width = _CarService2.default.generateWidth(line);
    _this.posY = _CarService2.default.generateYPos(line);
    _this.direction = _CarService2.default.generateDirection(line);
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

},{"../../Utilities/DrawFunctions.js":20,"../MovingObject.js":11,"./CarService":4}],4:[function(require,module,exports){
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
                var car = new _Car2.default(posX, line, 1);
                cars.push(car);
                placed++;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                var _car = new _Car2.default(-500, line, 1);
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

},{"./Car.js":3}],5:[function(require,module,exports){
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

    function Frogger(board, posX, posY, direction, lives) {
        _classCallCheck(this, Frogger);

        var _this = _possibleConstructorReturn(this, (Frogger.__proto__ || Object.getPrototypeOf(Frogger)).call(this));

        _this.height = 50;
        _this.width = 50;
        _this.posX = board.width * 0.5;
        _this.posY = board.height - _this.height;
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
        key: 'checkCollisions',
        value: function checkCollisions(board, grass, cars, turtles, woods, winningSpots) {
            var checkIfOutOfMapArea = _CheckArea2.default.checkIfOutOfMapArea,
                checkIfLastLineArea = _CheckArea2.default.checkIfLastLineArea,
                checkIfCarArea = _CheckArea2.default.checkIfCarArea,
                checkIfTurtleArea = _CheckArea2.default.checkIfTurtleArea,
                checkIfWoodArea = _CheckArea2.default.checkIfWoodArea,
                checkIfWaterArea = _CheckArea2.default.checkIfWaterArea,
                checkIfOutOfWaterArea = _CheckArea2.default.checkIfOutOfWaterArea;
            var findCollision = _CollisionDetection2.default.findCollision,
                checkOutOfMap = _CollisionDetection2.default.checkOutOfMap;


            if (this.moving) {

                var blockersCollisions = [];

                if (checkIfLastLineArea(this)) {
                    // check collision on lastline only if frogger is on lastline area
                    var winningSpot = findCollision(this, winningSpots);
                    if (winningSpot) {
                        this.posX = winningSpot.posX + 11.11;
                        //TODO: add function for reseting frogger
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

            var objsCollisions = [];

            if (checkIfCarArea(this)) {
                // check collision with cars only if frogger is in 'road' area
                objsCollisions.push(findCollision(this, cars));
            }

            if (checkIfTurtleArea(this)) {
                // check collision with turtles only if frogger is in 'turtle' area
                var sailingTurtle = findCollision(this, turtles);
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

            for (var _i = 0; _i < objsCollisions.length; _i++) {
                if (objsCollisions[_i]) {
                    // console.log('kolizja');
                    break;
                }
            };
        }
    }, {
        key: 'move',
        value: function move() {
            var checkIfOutOfWaterArea = _CheckArea2.default.checkIfOutOfWaterArea;

            if (this.moving) {
                var sailSpeed = 0;
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
                if (this.movingCount >= 50 / this.speed) {
                    this.movingCount = 0;
                    this.moving = false;
                    if (checkIfOutOfWaterArea(this)) {
                        //check if frogger moves out of water(moves down turtle)
                        this.posX = 50 * Math.round(this.posX / 50);
                    }
                };
            }
        }
    }]);

    return Frogger;
}(_MovingObject3.default);

exports.default = Frogger;

},{"../Utilities/CheckArea.js":18,"../Utilities/CollisionDetection.js":19,"../Utilities/DrawFunctions.js":20,"../Utilities/SailService.js":21,"./MovingObject.js":11}],6:[function(require,module,exports){
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
  }

  _createClass(WinningSpot, [{
    key: 'drawSpot',
    value: function drawSpot(ctx) {
      _DrawFunctions2.default.drawRect(ctx, this.posX, this.posY, this.width, this.height, '#9ddfe1');
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Turtle = function (_MovingObject) {
  _inherits(Turtle, _MovingObject);

  function Turtle(posX, line, speed, diving) {
    _classCallCheck(this, Turtle);

    var _this = _possibleConstructorReturn(this, (Turtle.__proto__ || Object.getPrototypeOf(Turtle)).call(this, posX));

    _this.line = line;
    _this.speed = speed;
    _this.height = 50;
    _this.width = _TurtleService2.default.generateWidth(line);
    _this.posY = _TurtleService2.default.generateYPos(line);
    _this.diving = diving;
    _this.direction = 'left';
    return _this;
  }

  _createClass(Turtle, [{
    key: 'drawTurtle',
    value: function drawTurtle(ctx) {
      _DrawFunctions2.default.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'brown');
    }
  }]);

  return Turtle;
}(_MovingObject3.default);

exports.default = Turtle;

},{"../../Utilities/DrawFunctions.js":20,"../MovingObject.js":11,"./TurtleService.js":13}],13:[function(require,module,exports){
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
            var posX = (Math.floor(Math.random() * (1 + 14 - 1)) + 1) * 50;
            var available = true;
            var filteredLine = turtles.filter(function (turtle) {
                return turtle.line === line;
            });
            filteredLine.forEach(function (checkedTurtle) {
                Math.abs(checkedTurtle.posX - posX) < checkedTurtle.width + 50 ? available = false : false;
            });
            if (available) {
                if (placed == 2 || placed == 6) {
                    diving = true;
                } else {
                    diving = false;
                }
                var turtle = new _Turtle2.default(posX, line, 1, diving);
                turtles.push(turtle);
                placed++;
                attempts = 0;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                var _turtle = new _Turtle2.default(-500, line, 1, diving);
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wood = function (_MovingObject) {
  _inherits(Wood, _MovingObject);

  function Wood(posX, line, speed) {
    _classCallCheck(this, Wood);

    var _this = _possibleConstructorReturn(this, (Wood.__proto__ || Object.getPrototypeOf(Wood)).call(this, posX));

    _this.line = line;
    _this.speed = speed;
    _this.height = 50;
    _this.width = _WoodService2.default.generateWidth(line);
    _this.posY = _WoodService2.default.generateYPos(line);
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

},{"../../Utilities/DrawFunctions.js":20,"../MovingObject.js":11,"./WoodService.js":17}],17:[function(require,module,exports){
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
                var wood = new _Wood2.default(posX, line, 1);
                woods.push(wood);
                placed++;
                attempts = 0;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                var _wood = new _Wood2.default(-500, line, 1);
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
    if (frogger.posY <= 300 && frogger.posY >= 50) {
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

    checkOutOfMap: function checkOutOfMap(frogger, board) {
        var result = false;
        if (frogger.posX > board.width - 50 || frogger.posX < 0 || frogger.posY > board.height - 50 || frogger.posY < 0) {
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
    ctx.fillStyle = color;
    ctx.fillText(showWords, textX, textY);
  }
};

exports.default = DrawFunctions;

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
'use strict';

var _Game = require('./Components/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./Components/Game.js":6}]},{},[22])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3MuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3NTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90U2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL01vdmluZ09iamVjdC5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9XYXRlci9XYXRlclNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2RTZXJ2aWNlLmpzIiwic3JjL2pzL1V0aWxpdGllcy9DaGVja0FyZWEuanMiLCJzcmMvanMvVXRpbGl0aWVzL0NvbGxpc2lvbkRldGVjdGlvbi5qcyIsInNyYy9qcy9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyIsInNyYy9qcy9VdGlsaXRpZXMvU2FpbFNlcnZpY2UuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVz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LEVBQXlEO0FBQzVELG9CQUFRLElBQVIsR0FBZSxJQUFJLElBQUosR0FBWSxLQUFLLEtBQUssS0FBTCxDQUFXLENBQUMsUUFBUSxJQUFSLEdBQWUsSUFBSSxJQUFwQixJQUE0QixFQUF2QyxDQUFoQztBQUNILFNBRk0sTUFFQTtBQUNILG9CQUFRLElBQVIsR0FBZSxJQUFJLElBQW5CO0FBQ0g7QUFDSjtBQVRlLENBQXBCOztrQkFZZSxXOztBQUVmO0FBQ0E7O0FBRUE7Ozs7O0FDakJBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFLO0FBQ2pELE1BQUksT0FBTyxvQkFBWDtBQUNBLE9BQUssU0FBTDtBQUNELENBSEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEZyb2dnZXIgZnJvbSAnLi4vRnJvZ2dlci5qcyc7XG5pbXBvcnQgV2F0ZXIgZnJvbSAnLi4vV2F0ZXIvV2F0ZXIuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi4vQ2Fycy9DYXJTZXJ2aWNlLmpzJztcbmltcG9ydCBCb2FyZFNlcnZpY2UgZnJvbSAnLi9Cb2FyZFNlcnZpY2UuanMnO1xuaW1wb3J0IFR1cnRsZVNlcnZpY2UgZnJvbSAnLi4vVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzJztcbmltcG9ydCBXYXRlclNlcnZpY2UgZnJvbSAnLi4vV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzJztcbmltcG9ydCBXb29kU2VydmljZSBmcm9tICcuLi9Xb29kL1dvb2RTZXJ2aWNlLmpzJztcbmltcG9ydCBHcmFzc1NlcnZpY2UgZnJvbSAnLi4vTGFzdExpbmVPYmpzL0dyYXNzU2VydmljZS5qcyc7XG5pbXBvcnQgV2lubmluZ1Nwb3RTZXJ2aWNlIGZyb20gJy4uL0xhc3RMaW5lT2Jqcy9XaW5uaW5nU3BvdFNlcnZpY2UuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuYm9hcmQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLndhdGVyID0gbmV3IFdhdGVyKCk7XG4gICAgICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKHRoaXMuYm9hcmQpO1xuICAgICAgICB0aGlzLmNhcnMgPSBDYXJTZXJ2aWNlLmNyZWF0ZUNhcnMoKTtcbiAgICAgICAgdGhpcy50dXJ0bGVzID0gVHVydGxlU2VydmljZS5jcmVhdGVUdXJ0bGVzKCk7XG4gICAgICAgIHRoaXMud29vZHMgPSBXb29kU2VydmljZS5jcmVhdGVXb29kKCk7XG4gICAgICAgIHRoaXMuZ3Jhc3MgPSBHcmFzc1NlcnZpY2UuY3JlYXRlR3Jhc3MoKTtcbiAgICAgICAgdGhpcy53aW5uaW5nU3BvdHMgPSBXaW5uaW5nU3BvdFNlcnZpY2UuY3JlYXRlV2lubmluZ1Nwb3RzKCk7XG4gICAgfVxuXG4gICAgc2V0Qm9hcmQoKSB7XG4gICAgICAgIHRoaXMuZHJhd0FsbCgpO1xuICAgICAgICB0aGlzLm1vdmVBbGwoKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc2V0Qm9hcmQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgZHJhd0FsbCgpe1xuICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmJvYXJkLndpZHRoLCB0aGlzLmJvYXJkLmhlaWdodCk7IC8vIGNsZWFyIGJvYXJkXG4gICAgICB0aGlzLndhdGVyLmRyYXdXYXRlcih0aGlzLmNvbnRleHQpOyAvLyBkcmF3IFdhdGVyXG4gICAgICB0aGlzLmdyYXNzLmZvckVhY2goZ3Jhc3MgPT4gZ3Jhc3MuZHJhd0dyYXNzKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IEdyYXNzXG4gICAgICB0aGlzLndpbm5pbmdTcG90cy5mb3JFYWNoKHNwb3QgPT4gc3BvdC5kcmF3U3BvdCh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyB3aW5uaW5nU3BvdHNcbiAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIuZHJhd0Nhcih0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBDYXJzXG4gICAgICB0aGlzLnR1cnRsZXMuZm9yRWFjaCh0dXJ0bGUgPT4gIXR1cnRsZS5kaXZpbmcgPyB0dXJ0bGUuZHJhd1R1cnRsZSh0aGlzLmNvbnRleHQpIDogZmFsc2UpOyAvLyBkcmF3IFR1cnRsZXNcbiAgICAgIHRoaXMud29vZHMuZm9yRWFjaCh3b29kID0+IHdvb2QuZHJhd1dvb2QodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgV29vZHNcbiAgICAgIHRoaXMuZnJvZ2dlci5kcmF3RnJvZ2dlcih0aGlzLmNvbnRleHQpOyAvLyBkcmF3IEZyb2dnZXJcblxuICAgICAgRHJhd0Z1bmN0aW9ucy5jb2xvclRleHQodGhpcy5jb250ZXh0LCAncG9zWDogJyArIHRoaXMuZnJvZ2dlci5wb3NYICsgJywgcG9zWTogJyArIHRoaXMuZnJvZ2dlci5wb3NZLCB0aGlzLmZyb2dnZXIucG9zWCwgdGhpcy5mcm9nZ2VyLnBvc1ksICdibGFjaycpOyAvLyBjaGVhdCB0byBkaXNwbGF5IGZyb2dnZXIgcG9zaXRvblxuICAgIH1cblxuICAgIG1vdmVBbGwoKXtcbiAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIubW92ZSh0aGlzLmNhcnMpKTsgLy8gbW92ZSBDYXJzXG4gICAgICB0aGlzLnR1cnRsZXMuZm9yRWFjaCh0dXJ0bGUgPT4gdHVydGxlLm1vdmUodGhpcy50dXJ0bGVzKSk7IC8vIG1vdmUgVHVydGxlc1xuICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5tb3ZlKHRoaXMud29vZHMpKTsgLy8gbW92ZSBXb29kc1xuICAgICAgdGhpcy5mcm9nZ2VyLm1vdmUoKTtcbiAgICAgIHRoaXMuZnJvZ2dlci5jaGVja0NvbGxpc2lvbnModGhpcy5ib2FyZCwgdGhpcy5ncmFzcywgdGhpcy5jYXJzLCB0aGlzLnR1cnRsZXMsIHRoaXMud29vZHMsIHRoaXMud2lubmluZ1Nwb3RzKTtcbiAgICB9XG59XG4iLCJjb25zdCBCb2FyZFNlcnZpY2UgPSB7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJvYXJkU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4vQ2FyU2VydmljZSc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhciBleHRlbmRzIE1vdmluZ09iamVjdHtcblxuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lLCBzcGVlZCl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB0aGlzLndpZHRoID0gQ2FyU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpO1xuICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gQ2FyU2VydmljZS5nZW5lcmF0ZURpcmVjdGlvbihsaW5lKTtcbiAgfVxuXG4gIGRyYXdDYXIoY3R4KSB7XG4gICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ3JlZCcpO1xuICB9XG5cbn1cbiIsImltcG9ydCBDYXIgZnJvbSAnLi9DYXIuanMnO1xuXG5jb25zdCBDYXJTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlQ2FyczogKCkgPT4ge1xuICAgICAgICBsZXQgY2FycyA9IFtdO1xuICAgICAgICBsZXQgcGxhY2VkID0gMDtcbiAgICAgICAgbGV0IGxpbmUgPSAxXG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIHdoaWxlIChwbGFjZWQgPD0gMTUpIHtcbiAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gY2Fycy5maWx0ZXIoY2FyID0+IGNhci5saW5lID09PSBsaW5lKTtcbiAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkQ2FyKSA9PiB7XG4gICAgICAgICAgICAgICAgTWF0aC5hYnMoY2hlY2tlZENhci5wb3NYIC0gcG9zWCkgPCBjaGVja2VkQ2FyLndpZHRoICsgNTAgPyBhdmFpbGFibGUgPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIocG9zWCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIoLTUwMCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGFjZWQgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjYXJzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiA1NTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA0NTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDQwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMzUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVEaXJlY3Rpb246IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5pbXBvcnQgQ2hlY2tBcmVhIGZyb20gJy4uL1V0aWxpdGllcy9DaGVja0FyZWEuanMnO1xuaW1wb3J0IENvbGxpc2lvbkRldGVjdGlvbiBmcm9tICcuLi9VdGlsaXRpZXMvQ29sbGlzaW9uRGV0ZWN0aW9uLmpzJztcbmltcG9ydCBTYWlsU2VydmljZSBmcm9tICcuLi9VdGlsaXRpZXMvU2FpbFNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9nZ2VyIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCwgcG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBsaXZlcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gNTA7XG4gICAgICAgIHRoaXMucG9zWCA9IGJvYXJkLndpZHRoICogMC41O1xuICAgICAgICB0aGlzLnBvc1kgPSBib2FyZC5oZWlnaHQgLSB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy5wcmV2UG9zWCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldlBvc1kgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZEaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnNhaWxpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zYWlsaW5nT2JqID0gbnVsbDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDU7XG4gICAgICAgIHRoaXMubGl2ZXMgPSAzO1xuICAgIH07XG5cbiAgICBkcmF3RnJvZ2dlcihjdHgpIHtcbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2dyZWVuJyk7XG4gICAgfTtcblxuICAgIHRyaWdnZXJNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlRnJvZ2dlclByZXZQb3MoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzZXREaXJlY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjYWxjdWxhdGVGcm9nZ2VyUHJldlBvcygpIHtcbiAgICAgICAgdGhpcy5wcmV2RGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb247XG4gICAgICAgIHRoaXMucHJldlBvc1ggPSB0aGlzLnBvc1g7XG4gICAgICAgIHRoaXMucHJldlBvc1kgPSB0aGlzLnBvc1k7XG4gICAgfTtcblxuICAgIHJldmVydEZyb2dnZXJQb3NpdGlvbigpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gdGhpcy5wcmV2UG9zWDtcbiAgICAgICAgdGhpcy5wb3NZID0gdGhpcy5wcmV2UG9zWTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLnByZXZEaXJlY3Rpb247XG4gICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9ucyhib2FyZCwgZ3Jhc3MsIGNhcnMsIHR1cnRsZXMsIHdvb2RzLCB3aW5uaW5nU3BvdHMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2hlY2tJZk91dE9mTWFwQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZMYXN0TGluZUFyZWEsXG4gICAgICAgICAgICBjaGVja0lmQ2FyQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZUdXJ0bGVBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZldvb2RBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZldhdGVyQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZPdXRPZldhdGVyQXJlYVxuICAgICAgICB9ID0gQ2hlY2tBcmVhO1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGZpbmRDb2xsaXNpb24sXG4gICAgICAgICAgICBjaGVja091dE9mTWFwXG4gICAgICAgIH0gPSBDb2xsaXNpb25EZXRlY3Rpb247XG5cbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG5cbiAgICAgICAgICAgIGxldCBibG9ja2Vyc0NvbGxpc2lvbnMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrSWZMYXN0TGluZUFyZWEodGhpcykpIHsgLy8gY2hlY2sgY29sbGlzaW9uIG9uIGxhc3RsaW5lIG9ubHkgaWYgZnJvZ2dlciBpcyBvbiBsYXN0bGluZSBhcmVhXG4gICAgICAgICAgICAgICAgY29uc3Qgd2lubmluZ1Nwb3QgPSBmaW5kQ29sbGlzaW9uKHRoaXMsIHdpbm5pbmdTcG90cyk7XG4gICAgICAgICAgICAgICAgaWYgKHdpbm5pbmdTcG90KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IHdpbm5pbmdTcG90LnBvc1ggKyAxMS4xMTtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBhZGQgZnVuY3Rpb24gZm9yIHJlc2V0aW5nIGZyb2dnZXJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBibG9ja2Vyc0NvbGxpc2lvbnMucHVzaChmaW5kQ29sbGlzaW9uKHRoaXMsIGdyYXNzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2hlY2tJZk91dE9mTWFwQXJlYSh0aGlzKSkgeyAvLyBjaGVjayBsZWF2aW5nIGJvYXJkIGlmIGZyb2dnZXIgaXMgaW4gdGhlIGVkZ2Ugb2YgYm9hcmRcbiAgICAgICAgICAgICAgICBibG9ja2Vyc0NvbGxpc2lvbnMucHVzaChjaGVja091dE9mTWFwKHRoaXMsIGJvYXJkKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tlcnNDb2xsaXNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrZXJzQ29sbGlzaW9uc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldmVydEZyb2dnZXJQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IG9ianNDb2xsaXNpb25zID0gW107XG5cbiAgICAgICAgaWYgKGNoZWNrSWZDYXJBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIGNhcnMgb25seSBpZiBmcm9nZ2VyIGlzIGluICdyb2FkJyBhcmVhXG4gICAgICAgICAgICBvYmpzQ29sbGlzaW9ucy5wdXNoKGZpbmRDb2xsaXNpb24odGhpcywgY2FycykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrSWZUdXJ0bGVBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIHR1cnRsZXMgb25seSBpZiBmcm9nZ2VyIGlzIGluICd0dXJ0bGUnIGFyZWFcbiAgICAgICAgICAgIGNvbnN0IHNhaWxpbmdUdXJ0bGUgPSBmaW5kQ29sbGlzaW9uKHRoaXMsIHR1cnRsZXMpO1xuICAgICAgICAgICAgaWYgKHNhaWxpbmdUdXJ0bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZ09iaiA9IHNhaWxpbmdUdXJ0bGU7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vdmluZykge1xuICAgICAgICAgICAgICAgICAgICBTYWlsU2VydmljZS5zYWlsKHRoaXMsIHNhaWxpbmdUdXJ0bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hlY2tJZldvb2RBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIHR1cnRsZXMgb25seSBpZiBmcm9nZ2VyIGlzIGluICd3b29kcycgYXJlYVxuICAgICAgICAgICAgY29uc3Qgc2FpbGluZ1dvb2QgPSBmaW5kQ29sbGlzaW9uKHRoaXMsIHdvb2RzKTtcbiAgICAgICAgICAgIGlmIChzYWlsaW5nV29vZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nT2JqID0gc2FpbGluZ1dvb2Q7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vdmluZykge1xuICAgICAgICAgICAgICAgICAgICBTYWlsU2VydmljZS5zYWlsKHRoaXMsIHNhaWxpbmdXb29kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmpzQ29sbGlzaW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG9ianNDb2xsaXNpb25zW2ldKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2tvbGl6amEnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIH07XG5cbiAgICBtb3ZlKCkge1xuICAgICAgY29uc3QgeyBjaGVja0lmT3V0T2ZXYXRlckFyZWEgfSA9IENoZWNrQXJlYTtcbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG4gICAgICAgICAgICBsZXQgc2FpbFNwZWVkID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2FpbGluZyA/IHNhaWxTcGVlZCA9IHRoaXMuc2FpbGluZ09iai5zcGVlZCA6IGZhbHNlO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggLT0gdGhpcy5zcGVlZCArIHNhaWxTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1kgLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggKz0gdGhpcy5zcGVlZCAtIHNhaWxTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWSArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm1vdmluZ0NvdW50Kys7XG4gICAgICAgICAgICBpZiAodGhpcy5tb3ZpbmdDb3VudCA+PSA1MCAvIHRoaXMuc3BlZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmKGNoZWNrSWZPdXRPZldhdGVyQXJlYSh0aGlzKSl7Ly9jaGVjayBpZiBmcm9nZ2VyIG1vdmVzIG91dCBvZiB3YXRlcihtb3ZlcyBkb3duIHR1cnRsZSlcbiAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IDUwICogTWF0aC5yb3VuZCh0aGlzLnBvc1ggLyA1MCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG5cbn1cbiIsImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkL0JvYXJkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQuc2V0Qm9hcmQoKTtcbiAgICAgICAgLy8gdGhpcy5ib2FyZC5zdGFydEJvYXJkKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCgpID0+IHRoaXMuYm9hcmQuZnJvZ2dlci50cmlnZ2VyTW92ZShldmVudCkpO1xuICAgIH1cbn1cbiIsImltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhc3N7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHdpZHRoKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYOztcbiAgICB0aGlzLnBvc1kgPSAwO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICB9O1xuXG4gIGRyYXdHcmFzcyhjdHgpe1xuICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICcjN2VhZWE4Jyk7XG4gIH07XG59O1xuIiwiaW1wb3J0IEdyYXNzIGZyb20gJy4vR3Jhc3MuanMnO1xuXG5jb25zdCBHcmFzc1NlcnZpY2UgPSB7XG4gIGNyZWF0ZUdyYXNzOiAoKSA9PntcbiAgICByZXR1cm4gW1xuICAgICAgLi4uY3JlYXRlU21hbGxHcmFzcygpLFxuICAgICAgLi4uY3JlYXRlQmlnR3Jhc3MoKVxuICAgIF07XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVNtYWxsR3Jhc3MoKXtcbiAgbGV0IGdyYXNzTGVmdCA9IG5ldyBHcmFzcygwLCAyNSk7XG4gIGxldCBncmFzc1JpZ2h0ID0gbmV3IEdyYXNzKDY3NSwgMjUpO1xuICByZXR1cm4gW2dyYXNzTGVmdCwgZ3Jhc3NSaWdodF07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCaWdHcmFzcygpe1xuICBsZXQgZ3Jhc3NBcnIgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDAsIHBvc1ggPSA5Ny4yMjsgaSA8IDQ7IGkrKyl7XG4gICAgbGV0IGdyYXNzID0gbmV3IEdyYXNzKHBvc1gsIDcyLjIyKTtcbiAgICBwb3NYICs9IDE0NC40NDtcbiAgICBncmFzc0Fyci5wdXNoKGdyYXNzKTtcbiAgfVxuICByZXR1cm4gZ3Jhc3NBcnI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHcmFzc1NlcnZpY2U7XG4iLCJpbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbm5pbmdTcG90e1xuICBjb25zdHJ1Y3Rvcihwb3NYKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgIHRoaXMucG9zWSA9IDA7XG4gICAgdGhpcy53aWR0aCA9IDcyLjIyO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gIH07XG5cbiAgZHJhd1Nwb3QoY3R4KXtcbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnIzlkZGZlMScpO1xuICB9O1xufTtcbiIsImltcG9ydCBXaW5uaW5nU3BvdCBmcm9tICcuL1dpbm5pbmdTcG90LmpzJztcblxuY29uc3QgV2lubmluZ1Nwb3RTZXJ2aWNlID0ge1xuICBjcmVhdGVXaW5uaW5nU3BvdHM6ICgpID0+e1xuICAgIGxldCBzcG90c0FyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBwb3NYID0gMjU7IGkgPCA1OyBpKyspe1xuICAgICAgbGV0IHNwb3QgPSBuZXcgV2lubmluZ1Nwb3QocG9zWCk7XG4gICAgICBwb3NYICs9IDE0NC40NDtcbiAgICAgIHNwb3RzQXJyLnB1c2goc3BvdCk7XG4gICAgfVxuICAgIHJldHVybiBzcG90c0FycjtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgV2lubmluZ1Nwb3RTZXJ2aWNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIHNwZWVkKSB7XG4gICAgICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgICAgIHRoaXMucG9zWSA9IHBvc1k7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgfVxuXG4gICAgbW92ZShvYmplY3RzKSB7XG4gICAgICAgIGxldCBtYXg7XG4gICAgICAgIGxldCBtaW47XG4gICAgICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc1ggPCAtMTUwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heCA9IDE4O1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSAxNDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZE9ianMgPSBmaWx0ZXJPYmpzKHRoaXMsIG9iamVjdHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE9ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5jaGVja0NvbGxpc2lvbihvYmopICYmIGF0dGVtcHRzIDwgMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPj0xNSA/IHRoaXMucG9zWCA9IDE0MDAgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWCAtPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc1ggPiA3NTApIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gLTU7XG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IC0xMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZE9ianMgPSBmaWx0ZXJPYmpzKHRoaXMsIG9iamVjdHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE9ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5jaGVja0NvbGxpc2lvbihvYmopICYmIGF0dGVtcHRzIDwgMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPj0xNSA/IHRoaXMucG9zWCA9IC0xMDAwIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1ggKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNoZWNrQ29sbGlzaW9uKG9iaikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIE1hdGguYWJzKG9iai5wb3NYIC0gdGhpcy5wb3NYKSA8IHRoaXMud2lkdGggKyA1MCA/IHJlc3VsdCA9IHRydWUgOiByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG59O1xuXG5mdW5jdGlvbiBmaWx0ZXJPYmpzKGNoZWNrZWRPYmosIG9ianMpIHtcbiAgICBsZXQgZmlsdGVyZWRPYmpzID0gb2Jqcy5maWx0ZXIob2JqID0+IG9iai5saW5lID09PSBjaGVja2VkT2JqLmxpbmUpO1xuICAgIGxldCBpbmRleCA9IGZpbHRlcmVkT2Jqcy5pbmRleE9mKGNoZWNrZWRPYmopO1xuICAgIGZpbHRlcmVkT2Jqcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiBmaWx0ZXJlZE9ianM7XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuL1R1cnRsZVNlcnZpY2UuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdXJ0bGUgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIHNwZWVkLCBkaXZpbmcpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgdGhpcy53aWR0aCA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKTtcbiAgICB0aGlzLnBvc1kgPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpdmluZyA9IGRpdmluZztcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgfVxuXG4gIGRyYXdUdXJ0bGUoY3R4KSB7XG4gICAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnYnJvd24nKTtcbiAgfVxufVxuIiwiaW1wb3J0IFR1cnRsZSBmcm9tICcuL1R1cnRsZS5qcyc7XG5cbmNvbnN0IFR1cnRsZVNlcnZpY2UgPSB7XG5cbiAgICBjcmVhdGVUdXJ0bGVzOiAoKSA9PiB7XG4gICAgICAgIGxldCB0dXJ0bGVzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDE7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIGxldCBkaXZpbmcgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKHBsYWNlZCA8PSA3KSB7XG4gICAgICAgICAgICBsZXQgcG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIDE0IC0gMSkpICsgMSkgKiA1MDtcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGZpbHRlcmVkTGluZSA9IHR1cnRsZXMuZmlsdGVyKHR1cnRsZSA9PiB0dXJ0bGUubGluZSA9PT0gbGluZSk7XG4gICAgICAgICAgICBmaWx0ZXJlZExpbmUuZm9yRWFjaCgoY2hlY2tlZFR1cnRsZSkgPT4ge1xuICAgICAgICAgICAgICAgIE1hdGguYWJzKGNoZWNrZWRUdXJ0bGUucG9zWCAtIHBvc1gpIDwgY2hlY2tlZFR1cnRsZS53aWR0aCArIDUwID8gYXZhaWxhYmxlID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgIGlmKHBsYWNlZCA9PSAyIHx8IHBsYWNlZCA9PSA2KXtcbiAgICAgICAgICAgICAgICAgIGRpdmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICAgZGl2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB0dXJ0bGUgPSBuZXcgVHVydGxlKHBvc1gsIGxpbmUsIDEsIGRpdmluZyk7XG4gICAgICAgICAgICAgICAgdHVydGxlcy5wdXNoKHR1cnRsZSk7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAxNSkge1xuICAgICAgICAgICAgICAgIGxldCB0dXJ0bGUgPSBuZXcgVHVydGxlKC01MDAsIGxpbmUsIDEsIGRpdmluZyk7XG4gICAgICAgICAgICAgICAgdHVydGxlcy5wdXNoKHR1cnRsZSk7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGFjZWQgPT0gNCkge1xuICAgICAgICAgICAgICAgIGxpbmUgPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0dXJ0bGVzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1MDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFR1cnRsZVNlcnZpY2U7XG4iLCJpbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4vV2F0ZXJTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0ZXJ7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5wb3NYID0gMDtcbiAgICB0aGlzLnBvc1kgPSA1MDtcbiAgICB0aGlzLmhlaWdodCA9IDI1MDtcbiAgICB0aGlzLndpZHRoID0gNzAwO1xuICB9XG5cbiAgZHJhd1dhdGVyKGN0eCl7XG4gICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2JsdWUnKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgV2F0ZXIgZnJvbSAnLi9XYXRlci5qcyc7XG5cbmNvbnN0IFdhdGVyU2VydmljZSA9IHtcbiAgY3JlYXRlV2F0ZXI6ICgpID0+IHtcbiAgICAgIGxldCB3YXRlck9ianMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDA7IGkgPD0gNzA7IGkrKykge1xuICAgICAgICAgICAgbGV0IHdhdGVyID0gbmV3IFdhdGVyKHBvc1gsIGxpbmUpO1xuICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyAxXG4gICAgICAgICAgICB3YXRlck9ianMucHVzaCh3YXRlcik7XG4gICAgICAgICAgaWYgKGkgJSAxNCA9PSAwKSB7XG4gICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgICAgcG9zWCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHdhdGVyT2JqcztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgV2F0ZXJTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IFdvb2RTZXJ2aWNlIGZyb20gJy4vV29vZFNlcnZpY2UuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb29kIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lLCBzcGVlZCl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB0aGlzLndpZHRoID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKVxuICAgIHRoaXMucG9zWSA9IFdvb2RTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gIH1cblxuICBkcmF3V29vZChjdHgpIHtcbiAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdiZWlnZScpO1xuICB9XG5cbn0gXG4iLCJpbXBvcnQgV29vZCBmcm9tICcuL1dvb2QuanMnO1xuXG5jb25zdCBXb29kU2VydmljZSA9IHtcbiAgICAgICAgY3JlYXRlV29vZDogKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHdvb2RzID0gW107XG4gICAgICAgICAgICBsZXQgcGxhY2VkID0gMDtcbiAgICAgICAgICAgIGxldCBsaW5lID0gMTtcbiAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICB3aGlsZSAocGxhY2VkIDwgOCkge1xuICAgICAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSB3b29kcy5maWx0ZXIod29vZCA9PiB3b29kLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkV29vZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkV29vZC5wb3NYIC0gcG9zWCkgPCBjaGVja2VkV29vZC53aWR0aCArIDUwID8gYXZhaWxhYmxlID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QocG9zWCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHdvb2RzLnB1c2god29vZCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAxNSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgd29vZCA9IG5ldyBXb29kKC01MDAsIGxpbmUsIDEpO1xuICAgICAgICAgICAgICAgICAgICB3b29kcy5wdXNoKHdvb2QpO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocGxhY2VkID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwbGFjZWQgPT0gNSkge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gMztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdvb2RzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAyNTA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjAwO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMDA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBXb29kU2VydmljZTtcbiIsImNvbnN0IENoZWNrQXJlYSA9IHtcbiAgICBjaGVja0lmT3V0T2ZNYXBBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgaWYgKGZyb2dnZXIucG9zWCA8PSAwIHx8IGZyb2dnZXIucG9zWCA+PSA2NTAgfHwgZnJvZ2dlci5wb3NZIDw9IDAgfHwgZnJvZ2dlci5wb3NZID49IDYwMCkge1xuICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmQ2FyQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAoZnJvZ2dlci5wb3NZID49IDM1MCAmJiBmcm9nZ2VyLnBvc1kgPD0gNTUwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZMYXN0TGluZUFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGZyb2dnZXIucG9zWSA8PSA1MCAmJiBmcm9nZ2VyLnBvc1kgPj0gMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmVHVydGxlQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8PSAzMDAgJiYgZnJvZ2dlci5wb3NZID49IDE1MCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmV29vZEFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZihmcm9nZ2VyLnBvc1kgPD0gMjUwICYmIGZyb2dnZXIucG9zWSA+PSA1MCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmV2F0ZXJBcmVhOiAoZnJvZ2dlcikgPT57XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZihmcm9nZ2VyLnBvc1kgPD0gMzAwICYmIGZyb2dnZXIucG9zWSA+PSA1MCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmT3V0T2ZXYXRlckFyZWE6IChmcm9nZ2VyKSA9PntcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8PSAzNTAgJiYgZnJvZ2dlci5wb3NZID49IDMwMCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tBcmVhO1xuIiwiY29uc3QgQ29sbGlzaW9uRGV0ZWN0aW9uID0ge1xuICAgIGNoZWNrQ29sbGlzaW9uOiAoZnJvZ2dlciwgb2JqKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBvYmpMZWZ0U2lkZSA9IG9iai5wb3NYOyAvLyAxNTBcbiAgICAgICAgY29uc3Qgb2JqUmlnaHRTaWRlID0gb2JqLnBvc1ggKyBvYmoud2lkdGg7IC8vIDIwMFxuICAgICAgICBjb25zdCBvYmpUb3BTaWRlID0gb2JqLnBvc1k7IC8vIDBcbiAgICAgICAgY29uc3Qgb2JqQm90dG9tU2lkZSA9IG9iai5wb3NZICsgb2JqLmhlaWdodDsgLy8gNTBcblxuICAgICAgICBjb25zdCBmcm9nZ2VyTGVmdFNpZGUgPSBmcm9nZ2VyLnBvc1g7IC8vIDE1MFxuICAgICAgICBjb25zdCBmcm9nZ2VyUmlnaHRTaWRlID0gZnJvZ2dlci5wb3NYICsgZnJvZ2dlci53aWR0aDsgLy8gMjAwXG4gICAgICAgIGNvbnN0IGZyb2dnZXJUb3BTaWRlID0gZnJvZ2dlci5wb3NZOyAvLyA0NVxuICAgICAgICBjb25zdCBmcm9nZ2VyQm90dG9tU2lkZSA9IGZyb2dnZXIucG9zWSArIGZyb2dnZXIuaGVpZ2h0OyAvLyA5NVxuXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKChmcm9nZ2VyUmlnaHRTaWRlID4gb2JqTGVmdFNpZGUgJiYgZnJvZ2dlclJpZ2h0U2lkZSA8PSBvYmpSaWdodFNpZGUpIHx8XG4gICAgICAgICAgICAgICAgKGZyb2dnZXJMZWZ0U2lkZSA8IG9ialJpZ2h0U2lkZSAmJiBmcm9nZ2VyTGVmdFNpZGUgPj0gb2JqTGVmdFNpZGUpKSAmJlxuICAgICAgICAgICAgKGZyb2dnZXJUb3BTaWRlIDwgb2JqQm90dG9tU2lkZSAmJiBmcm9nZ2VyQm90dG9tU2lkZSA+IG9ialRvcFNpZGUpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgZmluZENvbGxpc2lvbjogKGZyb2dnZXIsIG9iamVjdHNBcnIpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdHNBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChDb2xsaXNpb25EZXRlY3Rpb24uY2hlY2tDb2xsaXNpb24oZnJvZ2dlciwgb2JqZWN0c0FycltpXSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBvYmplY3RzQXJyW2ldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja091dE9mTWFwOiAoZnJvZ2dlciwgYm9hcmQpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAoZnJvZ2dlci5wb3NYID4gYm9hcmQud2lkdGggLSA1MCB8fCBmcm9nZ2VyLnBvc1ggPCAwIHx8XG4gICAgICAgICAgICBmcm9nZ2VyLnBvc1kgPiBib2FyZC5oZWlnaHQgLSA1MCB8fCBmcm9nZ2VyLnBvc1kgPCAwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xsaXNpb25EZXRlY3Rpb247XG4iLCJjb25zdCBEcmF3RnVuY3Rpb25zID0ge1xuICBkcmF3UmVjdDogKGN0eCwgcG9zWCwgcG9zWSwgd2lkdGgsIGhlaWdodCwgY29sb3IpID0+e1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yZWN0KHBvc1gsIHBvc1ksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfSxcblxuICBjb2xvclRleHQ6IChjdHgsIHNob3dXb3JkcywgdGV4dFgsIHRleHRZLCBjb2xvcikgPT4ge1xuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICBjdHguZmlsbFRleHQoc2hvd1dvcmRzLCB0ZXh0WCwgdGV4dFkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyYXdGdW5jdGlvbnM7XG4iLCJjb25zdCBTYWlsU2VydmljZSA9IHtcbiAgICBzYWlsOiAoZnJvZ2dlciwgb2JqKSA9PiB7XG4gICAgICAgIGlmICg1MCAqIE1hdGgucm91bmQoKGZyb2dnZXIucG9zWCAtIG9iai5wb3NYKSAvIDUwKSA9PSBvYmoud2lkdGgpIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYICsgb2JqLndpZHRoIC0gZnJvZ2dlci53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmICg1MCAqIE1hdGgucm91bmQoKGZyb2dnZXIucG9zWCAtIG9iai5wb3NYKSAvIDUwKSA+IDApIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYICsgKDUwICogTWF0aC5yb3VuZCgoZnJvZ2dlci5wb3NYIC0gb2JqLnBvc1gpIC8gNTApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IG9iai5wb3NYO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTYWlsU2VydmljZTtcblxuLy8gfDQwMHw0NTB8NTAwfFxuLy8gICAgICAgICAgICB8NTMwfFxuXG4vLyA1MzAgLSA0MDAgPSAxMzAgfiAxNTBcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vQ29tcG9uZW50cy9HYW1lLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+e1xuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG59KTtcbiJdfQ==
