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
      this.board = document.querySelectorAll('#board div');
      clearBoard(this.board);
      this.frogger.setFroggerPosition(this.board, this.frogger);
    }
  }, {
    key: 'move',
    value: function move(event) {
      switch (event.which) {
        case 37:
          this.frogger.direction = 'left';
          this.frogger.posX--;
          break;
        case 38:
          this.frogger.direction = 'up';
          this.frogger.posY--;
          break;
        case 39:
          this.frogger.direction = 'right';
          this.frogger.posX++;
          break;
        case 40:
          this.frogger.direction = 'down';
          this.frogger.posY++;
          break;
        default:
          break;
      };
      this.setBoard();
    }
  }]);

  return Board;
}();

exports.default = Board;


function clearBoard(board) {
  board.forEach(function (div) {
    div.className = "";
  });
};

},{"./Frogger.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MovingObject2 = require('./MovingObject.js');

var _MovingObject3 = _interopRequireDefault(_MovingObject2);

var _Board = require('./Board.js');

var _Board2 = _interopRequireDefault(_Board);

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
  }]);

  return Frogger;
}(_MovingObject3.default);

exports.default = Frogger;

},{"./Board.js":2,"./MovingObject.js":5}],4:[function(require,module,exports){
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
        return _this.board.move(event);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NsYXNzZXMvQm9hcmQuanMiLCJzcmMvanMvY2xhc3Nlcy9Gcm9nZ2VyLmpzIiwic3JjL2pzL2NsYXNzZXMvR2FtZS5qcyIsInNyYy9qcy9jbGFzc2VzL01vdmluZ09iamVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQUs7QUFDakQsTUFBSSxPQUFPLG9CQUFYO0FBQ0EsT0FBSyxTQUFMO0FBQ0QsQ0FIRDs7Ozs7Ozs7Ozs7QUNGQTs7Ozs7Ozs7SUFFcUIsSztBQUNuQixtQkFBYTtBQUFBOztBQUNYLFNBQUssS0FBTCxHQUFhLElBQWI7QUFDQSxTQUFLLE9BQUwsR0FBZSx1QkFBZjtBQUNEOzs7OytCQUVTO0FBQ1IsV0FBSyxLQUFMLEdBQWEsU0FBUyxnQkFBVCxDQUEwQixZQUExQixDQUFiO0FBQ0EsaUJBQVcsS0FBSyxLQUFoQjtBQUNBLFdBQUssT0FBTCxDQUFhLGtCQUFiLENBQWdDLEtBQUssS0FBckMsRUFBNEMsS0FBSyxPQUFqRDtBQUNEOzs7eUJBRUksSyxFQUFNO0FBQ1QsY0FBTyxNQUFNLEtBQWI7QUFDRSxhQUFLLEVBQUw7QUFDRSxlQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLE1BQXpCO0FBQ0EsZUFBSyxPQUFMLENBQWEsSUFBYjtBQUNBO0FBQ0YsYUFBSyxFQUFMO0FBQ0UsZUFBSyxPQUFMLENBQWEsU0FBYixHQUF5QixJQUF6QjtBQUNBLGVBQUssT0FBTCxDQUFhLElBQWI7QUFDQTtBQUNGLGFBQUssRUFBTDtBQUNFLGVBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsT0FBekI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxJQUFiO0FBQ0E7QUFDRixhQUFLLEVBQUw7QUFDRSxlQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLE1BQXpCO0FBQ0EsZUFBSyxPQUFMLENBQWEsSUFBYjtBQUNBO0FBQ0Y7QUFDRTtBQWxCSixPQW1CQztBQUNELFdBQUssUUFBTDtBQUNEOzs7Ozs7a0JBbENrQixLOzs7QUFzQ3JCLFNBQVMsVUFBVCxDQUFvQixLQUFwQixFQUEwQjtBQUN4QixRQUFNLE9BQU4sQ0FBYyxVQUFDLEdBQUQsRUFBTztBQUNuQixRQUFJLFNBQUosR0FBZ0IsRUFBaEI7QUFDRCxHQUZEO0FBR0Q7Ozs7Ozs7Ozs7O0FDNUNEOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixPOzs7QUFDbkIsbUJBQVksSUFBWixFQUFrQixJQUFsQixFQUF3QixTQUF4QixFQUFtQyxLQUFuQyxFQUF5QztBQUFBOztBQUFBLGtIQUNqQyxJQURpQyxFQUMzQixJQUQyQixFQUNyQixTQURxQjs7QUFFdkMsVUFBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLFVBQUssSUFBTCxHQUFZLEVBQVo7QUFDQSxVQUFLLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxVQUFLLEtBQUwsR0FBYSxDQUFiO0FBTHVDO0FBTXhDOzs7O3VDQUVrQixLLEVBQU8sTyxFQUFRO0FBQ2hDLFlBQU0sS0FBSyxXQUFMLENBQWlCLFFBQVEsSUFBekIsRUFBK0IsUUFBUSxJQUF2QyxDQUFOLEVBQW9ELFNBQXBELEdBQWdFLFNBQWhFO0FBQ0Q7Ozs7OztrQkFYa0IsTzs7Ozs7Ozs7Ozs7QUNIckI7Ozs7Ozs7O0lBRXFCLEk7QUFDbkIsa0JBQWE7QUFBQTs7QUFDWCxTQUFLLEtBQUwsR0FBYSxxQkFBYjtBQUNEOzs7O2dDQUVVO0FBQUE7O0FBQ1QsVUFBSSxRQUFRLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFaO0FBQ0EsbUJBQWEsS0FBYjtBQUNBLFdBQUssS0FBTCxDQUFXLFFBQVg7QUFDQSxlQUFTLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDO0FBQUEsZUFBTSxNQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLEtBQWhCLENBQU47QUFBQSxPQUFyQztBQUNEOzs7Ozs7a0JBVmtCLEk7OztBQWNyQixTQUFTLFlBQVQsQ0FBc0IsS0FBdEIsRUFBNEI7QUFDMUIsT0FBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksR0FBbkIsRUFBd0IsR0FBeEIsRUFBNEI7QUFDMUIsUUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0EsVUFBTSxXQUFOLENBQWtCLEdBQWxCO0FBQ0Q7QUFDRjs7Ozs7Ozs7Ozs7OztJQ3JCb0IsWTtBQUNuQix3QkFBWSxJQUFaLEVBQWtCLElBQWxCLEVBQXdCLFNBQXhCLEVBQWtDO0FBQUE7O0FBQ2hDLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLFNBQWpCO0FBQ0Q7Ozs7Z0NBRVcsSSxFQUFNLEksRUFBSztBQUNuQixhQUFPLE9BQU8sT0FBTyxFQUFyQjtBQUNIOzs7Ozs7a0JBVGtCLFkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9jbGFzc2VzL0dhbWUuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT57XG4gIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgZ2FtZS5zdGFydEdhbWUoKTtcbn0pO1xuIiwiaW1wb3J0IEZyb2dnZXIgZnJvbSAnLi9Gcm9nZ2VyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmR7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5ib2FyZCA9IG51bGw7XG4gICAgdGhpcy5mcm9nZ2VyID0gbmV3IEZyb2dnZXIoKTtcbiAgfVxuXG4gIHNldEJvYXJkKCl7XG4gICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNib2FyZCBkaXYnKTtcbiAgICBjbGVhckJvYXJkKHRoaXMuYm9hcmQpO1xuICAgIHRoaXMuZnJvZ2dlci5zZXRGcm9nZ2VyUG9zaXRpb24odGhpcy5ib2FyZCwgdGhpcy5mcm9nZ2VyKTtcbiAgfVxuXG4gIG1vdmUoZXZlbnQpe1xuICAgIHN3aXRjaChldmVudC53aGljaCl7XG4gICAgICBjYXNlIDM3OlxuICAgICAgICB0aGlzLmZyb2dnZXIuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICB0aGlzLmZyb2dnZXIucG9zWC0tO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIHRoaXMuZnJvZ2dlci5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICB0aGlzLmZyb2dnZXIucG9zWS0tO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6XG4gICAgICAgIHRoaXMuZnJvZ2dlci5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICB0aGlzLmZyb2dnZXIucG9zWCsrO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA6XG4gICAgICAgIHRoaXMuZnJvZ2dlci5kaXJlY3Rpb24gPSAnZG93bic7XG4gICAgICAgIHRoaXMuZnJvZ2dlci5wb3NZKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfTtcbiAgICB0aGlzLnNldEJvYXJkKCk7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBjbGVhckJvYXJkKGJvYXJkKXtcbiAgYm9hcmQuZm9yRWFjaCgoZGl2KT0+e1xuICAgIGRpdi5jbGFzc05hbWUgPSBcIlwiO1xuICB9KVxufTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9nZ2VyIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIGxpdmVzKXtcbiAgICBzdXBlcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24pO1xuICAgIHRoaXMucG9zWCA9IDc7XG4gICAgdGhpcy5wb3NZID0gMTI7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgIHRoaXMubGl2ZXMgPSAzO1xuICB9XG5cbiAgc2V0RnJvZ2dlclBvc2l0aW9uKGJvYXJkLCBmcm9nZ2VyKXtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKGZyb2dnZXIucG9zWCwgZnJvZ2dlci5wb3NZKV0uY2xhc3NOYW1lID0gXCJmcm9nZ2VyXCI7XG4gIH1cblxufVxuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1le1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgfVxuXG4gIHN0YXJ0R2FtZSgpe1xuICAgIGxldCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpO1xuICAgIGdlbmVyYXRlRGl2cyhib2FyZCk7XG4gICAgdGhpcy5ib2FyZC5zZXRCb2FyZCgpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoKSA9PiB0aGlzLmJvYXJkLm1vdmUoZXZlbnQpKTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRGl2cyhib2FyZCl7XG4gIGZvcihsZXQgaSA9IDA7IGkgPCAxODI7IGkrKyl7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvYXJkLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbil7XG4gICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICB0aGlzLnBvc1kgPSBwb3NZO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24ocG9zWCwgcG9zWSl7XG4gICAgICByZXR1cm4gcG9zWCArIHBvc1kgKiAxNDtcbiAgfVxufVxuIl19
