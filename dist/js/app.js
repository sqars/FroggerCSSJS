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
            };
            for (var _i = 1, _speed = 900; _i <= 2; _i++) {
                this.startMovingLine(this.turtles, _i, _speed);
                _speed = 700;
            };
            for (var _i2 = 1, _speed2 = 900; _i2 <= 3; _i2++) {
                this.startMovingLine(this.wood, _i2, _speed2);
                _speed2 = _speed2 - 200;
            };
            var divingTurtles = this.turtles.filter(function (turtle) {
                return turtle.diving;
            });
            window.setInterval(function () {
                divingTurtles.forEach(function (turtle) {
                    turtle.dived = !turtle.dived;
                });
            }, 1000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Nb3ZpbmdPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9TdGF0aWNPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9UdXJ0bGVzL1R1cnRsZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1dhdGVyL1dhdGVyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kU2VydmljZS5qcyIsInNyYy9qcy9FdmVudEVtaXR0ZXIuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEs7QUFDakIscUJBQWM7QUFBQTs7QUFDVixhQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0EsYUFBSyxPQUFMLEdBQWUsdUJBQWY7QUFDQSxhQUFLLElBQUwsR0FBWSxxQkFBVyxVQUFYLEVBQVo7QUFDQSxhQUFLLE9BQUwsR0FBZSx3QkFBYyxhQUFkLEVBQWY7QUFDQSxhQUFLLEtBQUwsR0FBYSx1QkFBYSxXQUFiLEVBQWI7QUFDQSxhQUFL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LE9BQUMsS0FBSyxNQUFMLENBQVksU0FBWixDQUFELEdBQTBCLEtBQUssTUFBTCxDQUFZLFNBQVosSUFBeUIsRUFBbkQsR0FBd0QsS0FBeEQ7QUFDQSxXQUFLLE1BQUwsQ0FBWSxTQUFaLEVBQXVCLElBQXZCLENBQTRCLEVBQTVCOztBQUVBLGFBQU8sWUFBSztBQUNWLGNBQUssTUFBTCxDQUFZLFNBQVosSUFBeUIsTUFBSyxNQUFMLENBQVksU0FBWixFQUF1QixNQUF2QixDQUE4QjtBQUFBLGlCQUFXLE9BQU8sT0FBbEI7QUFBQSxTQUE5QixDQUF6QjtBQUNELE9BRkQ7QUFHRDs7O3lCQUVJLFMsRUFBVyxJLEVBQUs7QUFDbkIsVUFBTSxRQUFRLEtBQUssTUFBTCxDQUFZLFNBQVosQ0FBZDtBQUNBLFVBQUcsS0FBSCxFQUFTO0FBQ1AsY0FBTSxPQUFOLENBQWMsY0FBSztBQUNqQixhQUFHLElBQUgsQ0FBUSxJQUFSLEVBQWMsSUFBZDtBQUNELFNBRkQ7QUFHRDtBQUNGOzs7Ozs7a0JBckJnQixZOzs7OztBQ0FyQjs7Ozs7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBSztBQUNqRCxNQUFJLE9BQU8sb0JBQVg7QUFDQSxPQUFLLFNBQUw7QUFDRCxDQUhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBGcm9nZ2VyIGZyb20gJy4uL0Zyb2dnZXIuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi4vQ2Fycy9DYXJTZXJ2aWNlLmpzJztcbmltcG9ydCBCb2FyZFNlcnZpY2UgZnJvbSAnLi9Cb2FyZFNlcnZpY2UuanMnO1xuaW1wb3J0IFR1cnRsZVNlcnZpY2UgZnJvbSAnLi4vVHVydGxlcy9UdXJ0bGVTZXJ2aWNlLmpzJztcbmltcG9ydCBXYXRlclNlcnZpY2UgZnJvbSAnLi4vV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzJztcbmltcG9ydCBXb29kU2VydmljZSBmcm9tICcuLi9Xb29kL1dvb2RTZXJ2aWNlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gbnVsbDtcbiAgICAgICAgdGhpcy5mcm9nZ2VyID0gbmV3IEZyb2dnZXIoKTtcbiAgICAgICAgdGhpcy5jYXJzID0gQ2FyU2VydmljZS5jcmVhdGVDYXJzKCk7XG4gICAgICAgIHRoaXMudHVydGxlcyA9IFR1cnRsZVNlcnZpY2UuY3JlYXRlVHVydGxlcygpO1xuICAgICAgICB0aGlzLndhdGVyID0gV2F0ZXJTZXJ2aWNlLmNyZWF0ZVdhdGVyKCk7XG4gICAgICAgIHRoaXMud29vZCA9IFdvb2RTZXJ2aWNlLmNyZWF0ZVdvb2QoKTtcbiAgICAgICAgdGhpcy5zYWlsRWxlbWVudCA9IG51bGw7XG4gICAgfTtcblxuICAgIHNldEJvYXJkKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2JvYXJkIGRpdicpO1xuICAgICAgICBCb2FyZFNlcnZpY2UuY2xlYXJCb2FyZCh0aGlzLmJvYXJkKTtcbiAgICAgICAgdGhpcy53YXRlci5mb3JFYWNoKHdhdGVyT2JqID0+IHdhdGVyT2JqLnNldFdhdGVyUG9zaXRpb24odGhpcy5ib2FyZCkpO1xuICAgICAgICB0aGlzLnNhaWxFbGVtZW50ID8gdGhpcy5zYWlsRWxlbWVudC5zYWlsRnJvZ2dlcih0aGlzLmZyb2dnZXIpIDogZmFsc2U7XG4gICAgICAgIHRoaXMudHVydGxlcy5mb3JFYWNoKHR1cnRsZSA9PiB0dXJ0bGUuc2V0VHVydGxlUG9zaXRpb24odGhpcy5ib2FyZCkpO1xuICAgICAgICB0aGlzLndvb2QuZm9yRWFjaCh3b29kID0+IHdvb2Quc2V0V29vZFBvc2l0aW9uKHRoaXMuYm9hcmQpKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyLnNldEZyb2dnZXJQb3NpdGlvbih0aGlzLmJvYXJkKTtcbiAgICAgICAgdGhpcy5jYXJzLmZvckVhY2goY2FyID0+IGNhci5zZXRDYXJQb3NpdGlvbih0aGlzLmJvYXJkKSk7XG4gICAgICAgIC8vIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICB9O1xuXG4gICAgbW92ZUZyb2dnZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mcm9nZ2VyLm1vdmUoZXZlbnQpO1xuICAgICAgICBsZXQgdHVydGxlQ29sbGlzaW9uID0gQm9hcmRTZXJ2aWNlLmNoZWNrQ29sbGlzaW9uKHRoaXMuZnJvZ2dlciwgdGhpcy50dXJ0bGVzKTtcbiAgICAgICAgbGV0IHdvb2RDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLndvb2QpO1xuICAgICAgICBpZiAodHVydGxlQ29sbGlzaW9uKSB7XG4gICAgICAgICAgICBsZXQgc2FpbFR1cnRsZSA9IHRoaXMudHVydGxlcy5maWx0ZXIodHVydGxlID0+IHR1cnRsZS5nZXRQb3NpdGlvbigpID09PSB0dXJ0bGVDb2xsaXNpb24pO1xuICAgICAgICAgICAgdGhpcy5zYWlsRWxlbWVudCA9IHNhaWxUdXJ0bGVbMF07XG4gICAgICAgIH0gZWxzZSBpZiAod29vZENvbGxpc2lvbikge1xuICAgICAgICAgICAgbGV0IHNhaWxXb29kID0gdGhpcy53b29kLmZpbHRlcih3b29kID0+IHdvb2QuZ2V0UG9zaXRpb24oKSA9PT0gd29vZENvbGxpc2lvbik7XG4gICAgICAgICAgICB0aGlzLnNhaWxFbGVtZW50ID0gc2FpbFdvb2RbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNhaWxFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRCb2FyZCgpO1xuICAgIH07XG5cbiAgICBjaGVja0NvbGxpc2lvbigpIHtcbiAgICAgICAgbGV0IGNvbGxpc2lvbiA9IGZhbHNlO1xuICAgICAgICBsZXQgY2FyQ29sbGlzaW9uID0gQm9hcmRTZXJ2aWNlLmNoZWNrQ29sbGlzaW9uKHRoaXMuZnJvZ2dlciwgdGhpcy5jYXJzKTtcbiAgICAgICAgbGV0IHdhdGVyQ29sbGlzaW9uID0gQm9hcmRTZXJ2aWNlLmNoZWNrQ29sbGlzaW9uKHRoaXMuZnJvZ2dlciwgdGhpcy53YXRlcik7XG4gICAgICAgIGxldCB0dXJ0bGVDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLnR1cnRsZXMpO1xuICAgICAgICBsZXQgd29vZENvbGxpc2lvbiA9IEJvYXJkU2VydmljZS5jaGVja0NvbGxpc2lvbih0aGlzLmZyb2dnZXIsIHRoaXMud29vZCk7XG4gICAgICAgIGNhckNvbGxpc2lvbiAhPT0gZmFsc2UgfHwgd2F0ZXJDb2xsaXNpb24gIT09IGZhbHNlID8gY29sbGlzaW9uID0gdHJ1ZSA6IGZhbHNlOyAvLyBUT0RPOiBjaGVjayB0aGlzIGNvbmRpdGlvblxuICAgICAgICB0dXJ0bGVDb2xsaXNpb24gPyBjb2xsaXNpb24gPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgICB3b29kQ29sbGlzaW9uID8gY29sbGlzaW9uID0gZmFsc2UgOiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGNvbGxpc2lvbjtcbiAgICB9O1xuXG4gICAgc3RhcnRNb3ZpbmdMaW5lKG9iamVjdHMsIGxpbmUsIHNwZWVkID0gMTAwMCkge1xuICAgICAgICByZXR1cm4gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZExpbmUgPSBvYmplY3RzLmZpbHRlcihvYmogPT4gb2JqLmxpbmUgPT0gbGluZSk7XG4gICAgICAgICAgICBmaWx0ZXJlZExpbmUuZm9yRWFjaChvYmogPT4gb2JqLm1vdmUoKSk7XG4gICAgICAgICAgICB0aGlzLnNldEJvYXJkKCk7XG4gICAgICAgIH0sIHNwZWVkKTsgLy8gVE9ETzogYWRkIHNwZWVkIGZ1bmN0aW9uYWxpdHlcbiAgICB9O1xuXG4gICAgc3RhcnRCb2FyZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIHNwZWVkID0gMTEwMDsgaSA8PSA1OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRNb3ZpbmdMaW5lKHRoaXMuY2FycywgaSwgc3BlZWQpO1xuICAgICAgICAgICAgc3BlZWQgPSBzcGVlZCAtIDEwMDtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIHNwZWVkID0gOTAwOyBpIDw9IDI7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zdGFydE1vdmluZ0xpbmUodGhpcy50dXJ0bGVzLCBpLCBzcGVlZCk7XG4gICAgICAgICAgICBzcGVlZCA9IDcwMDtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIHNwZWVkID0gOTAwOyBpIDw9IDM7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zdGFydE1vdmluZ0xpbmUodGhpcy53b29kLCBpLCBzcGVlZCk7XG4gICAgICAgICAgICBzcGVlZCA9IHNwZWVkIC0gMjAwO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgZGl2aW5nVHVydGxlcyA9IHRoaXMudHVydGxlcy5maWx0ZXIodHVydGxlID0+IHR1cnRsZS5kaXZpbmcpO1xuICAgICAgICB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGRpdmluZ1R1cnRsZXMuZm9yRWFjaCgodHVydGxlKSA9PntcbiAgICAgICAgICAgIHR1cnRsZS5kaXZlZCA9ICF0dXJ0bGUuZGl2ZWQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH07XG5cbn1cbiIsImNvbnN0IEJvYXJkU2VydmljZSA9IHtcblxuICBjbGVhckJvYXJkOiAoYm9hcmQpID0+IHtcbiAgICBib2FyZC5mb3JFYWNoKChkaXYpPT57XG4gICAgICBkaXYuY2xhc3NOYW1lID0gXCJcIjtcbiAgICB9KVxuICB9LFxuXG4gIGNoZWNrQ29sbGlzaW9uKGZyb2dnZXIsIGVsZW1lbnRzKXtcbiAgICBsZXQgZnJvZ2dlclBvcyA9IGZyb2dnZXIuZ2V0UG9zaXRpb24oKTtcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgZWxlbWVudHMuZm9yRWFjaChlbGVtID0+IGVsZW0uZ2V0UG9zaXRpb24oKSA9PT0gZnJvZ2dlclBvcyA/IHJlc3VsdCA9IGZyb2dnZXJQb3MgOiBmYWxzZSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQm9hcmRTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi9DYXJTZXJ2aWNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuXG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5wb3NZID0gQ2FyU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBDYXJTZXJ2aWNlLmdlbmVyYXRlRGlyZWN0aW9uKGxpbmUpO1xuICB9XG5cbiAgc2V0Q2FyUG9zaXRpb24oYm9hcmQpe1xuICAgIHRoaXMucG9zWCA+IDEzID8gdGhpcy5wb3NYID0gMCA6IGZhbHNlO1xuICAgIHRoaXMucG9zWCA8IDAgPyB0aGlzLnBvc1ggPSAxMyA6IGZhbHNlO1xuICAgIGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24oKV0uY2xhc3NOYW1lID0gXCJjYXJcIjtcbiAgfVxuXG59XG4iLCJpbXBvcnQgQ2FyIGZyb20gJy4vQ2FyLmpzJztcblxuY29uc3QgQ2FyU2VydmljZSA9ICB7XG5cbiAgICBjcmVhdGVDYXJzOiAoKSA9PiB7XG4gICAgICAgIGxldCBjYXJzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDA7IGkgPD0gMTU7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNhcjtcbiAgICAgICAgICAgIGlmKGxpbmUgPT09IDUpe1xuICAgICAgICAgICAgICBsZXQgc2l6ZTNDYXIgPSBbXTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIG5ld1Bvc1ggPSBwb3NYOyBqIDwgMzsgaisrKSB7XG4gICAgICAgICAgICAgICAgICBjYXIgPSBuZXcgQ2FyKG5ld1Bvc1gsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgICAgICAgc2l6ZTNDYXIucHVzaChjYXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgNDtcbiAgICAgICAgICAgICAgY2FycyA9IFtcbiAgICAgICAgICAgICAgICAgIC4uLmNhcnMsXG4gICAgICAgICAgICAgICAgICAuLi5zaXplM0NhclxuICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICBjYXIgPSBuZXcgQ2FyKHBvc1gsIGxpbmUpO1xuICAgICAgICAgICAgICBwb3NYID0gcG9zWCArIDNcbiAgICAgICAgICAgICAgY2Fycy5wdXNoKGNhcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSAlIDMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDY7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FycztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlRGlyZWN0aW9uOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vTW92aW5nT2JqZWN0LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJvZ2dlciBleHRlbmRzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBsaXZlcyl7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnBvc1ggPSA3O1xuICAgIHRoaXMucG9zWSA9IDEyO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICB0aGlzLmxpdmVzID0gMztcbiAgfTtcblxuICBzZXRGcm9nZ2VyUG9zaXRpb24oYm9hcmQpe1xuICAgIGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24oKV0uY2xhc3NOYW1lID0gXCJmcm9nZ2VyXCI7XG4gIH07XG5cbiAgbW92ZShldmVudCl7XG4gICAgc3dpdGNoKGV2ZW50LndoaWNoKXtcbiAgICAgIGNhc2UgMzc6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICB0aGlzLnBvc1gtLTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM4OlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgICAgIHRoaXMucG9zWS0tO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgdGhpcy5wb3NYKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnZG93bic7XG4gICAgICAgIHRoaXMucG9zWSsrO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH07XG4gIH1cblxufVxuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vQm9hcmQvQm9hcmQuanMnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9FdmVudEVtaXR0ZXIuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCgpO1xuICAgIH1cblxuICAgIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgbGV0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvYXJkJyk7XG4gICAgICAgIGdlbmVyYXRlRGl2cyhib2FyZCk7XG4gICAgICAgIHRoaXMuYm9hcmQuc2V0Qm9hcmQoKTtcbiAgICAgICAgdGhpcy5ib2FyZC5zdGFydEJvYXJkKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoKSA9PiB0aGlzLmJvYXJkLm1vdmVGcm9nZ2VyKGV2ZW50KSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZURpdnMoYm9hcmQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE4MjsgaSsrKSB7XG4gICAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24pe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCl7XG4gICAgICByZXR1cm4gdGhpcy5wb3NYICsgdGhpcy5wb3NZICogMTQ7XG4gIH1cblxuICBtb3ZlKCl7XG4gICAgc3dpdGNoKHRoaXMuZGlyZWN0aW9uKXtcbiAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgIHRoaXMucG9zWC0tO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgdGhpcy5wb3NYKys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgfVxuXG4gIHNhaWxGcm9nZ2VyKGZyb2dnZXIpe1xuICAgIGZyb2dnZXIucG9zWCA9IHRoaXMucG9zWDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGljT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZKXtcbiAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgIHRoaXMucG9zWSA9IHBvc1k7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpe1xuICAgICAgcmV0dXJuIHRoaXMucG9zWCArIHRoaXMucG9zWSAqIDE0O1xuICB9XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuL1R1cnRsZVNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdXJ0bGUgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIGRpdmluZyl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnBvc1kgPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICB0aGlzLmRpdmluZyA9IGRpdmluZztcbiAgICB0aGlzLmRpdmVkID0gZmFsc2U7XG4gIH1cblxuICBzZXRUdXJ0bGVQb3NpdGlvbihib2FyZCl7XG4gICAgdGhpcy5wb3NYIDwgMCA/IHRoaXMucG9zWCA9IDEzIDogZmFsc2U7XG4gICAgdGhpcy5kaXZlZCA/IGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24oKV0uY2xhc3NOYW1lID0gXCJ0dXJ0bGUtZGl2aW5nXCIgOiBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwidHVydGxlXCI7XG4gICAgLy8gYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcInR1cnRsZVwiO1xuICB9XG59XG4iLCJpbXBvcnQgVHVydGxlIGZyb20gJy4vVHVydGxlLmpzJztcblxuY29uc3QgVHVydGxlU2VydmljZSA9IHtcblxuICBjcmVhdGVUdXJ0bGVzOiAoKSA9PntcbiAgICBsZXQgdHVydGxlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgZGl2aW5nID0gZmFsc2UsIHBvc1ggPSAzOyBpIDw9IDc7IGkrKykge1xuICAgICAgbGV0IHR1cnRsZTtcbiAgICAgIGlmKGxpbmUgPT0gMSl7XG4gICAgICAgIGxldCBzaXplMlR1cnRsZSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAyOyBqKyspIHtcbiAgICAgICAgICAgIHR1cnRsZSA9IG5ldyBUdXJ0bGUobmV3UG9zWCwgbGluZSwgZGl2aW5nKTtcbiAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgIHNpemUyVHVydGxlLnB1c2godHVydGxlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcG9zWCA9IHBvc1ggKyAzO1xuICAgICAgICB0dXJ0bGVzID0gW1xuICAgICAgICAgICAgLi4udHVydGxlcyxcbiAgICAgICAgICAgIC4uLnNpemUyVHVydGxlXG4gICAgICAgIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc2l6ZTNUdXJ0bGUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIG5ld1Bvc1ggPSBwb3NYOyBqIDwgMzsgaisrKSB7XG4gICAgICAgICAgICB0dXJ0bGUgPSBuZXcgVHVydGxlKG5ld1Bvc1gsIGxpbmUsIGRpdmluZyk7XG4gICAgICAgICAgICBuZXdQb3NYKys7XG4gICAgICAgICAgICBzaXplM1R1cnRsZS5wdXNoKHR1cnRsZSk7XG4gICAgICAgIH07XG4gICAgICAgIHBvc1ggPSBwb3NYICsgNDtcbiAgICAgICAgdHVydGxlcyA9IFtcbiAgICAgICAgICAgIC4uLnR1cnRsZXMsXG4gICAgICAgICAgICAuLi5zaXplM1R1cnRsZVxuICAgICAgICBdO1xuICAgICAgfVxuICAgICAgaWYoaSA9PSA0KXtcbiAgICAgICAgbGluZSA9IDI7XG4gICAgICAgIHBvc1ggPSAwO1xuICAgICAgfTtcbiAgICAgIGlmKCBpID09PSAxIHx8IGkgPT09IDQpe1xuICAgICAgICBkaXZpbmcgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGl2aW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0dXJ0bGVzO1xuICB9LFxuXG4gIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIDU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGVTZXJ2aWNlO1xuIiwiaW1wb3J0IFN0YXRpY09iamVjdCBmcm9tICcuLi9TdGF0aWNPYmplY3QuanMnO1xuaW1wb3J0IFdhdGVyU2VydmljZSBmcm9tICcuL1dhdGVyU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyIGV4dGVuZHMgU3RhdGljT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLnBvc1kgPSBXYXRlclNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICB9XG5cbiAgc2V0V2F0ZXJQb3NpdGlvbihib2FyZCl7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcIndhdGVyXCI7XG4gIH1cbn1cbiIsImltcG9ydCBXYXRlciBmcm9tICcuL1dhdGVyLmpzJztcblxuY29uc3QgV2F0ZXJTZXJ2aWNlID0ge1xuICBjcmVhdGVXYXRlcjogKCkgPT4ge1xuICAgICAgbGV0IHdhdGVyT2JqcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSA3MDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgd2F0ZXIgPSBuZXcgV2F0ZXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICBwb3NYID0gcG9zWCArIDFcbiAgICAgICAgICAgIHdhdGVyT2Jqcy5wdXNoKHdhdGVyKTtcbiAgICAgICAgICBpZiAoaSAlIDE0ID09IDApIHtcbiAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgICBwb3NYID0gMDtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2F0ZXJPYmpzO1xuICB9LFxuXG4gIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIDU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgcmV0dXJuIDQ7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBXYXRlclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi9Xb29kU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvb2QgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5wb3NZID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgfVxuXG4gIHNldFdvb2RQb3NpdGlvbihib2FyZCl7XG4gICAgdGhpcy5wb3NYID4gMTMgPyB0aGlzLnBvc1ggPSAwIDogZmFsc2U7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcIndvb2RcIjtcbiAgfVxufVxuIiwiaW1wb3J0IFdvb2QgZnJvbSAnLi9Xb29kLmpzJztcblxuY29uc3QgV29vZFNlcnZpY2UgPSB7XG4gICAgY3JlYXRlV29vZDogKCkgPT4ge1xuICAgICAgICBsZXQgd29vZHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSA3OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0dXJ0bGU7XG4gICAgICAgICAgICBpZiAobGluZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBzaXplM1dvb2QgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZChuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgICAgICAgICBzaXplM1dvb2QucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyA1O1xuICAgICAgICAgICAgICAgIHdvb2RzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi53b29kcyxcbiAgICAgICAgICAgICAgICAgICAgLi4uc2l6ZTNXb29kXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gMikge1xuICAgICAgICAgICAgICAgIGxldCBzaXplNVdvb2QgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCA1OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZChuZXdQb3NYLCBsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgICAgICAgICBzaXplNVdvb2QucHVzaCh3b29kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyA3O1xuICAgICAgICAgICAgICAgIHdvb2RzID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi53b29kcyxcbiAgICAgICAgICAgICAgICAgICAgLi4uc2l6ZTVXb29kXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgc2l6ZTRXb29kID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIG5ld1Bvc1ggPSBwb3NYOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QobmV3UG9zWCwgbGluZSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Bvc1grKztcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTRXb29kLnB1c2god29vZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgODtcbiAgICAgICAgICAgICAgICB3b29kcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ud29vZHMsXG4gICAgICAgICAgICAgICAgICAgIC4uLnNpemU0V29vZFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgcG9zWCA9IDE7XG4gICAgICAgICAgICAgICAgbGluZSA9IDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gNSkge1xuICAgICAgICAgICAgICAgIHBvc1ggPSAwXG4gICAgICAgICAgICAgICAgbGluZSA9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdvb2RzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdvb2RTZXJ2aWNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9O1xuXG4gICAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICF0aGlzLmV2ZW50c1tldmVudE5hbWVdID8gdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdIDogZmFsc2U7XG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXG4gICAgICByZXR1cm4gKCkgPT57XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcihldmVudEZuID0+IGZuICE9PSBldmVudEZuKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZW1pdChldmVudE5hbWUsIGRhdGEpe1xuICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgaWYoZXZlbnQpe1xuICAgICAgICBldmVudC5mb3JFYWNoKGZuID0+e1xuICAgICAgICAgIGZuLmNhbGwobnVsbCwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG59XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0NvbXBvbmVudHMvR2FtZS5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PntcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xufSk7XG4iXX0=
