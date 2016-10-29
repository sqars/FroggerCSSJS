(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Game = require('./classes/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./classes/Game.js":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Frogger = require('./Frogger.js');

var _Frogger2 = _interopRequireDefault(_Frogger);

var _Car = require('./Car.js');

var _Car2 = _interopRequireDefault(_Car);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.board = null;
    this.frogger = new _Frogger2.default();
    this.cars = createCars();
  }

  _createClass(Board, [{
    key: 'setBoard',
    value: function setBoard() {
      var _this = this;

      this.board = document.querySelectorAll('#board div');
      clearBoard(this.board);
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
    key: 'moveCar',
    value: function moveCar() {}
  }]);

  return Board;
}();

exports.default = Board;


function clearBoard(board) {
  board.forEach(function (div) {
    div.className = "";
  });
};

function createCars() {
  var cars = [];
  for (var i = 1, line = 1, posX = 0; i <= 25; i++) {
    var car = new _Car2.default(posX, line);
    posX = posX + 2;
    if (i % 5 == 0) {
      line++;
      switch (line) {
        case 2:
          posX = 5;
          break;
        case 3:
          posX = 0;
          break;
        case 4:
          posX = 5;
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
}

},{"./Car.js":3,"./Frogger.js":4}],3:[function(require,module,exports){
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

var Car = function (_MovingObject) {
  _inherits(Car, _MovingObject);

  function Car(posX, line) {
    _classCallCheck(this, Car);

    var _this = _possibleConstructorReturn(this, (Car.__proto__ || Object.getPrototypeOf(Car)).call(this, posX));

    _this.posY = generateYPos(line);
    _this.direction = generateDirection(line);
    _this.size = 1;
    return _this;
  }

  _createClass(Car, [{
    key: 'setCarPosition',
    value: function setCarPosition(board) {
      board[this.getPosition(this.posX, this.posY)].className = "car";
    }
  }]);

  return Car;
}(_MovingObject3.default);

exports.default = Car;


function generateYPos(line) {
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
};

function generateDirection(line) {
  switch (line) {
    case 1:
      return 'left';
      break;
    case 2:
      return 'right';
      break;
    case 3:
      return 'left';
      break;
    case 4:
      return 'right';
      break;
    case 5:
      return 'left';
      break;
    default:
      break;
  }
}

},{"./MovingObject.js":6}],4:[function(require,module,exports){
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

},{"./MovingObject.js":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Board = require('./Board.js');

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

},{"./Board.js":2}],6:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NsYXNzZXMvQm9hcmQuanMiLCJzcmMvanMvY2xhc3Nlcy9DYXIuanMiLCJzcmMvanMvY2xhc3Nlcy9Gcm9nZ2VyLmpzIiwic3JjL2pzL2NsYXNzZXMvR2FtZS5qcyIsInNyYy9qcy9jbGFzc2VzL01vdmluZ09iamVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQUs7QUFDakQsTUFBSSxPQUFPLG9CQUFYO0FBQ0EsT0FBSyxTQUFMO0FBQ0QsQ0FIRDs7Ozs7Ozs7Ozs7QUNGQTs7OztBQUNBOzs7Ozs7OztJQUVxQixLO0FBQ25CLG1CQUFhO0FBQUE7O0FBQ1gsU0FBSyxLQUFMLEdBQWEsSUFBYjtBQUNBLFNBQUssT0FBTCxHQUFlLHVCQUFmO0FBQ0EsU0FBSyxJQUFMLEdBQVksWUFBWjtBQUNEOzs7OytCQUVTO0FBQUE7O0FBQ1IsV0FBSyxLQUFMLEdBQWEsU0FBUyxnQkFBVCxDQUEwQixZQUExQixDQUFiO0FBQ0EsaUJBQVcsS0FBSyxLQUFoQjtBQUNBLFdBQUssT0FBTCxDQUFhLGtCQUFiLENBQWdDLEtBQUssS0FBckM7QUFDQSxXQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLFVBQUMsR0FBRCxFQUFRO0FBQ3hCLFlBQUksY0FBSixDQUFtQixNQUFLLEtBQXhCO0FBQ0QsT0FGRDtBQUdEOzs7Z0NBRVcsSyxFQUFNO0FBQ2hCLFdBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsS0FBbEI7QUFDQSxXQUFLLFFBQUw7QUFDRDs7OzhCQUVRLENBRVI7Ozs7OztrQkF2QmtCLEs7OztBQTJCckIsU0FBUyxVQUFULENBQW9CLEtBQXBCLEVBQTBCO0FBQ3hCLFFBQU0sT0FBTixDQUFjLFVBQUMsR0FBRCxFQUFPO0FBQ25CLFFBQUksU0FBSixHQUFnQixF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Y2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBHYW1lIGZyb20gJy4vY2xhc3Nlcy9HYW1lLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+e1xuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG59KTtcbiIsImltcG9ydCBGcm9nZ2VyIGZyb20gJy4vRnJvZ2dlci5qcyc7XG5pbXBvcnQgQ2FyIGZyb20gJy4vQ2FyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmR7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5ib2FyZCA9IG51bGw7XG4gICAgdGhpcy5mcm9nZ2VyID0gbmV3IEZyb2dnZXIoKTtcbiAgICB0aGlzLmNhcnMgPSBjcmVhdGVDYXJzKCk7XG4gIH1cblxuICBzZXRCb2FyZCgpe1xuICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYm9hcmQgZGl2Jyk7XG4gICAgY2xlYXJCb2FyZCh0aGlzLmJvYXJkKTtcbiAgICB0aGlzLmZyb2dnZXIuc2V0RnJvZ2dlclBvc2l0aW9uKHRoaXMuYm9hcmQpO1xuICAgIHRoaXMuY2Fycy5mb3JFYWNoKChjYXIpID0+e1xuICAgICAgY2FyLnNldENhclBvc2l0aW9uKHRoaXMuYm9hcmQpO1xuICAgIH0pO1xuICB9XG5cbiAgbW92ZUZyb2dnZXIoZXZlbnQpe1xuICAgIHRoaXMuZnJvZ2dlci5tb3ZlKGV2ZW50KTtcbiAgICB0aGlzLnNldEJvYXJkKCk7XG4gIH1cblxuICBtb3ZlQ2FyKCl7XG5cbiAgfVxuXG59XG5cbmZ1bmN0aW9uIGNsZWFyQm9hcmQoYm9hcmQpe1xuICBib2FyZC5mb3JFYWNoKChkaXYpPT57XG4gICAgZGl2LmNsYXNzTmFtZSA9IFwiXCI7XG4gIH0pXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDYXJzKCl7XG4gIGxldCBjYXJzID0gW107XG4gIGZvcihsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSAyNTsgaSsrKXtcbiAgICBsZXQgY2FyID0gbmV3IENhcihwb3NYLCBsaW5lKTtcbiAgICBwb3NYID0gcG9zWCArIDI7XG4gICAgaWYoaSAlIDUgPT0gMCl7XG4gICAgICBsaW5lKys7XG4gICAgICBzd2l0Y2gobGluZSl7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBwb3NYID0gNTtcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgcG9zWCA9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBwb3NYID0gNTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgIHBvc1ggPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG4gICAgY2Fycy5wdXNoKGNhcik7XG4gIH1cbiAgcmV0dXJuIGNhcnM7XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vTW92aW5nT2JqZWN0LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuXG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMucG9zWSA9IGdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGdlbmVyYXRlRGlyZWN0aW9uKGxpbmUpO1xuICAgIHRoaXMuc2l6ZSA9IDE7XG4gIH1cblxuICBzZXRDYXJQb3NpdGlvbihib2FyZCl7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbih0aGlzLnBvc1gsIHRoaXMucG9zWSldLmNsYXNzTmFtZSA9IFwiY2FyXCI7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVlQb3MobGluZSl7XG4gIHN3aXRjaChsaW5lKXtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gMTE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gMTA7XG4gICAgICBicmVha1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiA5O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA0OlxuICAgICAgcmV0dXJuIDg7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gNztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVEaXJlY3Rpb24obGluZSl7XG4gIHN3aXRjaChsaW5lKXtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICBicmVha1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQ6XG4gICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9Nb3ZpbmdPYmplY3QuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9nZ2VyIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIGxpdmVzKXtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucG9zWCA9IDc7XG4gICAgdGhpcy5wb3NZID0gMTI7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgIHRoaXMubGl2ZXMgPSAzO1xuICB9XG5cbiAgc2V0RnJvZ2dlclBvc2l0aW9uKGJvYXJkKXtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKHRoaXMucG9zWCwgdGhpcy5wb3NZKV0uY2xhc3NOYW1lID0gXCJmcm9nZ2VyXCI7XG4gIH1cblxuICBtb3ZlKGV2ZW50KXtcbiAgICBzd2l0Y2goZXZlbnQud2hpY2gpe1xuICAgICAgY2FzZSAzNzpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgIHRoaXMucG9zWC0tO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICAgICAgdGhpcy5wb3NZLS07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICB0aGlzLnBvc1grKztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwOlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdkb3duJztcbiAgICAgICAgdGhpcy5wb3NZKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWV7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICB9XG5cbiAgc3RhcnRHYW1lKCl7XG4gICAgbGV0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkJyk7XG4gICAgZ2VuZXJhdGVEaXZzKGJvYXJkKTtcbiAgICB0aGlzLmJvYXJkLnNldEJvYXJkKCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsICgpID0+IHRoaXMuYm9hcmQubW92ZUZyb2dnZXIoZXZlbnQpKTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRGl2cyhib2FyZCl7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCAxODI7IGkrKyl7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvYXJkLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbil7XG4gICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICB0aGlzLnBvc1kgPSBwb3NZO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24ocG9zWCwgcG9zWSl7XG4gICAgICByZXR1cm4gcG9zWCArIHBvc1kgKiAxNDtcbiAgfVxufVxuIl19
