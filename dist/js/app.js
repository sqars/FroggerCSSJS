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
            var _this = this;

            this.context.clearRect(0, 0, this.board.width, this.board.height);
            this.frogger.drawFrogger(this.context);
            this.froggerMoving ? this.moveFrogger() : false;
            this.cars.forEach(function (car) {
                return car.drawCar(_this.context);
            });
            this.cars.forEach(function (car) {
                return car.move(_this.cars);
            });
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

  function Car(posX, line, speed) {
    _classCallCheck(this, Car);

    var _this = _possibleConstructorReturn(this, (Car.__proto__ || Object.getPrototypeOf(Car)).call(this, posX));

    _this.line = line;
    _this.speed = speed;
    _this.height = 50;
    _this.width = _CarService2.default.generateWidth(line);
    _this.posY = _CarService2.default.generateYPos(line);
    _this.direction = _CarService2.default.generateDirection(line);
    return _this;
  }

  _createClass(Car, [{
    key: 'drawCar',
    value: function drawCar(ctx) {
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.strokeStyle = "red";
      ctx.stroke();
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

var CarService = {

    createCars: function createCars() {
        var cars = [];
        for (var i = 1, line = 1, posX = 0; i <= 15; i++) {
            var car = new _Car2.default(posX, line, 1);
            if (line === 5) {
                posX = posX + Math.random() * (400 - 150) + 150;
            } else {
                posX = posX + Math.random() * (300 - 100) + 100;
            }
            cars.push(car);
            if (i % 3 == 0) {
                line++;
                switch (line) {
                    case 2:
                        posX = 400;
                        break;
                    case 3:
                        posX = 150;
                        break;
                    case 4:
                        posX = 500;
                        break;
                    case 5:
                        posX = 300;
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
                return 550;
                break;
            case 2:
                return 500;
                break;
            case 3:
                return 450;
                break;
            case 4:
                return 400;
                break;
            case 5:
                return 350;
                break;
            default:
                break;
        }
    },

    generateWidth: function generateWidth(line) {
        switch (line) {
            case 5:
                return 150;
                break;
            default:
                return 50;
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
            ctx.rect(this.posX, this.posY, this.height, this.width);
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
  function MovingObject(posX, posY, direction, speed) {
    _classCallCheck(this, MovingObject);

    this.posX = posX;
    this.posY = posY;
    this.direction = direction;
    this.speed = speed;
  }

  _createClass(MovingObject, [{
    key: 'move',
    value: function move(objects) {
      var _this = this;

      switch (this.direction) {
        case 'left':
          if (this.posX < -50) {
            (function () {
              var max = 900;
              var min = 700;
              _this.posX = Math.random() * (max - min) + min;
              var filteredObjs = objects.filter(function (obj) {
                return obj.line === _this.line;
              });
              var index = filteredObjs.indexOf(_this);
              filteredObjs.splice(index, 1);
              filteredObjs.forEach(function (obj) {
                while (_this.posX >= obj.posX - obj.width - 50 && _this.posX <= obj.posX + obj.width + 50) {
                  console.log('this X', _this.posX, 'car X', obj.posX, 'car width', obj.posX + obj.width);
                  _this.posX = Math.random() * (max - min) + min;
                }
              });
            })();
          };
          this.posX -= this.speed;
          break;
        case 'right':
          if (this.posX > 750) {
            (function () {
              var max = -150;
              var min = -400;
              _this.posX = Math.random() * (max - min) + min;
              var filteredObjs = objects.filter(function (obj) {
                return obj.line === _this.line;
              });
              var index = filteredObjs.indexOf(_this);
              filteredObjs.splice(index, 1);
              filteredObjs.forEach(function (obj) {
                while (_this.posX >= obj.posX - obj.width - 50 && _this.posX <= obj.posX + obj.width + 50) {
                  console.log('this X', _this.posX, 'car X', obj.posX, 'car width', obj.posX + obj.width);
                  _this.posX = Math.random() * (max - min) + min;
                }
              });
            })();
          };
          this.posX += this.speed;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Nb3ZpbmdPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9TdGF0aWNPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9UdXJ0bGVzL1R1cnRsZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1dhdGVyL1dhdGVyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kU2VydmljZS5qcyIsInNyYy9qcy9FdmVudEVtaXR0ZXIuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEs7QUFDakIscUJBQWM7QUFBQTs7QUFDVixhQUFLLEtBQUwsR0FBYSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBYjtBQUNBLGFBQUssT0FBTCxHQUFlLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsSUFBdEIsQ0FBZjtBQUNBLGFBQUssT0FBTCxHQUFlLHNCQUFZLEtBQUssS0FBakIsQ0FBZjtBQUNBLGFBQUssYUFBTCxHQUFxQixL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LFNBQVosRUFBdUIsTUFBdkIsQ0FBOEI7QUFBQSxpQkFBVyxPQUFPLE9BQWxCO0FBQUEsU0FBOUIsQ0FBekI7QUFDRCxPQUZEO0FBR0Q7Ozt5QkFFSSxTLEVBQVcsSSxFQUFLO0FBQ25CLFVBQU0sUUFBUSxLQUFLLE1BQUwsQ0FBWSxTQUFaLENBQWQ7QUFDQSxVQUFHLEtBQUgsRUFBUztBQUNQLGNBQU0sT0FBTixDQUFjLGNBQUs7QUFDakIsYUFBRyxJQUFILENBQVEsSUFBUixFQUFjLElBQWQ7QUFDRCxTQUZEO0FBR0Q7QUFDRjs7Ozs7O2tCQXJCZ0IsWTs7Ozs7QUNBckI7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQUs7QUFDakQsTUFBSSxPQUFPLG9CQUFYO0FBQ0EsT0FBSyxTQUFMO0FBQ0QsQ0FIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRnJvZ2dlciBmcm9tICcuLi9Gcm9nZ2VyLmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4uL0NhcnMvQ2FyU2VydmljZS5qcyc7XG5pbXBvcnQgQm9hcmRTZXJ2aWNlIGZyb20gJy4vQm9hcmRTZXJ2aWNlLmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4uL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4uL1dhdGVyL1dhdGVyU2VydmljZS5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi4vV29vZC9Xb29kU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5ib2FyZC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKHRoaXMuYm9hcmQpO1xuICAgICAgICB0aGlzLmZyb2dnZXJNb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYXJzID0gQ2FyU2VydmljZS5jcmVhdGVDYXJzKCk7XG4gICAgfTtcblxuICAgIHNldEJvYXJkKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuYm9hcmQud2lkdGgsIHRoaXMuYm9hcmQuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyLmRyYXdGcm9nZ2VyKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuZnJvZ2dlck1vdmluZyA/IHRoaXMubW92ZUZyb2dnZXIoKSA6IGZhbHNlO1xuICAgICAgICB0aGlzLmNhcnMuZm9yRWFjaChjYXIgPT4gY2FyLmRyYXdDYXIodGhpcy5jb250ZXh0KSk7XG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIubW92ZSh0aGlzLmNhcnMpKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc2V0Qm9hcmQuYmluZCh0aGlzKSk7XG4gICAgfTtcblxuICAgIHNldEZyb2dnZXJNb3ZlKGV2ZW50KXtcbiAgICAgIGxldCBpc01vdmluZyA9IHRoaXMuZnJvZ2dlci5zZXREaXJlY3Rpb24oZXZlbnQpO1xuICAgICAgaXNNb3ZpbmcgPyB0aGlzLmZyb2dnZXJNb3ZpbmcgPSB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgbW92ZUZyb2dnZXIoKSB7XG4gICAgICB0aGlzLmZyb2dnZXJNb3ZpbmcgPSB0aGlzLmZyb2dnZXIubW92ZSh0aGlzLmZyb2dnZXIuZGlyZWN0aW9uKTtcbiAgICB9O1xuXG59XG4iLCJjb25zdCBCb2FyZFNlcnZpY2UgPSB7XG5cbiAgY2xlYXJCb2FyZDogKGJvYXJkKSA9PiB7XG4gICAgYm9hcmQuZm9yRWFjaCgoZGl2KT0+e1xuICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgfSlcbiAgfSxcblxuICBjaGVja0NvbGxpc2lvbihmcm9nZ2VyLCBlbGVtZW50cyl7XG4gICAgbGV0IGZyb2dnZXJQb3MgPSBmcm9nZ2VyLmdldFBvc2l0aW9uKCk7XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbSA9PiBlbGVtLmdldFBvc2l0aW9uKCkgPT09IGZyb2dnZXJQb3MgPyByZXN1bHQgPSBmcm9nZ2VyUG9zIDogZmFsc2UpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJvYXJkU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4vQ2FyU2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhciBleHRlbmRzIE1vdmluZ09iamVjdHtcblxuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lLCBzcGVlZCl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB0aGlzLndpZHRoID0gQ2FyU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpO1xuICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gQ2FyU2VydmljZS5nZW5lcmF0ZURpcmVjdGlvbihsaW5lKTtcbiAgfVxuXG4gIGRyYXdDYXIoY3R4KSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgucmVjdCh0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgQ2FyIGZyb20gJy4vQ2FyLmpzJztcblxuY29uc3QgQ2FyU2VydmljZSA9IHtcblxuICAgIGNyZWF0ZUNhcnM6ICgpID0+IHtcbiAgICAgICAgbGV0IGNhcnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSAxNTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2FyID0gbmV3IENhcihwb3NYLCBsaW5lLCAxKTtcbiAgICAgICAgICAgIGlmIChsaW5lID09PSA1KSB7XG4gICAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyBNYXRoLnJhbmRvbSgpICogKDQwMCAtIDE1MCkgKyAxNTA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgTWF0aC5yYW5kb20oKSAqICgzMDAgLSAxMDApICsgMTAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICBpZiAoaSAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDQwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSAxNTA7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDUwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gMzAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYXJzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiA1NTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA0NTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDQwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMzUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVEaXJlY3Rpb246IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9Nb3ZpbmdPYmplY3QuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9nZ2VyIGV4dGVuZHMgTW92aW5nT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCwgcG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBsaXZlcykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLndpZHRoID0gNTA7XG4gICAgICAgIHRoaXMucG9zWCA9IGJvYXJkLndpZHRoICogMC41O1xuICAgICAgICB0aGlzLnBvc1kgPSBib2FyZC5oZWlnaHQgLSB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICB0aGlzLmxpdmVzID0gMztcbiAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCA9IDA7XG4gICAgfTtcblxuICAgIGRyYXdGcm9nZ2VyKGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLmhlaWdodCwgdGhpcy53aWR0aCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBzZXREaXJlY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnZG93bic7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgbW92ZShkaXJlY3Rpb24pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYIC09IDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd1cCc6XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NZIC09IDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYICs9IDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1kgKz0gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQrKztcbiAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCA8IDI1ID8gcmVzdWx0ID0gdHJ1ZSA6IHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxufVxuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQvQm9hcmQuanMnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9FdmVudEVtaXR0ZXIuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICAgIH1cblxuICAgIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgdGhpcy5ib2FyZC5zZXRCb2FyZCgpO1xuICAgICAgICAvLyB0aGlzLmJvYXJkLnN0YXJ0Qm9hcmQoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsICgpID0+IHRoaXMuYm9hcmQuc2V0RnJvZ2dlck1vdmUoZXZlbnQpKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbiwgc3BlZWQpe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gIH1cblxuICBtb3ZlKG9iamVjdHMpe1xuICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbil7XG4gICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBpZih0aGlzLnBvc1ggPCAtNTApe1xuICAgICAgICAgICAgICBsZXQgbWF4ID0gOTAwO1xuICAgICAgICAgICAgICBsZXQgbWluID0gNzAwO1xuICAgICAgICAgICAgICB0aGlzLnBvc1ggPSBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG4gICAgICAgICAgICAgIGxldCBmaWx0ZXJlZE9ianMgPSBvYmplY3RzLmZpbHRlcihvYmogPT4gb2JqLmxpbmUgPT09IHRoaXMubGluZSk7XG4gICAgICAgICAgICAgIGxldCBpbmRleCA9IGZpbHRlcmVkT2Jqcy5pbmRleE9mKHRoaXMpO1xuICAgICAgICAgICAgICBmaWx0ZXJlZE9ianMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgZmlsdGVyZWRPYmpzLmZvckVhY2goKG9iaikgPT57XG4gICAgICAgICAgICAgICAgd2hpbGUodGhpcy5wb3NYID49IG9iai5wb3NYIC0gb2JqLndpZHRoIC0gNTAgJiYgdGhpcy5wb3NYIDw9IG9iai5wb3NYICsgb2JqLndpZHRoICsgNTApe1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMgWCcsIHRoaXMucG9zWCwgJ2NhciBYJywgb2JqLnBvc1gsICdjYXIgd2lkdGgnLCBvYmoucG9zWCArIG9iai53aWR0aCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnBvc1ggLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIGlmKHRoaXMucG9zWCA+IDc1MCl7XG4gICAgICAgICAgICAgIGxldCBtYXggPSAtMTUwO1xuICAgICAgICAgICAgICBsZXQgbWluID0gLTQwMDtcbiAgICAgICAgICAgICAgdGhpcy5wb3NYID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRPYmpzID0gb2JqZWN0cy5maWx0ZXIob2JqID0+IG9iai5saW5lID09PSB0aGlzLmxpbmUpO1xuICAgICAgICAgICAgICBsZXQgaW5kZXggPSBmaWx0ZXJlZE9ianMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgICAgICAgZmlsdGVyZWRPYmpzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgIGZpbHRlcmVkT2Jqcy5mb3JFYWNoKChvYmopID0+e1xuICAgICAgICAgICAgICAgIHdoaWxlKHRoaXMucG9zWCA+PSBvYmoucG9zWCAtIG9iai53aWR0aCAtIDUwICYmIHRoaXMucG9zWCA8PSBvYmoucG9zWCArIG9iai53aWR0aCArIDUwKXtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGlzIFgnLCB0aGlzLnBvc1gsICdjYXIgWCcsIG9iai5wb3NYLCAnY2FyIHdpZHRoJywgb2JqLnBvc1ggKyBvYmoud2lkdGgpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5wb3NYICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGljT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgIHRoaXMucG9zWSA9IHBvc1k7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMucG9zWCArIHRoaXMucG9zWSAqIDE0O1xuICB9XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuL1R1cnRsZVNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdXJ0bGUgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIGRpdmluZyl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnBvc1kgPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICB0aGlzLmRpdmluZyA9IGRpdmluZztcbiAgICB0aGlzLmRpdmVkID0gZmFsc2U7XG4gIH1cblxuICBzZXRUdXJ0bGVQb3NpdGlvbihib2FyZCl7XG4gICAgdGhpcy5wb3NYIDwgMCA/IHRoaXMucG9zWCA9IDEzIDogZmFsc2U7XG4gICAgdGhpcy5kaXZlZCA/IGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24oKV0uY2xhc3NOYW1lID0gXCJ0dXJ0bGUtZGl2aW5nXCIgOiBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwidHVydGxlXCI7XG4gICAgLy8gYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcInR1cnRsZVwiO1xuICB9XG59XG4iLCJpbXBvcnQgVHVydGxlIGZyb20gJy4vVHVydGxlLmpzJztcblxuY29uc3QgVHVydGxlU2VydmljZSA9IHtcblxuICBjcmVhdGVUdXJ0bGVzOiAoKSA9PntcbiAgICBsZXQgdHVydGxlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgZGl2aW5nID0gZmFsc2UsIHBvc1ggPSAzOyBpIDw9IDc7IGkrKykge1xuICAgICAgbGV0IHR1cnRsZTtcbiAgICAgIGlmKGxpbmUgPT0gMSl7XG4gICAgICAgIGxldCBzaXplMlR1cnRsZSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAyOyBqKyspIHtcbiAgICAgICAgICAgIHR1cnRsZSA9IG5ldyBUdXJ0bGUobmV3UG9zWCwgbGluZSwgZGl2aW5nKTtcbiAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgIHNpemUyVHVydGxlLnB1c2godHVydGxlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcG9zWCA9IHBvc1ggKyAzO1xuICAgICAgICB0dXJ0bGVzID0gW1xuICAgICAgICAgICAgLi4udHVydGxlcyxcbiAgICAgICAgICAgIC4uLnNpemUyVHVydGxlXG4gICAgICAgIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc2l6ZTNUdXJ0bGUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIG5ld1Bvc1ggPSBwb3NYOyBqIDwgMzsgaisrKSB7XG4gICAgICAgICAgICB0dXJ0bGUgPSBuZXcgVHVydGxlKG5ld1Bvc1gsIGxpbmUsIGRpdmluZyk7XG4gICAgICAgICAgICBuZXdQb3NYKys7XG4gICAgICAgICAgICBzaXplM1R1cnRsZS5wdXNoKHR1cnRsZSk7XG4gICAgICAgIH07XG4gICAgICAgIHBvc1ggPSBwb3NYICsgNDtcbiAgICAgICAgdHVydGxlcyA9IFtcbiAgICAgICAgICAgIC4uLnR1cnRsZXMsXG4gICAgICAgICAgICAuLi5zaXplM1R1cnRsZVxuICAgICAgICBdO1xuICAgICAgfVxuICAgICAgaWYoaSA9PSA0KXtcbiAgICAgICAgbGluZSA9IDI7XG4gICAgICAgIHBvc1ggPSAwO1xuICAgICAgfTtcbiAgICAgIGlmKCBpID09PSAxIHx8IGkgPT09IDQpe1xuICAgICAgICBkaXZpbmcgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGl2aW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0dXJ0bGVzO1xuICB9LFxuXG4gIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIDU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGVTZXJ2aWNlO1xuIiwiaW1wb3J0IFN0YXRpY09iamVjdCBmcm9tICcuLi9TdGF0aWNPYmplY3QuanMnO1xuaW1wb3J0IFdhdGVyU2VydmljZSBmcm9tICcuL1dhdGVyU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyIGV4dGVuZHMgU3RhdGljT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLnBvc1kgPSBXYXRlclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICB9XG5cbiAgc2V0V2F0ZXJQb3NpdGlvbihib2FyZCl7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcIndhdGVyXCI7XG4gIH1cbn1cbiIsImltcG9ydCBXYXRlciBmcm9tICcuL1dhdGVyLmpzJztcblxuY29uc3QgV2F0ZXJTZXJ2aWNlID0ge1xuICBjcmVhdGVXYXRlcjogKCkgPT4ge1xuICAgICAgbGV0IHdhdGVyT2JqcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSA3MDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgd2F0ZXIgPSBuZXcgV2F0ZXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICBwb3NYID0gcG9zWCArIDFcbiAgICAgICAgICAgIHdhdGVyT2Jqcy5wdXNoKHdhdGVyKTtcbiAgICAgICAgICBpZiAoaSAlIDE0ID09IDApIHtcbiAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgICBwb3NYID0gMDtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2F0ZXJPYmpzO1xuICB9LFxuXG4gIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIDU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgcmV0dXJuIDQ7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBXYXRlclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi9Xb29kU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvb2QgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5wb3NZID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgfVxuXG4gIHNldFdvb2RQb3NpdGlvbihib2FyZCl7XG4gICAgdGhpcy5wb3NYID4gMTMgPyB0aGlzLnBvc1ggPSAwIDogZmFsc2U7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcIndvb2RcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFdvb2QgZnJvbSAnLi9Xb29kLmpzJztcblxuY29uc3QgV29vZFNlcnZpY2UgPSB7XG4gICAgY3JlYXRlV29vZDogKCkgPT4ge1xuICAgICAgICBsZXQgd29vZHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSA3OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0dXJ0bGU7XG4gICAgICAgICAgICBpZiAobGluZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBzaXplM1dvb2QgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZChuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgICAgICAgICBzaXplM1dvb2QucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyA1O1xuICAgICAgICAgICAgICAgIHdvb2RzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi53b29kcyxcbiAgICAgICAgICAgICAgICAgICAgLi4uc2l6ZTNXb29kXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gMikge1xuICAgICAgICAgICAgICAgIGxldCBzaXplNVdvb2QgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCA1OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZChuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgICAgICAgICBzaXplNVdvb2QucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyA3O1xuICAgICAgICAgICAgICAgIHdvb2RzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi53b29kcyxcbiAgICAgICAgICAgICAgICAgICAgLi4uc2l6ZTVXb29kXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgc2l6ZTRXb29kID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIG5ld1Bvc1ggPSBwb3NYOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QobmV3UG9zWCwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTRXb29kLnB1c2god29vZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgODtcbiAgICAgICAgICAgICAgICB3b29kcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ud29vZHMsXG4gICAgICAgICAgICAgICAgICAgIC4uLnNpemU0V29vZFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgcG9zWCA9IDE7XG4gICAgICAgICAgICAgICAgbGluZSA9IDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gNSkge1xuICAgICAgICAgICAgICAgIHBvc1ggPSAwXG4gICAgICAgICAgICAgICAgbGluZSA9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdvb2RzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdvb2RTZXJ2aWNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9O1xuXG4gICAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICF0aGlzLmV2ZW50c1tldmVudE5hbWVdID8gdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdIDogZmFsc2U7XG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXG4gICAgICByZXR1cm4gKCkgPT57XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcihldmVudEZuID0+IGZuICE9PSBldmVudEZuKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZW1pdChldmVudE5hbWUsIGRhdGEpe1xuICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgaWYoZXZlbnQpe1xuICAgICAgICBldmVudC5mb3JFYWNoKGZuID0+e1xuICAgICAgICAgIGZuLmNhbGwobnVsbCwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG59XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0NvbXBvbmVudHMvR2FtZS5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PntcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xufSk7XG4iXX0=
