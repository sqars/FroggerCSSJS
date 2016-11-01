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
        this.sailTurtle = null;
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
            this.sailTurtle ? this.sailTurtle.sailFrogger(this.frogger) : false;
            this.turtles.forEach(function (turtle) {
                turtle.setTurtlePosition(_this.board);
            });
            this.frogger.setFroggerPosition(this.board);
            this.cars.forEach(function (car) {
                car.setCarPosition(_this.board);
            });
            // this.checkCollision();
        }
    }, {
        key: 'moveFrogger',
        value: function moveFrogger(event) {
            this.frogger.move(event);
            var turtleCollision = _BoardService2.default.checkCollision(this.frogger, this.turtles);
            if (turtleCollision) {
                var sailTurtle = this.turtles.filter(function (turtle) {
                    return turtle.getPosition() === turtleCollision;
                });
                this.sailTurtle = sailTurtle[0];
            } else {
                this.sailTurtle = null;
            };
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
            turtleCollision ? collision = false : false;
            return collision;
        }
    }, {
        key: 'startMovingLine',
        value: function startMovingLine(objects, line) {
            var _this2 = this;

            var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

            return window.setInterval(function () {
                var filteredLine = objects.filter(function (obj) {
                    return obj.line == line;
                });
                filteredLine.forEach(function (obj) {
                    return obj.move();
                });
                _this2.setBoard();
            }, speed); // TODO: add speed functionality
        }
    }, {
        key: 'startBoard',
        value: function startBoard() {
            for (var i = 1, speed = 1100; i <= 5; i++) {
                this.startMovingLine(this.cars, i, speed);
                speed = speed - 100;
            }
            for (var _i = 1, _speed = 900; _i <= 2; _i++) {
                this.startMovingLine(this.turtles, _i, _speed);
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
    _this.sail = null;
    return _this;
  }

  _createClass(Turtle, [{
    key: 'setTurtlePosition',
    value: function setTurtlePosition(board) {
      this.posX < 0 ? this.posX = 13 : false;
      board[this.getPosition()].className = "turtle";
    }
  }, {
    key: 'sailFrogger',
    value: function sailFrogger(frogger) {
      frogger.posX = this.posX;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Nb3ZpbmdPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9TdGF0aWNPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9UdXJ0bGVzL1R1cnRsZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1dhdGVyL1dhdGVyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzIiwic3JjL2pzL0V2ZW50RW1pdHRlci5qcyIsInNyYy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEs7QUFDakIscUJBQWM7QUFBQTs7QUFDVixhQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0EsYUFBSyxPQUFMLEdBQWUsdUJBQWY7QUFDQSxhQUFLLElBQUwsR0FBWSxxQkFBVyxVQUFYLEVBQVo7QUFDQSxhQUFLLE9BQUwsR0FBZSx3QkFBYyxhQUFkLEVBQWY7QUFDQSxhQUFLLEtBQUwsR0FBYSx1QkFBYSxXQUFiLEVBQWI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsSUFBbEI7QUFDSDs7OzttQ0FFVTtBQUFBOztBQUNQLGlCQUFLLEtBQUwsR0FBYSxTQUFTLGdCQUFULENBQTBCLFlBQTFC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QixFQUE1Qjs7QUFFQSxhQUFPLFlBQUs7QUFDVixjQUFLLE1BQUwsQ0FBWSxTQUFaLElBQXlCLE1BQUssTUFBTCxDQUFZLFNBQVosRUFBdUIsTUFBdkIsQ0FBOEI7QUFBQSxpQkFBVyxPQUFPLE9BQWxCO0FBQUEsU0FBOUIsQ0FBekI7QUFDRCxPQUZEO0FBR0Q7Ozt5QkFFSSxTLEVBQVcsSSxFQUFLO0FBQ25CLFVBQU0sUUFBUSxLQUFLLE1BQUwsQ0FBWSxTQUFaLENBQWQ7QUFDQSxVQUFHLEtBQUgsRUFBUztBQUNQLGNBQU0sT0FBTixDQUFjLGNBQUs7QUFDakIsYUFBRyxJQUFILENBQVEsSUFBUixFQUFjLElBQWQ7QUFDRCxTQUZEO0FBR0Q7QUFDRjs7Ozs7O2tCQXJCZ0IsWTs7Ozs7QUNBckI7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQUs7QUFDakQsTUFBSSxPQUFPLG9CQUFYO0FBQ0EsT0FBSyxTQUFMO0FBQ0QsQ0FIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRnJvZ2dlciBmcm9tICcuLi9Gcm9nZ2VyLmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4uL0NhcnMvQ2FyU2VydmljZS5qcyc7XG5pbXBvcnQgQm9hcmRTZXJ2aWNlIGZyb20gJy4vQm9hcmRTZXJ2aWNlLmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4uL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4uL1dhdGVyL1dhdGVyU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG51bGw7XG4gICAgICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKCk7XG4gICAgICAgIHRoaXMuY2FycyA9IENhclNlcnZpY2UuY3JlYXRlQ2FycygpO1xuICAgICAgICB0aGlzLnR1cnRsZXMgPSBUdXJ0bGVTZXJ2aWNlLmNyZWF0ZVR1cnRsZXMoKTtcbiAgICAgICAgdGhpcy53YXRlciA9IFdhdGVyU2VydmljZS5jcmVhdGVXYXRlcigpO1xuICAgICAgICB0aGlzLnNhaWxUdXJ0bGUgPSBudWxsO1xuICAgIH07XG5cbiAgICBzZXRCb2FyZCgpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNib2FyZCBkaXYnKTtcbiAgICAgICAgQm9hcmRTZXJ2aWNlLmNsZWFyQm9hcmQodGhpcy5ib2FyZCk7XG4gICAgICAgIHRoaXMud2F0ZXIuZm9yRWFjaCgod2F0ZXJPYmopID0+IHtcbiAgICAgICAgICAgIHdhdGVyT2JqLnNldFdhdGVyUG9zaXRpb24odGhpcy5ib2FyZCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNhaWxUdXJ0bGUgPyB0aGlzLnNhaWxUdXJ0bGUuc2FpbEZyb2dnZXIodGhpcy5mcm9nZ2VyKSA6IGZhbHNlO1xuICAgICAgICB0aGlzLnR1cnRsZXMuZm9yRWFjaCgodHVydGxlKSA9PiB7XG4gICAgICAgICAgICB0dXJ0bGUuc2V0VHVydGxlUG9zaXRpb24odGhpcy5ib2FyZCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZyb2dnZXIuc2V0RnJvZ2dlclBvc2l0aW9uKHRoaXMuYm9hcmQpO1xuICAgICAgICB0aGlzLmNhcnMuZm9yRWFjaCgoY2FyKSA9PiB7XG4gICAgICAgICAgICBjYXIuc2V0Q2FyUG9zaXRpb24odGhpcy5ib2FyZCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgfTtcblxuICAgIG1vdmVGcm9nZ2VyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZnJvZ2dlci5tb3ZlKGV2ZW50KTtcbiAgICAgICAgbGV0IHR1cnRsZUNvbGxpc2lvbiA9IEJvYXJkU2VydmljZS5jaGVja0NvbGxpc2lvbih0aGlzLmZyb2dnZXIsIHRoaXMudHVydGxlcyk7XG4gICAgICAgIGlmICh0dXJ0bGVDb2xsaXNpb24pIHtcbiAgICAgICAgICAgIGxldCBzYWlsVHVydGxlID0gdGhpcy50dXJ0bGVzLmZpbHRlcih0dXJ0bGUgPT4gdHVydGxlLmdldFBvc2l0aW9uKCkgPT09IHR1cnRsZUNvbGxpc2lvbik7XG4gICAgICAgICAgICB0aGlzLnNhaWxUdXJ0bGUgPSBzYWlsVHVydGxlWzBdO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICB0aGlzLnNhaWxUdXJ0bGUgPSBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldEJvYXJkKCk7XG4gICAgfTtcblxuICAgIGNoZWNrQ29sbGlzaW9uKCkge1xuICAgICAgICBsZXQgY29sbGlzaW9uID0gZmFsc2U7XG4gICAgICAgIGxldCBjYXJDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLmNhcnMpO1xuICAgICAgICBsZXQgd2F0ZXJDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLndhdGVyKTtcbiAgICAgICAgbGV0IHR1cnRsZUNvbGxpc2lvbiA9IEJvYXJkU2VydmljZS5jaGVja0NvbGxpc2lvbih0aGlzLmZyb2dnZXIsIHRoaXMudHVydGxlcyk7XG4gICAgICAgIGNhckNvbGxpc2lvbiAhPT0gZmFsc2UgfHwgd2F0ZXJDb2xsaXNpb24gIT09IGZhbHNlID8gY29sbGlzaW9uID0gdHJ1ZSA6IGZhbHNlOyAvLyBUT0RPOiBjaGVjayB0aGlzIGNvbmRpdGlvblxuICAgICAgICB0dXJ0bGVDb2xsaXNpb24gPyBjb2xsaXNpb24gPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICByZXR1cm4gY29sbGlzaW9uO1xuICAgIH07XG5cbiAgICBzdGFydE1vdmluZ0xpbmUob2JqZWN0cywgbGluZSwgc3BlZWQgPSAxMDAwKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpbHRlcmVkTGluZSA9IG9iamVjdHMuZmlsdGVyKG9iaiA9PiBvYmoubGluZSA9PSBsaW5lKTtcbiAgICAgICAgICAgIGZpbHRlcmVkTGluZS5mb3JFYWNoKG9iaiA9PiBvYmoubW92ZSgpKTtcbiAgICAgICAgICAgIHRoaXMuc2V0Qm9hcmQoKTtcbiAgICAgICAgfSwgc3BlZWQpOyAvLyBUT0RPOiBhZGQgc3BlZWQgZnVuY3Rpb25hbGl0eVxuICAgIH07XG5cbiAgICBzdGFydEJvYXJkKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMSwgc3BlZWQgPSAxMTAwOyBpIDw9IDU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zdGFydE1vdmluZ0xpbmUodGhpcy5jYXJzLCBpLCBzcGVlZCk7XG4gICAgICAgICAgICBzcGVlZCA9IHNwZWVkIC0gMTAwO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAxLCBzcGVlZCA9IDkwMDsgaSA8PSAyOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRNb3ZpbmdMaW5lKHRoaXMudHVydGxlcywgaSwgc3BlZWQpO1xuICAgICAgICAgICAgc3BlZWQgPSA3MDA7XG4gICAgICAgIH1cbiAgICB9O1xuXG59XG4iLCJjb25zdCBCb2FyZFNlcnZpY2UgPSB7XG5cbiAgY2xlYXJCb2FyZDogKGJvYXJkKSA9PiB7XG4gICAgYm9hcmQuZm9yRWFjaCgoZGl2KT0+e1xuICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgfSlcbiAgfSxcblxuICBjaGVja0NvbGxpc2lvbihmcm9nZ2VyLCBlbGVtZW50cyl7XG4gICAgbGV0IGZyb2dnZXJQb3MgPSBmcm9nZ2VyLmdldFBvc2l0aW9uKCk7XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbSA9PiBlbGVtLmdldFBvc2l0aW9uKCkgPT09IGZyb2dnZXJQb3MgPyByZXN1bHQgPSBmcm9nZ2VyUG9zIDogZmFsc2UpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJvYXJkU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4vQ2FyU2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhciBleHRlbmRzIE1vdmluZ09iamVjdHtcblxuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gQ2FyU2VydmljZS5nZW5lcmF0ZURpcmVjdGlvbihsaW5lKTtcbiAgfVxuXG4gIHNldENhclBvc2l0aW9uKGJvYXJkKXtcbiAgICB0aGlzLnBvc1ggPiAxMyA/IHRoaXMucG9zWCA9IDAgOiBmYWxzZTtcbiAgICB0aGlzLnBvc1ggPCAwID8gdGhpcy5wb3NYID0gMTMgOiBmYWxzZTtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwiY2FyXCI7XG4gIH1cblxufVxuIiwiaW1wb3J0IENhciBmcm9tICcuL0Nhci5qcyc7XG5cbmNvbnN0IENhclNlcnZpY2UgPSAge1xuXG4gICAgY3JlYXRlQ2FyczogKCkgPT4ge1xuICAgICAgICBsZXQgY2FycyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDE1OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjYXI7XG4gICAgICAgICAgICBpZihsaW5lID09PSA1KXtcbiAgICAgICAgICAgICAgbGV0IHNpemUzQ2FyID0gW107XG4gICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBuZXdQb3NYID0gcG9zWDsgaiA8IDM7IGorKykge1xuICAgICAgICAgICAgICAgICAgY2FyID0gbmV3IENhcihuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgICAgICAgIHNpemUzQ2FyLnB1c2goY2FyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwb3NYID0gcG9zWCArIDQ7XG4gICAgICAgICAgICAgIGNhcnMgPSBbXG4gICAgICAgICAgICAgICAgICAuLi5jYXJzLFxuICAgICAgICAgICAgICAgICAgLi4uc2l6ZTNDYXJcbiAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgY2FyID0gbmV3IENhcihwb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyAzXG4gICAgICAgICAgICAgIGNhcnMucHVzaChjYXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSA2O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhcnM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDExO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiA4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiA3O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZURpcmVjdGlvbjogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL01vdmluZ09iamVjdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb2dnZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbiwgbGl2ZXMpe1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5wb3NYID0gNztcbiAgICB0aGlzLnBvc1kgPSAxMjtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgdGhpcy5saXZlcyA9IDM7XG4gIH07XG5cbiAgc2V0RnJvZ2dlclBvc2l0aW9uKGJvYXJkKXtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwiZnJvZ2dlclwiO1xuICB9O1xuXG4gIG1vdmUoZXZlbnQpe1xuICAgIHN3aXRjaChldmVudC53aGljaCl7XG4gICAgICBjYXNlIDM3OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgdGhpcy5wb3NYLS07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICB0aGlzLnBvc1ktLTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgIHRoaXMucG9zWCsrO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgICAgICB0aGlzLnBvc1krKztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9O1xuICB9XG5cbn1cbiIsImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkL0JvYXJkLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vRXZlbnRFbWl0dGVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIGxldCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpO1xuICAgICAgICBnZW5lcmF0ZURpdnMoYm9hcmQpO1xuICAgICAgICB0aGlzLmJvYXJkLnNldEJvYXJkKCk7XG4gICAgICAgIHRoaXMuYm9hcmQuc3RhcnRCb2FyZCgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKCkgPT4gdGhpcy5ib2FyZC5tb3ZlRnJvZ2dlcihldmVudCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVEaXZzKGJvYXJkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxODI7IGkrKykge1xuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgcG9zWSwgZGlyZWN0aW9uKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgIHRoaXMucG9zWSA9IHBvc1k7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gIH1cblxuICBnZXRQb3NpdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMucG9zWCArIHRoaXMucG9zWSAqIDE0O1xuICB9XG5cbiAgbW92ZSgpe1xuICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbil7XG4gICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICB0aGlzLnBvc1gtLTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIHRoaXMucG9zWCsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpY09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgcG9zWSl7XG4gICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICB0aGlzLnBvc1kgPSBwb3NZO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLnBvc1ggKyB0aGlzLnBvc1kgKiAxNDtcbiAgfVxufVxuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IFR1cnRsZVNlcnZpY2UgZnJvbSAnLi9UdXJ0bGVTZXJ2aWNlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHVydGxlIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMucG9zWSA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgIHRoaXMuc2FpbCA9IG51bGw7XG4gIH1cblxuICBzZXRUdXJ0bGVQb3NpdGlvbihib2FyZCl7XG4gICAgdGhpcy5wb3NYIDwgMCA/IHRoaXMucG9zWCA9IDEzIDogZmFsc2U7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcInR1cnRsZVwiO1xuICB9XG5cbiAgc2FpbEZyb2dnZXIoZnJvZ2dlcil7XG4gICAgZnJvZ2dlci5wb3NYID0gdGhpcy5wb3NYO1xuICB9XG59XG4iLCJpbXBvcnQgVHVydGxlIGZyb20gJy4vVHVydGxlLmpzJztcblxuY29uc3QgVHVydGxlU2VydmljZSA9IHtcblxuICBjcmVhdGVUdXJ0bGVzOiAoKSA9PntcbiAgICBsZXQgdHVydGxlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDM7IGkgPD0gNzsgaSsrKSB7XG4gICAgICBsZXQgdHVydGxlO1xuICAgICAgaWYobGluZSA9PSAxKXtcbiAgICAgICAgbGV0IHNpemUyVHVydGxlID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBuZXdQb3NYID0gcG9zWDsgaiA8IDI7IGorKykge1xuICAgICAgICAgICAgdHVydGxlID0gbmV3IFR1cnRsZShuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgIHNpemUyVHVydGxlLnB1c2godHVydGxlKTtcbiAgICAgICAgfVxuICAgICAgICBwb3NYID0gcG9zWCArIDM7XG4gICAgICAgIHR1cnRsZXMgPSBbXG4gICAgICAgICAgICAuLi50dXJ0bGVzLFxuICAgICAgICAgICAgLi4uc2l6ZTJUdXJ0bGVcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZXtcbiAgICAgICAgbGV0IHNpemUzVHVydGxlID0gW107XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBuZXdQb3NYID0gcG9zWDsgaiA8IDM7IGorKykge1xuICAgICAgICAgICAgdHVydGxlID0gbmV3IFR1cnRsZShuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgIHNpemUzVHVydGxlLnB1c2godHVydGxlKTtcbiAgICAgICAgfVxuICAgICAgICBwb3NYID0gcG9zWCArIDQ7XG4gICAgICAgIHR1cnRsZXMgPSBbXG4gICAgICAgICAgICAuLi50dXJ0bGVzLFxuICAgICAgICAgICAgLi4uc2l6ZTNUdXJ0bGVcbiAgICAgICAgXTtcbiAgICAgIH1cbiAgICAgIGlmKGkgPT0gNCl7XG4gICAgICAgIGxpbmUgPSAyO1xuICAgICAgICBwb3NYID0gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHR1cnRsZXM7XG4gIH0sXG5cbiAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gNTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFR1cnRsZVNlcnZpY2U7XG4iLCJpbXBvcnQgU3RhdGljT2JqZWN0IGZyb20gJy4uL1N0YXRpY09iamVjdC5qcyc7XG5pbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4vV2F0ZXJTZXJ2aWNlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0ZXIgZXh0ZW5kcyBTdGF0aWNPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMucG9zWSA9IFdhdGVyU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gIH1cblxuICBzZXRXYXRlclBvc2l0aW9uKGJvYXJkKXtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwid2F0ZXJcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFdhdGVyIGZyb20gJy4vV2F0ZXIuanMnO1xuXG5jb25zdCBXYXRlclNlcnZpY2UgPSB7XG4gIGNyZWF0ZVdhdGVyOiAoKSA9PiB7XG4gICAgICBsZXQgd2F0ZXJPYmpzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDcwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3YXRlciA9IG5ldyBXYXRlcihwb3NYLCBsaW5lKTtcbiAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgMVxuICAgICAgICAgICAgd2F0ZXJPYmpzLnB1c2god2F0ZXIpO1xuICAgICAgICAgIGlmIChpICUgMTQgPT0gMCkge1xuICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICAgIHBvc1ggPSAwO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3YXRlck9ianM7XG4gIH0sXG5cbiAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gNTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdhdGVyU2VydmljZTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgfTtcblxuICAgIHN1YnNjcmliZShldmVudE5hbWUsIGZuKSB7XG4gICAgICAhdGhpcy5ldmVudHNbZXZlbnROYW1lXSA/IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXSA6IGZhbHNlO1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcblxuICAgICAgcmV0dXJuICgpID0+e1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoZXZlbnRGbiA9PiBmbiAhPT0gZXZlbnRGbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGVtaXQoZXZlbnROYW1lLCBkYXRhKXtcbiAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXTtcbiAgICAgIGlmKGV2ZW50KXtcbiAgICAgICAgZXZlbnQuZm9yRWFjaChmbiA9PntcbiAgICAgICAgICBmbi5jYWxsKG51bGwsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xufVxuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9Db21wb25lbnRzL0dhbWUuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT57XG4gIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgZ2FtZS5zdGFydEdhbWUoKTtcbn0pO1xuIl19
