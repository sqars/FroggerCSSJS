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
            this.frogger.checkCollisions(this.board, this.grass, this.cars, this.turtles, this.woods, this.winningSpots);
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

},{"../../Utilities/DrawFunctions.js":19,"../MovingObject.js":10,"./CarService":3}],3:[function(require,module,exports){
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
    }]);

    return Frogger;
}(_MovingObject3.default);

exports.default = Frogger;

},{"../Utilities/CheckArea.js":17,"../Utilities/CollisionDetection.js":18,"../Utilities/DrawFunctions.js":19,"../Utilities/SailService.js":20,"./MovingObject.js":10}],5:[function(require,module,exports){
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
        _this.divingCounter = 0;
        return _this;
    }

    _createClass(Turtle, [{
        key: 'drawTurtle',
        value: function drawTurtle(ctx) {
            if (this.diving) {
                if (this.divingCounter < 100) {
                    _DrawFunctions2.default.drawRect(ctx, this.posX, this.posY, this.width, this.height, 'brown');
                } else if (this.divingCounter > 200) {
                    this.divingCounter = 0;
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

},{"../../Utilities/DrawFunctions.js":19,"../MovingObject.js":10,"./TurtleService.js":12}],12:[function(require,module,exports){
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
        console.log(turtles);
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

},{"../../Utilities/DrawFunctions.js":19,"../MovingObject.js":10,"./WoodService.js":16}],16:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
'use strict';

var _Game = require('./Components/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./Components/Game.js":5}]},{},[21])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3MuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3NTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90U2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL01vdmluZ09iamVjdC5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9XYXRlci9XYXRlclNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2RTZXJ2aWNlLmpzIiwic3JjL2pzL1V0aWxpdGllcy9DaGVja0FyZWEuanMiLCJzcmMvanMvVXRpbGl0aWVzL0NvbGxpc2lvbkRldGVjdGlvbi5qcyIsInNyYy9qcy9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyIsInNyYy9qcy9VdGlsaXRpZXMvU2FpbFNlcnZpY2UuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNB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VyxDQUFDLFFBQVEsSUFBUixHQUFlLElBQUksSUFBcEIsSUFBNEIsRUFBdkMsQ0FBTCxJQUFtRCxJQUFJLEtBQTNELEVBQWtFO0FBQzlELG9CQUFRLElBQVIsR0FBZSxJQUFJLElBQUosR0FBVyxJQUFJLEtBQWYsR0FBdUIsUUFBUSxLQUE5QztBQUNILFNBRkQsTUFFTyxJQUFJLEtBQUssS0FBSyxLQUFMLENBQVcsQ0FBQyxRQUFRLElBQVIsR0FBZSxJQUFJLElBQXBCLElBQTRCLEVBQXZDLENBQUwsR0FBa0QsQ0FBdEQsRUFBeUQ7QUFDNUQsb0JBQVEsSUFBUixHQUFlLElBQUksSUFBSixHQUFZLEtBQUssS0FBSyxLQUFMLENBQVcsQ0FBQyxRQUFRLElBQVIsR0FBZSxJQUFJLElBQXBCLElBQTRCLEVBQXZDLENBQWhDO0FBQ0gsU0FGTSxNQUVBO0FBQ0gsb0JBQVEsSUFBUixHQUFlLElBQUksSUFBbkI7QUFDSDtBQUNKO0FBVGUsQ0FBcEI7O2tCQVllLFc7O0FBRWY7QUFDQTs7QUFFQTs7Ozs7QUNqQkE7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQUs7QUFDakQsTUFBSSxPQUFPLG9CQUFYO0FBQ0EsT0FBSyxTQUFMO0FBQ0QsQ0FIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRnJvZ2dlciBmcm9tICcuLi9Gcm9nZ2VyLmpzJztcbmltcG9ydCBXYXRlciBmcm9tICcuLi9XYXRlci9XYXRlci5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuLi9DYXJzL0NhclNlcnZpY2UuanMnO1xuaW1wb3J0IFR1cnRsZVNlcnZpY2UgZnJvbSAnLi4vVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzJztcbmltcG9ydCBXb29kU2VydmljZSBmcm9tICcuLi9Xb29kL1dvb2RTZXJ2aWNlLmpzJztcbmltcG9ydCBHcmFzc1NlcnZpY2UgZnJvbSAnLi4vTGFzdExpbmVPYmpzL0dyYXNzU2VydmljZS5qcyc7XG5pbXBvcnQgV2lubmluZ1Nwb3RTZXJ2aWNlIGZyb20gJy4uL0xhc3RMaW5lT2Jqcy9XaW5uaW5nU3BvdFNlcnZpY2UuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuYm9hcmQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLndhdGVyID0gbmV3IFdhdGVyKCk7XG4gICAgICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKHRoaXMuYm9hcmQpO1xuICAgICAgICB0aGlzLmNhcnMgPSBDYXJTZXJ2aWNlLmNyZWF0ZUNhcnMoKTtcbiAgICAgICAgdGhpcy50dXJ0bGVzID0gVHVydGxlU2VydmljZS5jcmVhdGVUdXJ0bGVzKCk7XG4gICAgICAgIHRoaXMud29vZHMgPSBXb29kU2VydmljZS5jcmVhdGVXb29kKCk7XG4gICAgICAgIHRoaXMuZ3Jhc3MgPSBHcmFzc1NlcnZpY2UuY3JlYXRlR3Jhc3MoKTtcbiAgICAgICAgdGhpcy53aW5uaW5nU3BvdHMgPSBXaW5uaW5nU3BvdFNlcnZpY2UuY3JlYXRlV2lubmluZ1Nwb3RzKCk7XG4gICAgfVxuXG4gICAgc2V0Qm9hcmQoKSB7XG4gICAgICAgIHRoaXMuZHJhd0FsbCgpO1xuICAgICAgICB0aGlzLm1vdmVBbGwoKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc2V0Qm9hcmQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgZHJhd0FsbCgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmJvYXJkLndpZHRoLCB0aGlzLmJvYXJkLmhlaWdodCk7IC8vIGNsZWFyIGJvYXJkXG4gICAgICAgIHRoaXMud2F0ZXIuZHJhd1dhdGVyKHRoaXMuY29udGV4dCk7IC8vIGRyYXcgV2F0ZXJcbiAgICAgICAgdGhpcy5ncmFzcy5mb3JFYWNoKGdyYXNzID0+IGdyYXNzLmRyYXdHcmFzcyh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBHcmFzc1xuICAgICAgICB0aGlzLndpbm5pbmdTcG90cy5mb3JFYWNoKHNwb3QgPT4gc3BvdC5kcmF3U3BvdCh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyB3aW5uaW5nU3BvdHNcbiAgICAgICAgdGhpcy5jYXJzLmZvckVhY2goY2FyID0+IGNhci5kcmF3Q2FyKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IENhcnNcbiAgICAgICAgdGhpcy50dXJ0bGVzLmZvckVhY2godHVydGxlID0+IHR1cnRsZS5kcmF3VHVydGxlKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IFR1cnRsZXNcbiAgICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5kcmF3V29vZCh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBXb29kc1xuICAgICAgICB0aGlzLmZyb2dnZXIuZHJhd0Zyb2dnZXIodGhpcy5jb250ZXh0KTsgLy8gZHJhdyBGcm9nZ2VyXG5cbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5jb2xvclRleHQodGhpcy5jb250ZXh0LCAncG9zWDogJyArIHRoaXMuZnJvZ2dlci5wb3NYICsgJywgcG9zWTogJyArIHRoaXMuZnJvZ2dlci5wb3NZLCB0aGlzLmZyb2dnZXIucG9zWCwgdGhpcy5mcm9nZ2VyLnBvc1ksICdibGFjaycpOyAvLyBjaGVhdCB0byBkaXNwbGF5IGZyb2dnZXIgcG9zaXRvblxuICAgIH1cblxuICAgIG1vdmVBbGwoKSB7XG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIubW92ZSh0aGlzLmNhcnMpKTsgLy8gbW92ZSBDYXJzXG4gICAgICAgIHRoaXMudHVydGxlcy5mb3JFYWNoKHR1cnRsZSA9PiB0dXJ0bGUubW92ZSh0aGlzLnR1cnRsZXMpKTsgLy8gbW92ZSBUdXJ0bGVzXG4gICAgICAgIHRoaXMud29vZHMuZm9yRWFjaCh3b29kID0+IHdvb2QubW92ZSh0aGlzLndvb2RzKSk7IC8vIG1vdmUgV29vZHNcbiAgICAgICAgdGhpcy5mcm9nZ2VyLm1vdmUoKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyLmNoZWNrQ29sbGlzaW9ucyh0aGlzLmJvYXJkLCB0aGlzLmdyYXNzLCB0aGlzLmNhcnMsIHRoaXMudHVydGxlcywgdGhpcy53b29kcywgdGhpcy53aW5uaW5nU3BvdHMpO1xuICAgIH1cbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4vQ2FyU2VydmljZSc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhciBleHRlbmRzIE1vdmluZ09iamVjdHtcblxuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lLCBzcGVlZCl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB0aGlzLndpZHRoID0gQ2FyU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpO1xuICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gQ2FyU2VydmljZS5nZW5lcmF0ZURpcmVjdGlvbihsaW5lKTtcbiAgfVxuXG4gIGRyYXdDYXIoY3R4KSB7XG4gICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ3JlZCcpO1xuICB9XG5cbn1cbiIsImltcG9ydCBDYXIgZnJvbSAnLi9DYXIuanMnO1xuXG5jb25zdCBDYXJTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlQ2FyczogKCkgPT4ge1xuICAgICAgICBsZXQgY2FycyA9IFtdO1xuICAgICAgICBsZXQgcGxhY2VkID0gMDtcbiAgICAgICAgbGV0IGxpbmUgPSAxXG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIHdoaWxlIChwbGFjZWQgPD0gMTUpIHtcbiAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gY2Fycy5maWx0ZXIoY2FyID0+IGNhci5saW5lID09PSBsaW5lKTtcbiAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkQ2FyKSA9PiB7XG4gICAgICAgICAgICAgICAgTWF0aC5hYnMoY2hlY2tlZENhci5wb3NYIC0gcG9zWCkgPCBjaGVja2VkQ2FyLndpZHRoICsgNTAgPyBhdmFpbGFibGUgPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIocG9zWCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIoLTUwMCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGFjZWQgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjYXJzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiA1NTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA0NTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDQwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMzUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVEaXJlY3Rpb246IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5pbXBvcnQgQ2hlY2tBcmVhIGZyb20gJy4uL1V0aWxpdGllcy9DaGVja0FyZWEuanMnO1xuaW1wb3J0IENvbGxpc2lvbkRldGVjdGlvbiBmcm9tICcuLi9VdGlsaXRpZXMvQ29sbGlzaW9uRGV0ZWN0aW9uLmpzJztcbmltcG9ydCBTYWlsU2VydmljZSBmcm9tICcuLi9VdGlsaXRpZXMvU2FpbFNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9nZ2VyIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCwgcG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBsaXZlcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gNTA7XG4gICAgICAgIHRoaXMucG9zWCA9IGJvYXJkLndpZHRoICogMC41O1xuICAgICAgICB0aGlzLnBvc1kgPSBib2FyZC5oZWlnaHQgLSB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy5wcmV2UG9zWCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldlBvc1kgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZEaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnNhaWxpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zYWlsaW5nT2JqID0gbnVsbDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDU7XG4gICAgICAgIHRoaXMubGl2ZXMgPSAzO1xuICAgIH07XG5cbiAgICBkcmF3RnJvZ2dlcihjdHgpIHtcbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2dyZWVuJyk7XG4gICAgfTtcblxuICAgIHRyaWdnZXJNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlRnJvZ2dlclByZXZQb3MoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzZXREaXJlY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjYWxjdWxhdGVGcm9nZ2VyUHJldlBvcygpIHtcbiAgICAgICAgdGhpcy5wcmV2RGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb247XG4gICAgICAgIHRoaXMucHJldlBvc1ggPSB0aGlzLnBvc1g7XG4gICAgICAgIHRoaXMucHJldlBvc1kgPSB0aGlzLnBvc1k7XG4gICAgfTtcblxuICAgIHJldmVydEZyb2dnZXJQb3NpdGlvbigpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gdGhpcy5wcmV2UG9zWDtcbiAgICAgICAgdGhpcy5wb3NZID0gdGhpcy5wcmV2UG9zWTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLnByZXZEaXJlY3Rpb247XG4gICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9ucyhib2FyZCwgZ3Jhc3MsIGNhcnMsIHR1cnRsZXMsIHdvb2RzLCB3aW5uaW5nU3BvdHMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2hlY2tJZk91dE9mTWFwQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZMYXN0TGluZUFyZWEsXG4gICAgICAgICAgICBjaGVja0lmQ2FyQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZUdXJ0bGVBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZldvb2RBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZldhdGVyQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZPdXRPZldhdGVyQXJlYVxuICAgICAgICB9ID0gQ2hlY2tBcmVhO1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGZpbmRDb2xsaXNpb24sXG4gICAgICAgICAgICBjaGVja091dE9mTWFwXG4gICAgICAgIH0gPSBDb2xsaXNpb25EZXRlY3Rpb247XG5cbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG5cbiAgICAgICAgICAgIGxldCBibG9ja2Vyc0NvbGxpc2lvbnMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrSWZMYXN0TGluZUFyZWEodGhpcykpIHsgLy8gY2hlY2sgY29sbGlzaW9uIG9uIGxhc3RsaW5lIG9ubHkgaWYgZnJvZ2dlciBpcyBvbiBsYXN0bGluZSBhcmVhXG4gICAgICAgICAgICAgICAgY29uc3Qgd2lubmluZ1Nwb3QgPSBmaW5kQ29sbGlzaW9uKHRoaXMsIHdpbm5pbmdTcG90cyk7XG4gICAgICAgICAgICAgICAgaWYgKHdpbm5pbmdTcG90KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IHdpbm5pbmdTcG90LnBvc1ggKyAxMS4xMTtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBhZGQgZnVuY3Rpb24gZm9yIHJlc2V0aW5nIGZyb2dnZXJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBibG9ja2Vyc0NvbGxpc2lvbnMucHVzaChmaW5kQ29sbGlzaW9uKHRoaXMsIGdyYXNzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2hlY2tJZk91dE9mTWFwQXJlYSh0aGlzKSkgeyAvLyBjaGVjayBsZWF2aW5nIGJvYXJkIGlmIGZyb2dnZXIgaXMgaW4gdGhlIGVkZ2Ugb2YgYm9hcmRcbiAgICAgICAgICAgICAgICBibG9ja2Vyc0NvbGxpc2lvbnMucHVzaChjaGVja091dE9mTWFwKHRoaXMsIGJvYXJkKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tlcnNDb2xsaXNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrZXJzQ29sbGlzaW9uc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJldmVydEZyb2dnZXJQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IG9ianNDb2xsaXNpb25zID0gW107XG5cbiAgICAgICAgaWYgKGNoZWNrSWZDYXJBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIGNhcnMgb25seSBpZiBmcm9nZ2VyIGlzIGluICdyb2FkJyBhcmVhXG4gICAgICAgICAgICBvYmpzQ29sbGlzaW9ucy5wdXNoKGZpbmRDb2xsaXNpb24odGhpcywgY2FycykpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoZWNrSWZUdXJ0bGVBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIHR1cnRsZXMgb25seSBpZiBmcm9nZ2VyIGlzIGluICd0dXJ0bGUnIGFyZWFcbiAgICAgICAgICAgIGNvbnN0IHNhaWxpbmdUdXJ0bGUgPSBmaW5kQ29sbGlzaW9uKHRoaXMsIHR1cnRsZXMpO1xuICAgICAgICAgICAgaWYgKHNhaWxpbmdUdXJ0bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZ09iaiA9IHNhaWxpbmdUdXJ0bGU7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vdmluZykge1xuICAgICAgICAgICAgICAgICAgICBTYWlsU2VydmljZS5zYWlsKHRoaXMsIHNhaWxpbmdUdXJ0bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hlY2tJZldvb2RBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiB3aXRoIHR1cnRsZXMgb25seSBpZiBmcm9nZ2VyIGlzIGluICd3b29kcycgYXJlYVxuICAgICAgICAgICAgY29uc3Qgc2FpbGluZ1dvb2QgPSBmaW5kQ29sbGlzaW9uKHRoaXMsIHdvb2RzKTtcbiAgICAgICAgICAgIGlmIChzYWlsaW5nV29vZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nT2JqID0gc2FpbGluZ1dvb2Q7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vdmluZykge1xuICAgICAgICAgICAgICAgICAgICBTYWlsU2VydmljZS5zYWlsKHRoaXMsIHNhaWxpbmdXb29kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmpzQ29sbGlzaW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG9ianNDb2xsaXNpb25zW2ldKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2tvbGl6amEnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIH07XG5cbiAgICBtb3ZlKCkge1xuICAgICAgY29uc3QgeyBjaGVja0lmT3V0T2ZXYXRlckFyZWEgfSA9IENoZWNrQXJlYTtcbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG4gICAgICAgICAgICBsZXQgc2FpbFNwZWVkID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2FpbGluZyA/IHNhaWxTcGVlZCA9IHRoaXMuc2FpbGluZ09iai5zcGVlZCA6IGZhbHNlO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggLT0gdGhpcy5zcGVlZCArIHNhaWxTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1kgLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggKz0gdGhpcy5zcGVlZCAtIHNhaWxTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWSArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm1vdmluZ0NvdW50Kys7XG4gICAgICAgICAgICBpZiAodGhpcy5tb3ZpbmdDb3VudCA+PSA1MCAvIHRoaXMuc3BlZWQpIHsgLy8gZW5kIG9mIG1vdmVtZW50XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZihjaGVja0lmT3V0T2ZXYXRlckFyZWEodGhpcykpey8vY2hlY2sgaWYgZnJvZ2dlciBtb3ZlcyBvdXQgb2Ygd2F0ZXIobW92ZXMgZG93biB0dXJ0bGUpXG4gICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSA1MCAqIE1hdGgucm91bmQodGhpcy5wb3NYIC8gNTApOyAvLyBmaXggZnJvZ2dlciBwb3NpdGlvbiB3aGVuIGxlYXZpbmcgdHVydGxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG59XG4iLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZC9Cb2FyZC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XG4gICAgfVxuXG4gICAgc3RhcnRHYW1lKCkge1xuICAgICAgICB0aGlzLmJvYXJkLnNldEJvYXJkKCk7XG4gICAgICAgIC8vIHRoaXMuYm9hcmQuc3RhcnRCb2FyZCgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoKSA9PiB0aGlzLmJvYXJkLmZyb2dnZXIudHJpZ2dlck1vdmUoZXZlbnQpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXNze1xuICBjb25zdHJ1Y3Rvcihwb3NYLCB3aWR0aCl7XG4gICAgdGhpcy5wb3NYID0gcG9zWDs7XG4gICAgdGhpcy5wb3NZID0gMDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgfTtcblxuICBkcmF3R3Jhc3MoY3R4KXtcbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnIzdlYWVhOCcpO1xuICB9O1xufTtcbiIsImltcG9ydCBHcmFzcyBmcm9tICcuL0dyYXNzLmpzJztcblxuY29uc3QgR3Jhc3NTZXJ2aWNlID0ge1xuICBjcmVhdGVHcmFzczogKCkgPT57XG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLmNyZWF0ZVNtYWxsR3Jhc3MoKSxcbiAgICAgIC4uLmNyZWF0ZUJpZ0dyYXNzKClcbiAgICBdO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVTbWFsbEdyYXNzKCl7XG4gIGxldCBncmFzc0xlZnQgPSBuZXcgR3Jhc3MoMCwgMjUpO1xuICBsZXQgZ3Jhc3NSaWdodCA9IG5ldyBHcmFzcyg2NzUsIDI1KTtcbiAgcmV0dXJuIFtncmFzc0xlZnQsIGdyYXNzUmlnaHRdO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQmlnR3Jhc3MoKXtcbiAgbGV0IGdyYXNzQXJyID0gW107XG4gIGZvciAobGV0IGkgPSAwLCBwb3NYID0gOTcuMjI7IGkgPCA0OyBpKyspe1xuICAgIGxldCBncmFzcyA9IG5ldyBHcmFzcyhwb3NYLCA3Mi4yMik7XG4gICAgcG9zWCArPSAxNDQuNDQ7XG4gICAgZ3Jhc3NBcnIucHVzaChncmFzcyk7XG4gIH1cbiAgcmV0dXJuIGdyYXNzQXJyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR3Jhc3NTZXJ2aWNlO1xuIiwiaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5uaW5nU3BvdHtcbiAgY29uc3RydWN0b3IocG9zWCl7XG4gICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICB0aGlzLnBvc1kgPSAwO1xuICAgIHRoaXMud2lkdGggPSA3Mi4yMjtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICB9O1xuXG4gIGRyYXdTcG90KGN0eCl7XG4gICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJyM5ZGRmZTEnKTtcbiAgfTtcbn07XG4iLCJpbXBvcnQgV2lubmluZ1Nwb3QgZnJvbSAnLi9XaW5uaW5nU3BvdC5qcyc7XG5cbmNvbnN0IFdpbm5pbmdTcG90U2VydmljZSA9IHtcbiAgY3JlYXRlV2lubmluZ1Nwb3RzOiAoKSA9PntcbiAgICBsZXQgc3BvdHNBcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMCwgcG9zWCA9IDI1OyBpIDwgNTsgaSsrKXtcbiAgICAgIGxldCBzcG90ID0gbmV3IFdpbm5pbmdTcG90KHBvc1gpO1xuICAgICAgcG9zWCArPSAxNDQuNDQ7XG4gICAgICBzcG90c0Fyci5wdXNoKHNwb3QpO1xuICAgIH1cbiAgICByZXR1cm4gc3BvdHNBcnI7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdpbm5pbmdTcG90U2VydmljZTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBzcGVlZCkge1xuICAgICAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgICAgICB0aGlzLnBvc1kgPSBwb3NZO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIH1cblxuICAgIG1vdmUob2JqZWN0cykge1xuICAgICAgICBsZXQgbWF4O1xuICAgICAgICBsZXQgbWluO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3NYIDwgLTE1MCkge1xuICAgICAgICAgICAgICAgICAgICBtYXggPSAxODtcbiAgICAgICAgICAgICAgICAgICAgbWluID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRPYmpzID0gZmlsdGVyT2Jqcyh0aGlzLCBvYmplY3RzKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRPYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuY2hlY2tDb2xsaXNpb24ob2JqKSAmJiBhdHRlbXB0cyA8IDE1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID49MTUgPyB0aGlzLnBvc1ggPSAxNDAwIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1ggLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3NYID4gNzUwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heCA9IC01O1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSAtMTE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRPYmpzID0gZmlsdGVyT2Jqcyh0aGlzLCBvYmplY3RzKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRPYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuY2hlY2tDb2xsaXNpb24ob2JqKSAmJiBhdHRlbXB0cyA8IDE1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID49MTUgPyB0aGlzLnBvc1ggPSAtMTAwMCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjaGVja0NvbGxpc2lvbihvYmopIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBNYXRoLmFicyhvYmoucG9zWCAtIHRoaXMucG9zWCkgPCB0aGlzLndpZHRoICsgNTAgPyByZXN1bHQgPSB0cnVlIDogcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxufTtcblxuZnVuY3Rpb24gZmlsdGVyT2JqcyhjaGVja2VkT2JqLCBvYmpzKSB7XG4gICAgbGV0IGZpbHRlcmVkT2JqcyA9IG9ianMuZmlsdGVyKG9iaiA9PiBvYmoubGluZSA9PT0gY2hlY2tlZE9iai5saW5lKTtcbiAgICBsZXQgaW5kZXggPSBmaWx0ZXJlZE9ianMuaW5kZXhPZihjaGVja2VkT2JqKTtcbiAgICBmaWx0ZXJlZE9ianMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gZmlsdGVyZWRPYmpzO1xufVxuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IFR1cnRsZVNlcnZpY2UgZnJvbSAnLi9UdXJ0bGVTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHVydGxlIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lLCBzcGVlZCwgZGl2aW5nKSB7XG4gICAgICAgIHN1cGVyKHBvc1gpO1xuICAgICAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMud2lkdGggPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlV2lkdGgobGluZSk7XG4gICAgICAgIHRoaXMucG9zWSA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgICAgICB0aGlzLmRpdmluZyA9IGRpdmluZztcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgIHRoaXMuZGl2aW5nQ291bnRlciA9IDA7XG4gICAgfVxuXG4gICAgZHJhd1R1cnRsZShjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGl2aW5nKSB7XG4gICAgICAgICAgaWYodGhpcy5kaXZpbmdDb3VudGVyIDwgMTAwKXtcbiAgICAgICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdicm93bicpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGlzLmRpdmluZ0NvdW50ZXIgPiAyMDAgKXtcbiAgICAgICAgICAgIHRoaXMuZGl2aW5nQ291bnRlciA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZGl2aW5nQ291bnRlcisrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2Jyb3duJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgVHVydGxlIGZyb20gJy4vVHVydGxlLmpzJztcblxuY29uc3QgVHVydGxlU2VydmljZSA9IHtcblxuICAgIGNyZWF0ZVR1cnRsZXM6ICgpID0+IHtcbiAgICAgICAgbGV0IHR1cnRsZXMgPSBbXTtcbiAgICAgICAgbGV0IHBsYWNlZCA9IDA7XG4gICAgICAgIGxldCBsaW5lID0gMTtcbiAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgbGV0IGRpdmluZyA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAocGxhY2VkIDw9IDcpIHtcbiAgICAgICAgICAgIGlmIChwbGFjZWQgPT0gMiB8fCBwbGFjZWQgPT0gNikge1xuICAgICAgICAgICAgICAgIGRpdmluZyA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSB0dXJ0bGVzLmZpbHRlcih0dXJ0bGUgPT4gdHVydGxlLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRUdXJ0bGUpID0+IHtcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkVHVydGxlLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRUdXJ0bGUud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHVydGxlID0gbmV3IFR1cnRsZShwb3NYLCBsaW5lLCAxLCBkaXZpbmcpO1xuICAgICAgICAgICAgICAgIHR1cnRsZXMucHVzaCh0dXJ0bGUpO1xuICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGF0dGVtcHRzID4gMTUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHVydGxlID0gbmV3IFR1cnRsZSgtNTAwLCBsaW5lLCAxLCBkaXZpbmcpO1xuICAgICAgICAgICAgICAgIHR1cnRsZXMucHVzaCh0dXJ0bGUpO1xuICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGxhY2VkID09IDQpIHtcbiAgICAgICAgICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0dXJ0bGVzKTtcbiAgICAgICAgcmV0dXJuIHR1cnRsZXM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjUwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHVydGxlU2VydmljZTtcbiIsImltcG9ydCBXYXRlclNlcnZpY2UgZnJvbSAnLi9XYXRlclNlcnZpY2UuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRlcntcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLnBvc1ggPSAwO1xuICAgIHRoaXMucG9zWSA9IDUwO1xuICAgIHRoaXMuaGVpZ2h0ID0gMjUwO1xuICAgIHRoaXMud2lkdGggPSA3MDA7XG4gIH1cblxuICBkcmF3V2F0ZXIoY3R4KXtcbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnYmx1ZScpO1xuICB9XG5cbn1cbiIsImltcG9ydCBXYXRlciBmcm9tICcuL1dhdGVyLmpzJztcblxuY29uc3QgV2F0ZXJTZXJ2aWNlID0ge1xuICBjcmVhdGVXYXRlcjogKCkgPT4ge1xuICAgICAgbGV0IHdhdGVyT2JqcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSA3MDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgd2F0ZXIgPSBuZXcgV2F0ZXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICBwb3NYID0gcG9zWCArIDFcbiAgICAgICAgICAgIHdhdGVyT2Jqcy5wdXNoKHdhdGVyKTtcbiAgICAgICAgICBpZiAoaSAlIDE0ID09IDApIHtcbiAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgICBwb3NYID0gMDtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2F0ZXJPYmpzO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXYXRlclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi9Xb29kU2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvb2QgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIHNwZWVkKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgIHRoaXMud2lkdGggPSBXb29kU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpXG4gICAgdGhpcy5wb3NZID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgfVxuXG4gIGRyYXdXb29kKGN0eCkge1xuICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2JlaWdlJyk7XG4gIH1cblxufSBcbiIsImltcG9ydCBXb29kIGZyb20gJy4vV29vZC5qcyc7XG5cbmNvbnN0IFdvb2RTZXJ2aWNlID0ge1xuICAgICAgICBjcmVhdGVXb29kOiAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgd29vZHMgPSBbXTtcbiAgICAgICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICAgICAgbGV0IGxpbmUgPSAxO1xuICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChwbGFjZWQgPCA4KSB7XG4gICAgICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkTGluZSA9IHdvb2RzLmZpbHRlcih3b29kID0+IHdvb2QubGluZSA9PT0gbGluZSk7XG4gICAgICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRXb29kKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKGNoZWNrZWRXb29kLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRXb29kLndpZHRoICsgNTAgPyBhdmFpbGFibGUgPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZChwb3NYLCBsaW5lLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgd29vZHMucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QoLTUwMCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHdvb2RzLnB1c2god29vZCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChwbGFjZWQgPT0gMykge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBsYWNlZCA9PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSAzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICByZXR1cm4gd29vZHM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1MDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAyMDA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAyMDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdvb2RTZXJ2aWNlO1xuIiwiY29uc3QgQ2hlY2tBcmVhID0ge1xuICAgIGNoZWNrSWZPdXRPZk1hcEFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZiAoZnJvZ2dlci5wb3NYIDw9IDAgfHwgZnJvZ2dlci5wb3NYID49IDY1MCB8fCBmcm9nZ2VyLnBvc1kgPD0gMCB8fCBmcm9nZ2VyLnBvc1kgPj0gNjAwKSB7XG4gICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZDYXJBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmIChmcm9nZ2VyLnBvc1kgPj0gMzUwICYmIGZyb2dnZXIucG9zWSA8PSA1NTApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZkxhc3RMaW5lQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAoZnJvZ2dlci5wb3NZIDw9IDUwICYmIGZyb2dnZXIucG9zWSA+PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZUdXJ0bGVBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgaWYoZnJvZ2dlci5wb3NZIDw9IDMwMCAmJiBmcm9nZ2VyLnBvc1kgPj0gMTUwKXtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZXb29kQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8PSAyNTAgJiYgZnJvZ2dlci5wb3NZID49IDUwKXtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZXYXRlckFyZWE6IChmcm9nZ2VyKSA9PntcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8PSAzMDAgJiYgZnJvZ2dlci5wb3NZID49IDUwKXtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZPdXRPZldhdGVyQXJlYTogKGZyb2dnZXIpID0+e1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgaWYoZnJvZ2dlci5wb3NZIDw9IDM1MCAmJiBmcm9nZ2VyLnBvc1kgPj0gMzAwKXtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGVja0FyZWE7XG4iLCJjb25zdCBDb2xsaXNpb25EZXRlY3Rpb24gPSB7XG4gICAgY2hlY2tDb2xsaXNpb246IChmcm9nZ2VyLCBvYmopID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IG9iakxlZnRTaWRlID0gb2JqLnBvc1g7IC8vIDE1MFxuICAgICAgICBjb25zdCBvYmpSaWdodFNpZGUgPSBvYmoucG9zWCArIG9iai53aWR0aDsgLy8gMjAwXG4gICAgICAgIGNvbnN0IG9ialRvcFNpZGUgPSBvYmoucG9zWTsgLy8gMFxuICAgICAgICBjb25zdCBvYmpCb3R0b21TaWRlID0gb2JqLnBvc1kgKyBvYmouaGVpZ2h0OyAvLyA1MFxuXG4gICAgICAgIGNvbnN0IGZyb2dnZXJMZWZ0U2lkZSA9IGZyb2dnZXIucG9zWDsgLy8gMTUwXG4gICAgICAgIGNvbnN0IGZyb2dnZXJSaWdodFNpZGUgPSBmcm9nZ2VyLnBvc1ggKyBmcm9nZ2VyLndpZHRoOyAvLyAyMDBcbiAgICAgICAgY29uc3QgZnJvZ2dlclRvcFNpZGUgPSBmcm9nZ2VyLnBvc1k7IC8vIDQ1XG4gICAgICAgIGNvbnN0IGZyb2dnZXJCb3R0b21TaWRlID0gZnJvZ2dlci5wb3NZICsgZnJvZ2dlci5oZWlnaHQ7IC8vIDk1XG5cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAoKGZyb2dnZXJSaWdodFNpZGUgPiBvYmpMZWZ0U2lkZSAmJiBmcm9nZ2VyUmlnaHRTaWRlIDw9IG9ialJpZ2h0U2lkZSkgfHxcbiAgICAgICAgICAgICAgICAoZnJvZ2dlckxlZnRTaWRlIDwgb2JqUmlnaHRTaWRlICYmIGZyb2dnZXJMZWZ0U2lkZSA+PSBvYmpMZWZ0U2lkZSkpICYmXG4gICAgICAgICAgICAoZnJvZ2dlclRvcFNpZGUgPCBvYmpCb3R0b21TaWRlICYmIGZyb2dnZXJCb3R0b21TaWRlID4gb2JqVG9wU2lkZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBmaW5kQ29sbGlzaW9uOiAoZnJvZ2dlciwgb2JqZWN0c0FycikgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0c0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKENvbGxpc2lvbkRldGVjdGlvbi5jaGVja0NvbGxpc2lvbihmcm9nZ2VyLCBvYmplY3RzQXJyW2ldKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9iamVjdHNBcnJbaV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrT3V0T2ZNYXA6IChmcm9nZ2VyLCBib2FyZCkgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmIChmcm9nZ2VyLnBvc1ggPiBib2FyZC53aWR0aCAtIDUwIHx8IGZyb2dnZXIucG9zWCA8IDAgfHxcbiAgICAgICAgICAgIGZyb2dnZXIucG9zWSA+IGJvYXJkLmhlaWdodCAtIDUwIHx8IGZyb2dnZXIucG9zWSA8IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxpc2lvbkRldGVjdGlvbjtcbiIsImNvbnN0IERyYXdGdW5jdGlvbnMgPSB7XG4gIGRyYXdSZWN0OiAoY3R4LCBwb3NYLCBwb3NZLCB3aWR0aCwgaGVpZ2h0LCBjb2xvcikgPT57XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnJlY3QocG9zWCwgcG9zWSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICB9LFxuXG4gIGNvbG9yVGV4dDogKGN0eCwgc2hvd1dvcmRzLCB0ZXh0WCwgdGV4dFksIGNvbG9yKSA9PiB7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIGN0eC5maWxsVGV4dChzaG93V29yZHMsIHRleHRYLCB0ZXh0WSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhd0Z1bmN0aW9ucztcbiIsImNvbnN0IFNhaWxTZXJ2aWNlID0ge1xuICAgIHNhaWw6IChmcm9nZ2VyLCBvYmopID0+IHtcbiAgICAgICAgaWYgKDUwICogTWF0aC5yb3VuZCgoZnJvZ2dlci5wb3NYIC0gb2JqLnBvc1gpIC8gNTApID09IG9iai53aWR0aCkge1xuICAgICAgICAgICAgZnJvZ2dlci5wb3NYID0gb2JqLnBvc1ggKyBvYmoud2lkdGggLSBmcm9nZ2VyLndpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKDUwICogTWF0aC5yb3VuZCgoZnJvZ2dlci5wb3NYIC0gb2JqLnBvc1gpIC8gNTApID4gMCkge1xuICAgICAgICAgICAgZnJvZ2dlci5wb3NYID0gb2JqLnBvc1ggKyAoNTAgKiBNYXRoLnJvdW5kKChmcm9nZ2VyLnBvc1ggLSBvYmoucG9zWCkgLyA1MCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnJvZ2dlci5wb3NYID0gb2JqLnBvc1g7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNhaWxTZXJ2aWNlO1xuXG4vLyB8NDAwfDQ1MHw1MDB8XG4vLyAgICAgICAgICAgIHw1MzB8XG5cbi8vIDUzMCAtIDQwMCA9IDEzMCB+IDE1MFxuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9Db21wb25lbnRzL0dhbWUuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT57XG4gIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgZ2FtZS5zdGFydEdhbWUoKTtcbn0pO1xuIl19
