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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board() {
        _classCallCheck(this, Board);

        this.board = null;
        this.frogger = new _Frogger2.default();
        this.cars = _CarService2.default.createCars();
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

},{"../Frogger.js":3,"../cars/CarService.js":7,"./BoardService.js":2}],2:[function(require,module,exports){
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

},{"./Board/Board.js":1}],5:[function(require,module,exports){
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
'use strict';

var _Game = require('./Components/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./Components/Game.js":4}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0Zyb2dnZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9HYW1lLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTW92aW5nT2JqZWN0LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvY2Fycy9DYXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9jYXJzL0NhclNlcnZpY2UuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEs7QUFDakIscUJBQWM7QUFBQTs7QUFDVixhQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0EsYUFBSyxPQUFMLEdBQWUsdUJBQWY7QUFDQSxhQUFLLElBQUwsR0FBWSxxQkFBVyxVQUFYLEVBQVo7QUFDSDs7OzttQ0FFVTtBQUFBOztBQUNQLGlCQUFLLEtBQUwsR0FBYSxTQUFTLGdCQUFULENBQTBCLFlBQTFCLENBQWI7QUFDQSxtQ0FBYSxVQUFiLENBQXdCLEtBQUssS0FBN0I7QUFDQSxpQkFBSyxPQUFMLENBQWEsa0JBQWIsQ0FBZ0MsS0FBSyxLQUFyQztBQUNBLGlCQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLFVBQUMsR0FBRCxFQUFTO0FBQ3ZCLG9CQUFJLGNBQUosQ0FBbUIsTUFBSyxLQUF4QjtBQUNILGFBRkQ7QUFHSDs7O29DQUVXLEssRUFBTztBQUNmLGlCQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLEtBQWxCO0FBQ0EsaUJBQUssUUFBTDtBQUNBLGlCQUFLLGNBQUw7QUFDSDs7O3lDQUVnQjtBQUFBOztBQUNiLGlCQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLFVBQUMsR0FBRCxFQUFTO0FBQ3pC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LE9BQVA7QUFDQTtBQUNGLFdBQUssQ0FBTDtBQUNFLGVBQU8sTUFBUDtBQUNBO0FBQ0YsV0FBSyxDQUFMO0FBQ0UsZUFBTyxPQUFQO0FBQ0E7QUFDRixXQUFLLENBQUw7QUFDRSxlQUFPLE1BQVA7QUFDQTtBQUNGLFdBQUssQ0FBTDtBQUNFLGVBQU8sT0FBUDtBQUNBO0FBQ0Y7QUFDRTtBQWpCSjtBQW1CRDtBQXpFYyxDQUFuQjs7a0JBNEVlLFU7Ozs7O0FDL0VmOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFLO0FBQ2pELE1BQUksT0FBTyxvQkFBWDtBQUNBLE9BQUssU0FBTDtBQUNELENBSEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEZyb2dnZXIgZnJvbSAnLi4vRnJvZ2dlci5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuLi9jYXJzL0NhclNlcnZpY2UuanMnO1xuaW1wb3J0IEJvYXJkU2VydmljZSBmcm9tICcuL0JvYXJkU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG51bGw7XG4gICAgICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKCk7XG4gICAgICAgIHRoaXMuY2FycyA9IENhclNlcnZpY2UuY3JlYXRlQ2FycygpO1xuICAgIH07XG5cbiAgICBzZXRCb2FyZCgpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNib2FyZCBkaXYnKTtcbiAgICAgICAgQm9hcmRTZXJ2aWNlLmNsZWFyQm9hcmQodGhpcy5ib2FyZCk7XG4gICAgICAgIHRoaXMuZnJvZ2dlci5zZXRGcm9nZ2VyUG9zaXRpb24odGhpcy5ib2FyZCk7XG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKChjYXIpID0+IHtcbiAgICAgICAgICAgIGNhci5zZXRDYXJQb3NpdGlvbih0aGlzLmJvYXJkKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIG1vdmVGcm9nZ2VyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZnJvZ2dlci5tb3ZlKGV2ZW50KTtcbiAgICAgICAgdGhpcy5zZXRCb2FyZCgpO1xuICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgfTtcblxuICAgIGNoZWNrQ29sbGlzaW9uKCkge1xuICAgICAgICB0aGlzLmNhcnMuZm9yRWFjaCgoY2FyKSA9PiB7XG4gICAgICAgICAgaWYoY2FyLmdldFBvc2l0aW9uKCkgPT09IHRoaXMuZnJvZ2dlci5nZXRQb3NpdGlvbigpKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnYW1lIG92ZXInKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc3RhcnRCb2FyZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIHNwZWVkID0gMTEwMDsgaSA8PSA1OyBpKyspIHtcbiAgICAgICAgICAgIEJvYXJkU2VydmljZS5zdGFydENhckxpbmUodGhpcywgdGhpcy5jYXJzLCBpLCBzcGVlZCk7XG4gICAgICAgICAgICBzcGVlZCA9IHNwZWVkIC0gMTAwO1xuICAgICAgICAgICAgaSA+IDQgPyBzcGVlZCA9IDExMDAgOiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiY29uc3QgQm9hcmRTZXJ2aWNlID0ge1xuXG4gIGNsZWFyQm9hcmQ6IChib2FyZCkgPT4ge1xuICAgIGJvYXJkLmZvckVhY2goKGRpdik9PntcbiAgICAgIGRpdi5jbGFzc05hbWUgPSBcIlwiO1xuICAgIH0pXG4gIH0sXG5cbiAgc3RhcnRDYXJMaW5lOiAoQm9hcmQsIGNhcnMsIGxpbmUsIHNwZWVkID0gMTAwMCkgPT57XG4gICAgcmV0dXJuIHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PntcbiAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSBjYXJzLmZpbHRlcigoY2FyKSA9PntcbiAgICAgICAgcmV0dXJuIGNhci5saW5lID09IGxpbmU7XG4gICAgICB9KTtcbiAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKChjYXIpID0+e1xuICAgICAgICBjYXIubW92ZSgpO1xuICAgICAgfSk7XG4gICAgICBCb2FyZC5zZXRCb2FyZCgpO1xuICAgIH0sIHNwZWVkKTsgLy8gVE9ETzogYWRkIHNwZWVkIGZ1bmN0aW9uYWxpdHlcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQm9hcmRTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL01vdmluZ09iamVjdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb2dnZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbiwgbGl2ZXMpe1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5wb3NYID0gNztcbiAgICB0aGlzLnBvc1kgPSAxMjtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgdGhpcy5saXZlcyA9IDM7XG4gIH1cblxuICBzZXRGcm9nZ2VyUG9zaXRpb24oYm9hcmQpe1xuICAgIGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24oKV0uY2xhc3NOYW1lID0gXCJmcm9nZ2VyXCI7XG4gIH1cblxuICBtb3ZlKGV2ZW50KXtcbiAgICBzd2l0Y2goZXZlbnQud2hpY2gpe1xuICAgICAgY2FzZSAzNzpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgIHRoaXMucG9zWC0tO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICAgICAgdGhpcy5wb3NZLS07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICB0aGlzLnBvc1grKztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwOlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdkb3duJztcbiAgICAgICAgdGhpcy5wb3NZKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZC9Cb2FyZC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWV7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICB9XG5cbiAgc3RhcnRHYW1lKCl7XG4gICAgbGV0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkJyk7XG4gICAgZ2VuZXJhdGVEaXZzKGJvYXJkKTtcbiAgICB0aGlzLmJvYXJkLnNldEJvYXJkKCk7XG4gICAgdGhpcy5ib2FyZC5zdGFydEJvYXJkKCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsICgpID0+IHRoaXMuYm9hcmQubW92ZUZyb2dnZXIoZXZlbnQpKTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRGl2cyhib2FyZCl7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCAxODI7IGkrKyl7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvYXJkLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbil7XG4gICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICB0aGlzLnBvc1kgPSBwb3NZO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLnBvc1ggKyB0aGlzLnBvc1kgKiAxNDtcbiAgfVxufVxuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi9DYXJTZXJ2aWNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuXG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5wb3NZID0gQ2FyU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBDYXJTZXJ2aWNlLmdlbmVyYXRlRGlyZWN0aW9uKGxpbmUpO1xuICAgIHRoaXMuc2l6ZSA9IDE7XG4gIH1cblxuICBzZXRDYXJQb3NpdGlvbihib2FyZCl7XG4gICAgdGhpcy5wb3NYID4gMTMgPyB0aGlzLnBvc1ggPSAwIDogZmFsc2U7XG4gICAgdGhpcy5wb3NYIDwgMCA/IHRoaXMucG9zWCA9IDEzIDogZmFsc2U7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcImNhclwiO1xuICB9XG5cbiAgbW92ZSgpe1xuICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbil7XG4gICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICB0aGlzLnBvc1gtLTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIHRoaXMucG9zWCsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IENhciBmcm9tICcuL0Nhci5qcyc7XG5pbXBvcnQgQm9hcmRTZXJ2aWNlIGZyb20gJy4uL0JvYXJkL0JvYXJkU2VydmljZS5qcyc7XG5cbmNvbnN0IENhclNlcnZpY2UgPSB7XG5cbiAgICBjcmVhdGVDYXJzOiAoKSA9PiB7XG4gICAgICAgIGxldCBjYXJzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDA7IGkgPD0gMTU7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICBwb3NYID0gcG9zWCArIDM7XG4gICAgICAgICAgICBpZiAoaSAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDY7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhcnMucHVzaChjYXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYXJzO1xuICAgIH0sXG5cbiAgICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgc3dpdGNoKGxpbmUpe1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgcmV0dXJuIDExO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgcmV0dXJuIDEwO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICByZXR1cm4gOTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHJldHVybiA4O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgcmV0dXJuIDc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlRGlyZWN0aW9uOiAobGluZSkgPT57XG4gICAgICBzd2l0Y2gobGluZSl7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyU2VydmljZTtcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vQ29tcG9uZW50cy9HYW1lLmpzJzsgXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PntcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xufSk7XG4iXX0=
