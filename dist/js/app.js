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
            if (!this.froggerMoving) {
                var isMoving = this.frogger.setDirection(event);
                isMoving ? this.froggerMoving = true : false;
            }
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
                    this.posX -= this.speed;
                    break;
                case 'right':
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
                    this.posX += this.speed;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZC5qcyIsInNyYy9qcy9Db21wb25lbnRzL0JvYXJkL0JvYXJkU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQ2Fycy9DYXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvRnJvZ2dlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0dhbWUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Nb3ZpbmdPYmplY3QuanMiLCJzcmMvanMvQ29tcG9uZW50cy9UdXJ0bGVzL1R1cnRsZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL1dhdGVyL1dhdGVyLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV2F0ZXIvV2F0ZXJTZXJ2aWNlLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvV29vZC9Xb29kU2VydmljZS5qcyIsInNyYy9qcy9FdmVudEVtaXR0ZXIuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUIsSztBQUNqQixxQkFBYztBQUFBOztBQUNWLGFBQUssS0FBTCxHQUFhLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsYUFBSyxPQUFMLEdBQWUsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixJQUF0QixDQUFmO0FBQ0EsYUFBSyxPQUFMLEdBQWUsc0JBQVksS0FBSyxLQUFqQixDQUFmO0FBQ0EsYUFBSyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsYUFBSyxJQUFMLEdBQVkscUJB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LFNBQVosSUFBeUIsTUFBSyxNQUFMLENBQVksU0FBWixFQUF1QixNQUF2QixDQUE4QjtBQUFBLGlCQUFXLE9BQU8sT0FBbEI7QUFBQSxTQUE5QixDQUF6QjtBQUNELE9BRkQ7QUFHRDs7O3lCQUVJLFMsRUFBVyxJLEVBQUs7QUFDbkIsVUFBTSxRQUFRLEtBQUssTUFBTCxDQUFZLFNBQVosQ0FBZDtBQUNBLFVBQUcsS0FBSCxFQUFTO0FBQ1AsY0FBTSxPQUFOLENBQWMsY0FBSztBQUNqQixhQUFHLElBQUgsQ0FBUSxJQUFSLEVBQWMsSUFBZDtBQUNELFNBRkQ7QUFHRDtBQUNGOzs7Ozs7a0JBckJnQixZOzs7OztBQ0FyQjs7Ozs7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBSztBQUNqRCxNQUFJLE9BQU8sb0JBQVg7QUFDQSxPQUFLLFNBQUw7QUFDRCxDQUhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBGcm9nZ2VyIGZyb20gJy4uL0Zyb2dnZXIuanMnO1xuaW1wb3J0IFdhdGVyIGZyb20gJy4uL1dhdGVyL1dhdGVyLmpzJztcbmltcG9ydCBDYXJTZXJ2aWNlIGZyb20gJy4uL0NhcnMvQ2FyU2VydmljZS5qcyc7XG5pbXBvcnQgQm9hcmRTZXJ2aWNlIGZyb20gJy4vQm9hcmRTZXJ2aWNlLmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4uL1R1cnRsZXMvVHVydGxlU2VydmljZS5qcyc7XG5pbXBvcnQgV2F0ZXJTZXJ2aWNlIGZyb20gJy4uL1dhdGVyL1dhdGVyU2VydmljZS5qcyc7XG5pbXBvcnQgV29vZFNlcnZpY2UgZnJvbSAnLi4vV29vZC9Xb29kU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5ib2FyZC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKHRoaXMuYm9hcmQpO1xuICAgICAgICB0aGlzLmZyb2dnZXJNb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYXJzID0gQ2FyU2VydmljZS5jcmVhdGVDYXJzKCk7XG4gICAgICAgIHRoaXMud2F0ZXIgPSBuZXcgV2F0ZXIoKTtcbiAgICAgICAgdGhpcy50dXJ0bGVzID0gVHVydGxlU2VydmljZS5jcmVhdGVUdXJ0bGVzKCk7XG4gICAgICAgIHRoaXMud29vZHMgPSBXb29kU2VydmljZS5jcmVhdGVXb29kKCk7XG4gICAgfTtcblxuICAgIHNldEJvYXJkKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuYm9hcmQud2lkdGgsIHRoaXMuYm9hcmQuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy53YXRlci5kcmF3V2F0ZXIodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5jYXJzLmZvckVhY2goY2FyID0+IGNhci5kcmF3Q2FyKHRoaXMuY29udGV4dCkpO1xuICAgICAgICB0aGlzLmNhcnMuZm9yRWFjaChjYXIgPT4gY2FyLm1vdmUodGhpcy5jYXJzKSk7XG4gICAgICAgIHRoaXMudHVydGxlcy5mb3JFYWNoKHR1cnRsZSA9PiB0dXJ0bGUuZHJhd1R1cnRsZSh0aGlzLmNvbnRleHQpKTtcbiAgICAgICAgdGhpcy50dXJ0bGVzLmZvckVhY2godHVydGxlID0+IHR1cnRsZS5tb3ZlKHRoaXMudHVydGxlcykpO1xuICAgICAgICB0aGlzLndvb2RzLmZvckVhY2god29vZCA9PiB3b29kLmRyYXdXb29kKHRoaXMuY29udGV4dCkpO1xuICAgICAgICB0aGlzLndvb2RzLmZvckVhY2god29vZCA9PiB3b29kLm1vdmUodGhpcy53b29kcykpO1xuICAgICAgICB0aGlzLmZyb2dnZXIuZHJhd0Zyb2dnZXIodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5mcm9nZ2VyTW92aW5nID8gdGhpcy5tb3ZlRnJvZ2dlcigpIDogZmFsc2U7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnNldEJvYXJkLmJpbmQodGhpcykpO1xuICAgIH07XG5cbiAgICBzZXRGcm9nZ2VyTW92ZShldmVudCl7XG4gICAgICBpZighdGhpcy5mcm9nZ2VyTW92aW5nKXtcbiAgICAgICAgbGV0IGlzTW92aW5nID0gdGhpcy5mcm9nZ2VyLnNldERpcmVjdGlvbihldmVudCk7XG4gICAgICAgIGlzTW92aW5nID8gdGhpcy5mcm9nZ2VyTW92aW5nID0gdHJ1ZSA6IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVGcm9nZ2VyKCkge1xuICAgICAgdGhpcy5mcm9nZ2VyTW92aW5nID0gdGhpcy5mcm9nZ2VyLm1vdmUodGhpcy5mcm9nZ2VyLmRpcmVjdGlvbik7XG4gICAgfTtcblxufVxuIiwiY29uc3QgQm9hcmRTZXJ2aWNlID0ge1xuXG4gIGNsZWFyQm9hcmQ6IChib2FyZCkgPT4ge1xuICAgIGJvYXJkLmZvckVhY2goKGRpdik9PntcbiAgICAgIGRpdi5jbGFzc05hbWUgPSBcIlwiO1xuICAgIH0pXG4gIH0sXG5cbiAgY2hlY2tDb2xsaXNpb24oZnJvZ2dlciwgZWxlbWVudHMpe1xuICAgIGxldCBmcm9nZ2VyUG9zID0gZnJvZ2dlci5nZXRQb3NpdGlvbigpO1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW0gPT4gZWxlbS5nZXRQb3NpdGlvbigpID09PSBmcm9nZ2VyUG9zID8gcmVzdWx0ID0gZnJvZ2dlclBvcyA6IGZhbHNlKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCb2FyZFNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuL0NhclNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG5cbiAgY29uc3RydWN0b3IocG9zWCwgbGluZSwgc3BlZWQpe1xuICAgIHN1cGVyKHBvc1gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgdGhpcy53aWR0aCA9IENhclNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKTtcbiAgICB0aGlzLnBvc1kgPSBDYXJTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IENhclNlcnZpY2UuZ2VuZXJhdGVEaXJlY3Rpb24obGluZSk7XG4gIH1cblxuICBkcmF3Q2FyKGN0eCkge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LnJlY3QodGhpcy5wb3NYLCB0aGlzLnBvc1ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IENhciBmcm9tICcuL0Nhci5qcyc7XG5cbmNvbnN0IENhclNlcnZpY2UgPSB7XG5cbiAgICBjcmVhdGVDYXJzOiAoKSA9PiB7XG4gICAgICAgIGxldCBjYXJzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDA7IGkgPD0gMTU7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNhciA9IG5ldyBDYXIocG9zWCwgbGluZSwgMSk7XG4gICAgICAgICAgICBpZiAobGluZSA9PT0gNSkge1xuICAgICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgTWF0aC5yYW5kb20oKSAqICg0MDAgLSAxNTApICsgMTUwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3NYID0gcG9zWCArIE1hdGgucmFuZG9tKCkgKiAoMzAwIC0gMTAwKSArIDEwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhcnMucHVzaChjYXIpO1xuICAgICAgICAgICAgaWYgKGkgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICBsaW5lKys7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSA0MDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gMTUwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSA1MDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zWCA9IDMwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FycztcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVZUG9zOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gNTUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gNDUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiA0MDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDM1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVXaWR0aDogKGxpbmUpID0+IHtcbiAgICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE1MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDUwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdlbmVyYXRlRGlyZWN0aW9uOiAobGluZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhclNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4vTW92aW5nT2JqZWN0LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJvZ2dlciBleHRlbmRzIE1vdmluZ09iamVjdCB7XG4gICAgY29uc3RydWN0b3IoYm9hcmQsIHBvc1gsIHBvc1ksIGRpcmVjdGlvbiwgbGl2ZXMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICAgICAgdGhpcy53aWR0aCA9IDUwO1xuICAgICAgICB0aGlzLnBvc1ggPSBib2FyZC53aWR0aCAqIDAuNTtcbiAgICAgICAgdGhpcy5wb3NZID0gYm9hcmQuaGVpZ2h0IC0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICAgICAgdGhpcy5saXZlcyA9IDM7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPSAwO1xuICAgIH07XG5cbiAgICBkcmF3RnJvZ2dlcihjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgucmVjdCh0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy5oZWlnaHQsIHRoaXMud2lkdGgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgc2V0RGlyZWN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICd1cCc7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIG1vdmUoZGlyZWN0aW9uKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMucG9zWCAtPSAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgIHRoaXMucG9zWSAtPSAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMucG9zWCArPSAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NZICs9IDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1vdmluZ0NvdW50Kys7XG4gICAgICAgIHRoaXMubW92aW5nQ291bnQgPCAyNSA/IHJlc3VsdCA9IHRydWUgOiB0aGlzLm1vdmluZ0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBCb2FyZCBmcm9tICcuL0JvYXJkL0JvYXJkLmpzJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vRXZlbnRFbWl0dGVyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoKTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQuc2V0Qm9hcmQoKTtcbiAgICAgICAgLy8gdGhpcy5ib2FyZC5zdGFydEJvYXJkKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCgpID0+IHRoaXMuYm9hcmQuc2V0RnJvZ2dlck1vdmUoZXZlbnQpKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdPYmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbiwgc3BlZWQpIHtcbiAgICAgICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICAgICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcbiAgICB9XG5cbiAgICBtb3ZlKG9iamVjdHMpIHtcbiAgICAgICAgbGV0IG1heDtcbiAgICAgICAgbGV0IG1pbjtcbiAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zWCA8IC0xNTApIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgbWluID0gNzAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc1ggPSBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZE9ianMgPSBmaWx0ZXJPYmpzKHRoaXMsIG9iamVjdHMpO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE9ianMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5jaGVja0NvbGxpc2lvbihvYmopKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zWCAtPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc1ggPiA3NTApIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gLTI1MDtcbiAgICAgICAgICAgICAgICAgICAgbWluID0gLTY1MDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NYID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRPYmpzID0gZmlsdGVyT2Jqcyh0aGlzLCBvYmplY3RzKTtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRPYmpzLmZvckVhY2goKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuY2hlY2tDb2xsaXNpb24ob2JqKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zWCA9IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc1ggKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG5cbiAgICB9O1xuXG4gICAgY2hlY2tDb2xsaXNpb24ob2JqKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wb3NYID49IG9iai5wb3NYIC0gb2JqLndpZHRoIC0gNTAgJiYgdGhpcy5wb3NYIDw9IG9iai5wb3NYICsgb2JqLndpZHRoICsgNTAgPyByZXN1bHQgPSB0cnVlIDogZmFsc2U7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxufTtcblxuZnVuY3Rpb24gZmlsdGVyT2JqcyhjaGVja2VkT2JqLCBvYmpzKSB7XG4gICAgbGV0IGZpbHRlcmVkT2JqcyA9IG9ianMuZmlsdGVyKG9iaiA9PiBvYmoubGluZSA9PT0gY2hlY2tlZE9iai5saW5lKTtcbiAgICBsZXQgaW5kZXggPSBmaWx0ZXJlZE9ianMuaW5kZXhPZihjaGVja2VkT2JqKTtcbiAgICBmaWx0ZXJlZE9ianMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gZmlsdGVyZWRPYmpzO1xufVxuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IFR1cnRsZVNlcnZpY2UgZnJvbSAnLi9UdXJ0bGVTZXJ2aWNlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHVydGxlIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lLCBzcGVlZCl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB0aGlzLndpZHRoID0gVHVydGxlU2VydmljZS5nZW5lcmF0ZVdpZHRoKGxpbmUpO1xuICAgIHRoaXMucG9zWSA9IFR1cnRsZVNlcnZpY2UuZ2VuZXJhdGVZUG9zKGxpbmUpO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICB9XG5cbiAgZHJhd1R1cnRsZShjdHgpIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5yZWN0KHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJicm93blwiO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFR1cnRsZSBmcm9tICcuL1R1cnRsZS5qcyc7XG5cbmNvbnN0IFR1cnRsZVNlcnZpY2UgPSB7XG5cbiAgY3JlYXRlVHVydGxlczogKCkgPT57XG4gICAgbGV0IHR1cnRsZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSBNYXRoLnJhbmRvbSgpICogKDEwMCAtIDApICsgMDsgaSA8PSA3OyBpKyspIHtcbiAgICAgIGxldCB0dXJ0bGUgPSBuZXcgVHVydGxlKHBvc1gsIGxpbmUsIDEpO1xuICAgICAgaWYobGluZSA9PSAxKXtcbiAgICAgICAgcG9zWCA9IHBvc1ggKyBNYXRoLnJhbmRvbSgpICogKDM1MCAtIDIwMCkgKyAyMDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3NYID0gcG9zWCArIE1hdGgucmFuZG9tKCkgKiAoNDAwIC0gMzAwKSArIDMwMDtcbiAgICAgIH1cbiAgICAgIHR1cnRsZXMucHVzaCh0dXJ0bGUpO1xuICAgICAgaWYoaSA9PSA0KXtcbiAgICAgICAgbGluZSA9IDI7XG4gICAgICAgIHBvc1ggPSBNYXRoLnJhbmRvbSgpICogKDMwMCAtIDEwMCkgKyAxMDA7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdHVydGxlcztcbiAgfSxcblxuICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgcmV0dXJuIDI1MDtcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfSxcblxuICBnZW5lcmF0ZVdpZHRoOiAobGluZSkgPT4ge1xuICAgICAgc3dpdGNoIChsaW5lKSB7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICByZXR1cm4gMTUwO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgfSxcblxufVxuXG5leHBvcnQgZGVmYXVsdCBUdXJ0bGVTZXJ2aWNlO1xuIiwiaW1wb3J0IFdhdGVyU2VydmljZSBmcm9tICcuL1dhdGVyU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVye1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMucG9zWCA9IDA7XG4gICAgdGhpcy5wb3NZID0gNTA7XG4gICAgdGhpcy5oZWlnaHQgPSAyNTA7XG4gICAgdGhpcy53aWR0aCA9IDcwMDtcbiAgfVxuXG4gIGRyYXdXYXRlcihjdHgpe1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgucmVjdCh0aGlzLnBvc1gsIHRoaXMucG9zWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImJsdWVcIjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgV2F0ZXIgZnJvbSAnLi9XYXRlci5qcyc7XG5cbmNvbnN0IFdhdGVyU2VydmljZSA9IHtcbiAgY3JlYXRlV2F0ZXI6ICgpID0+IHtcbiAgICAgIGxldCB3YXRlck9ianMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDA7IGkgPD0gNzA7IGkrKykge1xuICAgICAgICAgICAgbGV0IHdhdGVyID0gbmV3IFdhdGVyKHBvc1gsIGxpbmUpO1xuICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyAxXG4gICAgICAgICAgICB3YXRlck9ianMucHVzaCh3YXRlcik7XG4gICAgICAgICAgaWYgKGkgJSAxNCA9PSAwKSB7XG4gICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgICAgcG9zWCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHdhdGVyT2JqcztcbiAgfSxcblxuICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiA1O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgV2F0ZXJTZXJ2aWNlO1xuIiwiaW1wb3J0IE1vdmluZ09iamVjdCBmcm9tICcuLi9Nb3ZpbmdPYmplY3QuanMnO1xuaW1wb3J0IFdvb2RTZXJ2aWNlIGZyb20gJy4vV29vZFNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb29kIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBsaW5lLCBzcGVlZCl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB0aGlzLndpZHRoID0gV29vZFNlcnZpY2UuZ2VuZXJhdGVXaWR0aChsaW5lKVxuICAgIHRoaXMucG9zWSA9IFdvb2RTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICdyaWdodCc7XG4gIH1cblxuICBkcmF3V29vZChjdHgpIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5yZWN0KHRoaXMucG9zWCwgdGhpcy5wb3NZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJiZWlnZVwiO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgV29vZCBmcm9tICcuL1dvb2QuanMnO1xuXG5jb25zdCBXb29kU2VydmljZSA9IHtcbiAgICBjcmVhdGVXb29kOiAoKSA9PiB7XG4gICAgICAgIGxldCB3b29kcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMSwgbGluZSA9IDEsIHBvc1ggPSBNYXRoLnJhbmRvbSgpICogKDEwMCAtIDApICsgMDsgaSA8PSA4OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3b29kID0gbmV3IFdvb2QocG9zWCwgbGluZSwgMSk7XG4gICAgICAgICAgICBpZiAobGluZSA9PT0gMSkge1xuICAgICAgICAgICAgICBwb3NYID0gcG9zWCArIE1hdGgucmFuZG9tKCkgKiAoNDAwIC0gMzAwKSArIDMwMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gMikge1xuICAgICAgICAgICAgICBwb3NYID0gcG9zWCArIE1hdGgucmFuZG9tKCkgKiAoNjAwIC0gNTAwKSArIDUwMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgTWF0aC5yYW5kb20oKSAqICg1MDAgLSA0MDApICsgNDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd29vZHMucHVzaCh3b29kKTtcbiAgICAgICAgICAgIGlmIChpID09IDMpIHtcbiAgICAgICAgICAgICAgICBwb3NYID0gTWF0aC5yYW5kb20oKSAqICgxMDAgLSAwKSArIDA7XG4gICAgICAgICAgICAgICAgbGluZSA9IDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gNSkge1xuICAgICAgICAgICAgICAgIHBvc1ggPSBNYXRoLnJhbmRvbSgpICogKDEwMCAtIDApICsgMDtcbiAgICAgICAgICAgICAgICBsaW5lID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd29vZHM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlV2lkdGg6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxNTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1MDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAyMDA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAyMDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwMDtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiA1MDtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgV29vZFNlcnZpY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xuICAgIH07XG5cbiAgICBzdWJzY3JpYmUoZXZlbnROYW1lLCBmbikge1xuICAgICAgIXRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPyB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW10gOiBmYWxzZTtcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG5cbiAgICAgIHJldHVybiAoKSA9PntcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKGV2ZW50Rm4gPT4gZm4gIT09IGV2ZW50Rm4pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBlbWl0KGV2ZW50TmFtZSwgZGF0YSl7XG4gICAgICBjb25zdCBldmVudCA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV07XG4gICAgICBpZihldmVudCl7XG4gICAgICAgIGV2ZW50LmZvckVhY2goZm4gPT57XG4gICAgICAgICAgZm4uY2FsbChudWxsLCBkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbn1cbiIsImltcG9ydCBHYW1lIGZyb20gJy4vQ29tcG9uZW50cy9HYW1lLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+e1xuICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gIGdhbWUuc3RhcnRHYW1lKCk7XG59KTtcbiJdfQ==
