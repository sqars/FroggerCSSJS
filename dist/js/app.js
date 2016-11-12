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
            this.frogger.checkCollisions(this.board, this.grass, this.cars, this.turtles);
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
var BoardService = {

    clearBoard: function clearBoard(board) {
        board.forEach(function (div) {
            div.className = "";
        });
    },

    checkOutOfMap: function checkOutOfMap(frogger, board) {
        var result = false;
        if (frogger.posX > board.width - 50 || frogger.posX < 0 || frogger.posY > board.height - 50 || frogger.posY < 0) {
            result = true;
        }
        return result;
    }
};

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

var _CollisionDetection = require('../../Utilities/CollisionDetection.js');

var _CollisionDetection2 = _interopRequireDefault(_CollisionDetection);

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
    },

    checkCollision: function checkCollision(frogger, carsArr) {
        var result = false;
        for (var i = 0; i < carsArr.length; i++) {
            if ((0, _CollisionDetection2.default)(frogger, carsArr[i])) {
                result = true;
                break;
            }
        };
        return result;
    }
};

exports.default = CarService;

},{"../../Utilities/CollisionDetection.js":19,"./Car.js":3}],5:[function(require,module,exports){
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

var _GrassService = require('./LastLineObjs/GrassService.js');

var _GrassService2 = _interopRequireDefault(_GrassService);

var _CarService = require('./Cars/CarService.js');

var _CarService2 = _interopRequireDefault(_CarService);

var _TurtleService = require('./Turtles/TurtleService.js');

var _TurtleService2 = _interopRequireDefault(_TurtleService);

var _CheckArea = require('../Utilities/CheckArea.js');

var _CheckArea2 = _interopRequireDefault(_CheckArea);

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
        value: function checkCollisions(board, grass, cars, turtles) {
            var checkIfGrassArea = _CheckArea2.default.checkIfGrassArea,
                checkIfCarArea = _CheckArea2.default.checkIfCarArea,
                checkIfTurtleArea = _CheckArea2.default.checkIfTurtleArea;

            if (this.moving) {

                var blockersCollisions = [];

                blockersCollisions.push(_BoardService2.default.checkOutOfMap(this, board));

                if (checkIfGrassArea(this)) {
                    // check collision with grass only if frogger is in 'grass' area
                    blockersCollisions.push(_GrassService2.default.checkCollision(this, grass));
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
                movingObjsCollisions.push(_CarService2.default.checkCollision(this, cars));
            }

            if (checkIfTurtleArea(this)) {
                // check collision with turtles only if frogger is in 'turtle' area
                movingObjsCollisions.push(_TurtleService2.default.checkCollision(this, turtles));
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

},{"../Utilities/CheckArea.js":18,"../Utilities/DrawFunctions.js":20,"./Board/BoardService.js":2,"./Cars/CarService.js":4,"./LastLineObjs/GrassService.js":8,"./MovingObject.js":11,"./Turtles/TurtleService.js":13}],6:[function(require,module,exports){
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

var _CollisionDetection = require('../../Utilities/CollisionDetection.js');

var _CollisionDetection2 = _interopRequireDefault(_CollisionDetection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var GrassService = {
  createGrass: function createGrass() {
    return [].concat(_toConsumableArray(createSmallGrass()), _toConsumableArray(createBigGrass()));
  },

  checkCollision: function checkCollision(frogger, grassArr) {
    var result = false;
    for (var i = 0; i < grassArr.length; i++) {
      if ((0, _CollisionDetection2.default)(frogger, grassArr[i])) {
        result = true;
        break;
      }
    };
    return result;
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

},{"../../Utilities/CollisionDetection.js":19,"./Grass.js":7}],9:[function(require,module,exports){
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

var _CollisionDetection = require('../../Utilities/CollisionDetection.js');

var _CollisionDetection2 = _interopRequireDefault(_CollisionDetection);

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
    },

    checkCollision: function checkCollision(frogger, turtlesArr) {
        var result = false;
        for (var i = 0; i < turtlesArr.length; i++) {
            if ((0, _CollisionDetection2.default)(frogger, turtlesArr[i])) {
                result = true;
                break;
            }
        };
        return result;
    }

};

exports.default = TurtleService;

},{"../../Utilities/CollisionDetection.js":19,"./Turtle.js":12}],14:[function(require,module,exports){
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
    checkIfCarArea: function checkIfCarArea(frogger) {
        var result = false;
        if (frogger.posY >= 350 && frogger.posY <= 550) {
            result = true;
        }
        return result;
    },

    checkIfGrassArea: function checkIfGrassArea(frogger) {
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
    }
};

exports.default = CheckArea;

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = checkCollision;
function checkCollision(frogger, obj) {
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
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3MuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3NTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90U2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL01vdmluZ09iamVjdC5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9XYXRlci9XYXRlclNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2RTZXJ2aWNlLmpzIiwic3JjL2pzL1V0aWxpdGllcy9DaGVja0FyZWEuanMiLCJzcmMvanMvVXRpbGl0aWVzL0NvbGxpc2lvbkRldGVjdGlvbi5qcyIsInNyYy9qcy9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyIsInNyYy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FB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UyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBSztBQUNqRCxNQUFJLE9BQU8sb0JBQVg7QUFDQSxPQUFLLFNBQUw7QUFDRCxDQUhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBGcm9nZ2VyIGZyb20gJy4uL0Zyb2dnZXIuanMnO1xuaW1wb3J0IFdhdGVyIGZyb20gJy4uL1dhdGVyL1dhdGVyLmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4uL0NhcnMvQ2FyU2VydmljZS5qcyc7XG5pbXBvcnQgQm9hcmRTZXJ2aWNlIGZyb20gJy4vQm9hcmRTZXJ2aWNlLmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4uL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4uL1dhdGVyL1dhdGVyU2VydmljZS5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi4vV29vZC9Xb29kU2VydmljZS5qcyc7XG5pbXBvcnQgR3Jhc3NTZXJ2aWNlIGZyb20gJy4uL0xhc3RMaW5lT2Jqcy9HcmFzc1NlcnZpY2UuanMnO1xuaW1wb3J0IFdpbm5pbmdTcG90U2VydmljZSBmcm9tICcuLi9MYXN0TGluZU9ianMvV2lubmluZ1Nwb3RTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmJvYXJkLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy53YXRlciA9IG5ldyBXYXRlcigpO1xuICAgICAgICB0aGlzLmZyb2dnZXIgPSBuZXcgRnJvZ2dlcih0aGlzLmJvYXJkKTtcbiAgICAgICAgdGhpcy5jYXJzID0gQ2FyU2VydmljZS5jcmVhdGVDYXJzKCk7XG4gICAgICAgIHRoaXMudHVydGxlcyA9IFR1cnRsZVNlcnZpY2UuY3JlYXRlVHVydGxlcygpO1xuICAgICAgICB0aGlzLndvb2RzID0gV29vZFNlcnZpY2UuY3JlYXRlV29vZCgpO1xuICAgICAgICB0aGlzLmdyYXNzID0gR3Jhc3NTZXJ2aWNlLmNyZWF0ZUdyYXNzKCk7XG4gICAgICAgIHRoaXMud2lubmluZ1Nwb3RzID0gV2lubmluZ1Nwb3RTZXJ2aWNlLmNyZWF0ZVdpbm5pbmdTcG90cygpO1xuICAgIH1cblxuICAgIHNldEJvYXJkKCkge1xuICAgICAgICB0aGlzLmRyYXdBbGwoKTtcbiAgICAgICAgdGhpcy5tb3ZlQWxsKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnNldEJvYXJkLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGRyYXdBbGwoKXtcbiAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5ib2FyZC53aWR0aCwgdGhpcy5ib2FyZC5oZWlnaHQpOyAvLyBjbGVhciBib2FyZFxuICAgICAgdGhpcy53YXRlci5kcmF3V2F0ZXIodGhpcy5jb250ZXh0KTsgLy8gZHJhdyBXYXRlclxuICAgICAgdGhpcy5ncmFzcy5mb3JFYWNoKGdyYXNzID0+IGdyYXNzLmRyYXdHcmFzcyh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBHcmFzc1xuICAgICAgdGhpcy53aW5uaW5nU3BvdHMuZm9yRWFjaChzcG90ID0+IHNwb3QuZHJhd1Nwb3QodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgd2lubmluZ1Nwb3RzXG4gICAgICB0aGlzLmNhcnMuZm9yRWFjaChjYXIgPT4gY2FyLmRyYXdDYXIodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgQ2Fyc1xuICAgICAgdGhpcy50dXJ0bGVzLmZvckVhY2godHVydGxlID0+IHR1cnRsZS5kcmF3VHVydGxlKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IFR1cnRsZXNcbiAgICAgIHRoaXMud29vZHMuZm9yRWFjaCh3b29kID0+IHdvb2QuZHJhd1dvb2QodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgV29vZHNcbiAgICAgIHRoaXMuZnJvZ2dlci5kcmF3RnJvZ2dlcih0aGlzLmNvbnRleHQpOyAvLyBkcmF3IEZyb2dnZXJcblxuICAgICAgRHJhd0Z1bmN0aW9ucy5jb2xvclRleHQodGhpcy5jb250ZXh0LCAncG9zWDogJyArIHRoaXMuZnJvZ2dlci5wb3NYICsgJywgcG9zWTogJyArIHRoaXMuZnJvZ2dlci5wb3NZLCB0aGlzLmZyb2dnZXIucG9zWCwgdGhpcy5mcm9nZ2VyLnBvc1ksICdibGFjaycpOyAvLyBjaGVhdCB0byBkaXNwbGF5IGZyb2dnZXIgcG9zaXRvblxuICAgIH1cblxuICAgIG1vdmVBbGwoKXtcbiAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIubW92ZSh0aGlzLmNhcnMpKTsgLy8gbW92ZSBDYXJzXG4gICAgICB0aGlzLnR1cnRsZXMuZm9yRWFjaCh0dXJ0bGUgPT4gdHVydGxlLm1vdmUodGhpcy50dXJ0bGVzKSk7IC8vIG1vdmUgVHVydGxlc1xuICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5tb3ZlKHRoaXMud29vZHMpKTsgLy8gbW92ZSBXb29kc1xuICAgICAgdGhpcy5mcm9nZ2VyLm1vdmUoKTtcbiAgICAgIHRoaXMuZnJvZ2dlci5jaGVja0NvbGxpc2lvbnModGhpcy5ib2FyZCwgdGhpcy5ncmFzcywgdGhpcy5jYXJzLCB0aGlzLnR1cnRsZXMpO1xuICAgIH1cbn1cbiIsImNvbnN0IEJvYXJkU2VydmljZSA9IHtcblxuICAgIGNsZWFyQm9hcmQ6IChib2FyZCkgPT4ge1xuICAgICAgICBib2FyZC5mb3JFYWNoKChkaXYpID0+IHtcbiAgICAgICAgICAgIGRpdi5jbGFzc05hbWUgPSBcIlwiO1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBjaGVja091dE9mTWFwKGZyb2dnZXIsIGJvYXJkKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGZyb2dnZXIucG9zWCA+IGJvYXJkLndpZHRoIC0gNTAgfHwgZnJvZ2dlci5wb3NYIDwgMCB8fFxuICAgICAgICAgICAgZnJvZ2dlci5wb3NZID4gYm9hcmQuaGVpZ2h0IC0gNTAgfHwgZnJvZ2dlci5wb3NZIDwgMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJvYXJkU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4vQ2FyU2VydmljZSc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhciBleHRlbmRzIE1vdmluZ09iamVjdHtcblxuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lLCBzcGVlZCl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB0aGlzLndpZHRoID0gQ2FyU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpO1xuICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gQ2FyU2VydmljZS5nZW5lcmF0ZURpcmVjdGlvbihsaW5lKTtcbiAgfVxuXG4gIGRyYXdDYXIoY3R4KSB7XG4gICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ3JlZCcpO1xuICB9XG5cbn1cbiIsImltcG9ydCBDYXIgZnJvbSAnLi9DYXIuanMnO1xuaW1wb3J0IGNoZWNrQ29sbGlzaW9uIGZyb20gJy4uLy4uL1V0aWxpdGllcy9Db2xsaXNpb25EZXRlY3Rpb24uanMnO1xuXG5jb25zdCBDYXJTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlQ2FyczogKCkgPT4ge1xuICAgICAgICBsZXQgY2FycyA9IFtdO1xuICAgICAgICBsZXQgcGxhY2VkID0gMDtcbiAgICAgICAgbGV0IGxpbmUgPSAxXG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIHdoaWxlIChwbGFjZWQgPD0gMTUpIHtcbiAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gY2Fycy5maWx0ZXIoY2FyID0+IGNhci5saW5lID09PSBsaW5lKTtcbiAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkQ2FyKSA9PiB7XG4gICAgICAgICAgICAgICAgTWF0aC5hYnMoY2hlY2tlZENhci5wb3NYIC0gcG9zWCkgPCBjaGVja2VkQ2FyLndpZHRoICsgNTAgPyBhdmFpbGFibGUgPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIocG9zWCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIoLTUwMCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGFjZWQgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjYXJzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiA1NTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA0NTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDQwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMzUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVEaXJlY3Rpb246IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjaGVja0NvbGxpc2lvbjogKGZyb2dnZXIsIGNhcnNBcnIpID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjYXJzQXJyLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgaWYoY2hlY2tDb2xsaXNpb24oZnJvZ2dlciwgY2Fyc0FycltpXSkpe1xuICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuaW1wb3J0IEJvYXJkU2VydmljZSBmcm9tICcuL0JvYXJkL0JvYXJkU2VydmljZS5qcyc7XG5pbXBvcnQgR3Jhc3NTZXJ2aWNlIGZyb20gJy4vTGFzdExpbmVPYmpzL0dyYXNzU2VydmljZS5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuL0NhcnMvQ2FyU2VydmljZS5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyc7XG5cbmltcG9ydCBDaGVja0FyZWEgZnJvbSAnLi4vVXRpbGl0aWVzL0NoZWNrQXJlYS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb2dnZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKGJvYXJkLCBwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIGxpdmVzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcbiAgICAgICAgdGhpcy5wb3NYID0gYm9hcmQud2lkdGggKiAwLjU7XG4gICAgICAgIHRoaXMucG9zWSA9IGJvYXJkLmhlaWdodCAtIHRoaXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLnByZXZQb3NYID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmV2UG9zWSA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldkRpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuc3BlZWQgPSA1O1xuICAgICAgICB0aGlzLmxpdmVzID0gMztcbiAgICB9O1xuXG4gICAgZHJhd0Zyb2dnZXIoY3R4KSB7XG4gICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdncmVlbicpO1xuICAgIH07XG5cbiAgICB0cmlnZ2VyTW92ZShldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMubW92aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUZyb2dnZXJQcmV2UG9zKCk7XG4gICAgICAgICAgICB0aGlzLnNldERpcmVjdGlvbihldmVudCk7XG4gICAgICAgICAgICB0aGlzLm1vdmluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2V0RGlyZWN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdkb3duJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2FsY3VsYXRlRnJvZ2dlclByZXZQb3MoKSB7XG4gICAgICAgIHRoaXMucHJldkRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLnByZXZQb3NYID0gdGhpcy5wb3NYO1xuICAgICAgICB0aGlzLnByZXZQb3NZID0gdGhpcy5wb3NZO1xuICAgIH07XG5cbiAgICByZXZlcnRGcm9nZ2VyUG9zaXRpb24oKSB7XG4gICAgICAgIHRoaXMucG9zWCA9IHRoaXMucHJldlBvc1g7XG4gICAgICAgIHRoaXMucG9zWSA9IHRoaXMucHJldlBvc1k7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5wcmV2RGlyZWN0aW9uO1xuICAgICAgICB0aGlzLm1vdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICB9XG5cbiAgICBjaGVja0NvbGxpc2lvbnMoYm9hcmQsIGdyYXNzLCBjYXJzLCB0dXJ0bGVzKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNoZWNrSWZHcmFzc0FyZWEsXG4gICAgICAgICAgICBjaGVja0lmQ2FyQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZUdXJ0bGVBcmVhXG4gICAgICAgIH0gPSBDaGVja0FyZWE7XG4gICAgICAgIGlmICh0aGlzLm1vdmluZykge1xuXG4gICAgICAgICAgICBsZXQgYmxvY2tlcnNDb2xsaXNpb25zID0gW107XG5cbiAgICAgICAgICAgIGJsb2NrZXJzQ29sbGlzaW9ucy5wdXNoKEJvYXJkU2VydmljZS5jaGVja091dE9mTWFwKHRoaXMsIGJvYXJkKSk7XG5cbiAgICAgICAgICAgIGlmIChjaGVja0lmR3Jhc3NBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIGdyYXNzIG9ubHkgaWYgZnJvZ2dlciBpcyBpbiAnZ3Jhc3MnIGFyZWFcbiAgICAgICAgICAgICAgICBibG9ja2Vyc0NvbGxpc2lvbnMucHVzaChHcmFzc1NlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcywgZ3Jhc3MpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja2Vyc0NvbGxpc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tlcnNDb2xsaXNpb25zW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJ0RnJvZ2dlclBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgbW92aW5nT2Jqc0NvbGxpc2lvbnMgPSBbXTtcblxuICAgICAgICBpZiAoY2hlY2tJZkNhckFyZWEodGhpcykpIHsgLy8gY2hlY2sgY29sbGlzaW9uIHdpdGggY2FycyBvbmx5IGlmIGZyb2dnZXIgaXMgaW4gJ3JvYWQnIGFyZWFcbiAgICAgICAgICAgIG1vdmluZ09ianNDb2xsaXNpb25zLnB1c2goQ2FyU2VydmljZS5jaGVja0NvbGxpc2lvbih0aGlzLCBjYXJzKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hlY2tJZlR1cnRsZUFyZWEodGhpcykpIHsgLy8gY2hlY2sgY29sbGlzaW9uIHdpdGggdHVydGxlcyBvbmx5IGlmIGZyb2dnZXIgaXMgaW4gJ3R1cnRsZScgYXJlYVxuICAgICAgICAgICAgbW92aW5nT2Jqc0NvbGxpc2lvbnMucHVzaChUdXJ0bGVTZXJ2aWNlLmNoZWNrQ29sbGlzaW9uKHRoaXMsIHR1cnRsZXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW92aW5nT2Jqc0NvbGxpc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChtb3ZpbmdPYmpzQ29sbGlzaW9uc1tpXSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdrb2xpemphJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9O1xuXG4gICAgbW92ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCAtPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWSAtPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NZICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMubW92aW5nQ291bnQrKztcbiAgICAgICAgICAgIGlmICh0aGlzLm1vdmluZ0NvdW50ID49IDUwIC8gdGhpcy5zcGVlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcblxufVxuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQvQm9hcmQuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICAgIH1cblxuICAgIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgdGhpcy5ib2FyZC5zZXRCb2FyZCgpO1xuICAgICAgICAvLyB0aGlzLmJvYXJkLnN0YXJ0Qm9hcmQoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsKCkgPT4gdGhpcy5ib2FyZC5mcm9nZ2VyLnRyaWdnZXJNb3ZlKGV2ZW50KSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFzc3tcbiAgY29uc3RydWN0b3IocG9zWCwgd2lkdGgpe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7O1xuICAgIHRoaXMucG9zWSA9IDA7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gIH07XG5cbiAgZHJhd0dyYXNzKGN0eCl7XG4gICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJyM3ZWFlYTgnKTtcbiAgfTtcbn07XG4iLCJpbXBvcnQgR3Jhc3MgZnJvbSAnLi9HcmFzcy5qcyc7XG5pbXBvcnQgY2hlY2tDb2xsaXNpb24gZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0NvbGxpc2lvbkRldGVjdGlvbi5qcyc7XG5cbmNvbnN0IEdyYXNzU2VydmljZSA9IHtcbiAgY3JlYXRlR3Jhc3M6ICgpID0+e1xuICAgIHJldHVybiBbXG4gICAgICAuLi5jcmVhdGVTbWFsbEdyYXNzKCksXG4gICAgICAuLi5jcmVhdGVCaWdHcmFzcygpXG4gICAgXTtcbiAgfSxcblxuICBjaGVja0NvbGxpc2lvbjogKGZyb2dnZXIsIGdyYXNzQXJyKSA9PntcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGdyYXNzQXJyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKGNoZWNrQ29sbGlzaW9uKGZyb2dnZXIsIGdyYXNzQXJyW2ldKSl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlU21hbGxHcmFzcygpe1xuICBsZXQgZ3Jhc3NMZWZ0ID0gbmV3IEdyYXNzKDAsIDI1KTtcbiAgbGV0IGdyYXNzUmlnaHQgPSBuZXcgR3Jhc3MoNjc1LCAyNSk7XG4gIHJldHVybiBbZ3Jhc3NMZWZ0LCBncmFzc1JpZ2h0XTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUJpZ0dyYXNzKCl7XG4gIGxldCBncmFzc0FyciA9IFtdO1xuICBmb3IgKGxldCBpID0gMCwgcG9zWCA9IDk3LjIyOyBpIDwgNDsgaSsrKXtcbiAgICBsZXQgZ3Jhc3MgPSBuZXcgR3Jhc3MocG9zWCwgNzIuMjIpO1xuICAgIHBvc1ggKz0gMTQ0LjQ0O1xuICAgIGdyYXNzQXJyLnB1c2goZ3Jhc3MpO1xuICB9XG4gIHJldHVybiBncmFzc0Fycjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdyYXNzU2VydmljZTtcbiIsImltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lubmluZ1Nwb3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gpe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgdGhpcy5wb3NZID0gMDtcbiAgICB0aGlzLndpZHRoID0gNzIuMjI7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgfTtcblxuICBkcmF3U3BvdChjdHgpe1xuICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICcjOWRkZmUxJyk7XG4gIH07XG59O1xuIiwiaW1wb3J0IFdpbm5pbmdTcG90IGZyb20gJy4vV2lubmluZ1Nwb3QuanMnO1xuXG5jb25zdCBXaW5uaW5nU3BvdFNlcnZpY2UgPSB7XG4gIGNyZWF0ZVdpbm5pbmdTcG90czogKCkgPT57XG4gICAgbGV0IHNwb3RzQXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIHBvc1ggPSAyNTsgaSA8IDU7IGkrKyl7XG4gICAgICBsZXQgc3BvdCA9IG5ldyBXaW5uaW5nU3BvdChwb3NYKTtcbiAgICAgIHBvc1ggKz0gMTQ0LjQ0O1xuICAgICAgc3BvdHNBcnIucHVzaChzcG90KTtcbiAgICB9XG4gICAgcmV0dXJuIHNwb3RzQXJyO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXaW5uaW5nU3BvdFNlcnZpY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbiwgc3BlZWQpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICAgICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB9XG5cbiAgICBtb3ZlKG9iamVjdHMpIHtcbiAgICAgICAgbGV0IG1heDtcbiAgICAgICAgbGV0IG1pbjtcbiAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWCA8IC0xNTApIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gMTg7XG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IDE0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkT2JqcyA9IGZpbHRlck9ianModGhpcywgb2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkT2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmNoZWNrQ29sbGlzaW9uKG9iaikgJiYgYXR0ZW1wdHMgPCAxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA+PTE1ID8gdGhpcy5wb3NYID0gMTQwMCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYIC09IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWCA+IDc1MCkge1xuICAgICAgICAgICAgICAgICAgICBtYXggPSAtNTtcbiAgICAgICAgICAgICAgICAgICAgbWluID0gLTExO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkT2JqcyA9IGZpbHRlck9ianModGhpcywgb2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkT2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmNoZWNrQ29sbGlzaW9uKG9iaikgJiYgYXR0ZW1wdHMgPCAxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA+PTE1ID8gdGhpcy5wb3NYID0gLTEwMDAgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWCArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY2hlY2tDb2xsaXNpb24ob2JqKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgTWF0aC5hYnMob2JqLnBvc1ggLSB0aGlzLnBvc1gpIDwgdGhpcy53aWR0aCArIDUwID8gcmVzdWx0ID0gdHJ1ZSA6IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbn07XG5cbmZ1bmN0aW9uIGZpbHRlck9ianMoY2hlY2tlZE9iaiwgb2Jqcykge1xuICAgIGxldCBmaWx0ZXJlZE9ianMgPSBvYmpzLmZpbHRlcihvYmogPT4gb2JqLmxpbmUgPT09IGNoZWNrZWRPYmoubGluZSk7XG4gICAgbGV0IGluZGV4ID0gZmlsdGVyZWRPYmpzLmluZGV4T2YoY2hlY2tlZE9iaik7XG4gICAgZmlsdGVyZWRPYmpzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkT2Jqcztcbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4vVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1cnRsZSBleHRlbmRzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgc3BlZWQpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgdGhpcy53aWR0aCA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKTtcbiAgICB0aGlzLnBvc1kgPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgfVxuXG4gIGRyYXdUdXJ0bGUoY3R4KSB7XG4gICAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnYnJvd24nKTtcbiAgfVxufVxuIiwiaW1wb3J0IFR1cnRsZSBmcm9tICcuL1R1cnRsZS5qcyc7XG5pbXBvcnQgY2hlY2tDb2xsaXNpb24gZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0NvbGxpc2lvbkRldGVjdGlvbi5qcyc7XG5cbmNvbnN0IFR1cnRsZVNlcnZpY2UgPSB7XG5cbiAgICBjcmVhdGVUdXJ0bGVzOiAoKSA9PiB7XG4gICAgICAgIGxldCB0dXJ0bGVzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDE7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIHdoaWxlIChwbGFjZWQgPD0gNykge1xuICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSB0dXJ0bGVzLmZpbHRlcih0dXJ0bGUgPT4gdHVydGxlLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRUdXJ0bGUpID0+IHtcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkVHVydGxlLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRUdXJ0bGUud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHVydGxlID0gbmV3IFR1cnRsZShwb3NYLCBsaW5lLCAxKTtcbiAgICAgICAgICAgICAgICB0dXJ0bGVzLnB1c2godHVydGxlKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgbGV0IHR1cnRsZSA9IG5ldyBUdXJ0bGUoLTUwMCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgdHVydGxlcy5wdXNoKHR1cnRsZSk7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGFjZWQgPT0gNCkge1xuICAgICAgICAgICAgICAgIGxpbmUgPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0dXJ0bGVzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1MDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrQ29sbGlzaW9uOiAoZnJvZ2dlciwgdHVydGxlc0FycikgPT57XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdHVydGxlc0Fyci5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmKGNoZWNrQ29sbGlzaW9uKGZyb2dnZXIsIHR1cnRsZXNBcnJbaV0pKXtcbiAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHVydGxlU2VydmljZTtcbiIsImltcG9ydCBXYXRlclNlcnZpY2UgZnJvbSAnLi9XYXRlclNlcnZpY2UuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRlcntcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLnBvc1ggPSAwO1xuICAgIHRoaXMucG9zWSA9IDUwO1xuICAgIHRoaXMuaGVpZ2h0ID0gMjUwO1xuICAgIHRoaXMud2lkdGggPSA3MDA7XG4gIH1cblxuICBkcmF3V2F0ZXIoY3R4KXtcbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnYmx1ZScpO1xuICB9XG5cbn1cbiIsImltcG9ydCBXYXRlciBmcm9tICcuL1dhdGVyLmpzJztcblxuY29uc3QgV2F0ZXJTZXJ2aWNlID0ge1xuICBjcmVhdGVXYXRlcjogKCkgPT4ge1xuICAgICAgbGV0IHdhdGVyT2JqcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSA3MDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgd2F0ZXIgPSBuZXcgV2F0ZXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICBwb3NYID0gcG9zWCArIDFcbiAgICAgICAgICAgIHdhdGVyT2Jqcy5wdXNoKHdhdGVyKTtcbiAgICAgICAgICBpZiAoaSAlIDE0ID09IDApIHtcbiAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgICBwb3NYID0gMDtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2F0ZXJPYmpzO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXYXRlclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi9Xb29kU2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvb2QgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIHNwZWVkKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgIHRoaXMud2lkdGggPSBXb29kU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpXG4gICAgdGhpcy5wb3NZID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgfVxuXG4gIGRyYXdXb29kKGN0eCkge1xuICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2JlaWdlJyk7XG4gIH1cblxufSBcbiIsImltcG9ydCBXb29kIGZyb20gJy4vV29vZC5qcyc7XG5cbmNvbnN0IFdvb2RTZXJ2aWNlID0ge1xuICAgICAgICBjcmVhdGVXb29kOiAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgd29vZHMgPSBbXTtcbiAgICAgICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICAgICAgbGV0IGxpbmUgPSAxO1xuICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChwbGFjZWQgPCA4KSB7XG4gICAgICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkTGluZSA9IHdvb2RzLmZpbHRlcih3b29kID0+IHdvb2QubGluZSA9PT0gbGluZSk7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRXb29kKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKGNoZWNrZWRXb29kLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRXb29kLndpZHRoICsgNTAgPyBhdmFpbGFibGUgPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZChwb3NYLCBsaW5lLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgd29vZHMucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QoLTUwMCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHdvb2RzLnB1c2god29vZCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwbGFjZWQgPT0gMykge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBsYWNlZCA9PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSAzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICByZXR1cm4gd29vZHM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1MDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAyMDA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAyMDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgV29vZFNlcnZpY2U7XG4iLCJjb25zdCBDaGVja0FyZWEgPSB7XG4gICAgY2hlY2tJZkNhckFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGZyb2dnZXIucG9zWSA+PSAzNTAgJiYgZnJvZ2dlci5wb3NZIDw9IDU1MCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmR3Jhc3NBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmIChmcm9nZ2VyLnBvc1kgPD0gNTAgJiYgZnJvZ2dlci5wb3NZID49IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZlR1cnRsZUFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZihmcm9nZ2VyLnBvc1kgPD0gMzAwICYmIGZyb2dnZXIucG9zWSA+PSAxNTApe1xuICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrQXJlYTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrQ29sbGlzaW9uKGZyb2dnZXIsIG9iaikge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcblxuICAgIGNvbnN0IG9iakxlZnRTaWRlID0gb2JqLnBvc1g7IC8vIDE1MFxuICAgIGNvbnN0IG9ialJpZ2h0U2lkZSA9IG9iai5wb3NYICsgb2JqLndpZHRoOyAvLyAyMDBcbiAgICBjb25zdCBvYmpUb3BTaWRlID0gb2JqLnBvc1k7IC8vIDBcbiAgICBjb25zdCBvYmpCb3R0b21TaWRlID0gb2JqLnBvc1kgKyBvYmouaGVpZ2h0OyAvLyA1MFxuXG4gICAgY29uc3QgZnJvZ2dlckxlZnRTaWRlID0gZnJvZ2dlci5wb3NYOyAvLyAxNTBcbiAgICBjb25zdCBmcm9nZ2VyUmlnaHRTaWRlID0gZnJvZ2dlci5wb3NYICsgZnJvZ2dlci53aWR0aDsgLy8gMjAwXG4gICAgY29uc3QgZnJvZ2dlclRvcFNpZGUgPSBmcm9nZ2VyLnBvc1k7IC8vIDQ1XG4gICAgY29uc3QgZnJvZ2dlckJvdHRvbVNpZGUgPSBmcm9nZ2VyLnBvc1kgKyBmcm9nZ2VyLmhlaWdodDsgLy8gOTVcblxuXG4gICAgaWYgKFxuICAgICAgICAoKGZyb2dnZXJSaWdodFNpZGUgPiBvYmpMZWZ0U2lkZSAmJiBmcm9nZ2VyUmlnaHRTaWRlIDw9IG9ialJpZ2h0U2lkZSkgfHxcbiAgICAgICAgIChmcm9nZ2VyTGVmdFNpZGUgPCBvYmpSaWdodFNpZGUgJiYgZnJvZ2dlckxlZnRTaWRlID49IG9iakxlZnRTaWRlKSkgJiZcbiAgICAgICAgKGZyb2dnZXJUb3BTaWRlIDwgb2JqQm90dG9tU2lkZSAmJiBmcm9nZ2VyQm90dG9tU2lkZSA+IG9ialRvcFNpZGUpXG4gICAgKSB7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiY29uc3QgRHJhd0Z1bmN0aW9ucyA9IHtcbiAgZHJhd1JlY3Q6IChjdHgsIHBvc1gsIHBvc1ksIHdpZHRoLCBoZWlnaHQsIGNvbG9yKSA9PntcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgucmVjdChwb3NYLCBwb3NZLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gIH0sXG5cbiAgY29sb3JUZXh0OiAoY3R4LCBzaG93V29yZHMsIHRleHRYLCB0ZXh0WSwgY29sb3IpID0+IHtcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgY3R4LmZpbGxUZXh0KHNob3dXb3JkcywgdGV4dFgsIHRleHRZKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEcmF3RnVuY3Rpb25zO1xuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9Db21wb25lbnRzL0dhbWUuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT57XG4gIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgZ2FtZS5zdGFydEdhbWUoKTtcbn0pO1xuIl19
