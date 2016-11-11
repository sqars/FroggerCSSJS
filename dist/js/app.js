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
        this.frogger = new _Frogger2.default(this.board);
        this.froggerMoving = false;
        this.cars = _CarService2.default.createCars();
        this.water = new _Water2.default();
        this.turtles = _TurtleService2.default.createTurtles();
        this.woods = _WoodService2.default.createWood();
        this.grass = _GrassService2.default.createGrass();
        this.winningSpots = _WinningSpotService2.default.createWinningSpots();
    }

    _createClass(Board, [{
        key: 'setBoard',
        value: function setBoard() {
            var _this = this;

            this.context.clearRect(0, 0, this.board.width, this.board.height);
            this.water.drawWater(this.context);
            this.grass.forEach(function (grass) {
                return grass.drawGrass(_this.context);
            });
            this.winningSpots.forEach(function (spot) {
                return spot.drawSpot(_this.context);
            });
            this.cars.forEach(function (car) {
                return car.drawCar(_this.context);
            });
            this.cars.forEach(function (car) {
                return car.move(_this.cars);
            });
            this.turtles.forEach(function (turtle) {
                return turtle.drawTurtle(_this.context);
            });
            this.turtles.forEach(function (turtle) {
                return turtle.move(_this.turtles);
            });
            this.woods.forEach(function (wood) {
                return wood.drawWood(_this.context);
            });
            this.woods.forEach(function (wood) {
                return wood.move(_this.woods);
            });
            this.frogger.drawFrogger(this.context);
            this.froggerMoving ? this.moveFrogger() : false;
            this.frogger.speed = 2;
            _WoodService2.default.checkSail(this.frogger, this.woods, this.froggerMoving);
            _TurtleService2.default.checkSail(this.frogger, this.turtles, this.froggerMoving);
            requestAnimationFrame(this.setBoard.bind(this));
        }
    }, {
        key: 'setFroggerMove',
        value: function setFroggerMove(event) {
            if (!this.froggerMoving) {
                var isMoving = this.frogger.setDirection(event);
                isMoving ? this.froggerMoving = true : false;
            }
        }
    }, {
        key: 'moveFrogger',
        value: function moveFrogger() {
            this.froggerMoving = this.frogger.move(this.frogger.direction);
        }
    }, {
        key: 'checkCollision',
        value: function checkCollision() {
            var _this2 = this;

            this.cars.forEach(function (car) {
                Math.abs(car.posX - _this2.frogger.posX) < car.width && car.posY === _this2.frogger.posY ? console.log('collision') : false;
            });
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

  checkCollision: function checkCollision(frogger, elements) {
    var froggerPos = frogger.getPosition();
    var result = false;
    elements.forEach(function (elem) {
      return elem.getPosition() === froggerPos ? result = froggerPos : false;
    });
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
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.strokeStyle = "red";
      ctx.stroke();
    }
  }]);

  return Car;
}(_MovingObject3.default);

exports.default = Car;

},{"../MovingObject.js":11,"./CarService":4}],4:[function(require,module,exports){
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
        _this.direction = 'up';
        _this.lives = 3;
        _this.movingCount = 0;
        _this.speed = 2;
        return _this;
    }

    _createClass(Frogger, [{
        key: 'drawFrogger',
        value: function drawFrogger(ctx) {
            ctx.beginPath();
            ctx.rect(this.posX, this.posY, this.height, this.width);
            ctx.fillStyle = "green";
            ctx.fill();
            ctx.closePath();
        }
    }, {
        key: 'setDirection',
        value: function setDirection(event) {
            var result = false;
            switch (event.which) {
                case 37:
                    this.direction = 'left';
                    result = true;
                    this.posX - 50 < 0 ? result = false : false;
                    break;
                case 38:
                    this.direction = 'up';
                    result = true;
                    this.posY - 50 < 0 ? result = false : false;
                    break;
                case 39:
                    this.direction = 'right';
                    result = true;
                    this.posX + 50 > 650 ? result = false : false;
                    break;
                case 40:
                    this.direction = 'down';
                    result = true;
                    this.posY + 50 > 600 ? result = false : false;
                    break;
                default:
                    result = false;
            };
            return result;
        }
    }, {
        key: 'move',
        value: function move(direction) {
            var result = false;
            var speed = this.speed;
            switch (direction) {
                case 'left':
                    this.posX -= speed;
                    break;
                case 'up':
                    this.posY -= speed;
                    break;
                case 'right':
                    this.posX += speed;
                    break;
                case 'down':
                    this.posY += speed;
                    break;
                default:
                    break;
            };
            this.movingCount++;
            this.movingCount < 25 ? result = true : this.movingCount = 0;
            return result;
        }
    }]);

    return Frogger;
}(_MovingObject3.default);

exports.default = Frogger;

},{"./MovingObject.js":11}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Board = require('./Board/Board.js');

var _Board2 = _interopRequireDefault(_Board);

var _EventEmitter = require('../EventEmitter.js');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

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
                return _this.board.setFroggerMove(event);
            });
        }
    }]);

    return Game;
}();

exports.default = Game;

},{"../EventEmitter.js":18,"./Board/Board.js":1}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    key: "drawGrass",
    value: function drawGrass(ctx) {
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.fillStyle = "#7eaea8";
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return Grass;
}();

exports.default = Grass;
;

},{}],8:[function(require,module,exports){
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    key: "drawSpot",
    value: function drawSpot(ctx) {
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.fillStyle = "#9ddfe1";
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return WinningSpot;
}();

exports.default = WinningSpot;
;

},{}],10:[function(require,module,exports){
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
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.fillStyle = "brown";
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return Turtle;
}(_MovingObject3.default);

exports.default = Turtle;

},{"../MovingObject.js":11,"./TurtleService.js":13}],13:[function(require,module,exports){
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
    },

    checkSail: function checkSail(frogger, turtles, froggerMoving) {
        turtles.forEach(function (turtle) {
            var checker = turtle.posX - frogger.posX;
            if (Math.abs(checker) < turtle.width && checker < 15 && turtle.posY === frogger.posY) {
                if (froggerMoving) {
                    frogger.direction === 'left' ? frogger.speed = 3 : frogger.speed = 1;
                } else {
                    if (turtle.width > 50) {
                        frogger.posX = turtle.posX + Math.round(Math.abs(checker) / 50) * 50;
                    } else {
                        frogger.posX = turtle.posX;
                    }
                }
            }
        });
    }

};

exports.default = TurtleService;

},{"./Turtle.js":12}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WaterService = require("./WaterService.js");

var _WaterService2 = _interopRequireDefault(_WaterService);

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
    key: "drawWater",
    value: function drawWater(ctx) {
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return Water;
}();

exports.default = Water;

},{"./WaterService.js":15}],15:[function(require,module,exports){
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
    },

    generateYPos: function generateYPos(line) {
        switch (line) {
            case 1:
                return 5;
                break;
            case 2:
                return 4;
                break;
            case 3:
                return 3;
                break;
            case 4:
                return 2;
                break;
            case 5:
                return 1;
                break;
            default:
                break;
        }
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
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.fillStyle = "beige";
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return Wood;
}(_MovingObject3.default);

exports.default = Wood;

},{"../MovingObject.js":11,"./WoodService.js":17}],17:[function(require,module,exports){
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
    },

    checkSail: function checkSail(frogger, woods, froggerMoving) {
        woods.forEach(function (wood) {
            // 100 - wpoodposX 250 - froggerpos
            var checker = wood.posX - frogger.posX; // 150
            if (frogger.posX >= wood.posX - 15 && frogger.posX <= wood.posX + wood.width - 50 && wood.posY === frogger.posY) {
                // 49 < 50
                if (froggerMoving) {
                    frogger.direction === 'right' ? frogger.speed = 3 : frogger.speed = 1;
                } else {
                    if (wood.width > 50) {
                        frogger.posX = wood.posX + Math.round(Math.abs(checker) / 50) * 50;
                    } else {
                        frogger.posX = wood.posX;
                    }
                }
            }
        });
    }
};

exports.default = WoodService;

},{"./Wood.js":16}],18:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3MuanMiLCJzcmMvanMvQ29tcG9uZW50cy9MYXN0TGluZU9ianMvR3Jhc3NTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTGFzdExpbmVPYmpzL1dpbm5pbmdTcG90U2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL01vdmluZ09iamVjdC5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9XYXRlci9XYXRlclNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Xb29kL1dvb2RTZXJ2aWNlLmpzIiwic3JjL2pzL0V2ZW50RW1pdHRlci5qcyIsInNyYy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUIsSztBQUNq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QUFLLEtBQUwsQ0FBVyxLQUFLLEdBQUwsQ0FBUyxPQUFULElBQW9CLEVBQS9CLElBQXFDLEVBQWhFO0FBQ0gscUJBRkQsTUFFTztBQUNILGdDQUFRLElBQVIsR0FBZSxLQUFLLElBQXBCO0FBQ0g7QUFDRjtBQUNGO0FBQ0osU0FiRDtBQWNIO0FBbkZlLENBQXBCOztrQkFzRmUsVzs7Ozs7Ozs7Ozs7OztJQ3hGTSxZO0FBQ2pCLDBCQUFjO0FBQUE7O0FBQ1YsU0FBSyxNQUFMLEdBQWMsRUFBZDtBQUNIOzs7OzhCQUVTLFMsRUFBVyxFLEVBQUk7QUFBQTs7QUFDdkIsT0FBQyxLQUFLLE1BQUwsQ0FBWSxTQUFaLENBQUQsR0FBMEIsS0FBSyxNQUFMLENBQVksU0FBWixJQUF5QixFQUFuRCxHQUF3RCxLQUF4RDtBQUNBLFdBQUssTUFBTCxDQUFZLFNBQVosRUFBdUIsSUFBdkIsQ0FBNEIsRUFBNUI7O0FBRUEsYUFBTyxZQUFLO0FBQ1YsY0FBSyxNQUFMLENBQVksU0FBWixJQUF5QixNQUFLLE1BQUwsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCLENBQThCO0FBQUEsaUJBQVcsT0FBTyxPQUFsQjtBQUFBLFNBQTlCLENBQXpCO0FBQ0QsT0FGRDtBQUdEOzs7eUJBRUksUyxFQUFXLEksRUFBSztBQUNuQixVQUFNLFFBQVEsS0FBSyxNQUFMLENBQVksU0FBWixDQUFkO0FBQ0EsVUFBRyxLQUFILEVBQVM7QUFDUCxjQUFNLE9BQU4sQ0FBYyxjQUFLO0FBQ2pCLGFBQUcsSUFBSCxDQUFRLElBQVIsRUFBYyxJQUFkO0FBQ0QsU0FGRDtBQUdEO0FBQ0Y7Ozs7OztrQkFyQmdCLFk7Ozs7O0FDQXJCOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFLO0FBQ2pELE1BQUksT0FBTyxvQkFBWDtBQUNBLE9BQUssU0FBTDtBQUNELENBSEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEZyb2dnZXIgZnJvbSAnLi4vRnJvZ2dlci5qcyc7XG5pbXBvcnQgV2F0ZXIgZnJvbSAnLi4vV2F0ZXIvV2F0ZXIuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi4vQ2Fycy9DYXJTZXJ2aWNlLmpzJztcbmltcG9ydCBCb2FyZFNlcnZpY2UgZnJvbSAnLi9Cb2FyZFNlcnZpY2UuanMnO1xuaW1wb3J0IFR1cnRsZVNlcnZpY2UgZnJvbSAnLi4vVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzJztcbmltcG9ydCBXYXRlclNlcnZpY2UgZnJvbSAnLi4vV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzJztcbmltcG9ydCBXb29kU2VydmljZSBmcm9tICcuLi9Xb29kL1dvb2RTZXJ2aWNlLmpzJztcbmltcG9ydCBHcmFzc1NlcnZpY2UgZnJvbSAnLi4vTGFzdExpbmVPYmpzL0dyYXNzU2VydmljZS5qcyc7XG5pbXBvcnQgV2lubmluZ1Nwb3RTZXJ2aWNlIGZyb20gJy4uL0xhc3RMaW5lT2Jqcy9XaW5uaW5nU3BvdFNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuYm9hcmQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLmZyb2dnZXIgPSBuZXcgRnJvZ2dlcih0aGlzLmJvYXJkKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyTW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FycyA9IENhclNlcnZpY2UuY3JlYXRlQ2FycygpO1xuICAgICAgICB0aGlzLndhdGVyID0gbmV3IFdhdGVyKCk7XG4gICAgICAgIHRoaXMudHVydGxlcyA9IFR1cnRsZVNlcnZpY2UuY3JlYXRlVHVydGxlcygpO1xuICAgICAgICB0aGlzLndvb2RzID0gV29vZFNlcnZpY2UuY3JlYXRlV29vZCgpO1xuICAgICAgICB0aGlzLmdyYXNzID0gR3Jhc3NTZXJ2aWNlLmNyZWF0ZUdyYXNzKCk7XG4gICAgICAgIHRoaXMud2lubmluZ1Nwb3RzID0gV2lubmluZ1Nwb3RTZXJ2aWNlLmNyZWF0ZVdpbm5pbmdTcG90cygpO1xuICAgIH1cblxuICAgIHNldEJvYXJkKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuYm9hcmQud2lkdGgsIHRoaXMuYm9hcmQuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy53YXRlci5kcmF3V2F0ZXIodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5ncmFzcy5mb3JFYWNoKGdyYXNzID0+IGdyYXNzLmRyYXdHcmFzcyh0aGlzLmNvbnRleHQpKTtcbiAgICAgICAgdGhpcy53aW5uaW5nU3BvdHMuZm9yRWFjaChzcG90ID0+IHNwb3QuZHJhd1Nwb3QodGhpcy5jb250ZXh0KSk7XG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIuZHJhd0Nhcih0aGlzLmNvbnRleHQpKTtcbiAgICAgICAgdGhpcy5jYXJzLmZvckVhY2goY2FyID0+IGNhci5tb3ZlKHRoaXMuY2FycykpO1xuICAgICAgICB0aGlzLnR1cnRsZXMuZm9yRWFjaCh0dXJ0bGUgPT4gdHVydGxlLmRyYXdUdXJ0bGUodGhpcy5jb250ZXh0KSk7XG4gICAgICAgIHRoaXMudHVydGxlcy5mb3JFYWNoKHR1cnRsZSA9PiB0dXJ0bGUubW92ZSh0aGlzLnR1cnRsZXMpKTtcbiAgICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5kcmF3V29vZCh0aGlzLmNvbnRleHQpKTtcbiAgICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5tb3ZlKHRoaXMud29vZHMpKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyLmRyYXdGcm9nZ2VyKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuZnJvZ2dlck1vdmluZyA/IHRoaXMubW92ZUZyb2dnZXIoKSA6IGZhbHNlO1xuICAgICAgICB0aGlzLmZyb2dnZXIuc3BlZWQgPSAyO1xuICAgICAgICBXb29kU2VydmljZS5jaGVja1NhaWwodGhpcy5mcm9nZ2VyLCB0aGlzLndvb2RzLCB0aGlzLmZyb2dnZXJNb3ZpbmcpO1xuICAgICAgICBUdXJ0bGVTZXJ2aWNlLmNoZWNrU2FpbCh0aGlzLmZyb2dnZXIsIHRoaXMudHVydGxlcywgdGhpcy5mcm9nZ2VyTW92aW5nKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc2V0Qm9hcmQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgc2V0RnJvZ2dlck1vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZyb2dnZXJNb3ZpbmcpIHtcbiAgICAgICAgICAgIGxldCBpc01vdmluZyA9IHRoaXMuZnJvZ2dlci5zZXREaXJlY3Rpb24oZXZlbnQpO1xuICAgICAgICAgICAgaXNNb3ZpbmcgPyB0aGlzLmZyb2dnZXJNb3ZpbmcgPSB0cnVlIDogZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlRnJvZ2dlcigpIHtcbiAgICAgICAgdGhpcy5mcm9nZ2VyTW92aW5nID0gdGhpcy5mcm9nZ2VyLm1vdmUodGhpcy5mcm9nZ2VyLmRpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgY2hlY2tDb2xsaXNpb24oKSB7XG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKChjYXIpID0+IHtcbiAgICAgICAgICAgIE1hdGguYWJzKGNhci5wb3NYIC0gdGhpcy5mcm9nZ2VyLnBvc1gpIDwgY2FyLndpZHRoICYmIGNhci5wb3NZID09PSB0aGlzLmZyb2dnZXIucG9zWSA/IGNvbnNvbGUubG9nKCdjb2xsaXNpb24nKSA6IGZhbHNlO1xuICAgICAgICB9KVxuICAgIH1cblxufVxuIiwiY29uc3QgQm9hcmRTZXJ2aWNlID0ge1xuXG4gIGNsZWFyQm9hcmQ6IChib2FyZCkgPT4ge1xuICAgIGJvYXJkLmZvckVhY2goKGRpdik9PntcbiAgICAgIGRpdi5jbGFzc05hbWUgPSBcIlwiO1xuICAgIH0pXG4gIH0sXG5cbiAgY2hlY2tDb2xsaXNpb24oZnJvZ2dlciwgZWxlbWVudHMpe1xuICAgIGxldCBmcm9nZ2VyUG9zID0gZnJvZ2dlci5nZXRQb3NpdGlvbigpO1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW0gPT4gZWxlbS5nZXRQb3NpdGlvbigpID09PSBmcm9nZ2VyUG9zID8gcmVzdWx0ID0gZnJvZ2dlclBvcyA6IGZhbHNlKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCb2FyZFNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuL0NhclNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG5cbiAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgc3BlZWQpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgdGhpcy53aWR0aCA9IENhclNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKTtcbiAgICB0aGlzLnBvc1kgPSBDYXJTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IENhclNlcnZpY2UuZ2VuZXJhdGVEaXJlY3Rpb24obGluZSk7XG4gIH1cblxuICBkcmF3Q2FyKGN0eCkge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LnJlY3QodGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IENhciBmcm9tICcuL0Nhci5qcyc7XG5cbmNvbnN0IENhclNlcnZpY2UgPSB7XG5cbiAgICBjcmVhdGVDYXJzOiAoKSA9PiB7XG4gICAgICAgIGxldCBjYXJzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDFcbiAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgd2hpbGUgKHBsYWNlZCA8PSAxNSkge1xuICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSBjYXJzLmZpbHRlcihjYXIgPT4gY2FyLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRDYXIpID0+IHtcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkQ2FyLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRDYXIud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FyID0gbmV3IENhcihwb3NYLCBsaW5lLCAxKTtcbiAgICAgICAgICAgICAgICBjYXJzLnB1c2goY2FyKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGF0dGVtcHRzID4gMTUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FyID0gbmV3IENhcigtNTAwLCBsaW5lLCAxKTtcbiAgICAgICAgICAgICAgICBjYXJzLnB1c2goY2FyKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBsYWNlZCAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGNhcnM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDU1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDQ1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gNDAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAzNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZURpcmVjdGlvbjogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL01vdmluZ09iamVjdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb2dnZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKGJvYXJkLCBwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIGxpdmVzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcbiAgICAgICAgdGhpcy5wb3NYID0gYm9hcmQud2lkdGggKiAwLjU7XG4gICAgICAgIHRoaXMucG9zWSA9IGJvYXJkLmhlaWdodCAtIHRoaXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgICAgIHRoaXMubGl2ZXMgPSAzO1xuICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDI7XG4gICAgfTtcblxuICAgIGRyYXdGcm9nZ2VyKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLmhlaWdodCwgdGhpcy53aWR0aCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBzZXREaXJlY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYIC0gNTAgPCAwID8gcmVzdWx0ID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NZIC0gNTAgPCAwID8gcmVzdWx0ID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYICsgNTAgPiA2NTAgPyByZXN1bHQgPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdkb3duJztcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWSArIDUwID4gNjAwID8gcmVzdWx0ID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgbW92ZShkaXJlY3Rpb24pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBsZXQgc3BlZWQgPSB0aGlzLnNwZWVkO1xuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYIC09IHNwZWVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgIHRoaXMucG9zWSAtPSBzcGVlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1ggKz0gc3BlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1kgKz0gc3BlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1vdmluZ0NvdW50Kys7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPCAyNSA/IHJlc3VsdCA9IHRydWUgOiB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkL0JvYXJkLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vRXZlbnRFbWl0dGVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQuc2V0Qm9hcmQoKTtcbiAgICAgICAgLy8gdGhpcy5ib2FyZC5zdGFydEJvYXJkKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCgpID0+IHRoaXMuYm9hcmQuc2V0RnJvZ2dlck1vdmUoZXZlbnQpKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFzc3tcbiAgY29uc3RydWN0b3IocG9zWCwgd2lkdGgpe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7O1xuICAgIHRoaXMucG9zWSA9IDA7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gIH07XG5cbiAgZHJhd0dyYXNzKGN0eCl7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5yZWN0KHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdlYWVhOFwiO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICB9O1xufTtcbiIsImltcG9ydCBHcmFzcyBmcm9tICcuL0dyYXNzLmpzJztcblxuY29uc3QgR3Jhc3NTZXJ2aWNlID0ge1xuICBjcmVhdGVHcmFzczogKCkgPT57XG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLmNyZWF0ZVNtYWxsR3Jhc3MoKSxcbiAgICAgIC4uLmNyZWF0ZUJpZ0dyYXNzKClcbiAgICBdO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVTbWFsbEdyYXNzKCl7XG4gIGxldCBncmFzc0xlZnQgPSBuZXcgR3Jhc3MoMCwgMjUpO1xuICBsZXQgZ3Jhc3NSaWdodCA9IG5ldyBHcmFzcyg2NzUsIDI1KTtcbiAgcmV0dXJuIFtncmFzc0xlZnQsIGdyYXNzUmlnaHRdO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQmlnR3Jhc3MoKXtcbiAgbGV0IGdyYXNzQXJyID0gW107XG4gIGZvciAobGV0IGkgPSAwLCBwb3NYID0gOTcuMjI7IGkgPCA0OyBpKyspe1xuICAgIGxldCBncmFzcyA9IG5ldyBHcmFzcyhwb3NYLCA3Mi4yMik7XG4gICAgcG9zWCArPSAxNDQuNDQ7XG4gICAgZ3Jhc3NBcnIucHVzaChncmFzcyk7XG4gIH1cbiAgcmV0dXJuIGdyYXNzQXJyO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR3Jhc3NTZXJ2aWNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2lubmluZ1Nwb3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gpe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgdGhpcy5wb3NZID0gMDtcbiAgICB0aGlzLndpZHRoID0gNzIuMjI7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgfTtcblxuICBkcmF3U3BvdChjdHgpe1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgucmVjdCh0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM5ZGRmZTFcIjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfTtcbn07XG4iLCJpbXBvcnQgV2lubmluZ1Nwb3QgZnJvbSAnLi9XaW5uaW5nU3BvdC5qcyc7XG5cbmNvbnN0IFdpbm5pbmdTcG90U2VydmljZSA9IHtcbiAgY3JlYXRlV2lubmluZ1Nwb3RzOiAoKSA9PntcbiAgICBsZXQgc3BvdHNBcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMCwgcG9zWCA9IDI1OyBpIDwgNTsgaSsrKXtcbiAgICAgIGxldCBzcG90ID0gbmV3IFdpbm5pbmdTcG90KHBvc1gpO1xuICAgICAgcG9zWCArPSAxNDQuNDQ7XG4gICAgICBzcG90c0Fyci5wdXNoKHNwb3QpO1xuICAgIH1cbiAgICByZXR1cm4gc3BvdHNBcnI7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdpbm5pbmdTcG90U2VydmljZTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBzcGVlZCkge1xuICAgICAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgICAgICB0aGlzLnBvc1kgPSBwb3NZO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIH1cblxuICAgIG1vdmUob2JqZWN0cykge1xuICAgICAgICBsZXQgbWF4O1xuICAgICAgICBsZXQgbWluO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3NYIDwgLTE1MCkge1xuICAgICAgICAgICAgICAgICAgICBtYXggPSAxODtcbiAgICAgICAgICAgICAgICAgICAgbWluID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRPYmpzID0gZmlsdGVyT2Jqcyh0aGlzLCBvYmplY3RzKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRPYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuY2hlY2tDb2xsaXNpb24ob2JqKSAmJiBhdHRlbXB0cyA8IDE1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID49MTUgPyB0aGlzLnBvc1ggPSAxNDAwIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1ggLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3NYID4gNzUwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heCA9IC01O1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSAtMTE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMSArIG1heCAtIG1pbikpICsgbWluKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRPYmpzID0gZmlsdGVyT2Jqcyh0aGlzLCBvYmplY3RzKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRPYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuY2hlY2tDb2xsaXNpb24ob2JqKSAmJiBhdHRlbXB0cyA8IDE1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgbWF4IC0gbWluKSkgKyBtaW4pICogNTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVtcHRzID49MTUgPyB0aGlzLnBvc1ggPSAtMTAwMCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjaGVja0NvbGxpc2lvbihvYmopIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBNYXRoLmFicyhvYmoucG9zWCAtIHRoaXMucG9zWCkgPCB0aGlzLndpZHRoICsgNTAgPyByZXN1bHQgPSB0cnVlIDogcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxufTtcblxuZnVuY3Rpb24gZmlsdGVyT2JqcyhjaGVja2VkT2JqLCBvYmpzKSB7XG4gICAgbGV0IGZpbHRlcmVkT2JqcyA9IG9ianMuZmlsdGVyKG9iaiA9PiBvYmoubGluZSA9PT0gY2hlY2tlZE9iai5saW5lKTtcbiAgICBsZXQgaW5kZXggPSBmaWx0ZXJlZE9ianMuaW5kZXhPZihjaGVja2VkT2JqKTtcbiAgICBmaWx0ZXJlZE9ianMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gZmlsdGVyZWRPYmpzO1xufVxuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IFR1cnRsZVNlcnZpY2UgZnJvbSAnLi9UdXJ0bGVTZXJ2aWNlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHVydGxlIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lLCBzcGVlZCl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB0aGlzLndpZHRoID0gVHVydGxlU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpO1xuICAgIHRoaXMucG9zWSA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICB9XG5cbiAgZHJhd1R1cnRsZShjdHgpIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5yZWN0KHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJicm93blwiO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFR1cnRsZSBmcm9tICcuL1R1cnRsZS5qcyc7XG5cbmNvbnN0IFR1cnRsZVNlcnZpY2UgPSB7XG5cbiAgICBjcmVhdGVUdXJ0bGVzOiAoKSA9PiB7XG4gICAgICAgIGxldCB0dXJ0bGVzID0gW107XG4gICAgICAgIGxldCBwbGFjZWQgPSAwO1xuICAgICAgICBsZXQgbGluZSA9IDE7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgIHdoaWxlIChwbGFjZWQgPD0gNykge1xuICAgICAgICAgICAgbGV0IHBvc1ggPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEgKyAxNCAtIDEpKSArIDEpICogNTA7XG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSB0dXJ0bGVzLmZpbHRlcih0dXJ0bGUgPT4gdHVydGxlLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNoZWNrZWRUdXJ0bGUpID0+IHtcbiAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkVHVydGxlLnBvc1ggLSBwb3NYKSA8IGNoZWNrZWRUdXJ0bGUud2lkdGggKyA1MCA/IGF2YWlsYWJsZSA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHVydGxlID0gbmV3IFR1cnRsZShwb3NYLCBsaW5lLCAxKTtcbiAgICAgICAgICAgICAgICB0dXJ0bGVzLnB1c2godHVydGxlKTtcbiAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDE1KSB7XG4gICAgICAgICAgICAgICAgbGV0IHR1cnRsZSA9IG5ldyBUdXJ0bGUoLTUwMCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgdHVydGxlcy5wdXNoKHR1cnRsZSk7XG4gICAgICAgICAgICAgICAgcGxhY2VkKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGFjZWQgPT0gNCkge1xuICAgICAgICAgICAgICAgIGxpbmUgPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0dXJ0bGVzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1MDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrU2FpbDogKGZyb2dnZXIsIHR1cnRsZXMsIGZyb2dnZXJNb3ZpbmcpID0+IHtcbiAgICAgICAgdHVydGxlcy5mb3JFYWNoKCh0dXJ0bGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrZXIgPSB0dXJ0bGUucG9zWCAtIGZyb2dnZXIucG9zWDtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhjaGVja2VyKSA8IHR1cnRsZS53aWR0aCAmJiBjaGVja2VyIDwgMTUgJiYgdHVydGxlLnBvc1kgPT09IGZyb2dnZXIucG9zWSkge1xuICAgICAgICAgICAgICAgIGlmIChmcm9nZ2VyTW92aW5nKSB7XG4gICAgICAgICAgICAgICAgICBmcm9nZ2VyLmRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gZnJvZ2dlci5zcGVlZCA9IDMgOiBmcm9nZ2VyLnNwZWVkID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHVydGxlLndpZHRoID4gNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IHR1cnRsZS5wb3NYICsgTWF0aC5yb3VuZChNYXRoLmFicyhjaGVja2VyKSAvIDUwKSAqIDUwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJvZ2dlci5wb3NYID0gdHVydGxlLnBvc1g7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGVTZXJ2aWNlO1xuIiwiaW1wb3J0IFdhdGVyU2VydmljZSBmcm9tICcuL1dhdGVyU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVye1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMucG9zWCA9IDA7XG4gICAgdGhpcy5wb3NZID0gNTA7XG4gICAgdGhpcy5oZWlnaHQgPSAyNTA7XG4gICAgdGhpcy53aWR0aCA9IDcwMDtcbiAgfVxuXG4gIGRyYXdXYXRlcihjdHgpe1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgucmVjdCh0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsdWVcIjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgV2F0ZXIgZnJvbSAnLi9XYXRlci5qcyc7XG5cbmNvbnN0IFdhdGVyU2VydmljZSA9IHtcbiAgY3JlYXRlV2F0ZXI6ICgpID0+IHtcbiAgICAgIGxldCB3YXRlck9ianMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDA7IGkgPD0gNzA7IGkrKykge1xuICAgICAgICAgICAgbGV0IHdhdGVyID0gbmV3IFdhdGVyKHBvc1gsIGxpbmUpO1xuICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyAxXG4gICAgICAgICAgICB3YXRlck9ianMucHVzaCh3YXRlcik7XG4gICAgICAgICAgaWYgKGkgJSAxNCA9PSAwKSB7XG4gICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgICAgcG9zWCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHdhdGVyT2JqcztcbiAgfSxcblxuICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiA1O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgV2F0ZXJTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IFdvb2RTZXJ2aWNlIGZyb20gJy4vV29vZFNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb29kIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lLCBzcGVlZCl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB0aGlzLndpZHRoID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKVxuICAgIHRoaXMucG9zWSA9IFdvb2RTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gIH1cblxuICBkcmF3V29vZChjdHgpIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5yZWN0KHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJiZWlnZVwiO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgV29vZCBmcm9tICcuL1dvb2QuanMnO1xuXG5jb25zdCBXb29kU2VydmljZSA9IHtcbiAgICAgICAgY3JlYXRlV29vZDogKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHdvb2RzID0gW107XG4gICAgICAgICAgICBsZXQgcGxhY2VkID0gMDtcbiAgICAgICAgICAgIGxldCBsaW5lID0gMTtcbiAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICB3aGlsZSAocGxhY2VkIDwgOCkge1xuICAgICAgICAgICAgICAgIGxldCBwb3NYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgMTQgLSAxKSkgKyAxKSAqIDUwO1xuICAgICAgICAgICAgICAgIGxldCBhdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSB3b29kcy5maWx0ZXIod29vZCA9PiB3b29kLmxpbmUgPT09IGxpbmUpO1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjaGVja2VkV29vZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhjaGVja2VkV29vZC5wb3NYIC0gcG9zWCkgPCBjaGVja2VkV29vZC53aWR0aCArIDUwID8gYXZhaWxhYmxlID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QocG9zWCwgbGluZSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHdvb2RzLnB1c2god29vZCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCsrO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAxNSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgd29vZCA9IG5ldyBXb29kKC01MDAsIGxpbmUsIDEpO1xuICAgICAgICAgICAgICAgICAgICB3b29kcy5wdXNoKHdvb2QpO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWQrKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocGxhY2VkID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IDI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwbGFjZWQgPT0gNSkge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gMztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdvb2RzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAyNTA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjAwO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMDA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBjaGVja1NhaWw6IChmcm9nZ2VyLCB3b29kcywgZnJvZ2dlck1vdmluZykgPT4ge1xuICAgICAgICB3b29kcy5mb3JFYWNoKCh3b29kKSA9PiB7IC8vIDEwMCAtIHdwb29kcG9zWCAyNTAgLSBmcm9nZ2VycG9zXG4gICAgICAgICAgICBjb25zdCBjaGVja2VyID0gd29vZC5wb3NYIC0gZnJvZ2dlci5wb3NYOyAvLyAxNTBcbiAgICAgICAgICAgIGlmIChmcm9nZ2VyLnBvc1ggPj0gd29vZC5wb3NYLTE1ICYmIGZyb2dnZXIucG9zWCA8PSB3b29kLnBvc1ggKyB3b29kLndpZHRoIC0gNTAgJiYgd29vZC5wb3NZID09PSBmcm9nZ2VyLnBvc1kpIHsgLy8gNDkgPCA1MFxuICAgICAgICAgICAgICBpZihmcm9nZ2VyTW92aW5nKXtcbiAgICAgICAgICAgICAgICBmcm9nZ2VyLmRpcmVjdGlvbiA9PT0gJ3JpZ2h0JyA/IGZyb2dnZXIuc3BlZWQgPSAzIDogZnJvZ2dlci5zcGVlZCA9IDE7XG4gICAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICBpZiAod29vZC53aWR0aCA+IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb2dnZXIucG9zWCA9IHdvb2QucG9zWCArIE1hdGgucm91bmQoTWF0aC5hYnMoY2hlY2tlcikgLyA1MCkgKiA1MDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmcm9nZ2VyLnBvc1ggPSB3b29kLnBvc1g7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdvb2RTZXJ2aWNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9O1xuXG4gICAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICF0aGlzLmV2ZW50c1tldmVudE5hbWVdID8gdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdIDogZmFsc2U7XG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXG4gICAgICByZXR1cm4gKCkgPT57XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcihldmVudEZuID0+IGZuICE9PSBldmVudEZuKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZW1pdChldmVudE5hbWUsIGRhdGEpe1xuICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgaWYoZXZlbnQpe1xuICAgICAgICBldmVudC5mb3JFYWNoKGZuID0+e1xuICAgICAgICAgIGZuLmNhbGwobnVsbCwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG59XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0NvbXBvbmVudHMvR2FtZS5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PntcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xufSk7XG4iXX0=
