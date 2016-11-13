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

},{"../../Utilities/DrawFunctions.js":19,"../../Utilities/Generators.js":20,"../MovingObject.js":10,"./CarService":3}],3:[function(require,module,exports){
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
                checkOutOfMap = _CollisionDetection2.default.checkOutOfMap,
                findTurtleCollision = _CollisionDetection2.default.findTurtleCollision;


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

            if (checkIfCarArea(this)) {
                // check collision with cars only if frogger is in 'road' area
                if (findCollision(this, cars)) {
                    // console.log('hit by car');
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
                var froggerSpeed = this.speed;
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
    }]);

    return Frogger;
}(_MovingObject3.default);

exports.default = Frogger;

},{"../Utilities/CheckArea.js":17,"../Utilities/CollisionDetection.js":18,"../Utilities/DrawFunctions.js":19,"../Utilities/SailService.js":21,"./MovingObject.js":10}],5:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":19,"../../Utilities/Generators.js":20,"../MovingObject.js":10,"./TurtleService.js":12}],12:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":19,"../../Utilities/Generators.js":20,"../MovingObject.js":10,"./WoodService.js":16}],16:[function(require,module,exports){
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
var Generators = {
  generateSpeed: function generateSpeed(width) {
    return Math.sqrt(width * 1 / 50);
  }
};

exports.default = Generators;

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

},{"./Components/Game.js":5}]},{},[22])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3MuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3NTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90U2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL01vdmluZ09iamVjdC5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9XYXRlci9XYXRlclNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2RTZXJ2aWNlLmpzIiwic3JjL2pzL1V0aWxpdGllcy9DaGVja0FyZWEuanMiLCJzcmMvanMvVXRpbGl0aWVzL0NvbGxpc2lvbkRldGVjdGlvbi5qcyIsInNyYy9qcy9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyIsInNyYy9qcy9VdGlsaXRpZXMvR2VuZXJhdG9ycy5qcyIsInNyYy9qcy9VdGlsaXRpZXMvU2FpbFNlcnZpY2UuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFw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SUFBSixHQUFXLElBQUksS0FBZixHQUF1QixRQUFRLEtBQTlDO0FBQ0gsU0FGRCxNQUVPLElBQUksS0FBSyxLQUFLLEtBQUwsQ0FBVyxDQUFDLFFBQVEsSUFBUixHQUFlLElBQUksSUFBcEIsSUFBNEIsRUFBdkMsQ0FBTCxHQUFrRCxDQUF0RCxFQUF5RDtBQUM1RCxvQkFBUSxJQUFSLEdBQWUsSUFBSSxJQUFKLEdBQVksS0FBSyxLQUFLLEtBQUwsQ0FBVyxDQUFDLFFBQVEsSUFBUixHQUFlLElBQUksSUFBcEIsSUFBNEIsRUFBdkMsQ0FBaEM7QUFDSCxTQUZNLE1BRUE7QUFDSCxvQkFBUSxJQUFSLEdBQWUsSUFBSSxJQUFuQjtBQUNIO0FBQ0o7QUFUZSxDQUFwQjs7a0JBWWUsVzs7QUFFZjtBQUNBOztBQUVBOzs7OztBQ2pCQTs7Ozs7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBSztBQUNqRCxNQUFJLE9BQU8sb0JBQVg7QUFDQSxPQUFLLFNBQUw7QUFDRCxDQUhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBGcm9nZ2VyIGZyb20gJy4uL0Zyb2dnZXIuanMnO1xuaW1wb3J0IFdhdGVyIGZyb20gJy4uL1dhdGVyL1dhdGVyLmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4uL0NhcnMvQ2FyU2VydmljZS5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuLi9UdXJ0bGVzL1R1cnRsZVNlcnZpY2UuanMnO1xuaW1wb3J0IFdvb2RTZXJ2aWNlIGZyb20gJy4uL1dvb2QvV29vZFNlcnZpY2UuanMnO1xuaW1wb3J0IEdyYXNzU2VydmljZSBmcm9tICcuLi9MYXN0TGluZU9ianMvR3Jhc3NTZXJ2aWNlLmpzJztcbmltcG9ydCBXaW5uaW5nU3BvdFNlcnZpY2UgZnJvbSAnLi4vTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90U2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5ib2FyZC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMud2F0ZXIgPSBuZXcgV2F0ZXIoKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyID0gbmV3IEZyb2dnZXIodGhpcy5ib2FyZCk7XG4gICAgICAgIHRoaXMuY2FycyA9IENhclNlcnZpY2UuY3JlYXRlQ2FycygpO1xuICAgICAgICB0aGlzLnR1cnRsZXMgPSBUdXJ0bGVTZXJ2aWNlLmNyZWF0ZVR1cnRsZXMoKTtcbiAgICAgICAgdGhpcy53b29kcyA9IFdvb2RTZXJ2aWNlLmNyZWF0ZVdvb2QoKTtcbiAgICAgICAgdGhpcy5ncmFzcyA9IEdyYXNzU2VydmljZS5jcmVhdGVHcmFzcygpO1xuICAgICAgICB0aGlzLndpbm5pbmdTcG90cyA9IFdpbm5pbmdTcG90U2VydmljZS5jcmVhdGVXaW5uaW5nU3BvdHMoKTtcbiAgICB9XG5cbiAgICBzZXRCb2FyZCgpIHtcbiAgICAgICAgdGhpcy5kcmF3QWxsKCk7XG4gICAgICAgIHRoaXMubW92ZUFsbCgpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5zZXRCb2FyZC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBkcmF3QWxsKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuYm9hcmQud2lkdGgsIHRoaXMuYm9hcmQuaGVpZ2h0KTsgLy8gY2xlYXIgYm9hcmRcbiAgICAgICAgdGhpcy53YXRlci5kcmF3V2F0ZXIodGhpcy5jb250ZXh0KTsgLy8gZHJhdyBXYXRlclxuICAgICAgICB0aGlzLmdyYXNzLmZvckVhY2goZ3Jhc3MgPT4gZ3Jhc3MuZHJhd0dyYXNzKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IEdyYXNzXG4gICAgICAgIHRoaXMud2lubmluZ1Nwb3RzLmZvckVhY2goc3BvdCA9PiBzcG90LmRyYXdTcG90KHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IHdpbm5pbmdTcG90c1xuICAgICAgICB0aGlzLmNhcnMuZm9yRWFjaChjYXIgPT4gY2FyLmRyYXdDYXIodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgQ2Fyc1xuICAgICAgICB0aGlzLnR1cnRsZXMuZm9yRWFjaCh0dXJ0bGUgPT4gdHVydGxlLmRyYXdUdXJ0bGUodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgVHVydGxlc1xuICAgICAgICB0aGlzLndvb2RzLmZvckVhY2god29vZCA9PiB3b29kLmRyYXdXb29kKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IFdvb2RzXG4gICAgICAgIHRoaXMuZnJvZ2dlci5kcmF3RnJvZ2dlcih0aGlzLmNvbnRleHQpOyAvLyBkcmF3IEZyb2dnZXJcblxuICAgICAgICBEcmF3RnVuY3Rpb25zLmNvbG9yVGV4dCh0aGlzLmNvbnRleHQsICdwb3NYOiAnICsgdGhpcy5mcm9nZ2VyLnBvc1ggKyAnLCBwb3NZOiAnICsgdGhpcy5mcm9nZ2VyLnBvc1ksIHRoaXMuZnJvZ2dlci5wb3NYLCB0aGlzLmZyb2dnZXIucG9zWSwgJ2JsYWNrJyk7IC8vIGNoZWF0IHRvIGRpc3BsYXkgZnJvZ2dlciBwb3NpdG9uXG4gICAgfVxuXG4gICAgbW92ZUFsbCgpIHtcbiAgICAgICAgdGhpcy5jYXJzLmZvckVhY2goY2FyID0+IGNhci5tb3ZlKHRoaXMuY2FycykpOyAvLyBtb3ZlIENhcnNcbiAgICAgICAgdGhpcy50dXJ0bGVzLmZvckVhY2godHVydGxlID0+IHR1cnRsZS5tb3ZlKHRoaXMudHVydGxlcykpOyAvLyBtb3ZlIFR1cnRsZXNcbiAgICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5tb3ZlKHRoaXMud29vZHMpKTsgLy8gbW92ZSBXb29kc1xuICAgICAgICB0aGlzLmZyb2dnZXIubW92ZSgpO1xuICAgICAgICB0aGlzLmZyb2dnZXIuY2hlY2tDb2xsaXNpb25zKHRoaXMuYm9hcmQsIHRoaXMuZ3Jhc3MsIHRoaXMuY2FycywgdGhpcy50dXJ0bGVzLCB0aGlzLndvb2RzLCB0aGlzLndpbm5pbmdTcG90cyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi9DYXJTZXJ2aWNlJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcbmltcG9ydCBHZW5lcmF0b3JzIGZyb20gJy4uLy4uL1V0aWxpdGllcy9HZW5lcmF0b3JzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcblxuICAgIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIHNwZWVkKSB7XG4gICAgICAgIHN1cGVyKHBvc1gpO1xuICAgICAgICB0aGlzLnBvc1kgPSBDYXJTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICAgICAgdGhpcy5saW5lID0gbGluZTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICAgICAgdGhpcy53aWR0aCA9IENhclNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBDYXJTZXJ2aWNlLmdlbmVyYXRlRGlyZWN0aW9uKGxpbmUpO1xuICAgICAgICB0aGlzLnNwZWVkID0gR2VuZXJhdG9ycy5nZW5lcmF0ZVNwZWVkKHRoaXMud2lkdGgpO1xuICAgIH1cblxuICAgIGRyYXdDYXIoY3R4KSB7XG4gICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdyZWQnKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBDYXIgZnJvbSAnLi9DYXIuanMnO1xuXG5jb25zdCBDYXJTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlQ2FyczogKCkgPT4ge1xuICAgICAgICBsZXQgY2FycyA9IFtdO1xuICAgICAgICBsZXQgcGxhY2VkID0gMDtcbiAgICAgICAgbGV0IGxpbmUgPSAxXG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIHdoaWxlIChwbGFjZWQgPD0gMTUpIHtcbiAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gY2Fycy5maWx0ZXIoY2FyID0+IGNhci5saW5lID09PSBsaW5lKTtcbiAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkQ2FyKSA9PiB7XG4gICAgICAgICAgICAgICAgTWF0aC5hYnMoY2hlY2tlZENhci5wb3NYIC0gcG9zWCkgPCBjaGVja2VkQ2FyLndpZHRoICsgNTAgPyBhdmFpbGFibGUgPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIoLTUwMCwgbGluZSk7XG4gICAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGFjZWQgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBjYXJzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiA1NTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA0NTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDQwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMzUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVEaXJlY3Rpb246IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5pbXBvcnQgQ2hlY2tBcmVhIGZyb20gJy4uL1V0aWxpdGllcy9DaGVja0FyZWEuanMnO1xuaW1wb3J0IENvbGxpc2lvbkRldGVjdGlvbiBmcm9tICcuLi9VdGlsaXRpZXMvQ29sbGlzaW9uRGV0ZWN0aW9uLmpzJztcbmltcG9ydCBTYWlsU2VydmljZSBmcm9tICcuLi9VdGlsaXRpZXMvU2FpbFNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9nZ2VyIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCwgcG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBsaXZlcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gNTA7XG4gICAgICAgIHRoaXMucG9zWCA9IGJvYXJkLndpZHRoICogMC41O1xuICAgICAgICB0aGlzLnBvc1kgPSBib2FyZC5oZWlnaHQgLSB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy5wcmV2UG9zWCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldlBvc1kgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZEaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnNhaWxpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zYWlsaW5nT2JqID0gbnVsbDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDU7XG4gICAgICAgIHRoaXMubGl2ZXMgPSAzO1xuICAgIH07XG5cbiAgICBkcmF3RnJvZ2dlcihjdHgpIHtcbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2dyZWVuJyk7XG4gICAgfTtcblxuICAgIHRyaWdnZXJNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5tb3ZpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlRnJvZ2dlclByZXZQb3MoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzZXREaXJlY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjYWxjdWxhdGVGcm9nZ2VyUHJldlBvcygpIHtcbiAgICAgICAgdGhpcy5wcmV2RGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb247XG4gICAgICAgIHRoaXMucHJldlBvc1ggPSB0aGlzLnBvc1g7XG4gICAgICAgIHRoaXMucHJldlBvc1kgPSB0aGlzLnBvc1k7XG4gICAgfTtcblxuICAgIHJldmVydEZyb2dnZXJQb3NpdGlvbigpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gdGhpcy5wcmV2UG9zWDtcbiAgICAgICAgdGhpcy5wb3NZID0gdGhpcy5wcmV2UG9zWTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLnByZXZEaXJlY3Rpb247XG4gICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9ucyhib2FyZCwgZ3Jhc3MsIGNhcnMsIHR1cnRsZXMsIHdvb2RzLCB3aW5uaW5nU3BvdHMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2hlY2tJZk91dE9mTWFwQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZMYXN0TGluZUFyZWEsXG4gICAgICAgICAgICBjaGVja0lmQ2FyQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZUdXJ0bGVBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZldvb2RBcmVhLFxuICAgICAgICAgICAgY2hlY2tJZldhdGVyQXJlYSxcbiAgICAgICAgICAgIGNoZWNrSWZPdXRPZldhdGVyQXJlYVxuICAgICAgICB9ID0gQ2hlY2tBcmVhO1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGZpbmRDb2xsaXNpb24sXG4gICAgICAgICAgICBjaGVja091dE9mTWFwLFxuICAgICAgICAgICAgZmluZFR1cnRsZUNvbGxpc2lvblxuICAgICAgICB9ID0gQ29sbGlzaW9uRGV0ZWN0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLm1vdmluZykge1xuXG4gICAgICAgICAgICBsZXQgYmxvY2tlcnNDb2xsaXNpb25zID0gW107XG5cbiAgICAgICAgICAgIGlmIChjaGVja0lmTGFzdExpbmVBcmVhKHRoaXMpKSB7IC8vIGNoZWNrIGNvbGxpc2lvbiBvbiBsYXN0bGluZSBvbmx5IGlmIGZyb2dnZXIgaXMgb24gbGFzdGxpbmUgYXJlYVxuICAgICAgICAgICAgICAgIGNvbnN0IHdpbm5pbmdTcG90ID0gZmluZENvbGxpc2lvbih0aGlzLCB3aW5uaW5nU3BvdHMpO1xuICAgICAgICAgICAgICAgIGlmICh3aW5uaW5nU3BvdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSB3aW5uaW5nU3BvdC5wb3NYICsgMTEuMTE7XG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogYWRkIGZ1bmN0aW9uIGZvciByZXNldGluZyBmcm9nZ2VyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tlcnNDb2xsaXNpb25zLnB1c2goZmluZENvbGxpc2lvbih0aGlzLCBncmFzcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoZWNrSWZPdXRPZk1hcEFyZWEodGhpcykpIHsgLy8gY2hlY2sgbGVhdmluZyBib2FyZCBpZiBmcm9nZ2VyIGlzIGluIHRoZSBlZGdlIG9mIGJvYXJkXG4gICAgICAgICAgICAgICAgYmxvY2tlcnNDb2xsaXNpb25zLnB1c2goY2hlY2tPdXRPZk1hcCh0aGlzLCBib2FyZCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsb2NrZXJzQ29sbGlzaW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChibG9ja2Vyc0NvbGxpc2lvbnNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXZlcnRGcm9nZ2VyUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjaGVja0lmQ2FyQXJlYSh0aGlzKSkgeyAvLyBjaGVjayBjb2xsaXNpb24gd2l0aCBjYXJzIG9ubHkgaWYgZnJvZ2dlciBpcyBpbiAncm9hZCcgYXJlYVxuICAgICAgICAgICAgaWYoZmluZENvbGxpc2lvbih0aGlzLCBjYXJzKSl7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoaXQgYnkgY2FyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hlY2tJZlR1cnRsZUFyZWEodGhpcykpIHsgLy8gY2hlY2sgY29sbGlzaW9uIHdpdGggdHVydGxlcyBvbmx5IGlmIGZyb2dnZXIgaXMgaW4gJ3R1cnRsZScgYXJlYVxuICAgICAgICAgICAgY29uc3Qgc2FpbGluZ1R1cnRsZSA9IGZpbmRUdXJ0bGVDb2xsaXNpb24odGhpcywgdHVydGxlcyk7XG4gICAgICAgICAgICBpZiAoc2FpbGluZ1R1cnRsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2FpbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nT2JqID0gc2FpbGluZ1R1cnRsZTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubW92aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIFNhaWxTZXJ2aWNlLnNhaWwodGhpcywgc2FpbGluZ1R1cnRsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGVja0lmV29vZEFyZWEodGhpcykpIHsgLy8gY2hlY2sgY29sbGlzaW9uIHdpdGggdHVydGxlcyBvbmx5IGlmIGZyb2dnZXIgaXMgaW4gJ3dvb2RzJyBhcmVhXG4gICAgICAgICAgICBjb25zdCBzYWlsaW5nV29vZCA9IGZpbmRDb2xsaXNpb24odGhpcywgd29vZHMpO1xuICAgICAgICAgICAgaWYgKHNhaWxpbmdXb29kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNhaWxpbmdPYmogPSBzYWlsaW5nV29vZDtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubW92aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIFNhaWxTZXJ2aWNlLnNhaWwodGhpcywgc2FpbGluZ1dvb2QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYWlsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hlY2tJZldhdGVyQXJlYSh0aGlzKSAmJiAhKGZpbmRUdXJ0bGVDb2xsaXNpb24odGhpcywgdHVydGxlcykgfHwgZmluZENvbGxpc2lvbih0aGlzLCB3b29kcykpKSB7IC8vIGNoZWNrIGlmIGZyb2dnZXIgaXMgaW4gd2F0ZXJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdkcm93bmVkJyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBtb3ZlKCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBjaGVja0lmT3V0T2ZXYXRlckFyZWFcbiAgICAgICAgfSA9IENoZWNrQXJlYTtcbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG4gICAgICAgICAgICBsZXQgc2FpbFNwZWVkID0gMDtcbiAgICAgICAgICAgIGxldCBmcm9nZ2VyU3BlZWQgPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgaWYodGhpcy5zYWlsaW5nKXtcbiAgICAgICAgICAgICAgaWYodGhpcy5zYWlsaW5nT2JqLmRpcmVjdGlvbiA9PT0gJ2xlZnQnKXtcbiAgICAgICAgICAgICAgICBzYWlsU3BlZWQgPSB0aGlzLnNhaWxpbmdPYmouc3BlZWQ7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zYWlsaW5nT2JqLmRpcmVjdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHNhaWxTcGVlZCA9IC10aGlzLnNhaWxpbmdPYmouc3BlZWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYIC09IHRoaXMuc3BlZWQgKyBzYWlsU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NZIC09IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYICs9IHRoaXMuc3BlZWQgLSBzYWlsU3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1kgKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCsrO1xuICAgICAgICAgICAgaWYgKHRoaXMubW92aW5nQ291bnQgPj0gNTAgLyB0aGlzLnNwZWVkKSB7IC8vIGVuZCBvZiBtb3ZlbWVudFxuICAgICAgICAgICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrSWZPdXRPZldhdGVyQXJlYSh0aGlzKSkgeyAvL2NoZWNrIGlmIGZyb2dnZXIgbW92ZXMgb3V0IG9mIHdhdGVyKG1vdmVzIGRvd24gdHVydGxlKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSA1MCAqIE1hdGgucm91bmQodGhpcy5wb3NYIC8gNTApOyAvLyBmaXggZnJvZ2dlciBwb3NpdGlvbiB3aGVuIGxlYXZpbmcgdHVydGxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG59XG4iLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZC9Cb2FyZC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XG4gICAgfVxuXG4gICAgc3RhcnRHYW1lKCkge1xuICAgICAgICB0aGlzLmJvYXJkLnNldEJvYXJkKCk7XG4gICAgICAgIC8vIHRoaXMuYm9hcmQuc3RhcnRCb2FyZCgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywoKSA9PiB0aGlzLmJvYXJkLmZyb2dnZXIudHJpZ2dlck1vdmUoZXZlbnQpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXNze1xuICBjb25zdHJ1Y3Rvcihwb3NYLCB3aWR0aCl7XG4gICAgdGhpcy5wb3NYID0gcG9zWDs7XG4gICAgdGhpcy5wb3NZID0gMDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgfTtcblxuICBkcmF3R3Jhc3MoY3R4KXtcbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnIzdlYWVhOCcpO1xuICB9O1xufTtcbiIsImltcG9ydCBHcmFzcyBmcm9tICcuL0dyYXNzLmpzJztcblxuY29uc3QgR3Jhc3NTZXJ2aWNlID0ge1xuICBjcmVhdGVHcmFzczogKCkgPT57XG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLmNyZWF0ZVNtYWxsR3Jhc3MoKSxcbiAgICAgIC4uLmNyZWF0ZUJpZ0dyYXNzKClcbiAgICBdO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVTbWFsbEdyYXNzKCl7XG4gIGxldCBncmFzc0xlZnQgPSBuZXcgR3Jhc3MoMCwgMjUpO1xuICBsZXQgZ3Jhc3NSaWdodCA9IG5ldyBHcmFzcyg2NzUsIDI1KTtcbiAgcmV0dXJuIFtncmFzc0xlZnQsIGdyYXNzUmlnaHRdO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQmlnR3Jhc3MoKXtcbiAgbGV0IGdyYXNzQXJyID0gW107XG4gIGZvciAobGV0IGkgPSAwLCBwb3NYID0gOTcuMjI7IGkgPCA0OyBpKyspe1xuICAgIGxldCBncmFzcyA9IG5ldyBHcmFzcyhwb3NYLCA3Mi4yMik7XG4gICAgcG9zWCArPSAxNDQuNDQ7XG4gICAgZ3Jhc3NBcnIucHVzaChncmFzcyk7XG4gIH1cbiAgcmV0dXJuIGdyYXNzQXJyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR3Jhc3NTZXJ2aWNlO1xuIiwiaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5uaW5nU3BvdHtcbiAgY29uc3RydWN0b3IocG9zWCl7XG4gICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICB0aGlzLnBvc1kgPSAwO1xuICAgIHRoaXMud2lkdGggPSA3Mi4yMjtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICB9O1xuXG4gIGRyYXdTcG90KGN0eCl7XG4gICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJyM5ZGRmZTEnKTtcbiAgfTtcbn07XG4iLCJpbXBvcnQgV2lubmluZ1Nwb3QgZnJvbSAnLi9XaW5uaW5nU3BvdC5qcyc7XG5cbmNvbnN0IFdpbm5pbmdTcG90U2VydmljZSA9IHtcbiAgY3JlYXRlV2lubmluZ1Nwb3RzOiAoKSA9PntcbiAgICBsZXQgc3BvdHNBcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMCwgcG9zWCA9IDI1OyBpIDwgNTsgaSsrKXtcbiAgICAgIGxldCBzcG90ID0gbmV3IFdpbm5pbmdTcG90KHBvc1gpO1xuICAgICAgcG9zWCArPSAxNDQuNDQ7XG4gICAgICBzcG90c0Fyci5wdXNoKHNwb3QpO1xuICAgIH1cbiAgICByZXR1cm4gc3BvdHNBcnI7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdpbm5pbmdTcG90U2VydmljZTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBzcGVlZCkge1xuICAgICAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgICAgICB0aGlzLnBvc1kgPSBwb3NZO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIH1cblxuICAgIG1vdmUob2JqZWN0cykge1xuICAgICAgICBsZXQgbWF4O1xuICAgICAgICBsZXQgbWluO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3NYIDwgLTE1MCkge1xuICAgICAgICAgICAgICAgICAgICBtYXggPSAxODtcbiAgICAgICAgICAgICAgICAgICAgbWluID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRPYmpzID0gZmlsdGVyT2Jqcyh0aGlzLCBvYmplY3RzKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRPYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuY2hlY2tDb2xsaXNpb24ob2JqKSAmJiBhdHRlbXB0cyA8IDE1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID49MTUgPyB0aGlzLnBvc1ggPSAxNDAwIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1ggLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3NYID4gNzUwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heCA9IC01O1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSAtMTE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRPYmpzID0gZmlsdGVyT2Jqcyh0aGlzLCBvYmplY3RzKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRPYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuY2hlY2tDb2xsaXNpb24ob2JqKSAmJiBhdHRlbXB0cyA8IDE1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID49MTUgPyB0aGlzLnBvc1ggPSAtMTAwMCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjaGVja0NvbGxpc2lvbihvYmopIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBNYXRoLmFicyhvYmoucG9zWCAtIHRoaXMucG9zWCkgPCB0aGlzLndpZHRoICsgNTAgPyByZXN1bHQgPSB0cnVlIDogcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxufTtcblxuZnVuY3Rpb24gZmlsdGVyT2JqcyhjaGVja2VkT2JqLCBvYmpzKSB7XG4gICAgbGV0IGZpbHRlcmVkT2JqcyA9IG9ianMuZmlsdGVyKG9iaiA9PiBvYmoubGluZSA9PT0gY2hlY2tlZE9iai5saW5lKTtcbiAgICBsZXQgaW5kZXggPSBmaWx0ZXJlZE9ianMuaW5kZXhPZihjaGVja2VkT2JqKTtcbiAgICBmaWx0ZXJlZE9ianMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gZmlsdGVyZWRPYmpzO1xufVxuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IFR1cnRsZVNlcnZpY2UgZnJvbSAnLi9UdXJ0bGVTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcbmltcG9ydCBHZW5lcmF0b3JzIGZyb20gJy4uLy4uL1V0aWxpdGllcy9HZW5lcmF0b3JzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHVydGxlIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lLCBkaXZpbmcpIHtcbiAgICAgICAgc3VwZXIocG9zWCk7XG4gICAgICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMud2lkdGggPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlV2lkdGgobGluZSk7XG4gICAgICAgIHRoaXMucG9zWSA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgICAgICB0aGlzLnNwZWVkID0gR2VuZXJhdG9ycy5nZW5lcmF0ZVNwZWVkKHRoaXMud2lkdGgpO1xuICAgICAgICB0aGlzLmRpdmluZyA9IGRpdmluZztcbiAgICAgICAgdGhpcy5kaXZlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgdGhpcy5kaXZpbmdDb3VudGVyID0gMDtcbiAgICB9XG5cbiAgICBkcmF3VHVydGxlKGN0eCkge1xuICAgICAgICBpZiAodGhpcy5kaXZpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpdmluZ0NvdW50ZXIgPCAxMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpdmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2Jyb3duJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGl2aW5nQ291bnRlciA+IDIwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGl2aW5nQ291bnRlciA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGl2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kaXZpbmdDb3VudGVyKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnYnJvd24nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBUdXJ0bGUgZnJvbSAnLi9UdXJ0bGUuanMnO1xuXG5jb25zdCBUdXJ0bGVTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlVHVydGxlczogKCkgPT4ge1xuICAgICAgICBsZXQgdHVydGxlcyA9IFtdO1xuICAgICAgICBsZXQgcGxhY2VkID0gMDtcbiAgICAgICAgbGV0IGxpbmUgPSAxO1xuICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuICAgICAgICBsZXQgZGl2aW5nID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChwbGFjZWQgPD0gNykge1xuICAgICAgICAgICAgaWYgKHBsYWNlZCA9PSAyIHx8IHBsYWNlZCA9PSA2KSB7XG4gICAgICAgICAgICAgICAgZGl2aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGl2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIDE0IC0gMSkpICsgMSkgKiA1MDtcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGZpbHRlcmVkTGluZSA9IHR1cnRsZXMuZmlsdGVyKHR1cnRsZSA9PiB0dXJ0bGUubGluZSA9PT0gbGluZSk7XG4gICAgICAgICAgICBmaWx0ZXJlZExpbmUuZm9yRWFjaCgoY2hlY2tlZFR1cnRsZSkgPT4ge1xuICAgICAgICAgICAgICAgIE1hdGguYWJzKGNoZWNrZWRUdXJ0bGUucG9zWCAtIHBvc1gpIDwgY2hlY2tlZFR1cnRsZS53aWR0aCArIDUwID8gYXZhaWxhYmxlID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGF2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgIGxldCB0dXJ0bGUgPSBuZXcgVHVydGxlKHBvc1gsIGxpbmUsIGRpdmluZyk7XG4gICAgICAgICAgICAgICAgdHVydGxlcy5wdXNoKHR1cnRsZSk7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAxNSkge1xuICAgICAgICAgICAgICAgIGxldCB0dXJ0bGUgPSBuZXcgVHVydGxlKC01MDAsIGxpbmUsIGRpdmluZyk7XG4gICAgICAgICAgICAgICAgdHVydGxlcy5wdXNoKHR1cnRsZSk7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGFjZWQgPT0gNCkge1xuICAgICAgICAgICAgICAgIGxpbmUgPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0dXJ0bGVzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1MDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFR1cnRsZVNlcnZpY2U7XG4iLCJpbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4vV2F0ZXJTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0ZXJ7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5wb3NYID0gMDtcbiAgICB0aGlzLnBvc1kgPSA1MDtcbiAgICB0aGlzLmhlaWdodCA9IDI1MDtcbiAgICB0aGlzLndpZHRoID0gNzAwO1xuICB9XG5cbiAgZHJhd1dhdGVyKGN0eCl7XG4gICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2JsdWUnKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgV2F0ZXIgZnJvbSAnLi9XYXRlci5qcyc7XG5cbmNvbnN0IFdhdGVyU2VydmljZSA9IHtcbiAgY3JlYXRlV2F0ZXI6ICgpID0+IHtcbiAgICAgIGxldCB3YXRlck9ianMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDA7IGkgPD0gNzA7IGkrKykge1xuICAgICAgICAgICAgbGV0IHdhdGVyID0gbmV3IFdhdGVyKHBvc1gsIGxpbmUpO1xuICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyAxXG4gICAgICAgICAgICB3YXRlck9ianMucHVzaCh3YXRlcik7XG4gICAgICAgICAgaWYgKGkgJSAxNCA9PSAwKSB7XG4gICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgICAgcG9zWCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHdhdGVyT2JqcztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgV2F0ZXJTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IFdvb2RTZXJ2aWNlIGZyb20gJy4vV29vZFNlcnZpY2UuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuaW1wb3J0IEdlbmVyYXRvcnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0dlbmVyYXRvcnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb29kIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKSB7XG4gICAgICAgIHN1cGVyKHBvc1gpO1xuICAgICAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKVxuICAgICAgICB0aGlzLnBvc1kgPSBXb29kU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSBHZW5lcmF0b3JzLmdlbmVyYXRlU3BlZWQodGhpcy53aWR0aCk7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICB9XG5cbiAgICBkcmF3V29vZChjdHgpIHtcbiAgICAgICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2JlaWdlJyk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgV29vZCBmcm9tICcuL1dvb2QuanMnO1xuXG5jb25zdCBXb29kU2VydmljZSA9IHtcbiAgICAgICAgY3JlYXRlV29vZDogKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHdvb2RzID0gW107XG4gICAgICAgICAgICBsZXQgcGxhY2VkID0gMDtcbiAgICAgICAgICAgIGxldCBsaW5lID0gMTtcbiAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICB3aGlsZSAocGxhY2VkIDwgOCkge1xuICAgICAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSB3b29kcy5maWx0ZXIod29vZCA9PiB3b29kLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkV29vZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkV29vZC5wb3NYIC0gcG9zWCkgPCBjaGVja2VkV29vZC53aWR0aCArIDUwID8gYXZhaWxhYmxlID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QocG9zWCwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIHdvb2RzLnB1c2god29vZCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAxNSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgd29vZCA9IG5ldyBXb29kKC01MDAsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICB3b29kcy5wdXNoKHdvb2QpO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocGxhY2VkID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwbGFjZWQgPT0gNSkge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gMztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdvb2RzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAyNTA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjAwO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMDA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBXb29kU2VydmljZTtcbiIsImNvbnN0IENoZWNrQXJlYSA9IHtcbiAgICBjaGVja0lmT3V0T2ZNYXBBcmVhOiAoZnJvZ2dlcikgPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgaWYgKGZyb2dnZXIucG9zWCA8PSAwIHx8IGZyb2dnZXIucG9zWCA+PSA2NTAgfHwgZnJvZ2dlci5wb3NZIDw9IDAgfHwgZnJvZ2dlci5wb3NZID49IDYwMCkge1xuICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmQ2FyQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAoZnJvZ2dlci5wb3NZID49IDM1MCAmJiBmcm9nZ2VyLnBvc1kgPD0gNTUwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGNoZWNrSWZMYXN0TGluZUFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGZyb2dnZXIucG9zWSA8PSA1MCAmJiBmcm9nZ2VyLnBvc1kgPj0gMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmVHVydGxlQXJlYTogKGZyb2dnZXIpID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGlmKGZyb2dnZXIucG9zWSA8PSAzMDAgJiYgZnJvZ2dlci5wb3NZID49IDE1MCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmV29vZEFyZWE6IChmcm9nZ2VyKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZihmcm9nZ2VyLnBvc1kgPD0gMjUwICYmIGZyb2dnZXIucG9zWSA+PSA1MCl7XG4gICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja0lmV2F0ZXJBcmVhOiAoZnJvZ2dlcikgPT57XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZihmcm9nZ2VyLnBvc1kgPCAzMDAgJiYgZnJvZ2dlci5wb3NZID4gNTApe1xuICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY2hlY2tJZk91dE9mV2F0ZXJBcmVhOiAoZnJvZ2dlcikgPT57XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBpZihmcm9nZ2VyLnBvc1kgPD0gMzUwICYmIGZyb2dnZXIucG9zWSA+PSAzMDApe1xuICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrQXJlYTtcbiIsImNvbnN0IENvbGxpc2lvbkRldGVjdGlvbiA9IHtcbiAgICBjaGVja0NvbGxpc2lvbjogKGZyb2dnZXIsIG9iaikgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgY29uc3Qgb2JqTGVmdFNpZGUgPSBvYmoucG9zWDsgLy8gMTUwXG4gICAgICAgIGNvbnN0IG9ialJpZ2h0U2lkZSA9IG9iai5wb3NYICsgb2JqLndpZHRoOyAvLyAyMDBcbiAgICAgICAgY29uc3Qgb2JqVG9wU2lkZSA9IG9iai5wb3NZOyAvLyAwXG4gICAgICAgIGNvbnN0IG9iakJvdHRvbVNpZGUgPSBvYmoucG9zWSArIG9iai5oZWlnaHQ7IC8vIDUwXG5cbiAgICAgICAgY29uc3QgZnJvZ2dlckxlZnRTaWRlID0gZnJvZ2dlci5wb3NYOyAvLyAxNTBcbiAgICAgICAgY29uc3QgZnJvZ2dlclJpZ2h0U2lkZSA9IGZyb2dnZXIucG9zWCArIGZyb2dnZXIud2lkdGg7IC8vIDIwMFxuICAgICAgICBjb25zdCBmcm9nZ2VyVG9wU2lkZSA9IGZyb2dnZXIucG9zWTsgLy8gNDVcbiAgICAgICAgY29uc3QgZnJvZ2dlckJvdHRvbVNpZGUgPSBmcm9nZ2VyLnBvc1kgKyBmcm9nZ2VyLmhlaWdodDsgLy8gOTVcblxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICggKGZyb2dnZXJSaWdodFNpZGUgPiBvYmpMZWZ0U2lkZSAmJiBmcm9nZ2VyUmlnaHRTaWRlIDw9IG9ialJpZ2h0U2lkZSkgfHxcbiAgICAgICAgICAgICAgKGZyb2dnZXJMZWZ0U2lkZSA8IG9ialJpZ2h0U2lkZSAmJiBmcm9nZ2VyTGVmdFNpZGUgPj0gb2JqTGVmdFNpZGUpKSAmJlxuICAgICAgICAgICAgICAoZnJvZ2dlclRvcFNpZGUgPCBvYmpCb3R0b21TaWRlICYmIGZyb2dnZXJCb3R0b21TaWRlID4gb2JqVG9wU2lkZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBmaW5kQ29sbGlzaW9uOiAoZnJvZ2dlciwgb2JqZWN0c0FycikgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0c0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKENvbGxpc2lvbkRldGVjdGlvbi5jaGVja0NvbGxpc2lvbihmcm9nZ2VyLCBvYmplY3RzQXJyW2ldKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9iamVjdHNBcnJbaV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIGZpbmRUdXJ0bGVDb2xsaXNpb246IChmcm9nZ2VyLCB0dXJ0bGVzQXJyKSA9PnsgLy8gd2UgbmVlZCB0aGlzIHRvIGZpbHRlciBkaXZpbmcgdHVydGxlc1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgbGV0IG5vdERpdmluZ1R1cnRsZXMgPSB0dXJ0bGVzQXJyLmZpbHRlcih0dXJ0bGUgPT4gIXR1cnRsZS5kaXZlZCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vdERpdmluZ1R1cnRsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoQ29sbGlzaW9uRGV0ZWN0aW9uLmNoZWNrQ29sbGlzaW9uKGZyb2dnZXIsIG5vdERpdmluZ1R1cnRsZXNbaV0pKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IG5vdERpdmluZ1R1cnRsZXNbaV07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjaGVja091dE9mTWFwOiAoZnJvZ2dlciwgYm9hcmQpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAoZnJvZ2dlci5wb3NYID4gYm9hcmQud2lkdGggLSA1MCB8fCBmcm9nZ2VyLnBvc1ggPCAwIHx8XG4gICAgICAgICAgICBmcm9nZ2VyLnBvc1kgPiBib2FyZC5oZWlnaHQgLSA1MCB8fCBmcm9nZ2VyLnBvc1kgPCAwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xsaXNpb25EZXRlY3Rpb247XG4iLCJjb25zdCBEcmF3RnVuY3Rpb25zID0ge1xuICBkcmF3UmVjdDogKGN0eCwgcG9zWCwgcG9zWSwgd2lkdGgsIGhlaWdodCwgY29sb3IpID0+e1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yZWN0KHBvc1gsIHBvc1ksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfSxcblxuICBjb2xvclRleHQ6IChjdHgsIHNob3dXb3JkcywgdGV4dFgsIHRleHRZLCBjb2xvcikgPT4ge1xuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICBjdHguZmlsbFRleHQoc2hvd1dvcmRzLCB0ZXh0WCwgdGV4dFkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyYXdGdW5jdGlvbnM7XG4iLCJjb25zdCBHZW5lcmF0b3JzID0ge1xuICBnZW5lcmF0ZVNwZWVkOiAod2lkdGgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHdpZHRoICogMSAvIDUwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHZW5lcmF0b3JzO1xuIiwiY29uc3QgU2FpbFNlcnZpY2UgPSB7XG4gICAgc2FpbDogKGZyb2dnZXIsIG9iaikgPT4ge1xuICAgICAgICBpZiAoNTAgKiBNYXRoLnJvdW5kKChmcm9nZ2VyLnBvc1ggLSBvYmoucG9zWCkgLyA1MCkgPT0gb2JqLndpZHRoKSB7XG4gICAgICAgICAgICBmcm9nZ2VyLnBvc1ggPSBvYmoucG9zWCArIG9iai53aWR0aCAtIGZyb2dnZXIud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoNTAgKiBNYXRoLnJvdW5kKChmcm9nZ2VyLnBvc1ggLSBvYmoucG9zWCkgLyA1MCkgPiAwKSB7XG4gICAgICAgICAgICBmcm9nZ2VyLnBvc1ggPSBvYmoucG9zWCArICg1MCAqIE1hdGgucm91bmQoKGZyb2dnZXIucG9zWCAtIG9iai5wb3NYKSAvIDUwKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9nZ2VyLnBvc1ggPSBvYmoucG9zWDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2FpbFNlcnZpY2U7XG5cbi8vIHw0MDB8NDUwfDUwMHxcbi8vICAgICAgICAgICAgfDUzMHxcblxuLy8gNTMwIC0gNDAwID0gMTMwIH4gMTUwXG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0NvbXBvbmVudHMvR2FtZS5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PntcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xufSk7XG4iXX0=
