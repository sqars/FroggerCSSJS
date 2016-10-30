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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board() {
        _classCallCheck(this, Board);

        this.board = null;
        this.frogger = new _Frogger2.default();
        this.cars = _CarService2.default.createCars();
        this.turtles = _TurtleService2.default.createTurtles();
    }

    _createClass(Board, [{
        key: 'setBoard',
        value: function setBoard() {
            var _this = this;

            this.board = document.querySelectorAll('#board div');
            _BoardService2.default.clearBoard(this.board);
            this.frogger.setFroggerPosition(this.board);
            this.cars.forEach(function (car) {
                car.setCarPosition(_this.board);
            });
            this.turtles.forEach(function (turtle) {
                turtle.setTurtlePosition(_this.board);
            });
        }
    }, {
        key: 'moveFrogger',
        value: function moveFrogger(event) {
            this.frogger.move(event);
            this.setBoard();
            this.checkCollision();
        }
    }, {
        key: 'checkCollision',
        value: function checkCollision() {
            var _this2 = this;

            this.cars.forEach(function (car) {
                if (car.getPosition() === _this2.frogger.getPosition()) {
                    console.log('game over');
                };
            });
        }
    }, {
        key: 'startBoard',
        value: function startBoard() {
            for (var i = 1, speed = 1100; i <= 5; i++) {
                _BoardService2.default.startMovingLine(this, this.cars, i, speed);
                speed = speed - 100;
            }
            for (var _i = 1, _speed = 900; _i <= 2; _i++) {
                _BoardService2.default.startMovingLine(this, this.turtles, _i, _speed);
                _speed = 700;
            }
        }
    }]);

    return Board;
}();

exports.default = Board;

},{"../Cars/CarService.js":4,"../Frogger.js":5,"../Turtles/TurtleService.js":9,"./BoardService.js":2}],2:[function(require,module,exports){
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

  startMovingLine: function startMovingLine(Board, objects, line) {
    var speed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;

    return window.setInterval(function () {
      var filteredLine = objects.filter(function (obj) {
        return obj.line == line;
      });
      filteredLine.forEach(function (obj) {
        obj.move();
      });
      Board.setBoard();
    }, speed); // TODO: add speed functionality
  },

  startTurtleLine: function startTurtleLine(Board, turtles, line) {
    var speed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;
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

  function Frogger(posX, posY, direction, lives) {
    _classCallCheck(this, Frogger);

    var _this = _possibleConstructorReturn(this, (Frogger.__proto__ || Object.getPrototypeOf(Frogger)).call(this));

    _this.posX = 7;
    _this.posY = 12;
    _this.direction = 'up';
    _this.lives = 3;
    return _this;
  }

  _createClass(Frogger, [{
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
            var _this = this;

            var board = document.getElementById('board');
            generateDivs(board);
            this.board.setBoard();
            this.board.startBoard();
            document.addEventListener('keydown', function () {
                return _this.board.moveFrogger(event);
            });
        }
    }]);

    return Game;
}();

exports.default = Game;


function generateDivs(board) {
    for (var i = 0; i < 182; i++) {
        var div = document.createElement('div');
        board.appendChild(div);
    }
};

},{"../EventEmitter.js":10,"./Board/Board.js":1}],7:[function(require,module,exports){
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
  }]);

  return MovingObject;
}();

exports.default = MovingObject;

},{}],8:[function(require,module,exports){
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

  function Turtle(posX, line) {
    _classCallCheck(this, Turtle);

    var _this = _possibleConstructorReturn(this, (Turtle.__proto__ || Object.getPrototypeOf(Turtle)).call(this, posX));

    _this.line = line;
    _this.posY = _TurtleService2.default.generateYPos(line);
    _this.direction = 'left';
    return _this;
  }

  _createClass(Turtle, [{
    key: 'setTurtlePosition',
    value: function setTurtlePosition(board) {
      this.posX < 0 ? this.posX = 13 : false;
      board[this.getPosition()].className = "turtle";
    }
  }]);

  return Turtle;
}(_MovingObject3.default);

exports.default = Turtle;

},{"../MovingObject.js":7,"./TurtleService.js":9}],9:[function(require,module,exports){
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
        for (var i = 1, line = 1, posX = 3; i <= 7; i++) {
            var turtle = void 0;
            if (line == 1) {
                var size2Turtle = [];
                for (var j = 0, newPosX = posX; j < 2; j++) {
                    turtle = new _Turtle2.default(newPosX, line);
                    newPosX++;
                    size2Turtle.push(turtle);
                }
                posX = posX + 3;
                turtles = [].concat(_toConsumableArray(turtles), size2Turtle);
            } else {
                var size3Turtle = [];
                for (var _j = 0, _newPosX = posX; _j < 3; _j++) {
                    turtle = new _Turtle2.default(_newPosX, line);
                    _newPosX++;
                    size3Turtle.push(turtle);
                }
                posX = posX + 4;
                turtles = [].concat(_toConsumableArray(turtles), size3Turtle);
            }
            if (i == 4) {
                line = 2;
                posX = 0;
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

},{"./Turtle.js":8}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
'use strict';

var _Game = require('./Components/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./Components/Game.js":6}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Nb3ZpbmdPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9UdXJ0bGVzL1R1cnRsZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyIsInNyYy9qcy9FdmVudEVtaXR0ZXIuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUIsSztBQUNqQixxQkFBYztBQUFBOztBQUNWLGFBQUssS0FBTCxHQUFhLElBQWI7QUFDQSxhQUFLLE9BQUwsR0FBZSx1QkFBZjtBQUNBLGFBQUssSUFBTCxHQUFZLHFCQUFXLFVBQVgsRUFBWjtBQUNBLGFBQUssT0FBTCxHQUFlLHdCQUFjLGFBQWQsRUFBZjtBQUNIOzs7O21DQUVVO0FBQUE7O0FBQ1AsaUJBQUssS0FBTCxHQUFhLFNBQVMsZ0JBQVQsQ0FBMEIsWUFBMUIsQ0FBYjtBQUNBLG1DQUFhLFVBQWIsQ0FBd0IsS0FBSyxLQUE3QjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxrQkFBYixDQUFnQyxLQUFLLEtBQXJDO0FBQ0EsaUJBQUssSUFBTCxDQUFVLE9BQVYsQ0FBa0IsVUFBQyxHQUFELEVBQVM7QUFDdkIsb0JBQUksY0FBSixDQUFtQixNQUFLLEtBQXhCO0FBQ0gsYUFGRDtBQUdBLGlCQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLFVBQUMsTUFBRCxFQUFXO0FBQzlCLHVCQUFPLGlCQUFQLENBQXlCLE1BQUssS0FBOUI7QUFDRCxhQUZEO0FBR0g7OztvQ0FFVyxLLEVBQU87QUFDZixpQkFBSyxPQUFMLENBQWEsSUFBYixDQUFrQixLQUFsQjtBQUNBLGlCQUFLLFFBQUw7QUFDQSxpQkFBSyxjQUFMO0FBQ0g7Ozt5Q0FFZ0I7QUFBQTs7QUFDYixpQkFBSyxJQUFMLENBQVUsT0FBVixDQUFrQixVQUFDLEdBQUQsRUFBUztBQUN6QixvQkFBRyxJQUFJLFdBQUosT0FBc0IsT0FBSyxPQUFMLENBQWEsV0FBYixFQUF6QixFQUFvRDtBQUNsRCw0QkFBUSxHQUFSLENBQVksV0FBWjtBQUNEO0FBQ0YsYUFKRDtBQUtIOzs7cUNBRVk7QUFDVCxpQkFBSyxJQUFJLElBQUksQ0FBUixFQUFXLFFBQVEsSUFBeEIsRUFBOEIsS0FBSyxDQUFuQyxFQUFzQyxHQUF0QyxFQUEyQztBQUN2Qyx1Q0FBYSxlQUFiLENBQTZCLElBQTdCLEVBQW1DLEtBQUssSUFBeEMsRUFBOEMsQ0FBOUMsRUFBaUQsS0FBakQ7QUFDQSx3QkFBUSxRQUFRLEdBQWhCO0FBQ0g7QUFDRCxpQkFBSSxJQUFJLEtBQUksQ0FBUixFQUFXLFNBQVEsR0FBdkIsRUFBNEIsTUFBSSxDQUFoQyxFQUFtQyxJQUFuQyxFQUF1QztBQUNyQyx1Q0FBYSxlQUFiLENBQTZCLElBQTdCLEVBQW1DLEtBQUssT0FBeEMsRUFBaUQsRUFBakQsRUFBb0QsTUFBcEQ7QUFDQSx5QkFBUSxHQUFSO0FBQ0Q7QUFDSjs7Ozs7O2tCQTNDZ0IsSzs7Ozs7Ozs7QUNMckIsSUFBTSxlQUFlOztBQUVuQixjQUFZLG9CQUFDLEtBQUQsRUFBVztBQUNyQixVQUFNLE9BQU4sQ0FBYyxVQUFDLEdBQUQsRUFBTztBQUNuQixVQUFJLFNBQUosR0FBZ0IsRUFBaEI7QUFDRCxLQUZEO0FBR0QsR0FOa0I7O0FBUW5CLG1CQUFpQix5QkFBQyxLQUFELEVBQVEsT0FBUixFQUFpQixJQUFqQixFQUF1QztBQUFBLFFBQWhCLEtBQWdCLHVFQUFSLElBQVE7O0FBQ3RELFdBQU8sT0FBTyxXQUFQLENBQW1CLFlBQUs7QUFDN0IsVUFBSSxlQUFlLFFBQVEsTUFBUixDQUFlLFVBQUMsR0FBRCxFQUFRO0FBQ3hDLGVBQU8sSUFBSSxJQUFKLElBQVksSUFBbkI7QUFDRCxPQUZrQixDQUFuQjtBQUdBLG1CQUFhLE9BQWIsQ0FBcUIsVUFBQyxHQUFELEVBQVE7QUFDekIsWUFBSSxJQUFKO0FBQ0gsT0FGRDtBQUdBLFlBQU0sUUFBTjtBQUNELEtBUk0sRUFRSixLQVJJLENBQVAsQ0FEc0QsQ0FTM0M7QUFDWixHQWxCa0I7O0FBb0JuQixtQkFBaUIseUJBQUMsS0FBRCxFQUFRLE9BQVIsRUFBaUIsSUFBakIsRUFBdUM7QUFBQSxRQUFoQixLQUFnQix1RUFBUixJQUFRO0FBRXZEO0FBdEJrQixDQUFyQjs7a0JBeUJlLFk7Ozs7Ozs7Ozs7O0FDekJmOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixHOzs7QUFFbkIsZUFBWSxJQUFaLEVBQWtCLElBQWxCLEVBQXVCO0FBQUE7O0FBQUEsMEdBQ2YsSUFEZTs7QUFFckIsVUFBSyxJQUFMLEdBQVksSUFBWjtBQUNBLFVBQUssSUFBTCxHQUFZLHFCQUFXLFlBQVgsQ0FBd0IsSUFBeEIsQ0FBWjtBQUNBLFVBQUssU0FBTCxHQUFpQixxQkFBVyxpQkFBWCxDQUE2QixJQUE3QixDQUFqQjtBQUpxQjtBQUt0Qjs7OzttQ0FFYyxLLEVBQU07QUFDbkIsV0FBSyxJQUFMLEdBQVksRUFBWixHQUFpQixLQUFLLElBQUwsR0FBWSxDQUE3QixHQUFpQyxLQUFqQztBQUNBLFdBQUssSUFBTCxHQUFZLENBQVosR0FBZ0IsS0FBSyxJQUFMLEdBQVksRUFBNUIsR0FBaUMsS0FBakM7QUFDQSxZQUFNLEtBQUssV0FBTCxFQUFOLEVBQTBCLFNBQTFCLEdBQXNDLEtBQXRDO0FBQ0Q7Ozs7OztrQkFia0IsRzs7Ozs7Ozs7O0FDSHJCOzs7Ozs7OztBQUVBLElBQU0sYUFBYTs7QUFFZixnQkFBWSxzQkFBTTtBQUNkLFlBQUksT0FBTyxFQUFYO0FBQ0EsYUFBSyxJQUFJLElBQUksQ0FBUixFQUFXLE9BQU8sQ0FBbEIsRUFBcUIsT0FBTyxDQUFqQyxFQUFvQyxLQUFLLEVBQXpDLEVBQTZDLEdBQTdDLEVBQWtEO0FBQzlDLGdCQUFJLFlBQUo7QUFDQSxnQkFBRyxTQUFTLENBQVosRUFBYztBQUNaLG9CQUFJLFdBQVcsRUFBZjtBQUNBLHFCQUFLLElBQUksSUFBSSxDQUFSLEVBQVcsVUFBVSxJQUExQixFQUFnQyxJQUFJLENBQXBDLEVBQXVDLEdBQXZDLEVBQTRDO0FBQ3hDLDBCQUFNLGtCQUFRLE9BQVIsRUFBaUIsSUFBakIsQ0FBTjtBQUNBO0FBQ0EsNkJBQVMsSUFBVCxDQUFjLEdBQWQ7QUFDSDtBQUNELHVCQUFPLE9BQU8sQ0FBZDtBQUNBLG9EQUNPLElBRFAsR0FFTyxRQUZQO0FBSUQsYUFaRCxNQVlNO0FBQ0osc0JBQU0sa0JBQVEsSUFBUixFQUFjLElBQWQsQ0FBTjtBQUNBLHVCQUFPLE9BQU8sQ0FBZDtBQUNBLHFCQUFLLElBQUwsQ0FBVSxHQUFWO0FBQ0Q7QUFDRCxnQkFBSSxJQUFJLENBQUosSUFBUyxDQUFiLEVBQWdCO0FBQ1o7QUFDQSx3QkFBUSxJQUFSO0FBQ0kseUJBQUssQ0FBTDtBQUNJLCtCQUFPLENBQVA7QUFDQTtBQUNKLHlCQUFLLENBQUw7QUFDSSwrQkFBTyxDQUFQO0FBQ0E7QUFDSix5QkFBSyxDQUFMO0FBQ0ksK0JBQU8sQ0FBUDtBQUNBO0FBQ0oseUJBQUssQ0FBTDtBQUNJLCtCQUFPLENBQVA7QUFDQTtBQUNKO0FBQ0k7QUFkUixpQkFlQztBQUNKO0FBQ0o7QUFDRCxlQUFPLElBQVA7QUFDSCxLQTVDYzs7QUE4Q2Ysa0JBQWMsc0JBQUMsSUFBRCxFQUFVO0FBQ3BCLGdCQUFRLElBQVI7QUFDSSxpQkFBSyxDQUFMO0FBQ0ksdUJBQU8sRUFBUDtBQUNBO0FBQ0osaUJBQUssQ0FBTDtBQUNJLHVCQUFPLEVBQVA7QUFDQTtBQUNKLGlCQUFLLENBQUw7QUFDSSx1QkFBTyxDQUFQO0FBQ0E7QUFDSixpQkFBSyxDQUFMO0FBQ0ksdUJBQU8sQ0FBUDtBQUNBO0FBQ0osaUJBQUssQ0FBTDtBQUNJLHVCQUFPLENBQVA7QUFDQTtBQUNKO0FBQ0k7QUFqQlI7QUFtQkgsS0FsRWM7O0FBb0VmLHVCQUFtQiwyQkFBQyxJQUFELEVBQVU7QUFDekIsZ0JBQVEsSUFBUjtBQUNJLGlCQUFLLENBQUw7QUFDSSx1QkFBTyxPQUFQO0FBQ0E7QUFDSixpQkFBSyxDQUFMO0FBQ0ksdUJBQU8sTUFBUDtBQUNBO0FBQ0osaUJBQUssQ0FBTDtBQUNJLHVCQUFPLE9BQVA7QUFDQTtBQUNKLGlCQUFLLENBQUw7QUFDSSx1QkFBTyxNQUFQO0FBQ0E7QUFDSixpQkFBSyxDQUFMO0FBQ0ksdUJBQU8sT0FBUDtBQUNBO0FBQ0o7QUFDSTtBQWpCUjtBQW1CSDtBQXhGYyxDQUFuQjs7a0JBMkZlLFU7Ozs7Ozs7Ozs7O0FDN0ZmOzs7Ozs7Ozs7Ozs7SUFFcUIsTzs7O0FBQ25CLG1CQUFZLElBQVosRUFBa0IsSUFBbEIsRUFBd0IsU0FBeEIsRUFBbUMsS0FBbkMsRUFBeUM7QUFBQTs7QUFBQTs7QUFFdkMsVUFBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLFVBQUssSUFBTCxHQUFZLEVBQVo7QUFDQSxVQUFLLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxVQUFLLEtBQUwsR0FBYSxDQUFiO0FBTHVDO0FBTXhDOzs7O3VDQUVrQixLLEVBQU07QUFDdkIsWUFBTSxLQUFLLFdBQUwsRUFBTixFQUEwQixTQUExQixHQUFzQyxTQUF0QztBQUNEOzs7eUJBRUksSyxFQUFNO0FBQ1QsY0FBTyxNQUFNLEtBQWI7QUFDRSxhQUFLLEVBQUw7QUFDRSxlQUFLLFNBQUwsR0FBaUIsTUFBakI7QUFDQSxlQUFLLElBQUw7QUFDQTtBQUNGLGFBQUssRUFBTDtBQUNFLGVBQUssU0FBTCxHQUFpQixJQUFqQjtBQUNBLGVBQUssSUFBTDtBQUNBO0FBQ0YsYUFBSyxFQUFMO0FBQ0UsZUFBSyxTQUFMLEdBQWlCLE9BQWpCO0FBQ0EsZUFBSyxJQUFMO0FBQ0E7QUFDRixhQUFLLEVBQUw7QUFDRSxlQUFLLFNBQUwsR0FBaUIsTUFBakI7QUFDQSxlQUFLLElBQUw7QUFDQTtBQUNGO0FBQ0U7QUFsQkosT0FtQkM7QUFDRjs7Ozs7O2tCQWxDa0IsTzs7Ozs7Ozs7Ozs7QUNGckI7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUIsSTtBQUNqQixvQkFBYztBQUFBOztBQUNWLGFBQUssS0FBTCxHQUFhLHFCQUFiO0FBQ0g7Ozs7b0NBRVc7QUFBQTs7QUFDUixnQkFBSSxRQUFRLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFaO0FBQ0EseUJBQWEsS0FBYjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ0EsaUJBQUssS0FBTCxDQUFXLFVBQVg7QUFDQSxxQkFBUyxnQkFBVCxDQUEwQixTQUExQixFQUFxQztBQUFBLHVCQUFNLE1BQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsS0FBdkIsQ0FBTjtBQUFBLGFBQXJDO0FBQ0g7Ozs7OztrQkFYZ0IsSTs7O0FBY3JCLFNBQVMsWUFBVCxDQUFzQixLQUF0QixFQUE2QjtBQUN6QixTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksR0FBcEIsRUFBeUIsR0FBekIsRUFBOEI7QUFDMUIsWUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0EsY0FBTSxXQUFOLENBQWtCLEdBQWxCO0FBQ0g7QUFDSjs7Ozs7Ozs7Ozs7OztJQ3RCb0IsWTtBQUNuQix3QkFBWSxJQUFaLEVBQWtCLElBQWxCLEVBQXdCLFNBQXhCLEVBQWtDO0FBQUE7O0FBQ2hDLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLFNBQWpCO0FBQ0Q7Ozs7a0NBRVk7QUFDVCxhQUFPLEtBQUssSUFBTCxHQUFZLEtBQUssSUFBTCxHQUFZLEVBQS9CO0FBQ0g7OzsyQkFFSztBQUNKLGNBQU8sS0FBSyxTQUFaO0FBQ00sYUFBSyxNQUFMO0FBQ0UsZUFBSyxJQUFMO0FBQ0E7QUFDRixhQUFLLE9BQUw7QUFDRSxlQUFLLElBQUw7QUFDQTtBQUNGO0FBQ0U7QUFSUjtBQVVEOzs7Ozs7a0JBdEJrQixZOzs7Ozs7Ozs7OztBQ0FyQjs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsTTs7O0FBQ25CLGtCQUFZLElBQVosRUFBa0IsSUFBbEIsRUFBdUI7QUFBQTs7QUFBQSxnSEFDZixJQURlOztBQUVyQixVQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsVUFBSyxJQUFMLEdBQVksd0JBQWMsWUFBZCxDQUEyQixJQUEzQixDQUFaO0FBQ0EsVUFBSyxTQUFMLEdBQWlCLE1BQWpCO0FBSnFCO0FBS3RCOzs7O3NDQUVpQixLLEVBQU07QUFDdEIsV0FBSyxJQUFMLEdBQVksQ0FBWixHQUFnQixLQUFLLElBQUwsR0FBWSxFQUE1QixHQUFpQyxLQUFqQztBQUNBLFlBQU0sS0FBSyxXQUFMLEVBQU4sRUFBMEIsU0FBMUIsR0FBc0MsUUFBdEM7QUFDRDs7Ozs7O2tCQVhrQixNOzs7Ozs7Ozs7QUNIckI7Ozs7Ozs7O0FBRUEsSUFBTSxnQkFBZ0I7O0FBRXBCLG1CQUFlLHlCQUFLO0FBQ2xCLFlBQUksVUFBVSxFQUFkO0FBQ0EsYUFBSyxJQUFJLElBQUksQ0FBUixFQUFXLE9BQU8sQ0FBbEIsRUFBcUIsT0FBTyxDQUFqQyxFQUFvQyxLQUFLLENBQXpDLEVBQTRDLEdBQTVDLEVBQWlEO0FBQy9DLGdCQUFJLGVBQUo7QUFDQSxnQkFBRyxRQUFRLENBQVgsRUFBYTtBQUNYLG9CQUFJLGNBQWMsRUFBbEI7QUFDQSxxQkFBSyxJQUFJLElBQUksQ0FBUixFQUFXLFVBQVUsSUFBMUIsRUFBZ0MsSUFBSSxDQUFwQyxFQUF1QyxHQUF2QyxFQUE0QztBQUN4Qyw2QkFBUyxxQkFBVyxPQUFYLEVBQW9CLElBQXBCLENBQVQ7QUFDQTtBQUNBLGdDQUFZLElBQVosQ0FBaUIsTUFBakI7QUFDSDtBQUNELHVCQUFPLE9BQU8sQ0FBZDtBQUNBLHVEQUNPLE9BRFAsR0FFTyxXQUZQO0FBSUQsYUFaRCxNQVlNO0FBQ0osb0JBQUksY0FBYyxFQUFsQjtBQUNBLHFCQUFLLElBQUksS0FBSSxDQUFSLEVBQVcsV0FBVSxJQUExQixFQUFnQyxLQUFJLENBQXBDLEVBQXVDLElBQXZDLEVBQTRDO0FBQ3hDLDZCQUFTLHFCQUFXLFFBQVgsRUFBb0IsSUFBcEIsQ0FBVDtBQUNBO0FBQ0EsZ0NBQVksSUFBWixDQUFpQixNQUFqQjtBQUNIO0FBQ0QsdUJBQU8sT0FBTyxDQUFkO0FBQ0EsdURBQ08sT0FEUCxHQUVPLFdBRlA7QUFJRDtBQUNELGdCQUFHLEtBQUssQ0FBUixFQUFVO0FBQ1IsdUJBQU8sQ0FBUDtBQUNBLHVCQUFPLENBQVA7QUFDRDtBQUNGO0FBQ0QsZUFBTyxPQUFQO0FBQ0QsS0FyQ21COztBQXVDcEIsa0JBQWMsc0JBQUMsSUFBRCxFQUFVO0FBQ3BCLGdCQUFRLElBQVI7QUFDSSxpQkFBSyxDQUFMO0FBQ0ksdUJBQU8sQ0FBUDtBQUNBO0FBQ0osaUJBQUssQ0FBTDtBQUNJLHVCQUFPLENBQVA7QUFDQTtBQUNKO0FBQ0k7QUFSUjtBQVVIOztBQWxEbUIsQ0FBdEI7O2tCQXNEZSxhOzs7Ozs7Ozs7Ozs7O0lDeERNLFk7QUFDakIsMEJBQWM7QUFBQTs7QUFDVixTQUFLLE1BQUwsR0FBYyxFQUFkO0FBQ0g7Ozs7OEJBRVMsUyxFQUFXLEUsRUFBSTtBQUFBOztBQUN2QixPQUFDLEtBQUssTUFBTCxDQUFZLFNBQVosQ0FBRCxHQUEwQixLQUFLLE1BQUwsQ0FBWSxTQUFaLElBQXlCLEVBQW5ELEdBQXdELEtBQXhEO0FBQ0EsV0FBSyxNQUFMLENBQVksU0FBWixFQUF1QixJQUF2QixDQUE0QixFQUE1Qjs7QUFFQSxhQUFPLFlBQUs7QUFDVixjQUFLLE1BQUwsQ0FBWSxTQUFaLElBQXlCLE1BQUssTUFBTCxDQUFZLFNBQVosRUFBdUIsTUFBdkIsQ0FBOEI7QUFBQSxpQkFBVyxPQUFPLE9BQWxCO0FBQUEsU0FBOUIsQ0FBekI7QUFDRCxPQUZEO0FBR0Q7Ozt5QkFFSSxTLEVBQVcsSSxFQUFLO0FBQ25CLFVBQU0sUUFBUSxLQUFLLE1BQUwsQ0FBWSxTQUFaLENBQWQ7QUFDQSxVQUFHLEtBQUgsRUFBUztBQUNQLGNBQU0sT0FBTixDQUFjLGNBQUs7QUFDakIsYUFBRyxJQUFILENBQVEsSUFBUixFQUFjLElBQWQ7QUFDRCxTQUZEO0FBR0Q7QUFDRjs7Ozs7O2tCQXJCZ0IsWTs7Ozs7QUNBckI7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQUs7QUFDakQsTUFBSSxPQUFPLG9CQUFYO0FBQ0EsT0FBSyxTQUFMO0FBQ0QsQ0FIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRnJvZ2dlciBmcm9tICcuLi9Gcm9nZ2VyLmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4uL0NhcnMvQ2FyU2VydmljZS5qcyc7XG5pbXBvcnQgQm9hcmRTZXJ2aWNlIGZyb20gJy4vQm9hcmRTZXJ2aWNlLmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4uL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG51bGw7XG4gICAgICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKCk7XG4gICAgICAgIHRoaXMuY2FycyA9IENhclNlcnZpY2UuY3JlYXRlQ2FycygpO1xuICAgICAgICB0aGlzLnR1cnRsZXMgPSBUdXJ0bGVTZXJ2aWNlLmNyZWF0ZVR1cnRsZXMoKTtcbiAgICB9O1xuXG4gICAgc2V0Qm9hcmQoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYm9hcmQgZGl2Jyk7XG4gICAgICAgIEJvYXJkU2VydmljZS5jbGVhckJvYXJkKHRoaXMuYm9hcmQpO1xuICAgICAgICB0aGlzLmZyb2dnZXIuc2V0RnJvZ2dlclBvc2l0aW9uKHRoaXMuYm9hcmQpO1xuICAgICAgICB0aGlzLmNhcnMuZm9yRWFjaCgoY2FyKSA9PiB7XG4gICAgICAgICAgICBjYXIuc2V0Q2FyUG9zaXRpb24odGhpcy5ib2FyZCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnR1cnRsZXMuZm9yRWFjaCgodHVydGxlKSA9PntcbiAgICAgICAgICB0dXJ0bGUuc2V0VHVydGxlUG9zaXRpb24odGhpcy5ib2FyZCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBtb3ZlRnJvZ2dlcihldmVudCkge1xuICAgICAgICB0aGlzLmZyb2dnZXIubW92ZShldmVudCk7XG4gICAgICAgIHRoaXMuc2V0Qm9hcmQoKTtcbiAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgIH07XG5cbiAgICBjaGVja0NvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy5jYXJzLmZvckVhY2goKGNhcikgPT4ge1xuICAgICAgICAgIGlmKGNhci5nZXRQb3NpdGlvbigpID09PSB0aGlzLmZyb2dnZXIuZ2V0UG9zaXRpb24oKSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FtZSBvdmVyJyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHN0YXJ0Qm9hcmQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxLCBzcGVlZCA9IDExMDA7IGkgPD0gNTsgaSsrKSB7XG4gICAgICAgICAgICBCb2FyZFNlcnZpY2Uuc3RhcnRNb3ZpbmdMaW5lKHRoaXMsIHRoaXMuY2FycywgaSwgc3BlZWQpO1xuICAgICAgICAgICAgc3BlZWQgPSBzcGVlZCAtIDEwMDtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAxLCBzcGVlZCA9IDkwMDsgaSA8PTI7IGkrKyl7XG4gICAgICAgICAgQm9hcmRTZXJ2aWNlLnN0YXJ0TW92aW5nTGluZSh0aGlzLCB0aGlzLnR1cnRsZXMsIGksIHNwZWVkKTtcbiAgICAgICAgICBzcGVlZCA9IDcwMDtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiY29uc3QgQm9hcmRTZXJ2aWNlID0ge1xuXG4gIGNsZWFyQm9hcmQ6IChib2FyZCkgPT4ge1xuICAgIGJvYXJkLmZvckVhY2goKGRpdik9PntcbiAgICAgIGRpdi5jbGFzc05hbWUgPSBcIlwiO1xuICAgIH0pXG4gIH0sXG5cbiAgc3RhcnRNb3ZpbmdMaW5lOiAoQm9hcmQsIG9iamVjdHMsIGxpbmUsIHNwZWVkID0gMTAwMCkgPT57XG4gICAgcmV0dXJuIHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PntcbiAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSBvYmplY3RzLmZpbHRlcigob2JqKSA9PntcbiAgICAgICAgcmV0dXJuIG9iai5saW5lID09IGxpbmU7XG4gICAgICB9KTtcbiAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChvYmopID0+e1xuICAgICAgICAgIG9iai5tb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgIEJvYXJkLnNldEJvYXJkKCk7XG4gICAgfSwgc3BlZWQpOyAvLyBUT0RPOiBhZGQgc3BlZWQgZnVuY3Rpb25hbGl0eVxuICB9LFxuXG4gIHN0YXJ0VHVydGxlTGluZTogKEJvYXJkLCB0dXJ0bGVzLCBsaW5lLCBzcGVlZCA9IDEwMDApID0+e1xuXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJvYXJkU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4vQ2FyU2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhciBleHRlbmRzIE1vdmluZ09iamVjdHtcblxuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gQ2FyU2VydmljZS5nZW5lcmF0ZURpcmVjdGlvbihsaW5lKTtcbiAgfVxuXG4gIHNldENhclBvc2l0aW9uKGJvYXJkKXtcbiAgICB0aGlzLnBvc1ggPiAxMyA/IHRoaXMucG9zWCA9IDAgOiBmYWxzZTtcbiAgICB0aGlzLnBvc1ggPCAwID8gdGhpcy5wb3NYID0gMTMgOiBmYWxzZTtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwiY2FyXCI7XG4gIH1cblxufVxuIiwiaW1wb3J0IENhciBmcm9tICcuL0Nhci5qcyc7XG5cbmNvbnN0IENhclNlcnZpY2UgPSB7XG5cbiAgICBjcmVhdGVDYXJzOiAoKSA9PiB7XG4gICAgICAgIGxldCBjYXJzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDA7IGkgPD0gMTU7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNhcjtcbiAgICAgICAgICAgIGlmKGxpbmUgPT09IDUpe1xuICAgICAgICAgICAgICBsZXQgc2l6ZTNDYXIgPSBbXTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIG5ld1Bvc1ggPSBwb3NYOyBqIDwgMzsgaisrKSB7XG4gICAgICAgICAgICAgICAgICBjYXIgPSBuZXcgQ2FyKG5ld1Bvc1gsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgICAgICAgc2l6ZTNDYXIucHVzaChjYXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgNDtcbiAgICAgICAgICAgICAgY2FycyA9IFtcbiAgICAgICAgICAgICAgICAgIC4uLmNhcnMsXG4gICAgICAgICAgICAgICAgICAuLi5zaXplM0NhclxuICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICBjYXIgPSBuZXcgQ2FyKHBvc1gsIGxpbmUpO1xuICAgICAgICAgICAgICBwb3NYID0gcG9zWCArIDNcbiAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDY7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FycztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlRGlyZWN0aW9uOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vTW92aW5nT2JqZWN0LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJvZ2dlciBleHRlbmRzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBsaXZlcyl7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnBvc1ggPSA3O1xuICAgIHRoaXMucG9zWSA9IDEyO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICB0aGlzLmxpdmVzID0gMztcbiAgfVxuXG4gIHNldEZyb2dnZXJQb3NpdGlvbihib2FyZCl7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcImZyb2dnZXJcIjtcbiAgfVxuXG4gIG1vdmUoZXZlbnQpe1xuICAgIHN3aXRjaChldmVudC53aGljaCl7XG4gICAgICBjYXNlIDM3OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgdGhpcy5wb3NYLS07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICB0aGlzLnBvc1ktLTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgIHRoaXMucG9zWCsrO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgICAgICB0aGlzLnBvc1krKztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9O1xuICB9XG5cbn1cbiIsImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkL0JvYXJkLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vRXZlbnRFbWl0dGVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIGxldCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpO1xuICAgICAgICBnZW5lcmF0ZURpdnMoYm9hcmQpO1xuICAgICAgICB0aGlzLmJvYXJkLnNldEJvYXJkKCk7XG4gICAgICAgIHRoaXMuYm9hcmQuc3RhcnRCb2FyZCgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKCkgPT4gdGhpcy5ib2FyZC5tb3ZlRnJvZ2dlcihldmVudCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVEaXZzKGJvYXJkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxODI7IGkrKykge1xuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgcG9zWSwgZGlyZWN0aW9uKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgIHRoaXMucG9zWSA9IHBvc1k7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gIH1cblxuICBnZXRQb3NpdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMucG9zWCArIHRoaXMucG9zWSAqIDE0O1xuICB9XG5cbiAgbW92ZSgpe1xuICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbil7XG4gICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICB0aGlzLnBvc1gtLTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIHRoaXMucG9zWCsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4vVHVydGxlU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1cnRsZSBleHRlbmRzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgbGluZSl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnBvc1kgPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgfVxuICBcbiAgc2V0VHVydGxlUG9zaXRpb24oYm9hcmQpe1xuICAgIHRoaXMucG9zWCA8IDAgPyB0aGlzLnBvc1ggPSAxMyA6IGZhbHNlO1xuICAgIGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24oKV0uY2xhc3NOYW1lID0gXCJ0dXJ0bGVcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFR1cnRsZSBmcm9tICcuL1R1cnRsZS5qcyc7XG5cbmNvbnN0IFR1cnRsZVNlcnZpY2UgPSB7XG5cbiAgY3JlYXRlVHVydGxlczogKCkgPT57XG4gICAgbGV0IHR1cnRsZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAzOyBpIDw9IDc7IGkrKykge1xuICAgICAgbGV0IHR1cnRsZTtcbiAgICAgIGlmKGxpbmUgPT0gMSl7XG4gICAgICAgIGxldCBzaXplMlR1cnRsZSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAyOyBqKyspIHtcbiAgICAgICAgICAgIHR1cnRsZSA9IG5ldyBUdXJ0bGUobmV3UG9zWCwgbGluZSk7XG4gICAgICAgICAgICBuZXdQb3NYKys7XG4gICAgICAgICAgICBzaXplMlR1cnRsZS5wdXNoKHR1cnRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcG9zWCA9IHBvc1ggKyAzO1xuICAgICAgICB0dXJ0bGVzID0gW1xuICAgICAgICAgICAgLi4udHVydGxlcyxcbiAgICAgICAgICAgIC4uLnNpemUyVHVydGxlXG4gICAgICAgIF07XG4gICAgICB9IGVsc2V7XG4gICAgICAgIGxldCBzaXplM1R1cnRsZSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgIHR1cnRsZSA9IG5ldyBUdXJ0bGUobmV3UG9zWCwgbGluZSk7XG4gICAgICAgICAgICBuZXdQb3NYKys7XG4gICAgICAgICAgICBzaXplM1R1cnRsZS5wdXNoKHR1cnRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcG9zWCA9IHBvc1ggKyA0O1xuICAgICAgICB0dXJ0bGVzID0gW1xuICAgICAgICAgICAgLi4udHVydGxlcyxcbiAgICAgICAgICAgIC4uLnNpemUzVHVydGxlXG4gICAgICAgIF07XG4gICAgICB9XG4gICAgICBpZihpID09IDQpe1xuICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgcG9zWCA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0dXJ0bGVzO1xuICB9LFxuXG4gIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIDU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGVTZXJ2aWNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9O1xuXG4gICAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICF0aGlzLmV2ZW50c1tldmVudE5hbWVdID8gdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdIDogZmFsc2U7XG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXG4gICAgICByZXR1cm4gKCkgPT57XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcihldmVudEZuID0+IGZuICE9PSBldmVudEZuKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZW1pdChldmVudE5hbWUsIGRhdGEpe1xuICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgaWYoZXZlbnQpe1xuICAgICAgICBldmVudC5mb3JFYWNoKGZuID0+e1xuICAgICAgICAgIGZuLmNhbGwobnVsbCwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG59XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0NvbXBvbmVudHMvR2FtZS5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PntcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xufSk7XG4iXX0=
