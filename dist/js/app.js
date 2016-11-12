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
        }
    }]);

    return Board;
}();

exports.default = Board;

},{"../Cars/CarService.js":4,"../Frogger.js":5,"../LastLineObjs/GrassService.js":8,"../LastLineObjs/WinningSpotService.js":10,"../Turtles/TurtleService.js":13,"../Water/Water.js":14,"../Water/WaterService.js":15,"../Wood/WoodService.js":17,"./BoardService.js":2}],2:[function(require,module,exports){
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
    if (frogger.nextPosX >= board.width || frogger.nextPosX < 0 || frogger.nextPosY >= board.height || frogger.nextPosY < 0) {
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

},{"../../Utilities/DrawFunctions.js":18,"../MovingObject.js":11,"./CarService":4}],4:[function(require,module,exports){
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
        _this.nextPosX = null;
        _this.nextPosY = null;
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
                this.setDirection(event);
                this.calculateFroggerNextPos();
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
            };
        }
    }, {
        key: 'calculateFroggerNextPos',
        value: function calculateFroggerNextPos() {
            switch (this.direction) {
                case 'left':
                    this.nextPosX = this.posX - 50;
                    break;
                case 'up':
                    this.nextPosY = this.posY - 50;
                    break;
                case 'right':
                    this.nextPosX = this.posX + 50;
                    break;
                case 'down':
                    this.nextPosY = this.posX + 50;
                    break;
                default:
                    this.nextPosY = null;
                    this.nextPosX = null;
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

},{"../Utilities/DrawFunctions.js":18,"./MovingObject.js":11}],6:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":18}],8:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":18}],10:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":18,"../MovingObject.js":11,"./TurtleService.js":13}],13:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":18,"./WaterService.js":15}],15:[function(require,module,exports){
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

},{"../../Utilities/DrawFunctions.js":18,"../MovingObject.js":11,"./WoodService.js":17}],17:[function(require,module,exports){
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
var DrawFunctions = {
      drawRect: function drawRect(ctx, posX, posY, width, height, color) {
            ctx.beginPath();
            ctx.rect(posX, posY, width, height);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
      }
};

exports.default = DrawFunctions;

},{}],19:[function(require,module,exports){
'use strict';

var _Game = require('./Components/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./Components/Game.js":6}]},{},[19])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3MuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3NTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90U2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL01vdmluZ09iamVjdC5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9XYXRlci9XYXRlclNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2RTZXJ2aWNlLmpzIiwic3JjL2pzL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzIiwic3JjL2pzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJ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QUFnQjtBQUNwQixnQkFBVSxrQkFBQyxHQUFELEVBQU0sSUFBTixFQUFZLElBQVosRUFBa0IsS0FBbEIsRUFBeUIsTUFBekIsRUFBaUMsS0FBakMsRUFBMEM7QUFDOUMsZ0JBQUksU0FBSjtBQUNBLGdCQUFJLElBQUosQ0FBUyxJQUFULEVBQWUsSUFBZixFQUFxQixLQUFyQixFQUE0QixNQUE1QjtBQUNBLGdCQUFJLFNBQUosR0FBZ0IsS0FBaEI7QUFDQSxnQkFBSSxJQUFKO0FBQ0EsZ0JBQUksU0FBSjtBQUNMO0FBUG1CLENBQXRCOztrQkFVZSxhOzs7OztBQ1ZmOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFLO0FBQ2pELE1BQUksT0FBTyxvQkFBWDtBQUNBLE9BQUssU0FBTDtBQUNELENBSEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEZyb2dnZXIgZnJvbSAnLi4vRnJvZ2dlci5qcyc7XG5pbXBvcnQgV2F0ZXIgZnJvbSAnLi4vV2F0ZXIvV2F0ZXIuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi4vQ2Fycy9DYXJTZXJ2aWNlLmpzJztcbmltcG9ydCBCb2FyZFNlcnZpY2UgZnJvbSAnLi9Cb2FyZFNlcnZpY2UuanMnO1xuaW1wb3J0IFR1cnRsZVNlcnZpY2UgZnJvbSAnLi4vVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzJztcbmltcG9ydCBXYXRlclNlcnZpY2UgZnJvbSAnLi4vV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzJztcbmltcG9ydCBXb29kU2VydmljZSBmcm9tICcuLi9Xb29kL1dvb2RTZXJ2aWNlLmpzJztcbmltcG9ydCBHcmFzc1NlcnZpY2UgZnJvbSAnLi4vTGFzdExpbmVPYmpzL0dyYXNzU2VydmljZS5qcyc7XG5pbXBvcnQgV2lubmluZ1Nwb3RTZXJ2aWNlIGZyb20gJy4uL0xhc3RMaW5lT2Jqcy9XaW5uaW5nU3BvdFNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuYm9hcmQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLndhdGVyID0gbmV3IFdhdGVyKCk7XG4gICAgICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKHRoaXMuYm9hcmQpO1xuICAgICAgICB0aGlzLmNhcnMgPSBDYXJTZXJ2aWNlLmNyZWF0ZUNhcnMoKTtcbiAgICAgICAgdGhpcy50dXJ0bGVzID0gVHVydGxlU2VydmljZS5jcmVhdGVUdXJ0bGVzKCk7XG4gICAgICAgIHRoaXMud29vZHMgPSBXb29kU2VydmljZS5jcmVhdGVXb29kKCk7XG4gICAgICAgIHRoaXMuZ3Jhc3MgPSBHcmFzc1NlcnZpY2UuY3JlYXRlR3Jhc3MoKTtcbiAgICAgICAgdGhpcy53aW5uaW5nU3BvdHMgPSBXaW5uaW5nU3BvdFNlcnZpY2UuY3JlYXRlV2lubmluZ1Nwb3RzKCk7XG4gICAgfVxuXG4gICAgc2V0Qm9hcmQoKSB7XG4gICAgICAgIHRoaXMuZHJhd0FsbCgpO1xuICAgICAgICB0aGlzLm1vdmVBbGwoKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc2V0Qm9hcmQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgZHJhd0FsbCgpe1xuICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmJvYXJkLndpZHRoLCB0aGlzLmJvYXJkLmhlaWdodCk7IC8vIGNsZWFyIGJvYXJkXG4gICAgICB0aGlzLndhdGVyLmRyYXdXYXRlcih0aGlzLmNvbnRleHQpOyAvLyBkcmF3IFdhdGVyXG4gICAgICB0aGlzLmdyYXNzLmZvckVhY2goZ3Jhc3MgPT4gZ3Jhc3MuZHJhd0dyYXNzKHRoaXMuY29udGV4dCkpOyAvLyBkcmF3IEdyYXNzXG4gICAgICB0aGlzLndpbm5pbmdTcG90cy5mb3JFYWNoKHNwb3QgPT4gc3BvdC5kcmF3U3BvdCh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyB3aW5uaW5nU3BvdHNcbiAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIuZHJhd0Nhcih0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBDYXJzXG4gICAgICB0aGlzLnR1cnRsZXMuZm9yRWFjaCh0dXJ0bGUgPT4gdHVydGxlLmRyYXdUdXJ0bGUodGhpcy5jb250ZXh0KSk7IC8vIGRyYXcgVHVydGxlc1xuICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5kcmF3V29vZCh0aGlzLmNvbnRleHQpKTsgLy8gZHJhdyBXb29kc1xuICAgICAgdGhpcy5mcm9nZ2VyLmRyYXdGcm9nZ2VyKHRoaXMuY29udGV4dCk7IC8vIGRyYXcgRnJvZ2dlclxuICAgIH1cblxuICAgIG1vdmVBbGwoKXtcbiAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIubW92ZSh0aGlzLmNhcnMpKTsgLy8gbW92ZSBDYXJzXG4gICAgICB0aGlzLnR1cnRsZXMuZm9yRWFjaCh0dXJ0bGUgPT4gdHVydGxlLm1vdmUodGhpcy50dXJ0bGVzKSk7IC8vIG1vdmUgVHVydGxlc1xuICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5tb3ZlKHRoaXMud29vZHMpKTsgLy8gbW92ZSBXb29kc1xuICAgICAgdGhpcy5mcm9nZ2VyLm1vdmUoKTtcbiAgICB9XG59XG4iLCJjb25zdCBCb2FyZFNlcnZpY2UgPSB7XG5cbiAgY2xlYXJCb2FyZDogKGJvYXJkKSA9PiB7XG4gICAgYm9hcmQuZm9yRWFjaCgoZGl2KT0+e1xuICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgfSlcbiAgfSxcblxuICBjaGVja091dE9mTWFwKGZyb2dnZXIsIGJvYXJkKXtcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgaWYoIGZyb2dnZXIubmV4dFBvc1ggPj0gYm9hcmQud2lkdGggfHwgZnJvZ2dlci5uZXh0UG9zWCA8IDAgfHxcbiAgICAgICAgZnJvZ2dlci5uZXh0UG9zWSA+PSBib2FyZC5oZWlnaHQgfHwgZnJvZ2dlci5uZXh0UG9zWSA8IDApe1xuICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQm9hcmRTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi9DYXJTZXJ2aWNlJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuXG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIHNwZWVkKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgIHRoaXMud2lkdGggPSBDYXJTZXJ2aWNlLmdlbmVyYXRlV2lkdGgobGluZSk7XG4gICAgdGhpcy5wb3NZID0gQ2FyU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBDYXJTZXJ2aWNlLmdlbmVyYXRlRGlyZWN0aW9uKGxpbmUpO1xuICB9XG5cbiAgZHJhd0NhcihjdHgpIHtcbiAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAncmVkJyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IENhciBmcm9tICcuL0Nhci5qcyc7XG5cbmNvbnN0IENhclNlcnZpY2UgPSB7XG5cbiAgICBjcmVhdGVDYXJzOiAoKSA9PiB7XG4gICAgICAgIGxldCBjYXJzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDFcbiAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgd2hpbGUgKHBsYWNlZCA8PSAxNSkge1xuICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSBjYXJzLmZpbHRlcihjYXIgPT4gY2FyLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRDYXIpID0+IHtcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkQ2FyLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRDYXIud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FyID0gbmV3IENhcihwb3NYLCBsaW5lLCAxKTtcbiAgICAgICAgICAgICAgICBjYXJzLnB1c2goY2FyKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGF0dGVtcHRzID4gMTUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FyID0gbmV3IENhcigtNTAwLCBsaW5lLCAxKTtcbiAgICAgICAgICAgICAgICBjYXJzLnB1c2goY2FyKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBsYWNlZCAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGNhcnM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDU1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDQ1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gNDAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAzNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZURpcmVjdGlvbjogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb2dnZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKGJvYXJkLCBwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIGxpdmVzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcbiAgICAgICAgdGhpcy5wb3NYID0gYm9hcmQud2lkdGggKiAwLjU7XG4gICAgICAgIHRoaXMucG9zWSA9IGJvYXJkLmhlaWdodCAtIHRoaXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLm5leHRQb3NYID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0UG9zWSA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuc3BlZWQgPSA1O1xuICAgICAgICB0aGlzLmxpdmVzID0gMztcbiAgICB9O1xuXG4gICAgZHJhd0Zyb2dnZXIoY3R4KSB7XG4gICAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdncmVlbicpO1xuICAgIH1cblxuICAgIHRyaWdnZXJNb3ZlKGV2ZW50KXtcbiAgICAgIGlmKCF0aGlzLm1vdmluZyl7XG4gICAgICAgIHRoaXMuc2V0RGlyZWN0aW9uKGV2ZW50KTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVGcm9nZ2VyTmV4dFBvcygpO1xuICAgICAgICB0aGlzLm1vdmluZyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0RGlyZWN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdkb3duJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZmFsc2U7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlRnJvZ2dlck5leHRQb3MoKXtcbiAgICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgdGhpcy5uZXh0UG9zWCA9IHRoaXMucG9zWCAtIDUwO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICAgIHRoaXMubmV4dFBvc1kgPSB0aGlzLnBvc1kgLSA1MDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICB0aGlzLm5leHRQb3NYID0gdGhpcy5wb3NYICsgNTA7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgICB0aGlzLm5leHRQb3NZID0gdGhpcy5wb3NYICsgNTA7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHRoaXMubmV4dFBvc1kgPSBudWxsO1xuICAgICAgICAgICAgICB0aGlzLm5leHRQb3NYID0gbnVsbDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgbW92ZSgpIHtcbiAgICAgICAgaWYodGhpcy5tb3Zpbmcpe1xuICAgICAgICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICAgICAgICB0aGlzLnBvc1kgLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICAgIHRoaXMucG9zWSArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMubW92aW5nQ291bnQrKztcbiAgICAgICAgICBpZih0aGlzLm1vdmluZ0NvdW50ID49IDUwIC8gdGhpcy5zcGVlZCl7XG4gICAgICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICAgICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQvQm9hcmQuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICAgIH1cblxuICAgIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgdGhpcy5ib2FyZC5zZXRCb2FyZCgpO1xuICAgICAgICAvLyB0aGlzLmJvYXJkLnN0YXJ0Qm9hcmQoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsKCkgPT4gdGhpcy5ib2FyZC5mcm9nZ2VyLnRyaWdnZXJNb3ZlKGV2ZW50KSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFzc3tcbiAgY29uc3RydWN0b3IocG9zWCwgd2lkdGgpe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7O1xuICAgIHRoaXMucG9zWSA9IDA7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gIH07XG5cbiAgZHJhd0dyYXNzKGN0eCl7XG4gICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJyM3ZWFlYTgnKTtcbiAgfTtcbn07XG4iLCJpbXBvcnQgR3Jhc3MgZnJvbSAnLi9HcmFzcy5qcyc7XG5cbmNvbnN0IEdyYXNzU2VydmljZSA9IHtcbiAgY3JlYXRlR3Jhc3M6ICgpID0+e1xuICAgIHJldHVybiBbXG4gICAgICAuLi5jcmVhdGVTbWFsbEdyYXNzKCksXG4gICAgICAuLi5jcmVhdGVCaWdHcmFzcygpXG4gICAgXTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlU21hbGxHcmFzcygpe1xuICBsZXQgZ3Jhc3NMZWZ0ID0gbmV3IEdyYXNzKDAsIDI1KTtcbiAgbGV0IGdyYXNzUmlnaHQgPSBuZXcgR3Jhc3MoNjc1LCAyNSk7XG4gIHJldHVybiBbZ3Jhc3NMZWZ0LCBncmFzc1JpZ2h0XTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUJpZ0dyYXNzKCl7XG4gIGxldCBncmFzc0FyciA9IFtdO1xuICBmb3IgKGxldCBpID0gMCwgcG9zWCA9IDk3LjIyOyBpIDwgNDsgaSsrKXtcbiAgICBsZXQgZ3Jhc3MgPSBuZXcgR3Jhc3MocG9zWCwgNzIuMjIpO1xuICAgIHBvc1ggKz0gMTQ0LjQ0O1xuICAgIGdyYXNzQXJyLnB1c2goZ3Jhc3MpO1xuICB9XG4gIHJldHVybiBncmFzc0Fycjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdyYXNzU2VydmljZTtcbiIsImltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lubmluZ1Nwb3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gpe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgdGhpcy5wb3NZID0gMDtcbiAgICB0aGlzLndpZHRoID0gNzIuMjI7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgfTtcblxuICBkcmF3U3BvdChjdHgpe1xuICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICcjOWRkZmUxJyk7XG4gIH07XG59O1xuIiwiaW1wb3J0IFdpbm5pbmdTcG90IGZyb20gJy4vV2lubmluZ1Nwb3QuanMnO1xuXG5jb25zdCBXaW5uaW5nU3BvdFNlcnZpY2UgPSB7XG4gIGNyZWF0ZVdpbm5pbmdTcG90czogKCkgPT57XG4gICAgbGV0IHNwb3RzQXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIHBvc1ggPSAyNTsgaSA8IDU7IGkrKyl7XG4gICAgICBsZXQgc3BvdCA9IG5ldyBXaW5uaW5nU3BvdChwb3NYKTtcbiAgICAgIHBvc1ggKz0gMTQ0LjQ0O1xuICAgICAgc3BvdHNBcnIucHVzaChzcG90KTtcbiAgICB9XG4gICAgcmV0dXJuIHNwb3RzQXJyO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXaW5uaW5nU3BvdFNlcnZpY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbiwgc3BlZWQpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICAgICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB9XG5cbiAgICBtb3ZlKG9iamVjdHMpIHtcbiAgICAgICAgbGV0IG1heDtcbiAgICAgICAgbGV0IG1pbjtcbiAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWCA8IC0xNTApIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gMTg7XG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IDE0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkT2JqcyA9IGZpbHRlck9ianModGhpcywgb2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkT2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmNoZWNrQ29sbGlzaW9uKG9iaikgJiYgYXR0ZW1wdHMgPCAxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA+PTE1ID8gdGhpcy5wb3NYID0gMTQwMCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYIC09IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWCA+IDc1MCkge1xuICAgICAgICAgICAgICAgICAgICBtYXggPSAtNTtcbiAgICAgICAgICAgICAgICAgICAgbWluID0gLTExO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyBtYXggLSBtaW4pKSArIG1pbikgKiA1MDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkT2JqcyA9IGZpbHRlck9ianModGhpcywgb2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkT2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmNoZWNrQ29sbGlzaW9uKG9iaikgJiYgYXR0ZW1wdHMgPCAxNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA+PTE1ID8gdGhpcy5wb3NYID0gLTEwMDAgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWCArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY2hlY2tDb2xsaXNpb24ob2JqKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgTWF0aC5hYnMob2JqLnBvc1ggLSB0aGlzLnBvc1gpIDwgdGhpcy53aWR0aCArIDUwID8gcmVzdWx0ID0gdHJ1ZSA6IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbn07XG5cbmZ1bmN0aW9uIGZpbHRlck9ianMoY2hlY2tlZE9iaiwgb2Jqcykge1xuICAgIGxldCBmaWx0ZXJlZE9ianMgPSBvYmpzLmZpbHRlcihvYmogPT4gb2JqLmxpbmUgPT09IGNoZWNrZWRPYmoubGluZSk7XG4gICAgbGV0IGluZGV4ID0gZmlsdGVyZWRPYmpzLmluZGV4T2YoY2hlY2tlZE9iaik7XG4gICAgZmlsdGVyZWRPYmpzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkT2Jqcztcbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4vVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgRHJhd0Z1bmN0aW9ucyBmcm9tICcuLi8uLi9VdGlsaXRpZXMvRHJhd0Z1bmN0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1cnRsZSBleHRlbmRzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgc3BlZWQpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgdGhpcy53aWR0aCA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKTtcbiAgICB0aGlzLnBvc1kgPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgfVxuXG4gIGRyYXdUdXJ0bGUoY3R4KSB7XG4gICAgICBEcmF3RnVuY3Rpb25zLmRyYXdSZWN0KGN0eCwgdGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCAnYnJvd24nKTtcbiAgfVxufVxuIiwiaW1wb3J0IFR1cnRsZSBmcm9tICcuL1R1cnRsZS5qcyc7XG5cbmNvbnN0IFR1cnRsZVNlcnZpY2UgPSB7XG5cbiAgICBjcmVhdGVUdXJ0bGVzOiAoKSA9PiB7XG4gICAgICAgIGxldCB0dXJ0bGVzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDE7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIHdoaWxlIChwbGFjZWQgPD0gNykge1xuICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSB0dXJ0bGVzLmZpbHRlcih0dXJ0bGUgPT4gdHVydGxlLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRUdXJ0bGUpID0+IHtcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkVHVydGxlLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRUdXJ0bGUud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHVydGxlID0gbmV3IFR1cnRsZShwb3NYLCBsaW5lLCAxKTtcbiAgICAgICAgICAgICAgICB0dXJ0bGVzLnB1c2godHVydGxlKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgbGV0IHR1cnRsZSA9IG5ldyBUdXJ0bGUoLTUwMCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgdHVydGxlcy5wdXNoKHR1cnRsZSk7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGFjZWQgPT0gNCkge1xuICAgICAgICAgICAgICAgIGxpbmUgPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0dXJ0bGVzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1MDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFR1cnRsZVNlcnZpY2U7XG4iLCJpbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4vV2F0ZXJTZXJ2aWNlLmpzJztcbmltcG9ydCBEcmF3RnVuY3Rpb25zIGZyb20gJy4uLy4uL1V0aWxpdGllcy9EcmF3RnVuY3Rpb25zLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0ZXJ7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5wb3NYID0gMDtcbiAgICB0aGlzLnBvc1kgPSA1MDtcbiAgICB0aGlzLmhlaWdodCA9IDI1MDtcbiAgICB0aGlzLndpZHRoID0gNzAwO1xuICB9XG5cbiAgZHJhd1dhdGVyKGN0eCl7XG4gICAgRHJhd0Z1bmN0aW9ucy5kcmF3UmVjdChjdHgsIHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJ2JsdWUnKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgV2F0ZXIgZnJvbSAnLi9XYXRlci5qcyc7XG5cbmNvbnN0IFdhdGVyU2VydmljZSA9IHtcbiAgY3JlYXRlV2F0ZXI6ICgpID0+IHtcbiAgICAgIGxldCB3YXRlck9ianMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDA7IGkgPD0gNzA7IGkrKykge1xuICAgICAgICAgICAgbGV0IHdhdGVyID0gbmV3IFdhdGVyKHBvc1gsIGxpbmUpO1xuICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyAxXG4gICAgICAgICAgICB3YXRlck9ianMucHVzaCh3YXRlcik7XG4gICAgICAgICAgaWYgKGkgJSAxNCA9PSAwKSB7XG4gICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgICAgcG9zWCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHdhdGVyT2JqcztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgV2F0ZXJTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IFdvb2RTZXJ2aWNlIGZyb20gJy4vV29vZFNlcnZpY2UuanMnO1xuaW1wb3J0IERyYXdGdW5jdGlvbnMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzL0RyYXdGdW5jdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb29kIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lLCBzcGVlZCl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB0aGlzLndpZHRoID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKVxuICAgIHRoaXMucG9zWSA9IFdvb2RTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gIH1cblxuICBkcmF3V29vZChjdHgpIHtcbiAgICAgIERyYXdGdW5jdGlvbnMuZHJhd1JlY3QoY3R4LCB0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsICdiZWlnZScpO1xuICB9XG5cbn0gXG4iLCJpbXBvcnQgV29vZCBmcm9tICcuL1dvb2QuanMnO1xuXG5jb25zdCBXb29kU2VydmljZSA9IHtcbiAgICAgICAgY3JlYXRlV29vZDogKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHdvb2RzID0gW107XG4gICAgICAgICAgICBsZXQgcGxhY2VkID0gMDtcbiAgICAgICAgICAgIGxldCBsaW5lID0gMTtcbiAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICB3aGlsZSAocGxhY2VkIDwgOCkge1xuICAgICAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSB3b29kcy5maWx0ZXIod29vZCA9PiB3b29kLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkV29vZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkV29vZC5wb3NYIC0gcG9zWCkgPCBjaGVja2VkV29vZC53aWR0aCArIDUwID8gYXZhaWxhYmxlID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QocG9zWCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHdvb2RzLnB1c2god29vZCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAxNSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgd29vZCA9IG5ldyBXb29kKC01MDAsIGxpbmUsIDEpO1xuICAgICAgICAgICAgICAgICAgICB3b29kcy5wdXNoKHdvb2QpO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocGxhY2VkID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwbGFjZWQgPT0gNSkge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gMztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdvb2RzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAyNTA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjAwO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMDA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdvb2RTZXJ2aWNlO1xuIiwiY29uc3QgRHJhd0Z1bmN0aW9ucyA9IHtcbiAgZHJhd1JlY3Q6IChjdHgsIHBvc1gsIHBvc1ksIHdpZHRoLCBoZWlnaHQsIGNvbG9yKSA9PntcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgucmVjdChwb3NYLCBwb3NZLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhd0Z1bmN0aW9ucztcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vQ29tcG9uZW50cy9HYW1lLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+e1xuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG59KTtcbiJdfQ==
