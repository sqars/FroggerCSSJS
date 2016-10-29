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
    }
  }, {
    key: 'startBoard',
    value: function startBoard() {
      var _this2 = this;

      return window.setInterval(function () {
        var firstLineCars = _this2.cars.filter(function (car) {
          return car.line == 1;
        });
        _this2.cars.forEach(function (car) {
          car.move();
        });
        _this2.setBoard();
      }, 1000); // TODO: add speed functionality
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
      board[this.getPosition(this.posX, this.posY)].className = "frogger";
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
    value: function getPosition(posX, posY) {
      return posX + posY * 14;
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
      board[this.getPosition(this.posX, this.posY)].className = "car";
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
            posX = 7;
            break;
          case 3:
            posX = 0;
            break;
          case 4:
            posX = 7;
            break;
          case 5:
            posX = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0Zyb2dnZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9HYW1lLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTW92aW5nT2JqZWN0LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvY2Fycy9DYXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9jYXJzL0NhclNlcnZpY2UuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEs7QUFDbkIsbUJBQWE7QUFBQTs7QUFDWCxTQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0EsU0FBSyxPQUFMLEdBQWUsdUJBQWY7QUFDQSxTQUFLLElBQUwsR0FBWSxxQkFBVyxVQUFYLEVBQVo7QUFDRDs7OzsrQkFFUztBQUFBOztBQUNSLFdBQUssS0FBTCxHQUFhLFNBQVMsZ0JBQVQsQ0FBMEIsWUFBMUIsQ0FBYjtBQUNBLDZCQUFhLFVBQWIsQ0FBd0IsS0FBSyxLQUE3QjtBQUNBLFdBQUssT0FBTCxDQUFhLGtCQUFiLENBQWdDLEtBQUssS0FBckM7QUFDQSxXQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLFVBQUMsR0FBRCxFQUFRO0FBQ3hCLFlBQUksY0FBSixDQUFtQixNQUFLLEtBQXhCO0FBQ0QsT0FGRDtBQUdEOzs7Z0NBRVcsSyxFQUFNO0FBQ2hCLFdBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsS0FBbEI7QUFDQSxXQUFLLFFBQUw7QUFDRDs7O2lDQUVXO0FBQUE7O0FBQ1IsYUFBTyxPQUFPLFdBQVAsQ0FBbUIsWUFBSztBQUM3QixZQUFJLGdCQUFnQixPQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlC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TCxDQUFVLEdBQVY7QUFDSDtBQUNELFdBQU8sSUFBUDtBQUNILEdBN0JjOztBQStCZCxnQkFBYyxzQkFBQyxJQUFELEVBQVU7QUFDdkIsWUFBTyxJQUFQO0FBQ0UsV0FBSyxDQUFMO0FBQ0UsZUFBTyxFQUFQO0FBQ0E7QUFDRixXQUFLLENBQUw7QUFDRSxlQUFPLEVBQVA7QUFDQTtBQUNGLFdBQUssQ0FBTDtBQUNFLGVBQU8sQ0FBUDtBQUNBO0FBQ0YsV0FBSyxDQUFMO0FBQ0UsZUFBTyxDQUFQO0FBQ0E7QUFDRixXQUFLLENBQUw7QUFDRSxlQUFPLENBQVA7QUFDQTtBQUNGO0FBQ0U7QUFqQko7QUFtQkQsR0FuRGM7O0FBcURmLHFCQUFtQiwyQkFBQyxJQUFELEVBQVM7QUFDMUIsWUFBTyxJQUFQO0FBQ0UsV0FBSyxDQUFMO0FBQ0UsZUFBTyxPQUFQO0FBQ0E7QUFDRixXQUFLLENBQUw7QUFDRSxlQUFPLE1BQVA7QUFDQTtBQUNGLFdBQUssQ0FBTDtBQUNFLGVBQU8sT0FBUDtBQUNBO0FBQ0YsV0FBSyxDQUFMO0FBQ0UsZUFBTyxNQUFQO0FBQ0E7QUFDRixXQUFLLENBQUw7QUFDRSxlQUFPLE9BQVA7QUFDQTtBQUNGO0FBQ0U7QUFqQko7QUFtQkQ7QUF6RWMsQ0FBbkI7O2tCQTRFZSxVOzs7OztBQy9FZjs7Ozs7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBSztBQUNqRCxNQUFJLE9BQU8sb0JBQVg7QUFDQSxPQUFLLFNBQUw7QUFDRCxDQUhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBGcm9nZ2VyIGZyb20gJy4uL0Zyb2dnZXIuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi4vY2Fycy9DYXJTZXJ2aWNlLmpzJztcbmltcG9ydCBCb2FyZFNlcnZpY2UgZnJvbSAnLi9Cb2FyZFNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLmJvYXJkID0gbnVsbDtcbiAgICB0aGlzLmZyb2dnZXIgPSBuZXcgRnJvZ2dlcigpO1xuICAgIHRoaXMuY2FycyA9IENhclNlcnZpY2UuY3JlYXRlQ2FycygpO1xuICB9XG5cbiAgc2V0Qm9hcmQoKXtcbiAgICB0aGlzLmJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2JvYXJkIGRpdicpO1xuICAgIEJvYXJkU2VydmljZS5jbGVhckJvYXJkKHRoaXMuYm9hcmQpO1xuICAgIHRoaXMuZnJvZ2dlci5zZXRGcm9nZ2VyUG9zaXRpb24odGhpcy5ib2FyZCk7XG4gICAgdGhpcy5jYXJzLmZvckVhY2goKGNhcikgPT57XG4gICAgICBjYXIuc2V0Q2FyUG9zaXRpb24odGhpcy5ib2FyZCk7XG4gICAgfSk7XG4gIH1cblxuICBtb3ZlRnJvZ2dlcihldmVudCl7XG4gICAgdGhpcy5mcm9nZ2VyLm1vdmUoZXZlbnQpO1xuICAgIHRoaXMuc2V0Qm9hcmQoKTtcbiAgfVxuXG4gIHN0YXJ0Qm9hcmQoKXtcbiAgICAgIHJldHVybiB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT57XG4gICAgICAgIGxldCBmaXJzdExpbmVDYXJzID0gdGhpcy5jYXJzLmZpbHRlcigoY2FyKSA9PntcbiAgICAgICAgICByZXR1cm4gY2FyLmxpbmUgPT0gMTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKChjYXIpID0+e1xuICAgICAgICAgIGNhci5tb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldEJvYXJkKCk7XG4gICAgICB9LCAxMDAwKTsgLy8gVE9ETzogYWRkIHNwZWVkIGZ1bmN0aW9uYWxpdHlcbiAgfVxuXG59XG4iLCJjb25zdCBCb2FyZFNlcnZpY2UgPSB7XG5cbiAgY2xlYXJCb2FyZDogKGJvYXJkKSA9PiB7XG4gICAgYm9hcmQuZm9yRWFjaCgoZGl2KT0+e1xuICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgfSlcbiAgfSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQm9hcmRTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL01vdmluZ09iamVjdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb2dnZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbiwgbGl2ZXMpe1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5wb3NYID0gNztcbiAgICB0aGlzLnBvc1kgPSAxMjtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgdGhpcy5saXZlcyA9IDM7XG4gIH1cblxuICBzZXRGcm9nZ2VyUG9zaXRpb24oYm9hcmQpe1xuICAgIGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24odGhpcy5wb3NYLCB0aGlzLnBvc1kpXS5jbGFzc05hbWUgPSBcImZyb2dnZXJcIjtcbiAgfVxuXG4gIG1vdmUoZXZlbnQpe1xuICAgIHN3aXRjaChldmVudC53aGljaCl7XG4gICAgICBjYXNlIDM3OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgdGhpcy5wb3NYLS07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICB0aGlzLnBvc1ktLTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgIHRoaXMucG9zWCsrO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgICAgICB0aGlzLnBvc1krKztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9O1xuICB9XG5cbn1cbiIsImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkL0JvYXJkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZXtcbiAgY29uc3RydWN0b3IoKXtcbiAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XG4gIH1cblxuICBzdGFydEdhbWUoKXtcbiAgICBsZXQgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQnKTtcbiAgICBnZW5lcmF0ZURpdnMoYm9hcmQpO1xuICAgIHRoaXMuYm9hcmQuc2V0Qm9hcmQoKTtcbiAgICB0aGlzLmJvYXJkLnN0YXJ0Qm9hcmQoKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKCkgPT4gdGhpcy5ib2FyZC5tb3ZlRnJvZ2dlcihldmVudCkpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVEaXZzKGJvYXJkKXtcbiAgZm9yKGxldCBpID0gMDsgaSA8IDE4MjsgaSsrKXtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgcG9zWSwgZGlyZWN0aW9uKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgIHRoaXMucG9zWSA9IHBvc1k7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gIH1cblxuICBnZXRQb3NpdGlvbihwb3NYLCBwb3NZKXtcbiAgICAgIHJldHVybiBwb3NYICsgcG9zWSAqIDE0O1xuICB9XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuL0NhclNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG5cbiAgY29uc3RydWN0b3IocG9zWCwgbGluZSl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnBvc1kgPSBDYXJTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IENhclNlcnZpY2UuZ2VuZXJhdGVEaXJlY3Rpb24obGluZSk7XG4gICAgdGhpcy5zaXplID0gMTtcbiAgfVxuXG4gIHNldENhclBvc2l0aW9uKGJvYXJkKXtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKHRoaXMucG9zWCwgdGhpcy5wb3NZKV0uY2xhc3NOYW1lID0gXCJjYXJcIjtcbiAgfVxuXG4gIG1vdmUoKXtcbiAgICBzd2l0Y2godGhpcy5kaXJlY3Rpb24pe1xuICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgdGhpcy5wb3NYLS07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICB0aGlzLnBvc1grKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCBDYXIgZnJvbSAnLi9DYXIuanMnO1xuaW1wb3J0IEJvYXJkU2VydmljZSBmcm9tICcuLi9Cb2FyZC9Cb2FyZFNlcnZpY2UuanMnO1xuXG5jb25zdCBDYXJTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlQ2FyczogKCkgPT4ge1xuICAgICAgICBsZXQgY2FycyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDE1OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjYXIgPSBuZXcgQ2FyKHBvc1gsIGxpbmUpO1xuICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyAzO1xuICAgICAgICAgICAgaWYgKGkgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXJzLnB1c2goY2FyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FycztcbiAgICB9LFxuXG4gICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgIHN3aXRjaChsaW5lKXtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHJldHVybiAxMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHJldHVybiAxMDtcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgcmV0dXJuIDk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgIHJldHVybiA3O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZURpcmVjdGlvbjogKGxpbmUpID0+e1xuICAgICAgc3dpdGNoKGxpbmUpe1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhclNlcnZpY2U7XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0NvbXBvbmVudHMvR2FtZS5qcyc7IFxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT57XG4gIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgZ2FtZS5zdGFydEdhbWUoKTtcbn0pO1xuIl19
