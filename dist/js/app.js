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
      this.posX > 13 ? this.posX = 0 : false;
      this.posX < 0 ? this.posX = 13 : false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0Zyb2dnZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9HYW1lLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTW92aW5nT2JqZWN0LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvY2Fycy9DYXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9jYXJzL0NhclNlcnZpY2UuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEs7QUFDbkIsbUJBQWE7QUFBQTs7QUFDWCxTQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0EsU0FBSyxPQUFMLEdBQWUsdUJBQWY7QUFDQSxTQUFLLElBQUwsR0FBWSxxQkFBVyxVQUFYLEVBQVo7QUFDRDs7OzsrQkFFUztBQUFBOztBQUNSLFdBQUssS0FBTCxHQUFhLFNBQVMsZ0JBQVQsQ0FBMEIsWUFBMUIsQ0FBYjtBQUNBLDZCQUFhLFVBQWIsQ0FBd0IsS0FBSyxLQUE3QjtBQUNBLFdBQUssT0FBTCxDQUFhLGtCQUFiLENBQWdDLEtBQUssS0FBckM7QUFDQSxXQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLFVBQUMsR0FBRCxFQUFRO0FBQ3hCLFlBQUksY0FBSixDQUFtQixNQUFLLEtBQXhCO0FBQ0QsT0FGRDtBQUdEOzs7Z0NBRVcsSyxFQUFNO0FBQ2hCLFdBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsS0FBbEI7QUFDQSxXQUFLLFFBQUw7QUFDRDs7O2lDQUVXO0FBQ1YsV0FBSSxJQUFJLElBQUksQ0FBUixFQUFXLFFBQVEsSUFBdkIsRUFBNkIsS0FBSyxDQUFsQyxFQUFxQyxHQUFyQyxFQUF5QztBQUN2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TDtBQUNFLGVBQU8sT0FBUDtBQUNBO0FBQ0Y7QUFDRTtBQWpCSjtBQW1CRDtBQXpFYyxDQUFuQjs7a0JBNEVlLFU7Ozs7O0FDL0VmOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFLO0FBQ2pELE1BQUksT0FBTyxvQkFBWDtBQUNBLE9BQUssU0FBTDtBQUNELENBSEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEZyb2dnZXIgZnJvbSAnLi4vRnJvZ2dlci5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuLi9jYXJzL0NhclNlcnZpY2UuanMnO1xuaW1wb3J0IEJvYXJkU2VydmljZSBmcm9tICcuL0JvYXJkU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJke1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuYm9hcmQgPSBudWxsO1xuICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKCk7XG4gICAgdGhpcy5jYXJzID0gQ2FyU2VydmljZS5jcmVhdGVDYXJzKCk7XG4gIH1cblxuICBzZXRCb2FyZCgpe1xuICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYm9hcmQgZGl2Jyk7XG4gICAgQm9hcmRTZXJ2aWNlLmNsZWFyQm9hcmQodGhpcy5ib2FyZCk7XG4gICAgdGhpcy5mcm9nZ2VyLnNldEZyb2dnZXJQb3NpdGlvbih0aGlzLmJvYXJkKTtcbiAgICB0aGlzLmNhcnMuZm9yRWFjaCgoY2FyKSA9PntcbiAgICAgIGNhci5zZXRDYXJQb3NpdGlvbih0aGlzLmJvYXJkKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmVGcm9nZ2VyKGV2ZW50KXtcbiAgICB0aGlzLmZyb2dnZXIubW92ZShldmVudCk7XG4gICAgdGhpcy5zZXRCb2FyZCgpO1xuICB9XG5cbiAgc3RhcnRCb2FyZCgpe1xuICAgIGZvcihsZXQgaSA9IDEsIHNwZWVkID0gMTEwMDsgaSA8PSA1OyBpKyspe1xuICAgICAgQm9hcmRTZXJ2aWNlLnN0YXJ0Q2FyTGluZSh0aGlzLCB0aGlzLmNhcnMsIGksIHNwZWVkKTtcbiAgICAgIHNwZWVkID0gc3BlZWQgLSAxMDA7XG4gICAgICBpID4gNCA/IHNwZWVkID0gMTEwMCA6IGZhbHNlO1xuICAgIH1cbiAgfVxuXG59XG4iLCJjb25zdCBCb2FyZFNlcnZpY2UgPSB7XG5cbiAgY2xlYXJCb2FyZDogKGJvYXJkKSA9PiB7XG4gICAgYm9hcmQuZm9yRWFjaCgoZGl2KT0+e1xuICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgfSlcbiAgfSxcblxuICBzdGFydENhckxpbmU6IChCb2FyZCwgY2FycywgbGluZSwgc3BlZWQgPSAxMDAwKSA9PntcbiAgICByZXR1cm4gd2luZG93LnNldEludGVydmFsKCgpID0+e1xuICAgICAgbGV0IGZpbHRlcmVkTGluZSA9IGNhcnMuZmlsdGVyKChjYXIpID0+e1xuICAgICAgICByZXR1cm4gY2FyLmxpbmUgPT0gbGluZTtcbiAgICAgIH0pO1xuICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKGNhcikgPT57XG4gICAgICAgIGNhci5tb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgIEJvYXJkLnNldEJvYXJkKCk7XG4gICAgfSwgc3BlZWQpOyAvLyBUT0RPOiBhZGQgc3BlZWQgZnVuY3Rpb25hbGl0eVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBCb2FyZFNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vTW92aW5nT2JqZWN0LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJvZ2dlciBleHRlbmRzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBsaXZlcyl7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnBvc1ggPSA3O1xuICAgIHRoaXMucG9zWSA9IDEyO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICB0aGlzLmxpdmVzID0gMztcbiAgfVxuXG4gIHNldEZyb2dnZXJQb3NpdGlvbihib2FyZCl7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbih0aGlzLnBvc1gsIHRoaXMucG9zWSldLmNsYXNzTmFtZSA9IFwiZnJvZ2dlclwiO1xuICB9XG5cbiAgbW92ZShldmVudCl7XG4gICAgc3dpdGNoKGV2ZW50LndoaWNoKXtcbiAgICAgIGNhc2UgMzc6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICB0aGlzLnBvc1gtLTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM4OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgICAgIHRoaXMucG9zWS0tO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgdGhpcy5wb3NYKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnZG93bic7XG4gICAgICAgIHRoaXMucG9zWSsrO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH07XG4gIH1cblxufVxuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQvQm9hcmQuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1le1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgfVxuXG4gIHN0YXJ0R2FtZSgpe1xuICAgIGxldCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpO1xuICAgIGdlbmVyYXRlRGl2cyhib2FyZCk7XG4gICAgdGhpcy5ib2FyZC5zZXRCb2FyZCgpO1xuICAgIHRoaXMuYm9hcmQuc3RhcnRCb2FyZCgpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoKSA9PiB0aGlzLmJvYXJkLm1vdmVGcm9nZ2VyKGV2ZW50KSk7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZURpdnMoYm9hcmQpe1xuICBmb3IobGV0IGkgPSAwOyBpIDwgMTgyOyBpKyspe1xuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBib2FyZC5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24pe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKHBvc1gsIHBvc1kpe1xuICAgICAgcmV0dXJuIHBvc1ggKyBwb3NZICogMTQ7XG4gIH1cbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4vQ2FyU2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhciBleHRlbmRzIE1vdmluZ09iamVjdHtcblxuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gQ2FyU2VydmljZS5nZW5lcmF0ZURpcmVjdGlvbihsaW5lKTtcbiAgICB0aGlzLnNpemUgPSAxO1xuICB9XG5cbiAgc2V0Q2FyUG9zaXRpb24oYm9hcmQpe1xuICAgIHRoaXMucG9zWCA+IDEzID8gdGhpcy5wb3NYID0gMCA6IGZhbHNlO1xuICAgIHRoaXMucG9zWCA8IDAgPyB0aGlzLnBvc1ggPSAxMyA6IGZhbHNlO1xuICAgIGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24odGhpcy5wb3NYLCB0aGlzLnBvc1kpXS5jbGFzc05hbWUgPSBcImNhclwiO1xuICB9XG5cbiAgbW92ZSgpe1xuICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbil7XG4gICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICB0aGlzLnBvc1gtLTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIHRoaXMucG9zWCsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IENhciBmcm9tICcuL0Nhci5qcyc7XG5pbXBvcnQgQm9hcmRTZXJ2aWNlIGZyb20gJy4uL0JvYXJkL0JvYXJkU2VydmljZS5qcyc7XG5cbmNvbnN0IENhclNlcnZpY2UgPSB7XG5cbiAgICBjcmVhdGVDYXJzOiAoKSA9PiB7XG4gICAgICAgIGxldCBjYXJzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDA7IGkgPD0gMTU7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICBwb3NYID0gcG9zWCArIDM7XG4gICAgICAgICAgICBpZiAoaSAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDY7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhcnMucHVzaChjYXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYXJzO1xuICAgIH0sXG5cbiAgICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgc3dpdGNoKGxpbmUpe1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgcmV0dXJuIDExO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgcmV0dXJuIDEwO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICByZXR1cm4gOTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHJldHVybiA4O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgcmV0dXJuIDc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlRGlyZWN0aW9uOiAobGluZSkgPT57XG4gICAgICBzd2l0Y2gobGluZSl7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyU2VydmljZTtcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vQ29tcG9uZW50cy9HYW1lLmpzJzsgXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PntcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xufSk7XG4iXX0=
