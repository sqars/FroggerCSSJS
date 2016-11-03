(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Frogger = require('../Frogger.js');

var _Frogger2 = _interopRequireDefault(_Frogger);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board() {
        _classCallCheck(this, Board);

        this.board = document.getElementById('canvas');
        this.context = this.board.getContext("2d");
        this.frogger = new _Frogger2.default(this.board);
        this.cars = _CarService2.default.createCars();
        this.turtles = _TurtleService2.default.createTurtles();
        this.water = _WaterService2.default.createWater();
        this.wood = _WoodService2.default.createWood();
        this.sailElement = null;
    }

    _createClass(Board, [{
        key: 'setBoard',
        value: function setBoard() {
            this.context.clearRect(0, 0, this.board.width, this.board.height);
            this.frogger.drawFrogger(this.context);
            requestAnimationFrame(this.setBoard.bind(this));
            // this.board = document.querySelectorAll('#board div');
            // BoardService.clearBoard(this.board);
            // this.water.forEach(waterObj => waterObj.setWaterPosition(this.board));
            // this.sailElement ? this.sailElement.sailFrogger(this.frogger) : false;
            // this.turtles.forEach(turtle => turtle.setTurtlePosition(this.board));
            // this.wood.forEach(wood => wood.setWoodPosition(this.board));
            // this.frogger.setFroggerPosition(this.board);
            // this.cars.forEach(car => car.setCarPosition(this.board));
            // this.checkCollision();
        }
    }, {
        key: 'moveFrogger',
        value: function moveFrogger(event) {
            this.frogger.move(event);
            var turtleCollision = _BoardService2.default.checkCollision(this.frogger, this.turtles);
            var woodCollision = _BoardService2.default.checkCollision(this.frogger, this.wood);
            if (turtleCollision) {
                var sailTurtle = this.turtles.filter(function (turtle) {
                    return turtle.getPosition() === turtleCollision;
                });
                this.sailElement = sailTurtle[0];
            } else if (woodCollision) {
                var sailWood = this.wood.filter(function (wood) {
                    return wood.getPosition() === woodCollision;
                });
                this.sailElement = sailWood[0];
            } else {
                this.sailElement = null;
            };
            this.setBoard();
        }
    }, {
        key: 'checkCollision',
        value: function checkCollision() {
            var collision = false;
            var carCollision = _BoardService2.default.checkCollision(this.frogger, this.cars);
            var waterCollision = _BoardService2.default.checkCollision(this.frogger, this.water);
            var turtleCollision = _BoardService2.default.checkCollision(this.frogger, this.turtles);
            var woodCollision = _BoardService2.default.checkCollision(this.frogger, this.wood);
            carCollision !== false || waterCollision !== false ? collision = true : false; // TODO: check this condition
            turtleCollision ? collision = false : false;
            woodCollision ? collision = false : false;
            return collision;
        }
    }, {
        key: 'startMovingLine',
        value: function startMovingLine(objects, line) {
            var _this = this;

            var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

            return window.setInterval(function () {
                var filteredLine = objects.filter(function (obj) {
                    return obj.line == line;
                });
                filteredLine.forEach(function (obj) {
                    return obj.move();
                });
                _this.setBoard();
            }, speed); // TODO: add speed functionality
        }
    }, {
        key: 'startBoard',
        value: function startBoard() {
            for (var i = 1, speed = 1100; i <= 5; i++) {
                this.startMovingLine(this.cars, i, speed);
                speed = speed - 100;
            };
            for (var _i = 1, _speed = 900; _i <= 2; _i++) {
                this.startMovingLine(this.turtles, _i, _speed);
                _speed = 700;
            };
            for (var _i2 = 1, _speed2 = 900; _i2 <= 3; _i2++) {
                this.startMovingLine(this.wood, _i2, _speed2);
                _speed2 = _speed2 - 200;
            };
            var divingTurtles = this.turtles.filter(function (turtle) {
                return turtle.diving;
            });
            window.setInterval(function () {
                divingTurtles.forEach(function (turtle) {
                    turtle.dived = !turtle.dived;
                });
            }, 1000);
        }
    }]);

    return Board;
}();

exports.default = Board;

},{"../Cars/CarService.js":4,"../Frogger.js":5,"../Turtles/TurtleService.js":10,"../Water/WaterService.js":12,"../Wood/WoodService.js":14,"./BoardService.js":2}],2:[function(require,module,exports){
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

  function Car(posX, line) {
    _classCallCheck(this, Car);

    var _this = _possibleConstructorReturn(this, (Car.__proto__ || Object.getPrototypeOf(Car)).call(this, posX));

    _this.line = line;
    _this.posY = _CarService2.default.generateYPos(line);
    _this.direction = _CarService2.default.generateDirection(line);
    return _this;
  }

  _createClass(Car, [{
    key: 'setCarPosition',
    value: function setCarPosition(board) {
      this.posX > 13 ? this.posX = 0 : false;
      this.posX < 0 ? this.posX = 13 : false;
      board[this.getPosition()].className = "car";
    }
  }]);

  return Car;
}(_MovingObject3.default);

exports.default = Car;

},{"../MovingObject.js":7,"./CarService":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Car = require('./Car.js');

var _Car2 = _interopRequireDefault(_Car);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var CarService = {

    createCars: function createCars() {
        var cars = [];
        for (var i = 1, line = 1, posX = 0; i <= 15; i++) {
            var car = void 0;
            if (line === 5) {
                var size3Car = [];
                for (var j = 0, newPosX = posX; j < 3; j++) {
                    car = new _Car2.default(newPosX, line);
                    newPosX++;
                    size3Car.push(car);
                }
                posX = posX + 4;
                cars = [].concat(_toConsumableArray(cars), size3Car);
            } else {
                car = new _Car2.default(posX, line);
                posX = posX + 3;
                cars.push(car);
            }
            if (i % 3 == 0) {
                line++;
                switch (line) {
                    case 2:
                        posX = 6;
                        break;
                    case 3:
                        posX = 2;
                        break;
                    case 4:
                        posX = 4;
                        break;
                    case 5:
                        posX = 1;
                        break;
                    default:
                        break;
                };
            }
        }
        return cars;
    },

    generateYPos: function generateYPos(line) {
        switch (line) {
            case 1:
                return 11;
                break;
            case 2:
                return 10;
                break;
            case 3:
                return 9;
                break;
            case 4:
                return 8;
                break;
            case 5:
                return 7;
                break;
            default:
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
    return _this;
  }

  _createClass(Frogger, [{
    key: 'drawFrogger',
    value: function drawFrogger(ctx) {
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, 50, 50);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: 'setFroggerPosition',
    value: function setFroggerPosition(board) {
      board[this.getPosition()].className = "frogger";
    }
  }, {
    key: 'move',
    value: function move(event) {
      switch (event.which) {
        case 37:
          this.direction = 'left';
          this.posX--;
          break;
        case 38:
          this.direction = 'up';
          this.posY--;
          break;
        case 39:
          this.direction = 'right';
          this.posX++;
          break;
        case 40:
          this.direction = 'down';
          this.posY++;
          break;
        default:
          break;
      };
    }
  }]);

  return Frogger;
}(_MovingObject3.default);

exports.default = Frogger;

},{"./MovingObject.js":7}],6:[function(require,module,exports){
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
            this.board.setBoard();
            // this.board.startBoard();
            // document.addEventListener('keydown', () => this.board.moveFrogger(event));
        }
    }]);

    return Game;
}();

exports.default = Game;

},{"../EventEmitter.js":15,"./Board/Board.js":1}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MovingObject = function () {
  function MovingObject(posX, posY, direction) {
    _classCallCheck(this, MovingObject);

    this.posX = posX;
    this.posY = posY;
    this.direction = direction;
  }

  _createClass(MovingObject, [{
    key: 'getPosition',
    value: function getPosition() {
      return this.posX + this.posY * 14;
    }
  }, {
    key: 'move',
    value: function move() {
      switch (this.direction) {
        case 'left':
          this.posX--;
          break;
        case 'right':
          this.posX++;
          break;
        default:
          break;
      }
    }
  }, {
    key: 'sailFrogger',
    value: function sailFrogger(frogger) {
      frogger.posX = this.posX;
    }
  }]);

  return MovingObject;
}();

exports.default = MovingObject;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StaticObject = function () {
  function StaticObject(posX, posY) {
    _classCallCheck(this, StaticObject);

    this.posX = posX;
    this.posY = posY;
  }

  _createClass(StaticObject, [{
    key: "getPosition",
    value: function getPosition() {
      return this.posX + this.posY * 14;
    }
  }]);

  return StaticObject;
}();

exports.default = StaticObject;

},{}],9:[function(require,module,exports){
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

  function Turtle(posX, line, diving) {
    _classCallCheck(this, Turtle);

    var _this = _possibleConstructorReturn(this, (Turtle.__proto__ || Object.getPrototypeOf(Turtle)).call(this, posX));

    _this.line = line;
    _this.posY = _TurtleService2.default.generateYPos(line);
    _this.direction = 'left';
    _this.diving = diving;
    _this.dived = false;
    return _this;
  }

  _createClass(Turtle, [{
    key: 'setTurtlePosition',
    value: function setTurtlePosition(board) {
      this.posX < 0 ? this.posX = 13 : false;
      this.dived ? board[this.getPosition()].className = "turtle-diving" : board[this.getPosition()].className = "turtle";
      // board[this.getPosition()].className = "turtle";
    }
  }]);

  return Turtle;
}(_MovingObject3.default);

exports.default = Turtle;

},{"../MovingObject.js":7,"./TurtleService.js":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Turtle = require('./Turtle.js');

var _Turtle2 = _interopRequireDefault(_Turtle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var TurtleService = {

    createTurtles: function createTurtles() {
        var turtles = [];
        for (var i = 1, line = 1, diving = false, posX = 3; i <= 7; i++) {
            var turtle = void 0;
            if (line == 1) {
                var size2Turtle = [];
                for (var j = 0, newPosX = posX; j < 2; j++) {
                    turtle = new _Turtle2.default(newPosX, line, diving);
                    newPosX++;
                    size2Turtle.push(turtle);
                };
                posX = posX + 3;
                turtles = [].concat(_toConsumableArray(turtles), size2Turtle);
            } else {
                var size3Turtle = [];
                for (var _j = 0, _newPosX = posX; _j < 3; _j++) {
                    turtle = new _Turtle2.default(_newPosX, line, diving);
                    _newPosX++;
                    size3Turtle.push(turtle);
                };
                posX = posX + 4;
                turtles = [].concat(_toConsumableArray(turtles), size3Turtle);
            }
            if (i == 4) {
                line = 2;
                posX = 0;
            };
            if (i === 1 || i === 4) {
                diving = true;
            } else {
                diving = false;
            }
        }
        return turtles;
    },

    generateYPos: function generateYPos(line) {
        switch (line) {
            case 1:
                return 5;
                break;
            case 2:
                return 2;
                break;
            default:
                break;
        }
    }

};

exports.default = TurtleService;

},{"./Turtle.js":9}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StaticObject2 = require('../StaticObject.js');

var _StaticObject3 = _interopRequireDefault(_StaticObject2);

var _WaterService = require('./WaterService.js');

var _WaterService2 = _interopRequireDefault(_WaterService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Water = function (_StaticObject) {
  _inherits(Water, _StaticObject);

  function Water(posX, line) {
    _classCallCheck(this, Water);

    var _this = _possibleConstructorReturn(this, (Water.__proto__ || Object.getPrototypeOf(Water)).call(this, posX));

    _this.posY = _WaterService2.default.generateYPos(line);
    return _this;
  }

  _createClass(Water, [{
    key: 'setWaterPosition',
    value: function setWaterPosition(board) {
      board[this.getPosition()].className = "water";
    }
  }]);

  return Water;
}(_StaticObject3.default);

exports.default = Water;

},{"../StaticObject.js":8,"./WaterService.js":12}],12:[function(require,module,exports){
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

},{"./Water.js":11}],13:[function(require,module,exports){
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

  function Wood(posX, line) {
    _classCallCheck(this, Wood);

    var _this = _possibleConstructorReturn(this, (Wood.__proto__ || Object.getPrototypeOf(Wood)).call(this, posX));

    _this.line = line;
    _this.posY = _WoodService2.default.generateYPos(line);
    _this.direction = 'right';
    return _this;
  }

  _createClass(Wood, [{
    key: 'setWoodPosition',
    value: function setWoodPosition(board) {
      this.posX > 13 ? this.posX = 0 : false;
      board[this.getPosition()].className = "wood";
    }
  }]);

  return Wood;
}(_MovingObject3.default);

exports.default = Wood;

},{"../MovingObject.js":7,"./WoodService.js":14}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Wood = require('./Wood.js');

var _Wood2 = _interopRequireDefault(_Wood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var WoodService = {
    createWood: function createWood() {
        var woods = [];
        for (var i = 1, line = 1, posX = 0; i <= 7; i++) {
            var turtle = void 0;
            if (line === 1) {
                var size3Wood = [];
                for (var j = 0, newPosX = posX; j < 3; j++) {
                    var wood = new _Wood2.default(newPosX, line);
                    newPosX++;
                    size3Wood.push(wood);
                }
                posX = posX + 5;
                woods = [].concat(_toConsumableArray(woods), size3Wood);
            } else if (line === 2) {
                var size5Wood = [];
                for (var _j = 0, _newPosX = posX; _j < 5; _j++) {
                    var _wood = new _Wood2.default(_newPosX, line);
                    _newPosX++;
                    size5Wood.push(_wood);
                }
                posX = posX + 7;
                woods = [].concat(_toConsumableArray(woods), size5Wood);
            } else {
                var size4Wood = [];
                for (var _j2 = 0, _newPosX2 = posX; _j2 < 4; _j2++) {
                    var _wood2 = new _Wood2.default(_newPosX2, line);
                    _newPosX2++;
                    size4Wood.push(_wood2);
                }
                posX = posX + 8;
                woods = [].concat(_toConsumableArray(woods), size4Wood);
            }
            if (i == 3) {
                posX = 1;
                line = 2;
            } else if (i == 5) {
                posX = 0;
                line = 3;
            }
        }
        return woods;
    },

    generateYPos: function generateYPos(line) {
        switch (line) {
            case 1:
                return 4;
                break;
            case 2:
                return 3;
                break;
            case 3:
                return 1;
            default:
                break;
        };
    }
};

exports.default = WoodService;

},{"./Wood.js":13}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
'use strict';

var _Game = require('./Components/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./Components/Game.js":6}]},{},[16])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Nb3ZpbmdPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9TdGF0aWNPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9UdXJ0bGVzL1R1cnRsZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1dhdGVyL1dhdGVyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kU2VydmljZS5qcyIsInNyYy9qcy9FdmVudEVtaXR0ZXIuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEs7QUFDakIscUJBQWM7QUFBQTs7QUFDVixhQUFLLEtBQUwsR0FBYSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBLGFBQUssT0FBTCxHQUFlLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsSUFBdEIsQ0FBZjtBQUNBLGFBQUssT0FBTCxHQUFlLHNCQUFZLEtBQUssS0FBakIsQ0FBZjtBQUNBLGFBQUssSUFBTCxHQUFZLHFC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Q0FBWSxTQUFaLENBQWQ7QUFDQSxVQUFHLEtBQUgsRUFBUztBQUNQLGNBQU0sT0FBTixDQUFjLGNBQUs7QUFDakIsYUFBRyxJQUFILENBQVEsSUFBUixFQUFjLElBQWQ7QUFDRCxTQUZEO0FBR0Q7QUFDRjs7Ozs7O2tCQXJCZ0IsWTs7Ozs7QUNBckI7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQUs7QUFDakQsTUFBSSxPQUFPLG9CQUFYO0FBQ0EsT0FBSyxTQUFMO0FBQ0QsQ0FIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRnJvZ2dlciBmcm9tICcuLi9Gcm9nZ2VyLmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4uL0NhcnMvQ2FyU2VydmljZS5qcyc7XG5pbXBvcnQgQm9hcmRTZXJ2aWNlIGZyb20gJy4vQm9hcmRTZXJ2aWNlLmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4uL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4uL1dhdGVyL1dhdGVyU2VydmljZS5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi4vV29vZC9Xb29kU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5ib2FyZC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKHRoaXMuYm9hcmQpO1xuICAgICAgICB0aGlzLmNhcnMgPSBDYXJTZXJ2aWNlLmNyZWF0ZUNhcnMoKTtcbiAgICAgICAgdGhpcy50dXJ0bGVzID0gVHVydGxlU2VydmljZS5jcmVhdGVUdXJ0bGVzKCk7XG4gICAgICAgIHRoaXMud2F0ZXIgPSBXYXRlclNlcnZpY2UuY3JlYXRlV2F0ZXIoKTtcbiAgICAgICAgdGhpcy53b29kID0gV29vZFNlcnZpY2UuY3JlYXRlV29vZCgpO1xuICAgICAgICB0aGlzLnNhaWxFbGVtZW50ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgc2V0Qm9hcmQoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5ib2FyZC53aWR0aCwgdGhpcy5ib2FyZC5oZWlnaHQpO1xuICAgICAgICB0aGlzLmZyb2dnZXIuZHJhd0Zyb2dnZXIodGhpcy5jb250ZXh0KTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc2V0Qm9hcmQuYmluZCh0aGlzKSk7XG4gICAgICAgIC8vIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYm9hcmQgZGl2Jyk7XG4gICAgICAgIC8vIEJvYXJkU2VydmljZS5jbGVhckJvYXJkKHRoaXMuYm9hcmQpO1xuICAgICAgICAvLyB0aGlzLndhdGVyLmZvckVhY2god2F0ZXJPYmogPT4gd2F0ZXJPYmouc2V0V2F0ZXJQb3NpdGlvbih0aGlzLmJvYXJkKSk7XG4gICAgICAgIC8vIHRoaXMuc2FpbEVsZW1lbnQgPyB0aGlzLnNhaWxFbGVtZW50LnNhaWxGcm9nZ2VyKHRoaXMuZnJvZ2dlcikgOiBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy50dXJ0bGVzLmZvckVhY2godHVydGxlID0+IHR1cnRsZS5zZXRUdXJ0bGVQb3NpdGlvbih0aGlzLmJvYXJkKSk7XG4gICAgICAgIC8vIHRoaXMud29vZC5mb3JFYWNoKHdvb2QgPT4gd29vZC5zZXRXb29kUG9zaXRpb24odGhpcy5ib2FyZCkpO1xuICAgICAgICAvLyB0aGlzLmZyb2dnZXIuc2V0RnJvZ2dlclBvc2l0aW9uKHRoaXMuYm9hcmQpO1xuICAgICAgICAvLyB0aGlzLmNhcnMuZm9yRWFjaChjYXIgPT4gY2FyLnNldENhclBvc2l0aW9uKHRoaXMuYm9hcmQpKTtcbiAgICAgICAgLy8gdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgIH07XG5cbiAgICBtb3ZlRnJvZ2dlcihldmVudCkge1xuICAgICAgICB0aGlzLmZyb2dnZXIubW92ZShldmVudCk7XG4gICAgICAgIGxldCB0dXJ0bGVDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLnR1cnRsZXMpO1xuICAgICAgICBsZXQgd29vZENvbGxpc2lvbiA9IEJvYXJkU2VydmljZS5jaGVja0NvbGxpc2lvbih0aGlzLmZyb2dnZXIsIHRoaXMud29vZCk7XG4gICAgICAgIGlmICh0dXJ0bGVDb2xsaXNpb24pIHtcbiAgICAgICAgICAgIGxldCBzYWlsVHVydGxlID0gdGhpcy50dXJ0bGVzLmZpbHRlcih0dXJ0bGUgPT4gdHVydGxlLmdldFBvc2l0aW9uKCkgPT09IHR1cnRsZUNvbGxpc2lvbik7XG4gICAgICAgICAgICB0aGlzLnNhaWxFbGVtZW50ID0gc2FpbFR1cnRsZVswXTtcbiAgICAgICAgfSBlbHNlIGlmICh3b29kQ29sbGlzaW9uKSB7XG4gICAgICAgICAgICBsZXQgc2FpbFdvb2QgPSB0aGlzLndvb2QuZmlsdGVyKHdvb2QgPT4gd29vZC5nZXRQb3NpdGlvbigpID09PSB3b29kQ29sbGlzaW9uKTtcbiAgICAgICAgICAgIHRoaXMuc2FpbEVsZW1lbnQgPSBzYWlsV29vZFswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2FpbEVsZW1lbnQgPSBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldEJvYXJkKCk7XG4gICAgfTtcblxuICAgIGNoZWNrQ29sbGlzaW9uKCkge1xuICAgICAgICBsZXQgY29sbGlzaW9uID0gZmFsc2U7XG4gICAgICAgIGxldCBjYXJDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLmNhcnMpO1xuICAgICAgICBsZXQgd2F0ZXJDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLndhdGVyKTtcbiAgICAgICAgbGV0IHR1cnRsZUNvbGxpc2lvbiA9IEJvYXJkU2VydmljZS5jaGVja0NvbGxpc2lvbih0aGlzLmZyb2dnZXIsIHRoaXMudHVydGxlcyk7XG4gICAgICAgIGxldCB3b29kQ29sbGlzaW9uID0gQm9hcmRTZXJ2aWNlLmNoZWNrQ29sbGlzaW9uKHRoaXMuZnJvZ2dlciwgdGhpcy53b29kKTtcbiAgICAgICAgY2FyQ29sbGlzaW9uICE9PSBmYWxzZSB8fCB3YXRlckNvbGxpc2lvbiAhPT0gZmFsc2UgPyBjb2xsaXNpb24gPSB0cnVlIDogZmFsc2U7IC8vIFRPRE86IGNoZWNrIHRoaXMgY29uZGl0aW9uXG4gICAgICAgIHR1cnRsZUNvbGxpc2lvbiA/IGNvbGxpc2lvbiA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgIHdvb2RDb2xsaXNpb24gPyBjb2xsaXNpb24gPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICByZXR1cm4gY29sbGlzaW9uO1xuICAgIH07XG5cbiAgICBzdGFydE1vdmluZ0xpbmUob2JqZWN0cywgbGluZSwgc3BlZWQgPSAxMDAwKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpbHRlcmVkTGluZSA9IG9iamVjdHMuZmlsdGVyKG9iaiA9PiBvYmoubGluZSA9PSBsaW5lKTtcbiAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKG9iaiA9PiBvYmoubW92ZSgpKTtcbiAgICAgICAgICAgIHRoaXMuc2V0Qm9hcmQoKTtcbiAgICAgICAgfSwgc3BlZWQpOyAvLyBUT0RPOiBhZGQgc3BlZWQgZnVuY3Rpb25hbGl0eVxuICAgIH07XG5cbiAgICBzdGFydEJvYXJkKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMSwgc3BlZWQgPSAxMTAwOyBpIDw9IDU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zdGFydE1vdmluZ0xpbmUodGhpcy5jYXJzLCBpLCBzcGVlZCk7XG4gICAgICAgICAgICBzcGVlZCA9IHNwZWVkIC0gMTAwO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKGxldCBpID0gMSwgc3BlZWQgPSA5MDA7IGkgPD0gMjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0TW92aW5nTGluZSh0aGlzLnR1cnRsZXMsIGksIHNwZWVkKTtcbiAgICAgICAgICAgIHNwZWVkID0gNzAwO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKGxldCBpID0gMSwgc3BlZWQgPSA5MDA7IGkgPD0gMzsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0TW92aW5nTGluZSh0aGlzLndvb2QsIGksIHNwZWVkKTtcbiAgICAgICAgICAgIHNwZWVkID0gc3BlZWQgLSAyMDA7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBkaXZpbmdUdXJ0bGVzID0gdGhpcy50dXJ0bGVzLmZpbHRlcih0dXJ0bGUgPT4gdHVydGxlLmRpdmluZyk7XG4gICAgICAgIHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBkaXZpbmdUdXJ0bGVzLmZvckVhY2goKHR1cnRsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHR1cnRsZS5kaXZlZCA9ICF0dXJ0bGUuZGl2ZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfTtcblxufVxuIiwiY29uc3QgQm9hcmRTZXJ2aWNlID0ge1xuXG4gIGNsZWFyQm9hcmQ6IChib2FyZCkgPT4ge1xuICAgIGJvYXJkLmZvckVhY2goKGRpdik9PntcbiAgICAgIGRpdi5jbGFzc05hbWUgPSBcIlwiO1xuICAgIH0pXG4gIH0sXG5cbiAgY2hlY2tDb2xsaXNpb24oZnJvZ2dlciwgZWxlbWVudHMpe1xuICAgIGxldCBmcm9nZ2VyUG9zID0gZnJvZ2dlci5nZXRQb3NpdGlvbigpO1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW0gPT4gZWxlbS5nZXRQb3NpdGlvbigpID09PSBmcm9nZ2VyUG9zID8gcmVzdWx0ID0gZnJvZ2dlclBvcyA6IGZhbHNlKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCb2FyZFNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuL0NhclNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG5cbiAgY29uc3RydWN0b3IocG9zWCwgbGluZSl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnBvc1kgPSBDYXJTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IENhclNlcnZpY2UuZ2VuZXJhdGVEaXJlY3Rpb24obGluZSk7XG4gIH1cblxuICBzZXRDYXJQb3NpdGlvbihib2FyZCl7XG4gICAgdGhpcy5wb3NYID4gMTMgPyB0aGlzLnBvc1ggPSAwIDogZmFsc2U7XG4gICAgdGhpcy5wb3NYIDwgMCA/IHRoaXMucG9zWCA9IDEzIDogZmFsc2U7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcImNhclwiO1xuICB9XG5cbn1cbiIsImltcG9ydCBDYXIgZnJvbSAnLi9DYXIuanMnO1xuXG5jb25zdCBDYXJTZXJ2aWNlID0gIHtcblxuICAgIGNyZWF0ZUNhcnM6ICgpID0+IHtcbiAgICAgICAgbGV0IGNhcnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSAxNTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2FyO1xuICAgICAgICAgICAgaWYobGluZSA9PT0gNSl7XG4gICAgICAgICAgICAgIGxldCBzaXplM0NhciA9IFtdO1xuICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgIGNhciA9IG5ldyBDYXIobmV3UG9zWCwgbGluZSk7XG4gICAgICAgICAgICAgICAgICBuZXdQb3NYKys7XG4gICAgICAgICAgICAgICAgICBzaXplM0Nhci5wdXNoKGNhcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyA0O1xuICAgICAgICAgICAgICBjYXJzID0gW1xuICAgICAgICAgICAgICAgICAgLi4uY2FycyxcbiAgICAgICAgICAgICAgICAgIC4uLnNpemUzQ2FyXG4gICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgIGNhciA9IG5ldyBDYXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgM1xuICAgICAgICAgICAgICBjYXJzLnB1c2goY2FyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpICUgMyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYXJzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gOTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gNztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVEaXJlY3Rpb246IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9Nb3ZpbmdPYmplY3QuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9nZ2VyIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihib2FyZCwgcG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBsaXZlcyl7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgIHRoaXMud2lkdGggPSA1MDtcbiAgICB0aGlzLnBvc1ggPSBib2FyZC53aWR0aCAqIDAuNTtcbiAgICB0aGlzLnBvc1kgPSBib2FyZC5oZWlnaHQgLSB0aGlzLmhlaWdodDtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgdGhpcy5saXZlcyA9IDM7XG4gIH07XG5cbiAgZHJhd0Zyb2dnZXIoY3R4KSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5yZWN0KHRoaXMucG9zWCwgdGhpcy5wb3NZLCA1MCwgNTApO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG59XG5cbiAgc2V0RnJvZ2dlclBvc2l0aW9uKGJvYXJkKXtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwiZnJvZ2dlclwiO1xuICB9O1xuXG4gIG1vdmUoZXZlbnQpe1xuICAgIHN3aXRjaChldmVudC53aGljaCl7XG4gICAgICBjYXNlIDM3OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgdGhpcy5wb3NYLS07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICB0aGlzLnBvc1ktLTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgIHRoaXMucG9zWCsrO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgICAgICB0aGlzLnBvc1krKztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9O1xuICB9XG5cbn1cbiIsImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkL0JvYXJkLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vRXZlbnRFbWl0dGVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQuc2V0Qm9hcmQoKTtcbiAgICAgICAgLy8gdGhpcy5ib2FyZC5zdGFydEJvYXJkKCk7XG4gICAgICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoKSA9PiB0aGlzLmJvYXJkLm1vdmVGcm9nZ2VyKGV2ZW50KSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24pe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCl7XG4gICAgICByZXR1cm4gdGhpcy5wb3NYICsgdGhpcy5wb3NZICogMTQ7XG4gIH1cblxuICBtb3ZlKCl7XG4gICAgc3dpdGNoKHRoaXMuZGlyZWN0aW9uKXtcbiAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIHRoaXMucG9zWC0tO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgdGhpcy5wb3NYKys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgfVxuXG4gIHNhaWxGcm9nZ2VyKGZyb2dnZXIpe1xuICAgIGZyb2dnZXIucG9zWCA9IHRoaXMucG9zWDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGljT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgIHRoaXMucG9zWSA9IHBvc1k7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMucG9zWCArIHRoaXMucG9zWSAqIDE0O1xuICB9XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuL1R1cnRsZVNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdXJ0bGUgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIGRpdmluZyl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnBvc1kgPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICB0aGlzLmRpdmluZyA9IGRpdmluZztcbiAgICB0aGlzLmRpdmVkID0gZmFsc2U7XG4gIH1cblxuICBzZXRUdXJ0bGVQb3NpdGlvbihib2FyZCl7XG4gICAgdGhpcy5wb3NYIDwgMCA/IHRoaXMucG9zWCA9IDEzIDogZmFsc2U7XG4gICAgdGhpcy5kaXZlZCA/IGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24oKV0uY2xhc3NOYW1lID0gXCJ0dXJ0bGUtZGl2aW5nXCIgOiBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwidHVydGxlXCI7XG4gICAgLy8gYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcInR1cnRsZVwiO1xuICB9XG59XG4iLCJpbXBvcnQgVHVydGxlIGZyb20gJy4vVHVydGxlLmpzJztcblxuY29uc3QgVHVydGxlU2VydmljZSA9IHtcblxuICBjcmVhdGVUdXJ0bGVzOiAoKSA9PntcbiAgICBsZXQgdHVydGxlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgZGl2aW5nID0gZmFsc2UsIHBvc1ggPSAzOyBpIDw9IDc7IGkrKykge1xuICAgICAgbGV0IHR1cnRsZTtcbiAgICAgIGlmKGxpbmUgPT0gMSl7XG4gICAgICAgIGxldCBzaXplMlR1cnRsZSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAyOyBqKyspIHtcbiAgICAgICAgICAgIHR1cnRsZSA9IG5ldyBUdXJ0bGUobmV3UG9zWCwgbGluZSwgZGl2aW5nKTtcbiAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgIHNpemUyVHVydGxlLnB1c2godHVydGxlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcG9zWCA9IHBvc1ggKyAzO1xuICAgICAgICB0dXJ0bGVzID0gW1xuICAgICAgICAgICAgLi4udHVydGxlcyxcbiAgICAgICAgICAgIC4uLnNpemUyVHVydGxlXG4gICAgICAgIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc2l6ZTNUdXJ0bGUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIG5ld1Bvc1ggPSBwb3NYOyBqIDwgMzsgaisrKSB7XG4gICAgICAgICAgICB0dXJ0bGUgPSBuZXcgVHVydGxlKG5ld1Bvc1gsIGxpbmUsIGRpdmluZyk7XG4gICAgICAgICAgICBuZXdQb3NYKys7XG4gICAgICAgICAgICBzaXplM1R1cnRsZS5wdXNoKHR1cnRsZSk7XG4gICAgICAgIH07XG4gICAgICAgIHBvc1ggPSBwb3NYICsgNDtcbiAgICAgICAgdHVydGxlcyA9IFtcbiAgICAgICAgICAgIC4uLnR1cnRsZXMsXG4gICAgICAgICAgICAuLi5zaXplM1R1cnRsZVxuICAgICAgICBdO1xuICAgICAgfVxuICAgICAgaWYoaSA9PSA0KXtcbiAgICAgICAgbGluZSA9IDI7XG4gICAgICAgIHBvc1ggPSAwO1xuICAgICAgfTtcbiAgICAgIGlmKCBpID09PSAxIHx8IGkgPT09IDQpe1xuICAgICAgICBkaXZpbmcgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGl2aW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0dXJ0bGVzO1xuICB9LFxuXG4gIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIDU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGVTZXJ2aWNlO1xuIiwiaW1wb3J0IFN0YXRpY09iamVjdCBmcm9tICcuLi9TdGF0aWNPYmplY3QuanMnO1xuaW1wb3J0IFdhdGVyU2VydmljZSBmcm9tICcuL1dhdGVyU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyIGV4dGVuZHMgU3RhdGljT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLnBvc1kgPSBXYXRlclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICB9XG5cbiAgc2V0V2F0ZXJQb3NpdGlvbihib2FyZCl7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcIndhdGVyXCI7XG4gIH1cbn1cbiIsImltcG9ydCBXYXRlciBmcm9tICcuL1dhdGVyLmpzJztcblxuY29uc3QgV2F0ZXJTZXJ2aWNlID0ge1xuICBjcmVhdGVXYXRlcjogKCkgPT4ge1xuICAgICAgbGV0IHdhdGVyT2JqcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSA3MDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgd2F0ZXIgPSBuZXcgV2F0ZXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICBwb3NYID0gcG9zWCArIDFcbiAgICAgICAgICAgIHdhdGVyT2Jqcy5wdXNoKHdhdGVyKTtcbiAgICAgICAgICBpZiAoaSAlIDE0ID09IDApIHtcbiAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgICBwb3NYID0gMDtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2F0ZXJPYmpzO1xuICB9LFxuXG4gIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIDU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgcmV0dXJuIDQ7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBXYXRlclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi9Xb29kU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvb2QgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5wb3NZID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgfVxuXG4gIHNldFdvb2RQb3NpdGlvbihib2FyZCl7XG4gICAgdGhpcy5wb3NYID4gMTMgPyB0aGlzLnBvc1ggPSAwIDogZmFsc2U7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcIndvb2RcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFdvb2QgZnJvbSAnLi9Xb29kLmpzJztcblxuY29uc3QgV29vZFNlcnZpY2UgPSB7XG4gICAgY3JlYXRlV29vZDogKCkgPT4ge1xuICAgICAgICBsZXQgd29vZHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSA3OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0dXJ0bGU7XG4gICAgICAgICAgICBpZiAobGluZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBzaXplM1dvb2QgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZChuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgICAgICAgICBzaXplM1dvb2QucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyA1O1xuICAgICAgICAgICAgICAgIHdvb2RzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi53b29kcyxcbiAgICAgICAgICAgICAgICAgICAgLi4uc2l6ZTNXb29kXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gMikge1xuICAgICAgICAgICAgICAgIGxldCBzaXplNVdvb2QgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCA1OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZChuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgICAgICAgICBzaXplNVdvb2QucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyA3O1xuICAgICAgICAgICAgICAgIHdvb2RzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi53b29kcyxcbiAgICAgICAgICAgICAgICAgICAgLi4uc2l6ZTVXb29kXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgc2l6ZTRXb29kID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIG5ld1Bvc1ggPSBwb3NYOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QobmV3UG9zWCwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTRXb29kLnB1c2god29vZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgODtcbiAgICAgICAgICAgICAgICB3b29kcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ud29vZHMsXG4gICAgICAgICAgICAgICAgICAgIC4uLnNpemU0V29vZFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgcG9zWCA9IDE7XG4gICAgICAgICAgICAgICAgbGluZSA9IDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gNSkge1xuICAgICAgICAgICAgICAgIHBvc1ggPSAwXG4gICAgICAgICAgICAgICAgbGluZSA9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdvb2RzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdvb2RTZXJ2aWNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9O1xuXG4gICAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICF0aGlzLmV2ZW50c1tldmVudE5hbWVdID8gdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdIDogZmFsc2U7XG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXG4gICAgICByZXR1cm4gKCkgPT57XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcihldmVudEZuID0+IGZuICE9PSBldmVudEZuKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZW1pdChldmVudE5hbWUsIGRhdGEpe1xuICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgaWYoZXZlbnQpe1xuICAgICAgICBldmVudC5mb3JFYWNoKGZuID0+e1xuICAgICAgICAgIGZuLmNhbGwobnVsbCwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG59XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0NvbXBvbmVudHMvR2FtZS5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PntcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xufSk7XG4iXX0=
