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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board() {
        _classCallCheck(this, Board);

        this.board = null;
        this.frogger = new _Frogger2.default();
        this.cars = _CarService2.default.createCars();
        this.turtles = _TurtleService2.default.createTurtles();
        this.water = _WaterService2.default.createWater();
    }

    _createClass(Board, [{
        key: 'setBoard',
        value: function setBoard() {
            var _this = this;

            this.board = document.querySelectorAll('#board div');
            _BoardService2.default.clearBoard(this.board);
            this.water.forEach(function (waterObj) {
                waterObj.setWaterPosition(_this.board);
            });
            this.turtles.forEach(function (turtle) {
                turtle.setTurtlePosition(_this.board);
            });
            this.frogger.setFroggerPosition(this.board);
            this.cars.forEach(function (car) {
                car.setCarPosition(_this.board);
            });
            this.checkCollision();
        }
    }, {
        key: 'sailFrogger',
        value: function sailFrogger() {
            var turtleCollision = _BoardService2.default.checkCollision(this.frogger, this.turtles);
            if (turtleCollision !== false) {
                this.frogger.posX--;
            }
        }
    }, {
        key: 'moveFrogger',
        value: function moveFrogger(event) {
            this.frogger.move(event);
            this.setBoard();
        }
    }, {
        key: 'checkCollision',
        value: function checkCollision() {
            var collision = false;
            var carCollision = _BoardService2.default.checkCollision(this.frogger, this.cars);
            var waterCollision = _BoardService2.default.checkCollision(this.frogger, this.water);
            var turtleCollision = _BoardService2.default.checkCollision(this.frogger, this.turtles);
            carCollision !== false || waterCollision !== false ? collision = true : false; // TODO: check this condition
            turtleCollision ? collision = turtleCollision : false;
            return collision;
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

},{"../Cars/CarService.js":4,"../Frogger.js":5,"../Turtles/TurtleService.js":10,"../Water/WaterService.js":12,"./BoardService.js":2}],2:[function(require,module,exports){
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

},{"../EventEmitter.js":13,"./Board/Board.js":1}],7:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
'use strict';

var _Game = require('./Components/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./Components/Game.js":6}]},{},[14])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Nb3ZpbmdPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9TdGF0aWNPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9UdXJ0bGVzL1R1cnRsZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1dhdGVyL1dhdGVyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzIiwic3JjL2pzL0V2ZW50RW1pdHRlci5qcyIsInNyYy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEs7QUFDakIscUJBQWM7QUFBQTs7QUFDVixhQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0EsYUFBSyxPQUFMLEdBQWUsdUJBQWY7QUFDQSxhQUFLLElBQUwsR0FBWSxxQkFBVyxVQUFYLEVBQVo7QUFDQSxhQUFLLE9BQUwsR0FBZSx3QkFBYyxhQUFkLEVBQWY7QUFDQSxhQUFLLEtBQUwsR0FBYSx1QkFBYSxXQUFiLEVBQWI7QUFDSDs7OzttQ0FFVTtBQUFBOztBQUNQLGlCQUFLLEtBQUwsR0FBYSxTQUFTLGdCQUFULENBQTBCLFlBQTFCLENBQWI7QUFDQSxtQ0FBYSxVQUFiLENBQXdC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QUNELE9BRkQ7QUFHRDs7O3lCQUVJLFMsRUFBVyxJLEVBQUs7QUFDbkIsVUFBTSxRQUFRLEtBQUssTUFBTCxDQUFZLFNBQVosQ0FBZDtBQUNBLFVBQUcsS0FBSCxFQUFTO0FBQ1AsY0FBTSxPQUFOLENBQWMsY0FBSztBQUNqQixhQUFHLElBQUgsQ0FBUSxJQUFSLEVBQWMsSUFBZDtBQUNELFNBRkQ7QUFHRDtBQUNGOzs7Ozs7a0JBckJnQixZOzs7OztBQ0FyQjs7Ozs7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBSztBQUNqRCxNQUFJLE9BQU8sb0JBQVg7QUFDQSxPQUFLLFNBQUw7QUFDRCxDQUhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBGcm9nZ2VyIGZyb20gJy4uL0Zyb2dnZXIuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi4vQ2Fycy9DYXJTZXJ2aWNlLmpzJztcbmltcG9ydCBCb2FyZFNlcnZpY2UgZnJvbSAnLi9Cb2FyZFNlcnZpY2UuanMnO1xuaW1wb3J0IFR1cnRsZVNlcnZpY2UgZnJvbSAnLi4vVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzJztcbmltcG9ydCBXYXRlclNlcnZpY2UgZnJvbSAnLi4vV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gbnVsbDtcbiAgICAgICAgdGhpcy5mcm9nZ2VyID0gbmV3IEZyb2dnZXIoKTtcbiAgICAgICAgdGhpcy5jYXJzID0gQ2FyU2VydmljZS5jcmVhdGVDYXJzKCk7XG4gICAgICAgIHRoaXMudHVydGxlcyA9IFR1cnRsZVNlcnZpY2UuY3JlYXRlVHVydGxlcygpO1xuICAgICAgICB0aGlzLndhdGVyID0gV2F0ZXJTZXJ2aWNlLmNyZWF0ZVdhdGVyKCk7XG4gICAgfTtcblxuICAgIHNldEJvYXJkKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2JvYXJkIGRpdicpO1xuICAgICAgICBCb2FyZFNlcnZpY2UuY2xlYXJCb2FyZCh0aGlzLmJvYXJkKTtcbiAgICAgICAgdGhpcy53YXRlci5mb3JFYWNoKCh3YXRlck9iaikgPT4ge1xuICAgICAgICAgICAgd2F0ZXJPYmouc2V0V2F0ZXJQb3NpdGlvbih0aGlzLmJvYXJkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudHVydGxlcy5mb3JFYWNoKCh0dXJ0bGUpID0+IHtcbiAgICAgICAgICAgIHR1cnRsZS5zZXRUdXJ0bGVQb3NpdGlvbih0aGlzLmJvYXJkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZnJvZ2dlci5zZXRGcm9nZ2VyUG9zaXRpb24odGhpcy5ib2FyZCk7XG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKChjYXIpID0+IHtcbiAgICAgICAgICAgIGNhci5zZXRDYXJQb3NpdGlvbih0aGlzLmJvYXJkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICB9O1xuXG4gICAgc2FpbEZyb2dnZXIoKXtcbiAgICAgIGxldCB0dXJ0bGVDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLnR1cnRsZXMpO1xuICAgICAgaWYodHVydGxlQ29sbGlzaW9uICE9PSBmYWxzZSl7XG4gICAgICAgIHRoaXMuZnJvZ2dlci5wb3NYLS07XG4gICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUZyb2dnZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mcm9nZ2VyLm1vdmUoZXZlbnQpO1xuICAgICAgICB0aGlzLnNldEJvYXJkKCk7XG4gICAgfTtcblxuICAgIGNoZWNrQ29sbGlzaW9uKCkge1xuICAgICAgbGV0IGNvbGxpc2lvbiA9IGZhbHNlO1xuICAgICAgbGV0IGNhckNvbGxpc2lvbiA9IEJvYXJkU2VydmljZS5jaGVja0NvbGxpc2lvbih0aGlzLmZyb2dnZXIsIHRoaXMuY2Fycyk7XG4gICAgICBsZXQgd2F0ZXJDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLndhdGVyKTtcbiAgICAgIGxldCB0dXJ0bGVDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLnR1cnRsZXMpO1xuICAgICAgY2FyQ29sbGlzaW9uICE9PSBmYWxzZSB8fCB3YXRlckNvbGxpc2lvbiAhPT0gZmFsc2UgPyBjb2xsaXNpb24gPSB0cnVlIDogZmFsc2U7IC8vIFRPRE86IGNoZWNrIHRoaXMgY29uZGl0aW9uXG4gICAgICB0dXJ0bGVDb2xsaXNpb24gPyBjb2xsaXNpb24gPSB0dXJ0bGVDb2xsaXNpb24gOiBmYWxzZTtcbiAgICAgIHJldHVybiBjb2xsaXNpb247XG4gICAgfTtcblxuICAgIHN0YXJ0Qm9hcmQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxLCBzcGVlZCA9IDExMDA7IGkgPD0gNTsgaSsrKSB7XG4gICAgICAgICAgICBCb2FyZFNlcnZpY2Uuc3RhcnRNb3ZpbmdMaW5lKHRoaXMsIHRoaXMuY2FycywgaSwgc3BlZWQpO1xuICAgICAgICAgICAgc3BlZWQgPSBzcGVlZCAtIDEwMDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMSwgc3BlZWQgPSA5MDA7IGkgPD0gMjsgaSsrKSB7XG4gICAgICAgICAgICBCb2FyZFNlcnZpY2Uuc3RhcnRNb3ZpbmdMaW5lKHRoaXMsIHRoaXMudHVydGxlcywgaSwgc3BlZWQpO1xuICAgICAgICAgICAgc3BlZWQgPSA3MDA7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsImNvbnN0IEJvYXJkU2VydmljZSA9IHtcblxuICBjbGVhckJvYXJkOiAoYm9hcmQpID0+IHtcbiAgICBib2FyZC5mb3JFYWNoKChkaXYpPT57XG4gICAgICBkaXYuY2xhc3NOYW1lID0gXCJcIjtcbiAgICB9KVxuICB9LFxuXG4gIGNoZWNrQ29sbGlzaW9uKGZyb2dnZXIsIGVsZW1lbnRzKXtcbiAgICBsZXQgZnJvZ2dlclBvcyA9IGZyb2dnZXIuZ2V0UG9zaXRpb24oKTtcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgZWxlbWVudHMuZm9yRWFjaChlbGVtID0+IGVsZW0uZ2V0UG9zaXRpb24oKSA9PT0gZnJvZ2dlclBvcyA/IHJlc3VsdCA9IGZyb2dnZXJQb3MgOiBmYWxzZSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICBzdGFydE1vdmluZ0xpbmU6IChCb2FyZCwgb2JqZWN0cywgbGluZSwgc3BlZWQgPSAxMDAwKSA9PntcbiAgICByZXR1cm4gd2luZG93LnNldEludGVydmFsKCgpID0+e1xuICAgICAgbGV0IGZpbHRlcmVkTGluZSA9IG9iamVjdHMuZmlsdGVyKChvYmopID0+e1xuICAgICAgICByZXR1cm4gb2JqLmxpbmUgPT0gbGluZTtcbiAgICAgIH0pO1xuICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2goKG9iaikgPT57XG4gICAgICAgICAgb2JqLm1vdmUoKTtcbiAgICAgIH0pO1xuICAgICAgQm9hcmQuc2V0Qm9hcmQoKTtcbiAgICB9LCBzcGVlZCk7IC8vIFRPRE86IGFkZCBzcGVlZCBmdW5jdGlvbmFsaXR5XG4gIH0sXG5cbiAgc3RhcnRUdXJ0bGVMaW5lOiAoQm9hcmQsIHR1cnRsZXMsIGxpbmUsIHNwZWVkID0gMTAwMCkgPT57XG5cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQm9hcmRTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi9DYXJTZXJ2aWNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuXG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5wb3NZID0gQ2FyU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBDYXJTZXJ2aWNlLmdlbmVyYXRlRGlyZWN0aW9uKGxpbmUpO1xuICB9XG5cbiAgc2V0Q2FyUG9zaXRpb24oYm9hcmQpe1xuICAgIHRoaXMucG9zWCA+IDEzID8gdGhpcy5wb3NYID0gMCA6IGZhbHNlO1xuICAgIHRoaXMucG9zWCA8IDAgPyB0aGlzLnBvc1ggPSAxMyA6IGZhbHNlO1xuICAgIGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24oKV0uY2xhc3NOYW1lID0gXCJjYXJcIjtcbiAgfVxuXG59XG4iLCJpbXBvcnQgQ2FyIGZyb20gJy4vQ2FyLmpzJztcblxuY29uc3QgQ2FyU2VydmljZSA9ICB7XG5cbiAgICBjcmVhdGVDYXJzOiAoKSA9PiB7XG4gICAgICAgIGxldCBjYXJzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDA7IGkgPD0gMTU7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNhcjtcbiAgICAgICAgICAgIGlmKGxpbmUgPT09IDUpe1xuICAgICAgICAgICAgICBsZXQgc2l6ZTNDYXIgPSBbXTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIG5ld1Bvc1ggPSBwb3NYOyBqIDwgMzsgaisrKSB7XG4gICAgICAgICAgICAgICAgICBjYXIgPSBuZXcgQ2FyKG5ld1Bvc1gsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgICAgICAgc2l6ZTNDYXIucHVzaChjYXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgNDtcbiAgICAgICAgICAgICAgY2FycyA9IFtcbiAgICAgICAgICAgICAgICAgIC4uLmNhcnMsXG4gICAgICAgICAgICAgICAgICAuLi5zaXplM0NhclxuICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICBjYXIgPSBuZXcgQ2FyKHBvc1gsIGxpbmUpO1xuICAgICAgICAgICAgICBwb3NYID0gcG9zWCArIDNcbiAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDY7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FycztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlRGlyZWN0aW9uOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vTW92aW5nT2JqZWN0LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJvZ2dlciBleHRlbmRzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBsaXZlcyl7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnBvc1ggPSA3O1xuICAgIHRoaXMucG9zWSA9IDEyO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICB0aGlzLmxpdmVzID0gMztcbiAgfVxuXG4gIHNldEZyb2dnZXJQb3NpdGlvbihib2FyZCl7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcImZyb2dnZXJcIjtcbiAgfVxuXG4gIG1vdmUoZXZlbnQpe1xuICAgIHN3aXRjaChldmVudC53aGljaCl7XG4gICAgICBjYXNlIDM3OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgdGhpcy5wb3NYLS07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICB0aGlzLnBvc1ktLTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgIHRoaXMucG9zWCsrO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgICAgICB0aGlzLnBvc1krKztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9O1xuICB9XG5cbn1cbiIsImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkL0JvYXJkLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vRXZlbnRFbWl0dGVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIGxldCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpO1xuICAgICAgICBnZW5lcmF0ZURpdnMoYm9hcmQpO1xuICAgICAgICB0aGlzLmJvYXJkLnNldEJvYXJkKCk7XG4gICAgICAgIHRoaXMuYm9hcmQuc3RhcnRCb2FyZCgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKCkgPT4gdGhpcy5ib2FyZC5tb3ZlRnJvZ2dlcihldmVudCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVEaXZzKGJvYXJkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxODI7IGkrKykge1xuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgcG9zWSwgZGlyZWN0aW9uKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgIHRoaXMucG9zWSA9IHBvc1k7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gIH1cblxuICBnZXRQb3NpdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMucG9zWCArIHRoaXMucG9zWSAqIDE0O1xuICB9XG5cbiAgbW92ZSgpe1xuICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbil7XG4gICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICB0aGlzLnBvc1gtLTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIHRoaXMucG9zWCsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpY09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgcG9zWSl7XG4gICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICB0aGlzLnBvc1kgPSBwb3NZO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLnBvc1ggKyB0aGlzLnBvc1kgKiAxNDtcbiAgfVxufVxuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IFR1cnRsZVNlcnZpY2UgZnJvbSAnLi9UdXJ0bGVTZXJ2aWNlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHVydGxlIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMucG9zWSA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICB9XG4gIFxuICBzZXRUdXJ0bGVQb3NpdGlvbihib2FyZCl7XG4gICAgdGhpcy5wb3NYIDwgMCA/IHRoaXMucG9zWCA9IDEzIDogZmFsc2U7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcInR1cnRsZVwiO1xuICB9XG59XG4iLCJpbXBvcnQgVHVydGxlIGZyb20gJy4vVHVydGxlLmpzJztcblxuY29uc3QgVHVydGxlU2VydmljZSA9IHtcblxuICBjcmVhdGVUdXJ0bGVzOiAoKSA9PntcbiAgICBsZXQgdHVydGxlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDM7IGkgPD0gNzsgaSsrKSB7XG4gICAgICBsZXQgdHVydGxlO1xuICAgICAgaWYobGluZSA9PSAxKXtcbiAgICAgICAgbGV0IHNpemUyVHVydGxlID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBuZXdQb3NYID0gcG9zWDsgaiA8IDI7IGorKykge1xuICAgICAgICAgICAgdHVydGxlID0gbmV3IFR1cnRsZShuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgIHNpemUyVHVydGxlLnB1c2godHVydGxlKTtcbiAgICAgICAgfVxuICAgICAgICBwb3NYID0gcG9zWCArIDM7XG4gICAgICAgIHR1cnRsZXMgPSBbXG4gICAgICAgICAgICAuLi50dXJ0bGVzLFxuICAgICAgICAgICAgLi4uc2l6ZTJUdXJ0bGVcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZXtcbiAgICAgICAgbGV0IHNpemUzVHVydGxlID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBuZXdQb3NYID0gcG9zWDsgaiA8IDM7IGorKykge1xuICAgICAgICAgICAgdHVydGxlID0gbmV3IFR1cnRsZShuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgIHNpemUzVHVydGxlLnB1c2godHVydGxlKTtcbiAgICAgICAgfVxuICAgICAgICBwb3NYID0gcG9zWCArIDQ7XG4gICAgICAgIHR1cnRsZXMgPSBbXG4gICAgICAgICAgICAuLi50dXJ0bGVzLFxuICAgICAgICAgICAgLi4uc2l6ZTNUdXJ0bGVcbiAgICAgICAgXTtcbiAgICAgIH1cbiAgICAgIGlmKGkgPT0gNCl7XG4gICAgICAgIGxpbmUgPSAyO1xuICAgICAgICBwb3NYID0gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHR1cnRsZXM7XG4gIH0sXG5cbiAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gNTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFR1cnRsZVNlcnZpY2U7XG4iLCJpbXBvcnQgU3RhdGljT2JqZWN0IGZyb20gJy4uL1N0YXRpY09iamVjdC5qcyc7XG5pbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4vV2F0ZXJTZXJ2aWNlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0ZXIgZXh0ZW5kcyBTdGF0aWNPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMucG9zWSA9IFdhdGVyU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gIH1cblxuICBzZXRXYXRlclBvc2l0aW9uKGJvYXJkKXtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwid2F0ZXJcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFdhdGVyIGZyb20gJy4vV2F0ZXIuanMnO1xuXG5jb25zdCBXYXRlclNlcnZpY2UgPSB7XG4gIGNyZWF0ZVdhdGVyOiAoKSA9PiB7XG4gICAgICBsZXQgd2F0ZXJPYmpzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDcwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3YXRlciA9IG5ldyBXYXRlcihwb3NYLCBsaW5lKTtcbiAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgMVxuICAgICAgICAgICAgd2F0ZXJPYmpzLnB1c2god2F0ZXIpO1xuICAgICAgICAgIGlmIChpICUgMTQgPT0gMCkge1xuICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICAgIHBvc1ggPSAwO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3YXRlck9ianM7XG4gIH0sXG5cbiAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gNTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdhdGVyU2VydmljZTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgfTtcblxuICAgIHN1YnNjcmliZShldmVudE5hbWUsIGZuKSB7XG4gICAgICAhdGhpcy5ldmVudHNbZXZlbnROYW1lXSA/IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXSA6IGZhbHNlO1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcblxuICAgICAgcmV0dXJuICgpID0+e1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoZXZlbnRGbiA9PiBmbiAhPT0gZXZlbnRGbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGVtaXQoZXZlbnROYW1lLCBkYXRhKXtcbiAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXTtcbiAgICAgIGlmKGV2ZW50KXtcbiAgICAgICAgZXZlbnQuZm9yRWFjaChmbiA9PntcbiAgICAgICAgICBmbi5jYWxsKG51bGwsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xufVxuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9Db21wb25lbnRzL0dhbWUuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT57XG4gIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgZ2FtZS5zdGFydEdhbWUoKTtcbn0pO1xuIl19
