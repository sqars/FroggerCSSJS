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
        this.froggerMoving = false;
        this.cars = _CarService2.default.createCars();
    }

    _createClass(Board, [{
        key: 'setBoard',
        value: function setBoard() {
            this.context.clearRect(0, 0, this.board.width, this.board.height);
            this.frogger.drawFrogger(this.context);
            this.froggerMoving ? this.moveFrogger() : false;
            requestAnimationFrame(this.setBoard.bind(this));
        }
    }, {
        key: 'setFroggerMove',
        value: function setFroggerMove(event) {
            var isMoving = this.frogger.setDirection(event);
            isMoving ? this.froggerMoving = true : false;
        }
    }, {
        key: 'moveFrogger',
        value: function moveFrogger() {
            this.froggerMoving = this.frogger.move(this.frogger.direction);
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
        _this.movingCount = 0;
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
        key: 'setDirection',
        value: function setDirection(event) {
            var result = false;
            switch (event.which) {
                case 37:
                    this.direction = 'left';
                    result = true;
                    break;
                case 38:
                    this.direction = 'up';
                    result = true;
                    break;
                case 39:
                    this.direction = 'right';
                    result = true;
                    break;
                case 40:
                    this.direction = 'down';
                    result = true;
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
            switch (direction) {
                case 'left':
                    this.posX -= 2;
                    break;
                case 'up':
                    this.posY -= 2;
                    break;
                case 'right':
                    this.posX += 2;
                    break;
                case 'down':
                    this.posY += 2;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Nb3ZpbmdPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9TdGF0aWNPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9UdXJ0bGVzL1R1cnRsZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1dhdGVyL1dhdGVyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kU2VydmljZS5qcyIsInNyYy9qcy9FdmVudEVtaXR0ZXIuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEs7QUFDakIscUJBQWM7QUFBQTs7QUFDVixhQUFLLEtBQUwsR0FBYSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBLGFBQUssT0FBTCxHQUFlLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsSUFBdEIsQ0FBZjtBQUNBLGFBQUssT0FBTCxHQUFlLHNCQUFZLEtBQUssS0FBakIsQ0FBZjtBQUNBLGFBQUssYUFBTCxHQUFxQixL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LFMsRUFBVyxFLEVBQUk7QUFBQTs7QUFDdkIsT0FBQyxLQUFLLE1BQUwsQ0FBWSxTQUFaLENBQUQsR0FBMEIsS0FBSyxNQUFMLENBQVksU0FBWixJQUF5QixFQUFuRCxHQUF3RCxLQUF4RDtBQUNBLFdBQUssTUFBTCxDQUFZLFNBQVosRUFBdUIsSUFBdkIsQ0FBNEIsRUFBNUI7O0FBRUEsYUFBTyxZQUFLO0FBQ1YsY0FBSyxNQUFMLENBQVksU0FBWixJQUF5QixNQUFLLE1BQUwsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCLENBQThCO0FBQUEsaUJBQVcsT0FBTyxPQUFsQjtBQUFBLFNBQTlCLENBQXpCO0FBQ0QsT0FGRDtBQUdEOzs7eUJBRUksUyxFQUFXLEksRUFBSztBQUNuQixVQUFNLFFBQVEsS0FBSyxNQUFMLENBQVksU0FBWixDQUFkO0FBQ0EsVUFBRyxLQUFILEVBQVM7QUFDUCxjQUFNLE9BQU4sQ0FBYyxjQUFLO0FBQ2pCLGFBQUcsSUFBSCxDQUFRLElBQVIsRUFBYyxJQUFkO0FBQ0QsU0FGRDtBQUdEO0FBQ0Y7Ozs7OztrQkFyQmdCLFk7Ozs7O0FDQXJCOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFLO0FBQ2pELE1BQUksT0FBTyxvQkFBWDtBQUNBLE9BQUssU0FBTDtBQUNELENBSEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEZyb2dnZXIgZnJvbSAnLi4vRnJvZ2dlci5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuLi9DYXJzL0NhclNlcnZpY2UuanMnO1xuaW1wb3J0IEJvYXJkU2VydmljZSBmcm9tICcuL0JvYXJkU2VydmljZS5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuLi9UdXJ0bGVzL1R1cnRsZVNlcnZpY2UuanMnO1xuaW1wb3J0IFdhdGVyU2VydmljZSBmcm9tICcuLi9XYXRlci9XYXRlclNlcnZpY2UuanMnO1xuaW1wb3J0IFdvb2RTZXJ2aWNlIGZyb20gJy4uL1dvb2QvV29vZFNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuYm9hcmQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLmZyb2dnZXIgPSBuZXcgRnJvZ2dlcih0aGlzLmJvYXJkKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyTW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FycyA9IENhclNlcnZpY2UuY3JlYXRlQ2FycygpO1xuICAgIH07XG5cbiAgICBzZXRCb2FyZCgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmJvYXJkLndpZHRoLCB0aGlzLmJvYXJkLmhlaWdodCk7XG4gICAgICAgIHRoaXMuZnJvZ2dlci5kcmF3RnJvZ2dlcih0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmZyb2dnZXJNb3ZpbmcgPyB0aGlzLm1vdmVGcm9nZ2VyKCkgOiBmYWxzZTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc2V0Qm9hcmQuYmluZCh0aGlzKSk7XG4gICAgfTtcblxuICAgIHNldEZyb2dnZXJNb3ZlKGV2ZW50KXtcbiAgICAgIGxldCBpc01vdmluZyA9IHRoaXMuZnJvZ2dlci5zZXREaXJlY3Rpb24oZXZlbnQpO1xuICAgICAgaXNNb3ZpbmcgPyB0aGlzLmZyb2dnZXJNb3ZpbmcgPSB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgbW92ZUZyb2dnZXIoKSB7XG4gICAgICB0aGlzLmZyb2dnZXJNb3ZpbmcgPSB0aGlzLmZyb2dnZXIubW92ZSh0aGlzLmZyb2dnZXIuZGlyZWN0aW9uKTtcbiAgICB9O1xuXG59XG4iLCJjb25zdCBCb2FyZFNlcnZpY2UgPSB7XG5cbiAgY2xlYXJCb2FyZDogKGJvYXJkKSA9PiB7XG4gICAgYm9hcmQuZm9yRWFjaCgoZGl2KT0+e1xuICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgfSlcbiAgfSxcblxuICBjaGVja0NvbGxpc2lvbihmcm9nZ2VyLCBlbGVtZW50cyl7XG4gICAgbGV0IGZyb2dnZXJQb3MgPSBmcm9nZ2VyLmdldFBvc2l0aW9uKCk7XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbSA9PiBlbGVtLmdldFBvc2l0aW9uKCkgPT09IGZyb2dnZXJQb3MgPyByZXN1bHQgPSBmcm9nZ2VyUG9zIDogZmFsc2UpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJvYXJkU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4vQ2FyU2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhciBleHRlbmRzIE1vdmluZ09iamVjdHtcblxuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gQ2FyU2VydmljZS5nZW5lcmF0ZURpcmVjdGlvbihsaW5lKTtcbiAgfVxuXG4gIHNldENhclBvc2l0aW9uKGJvYXJkKXtcbiAgICB0aGlzLnBvc1ggPiAxMyA/IHRoaXMucG9zWCA9IDAgOiBmYWxzZTtcbiAgICB0aGlzLnBvc1ggPCAwID8gdGhpcy5wb3NYID0gMTMgOiBmYWxzZTtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwiY2FyXCI7XG4gIH1cblxufVxuIiwiaW1wb3J0IENhciBmcm9tICcuL0Nhci5qcyc7XG5cbmNvbnN0IENhclNlcnZpY2UgPSAge1xuXG4gICAgY3JlYXRlQ2FyczogKCkgPT4ge1xuICAgICAgICBsZXQgY2FycyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDE1OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjYXI7XG4gICAgICAgICAgICBpZihsaW5lID09PSA1KXtcbiAgICAgICAgICAgICAgbGV0IHNpemUzQ2FyID0gW107XG4gICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBuZXdQb3NYID0gcG9zWDsgaiA8IDM7IGorKykge1xuICAgICAgICAgICAgICAgICAgY2FyID0gbmV3IENhcihuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgICAgICAgIHNpemUzQ2FyLnB1c2goY2FyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwb3NYID0gcG9zWCArIDQ7XG4gICAgICAgICAgICAgIGNhcnMgPSBbXG4gICAgICAgICAgICAgICAgICAuLi5jYXJzLFxuICAgICAgICAgICAgICAgICAgLi4uc2l6ZTNDYXJcbiAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgY2FyID0gbmV3IENhcihwb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyAzXG4gICAgICAgICAgICAgIGNhcnMucHVzaChjYXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSA2O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhcnM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDExO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiA4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiA3O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZURpcmVjdGlvbjogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL01vdmluZ09iamVjdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb2dnZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKGJvYXJkLCBwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIGxpdmVzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcbiAgICAgICAgdGhpcy5wb3NYID0gYm9hcmQud2lkdGggKiAwLjU7XG4gICAgICAgIHRoaXMucG9zWSA9IGJvYXJkLmhlaWdodCAtIHRoaXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgICAgIHRoaXMubGl2ZXMgPSAzO1xuICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICB9O1xuXG4gICAgZHJhd0Zyb2dnZXIoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5wb3NYLCB0aGlzLnBvc1ksIDUwLCA1MCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBzZXREaXJlY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnZG93bic7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgbW92ZShkaXJlY3Rpb24pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYIC09IDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NZIC09IDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYICs9IDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1kgKz0gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQrKztcbiAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCA8IDI1ID8gcmVzdWx0ID0gdHJ1ZSA6IHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxufVxuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQvQm9hcmQuanMnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9FdmVudEVtaXR0ZXIuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICAgIH1cblxuICAgIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgdGhpcy5ib2FyZC5zZXRCb2FyZCgpO1xuICAgICAgICAvLyB0aGlzLmJvYXJkLnN0YXJ0Qm9hcmQoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsICgpID0+IHRoaXMuYm9hcmQuc2V0RnJvZ2dlck1vdmUoZXZlbnQpKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbil7XG4gICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICB0aGlzLnBvc1kgPSBwb3NZO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLnBvc1ggKyB0aGlzLnBvc1kgKiAxNDtcbiAgfVxuXG4gIG1vdmUoKXtcbiAgICBzd2l0Y2godGhpcy5kaXJlY3Rpb24pe1xuICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgdGhpcy5wb3NYLS07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICB0aGlzLnBvc1grKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICB9XG5cbiAgc2FpbEZyb2dnZXIoZnJvZ2dlcil7XG4gICAgZnJvZ2dlci5wb3NYID0gdGhpcy5wb3NYO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aWNPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1kpe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCl7XG4gICAgICByZXR1cm4gdGhpcy5wb3NYICsgdGhpcy5wb3NZICogMTQ7XG4gIH1cbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4vVHVydGxlU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1cnRsZSBleHRlbmRzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgZGl2aW5nKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMucG9zWSA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgIHRoaXMuZGl2aW5nID0gZGl2aW5nO1xuICAgIHRoaXMuZGl2ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHNldFR1cnRsZVBvc2l0aW9uKGJvYXJkKXtcbiAgICB0aGlzLnBvc1ggPCAwID8gdGhpcy5wb3NYID0gMTMgOiBmYWxzZTtcbiAgICB0aGlzLmRpdmVkID8gYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcInR1cnRsZS1kaXZpbmdcIiA6IGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24oKV0uY2xhc3NOYW1lID0gXCJ0dXJ0bGVcIjtcbiAgICAvLyBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwidHVydGxlXCI7XG4gIH1cbn1cbiIsImltcG9ydCBUdXJ0bGUgZnJvbSAnLi9UdXJ0bGUuanMnO1xuXG5jb25zdCBUdXJ0bGVTZXJ2aWNlID0ge1xuXG4gIGNyZWF0ZVR1cnRsZXM6ICgpID0+e1xuICAgIGxldCB0dXJ0bGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBkaXZpbmcgPSBmYWxzZSwgcG9zWCA9IDM7IGkgPD0gNzsgaSsrKSB7XG4gICAgICBsZXQgdHVydGxlO1xuICAgICAgaWYobGluZSA9PSAxKXtcbiAgICAgICAgbGV0IHNpemUyVHVydGxlID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBuZXdQb3NYID0gcG9zWDsgaiA8IDI7IGorKykge1xuICAgICAgICAgICAgdHVydGxlID0gbmV3IFR1cnRsZShuZXdQb3NYLCBsaW5lLCBkaXZpbmcpO1xuICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgc2l6ZTJUdXJ0bGUucHVzaCh0dXJ0bGUpO1xuICAgICAgICB9O1xuICAgICAgICBwb3NYID0gcG9zWCArIDM7XG4gICAgICAgIHR1cnRsZXMgPSBbXG4gICAgICAgICAgICAuLi50dXJ0bGVzLFxuICAgICAgICAgICAgLi4uc2l6ZTJUdXJ0bGVcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBzaXplM1R1cnRsZSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgIHR1cnRsZSA9IG5ldyBUdXJ0bGUobmV3UG9zWCwgbGluZSwgZGl2aW5nKTtcbiAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgIHNpemUzVHVydGxlLnB1c2godHVydGxlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcG9zWCA9IHBvc1ggKyA0O1xuICAgICAgICB0dXJ0bGVzID0gW1xuICAgICAgICAgICAgLi4udHVydGxlcyxcbiAgICAgICAgICAgIC4uLnNpemUzVHVydGxlXG4gICAgICAgIF07XG4gICAgICB9XG4gICAgICBpZihpID09IDQpe1xuICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgcG9zWCA9IDA7XG4gICAgICB9O1xuICAgICAgaWYoIGkgPT09IDEgfHwgaSA9PT0gNCl7XG4gICAgICAgIGRpdmluZyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXZpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHR1cnRsZXM7XG4gIH0sXG5cbiAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gNTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFR1cnRsZVNlcnZpY2U7XG4iLCJpbXBvcnQgU3RhdGljT2JqZWN0IGZyb20gJy4uL1N0YXRpY09iamVjdC5qcyc7XG5pbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4vV2F0ZXJTZXJ2aWNlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0ZXIgZXh0ZW5kcyBTdGF0aWNPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMucG9zWSA9IFdhdGVyU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gIH1cblxuICBzZXRXYXRlclBvc2l0aW9uKGJvYXJkKXtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwid2F0ZXJcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFdhdGVyIGZyb20gJy4vV2F0ZXIuanMnO1xuXG5jb25zdCBXYXRlclNlcnZpY2UgPSB7XG4gIGNyZWF0ZVdhdGVyOiAoKSA9PiB7XG4gICAgICBsZXQgd2F0ZXJPYmpzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDcwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3YXRlciA9IG5ldyBXYXRlcihwb3NYLCBsaW5lKTtcbiAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgMVxuICAgICAgICAgICAgd2F0ZXJPYmpzLnB1c2god2F0ZXIpO1xuICAgICAgICAgIGlmIChpICUgMTQgPT0gMCkge1xuICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICAgIHBvc1ggPSAwO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3YXRlck9ianM7XG4gIH0sXG5cbiAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gNTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdhdGVyU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBXb29kU2VydmljZSBmcm9tICcuL1dvb2RTZXJ2aWNlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29vZCBleHRlbmRzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgbGluZSl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnBvc1kgPSBXb29kU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICB9XG5cbiAgc2V0V29vZFBvc2l0aW9uKGJvYXJkKXtcbiAgICB0aGlzLnBvc1ggPiAxMyA/IHRoaXMucG9zWCA9IDAgOiBmYWxzZTtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwid29vZFwiO1xuICB9XG59XG4iLCJpbXBvcnQgV29vZCBmcm9tICcuL1dvb2QuanMnO1xuXG5jb25zdCBXb29kU2VydmljZSA9IHtcbiAgICBjcmVhdGVXb29kOiAoKSA9PiB7XG4gICAgICAgIGxldCB3b29kcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDc7IGkrKykge1xuICAgICAgICAgICAgbGV0IHR1cnRsZTtcbiAgICAgICAgICAgIGlmIChsaW5lID09PSAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNpemUzV29vZCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBuZXdQb3NYID0gcG9zWDsgaiA8IDM7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgd29vZCA9IG5ldyBXb29kKG5ld1Bvc1gsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICBuZXdQb3NYKys7XG4gICAgICAgICAgICAgICAgICAgIHNpemUzV29vZC5wdXNoKHdvb2QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3NYID0gcG9zWCArIDU7XG4gICAgICAgICAgICAgICAgd29vZHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIC4uLndvb2RzLFxuICAgICAgICAgICAgICAgICAgICAuLi5zaXplM1dvb2RcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5lID09PSAyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNpemU1V29vZCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBuZXdQb3NYID0gcG9zWDsgaiA8IDU7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgd29vZCA9IG5ldyBXb29kKG5ld1Bvc1gsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICBuZXdQb3NYKys7XG4gICAgICAgICAgICAgICAgICAgIHNpemU1V29vZC5wdXNoKHdvb2QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3NYID0gcG9zWCArIDc7XG4gICAgICAgICAgICAgICAgd29vZHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIC4uLndvb2RzLFxuICAgICAgICAgICAgICAgICAgICAuLi5zaXplNVdvb2RcbiAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzaXplNFdvb2QgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZChuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgICAgICAgICBzaXplNFdvb2QucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyA4O1xuICAgICAgICAgICAgICAgIHdvb2RzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi53b29kcyxcbiAgICAgICAgICAgICAgICAgICAgLi4uc2l6ZTRXb29kXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID09IDMpIHtcbiAgICAgICAgICAgICAgICBwb3NYID0gMTtcbiAgICAgICAgICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSA1KSB7XG4gICAgICAgICAgICAgICAgcG9zWCA9IDBcbiAgICAgICAgICAgICAgICBsaW5lID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd29vZHM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgV29vZFNlcnZpY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xuICAgIH07XG5cbiAgICBzdWJzY3JpYmUoZXZlbnROYW1lLCBmbikge1xuICAgICAgIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPyB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW10gOiBmYWxzZTtcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG5cbiAgICAgIHJldHVybiAoKSA9PntcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKGV2ZW50Rm4gPT4gZm4gIT09IGV2ZW50Rm4pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBlbWl0KGV2ZW50TmFtZSwgZGF0YSl7XG4gICAgICBjb25zdCBldmVudCA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV07XG4gICAgICBpZihldmVudCl7XG4gICAgICAgIGV2ZW50LmZvckVhY2goZm4gPT57XG4gICAgICAgICAgZm4uY2FsbChudWxsLCBkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbn1cbiIsImltcG9ydCBHYW1lIGZyb20gJy4vQ29tcG9uZW50cy9HYW1lLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+e1xuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG59KTtcbiJdfQ==
