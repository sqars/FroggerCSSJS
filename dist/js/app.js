(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Frogger = require('../Frogger.js');

var _Frogger2 = _interopRequireDefault(_Frogger);

var _CarService = require('../cars/CarService.js');

var _CarService2 = _interopRequireDefault(_CarService);

var _BoardService = require('./BoardService.js');

var _BoardService2 = _interopRequireDefault(_BoardService);

var _EventEmitter = require('../../EventEmitter.js');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board() {
        _classCallCheck(this, Board);

        this.board = null;
        this.frogger = new _Frogger2.default();
        this.cars = _CarService2.default.createCars();
        this.emitter = new _EventEmitter2.default();
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
                _BoardService2.default.startCarLine(this, this.cars, i, speed);
                speed = speed - 100;
                i > 4 ? speed = 1100 : false;
            }
        }
    }]);

    return Board;
}();

exports.default = Board;

},{"../../EventEmitter.js":8,"../Frogger.js":3,"../cars/CarService.js":7,"./BoardService.js":2}],2:[function(require,module,exports){
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

  startCarLine: function startCarLine(Board, cars, line) {
    var speed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;

    return window.setInterval(function () {
      var filteredLine = cars.filter(function (car) {
        return car.line == line;
      });
      filteredLine.forEach(function (car) {
        car.move();
      });
      Board.setBoard();
    }, speed); // TODO: add speed functionality
  }
};

exports.default = BoardService;

},{}],3:[function(require,module,exports){
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

},{"./MovingObject.js":5}],4:[function(require,module,exports){
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

},{"../EventEmitter.js":8,"./Board/Board.js":1}],5:[function(require,module,exports){
"use strict";

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
    key: "getPosition",
    value: function getPosition() {
      return this.posX + this.posY * 14;
    }
  }]);

  return MovingObject;
}();

exports.default = MovingObject;

},{}],6:[function(require,module,exports){
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
    _this.size = 1;
    return _this;
  }

  _createClass(Car, [{
    key: 'setCarPosition',
    value: function setCarPosition(board) {
      this.posX > 13 ? this.posX = 0 : false;
      this.posX < 0 ? this.posX = 13 : false;
      board[this.getPosition()].className = "car";
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

  return Car;
}(_MovingObject3.default);

exports.default = Car;

},{"../MovingObject.js":5,"./CarService":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Car = require('./Car.js');

var _Car2 = _interopRequireDefault(_Car);

var _BoardService = require('../Board/BoardService.js');

var _BoardService2 = _interopRequireDefault(_BoardService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CarService = {

  createCars: function createCars() {
    var cars = [];
    for (var i = 1, line = 1, posX = 0; i <= 15; i++) {
      var car = new _Car2.default(posX, line);
      posX = posX + 3;
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
        }
      };
      cars.push(car);
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

},{"../Board/BoardService.js":2,"./Car.js":6}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
'use strict';

var _Game = require('./Components/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./Components/Game.js":4}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0Zyb2dnZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9HYW1lLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTW92aW5nT2JqZWN0LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvY2Fycy9DYXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9jYXJzL0NhclNlcnZpY2UuanMiLCJzcmMvanMvRXZlbnRFbWl0dGVyLmpzIiwic3JjL2pzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEs7QUFDakIscUJBQWM7QUFBQTs7QUFDVixhQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0EsYUFBSyxPQUFMLEdBQWUsdUJBQWY7QUFDQSxhQUFLLElBQUwsR0FBWSxxQkFBVyxVQUFYLEVBQVo7QUFDQSxhQUFLLE9BQUwsR0FBZSw0QkFBZjtBQUNIOzs7O21DQUVVO0FBQUE7O0FBQ1AsaUJBQUssS0FBTCxHQUFhLFNBQVMsZ0JBQVQsQ0FBMEIsWUFBMUIsQ0FBYjtBQUNBLG1DQUFhLFVBQWIsQ0FBd0IsS0FBSyxLQUE3QjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxrQkFBYixDQUFnQyxLQUFLLEtBQXJDO0FBQ0EsaUJBQUssSUFBTCxDQUFVLE9BQVYsQ0FBa0IsVUFBQyxHQUFELEVBQVM7QUFDdkIsb0JBQUksY0FBSixDQUFtQixNQUFLLEtBQXhCO0FBQ0gsYUFGRDtBQUdIOzs7b0NBRVcsSyxFQUFPO0FBQ2YsaUJBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsS0FBbEI7QUFDQSxpQkFBSyxRQUFMO0FBQ0EsaUJBQUssY0FBTDtBQUNIOzs7eUNBRWdC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T0FBSyxTQUFMO0FBQ0QsQ0FIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRnJvZ2dlciBmcm9tICcuLi9Gcm9nZ2VyLmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4uL2NhcnMvQ2FyU2VydmljZS5qcyc7XG5pbXBvcnQgQm9hcmRTZXJ2aWNlIGZyb20gJy4vQm9hcmRTZXJ2aWNlLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vLi4vRXZlbnRFbWl0dGVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gbnVsbDtcbiAgICAgICAgdGhpcy5mcm9nZ2VyID0gbmV3IEZyb2dnZXIoKTtcbiAgICAgICAgdGhpcy5jYXJzID0gQ2FyU2VydmljZS5jcmVhdGVDYXJzKCk7XG4gICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB9O1xuXG4gICAgc2V0Qm9hcmQoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYm9hcmQgZGl2Jyk7XG4gICAgICAgIEJvYXJkU2VydmljZS5jbGVhckJvYXJkKHRoaXMuYm9hcmQpO1xuICAgICAgICB0aGlzLmZyb2dnZXIuc2V0RnJvZ2dlclBvc2l0aW9uKHRoaXMuYm9hcmQpO1xuICAgICAgICB0aGlzLmNhcnMuZm9yRWFjaCgoY2FyKSA9PiB7XG4gICAgICAgICAgICBjYXIuc2V0Q2FyUG9zaXRpb24odGhpcy5ib2FyZCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBtb3ZlRnJvZ2dlcihldmVudCkge1xuICAgICAgICB0aGlzLmZyb2dnZXIubW92ZShldmVudCk7XG4gICAgICAgIHRoaXMuc2V0Qm9hcmQoKTtcbiAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgIH07XG5cbiAgICBjaGVja0NvbGxpc2lvbigpIHtcbiAgICAgICAgdGhpcy5jYXJzLmZvckVhY2goKGNhcikgPT4ge1xuICAgICAgICAgIGlmKGNhci5nZXRQb3NpdGlvbigpID09PSB0aGlzLmZyb2dnZXIuZ2V0UG9zaXRpb24oKSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FtZSBvdmVyJyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHN0YXJ0Qm9hcmQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxLCBzcGVlZCA9IDExMDA7IGkgPD0gNTsgaSsrKSB7XG4gICAgICAgICAgICBCb2FyZFNlcnZpY2Uuc3RhcnRDYXJMaW5lKHRoaXMsIHRoaXMuY2FycywgaSwgc3BlZWQpO1xuICAgICAgICAgICAgc3BlZWQgPSBzcGVlZCAtIDEwMDtcbiAgICAgICAgICAgIGkgPiA0ID8gc3BlZWQgPSAxMTAwIDogZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsImNvbnN0IEJvYXJkU2VydmljZSA9IHtcblxuICBjbGVhckJvYXJkOiAoYm9hcmQpID0+IHtcbiAgICBib2FyZC5mb3JFYWNoKChkaXYpPT57XG4gICAgICBkaXYuY2xhc3NOYW1lID0gXCJcIjtcbiAgICB9KVxuICB9LFxuXG4gIHN0YXJ0Q2FyTGluZTogKEJvYXJkLCBjYXJzLCBsaW5lLCBzcGVlZCA9IDEwMDApID0+e1xuICAgIHJldHVybiB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT57XG4gICAgICBsZXQgZmlsdGVyZWRMaW5lID0gY2Fycy5maWx0ZXIoKGNhcikgPT57XG4gICAgICAgIHJldHVybiBjYXIubGluZSA9PSBsaW5lO1xuICAgICAgfSk7XG4gICAgICBmaWx0ZXJlZExpbmUuZm9yRWFjaCgoY2FyKSA9PntcbiAgICAgICAgY2FyLm1vdmUoKTtcbiAgICAgIH0pO1xuICAgICAgQm9hcmQuc2V0Qm9hcmQoKTtcbiAgICB9LCBzcGVlZCk7IC8vIFRPRE86IGFkZCBzcGVlZCBmdW5jdGlvbmFsaXR5XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJvYXJkU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9Nb3ZpbmdPYmplY3QuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9nZ2VyIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIGxpdmVzKXtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucG9zWCA9IDc7XG4gICAgdGhpcy5wb3NZID0gMTI7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgIHRoaXMubGl2ZXMgPSAzO1xuICB9XG5cbiAgc2V0RnJvZ2dlclBvc2l0aW9uKGJvYXJkKXtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwiZnJvZ2dlclwiO1xuICB9XG5cbiAgbW92ZShldmVudCl7XG4gICAgc3dpdGNoKGV2ZW50LndoaWNoKXtcbiAgICAgIGNhc2UgMzc6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICB0aGlzLnBvc1gtLTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM4OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgICAgIHRoaXMucG9zWS0tO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgdGhpcy5wb3NYKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnZG93bic7XG4gICAgICAgIHRoaXMucG9zWSsrO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH07XG4gIH1cblxufVxuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQvQm9hcmQuanMnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9FdmVudEVtaXR0ZXIuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICAgIH1cblxuICAgIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgbGV0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkJyk7XG4gICAgICAgIGdlbmVyYXRlRGl2cyhib2FyZCk7XG4gICAgICAgIHRoaXMuYm9hcmQuc2V0Qm9hcmQoKTtcbiAgICAgICAgdGhpcy5ib2FyZC5zdGFydEJvYXJkKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoKSA9PiB0aGlzLmJvYXJkLm1vdmVGcm9nZ2VyKGV2ZW50KSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZURpdnMoYm9hcmQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE4MjsgaSsrKSB7XG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24pe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCl7XG4gICAgICByZXR1cm4gdGhpcy5wb3NYICsgdGhpcy5wb3NZICogMTQ7XG4gIH1cbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4vQ2FyU2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhciBleHRlbmRzIE1vdmluZ09iamVjdHtcblxuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gQ2FyU2VydmljZS5nZW5lcmF0ZURpcmVjdGlvbihsaW5lKTtcbiAgICB0aGlzLnNpemUgPSAxO1xuICB9XG5cbiAgc2V0Q2FyUG9zaXRpb24oYm9hcmQpe1xuICAgIHRoaXMucG9zWCA+IDEzID8gdGhpcy5wb3NYID0gMCA6IGZhbHNlO1xuICAgIHRoaXMucG9zWCA8IDAgPyB0aGlzLnBvc1ggPSAxMyA6IGZhbHNlO1xuICAgIGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24oKV0uY2xhc3NOYW1lID0gXCJjYXJcIjtcbiAgfVxuXG4gIG1vdmUoKXtcbiAgICBzd2l0Y2godGhpcy5kaXJlY3Rpb24pe1xuICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgdGhpcy5wb3NYLS07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICB0aGlzLnBvc1grKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCBDYXIgZnJvbSAnLi9DYXIuanMnO1xuaW1wb3J0IEJvYXJkU2VydmljZSBmcm9tICcuLi9Cb2FyZC9Cb2FyZFNlcnZpY2UuanMnO1xuXG5jb25zdCBDYXJTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlQ2FyczogKCkgPT4ge1xuICAgICAgICBsZXQgY2FycyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDE1OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjYXIgPSBuZXcgQ2FyKHBvc1gsIGxpbmUpO1xuICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyAzO1xuICAgICAgICAgICAgaWYgKGkgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSA2O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXJzLnB1c2goY2FyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FycztcbiAgICB9LFxuXG4gICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgIHN3aXRjaChsaW5lKXtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHJldHVybiAxMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHJldHVybiAxMDtcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgcmV0dXJuIDk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgIHJldHVybiA3O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZURpcmVjdGlvbjogKGxpbmUpID0+e1xuICAgICAgc3dpdGNoKGxpbmUpe1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhclNlcnZpY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xuICAgIH07XG5cbiAgICBzdWJzY3JpYmUoZXZlbnROYW1lLCBmbikge1xuICAgICAgIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPyB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW10gOiBmYWxzZTtcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG5cbiAgICAgIHJldHVybiAoKSA9PntcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKGV2ZW50Rm4gPT4gZm4gIT09IGV2ZW50Rm4pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBlbWl0KGV2ZW50TmFtZSwgZGF0YSl7XG4gICAgICBjb25zdCBldmVudCA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV07XG4gICAgICBpZihldmVudCl7XG4gICAgICAgIGV2ZW50LmZvckVhY2goZm4gPT57XG4gICAgICAgICAgZm4uY2FsbChudWxsLCBkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbn1cbiIsImltcG9ydCBHYW1lIGZyb20gJy4vQ29tcG9uZW50cy9HYW1lLmpzJzsgXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PntcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xufSk7XG4iXX0=
