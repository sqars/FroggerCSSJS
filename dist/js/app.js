(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Frogger = require('../Frogger.js');

var _Frogger2 = _interopRequireDefault(_Frogger);

var _Water = require('../Water/Water.js');

var _Water2 = _interopRequireDefault(_Water);

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
        this.water = new _Water2.default();
        this.turtles = _TurtleService2.default.createTurtles();
        this.woods = _WoodService2.default.createWood();
    }

    _createClass(Board, [{
        key: 'setBoard',
        value: function setBoard() {
            var _this = this;

            this.context.clearRect(0, 0, this.board.width, this.board.height);
            this.water.drawWater(this.context);
            this.cars.forEach(function (car) {
                return car.drawCar(_this.context);
            });
            this.cars.forEach(function (car) {
                return car.move(_this.cars);
            });
            this.turtles.forEach(function (turtle) {
                return turtle.drawTurtle(_this.context);
            });
            this.turtles.forEach(function (turtle) {
                return turtle.move(_this.turtles);
            });
            this.woods.forEach(function (wood) {
                return wood.drawWood(_this.context);
            });
            this.woods.forEach(function (wood) {
                return wood.move(_this.woods);
            });
            this.frogger.drawFrogger(this.context);
            this.froggerMoving ? this.moveFrogger() : false;
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

},{"../Cars/CarService.js":4,"../Frogger.js":5,"../Turtles/TurtleService.js":9,"../Water/Water.js":10,"../Water/WaterService.js":11,"../Wood/WoodService.js":13,"./BoardService.js":2}],2:[function(require,module,exports){
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

},{"../EventEmitter.js":14,"./Board/Board.js":1}],7:[function(require,module,exports){
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

            var max = void 0;
            var min = void 0;
            switch (this.direction) {
                case 'left':
                    this.posX -= this.speed;
                    if (this.posX < -150) {
                        max = 1000;
                        min = 700;
                        this.posX = Math.random() * (max - min) + min;
                        var filteredObjs = filterObjs(this, objects);
                        filteredObjs.forEach(function (obj) {
                            while (_this.checkCollision(obj)) {
                                _this.posX = Math.random() * (max - min) + min;
                            }
                        });
                    };
                    break;
                case 'right':
                    this.posX += this.speed;
                    if (this.posX > 750) {
                        max = -250;
                        min = -650;
                        this.posX = Math.random() * (max - min) + min;
                        var _filteredObjs = filterObjs(this, objects);
                        _filteredObjs.forEach(function (obj) {
                            while (_this.checkCollision(obj)) {
                                _this.posX = Math.random() * (max - min) + min;
                            }
                        });
                    };
                    break;
                default:
                    break;
            };
        }
    }, {
        key: 'checkCollision',
        value: function checkCollision(obj) {
            var result = false;
            this.posX >= obj.posX - obj.width - 50 && this.posX <= obj.posX + obj.width + 50 ? result = true : false;
            return result;
        }
    }]);

    return MovingObject;
}();

exports.default = MovingObject;
;

function filterObjs(checkedObj, objs) {
    var filteredObjs = objs.filter(function (obj) {
        return obj.line === checkedObj.line;
    });
    var index = filteredObjs.indexOf(checkedObj);
    filteredObjs.splice(index, 1);
    return filteredObjs;
}

},{}],8:[function(require,module,exports){
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

  function Turtle(posX, line, speed) {
    _classCallCheck(this, Turtle);

    var _this = _possibleConstructorReturn(this, (Turtle.__proto__ || Object.getPrototypeOf(Turtle)).call(this, posX));

    _this.line = line;
    _this.speed = speed;
    _this.height = 50;
    _this.width = _TurtleService2.default.generateWidth(line);
    _this.posY = _TurtleService2.default.generateYPos(line);
    _this.direction = 'left';
    return _this;
  }

  _createClass(Turtle, [{
    key: 'drawTurtle',
    value: function drawTurtle(ctx) {
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.fillStyle = "brown";
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return Turtle;
}(_MovingObject3.default);

exports.default = Turtle;

},{"../MovingObject.js":7,"./TurtleService.js":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Turtle = require('./Turtle.js');

var _Turtle2 = _interopRequireDefault(_Turtle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TurtleService = {

    createTurtles: function createTurtles() {
        var turtles = [];
        for (var i = 1, line = 1, posX = Math.random() * (100 - 0) + 0; i <= 7; i++) {
            var turtle = new _Turtle2.default(posX, line, 1);
            if (line == 1) {
                posX = posX + Math.random() * (350 - 200) + 200;
            } else {
                posX = posX + Math.random() * (400 - 300) + 300;
            }
            turtles.push(turtle);
            if (i == 4) {
                line = 2;
                posX = Math.random() * (300 - 100) + 100;
            };
        }
        return turtles;
    },

    generateYPos: function generateYPos(line) {
        switch (line) {
            case 1:
                return 150;
                break;
            case 2:
                return 250;
                break;
            default:
                break;
        }
    },

    generateWidth: function generateWidth(line) {
        switch (line) {
            case 1:
                return 150;
                break;
            default:
                return 100;
                break;
        }
    }

};

exports.default = TurtleService;

},{"./Turtle.js":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WaterService = require("./WaterService.js");

var _WaterService2 = _interopRequireDefault(_WaterService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Water = function () {
  function Water() {
    _classCallCheck(this, Water);

    this.posX = 0;
    this.posY = 50;
    this.height = 250;
    this.width = 700;
  }

  _createClass(Water, [{
    key: "drawWater",
    value: function drawWater(ctx) {
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return Water;
}();

exports.default = Water;

},{"./WaterService.js":11}],11:[function(require,module,exports){
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

},{"./Water.js":10}],12:[function(require,module,exports){
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

  function Wood(posX, line, speed) {
    _classCallCheck(this, Wood);

    var _this = _possibleConstructorReturn(this, (Wood.__proto__ || Object.getPrototypeOf(Wood)).call(this, posX));

    _this.line = line;
    _this.speed = speed;
    _this.height = 50;
    _this.width = _WoodService2.default.generateWidth(line);
    _this.posY = _WoodService2.default.generateYPos(line);
    _this.direction = 'right';
    return _this;
  }

  _createClass(Wood, [{
    key: 'drawWood',
    value: function drawWood(ctx) {
      ctx.beginPath();
      ctx.rect(this.posX, this.posY, this.width, this.height);
      ctx.fillStyle = "beige";
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return Wood;
}(_MovingObject3.default);

exports.default = Wood;

},{"../MovingObject.js":7,"./WoodService.js":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Wood = require('./Wood.js');

var _Wood2 = _interopRequireDefault(_Wood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WoodService = {
    createWood: function createWood() {
        var woods = [];
        for (var i = 1, line = 1, posX = Math.random() * (100 - 0) + 0; i <= 8; i++) {
            var wood = new _Wood2.default(posX, line, 1);
            if (line === 1) {
                posX = posX + Math.random() * (400 - 300) + 300;
            } else if (line === 2) {
                posX = posX + Math.random() * (600 - 500) + 500;
            } else {
                posX = posX + Math.random() * (500 - 400) + 400;
            }
            woods.push(wood);
            if (i == 3) {
                posX = Math.random() * (100 - 0) + 0;
                line = 2;
            } else if (i == 5) {
                posX = Math.random() * (100 - 0) + 0;
                line = 3;
            }
        }
        return woods;
    },

    generateWidth: function generateWidth(line) {
        switch (line) {
            case 1:
                return 150;
                break;
            case 2:
                return 250;
                break;
            case 3:
                return 200;
            default:
                break;
        };
    },

    generateYPos: function generateYPos(line) {
        switch (line) {
            case 1:
                return 200;
                break;
            case 2:
                return 100;
                break;
            case 3:
                return 50;
            default:
                break;
        };
    }
};

exports.default = WoodService;

},{"./Wood.js":12}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
'use strict';

var _Game = require('./Components/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var game = new _Game2.default();
  game.startGame();
});

},{"./Components/Game.js":6}]},{},[15])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Nb3ZpbmdPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9UdXJ0bGVzL1R1cnRsZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1dhdGVyL1dhdGVyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kU2VydmljZS5qcyIsInNyYy9qcy9FdmVudEVtaXR0ZXIuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUIsSztBQUNqQixxQkFBYztBQUFBOztBQUNWLGFBQUssS0FBTCxHQUFhLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsYUFBSyxPQUFMLEdBQWUsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixJQUF0QixDQUFmO0FBQ0EsYUFBSyxPQUFMLEdBQWUsc0JBQVksS0FBSyxLQUFqQixDQUFmO0FBQ0EsYUFBSyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsYUFBSyxJQUFMLEdBQVkscUJB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TUFBdkIsQ0FBOEI7QUFBQSxpQkFBVyxPQUFPLE9BQWxCO0FBQUEsU0FBOUIsQ0FBekI7QUFDRCxPQUZEO0FBR0Q7Ozt5QkFFSSxTLEVBQVcsSSxFQUFLO0FBQ25CLFVBQU0sUUFBUSxLQUFLLE1BQUwsQ0FBWSxTQUFaLENBQWQ7QUFDQSxVQUFHLEtBQUgsRUFBUztBQUNQLGNBQU0sT0FBTixDQUFjLGNBQUs7QUFDakIsYUFBRyxJQUFILENBQVEsSUFBUixFQUFjLElBQWQ7QUFDRCxTQUZEO0FBR0Q7QUFDRjs7Ozs7O2tCQXJCZ0IsWTs7Ozs7QUNBckI7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQUs7QUFDakQsTUFBSSxPQUFPLG9CQUFYO0FBQ0EsT0FBSyxTQUFMO0FBQ0QsQ0FIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRnJvZ2dlciBmcm9tICcuLi9Gcm9nZ2VyLmpzJztcbmltcG9ydCBXYXRlciBmcm9tICcuLi9XYXRlci9XYXRlci5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuLi9DYXJzL0NhclNlcnZpY2UuanMnO1xuaW1wb3J0IEJvYXJkU2VydmljZSBmcm9tICcuL0JvYXJkU2VydmljZS5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuLi9UdXJ0bGVzL1R1cnRsZVNlcnZpY2UuanMnO1xuaW1wb3J0IFdhdGVyU2VydmljZSBmcm9tICcuLi9XYXRlci9XYXRlclNlcnZpY2UuanMnO1xuaW1wb3J0IFdvb2RTZXJ2aWNlIGZyb20gJy4uL1dvb2QvV29vZFNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuYm9hcmQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLmZyb2dnZXIgPSBuZXcgRnJvZ2dlcih0aGlzLmJvYXJkKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyTW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FycyA9IENhclNlcnZpY2UuY3JlYXRlQ2FycygpO1xuICAgICAgICB0aGlzLndhdGVyID0gbmV3IFdhdGVyKCk7XG4gICAgICAgIHRoaXMudHVydGxlcyA9IFR1cnRsZVNlcnZpY2UuY3JlYXRlVHVydGxlcygpO1xuICAgICAgICB0aGlzLndvb2RzID0gV29vZFNlcnZpY2UuY3JlYXRlV29vZCgpO1xuICAgIH07XG5cbiAgICBzZXRCb2FyZCgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmJvYXJkLndpZHRoLCB0aGlzLmJvYXJkLmhlaWdodCk7XG4gICAgICAgIHRoaXMud2F0ZXIuZHJhd1dhdGVyKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIuZHJhd0Nhcih0aGlzLmNvbnRleHQpKTtcbiAgICAgICAgdGhpcy5jYXJzLmZvckVhY2goY2FyID0+IGNhci5tb3ZlKHRoaXMuY2FycykpO1xuICAgICAgICB0aGlzLnR1cnRsZXMuZm9yRWFjaCh0dXJ0bGUgPT4gdHVydGxlLmRyYXdUdXJ0bGUodGhpcy5jb250ZXh0KSk7XG4gICAgICAgIHRoaXMudHVydGxlcy5mb3JFYWNoKHR1cnRsZSA9PiB0dXJ0bGUubW92ZSh0aGlzLnR1cnRsZXMpKTtcbiAgICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5kcmF3V29vZCh0aGlzLmNvbnRleHQpKTtcbiAgICAgICAgdGhpcy53b29kcy5mb3JFYWNoKHdvb2QgPT4gd29vZC5tb3ZlKHRoaXMud29vZHMpKTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyLmRyYXdGcm9nZ2VyKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuZnJvZ2dlck1vdmluZyA/IHRoaXMubW92ZUZyb2dnZXIoKSA6IGZhbHNlO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5zZXRCb2FyZC5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgc2V0RnJvZ2dlck1vdmUoZXZlbnQpe1xuICAgICAgbGV0IGlzTW92aW5nID0gdGhpcy5mcm9nZ2VyLnNldERpcmVjdGlvbihldmVudCk7XG4gICAgICBpc01vdmluZyA/IHRoaXMuZnJvZ2dlck1vdmluZyA9IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBtb3ZlRnJvZ2dlcigpIHtcbiAgICAgIHRoaXMuZnJvZ2dlck1vdmluZyA9IHRoaXMuZnJvZ2dlci5tb3ZlKHRoaXMuZnJvZ2dlci5kaXJlY3Rpb24pO1xuICAgIH07XG5cbn1cbiIsImNvbnN0IEJvYXJkU2VydmljZSA9IHtcblxuICBjbGVhckJvYXJkOiAoYm9hcmQpID0+IHtcbiAgICBib2FyZC5mb3JFYWNoKChkaXYpPT57XG4gICAgICBkaXYuY2xhc3NOYW1lID0gXCJcIjtcbiAgICB9KVxuICB9LFxuXG4gIGNoZWNrQ29sbGlzaW9uKGZyb2dnZXIsIGVsZW1lbnRzKXtcbiAgICBsZXQgZnJvZ2dlclBvcyA9IGZyb2dnZXIuZ2V0UG9zaXRpb24oKTtcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgZWxlbWVudHMuZm9yRWFjaChlbGVtID0+IGVsZW0uZ2V0UG9zaXRpb24oKSA9PT0gZnJvZ2dlclBvcyA/IHJlc3VsdCA9IGZyb2dnZXJQb3MgOiBmYWxzZSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQm9hcmRTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IENhclNlcnZpY2UgZnJvbSAnLi9DYXJTZXJ2aWNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuXG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIHNwZWVkKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgIHRoaXMud2lkdGggPSBDYXJTZXJ2aWNlLmdlbmVyYXRlV2lkdGgobGluZSk7XG4gICAgdGhpcy5wb3NZID0gQ2FyU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBDYXJTZXJ2aWNlLmdlbmVyYXRlRGlyZWN0aW9uKGxpbmUpO1xuICB9XG5cbiAgZHJhd0NhcihjdHgpIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5yZWN0KHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCBDYXIgZnJvbSAnLi9DYXIuanMnO1xuXG5jb25zdCBDYXJTZXJ2aWNlID0ge1xuXG4gICAgY3JlYXRlQ2FyczogKCkgPT4ge1xuICAgICAgICBsZXQgY2FycyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSAwOyBpIDw9IDE1OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjYXIgPSBuZXcgQ2FyKHBvc1gsIGxpbmUsIDEpO1xuICAgICAgICAgICAgaWYgKGxpbmUgPT09IDUpIHtcbiAgICAgICAgICAgICAgICBwb3NYID0gcG9zWCArIE1hdGgucmFuZG9tKCkgKiAoNDAwIC0gMTUwKSArIDE1MDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyBNYXRoLnJhbmRvbSgpICogKDMwMCAtIDEwMCkgKyAxMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXJzLnB1c2goY2FyKTtcbiAgICAgICAgICAgIGlmIChpICUgMyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gNDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDE1MDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gNTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSAzMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhcnM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDU1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDQ1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gNDAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAzNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZURpcmVjdGlvbjogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuL01vdmluZ09iamVjdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb2dnZXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKGJvYXJkLCBwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIGxpdmVzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcbiAgICAgICAgdGhpcy5wb3NYID0gYm9hcmQud2lkdGggKiAwLjU7XG4gICAgICAgIHRoaXMucG9zWSA9IGJvYXJkLmhlaWdodCAtIHRoaXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgICAgIHRoaXMubGl2ZXMgPSAzO1xuICAgICAgICB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICB9O1xuXG4gICAgZHJhd0Zyb2dnZXIoY3R4KSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnJlY3QodGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMuaGVpZ2h0LCB0aGlzLndpZHRoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIHNldERpcmVjdGlvbihldmVudCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdkb3duJztcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBtb3ZlKGRpcmVjdGlvbikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1ggLT0gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1kgLT0gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1ggKz0gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMucG9zWSArPSAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tb3ZpbmdDb3VudCsrO1xuICAgICAgICB0aGlzLm1vdmluZ0NvdW50IDwgMjUgPyByZXN1bHQgPSB0cnVlIDogdGhpcy5tb3ZpbmdDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZC9Cb2FyZC5qcyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL0V2ZW50RW1pdHRlci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XG4gICAgfVxuXG4gICAgc3RhcnRHYW1lKCkge1xuICAgICAgICB0aGlzLmJvYXJkLnNldEJvYXJkKCk7XG4gICAgICAgIC8vIHRoaXMuYm9hcmQuc3RhcnRCb2FyZCgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKCkgPT4gdGhpcy5ib2FyZC5zZXRGcm9nZ2VyTW92ZShldmVudCkpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IocG9zWCwgcG9zWSwgZGlyZWN0aW9uLCBzcGVlZCkge1xuICAgICAgICB0aGlzLnBvc1ggPSBwb3NYO1xuICAgICAgICB0aGlzLnBvc1kgPSBwb3NZO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIH1cblxuICAgIG1vdmUob2JqZWN0cykge1xuICAgICAgICBsZXQgbWF4O1xuICAgICAgICBsZXQgbWluO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1ggLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3NYIDwgLTE1MCkge1xuICAgICAgICAgICAgICAgICAgICBtYXggPSAxMDAwO1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSA3MDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkT2JqcyA9IGZpbHRlck9ianModGhpcywgb2JqZWN0cyk7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkT2Jqcy5mb3JFYWNoKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmNoZWNrQ29sbGlzaW9uKG9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NYICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWCA+IDc1MCkge1xuICAgICAgICAgICAgICAgICAgICBtYXggPSAtMjUwO1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSAtNjUwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZE9ianMgPSBmaWx0ZXJPYmpzKHRoaXMsIG9iamVjdHMpO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE9ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5jaGVja0NvbGxpc2lvbihvYmopKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcblxuICAgIH07XG5cbiAgICBjaGVja0NvbGxpc2lvbihvYmopIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBvc1ggPj0gb2JqLnBvc1ggLSBvYmoud2lkdGggLSA1MCAmJiB0aGlzLnBvc1ggPD0gb2JqLnBvc1ggKyBvYmoud2lkdGggKyA1MCA/IHJlc3VsdCA9IHRydWUgOiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG59O1xuXG5mdW5jdGlvbiBmaWx0ZXJPYmpzKGNoZWNrZWRPYmosIG9ianMpIHtcbiAgICBsZXQgZmlsdGVyZWRPYmpzID0gb2Jqcy5maWx0ZXIob2JqID0+IG9iai5saW5lID09PSBjaGVja2VkT2JqLmxpbmUpO1xuICAgIGxldCBpbmRleCA9IGZpbHRlcmVkT2Jqcy5pbmRleE9mKGNoZWNrZWRPYmopO1xuICAgIGZpbHRlcmVkT2Jqcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiBmaWx0ZXJlZE9ianM7XG59XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuL1R1cnRsZVNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdXJ0bGUgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIHNwZWVkKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgIHRoaXMud2lkdGggPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlV2lkdGgobGluZSk7XG4gICAgdGhpcy5wb3NZID0gVHVydGxlU2VydmljZS5nZW5lcmF0ZVlQb3MobGluZSk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gIH1cblxuICBkcmF3VHVydGxlKGN0eCkge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LnJlY3QodGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJyb3duXCI7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICB9XG59XG4iLCJpbXBvcnQgVHVydGxlIGZyb20gJy4vVHVydGxlLmpzJztcblxuY29uc3QgVHVydGxlU2VydmljZSA9IHtcblxuICBjcmVhdGVUdXJ0bGVzOiAoKSA9PntcbiAgICBsZXQgdHVydGxlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IE1hdGgucmFuZG9tKCkgKiAoMTAwIC0gMCkgKyAwOyBpIDw9IDc7IGkrKykge1xuICAgICAgbGV0IHR1cnRsZSA9IG5ldyBUdXJ0bGUocG9zWCwgbGluZSwgMSk7XG4gICAgICBpZihsaW5lID09IDEpe1xuICAgICAgICBwb3NYID0gcG9zWCArIE1hdGgucmFuZG9tKCkgKiAoMzUwIC0gMjAwKSArIDIwMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvc1ggPSBwb3NYICsgTWF0aC5yYW5kb20oKSAqICg0MDAgLSAzMDApICsgMzAwO1xuICAgICAgfVxuICAgICAgdHVydGxlcy5wdXNoKHR1cnRsZSk7XG4gICAgICBpZihpID09IDQpe1xuICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgcG9zWCA9IE1hdGgucmFuZG9tKCkgKiAoMzAwIC0gMTAwKSArIDEwMDtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0dXJ0bGVzO1xuICB9LFxuXG4gIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICByZXR1cm4gMjUwO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICB9LFxuXG4gIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiAxMDA7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICB9LFxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFR1cnRsZVNlcnZpY2U7XG4iLCJpbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4vV2F0ZXJTZXJ2aWNlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0ZXJ7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5wb3NYID0gMDtcbiAgICB0aGlzLnBvc1kgPSA1MDtcbiAgICB0aGlzLmhlaWdodCA9IDI1MDtcbiAgICB0aGlzLndpZHRoID0gNzAwO1xuICB9XG5cbiAgZHJhd1dhdGVyKGN0eCl7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5yZWN0KHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCBXYXRlciBmcm9tICcuL1dhdGVyLmpzJztcblxuY29uc3QgV2F0ZXJTZXJ2aWNlID0ge1xuICBjcmVhdGVXYXRlcjogKCkgPT4ge1xuICAgICAgbGV0IHdhdGVyT2JqcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSA3MDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgd2F0ZXIgPSBuZXcgV2F0ZXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICBwb3NYID0gcG9zWCArIDFcbiAgICAgICAgICAgIHdhdGVyT2Jqcy5wdXNoKHdhdGVyKTtcbiAgICAgICAgICBpZiAoaSAlIDE0ID09IDApIHtcbiAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgICBwb3NYID0gMDtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd2F0ZXJPYmpzO1xuICB9LFxuXG4gIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgcmV0dXJuIDU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgcmV0dXJuIDQ7XG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBXYXRlclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi9Xb29kU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvb2QgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIGxpbmUsIHNwZWVkKXtcbiAgICBzdXBlcihwb3NYKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgIHRoaXMud2lkdGggPSBXb29kU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpXG4gICAgdGhpcy5wb3NZID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgfVxuXG4gIGRyYXdXb29kKGN0eCkge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LnJlY3QodGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBcImJlaWdlXCI7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICB9XG5cbn1cbiIsImltcG9ydCBXb29kIGZyb20gJy4vV29vZC5qcyc7XG5cbmNvbnN0IFdvb2RTZXJ2aWNlID0ge1xuICAgIGNyZWF0ZVdvb2Q6ICgpID0+IHtcbiAgICAgICAgbGV0IHdvb2RzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IE1hdGgucmFuZG9tKCkgKiAoMTAwIC0gMCkgKyAwOyBpIDw9IDg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHdvb2QgPSBuZXcgV29vZChwb3NYLCBsaW5lLCAxKTtcbiAgICAgICAgICAgIGlmIChsaW5lID09PSAxKSB7XG4gICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgTWF0aC5yYW5kb20oKSAqICg0MDAgLSAzMDApICsgMzAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsaW5lID09PSAyKSB7XG4gICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgTWF0aC5yYW5kb20oKSAqICg2MDAgLSA1MDApICsgNTAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyBNYXRoLnJhbmRvbSgpICogKDUwMCAtIDQwMCkgKyA0MDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3b29kcy5wdXNoKHdvb2QpO1xuICAgICAgICAgICAgaWYgKGkgPT0gMykge1xuICAgICAgICAgICAgICAgIHBvc1ggPSBNYXRoLnJhbmRvbSgpICogKDEwMCAtIDApICsgMDtcbiAgICAgICAgICAgICAgICBsaW5lID0gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSA1KSB7XG4gICAgICAgICAgICAgICAgcG9zWCA9IE1hdGgucmFuZG9tKCkgKiAoMTAwIC0gMCkgKyAwO1xuICAgICAgICAgICAgICAgIGxpbmUgPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3b29kcztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVXaWR0aDogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMjUwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDIwMDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGdlbmVyYXRlWVBvczogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDIwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXb29kU2VydmljZTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0ge307XG4gICAgfTtcblxuICAgIHN1YnNjcmliZShldmVudE5hbWUsIGZuKSB7XG4gICAgICAhdGhpcy5ldmVudHNbZXZlbnROYW1lXSA/IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXSA6IGZhbHNlO1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcblxuICAgICAgcmV0dXJuICgpID0+e1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoZXZlbnRGbiA9PiBmbiAhPT0gZXZlbnRGbik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGVtaXQoZXZlbnROYW1lLCBkYXRhKXtcbiAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXTtcbiAgICAgIGlmKGV2ZW50KXtcbiAgICAgICAgZXZlbnQuZm9yRWFjaChmbiA9PntcbiAgICAgICAgICBmbi5jYWxsKG51bGwsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xufVxuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9Db21wb25lbnRzL0dhbWUuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT57XG4gIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgZ2FtZS5zdGFydEdhbWUoKTtcbn0pO1xuIl19
