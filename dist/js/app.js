(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Game = require('./classes/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./classes/Game.js":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Frogger = require('./Frogger.js');

var _Frogger2 = _interopRequireDefault(_Frogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.board = null;
    this.frogger = new _Frogger2.default();
  }

  _createClass(Board, [{
    key: 'setBoard',
    value: function setBoard() {
      var board = document.getElementById('board');
      generateDivs(board);
      this.board = document.querySelectorAll('#board div');
      this.frogger.setFroggerPosition(this.board, this.frogger);
      document.addEventListener('keydown', this.frogger.move);
    }
  }]);

  return Board;
}();

exports.default = Board;


function generateDivs(board) {
  for (var i = 0; i < 182; i++) {
    var div = document.createElement('div');
    board.appendChild(div);
  }
}

},{"./Frogger.js":3}],3:[function(require,module,exports){
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

    var _this = _possibleConstructorReturn(this, (Frogger.__proto__ || Object.getPrototypeOf(Frogger)).call(this, posX, posY, direction));

    _this.posX = 7;
    _this.posY = 12;
    _this.direction = 'up';
    _this.lives = 3;
    return _this;
  }

  _createClass(Frogger, [{
    key: 'setFroggerPosition',
    value: function setFroggerPosition(board, frogger) {
      board[this.getPosition(frogger.posX, frogger.posY)].className = "frogger";
    }
  }, {
    key: 'move',
    value: function move() {
      console.log('moved');
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
      console.log('game started');
      this.board.setBoard();
    }
  }]);

  return Game;
}();

exports.default = Game;

},{"./Board.js":2}],5:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NsYXNzZXMvQm9hcmQuanMiLCJzcmMvanMvY2xhc3Nlcy9Gcm9nZ2VyLmpzIiwic3JjL2pzL2NsYXNzZXMvR2FtZS5qcyIsInNyYy9qcy9jbGFzc2VzL01vdmluZ09iamVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQUs7QUFDakQsTUFBSSxPQUFPLG9CQUFYO0FBQ0EsT0FBSyxTQUFMO0FBQ0QsQ0FIRDs7Ozs7Ozs7Ozs7QUNGQTs7Ozs7Ozs7SUFFcUIsSztBQUNuQixtQkFBYTtBQUFBOztBQUNYLFNBQUssS0FBTCxHQUFhLElBQWI7QUFDQSxTQUFLLE9BQUwsR0FBZSx1QkFBZjtBQUNEOzs7OytCQUVTO0FBQ1IsVUFBSSxRQUFRLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFaO0FBQ0EsbUJBQWEsS0FBYjtBQUNBLFdBQUssS0FBTCxHQUFhLFNBQVMsZ0JBQVQsQ0FBMEIsWUFBMUIsQ0FBYjtBQUNBLFdBQUssT0FBTCxDQUFhLGtCQUFiLENBQWdDLEtBQUssS0FBckMsRUFBNEMsS0FBSyxPQUFqRDtBQUNBLGVBQVMsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBcUMsS0FBSyxPQUFMLENBQWEsSUFBbEQ7QUFDRDs7Ozs7O2tCQVprQixLOzs7QUFnQnJCLFNBQVMsWUFBVCxDQUFzQixLQUF0QixFQUE0QjtBQUMxQixPQUFJLElBQUksSUFBSSxDQUFaLEVBQWUsSUFBSSxHQUFuQixFQUF3QixHQUF4QixFQUE0QjtBQUMxQixRQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVY7QUFDQSxVQUFNLFdBQU4sQ0FBa0IsR0FBbEI7QUFDRDtBQUNGOzs7Ozs7Ozs7OztBQ3ZCRDs7Ozs7Ozs7Ozs7O0lBRXFCLE87OztBQUNuQixtQkFBWSxJQUFaLEVBQWtCLElBQWxCLEVBQXdCLFNBQXhCLEVBQW1DLEtBQW5DLEVBQXlDO0FBQUE7O0FBQUEsa0hBQ2pDLElBRGlDLEVBQzNCLElBRDJCLEVBQ3JCLFNBRHFCOztBQUV2QyxVQUFLLElBQUwsR0FBWSxDQUFaO0FBQ0EsVUFBSyxJQUFMLEdBQVksRUFBWjtBQUNBLFVBQUssU0FBTCxHQUFpQixJQUFqQjtBQUNBLFVBQUssS0FBTCxHQUFhLENBQWI7QUFMdUM7QUFNeEM7Ozs7dUNBRWtCLEssRUFBTyxPLEVBQVE7QUFDaEMsWUFBTSxLQUFLLFdBQUwsQ0FBaUIsUUFBUSxJQUF6QixFQUErQixRQUFRLElBQXZDLENBQU4sRUFBb0QsU0FBcEQsR0FBZ0UsU0FBaEU7QUFDRDs7OzJCQUVLO0FBQ0osY0FBUSxHQUFSLENBQVksT0FBWjtBQUNEOzs7Ozs7a0JBZmtCLE87Ozs7Ozs7Ozs7O0FDRnJCOzs7Ozs7OztJQUVxQixJO0FBQ25CLGtCQUFhO0FBQUE7O0FBQ1gsU0FBSyxLQUFMLEdBQWEscUJBQWI7QUFDRDs7OztnQ0FFVTtBQUNULGNBQVEsR0FBUixDQUFZLGNBQVo7QUFDQSxXQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ0Q7Ozs7OztrQkFSa0IsSTs7Ozs7Ozs7Ozs7OztJQ0ZBLFk7QUFDbkIsd0JBQVksSUFBWixFQUFrQixJQUFsQixFQUF3QixTQUF4QixFQUFrQztBQUFBOztBQUNoQyxTQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNEOzs7O2dDQUVXLEksRUFBTSxJLEVBQUs7QUFDbkIsYUFBTyxPQUFPLE9BQU8sRUFBckI7QUFDSDs7Ozs7O2tCQVRrQixZIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBHYW1lIGZyb20gJy4vY2xhc3Nlcy9HYW1lLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+e1xuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG59KTtcbiIsImltcG9ydCBGcm9nZ2VyIGZyb20gJy4vRnJvZ2dlci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJke1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuYm9hcmQgPSBudWxsO1xuICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKCk7XG4gIH1cblxuICBzZXRCb2FyZCgpe1xuICAgIGxldCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpO1xuICAgIGdlbmVyYXRlRGl2cyhib2FyZCk7XG4gICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNib2FyZCBkaXYnKTtcbiAgICB0aGlzLmZyb2dnZXIuc2V0RnJvZ2dlclBvc2l0aW9uKHRoaXMuYm9hcmQsIHRoaXMuZnJvZ2dlcik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuZnJvZ2dlci5tb3ZlKTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRGl2cyhib2FyZCl7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCAxODI7IGkrKyl7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvYXJkLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9Nb3ZpbmdPYmplY3QuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9nZ2VyIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIGxpdmVzKXtcbiAgICBzdXBlcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24pO1xuICAgIHRoaXMucG9zWCA9IDc7XG4gICAgdGhpcy5wb3NZID0gMTI7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgIHRoaXMubGl2ZXMgPSAzO1xuICB9XG5cbiAgc2V0RnJvZ2dlclBvc2l0aW9uKGJvYXJkLCBmcm9nZ2VyKXtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKGZyb2dnZXIucG9zWCwgZnJvZ2dlci5wb3NZKV0uY2xhc3NOYW1lID0gXCJmcm9nZ2VyXCI7XG4gIH1cblxuICBtb3ZlKCl7XG4gICAgY29uc29sZS5sb2coJ21vdmVkJyk7XG4gIH1cblxufVxuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1le1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgfVxuXG4gIHN0YXJ0R2FtZSgpe1xuICAgIGNvbnNvbGUubG9nKCdnYW1lIHN0YXJ0ZWQnKTtcbiAgICB0aGlzLmJvYXJkLnNldEJvYXJkKCk7XG4gIH1cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24pe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKHBvc1gsIHBvc1kpe1xuICAgICAgcmV0dXJuIHBvc1ggKyBwb3NZICogMTQ7XG4gIH1cbn1cbiJdfQ==
