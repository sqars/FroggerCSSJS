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
            this.frogger.checkCollisions(this.board, this.grass, this.cars, this.turtles, this.winningSpots);
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

var _BoardService = require('./Board/BoardService.js');

var _BoardService2 = _interopRequireDefault(_BoardService);

var _CheckArea = require('../Utilities/CheckArea.js');

var _CheckArea2 = _interopRequireDefault(_CheckArea);

var _CollisionDetection = require('../Utilities/CollisionDetection.js');

var _CollisionDetection2 = _interopRequireDefault(_CollisionDetection);

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
        value: function checkCollisions(board, grass, cars, turtles, winningSpots) {
            var checkIfOutOfMapArea = _CheckArea2.default.checkIfOutOfMapArea,
                checkIfLastLineArea = _CheckArea2.default.checkIfLastLineArea,
                checkIfCarArea = _CheckArea2.default.checkIfCarArea,
                checkIfTurtleArea = _CheckArea2.default.checkIfTurtleArea;
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

            var movingObjsCollisions = [];

            if (checkIfCarArea(this)) {
                // check collision with cars only if frogger is in 'road' area
                movingObjsCollisions.push(findCollision(this, cars));
            }

            if (checkIfTurtleArea(this)) {
                // check collision with turtles only if frogger is in 'turtle' area
                movingObjsCollisions.push(findCollision(this, turtles));
            }

            for (var _i = 0; _i < movingObjsCollisions.length; _i++) {
                if (movingObjsCollisions[_i]) {
                    console.log('kolizja');
                    break;
                }
            };
        }
    }, {
        key: 'move',
        value: function move() {
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
        }
    }]);

    return Frogger;
}(_MovingObject3.default);

exports.default = Frogger;

},{"../Utilities/CheckArea.js":18,"../Utilities/CollisionDetection.js":19,"../Utilities/DrawFunctions.js":20,"./Board/BoardService.js":2,"./MovingObject.js":11}],6:[function(require,module,exports){
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

  function Turtle(posX, line, speed) {
    _classCallCheck(this, Turtle);

    var _this = _possibleConstructorReturn(this, (Turtle.__proto__ || Object.getPrototypeOf(Turtle)).call(this, posX));

    _this.line = line;
    _this.speed = speed;
    _this.height = 50;
    _this.width = _TurtleService2.default.generateWidth(line);
    _this.posY = _TurtleService2.default.generateYPos(line);
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
                var turtle = new _Turtle2.default(posX, line, 1);
                turtles.push(turtle);
                placed++;
                attempts = 0;
            } else {
                attempts++;
            }

            if (attempts > 15) {
                var _turtle = new _Turtle2.default(-500, line, 1);
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
'use strict';

var _Game = require('./Components/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./Components/Game.js":6}]},{},[21])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3MuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3NTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90U2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL01vdmluZ09iamVjdC5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9XYXRlci9XYXRlclNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2RTZXJ2aWNlLmpzIiwic3JjL2pzL1V0aWxpdGllcy9DaGVja0FyZWEuanMiLCJzcmMvanMvVXRpbGl0aWVzL0NvbGxpc2lvbkRldGVjdGlvbi5qcyIsInNyYy9qcy9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyIsInNyYy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FB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L0I7QUFDRDtBQVptQixDQUF0Qjs7a0JBZWUsYTs7Ozs7QUNmZjs7Ozs7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBSztBQUNqRCxNQUFJLE9BQU8sb0JBQVg7QUFDQSxPQUFLLFNBQUw7QUFDRCxDQUhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBGcm9nZ2VyIGZyb20gJy4uL0Zyb2dnZXIuanMnO1xuaW1wb3J0IFdhdGVyIGZyb20gJy4uL1dhdGVyL1dhdGVyLmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4uL0NhcnMvQ2FyU2VydmljZS5qcyc7XG5pbXBvcnQgQm9hcmRTZXJ2aWNlIGZyb20gJy4vQm9hcmRTZXJ2aWNlLmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4uL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4uL1dhdGVyL1dhdGVyU2VydmljZS5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi4vV29vZC9Xb29kU2VydmljZS5qcyc7XG5pbXBvcnQgR3Jhc3NTZXJ2aWNlIGZyb20gJy4uL0xhc3RMaW5lT2Jqcy9HcmFzc1NlcnZpY2UuanMnO1xuaW1wb3J0IFdpbm5pbmdTcG90U2VydmljZSBmcm9tICcuLi9MYXN0TGluZU9ianMvV2lubmluZ1Nwb3RTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmJvYXJkLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy53YXRlciA9IG5ldyBXYXRlcigpO1xuICAgICAgICB0aGlzLmZyb2dnZXIgPSBuZXcgRnJvZ2dlcih0aGlzLmJvYXJkKTtcbiAgICAgICAgdGhpcy5jYXJzID0gQ2FyU2VydmljZS5jcmVhdGVDYXJzKCk7XG4gICAgICAgIHRoaXMudHVydGxlcyA9IFR1cnRsZVNlcnZpY2UuY3JlYXRlVHVydGxlcygpO1xuICAgICAgICB0aGlzLndvb2RzID0gV29vZFNlcnZpY2UuY3JlYXRlV29vZCgpO1xuICAgICAgICB0aGlzLmdyYXNzID0gR3Jhc3NTZXJ2aWNlLmNyZWF0ZUdyYXNzKCk7XG4gICAgICAgIHRoaXMud2lubmluZ1Nwb3RzID0gV2lubmluZ1Nwb3RTZXJ2aWNlLmNyZWF0ZVdpbm5pbmdTcG90cygpO1xuICAgIH1cblxuICAgIHNldEJvYXJkKCkge1xuICAgICAgICB0aGlzLmRyYXdBbGwoKTtcbiAgICAgICAgdGhpcy5tb3ZlQWxsKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnNldEJvYXJkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGRyYXdBbGwoKXtcbiAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5ib2FyZC53aWR0aCwgdGhpcy5ib2FyZC5oZWlnaHQpOyAvLyBjbGVhciBib2FyZFxuICAgICAgdGhpcy53YXRlci5kcmF3V2F0ZXIodGhpcy5jb250ZXh0KTsgLy8gZHJhdyBXYXRlclxuICAgICAgdGhpcy5ncmFzcy5mb3JFYWNoKGdyYXNzID0+IGdyYXNzLmRyYXdHcmFzcyh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBHcmFzc1xuICAgICAgdGhpcy53aW5uaW5nU3BvdHMuZm9yRWFjaChzcG90ID0+IHNwb3QuZHJhd1Nwb3QodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgd2lubmluZ1Nwb3RzXG4gICAgICB0aGlzLmNhcnMuZm9yRWFjaChjYXIgPT4gY2FyLmRyYXdDYXIodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgQ2Fyc1xuICAgICAgdGhpcy50dXJ0bGVzLmZvckVhY2godHVydGxlID0+IHR1cnRsZS5kcmF3VHVydGxlKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IFR1cnRsZXNcbiAgICAgIHRoaXMud29vZHMuZm9yRWFjaCh3b29kID0+IHdvb2QuZHJhd1dvb2QodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgV29vZHNcbiAgICAgIHRoaXMuZnJvZ2dlci5kcmF3RnJvZ2dlcih0aGlzLmNvbnRleHQpOyAvLyBkcmF3IEZyb2dnZXJcblxuICAgICAgRHJhd0Z1bmN0aW9ucy5jb2xvclRleHQodGhpcy5jb250ZXh0LCAncG9zWDogJyArIHRoaXMuZnJvZ2dlci5wb3NYICsgJywgcG9zWTogJyArIHRoaXMuZnJvZ2dlci5wb3NZLCB0aGlzLmZyb2dnZXIucG9zWCwgdGhpcy5mcm9nZ2VyLnBvc1ksICdibGFjaycpOyAvLyBjaGVhdCB0byBkaXNwbGF5IGZyb2dnZXIgcG9zaXRvblxuICAgIH1cblxuICAgIG1vdmVBbGwoKXtcbiAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIubW92ZSh0aGlzLmNhcnMpKTsgLy8gbW92ZSBDYXJzXG4gICAgICB0aGlzLnR1cnRsZXMuZm9yRWFjaCh0dXJ0bGUgPT4gdHVydGxlLm1vdmUodGhpcy50dXJ0bGVzKSk7IC8vIG1vdmUgVHVydGxlc1xuICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5tb3ZlKHRoaXMud29vZHMpKTsgLy8gbW92ZSBXb29kc1xuICAgICAgdGhpcy5mcm9nZ2VyLm1vdmUoKTtcbiAgICAgIHRoaXMuZnJvZ2dlci5jaGVja0NvbGxpc2lvbnModGhpcy5ib2FyZCwgdGhpcy5ncmFzcywgdGhpcy5jYXJzLCB0aGlzLnR1cnRsZXMsIHRoaXMud2lubmluZ1Nwb3RzKTtcbiAgICB9XG59XG4iLCJjb25zdCBCb2FyZFNlcnZpY2UgPSB7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJvYXJkU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4vQ2FyU2VydmljZSc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhciBleHRlbmRzIE1vdmluZ09iamVjdHtcblxuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lLCBzcGVlZCl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB0aGlzLndpZHRoID0gQ2FyU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpO1xuICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gQ2FyU2VydmljZS5nZW5lcmF0ZURpcmVjdGlvbihsaW5lKTtcbiAgfVxuXG4gIGRyYXdDYXIoY3R4KSB7XG4gICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ3JlZCcpO1xuICB9XG5cbn1cbiIsImltcG9ydCBDYXIgZnJvbSAnLi9DYXIuanMnO1xuXG5jb25zdCBDYXJTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlQ2FyczogKCkgPT4ge1xuICAgICAgICBsZXQgY2FycyA9IFtdO1xuICAgICAgICBsZXQgcGxhY2VkID0gMDtcbiAgICAgICAgbGV0IGxpbmUgPSAxXG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIHdoaWxlIChwbGFjZWQgPD0gMTUpIHtcbiAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gY2Fycy5maWx0ZXIoY2FyID0+IGNhci5saW5lID09PSBsaW5lKTtcbiAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkQ2FyKSA9PiB7XG4gICAgICAgICAgICAgICAgTWF0aC5hYnMoY2hlY2tlZENhci5wb3NYIC0gcG9zWCkgPCBjaGVja2VkQ2FyLndpZHRoICsgNTAgPyBhdmFpbGFibGUgPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIocG9zWCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIoLTUwMCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGFjZWQgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjYXJzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiA1NTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA0NTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDQwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMzUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVEaXJlY3Rpb246IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuaW1wb3J0IEJvYXJkU2VydmljZSBmcm9tICcuL0JvYXJkL0JvYXJkU2VydmljZS5qcyc7XG5cbmltcG9ydCBDaGVja0FyZWEgZnJvbSAnLi4vVXRpbGl0aWVzL0NoZWNrQXJlYS5qcyc7XG5pbXBvcnQgQ29sbGlzaW9uRGV0ZWN0aW9uIGZyb20gJy4uL1V0aWxpdGllcy9Db2xsaXNpb25EZXRlY3Rpb24uanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9nZ2VyIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCwgcG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBsaXZlcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gNTA7XG4gICAgICAgIHRoaXMucG9zWCA9IGJvYXJkLndpZHRoICogMC41O1xuICAgICAgICB0aGlzLnBvc1kgPSBib2FyZC5oZWlnaHQgLSB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy5wcmV2UG9zWCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldlBvc1kgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZEaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnNwZWVkID0gNTtcbiAgICAgICAgdGhpcy5saXZlcyA9IDM7XG4gICAgfTtcblxuICAgIGRyYXdGcm9nZ2VyKGN0eCkge1xuICAgICAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnZ3JlZW4nKTtcbiAgICB9O1xuXG4gICAgdHJpZ2dlck1vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vdmluZykge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVGcm9nZ2VyUHJldlBvcygpO1xuICAgICAgICAgICAgdGhpcy5zZXREaXJlY3Rpb24oZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5tb3ZpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHNldERpcmVjdGlvbihldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnZG93bic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNhbGN1bGF0ZUZyb2dnZXJQcmV2UG9zKCkge1xuICAgICAgICB0aGlzLnByZXZEaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICAgICAgdGhpcy5wcmV2UG9zWCA9IHRoaXMucG9zWDtcbiAgICAgICAgdGhpcy5wcmV2UG9zWSA9IHRoaXMucG9zWTtcbiAgICB9O1xuXG4gICAgcmV2ZXJ0RnJvZ2dlclBvc2l0aW9uKCkge1xuICAgICAgICB0aGlzLnBvc1ggPSB0aGlzLnByZXZQb3NYO1xuICAgICAgICB0aGlzLnBvc1kgPSB0aGlzLnByZXZQb3NZO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMucHJldkRpcmVjdGlvbjtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb25zKGJvYXJkLCBncmFzcywgY2FycywgdHVydGxlcywgd2lubmluZ1Nwb3RzKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNoZWNrSWZPdXRPZk1hcEFyZWEsXG4gICAgICAgICAgICBjaGVja0lmTGFzdExpbmVBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZkNhckFyZWEsXG4gICAgICAgICAgICBjaGVja0lmVHVydGxlQXJlYVxuICAgICAgICB9ID0gQ2hlY2tBcmVhO1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGZpbmRDb2xsaXNpb24sXG4gICAgICAgICAgICBjaGVja091dE9mTWFwXG4gICAgICAgIH0gPSBDb2xsaXNpb25EZXRlY3Rpb247XG5cbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG5cbiAgICAgICAgICAgIGxldCBibG9ja2Vyc0NvbGxpc2lvbnMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrSWZMYXN0TGluZUFyZWEodGhpcykpIHsgLy8gY2hlY2sgY29sbGlzaW9uIG9uIGxhc3RsaW5lIG9ubHkgaWYgZnJvZ2dlciBpcyBvbiBsYXN0bGluZSBhcmVhXG4gICAgICAgICAgICAgICAgY29uc3Qgd2lubmluZ1Nwb3QgPSBmaW5kQ29sbGlzaW9uKHRoaXMsIHdpbm5pbmdTcG90cyk7XG4gICAgICAgICAgICAgICAgaWYgKHdpbm5pbmdTcG90KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IHdpbm5pbmdTcG90LnBvc1ggKyAxMS4xMTtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBhZGQgZnVuY3Rpb24gZm9yIHJlc2V0aW5nIGZyb2dnZXJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBibG9ja2Vyc0NvbGxpc2lvbnMucHVzaChmaW5kQ29sbGlzaW9uKHRoaXMsIGdyYXNzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2hlY2tJZk91dE9mTWFwQXJlYSh0aGlzKSkgeyAvLyBjaGVjayBsZWF2aW5nIGJvYXJkIGlmIGZyb2dnZXIgaXMgaW4gdGhlIGVkZ2Ugb2YgYm9hcmRcbiAgICAgICAgICAgICAgICBibG9ja2Vyc0NvbGxpc2lvbnMucHVzaChjaGVja091dE9mTWFwKHRoaXMsIGJvYXJkKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tlcnNDb2xsaXNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrZXJzQ29sbGlzaW9uc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldmVydEZyb2dnZXJQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IG1vdmluZ09ianNDb2xsaXNpb25zID0gW107XG5cbiAgICAgICAgaWYgKGNoZWNrSWZDYXJBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIGNhcnMgb25seSBpZiBmcm9nZ2VyIGlzIGluICdyb2FkJyBhcmVhXG4gICAgICAgICAgICBtb3ZpbmdPYmpzQ29sbGlzaW9ucy5wdXNoKGZpbmRDb2xsaXNpb24odGhpcywgY2FycykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrSWZUdXJ0bGVBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIHR1cnRsZXMgb25seSBpZiBmcm9nZ2VyIGlzIGluICd0dXJ0bGUnIGFyZWFcbiAgICAgICAgICAgIG1vdmluZ09ianNDb2xsaXNpb25zLnB1c2goZmluZENvbGxpc2lvbih0aGlzLCB0dXJ0bGVzKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmluZ09ianNDb2xsaXNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobW92aW5nT2Jqc0NvbGxpc2lvbnNbaV0pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygna29saXpqYScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfTtcblxuICAgIG1vdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmluZykge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1kgLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWSArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm1vdmluZ0NvdW50Kys7XG4gICAgICAgICAgICBpZiAodGhpcy5tb3ZpbmdDb3VudCA+PSA1MCAvIHRoaXMuc3BlZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG5cbn1cbiIsImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkL0JvYXJkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQuc2V0Qm9hcmQoKTtcbiAgICAgICAgLy8gdGhpcy5ib2FyZC5zdGFydEJvYXJkKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCgpID0+IHRoaXMuYm9hcmQuZnJvZ2dlci50cmlnZ2VyTW92ZShldmVudCkpO1xuICAgIH1cbn1cbiIsImltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Jhc3N7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHdpZHRoKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYOztcbiAgICB0aGlzLnBvc1kgPSAwO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICB9O1xuXG4gIGRyYXdHcmFzcyhjdHgpe1xuICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICcjN2VhZWE4Jyk7XG4gIH07XG59O1xuIiwiaW1wb3J0IEdyYXNzIGZyb20gJy4vR3Jhc3MuanMnO1xuXG5jb25zdCBHcmFzc1NlcnZpY2UgPSB7XG4gIGNyZWF0ZUdyYXNzOiAoKSA9PntcbiAgICByZXR1cm4gW1xuICAgICAgLi4uY3JlYXRlU21hbGxHcmFzcygpLFxuICAgICAgLi4uY3JlYXRlQmlnR3Jhc3MoKVxuICAgIF07XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVNtYWxsR3Jhc3MoKXtcbiAgbGV0IGdyYXNzTGVmdCA9IG5ldyBHcmFzcygwLCAyNSk7XG4gIGxldCBncmFzc1JpZ2h0ID0gbmV3IEdyYXNzKDY3NSwgMjUpO1xuICByZXR1cm4gW2dyYXNzTGVmdCwgZ3Jhc3NSaWdodF07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVCaWdHcmFzcygpe1xuICBsZXQgZ3Jhc3NBcnIgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDAsIHBvc1ggPSA5Ny4yMjsgaSA8IDQ7IGkrKyl7XG4gICAgbGV0IGdyYXNzID0gbmV3IEdyYXNzKHBvc1gsIDcyLjIyKTtcbiAgICBwb3NYICs9IDE0NC40NDtcbiAgICBncmFzc0Fyci5wdXNoKGdyYXNzKTtcbiAgfVxuICByZXR1cm4gZ3Jhc3NBcnI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHcmFzc1NlcnZpY2U7XG4iLCJpbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbm5pbmdTcG90e1xuICBjb25zdHJ1Y3Rvcihwb3NYKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgIHRoaXMucG9zWSA9IDA7XG4gICAgdGhpcy53aWR0aCA9IDcyLjIyO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gIH07XG5cbiAgZHJhd1Nwb3QoY3R4KXtcbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnIzlkZGZlMScpO1xuICB9O1xufTtcbiIsImltcG9ydCBXaW5uaW5nU3BvdCBmcm9tICcuL1dpbm5pbmdTcG90LmpzJztcblxuY29uc3QgV2lubmluZ1Nwb3RTZXJ2aWNlID0ge1xuICBjcmVhdGVXaW5uaW5nU3BvdHM6ICgpID0+e1xuICAgIGxldCBzcG90c0FyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBwb3NYID0gMjU7IGkgPCA1OyBpKyspe1xuICAgICAgbGV0IHNwb3QgPSBuZXcgV2lubmluZ1Nwb3QocG9zWCk7XG4gICAgICBwb3NYICs9IDE0NC40NDtcbiAgICAgIHNwb3RzQXJyLnB1c2goc3BvdCk7XG4gICAgfVxuICAgIHJldHVybiBzcG90c0FycjtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgV2lubmluZ1Nwb3RTZXJ2aWNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIHNwZWVkKSB7XG4gICAgICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgICAgIHRoaXMucG9zWSA9IHBvc1k7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgfVxuXG4gICAgbW92ZShvYmplY3RzKSB7XG4gICAgICAgIGxldCBtYXg7XG4gICAgICAgIGxldCBtaW47XG4gICAgICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc1ggPCAtMTUwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heCA9IDE4O1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSAxNDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZE9ianMgPSBmaWx0ZXJPYmpzKHRoaXMsIG9iamVjdHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE9ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5jaGVja0NvbGxpc2lvbihvYmopICYmIGF0dGVtcHRzIDwgMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPj0xNSA/IHRoaXMucG9zWCA9IDE0MDAgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWCAtPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc1ggPiA3NTApIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gLTU7XG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IC0xMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZE9ianMgPSBmaWx0ZXJPYmpzKHRoaXMsIG9iamVjdHMpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE9ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5jaGVja0NvbGxpc2lvbihvYmopICYmIGF0dGVtcHRzIDwgMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPj0xNSA/IHRoaXMucG9zWCA9IC0xMDAwIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1ggKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNoZWNrQ29sbGlzaW9uKG9iaikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIE1hdGguYWJzKG9iai5wb3NYIC0gdGhpcy5wb3NYKSA8IHRoaXMud2lkdGggKyA1MCA/IHJlc3VsdCA9IHRydWUgOiByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG59O1xuXG5mdW5jdGlvbiBmaWx0ZXJPYmpzKGNoZWNrZWRPYmosIG9ianMpIHtcbiAgICBsZXQgZmlsdGVyZWRPYmpzID0gb2Jqcy5maWx0ZXIob2JqID0+IG9iai5saW5lID09PSBjaGVja2VkT2JqLmxpbmUpO1xuICAgIGxldCBpbmRleCA9IGZpbHRlcmVkT2Jqcy5pbmRleE9mKGNoZWNrZWRPYmopO1xuICAgIGZpbHRlcmVkT2Jqcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiBmaWx0ZXJlZE9ianM7XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuL1R1cnRsZVNlcnZpY2UuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdXJ0bGUgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIHNwZWVkKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgIHRoaXMud2lkdGggPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlV2lkdGgobGluZSk7XG4gICAgdGhpcy5wb3NZID0gVHVydGxlU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gIH1cblxuICBkcmF3VHVydGxlKGN0eCkge1xuICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2Jyb3duJyk7XG4gIH1cbn1cbiIsImltcG9ydCBUdXJ0bGUgZnJvbSAnLi9UdXJ0bGUuanMnO1xuXG5jb25zdCBUdXJ0bGVTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlVHVydGxlczogKCkgPT4ge1xuICAgICAgICBsZXQgdHVydGxlcyA9IFtdO1xuICAgICAgICBsZXQgcGxhY2VkID0gMDtcbiAgICAgICAgbGV0IGxpbmUgPSAxO1xuICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICB3aGlsZSAocGxhY2VkIDw9IDcpIHtcbiAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gdHVydGxlcy5maWx0ZXIodHVydGxlID0+IHR1cnRsZS5saW5lID09PSBsaW5lKTtcbiAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkVHVydGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgTWF0aC5hYnMoY2hlY2tlZFR1cnRsZS5wb3NYIC0gcG9zWCkgPCBjaGVja2VkVHVydGxlLndpZHRoICsgNTAgPyBhdmFpbGFibGUgPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHR1cnRsZSA9IG5ldyBUdXJ0bGUocG9zWCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgdHVydGxlcy5wdXNoKHR1cnRsZSk7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAxNSkge1xuICAgICAgICAgICAgICAgIGxldCB0dXJ0bGUgPSBuZXcgVHVydGxlKC01MDAsIGxpbmUsIDEpO1xuICAgICAgICAgICAgICAgIHR1cnRsZXMucHVzaCh0dXJ0bGUpO1xuICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGxhY2VkID09IDQpIHtcbiAgICAgICAgICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHVydGxlcztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAyNTA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVXaWR0aDogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGVTZXJ2aWNlO1xuIiwiaW1wb3J0IFdhdGVyU2VydmljZSBmcm9tICcuL1dhdGVyU2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVye1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMucG9zWCA9IDA7XG4gICAgdGhpcy5wb3NZID0gNTA7XG4gICAgdGhpcy5oZWlnaHQgPSAyNTA7XG4gICAgdGhpcy53aWR0aCA9IDcwMDtcbiAgfVxuXG4gIGRyYXdXYXRlcihjdHgpe1xuICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdibHVlJyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IFdhdGVyIGZyb20gJy4vV2F0ZXIuanMnO1xuXG5jb25zdCBXYXRlclNlcnZpY2UgPSB7XG4gIGNyZWF0ZVdhdGVyOiAoKSA9PiB7XG4gICAgICBsZXQgd2F0ZXJPYmpzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDcwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3YXRlciA9IG5ldyBXYXRlcihwb3NYLCBsaW5lKTtcbiAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgMVxuICAgICAgICAgICAgd2F0ZXJPYmpzLnB1c2god2F0ZXIpO1xuICAgICAgICAgIGlmIChpICUgMTQgPT0gMCkge1xuICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICAgIHBvc1ggPSAwO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3YXRlck9ianM7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdhdGVyU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBXb29kU2VydmljZSBmcm9tICcuL1dvb2RTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29vZCBleHRlbmRzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgc3BlZWQpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgdGhpcy53aWR0aCA9IFdvb2RTZXJ2aWNlLmdlbmVyYXRlV2lkdGgobGluZSlcbiAgICB0aGlzLnBvc1kgPSBXb29kU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICB9XG5cbiAgZHJhd1dvb2QoY3R4KSB7XG4gICAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnYmVpZ2UnKTtcbiAgfVxuXG59IFxuIiwiaW1wb3J0IFdvb2QgZnJvbSAnLi9Xb29kLmpzJztcblxuY29uc3QgV29vZFNlcnZpY2UgPSB7XG4gICAgICAgIGNyZWF0ZVdvb2Q6ICgpID0+IHtcbiAgICAgICAgICAgIGxldCB3b29kcyA9IFtdO1xuICAgICAgICAgICAgbGV0IHBsYWNlZCA9IDA7XG4gICAgICAgICAgICBsZXQgbGluZSA9IDE7XG4gICAgICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKHBsYWNlZCA8IDgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIDE0IC0gMSkpICsgMSkgKiA1MDtcbiAgICAgICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gd29vZHMuZmlsdGVyKHdvb2QgPT4gd29vZC5saW5lID09PSBsaW5lKTtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZExpbmUuZm9yRWFjaCgoY2hlY2tlZFdvb2QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoY2hlY2tlZFdvb2QucG9zWCAtIHBvc1gpIDwgY2hlY2tlZFdvb2Qud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgd29vZCA9IG5ldyBXb29kKHBvc1gsIGxpbmUsIDEpO1xuICAgICAgICAgICAgICAgICAgICB3b29kcy5wdXNoKHdvb2QpO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGVtcHRzID4gMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZCgtNTAwLCBsaW5lLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgd29vZHMucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHBsYWNlZCA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSAyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGxhY2VkID09IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IDM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIHJldHVybiB3b29kcztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVXaWR0aDogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjUwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDIwMDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDIwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgV29vZFNlcnZpY2U7XG4iLCJjb25zdCBDaGVja0FyZWEgPSB7XG4gICAgY2hlY2tJZk91dE9mTWFwQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmIChmcm9nZ2VyLnBvc1ggPD0gMCB8fCBmcm9nZ2VyLnBvc1ggPj0gNjUwIHx8IGZyb2dnZXIucG9zWSA8PSAwIHx8IGZyb2dnZXIucG9zWSA+PSA2MDApIHtcbiAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZkNhckFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGZyb2dnZXIucG9zWSA+PSAzNTAgJiYgZnJvZ2dlci5wb3NZIDw9IDU1MCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmTGFzdExpbmVBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmIChmcm9nZ2VyLnBvc1kgPD0gNTAgJiYgZnJvZ2dlci5wb3NZID49IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZlR1cnRsZUFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZihmcm9nZ2VyLnBvc1kgPD0gMzAwICYmIGZyb2dnZXIucG9zWSA+PSAxNTApe1xuICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZldvb2RBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgaWYoZnJvZ2dlci5wb3NZIDw9IDI1MCAmJiBmcm9nZ2VyLnBvc1kgPj0gNTApe1xuICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrQXJlYTtcbiIsImNvbnN0IENvbGxpc2lvbkRldGVjdGlvbiA9IHtcbiAgICBjaGVja0NvbGxpc2lvbjogKGZyb2dnZXIsIG9iaikgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgY29uc3Qgb2JqTGVmdFNpZGUgPSBvYmoucG9zWDsgLy8gMTUwXG4gICAgICAgIGNvbnN0IG9ialJpZ2h0U2lkZSA9IG9iai5wb3NYICsgb2JqLndpZHRoOyAvLyAyMDBcbiAgICAgICAgY29uc3Qgb2JqVG9wU2lkZSA9IG9iai5wb3NZOyAvLyAwXG4gICAgICAgIGNvbnN0IG9iakJvdHRvbVNpZGUgPSBvYmoucG9zWSArIG9iai5oZWlnaHQ7IC8vIDUwXG5cbiAgICAgICAgY29uc3QgZnJvZ2dlckxlZnRTaWRlID0gZnJvZ2dlci5wb3NYOyAvLyAxNTBcbiAgICAgICAgY29uc3QgZnJvZ2dlclJpZ2h0U2lkZSA9IGZyb2dnZXIucG9zWCArIGZyb2dnZXIud2lkdGg7IC8vIDIwMFxuICAgICAgICBjb25zdCBmcm9nZ2VyVG9wU2lkZSA9IGZyb2dnZXIucG9zWTsgLy8gNDVcbiAgICAgICAgY29uc3QgZnJvZ2dlckJvdHRvbVNpZGUgPSBmcm9nZ2VyLnBvc1kgKyBmcm9nZ2VyLmhlaWdodDsgLy8gOTVcblxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICgoZnJvZ2dlclJpZ2h0U2lkZSA+IG9iakxlZnRTaWRlICYmIGZyb2dnZXJSaWdodFNpZGUgPD0gb2JqUmlnaHRTaWRlKSB8fFxuICAgICAgICAgICAgICAgIChmcm9nZ2VyTGVmdFNpZGUgPCBvYmpSaWdodFNpZGUgJiYgZnJvZ2dlckxlZnRTaWRlID49IG9iakxlZnRTaWRlKSkgJiZcbiAgICAgICAgICAgIChmcm9nZ2VyVG9wU2lkZSA8IG9iakJvdHRvbVNpZGUgJiYgZnJvZ2dlckJvdHRvbVNpZGUgPiBvYmpUb3BTaWRlKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGZpbmRDb2xsaXNpb246IChmcm9nZ2VyLCBvYmplY3RzQXJyKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RzQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoQ29sbGlzaW9uRGV0ZWN0aW9uLmNoZWNrQ29sbGlzaW9uKGZyb2dnZXIsIG9iamVjdHNBcnJbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb2JqZWN0c0FycltpXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tPdXRPZk1hcDogKGZyb2dnZXIsIGJvYXJkKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGZyb2dnZXIucG9zWCA+IGJvYXJkLndpZHRoIC0gNTAgfHwgZnJvZ2dlci5wb3NYIDwgMCB8fFxuICAgICAgICAgICAgZnJvZ2dlci5wb3NZID4gYm9hcmQuaGVpZ2h0IC0gNTAgfHwgZnJvZ2dlci5wb3NZIDwgMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sbGlzaW9uRGV0ZWN0aW9uO1xuIiwiY29uc3QgRHJhd0Z1bmN0aW9ucyA9IHtcbiAgZHJhd1JlY3Q6IChjdHgsIHBvc1gsIHBvc1ksIHdpZHRoLCBoZWlnaHQsIGNvbG9yKSA9PntcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgucmVjdChwb3NYLCBwb3NZLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gIH0sXG5cbiAgY29sb3JUZXh0OiAoY3R4LCBzaG93V29yZHMsIHRleHRYLCB0ZXh0WSwgY29sb3IpID0+IHtcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgY3R4LmZpbGxUZXh0KHNob3dXb3JkcywgdGV4dFgsIHRleHRZKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEcmF3RnVuY3Rpb25zO1xuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9Db21wb25lbnRzL0dhbWUuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT57XG4gIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgZ2FtZS5zdGFydEdhbWUoKTtcbn0pO1xuIl19
