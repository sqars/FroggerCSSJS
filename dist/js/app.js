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

        this.board = null;
        this.frogger = new _Frogger2.default();
        this.cars = _CarService2.default.createCars();
        this.turtles = _TurtleService2.default.createTurtles();
        this.water = _WaterService2.default.createWater();
        this.wood = _WoodService2.default.createWood();
        this.sailElement = null;
    }

    _createClass(Board, [{
        key: 'setBoard',
        value: function setBoard() {
            var _this = this;

            this.board = document.querySelectorAll('#board div');
            _BoardService2.default.clearBoard(this.board);
            this.water.forEach(function (waterObj) {
                return waterObj.setWaterPosition(_this.board);
            });
            this.sailElement ? this.sailElement.sailFrogger(this.frogger) : false;
            this.turtles.forEach(function (turtle) {
                return turtle.setTurtlePosition(_this.board);
            });
            this.wood.forEach(function (wood) {
                return wood.setWoodPosition(_this.board);
            });
            this.frogger.setFroggerPosition(this.board);
            this.cars.forEach(function (car) {
                return car.setCarPosition(_this.board);
            });
            // this.checkCollision();
        }
    }, {
        key: 'moveFrogger',
        value: function moveFrogger(event) {
            this.frogger.move(event);
            var turtleCollision = _BoardService2.default.checkCollision(this.frogger, this.turtles);
            var woodCollision = _BoardService2.default.checkCollision(this.frogger, this.wood);
            if (turtleCollision) {
                var sailTurtle = this.turtles.filter(function (turtle) {
                    return turtle.getPosition() === turtleCollision;
                });
                this.sailElement = sailTurtle[0];
            } else if (woodCollision) {
                var sailWood = this.wood.filter(function (wood) {
                    return wood.getPosition() === woodCollision;
                });
                this.sailElement = sailWood[0];
            } else {
                this.sailElement = null;
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
            var woodCollision = _BoardService2.default.checkCollision(this.frogger, this.wood);
            carCollision !== false || waterCollision !== false ? collision = true : false; // TODO: check this condition
            turtleCollision ? collision = false : false;
            woodCollision ? collision = false : false;
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
            for (var _i2 = 1, _speed2 = 900; _i2 <= 3; _i2++) {
                this.startMovingLine(this.wood, _i2, _speed2);
                _speed2 = _speed2 - 200;
            }
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

},{"../EventEmitter.js":15,"./Board/Board.js":1}],7:[function(require,module,exports){
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
  }, {
    key: 'sailFrogger',
    value: function sailFrogger(frogger) {
      frogger.posX = this.posX;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Nb3ZpbmdPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9TdGF0aWNPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9UdXJ0bGVzL1R1cnRsZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1dhdGVyL1dhdGVyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kU2VydmljZS5qcyIsInNyYy9qcy9FdmVudEVtaXR0ZXIuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEs7QUFDakIscUJBQWM7QUFBQTs7QUFDVixhQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0EsYUFBSyxPQUFMLEdBQWUsdUJBQWY7QUFDQSxhQUFLLElBQUwsR0FBWSxxQkFBVyxVQUFYLEVBQVo7QUFDQSxhQUFLLE9BQUwsR0FBZSx3QkFBYyxhQUFkLEVBQWY7QUFDQSxhQUFLLEtBQUwsR0FBYSx1QkFBYSxXQUFiLEVBQWI7QUFDQSxhQUFL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QTFCLEVBQThDLFlBQUs7QUFDakQsTUFBSSxPQUFPLG9CQUFYO0FBQ0EsT0FBSyxTQUFMO0FBQ0QsQ0FIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRnJvZ2dlciBmcm9tICcuLi9Gcm9nZ2VyLmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4uL0NhcnMvQ2FyU2VydmljZS5qcyc7XG5pbXBvcnQgQm9hcmRTZXJ2aWNlIGZyb20gJy4vQm9hcmRTZXJ2aWNlLmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4uL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4uL1dhdGVyL1dhdGVyU2VydmljZS5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi4vV29vZC9Xb29kU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG51bGw7XG4gICAgICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKCk7XG4gICAgICAgIHRoaXMuY2FycyA9IENhclNlcnZpY2UuY3JlYXRlQ2FycygpO1xuICAgICAgICB0aGlzLnR1cnRsZXMgPSBUdXJ0bGVTZXJ2aWNlLmNyZWF0ZVR1cnRsZXMoKTtcbiAgICAgICAgdGhpcy53YXRlciA9IFdhdGVyU2VydmljZS5jcmVhdGVXYXRlcigpO1xuICAgICAgICB0aGlzLndvb2QgPSBXb29kU2VydmljZS5jcmVhdGVXb29kKCk7XG4gICAgICAgIHRoaXMuc2FpbEVsZW1lbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICBzZXRCb2FyZCgpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNib2FyZCBkaXYnKTtcbiAgICAgICAgQm9hcmRTZXJ2aWNlLmNsZWFyQm9hcmQodGhpcy5ib2FyZCk7XG4gICAgICAgIHRoaXMud2F0ZXIuZm9yRWFjaCggd2F0ZXJPYmogPT4gd2F0ZXJPYmouc2V0V2F0ZXJQb3NpdGlvbih0aGlzLmJvYXJkKSk7XG4gICAgICAgIHRoaXMuc2FpbEVsZW1lbnQgPyB0aGlzLnNhaWxFbGVtZW50LnNhaWxGcm9nZ2VyKHRoaXMuZnJvZ2dlcikgOiBmYWxzZTtcbiAgICAgICAgdGhpcy50dXJ0bGVzLmZvckVhY2goIHR1cnRsZSA9PiB0dXJ0bGUuc2V0VHVydGxlUG9zaXRpb24odGhpcy5ib2FyZCkpO1xuICAgICAgICB0aGlzLndvb2QuZm9yRWFjaCggd29vZCA9PiB3b29kLnNldFdvb2RQb3NpdGlvbih0aGlzLmJvYXJkKSk7XG4gICAgICAgIHRoaXMuZnJvZ2dlci5zZXRGcm9nZ2VyUG9zaXRpb24odGhpcy5ib2FyZCk7XG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKCBjYXIgPT4gY2FyLnNldENhclBvc2l0aW9uKHRoaXMuYm9hcmQpKTtcbiAgICAgICAgLy8gdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgIH07XG5cbiAgICBtb3ZlRnJvZ2dlcihldmVudCkge1xuICAgICAgICB0aGlzLmZyb2dnZXIubW92ZShldmVudCk7XG4gICAgICAgIGxldCB0dXJ0bGVDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLnR1cnRsZXMpO1xuICAgICAgICBsZXQgd29vZENvbGxpc2lvbiA9IEJvYXJkU2VydmljZS5jaGVja0NvbGxpc2lvbih0aGlzLmZyb2dnZXIsIHRoaXMud29vZCk7XG4gICAgICAgIGlmICh0dXJ0bGVDb2xsaXNpb24pIHtcbiAgICAgICAgICAgIGxldCBzYWlsVHVydGxlID0gdGhpcy50dXJ0bGVzLmZpbHRlcih0dXJ0bGUgPT4gdHVydGxlLmdldFBvc2l0aW9uKCkgPT09IHR1cnRsZUNvbGxpc2lvbik7XG4gICAgICAgICAgICB0aGlzLnNhaWxFbGVtZW50ID0gc2FpbFR1cnRsZVswXTtcbiAgICAgICAgfWVsc2UgaWYod29vZENvbGxpc2lvbil7XG4gICAgICAgICAgICBsZXQgc2FpbFdvb2QgPSB0aGlzLndvb2QuZmlsdGVyKHdvb2QgPT4gd29vZC5nZXRQb3NpdGlvbigpID09PSB3b29kQ29sbGlzaW9uKTtcbiAgICAgICAgICAgIHRoaXMuc2FpbEVsZW1lbnQgPSBzYWlsV29vZFswXTtcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgdGhpcy5zYWlsRWxlbWVudCA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0Qm9hcmQoKTtcbiAgICB9O1xuXG4gICAgY2hlY2tDb2xsaXNpb24oKSB7XG4gICAgICAgIGxldCBjb2xsaXNpb24gPSBmYWxzZTtcbiAgICAgICAgbGV0IGNhckNvbGxpc2lvbiA9IEJvYXJkU2VydmljZS5jaGVja0NvbGxpc2lvbih0aGlzLmZyb2dnZXIsIHRoaXMuY2Fycyk7XG4gICAgICAgIGxldCB3YXRlckNvbGxpc2lvbiA9IEJvYXJkU2VydmljZS5jaGVja0NvbGxpc2lvbih0aGlzLmZyb2dnZXIsIHRoaXMud2F0ZXIpO1xuICAgICAgICBsZXQgdHVydGxlQ29sbGlzaW9uID0gQm9hcmRTZXJ2aWNlLmNoZWNrQ29sbGlzaW9uKHRoaXMuZnJvZ2dlciwgdGhpcy50dXJ0bGVzKTtcbiAgICAgICAgbGV0IHdvb2RDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLndvb2QpO1xuICAgICAgICBjYXJDb2xsaXNpb24gIT09IGZhbHNlIHx8IHdhdGVyQ29sbGlzaW9uICE9PSBmYWxzZSA/IGNvbGxpc2lvbiA9IHRydWUgOiBmYWxzZTsgLy8gVE9ETzogY2hlY2sgdGhpcyBjb25kaXRpb25cbiAgICAgICAgdHVydGxlQ29sbGlzaW9uID8gY29sbGlzaW9uID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgd29vZENvbGxpc2lvbiA/IGNvbGxpc2lvbiA9IGZhbHNlIDogZmFsc2U7XG4gICAgICAgIHJldHVybiBjb2xsaXNpb247XG4gICAgfTtcblxuICAgIHN0YXJ0TW92aW5nTGluZShvYmplY3RzLCBsaW5lLCBzcGVlZCA9IDEwMDApIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gb2JqZWN0cy5maWx0ZXIob2JqID0+IG9iai5saW5lID09IGxpbmUpO1xuICAgICAgICAgICAgZmlsdGVyZWRMaW5lLmZvckVhY2gob2JqID0+IG9iai5tb3ZlKCkpO1xuICAgICAgICAgICAgdGhpcy5zZXRCb2FyZCgpO1xuICAgICAgICB9LCBzcGVlZCk7IC8vIFRPRE86IGFkZCBzcGVlZCBmdW5jdGlvbmFsaXR5XG4gICAgfTtcblxuICAgIHN0YXJ0Qm9hcmQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxLCBzcGVlZCA9IDExMDA7IGkgPD0gNTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0TW92aW5nTGluZSh0aGlzLmNhcnMsIGksIHNwZWVkKTtcbiAgICAgICAgICAgIHNwZWVkID0gc3BlZWQgLSAxMDA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIHNwZWVkID0gOTAwOyBpIDw9IDI7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zdGFydE1vdmluZ0xpbmUodGhpcy50dXJ0bGVzLCBpLCBzcGVlZCk7XG4gICAgICAgICAgICBzcGVlZCA9IDcwMDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMSwgc3BlZWQgPSA5MDA7IGkgPD0gMzsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0TW92aW5nTGluZSh0aGlzLndvb2QsIGksIHNwZWVkKTtcbiAgICAgICAgICAgIHNwZWVkID0gc3BlZWQgLSAyMDA7XG4gICAgICAgIH1cbiAgICB9O1xuXG59XG4iLCJjb25zdCBCb2FyZFNlcnZpY2UgPSB7XG5cbiAgY2xlYXJCb2FyZDogKGJvYXJkKSA9PiB7XG4gICAgYm9hcmQuZm9yRWFjaCgoZGl2KT0+e1xuICAgICAgZGl2LmNsYXNzTmFtZSA9IFwiXCI7XG4gICAgfSlcbiAgfSxcblxuICBjaGVja0NvbGxpc2lvbihmcm9nZ2VyLCBlbGVtZW50cyl7XG4gICAgbGV0IGZyb2dnZXJQb3MgPSBmcm9nZ2VyLmdldFBvc2l0aW9uKCk7XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbSA9PiBlbGVtLmdldFBvc2l0aW9uKCkgPT09IGZyb2dnZXJQb3MgPyByZXN1bHQgPSBmcm9nZ2VyUG9zIDogZmFsc2UpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJvYXJkU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4vQ2FyU2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhciBleHRlbmRzIE1vdmluZ09iamVjdHtcblxuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMucG9zWSA9IENhclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gQ2FyU2VydmljZS5nZW5lcmF0ZURpcmVjdGlvbihsaW5lKTtcbiAgfVxuXG4gIHNldENhclBvc2l0aW9uKGJvYXJkKXtcbiAgICB0aGlzLnBvc1ggPiAxMyA/IHRoaXMucG9zWCA9IDAgOiBmYWxzZTtcbiAgICB0aGlzLnBvc1ggPCAwID8gdGhpcy5wb3NYID0gMTMgOiBmYWxzZTtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwiY2FyXCI7XG4gIH1cblxufVxuIiwiaW1wb3J0IENhciBmcm9tICcuL0Nhci5qcyc7XG5cbmNvbnN0IENhclNlcnZpY2UgPSAge1xuXG4gICAgY3JlYXRlQ2FyczogKCkgPT4ge1xuICAgICAgICBsZXQgY2FycyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDE1OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjYXI7XG4gICAgICAgICAgICBpZihsaW5lID09PSA1KXtcbiAgICAgICAgICAgICAgbGV0IHNpemUzQ2FyID0gW107XG4gICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBuZXdQb3NYID0gcG9zWDsgaiA8IDM7IGorKykge1xuICAgICAgICAgICAgICAgICAgY2FyID0gbmV3IENhcihuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgICAgICAgIHNpemUzQ2FyLnB1c2goY2FyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwb3NYID0gcG9zWCArIDQ7XG4gICAgICAgICAgICAgIGNhcnMgPSBbXG4gICAgICAgICAgICAgICAgICAuLi5jYXJzLFxuICAgICAgICAgICAgICAgICAgLi4uc2l6ZTNDYXJcbiAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgY2FyID0gbmV3IENhcihwb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyAzXG4gICAgICAgICAgICAgIGNhcnMucHVzaChjYXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSA2O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhcnM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDExO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiA4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiA3O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZURpcmVjdGlvbjogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL01vdmluZ09iamVjdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb2dnZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbiwgbGl2ZXMpe1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5wb3NYID0gNztcbiAgICB0aGlzLnBvc1kgPSAxMjtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgdGhpcy5saXZlcyA9IDM7XG4gIH07XG5cbiAgc2V0RnJvZ2dlclBvc2l0aW9uKGJvYXJkKXtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwiZnJvZ2dlclwiO1xuICB9O1xuXG4gIG1vdmUoZXZlbnQpe1xuICAgIHN3aXRjaChldmVudC53aGljaCl7XG4gICAgICBjYXNlIDM3OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgdGhpcy5wb3NYLS07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICB0aGlzLnBvc1ktLTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gICAgICAgIHRoaXMucG9zWCsrO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgICAgICB0aGlzLnBvc1krKztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9O1xuICB9XG5cbn1cbiIsImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkL0JvYXJkLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vRXZlbnRFbWl0dGVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIGxldCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpO1xuICAgICAgICBnZW5lcmF0ZURpdnMoYm9hcmQpO1xuICAgICAgICB0aGlzLmJvYXJkLnNldEJvYXJkKCk7XG4gICAgICAgIHRoaXMuYm9hcmQuc3RhcnRCb2FyZCgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKCkgPT4gdGhpcy5ib2FyZC5tb3ZlRnJvZ2dlcihldmVudCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVEaXZzKGJvYXJkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxODI7IGkrKykge1xuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGRpdik7XG4gICAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgcG9zWSwgZGlyZWN0aW9uKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgIHRoaXMucG9zWSA9IHBvc1k7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gIH1cblxuICBnZXRQb3NpdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMucG9zWCArIHRoaXMucG9zWSAqIDE0O1xuICB9XG5cbiAgbW92ZSgpe1xuICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbil7XG4gICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICB0aGlzLnBvc1gtLTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIHRoaXMucG9zWCsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gIH1cblxuICBzYWlsRnJvZ2dlcihmcm9nZ2VyKXtcbiAgICBmcm9nZ2VyLnBvc1ggPSB0aGlzLnBvc1g7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpY09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgcG9zWSl7XG4gICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICB0aGlzLnBvc1kgPSBwb3NZO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLnBvc1ggKyB0aGlzLnBvc1kgKiAxNDtcbiAgfVxufVxuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IFR1cnRsZVNlcnZpY2UgZnJvbSAnLi9UdXJ0bGVTZXJ2aWNlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHVydGxlIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMucG9zWSA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICB9XG5cbiAgc2V0VHVydGxlUG9zaXRpb24oYm9hcmQpe1xuICAgIHRoaXMucG9zWCA8IDAgPyB0aGlzLnBvc1ggPSAxMyA6IGZhbHNlO1xuICAgIGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24oKV0uY2xhc3NOYW1lID0gXCJ0dXJ0bGVcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFR1cnRsZSBmcm9tICcuL1R1cnRsZS5qcyc7XG5cbmNvbnN0IFR1cnRsZVNlcnZpY2UgPSB7XG5cbiAgY3JlYXRlVHVydGxlczogKCkgPT57XG4gICAgbGV0IHR1cnRsZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAzOyBpIDw9IDc7IGkrKykge1xuICAgICAgbGV0IHR1cnRsZTtcbiAgICAgIGlmKGxpbmUgPT0gMSl7XG4gICAgICAgIGxldCBzaXplMlR1cnRsZSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAyOyBqKyspIHtcbiAgICAgICAgICAgIHR1cnRsZSA9IG5ldyBUdXJ0bGUobmV3UG9zWCwgbGluZSk7XG4gICAgICAgICAgICBuZXdQb3NYKys7XG4gICAgICAgICAgICBzaXplMlR1cnRsZS5wdXNoKHR1cnRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcG9zWCA9IHBvc1ggKyAzO1xuICAgICAgICB0dXJ0bGVzID0gW1xuICAgICAgICAgICAgLi4udHVydGxlcyxcbiAgICAgICAgICAgIC4uLnNpemUyVHVydGxlXG4gICAgICAgIF07XG4gICAgICB9IGVsc2V7XG4gICAgICAgIGxldCBzaXplM1R1cnRsZSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgIHR1cnRsZSA9IG5ldyBUdXJ0bGUobmV3UG9zWCwgbGluZSk7XG4gICAgICAgICAgICBuZXdQb3NYKys7XG4gICAgICAgICAgICBzaXplM1R1cnRsZS5wdXNoKHR1cnRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcG9zWCA9IHBvc1ggKyA0O1xuICAgICAgICB0dXJ0bGVzID0gW1xuICAgICAgICAgICAgLi4udHVydGxlcyxcbiAgICAgICAgICAgIC4uLnNpemUzVHVydGxlXG4gICAgICAgIF07XG4gICAgICB9XG4gICAgICBpZihpID09IDQpe1xuICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgcG9zWCA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0dXJ0bGVzO1xuICB9LFxuXG4gIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIDU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGVTZXJ2aWNlO1xuIiwiaW1wb3J0IFN0YXRpY09iamVjdCBmcm9tICcuLi9TdGF0aWNPYmplY3QuanMnO1xuaW1wb3J0IFdhdGVyU2VydmljZSBmcm9tICcuL1dhdGVyU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyIGV4dGVuZHMgU3RhdGljT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLnBvc1kgPSBXYXRlclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICB9XG5cbiAgc2V0V2F0ZXJQb3NpdGlvbihib2FyZCl7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcIndhdGVyXCI7XG4gIH1cbn1cbiIsImltcG9ydCBXYXRlciBmcm9tICcuL1dhdGVyLmpzJztcblxuY29uc3QgV2F0ZXJTZXJ2aWNlID0ge1xuICBjcmVhdGVXYXRlcjogKCkgPT4ge1xuICAgICAgbGV0IHdhdGVyT2JqcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSA3MDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgd2F0ZXIgPSBuZXcgV2F0ZXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICBwb3NYID0gcG9zWCArIDFcbiAgICAgICAgICAgIHdhdGVyT2Jqcy5wdXNoKHdhdGVyKTtcbiAgICAgICAgICBpZiAoaSAlIDE0ID09IDApIHtcbiAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgICBwb3NYID0gMDtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2F0ZXJPYmpzO1xuICB9LFxuXG4gIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIDU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgcmV0dXJuIDQ7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBXYXRlclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi9Xb29kU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvb2QgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5wb3NZID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgfVxuXG4gIHNldFdvb2RQb3NpdGlvbihib2FyZCl7XG4gICAgdGhpcy5wb3NYID4gMTMgPyB0aGlzLnBvc1ggPSAwIDogZmFsc2U7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcIndvb2RcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFdvb2QgZnJvbSAnLi9Xb29kLmpzJztcblxuY29uc3QgV29vZFNlcnZpY2UgPSB7XG4gICAgY3JlYXRlV29vZDogKCkgPT4ge1xuICAgICAgICBsZXQgd29vZHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSA3OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0dXJ0bGU7XG4gICAgICAgICAgICBpZiAobGluZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBzaXplM1dvb2QgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZChuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgICAgICAgICBzaXplM1dvb2QucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyA1O1xuICAgICAgICAgICAgICAgIHdvb2RzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi53b29kcyxcbiAgICAgICAgICAgICAgICAgICAgLi4uc2l6ZTNXb29kXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gMikge1xuICAgICAgICAgICAgICAgIGxldCBzaXplNVdvb2QgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCA1OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZChuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgICAgICAgICBzaXplNVdvb2QucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyA3O1xuICAgICAgICAgICAgICAgIHdvb2RzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi53b29kcyxcbiAgICAgICAgICAgICAgICAgICAgLi4uc2l6ZTVXb29kXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgc2l6ZTRXb29kID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIG5ld1Bvc1ggPSBwb3NYOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QobmV3UG9zWCwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTRXb29kLnB1c2god29vZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgODtcbiAgICAgICAgICAgICAgICB3b29kcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ud29vZHMsXG4gICAgICAgICAgICAgICAgICAgIC4uLnNpemU0V29vZFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgcG9zWCA9IDE7XG4gICAgICAgICAgICAgICAgbGluZSA9IDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gNSkge1xuICAgICAgICAgICAgICAgIHBvc1ggPSAwXG4gICAgICAgICAgICAgICAgbGluZSA9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdvb2RzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdvb2RTZXJ2aWNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9O1xuXG4gICAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICF0aGlzLmV2ZW50c1tldmVudE5hbWVdID8gdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdIDogZmFsc2U7XG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXG4gICAgICByZXR1cm4gKCkgPT57XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcihldmVudEZuID0+IGZuICE9PSBldmVudEZuKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZW1pdChldmVudE5hbWUsIGRhdGEpe1xuICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgaWYoZXZlbnQpe1xuICAgICAgICBldmVudC5mb3JFYWNoKGZuID0+e1xuICAgICAgICAgIGZuLmNhbGwobnVsbCwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG59XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0NvbXBvbmVudHMvR2FtZS5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PntcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xufSk7XG4iXX0=
