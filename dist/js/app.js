(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.WatchObject=e():t.WatchObject=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.unwatch=e.watch=void 0;var o=n(4),i=r(o),c=n(3),a=r(c),f=(e.watch=function(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];var r=e[1];_(r)?g.apply(void 0,e):f(r)?b.apply(void 0,e):w.apply(void 0,e)},e.unwatch=function(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];var r=e[1];_(r)||void 0===r?m.apply(void 0,e):f(r)?O.apply(void 0,e):x.apply(void 0,e)},function(t){return"[object Array]"==={}.toString.call(t)}),u=function(t){return"[object Object]"==={}.toString.call(t)},_=function(t){return"[object Function]"==={}.toString.call(t)},s=function(t,e,n){(0,a["default"])(t,e,{enumerable:!1,configurable:!0,writable:!1,value:n})},l=function(t,e,n,r){(0,a["default"])(t,e,{get:n,set:function(t){r.call(this,t)},enumerable:!0,configurable:!0})},p=function(t,e,n,r,o){var i=void 0,c=t.__watchers__[e];(i=t.__watchers__.__watchall__)&&(c=c?c.concat(i):i);for(var a=c?c.length:0,f=0;a>f;f++)c[f].call(t,n,r,e,o)},v=["pop","push","reverse","shift","sort","unshift","splice"],h=function(t,e,n,r){s(t,n,function(){for(var o=0,i=void 0,c=void 0,a=arguments.length,f=Array(a),u=0;a>u;u++)f[u]=arguments[u];if("splice"===n){var _=f[0],s=_+f[1];i=t.slice(_,s),c=[];for(var l=2;l<f.length;l++)c[l-2]=f[l];o=_}else c="push"===n||"unshift"===n?f.length>0?f:void 0:f.length>0?f[0]:void 0;var p=e.apply(t,f);return"pop"===n?(i=p,o=t.length):"push"===n?o=t.length-1:"shift"===n?i=p:"unshift"!==n&&void 0===c&&(c=p),r.call(t,o,n,c,i),p})},d=function(t,e){if(_(e)&&t&&!(t instanceof String)&&f(t))for(var n=v.length;n>0;n--){var r=v[n-1];h(t,t[r],r,e)}},y=function(t,e,n,r){var o=!1,c=f(t);void 0===t.__watchers__&&(s(t,"__watchers__",{}),c&&d(t,function(n,o,i,c){if(p(t,n,i,c,o),0!==r&&i&&(u(i)||f(i))){var a=void 0,_=t.__watchers__[e];(a=t.__watchers__.__watchall__)&&(_=_?_.concat(a):a);for(var s=_?_.length:0,l=0;s>l;l++)if("splice"!==o)g(i,_[l],void 0===r?r:r-1);else for(var v=0;v<i.length;v++)g(i[v],_[l],void 0===r?r:r-1)}})),void 0===t.__proxy__&&s(t,"__proxy__",{}),void 0===t.__watchers__[e]&&(t.__watchers__[e]=[],c||(o=!0));for(var _=0;_<t.__watchers__[e].length;_++)if(t.__watchers__[e][_]===n)return;t.__watchers__[e].push(n),o&&!function(){var n=(0,i["default"])(t,e);void 0!==n?!function(){var r={enumerable:n.enumerable,configurable:n.configurable},o=["get","set"];o.forEach(function(e){void 0!==n[e]&&(r[e]=function(){for(var r=arguments.length,o=Array(r),i=0;r>i;i++)o[i]=arguments[i];return n[e].apply(t,o)})});var i=["writable","value"];i.forEach(function(t){void 0!==n[t]&&(r[t]=n[t])}),(0,a["default"])(t.__proxy__,e,r)}():t.__proxy__[e]=t[e];var o=function(){return t.__proxy__[e]},c=function(n){var o=t.__proxy__[e];if(0!==r&&t[e]&&(u(t[e])||f(t[e]))&&!t[e].__watchers__)for(var i=0;i<t.__watchers__[e].length;i++)g(t[e],t.__watchers__[e][i],void 0===r?r:r-1);o!==n&&(t.__proxy__[e]=n,p(t,e,n,o,"set"))};l(t,e,o,c)}()},g=function P(t,e,n){if("string"!=typeof t&&(t instanceof Object||f(t)))if(f(t)){if(y(t,"__watchall__",e,n),void 0===n||n>0)for(var r=0;r<t.length;r++)P(t[r],e,n)}else{var o=[];for(var i in t)({}).hasOwnProperty.call(t,i)&&o.push(i);b(t,o,e,n)}},w=function(t,e,n,r){"string"!=typeof t&&(t instanceof Object||f(t))&&(_(t[e])||(null!==t[e]&&(void 0===r||r>0)&&g(t[e],n,void 0!==r?r-1:r),y(t,e,n,r)))},b=function(t,e,n,r){if("string"!=typeof t&&(t instanceof Object||f(t)))for(var o=0;o<e.length;o++){var i=e[o];w(t,i,n,r)}},x=function(t,e,n){if(void 0!==t.__watchers__&&void 0!==t.__watchers__[e])if(void 0===n)delete t.__watchers__[e];else for(var r=0;r<t.__watchers__[e].length;r++)t.__watchers__[e][r]===n&&t.__watchers__[e].splice(r,1)},O=function(t,e,n){for(var r in e)e.hasOwnProperty(r)&&x(t,e[r],n)},j=function S(t,e){var n=[];for(var r in t)t.hasOwnProperty(r)&&(t[r]instanceof Object&&S(t[r],e),n.push(r));O(t,n,e)},m=function(t,e){if(!(t instanceof String||!t instanceof Object&&!f(t)))if(f(t)){for(var n=["__watchall__"],r=0;r<t.length;r++)n.push(r);O(t,n,e)}else j(t,e)}},function(t,e){var n=t.exports={version:"1.2.6"};"number"==typeof __e&&(__e=n)},function(t,e){var n=Object;t.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(t,e,n){t.exports={"default":n(5),__esModule:!0}},function(t,e,n){t.exports={"default":n(6),__esModule:!0}},function(t,e,n){var r=n(2);t.exports=function(t,e,n){return r.setDesc(t,e,n)}},function(t,e,n){var r=n(2);n(17),t.exports=function(t,e){return r.getDesc(t,e)}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(7);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(13),o=n(1),i=n(9),c="prototype",a=function(t,e,n){var f,u,_,s=t&a.F,l=t&a.G,p=t&a.S,v=t&a.P,h=t&a.B,d=t&a.W,y=l?o:o[e]||(o[e]={}),g=l?r:p?r[e]:(r[e]||{})[c];l&&(n=e);for(f in n)u=!s&&g&&f in g,u&&f in y||(_=u?g[f]:n[f],y[f]=l&&"function"!=typeof g[f]?n[f]:h&&u?i(_,r):d&&g[f]==_?function(t){var e=function(e){return this instanceof t?new t(e):t(e)};return e[c]=t[c],e}(_):v&&"function"==typeof _?i(Function.call,_):_,v&&((y[c]||(y[c]={}))[f]=_))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,t.exports=a},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var r=n(8);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(11),o=n(1),i=n(12);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],c={};c[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",c)}},function(t,e,n){var r=n(14),o=n(10);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(16);n(15)("getOwnPropertyDescriptor",function(t){return function(e,n){return t(r(e),n)}})}])});
},{}],2:[function(require,module,exports){
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

var _EventEmitter = require('../../EventEmitter.js');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _watchObject = require('watch-object');

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
        this.emitter = new _EventEmitter2.default();
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
        key: 'moveFrogger',
        value: function moveFrogger(event) {
            this.frogger.move(event);
            var turtleCollision = _BoardService2.default.checkCollision(this.frogger, this.turtles);
            if (turtleCollision) {
                this.emitter.emit('sailOnTurtle', turtleCollision);
            }
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
            var _this3 = this;

            this.emitter.subscribe('sailOnTurtle', function (position) {
                var sailTurtle = _this3.turtles.filter(function (turtle) {
                    return turtle.getPosition() === position;
                });
                (0, _watchObject.watch)(sailTurtle[0], 'posX', function () {
                    _this3.frogger.posX = sailTurtle[0].posX;
                });
            });
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

},{"../../EventEmitter.js":14,"../Cars/CarService.js":5,"../Frogger.js":6,"../Turtles/TurtleService.js":11,"../Water/WaterService.js":13,"./BoardService.js":3,"watch-object":1}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"../MovingObject.js":8,"./CarService":5}],5:[function(require,module,exports){
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

},{"./Car.js":4}],6:[function(require,module,exports){
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

},{"./MovingObject.js":8}],7:[function(require,module,exports){
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

},{"../EventEmitter.js":14,"./Board/Board.js":2}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"../MovingObject.js":8,"./TurtleService.js":11}],11:[function(require,module,exports){
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

},{"./Turtle.js":10}],12:[function(require,module,exports){
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

},{"../StaticObject.js":9,"./WaterService.js":13}],13:[function(require,module,exports){
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

},{"./Water.js":12}],14:[function(require,module,exports){
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

},{"./Components/Game.js":7}]},{},[15])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvd2F0Y2gtb2JqZWN0L2Rpc3Qvd2F0Y2gtb2JqZWN0LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvQm9hcmQvQm9hcmQuanMiLCJzcmMvanMvQ29tcG9uZW50cy9Cb2FyZC9Cb2FyZFNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9DYXJzL0Nhci5qcyIsInNyYy9qcy9Db21wb25lbnRzL0NhcnMvQ2FyU2VydmljZS5qcyIsInNyYy9qcy9Db21wb25lbnRzL0Zyb2dnZXIuanMiLCJzcmMvanMvQ29tcG9uZW50cy9HYW1lLmpzIiwic3JjL2pzL0NvbXBvbmVudHMvTW92aW5nT2JqZWN0LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvU3RhdGljT2JqZWN0LmpzIiwic3JjL2pzL0NvbXBvbmVudHMvVHVydGxlcy9UdXJ0bGUuanMiLCJzcmMvanMvQ29tcG9uZW50cy9UdXJ0bGVzL1R1cnRsZVNlcnZpY2UuanMiLCJzcmMvanMvQ29tcG9uZW50cy9XYXRlci9XYXRlci5qcyIsInNyYy9qcy9Db21wb25lbnRzL1dhdGVyL1dhdGVyU2VydmljZS5qcyIsInNyYy9qcy9FdmVudEVtaXR0ZXIuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0lBRXFCLEs7QUFDakIscUJBQWM7QUFBQTs7QUFDVixhQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0EsYUFBSyxPQUFMLEdBQWUsdUJBQWY7QUFDQSxhQUFLLElBQUwsR0FBWSxxQkFBVyxVQUFYLEVBQVo7QUFDQSxhQUFLLE9BQUwsR0FBZSx3QkFBYyxhQUFkLEVBQWY7QUFDQSxhQUFLLEtBQUwsR0FBYSx1QkFBYSxXQUFiLEVBQWI7QUFDQSxhQUFLLE9BQUwsR0FBZSw0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LENBQUQsR0FBMEIsS0FBSyxNQUFMLENBQVksU0FBWixJQUF5QixFQUFuRCxHQUF3RCxLQUF4RDtBQUNBLFdBQUssTUFBTCxDQUFZLFNBQVosRUFBdUIsSUFBdkIsQ0FBNEIsRUFBNUI7O0FBRUEsYUFBTyxZQUFLO0FBQ1YsY0FBSyxNQUFMLENBQVksU0FBWixJQUF5QixNQUFLLE1BQUwsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCLENBQThCO0FBQUEsaUJBQVcsT0FBTyxPQUFsQjtBQUFBLFNBQTlCLENBQXpCO0FBQ0QsT0FGRDtBQUdEOzs7eUJBRUksUyxFQUFXLEksRUFBSztBQUNuQixVQUFNLFFBQVEsS0FBSyxNQUFMLENBQVksU0FBWixDQUFkO0FBQ0EsVUFBRyxLQUFILEVBQVM7QUFDUCxjQUFNLE9BQU4sQ0FBYyxjQUFLO0FBQ2pCLGFBQUcsSUFBSCxDQUFRLElBQVIsRUFBYyxJQUFkO0FBQ0QsU0FGRDtBQUdEO0FBQ0Y7Ozs7OztrQkFyQmdCLFk7Ozs7O0FDQXJCOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFLO0FBQ2pELE1BQUksT0FBTyxvQkFBWDtBQUNBLE9BQUssU0FBTDtBQUNELENBSEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIWZ1bmN0aW9uKHQsZSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sZSk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5XYXRjaE9iamVjdD1lKCk6dC5XYXRjaE9iamVjdD1lKCl9KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCl7ZnVuY3Rpb24gZShyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17ZXhwb3J0czp7fSxpZDpyLGxvYWRlZDohMX07cmV0dXJuIHRbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsZSksby5sb2FkZWQ9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiBlLm09dCxlLmM9bixlLnA9XCJcIixlKDApfShbZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntcImRlZmF1bHRcIjp0fX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxlLnVud2F0Y2g9ZS53YXRjaD12b2lkIDA7dmFyIG89big0KSxpPXIobyksYz1uKDMpLGE9cihjKSxmPShlLndhdGNoPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PWFyZ3VtZW50cy5sZW5ndGgsZT1BcnJheSh0KSxuPTA7dD5uO24rKyllW25dPWFyZ3VtZW50c1tuXTt2YXIgcj1lWzFdO18ocik/Zy5hcHBseSh2b2lkIDAsZSk6ZihyKT9iLmFwcGx5KHZvaWQgMCxlKTp3LmFwcGx5KHZvaWQgMCxlKX0sZS51bndhdGNoPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PWFyZ3VtZW50cy5sZW5ndGgsZT1BcnJheSh0KSxuPTA7dD5uO24rKyllW25dPWFyZ3VtZW50c1tuXTt2YXIgcj1lWzFdO18ocil8fHZvaWQgMD09PXI/bS5hcHBseSh2b2lkIDAsZSk6ZihyKT9PLmFwcGx5KHZvaWQgMCxlKTp4LmFwcGx5KHZvaWQgMCxlKX0sZnVuY3Rpb24odCl7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09e30udG9TdHJpbmcuY2FsbCh0KX0pLHU9ZnVuY3Rpb24odCl7cmV0dXJuXCJbb2JqZWN0IE9iamVjdF1cIj09PXt9LnRvU3RyaW5nLmNhbGwodCl9LF89ZnVuY3Rpb24odCl7cmV0dXJuXCJbb2JqZWN0IEZ1bmN0aW9uXVwiPT09e30udG9TdHJpbmcuY2FsbCh0KX0scz1mdW5jdGlvbih0LGUsbil7KDAsYVtcImRlZmF1bHRcIl0pKHQsZSx7ZW51bWVyYWJsZTohMSxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITEsdmFsdWU6bn0pfSxsPWZ1bmN0aW9uKHQsZSxuLHIpeygwLGFbXCJkZWZhdWx0XCJdKSh0LGUse2dldDpuLHNldDpmdW5jdGlvbih0KXtyLmNhbGwodGhpcyx0KX0sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITB9KX0scD1mdW5jdGlvbih0LGUsbixyLG8pe3ZhciBpPXZvaWQgMCxjPXQuX193YXRjaGVyc19fW2VdOyhpPXQuX193YXRjaGVyc19fLl9fd2F0Y2hhbGxfXykmJihjPWM/Yy5jb25jYXQoaSk6aSk7Zm9yKHZhciBhPWM/Yy5sZW5ndGg6MCxmPTA7YT5mO2YrKyljW2ZdLmNhbGwodCxuLHIsZSxvKX0sdj1bXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJ1bnNoaWZ0XCIsXCJzcGxpY2VcIl0saD1mdW5jdGlvbih0LGUsbixyKXtzKHQsbixmdW5jdGlvbigpe2Zvcih2YXIgbz0wLGk9dm9pZCAwLGM9dm9pZCAwLGE9YXJndW1lbnRzLmxlbmd0aCxmPUFycmF5KGEpLHU9MDthPnU7dSsrKWZbdV09YXJndW1lbnRzW3VdO2lmKFwic3BsaWNlXCI9PT1uKXt2YXIgXz1mWzBdLHM9XytmWzFdO2k9dC5zbGljZShfLHMpLGM9W107Zm9yKHZhciBsPTI7bDxmLmxlbmd0aDtsKyspY1tsLTJdPWZbbF07bz1ffWVsc2UgYz1cInB1c2hcIj09PW58fFwidW5zaGlmdFwiPT09bj9mLmxlbmd0aD4wP2Y6dm9pZCAwOmYubGVuZ3RoPjA/ZlswXTp2b2lkIDA7dmFyIHA9ZS5hcHBseSh0LGYpO3JldHVyblwicG9wXCI9PT1uPyhpPXAsbz10Lmxlbmd0aCk6XCJwdXNoXCI9PT1uP289dC5sZW5ndGgtMTpcInNoaWZ0XCI9PT1uP2k9cDpcInVuc2hpZnRcIiE9PW4mJnZvaWQgMD09PWMmJihjPXApLHIuY2FsbCh0LG8sbixjLGkpLHB9KX0sZD1mdW5jdGlvbih0LGUpe2lmKF8oZSkmJnQmJiEodCBpbnN0YW5jZW9mIFN0cmluZykmJmYodCkpZm9yKHZhciBuPXYubGVuZ3RoO24+MDtuLS0pe3ZhciByPXZbbi0xXTtoKHQsdFtyXSxyLGUpfX0seT1mdW5jdGlvbih0LGUsbixyKXt2YXIgbz0hMSxjPWYodCk7dm9pZCAwPT09dC5fX3dhdGNoZXJzX18mJihzKHQsXCJfX3dhdGNoZXJzX19cIix7fSksYyYmZCh0LGZ1bmN0aW9uKG4sbyxpLGMpe2lmKHAodCxuLGksYyxvKSwwIT09ciYmaSYmKHUoaSl8fGYoaSkpKXt2YXIgYT12b2lkIDAsXz10Ll9fd2F0Y2hlcnNfX1tlXTsoYT10Ll9fd2F0Y2hlcnNfXy5fX3dhdGNoYWxsX18pJiYoXz1fP18uY29uY2F0KGEpOmEpO2Zvcih2YXIgcz1fP18ubGVuZ3RoOjAsbD0wO3M+bDtsKyspaWYoXCJzcGxpY2VcIiE9PW8pZyhpLF9bbF0sdm9pZCAwPT09cj9yOnItMSk7ZWxzZSBmb3IodmFyIHY9MDt2PGkubGVuZ3RoO3YrKylnKGlbdl0sX1tsXSx2b2lkIDA9PT1yP3I6ci0xKX19KSksdm9pZCAwPT09dC5fX3Byb3h5X18mJnModCxcIl9fcHJveHlfX1wiLHt9KSx2b2lkIDA9PT10Ll9fd2F0Y2hlcnNfX1tlXSYmKHQuX193YXRjaGVyc19fW2VdPVtdLGN8fChvPSEwKSk7Zm9yKHZhciBfPTA7Xzx0Ll9fd2F0Y2hlcnNfX1tlXS5sZW5ndGg7XysrKWlmKHQuX193YXRjaGVyc19fW2VdW19dPT09bilyZXR1cm47dC5fX3dhdGNoZXJzX19bZV0ucHVzaChuKSxvJiYhZnVuY3Rpb24oKXt2YXIgbj0oMCxpW1wiZGVmYXVsdFwiXSkodCxlKTt2b2lkIDAhPT1uPyFmdW5jdGlvbigpe3ZhciByPXtlbnVtZXJhYmxlOm4uZW51bWVyYWJsZSxjb25maWd1cmFibGU6bi5jb25maWd1cmFibGV9LG89W1wiZ2V0XCIsXCJzZXRcIl07by5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZvaWQgMCE9PW5bZV0mJihyW2VdPWZ1bmN0aW9uKCl7Zm9yKHZhciByPWFyZ3VtZW50cy5sZW5ndGgsbz1BcnJheShyKSxpPTA7cj5pO2krKylvW2ldPWFyZ3VtZW50c1tpXTtyZXR1cm4gbltlXS5hcHBseSh0LG8pfSl9KTt2YXIgaT1bXCJ3cml0YWJsZVwiLFwidmFsdWVcIl07aS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3ZvaWQgMCE9PW5bdF0mJihyW3RdPW5bdF0pfSksKDAsYVtcImRlZmF1bHRcIl0pKHQuX19wcm94eV9fLGUscil9KCk6dC5fX3Byb3h5X19bZV09dFtlXTt2YXIgbz1mdW5jdGlvbigpe3JldHVybiB0Ll9fcHJveHlfX1tlXX0sYz1mdW5jdGlvbihuKXt2YXIgbz10Ll9fcHJveHlfX1tlXTtpZigwIT09ciYmdFtlXSYmKHUodFtlXSl8fGYodFtlXSkpJiYhdFtlXS5fX3dhdGNoZXJzX18pZm9yKHZhciBpPTA7aTx0Ll9fd2F0Y2hlcnNfX1tlXS5sZW5ndGg7aSsrKWcodFtlXSx0Ll9fd2F0Y2hlcnNfX1tlXVtpXSx2b2lkIDA9PT1yP3I6ci0xKTtvIT09biYmKHQuX19wcm94eV9fW2VdPW4scCh0LGUsbixvLFwic2V0XCIpKX07bCh0LGUsbyxjKX0oKX0sZz1mdW5jdGlvbiBQKHQsZSxuKXtpZihcInN0cmluZ1wiIT10eXBlb2YgdCYmKHQgaW5zdGFuY2VvZiBPYmplY3R8fGYodCkpKWlmKGYodCkpe2lmKHkodCxcIl9fd2F0Y2hhbGxfX1wiLGUsbiksdm9pZCAwPT09bnx8bj4wKWZvcih2YXIgcj0wO3I8dC5sZW5ndGg7cisrKVAodFtyXSxlLG4pfWVsc2V7dmFyIG89W107Zm9yKHZhciBpIGluIHQpKHt9KS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsaSkmJm8ucHVzaChpKTtiKHQsbyxlLG4pfX0sdz1mdW5jdGlvbih0LGUsbixyKXtcInN0cmluZ1wiIT10eXBlb2YgdCYmKHQgaW5zdGFuY2VvZiBPYmplY3R8fGYodCkpJiYoXyh0W2VdKXx8KG51bGwhPT10W2VdJiYodm9pZCAwPT09cnx8cj4wKSYmZyh0W2VdLG4sdm9pZCAwIT09cj9yLTE6cikseSh0LGUsbixyKSkpfSxiPWZ1bmN0aW9uKHQsZSxuLHIpe2lmKFwic3RyaW5nXCIhPXR5cGVvZiB0JiYodCBpbnN0YW5jZW9mIE9iamVjdHx8Zih0KSkpZm9yKHZhciBvPTA7bzxlLmxlbmd0aDtvKyspe3ZhciBpPWVbb107dyh0LGksbixyKX19LHg9ZnVuY3Rpb24odCxlLG4pe2lmKHZvaWQgMCE9PXQuX193YXRjaGVyc19fJiZ2b2lkIDAhPT10Ll9fd2F0Y2hlcnNfX1tlXSlpZih2b2lkIDA9PT1uKWRlbGV0ZSB0Ll9fd2F0Y2hlcnNfX1tlXTtlbHNlIGZvcih2YXIgcj0wO3I8dC5fX3dhdGNoZXJzX19bZV0ubGVuZ3RoO3IrKyl0Ll9fd2F0Y2hlcnNfX1tlXVtyXT09PW4mJnQuX193YXRjaGVyc19fW2VdLnNwbGljZShyLDEpfSxPPWZ1bmN0aW9uKHQsZSxuKXtmb3IodmFyIHIgaW4gZSllLmhhc093blByb3BlcnR5KHIpJiZ4KHQsZVtyXSxuKX0saj1mdW5jdGlvbiBTKHQsZSl7dmFyIG49W107Zm9yKHZhciByIGluIHQpdC5oYXNPd25Qcm9wZXJ0eShyKSYmKHRbcl1pbnN0YW5jZW9mIE9iamVjdCYmUyh0W3JdLGUpLG4ucHVzaChyKSk7Tyh0LG4sZSl9LG09ZnVuY3Rpb24odCxlKXtpZighKHQgaW5zdGFuY2VvZiBTdHJpbmd8fCF0IGluc3RhbmNlb2YgT2JqZWN0JiYhZih0KSkpaWYoZih0KSl7Zm9yKHZhciBuPVtcIl9fd2F0Y2hhbGxfX1wiXSxyPTA7cjx0Lmxlbmd0aDtyKyspbi5wdXNoKHIpO08odCxuLGUpfWVsc2Ugaih0LGUpfX0sZnVuY3Rpb24odCxlKXt2YXIgbj10LmV4cG9ydHM9e3ZlcnNpb246XCIxLjIuNlwifTtcIm51bWJlclwiPT10eXBlb2YgX19lJiYoX19lPW4pfSxmdW5jdGlvbih0LGUpe3ZhciBuPU9iamVjdDt0LmV4cG9ydHM9e2NyZWF0ZTpuLmNyZWF0ZSxnZXRQcm90bzpuLmdldFByb3RvdHlwZU9mLGlzRW51bTp7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxnZXREZXNjOm4uZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLHNldERlc2M6bi5kZWZpbmVQcm9wZXJ0eSxzZXREZXNjczpuLmRlZmluZVByb3BlcnRpZXMsZ2V0S2V5czpuLmtleXMsZ2V0TmFtZXM6bi5nZXRPd25Qcm9wZXJ0eU5hbWVzLGdldFN5bWJvbHM6bi5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsZWFjaDpbXS5mb3JFYWNofX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17XCJkZWZhdWx0XCI6big1KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17XCJkZWZhdWx0XCI6big2KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMik7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gci5zZXREZXNjKHQsZSxuKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDIpO24oMTcpLHQuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybiByLmdldERlc2ModCxlKX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGEgZnVuY3Rpb24hXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlKXt2YXIgbj17fS50b1N0cmluZzt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIG4uY2FsbCh0KS5zbGljZSg4LC0xKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDcpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7aWYocih0KSx2b2lkIDA9PT1lKXJldHVybiB0O3N3aXRjaChuKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwoZSxuKX07Y2FzZSAyOnJldHVybiBmdW5jdGlvbihuLHIpe3JldHVybiB0LmNhbGwoZSxuLHIpfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scixvKXtyZXR1cm4gdC5jYWxsKGUsbixyLG8pfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdC5hcHBseShlLGFyZ3VtZW50cyl9fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7aWYodm9pZCAwPT10KXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIit0KTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEzKSxvPW4oMSksaT1uKDkpLGM9XCJwcm90b3R5cGVcIixhPWZ1bmN0aW9uKHQsZSxuKXt2YXIgZix1LF8scz10JmEuRixsPXQmYS5HLHA9dCZhLlMsdj10JmEuUCxoPXQmYS5CLGQ9dCZhLlcseT1sP286b1tlXXx8KG9bZV09e30pLGc9bD9yOnA/cltlXToocltlXXx8e30pW2NdO2wmJihuPWUpO2ZvcihmIGluIG4pdT0hcyYmZyYmZiBpbiBnLHUmJmYgaW4geXx8KF89dT9nW2ZdOm5bZl0seVtmXT1sJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBnW2ZdP25bZl06aCYmdT9pKF8scik6ZCYmZ1tmXT09Xz9mdW5jdGlvbih0KXt2YXIgZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcyBpbnN0YW5jZW9mIHQ/bmV3IHQoZSk6dChlKX07cmV0dXJuIGVbY109dFtjXSxlfShfKTp2JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBfP2koRnVuY3Rpb24uY2FsbCxfKTpfLHYmJigoeVtjXXx8KHlbY109e30pKVtmXT1fKSl9O2EuRj0xLGEuRz0yLGEuUz00LGEuUD04LGEuQj0xNixhLlc9MzIsdC5leHBvcnRzPWF9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm4hIXQoKX1jYXRjaChlKXtyZXR1cm4hMH19fSxmdW5jdGlvbih0LGUpe3ZhciBuPXQuZXhwb3J0cz1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cuTWF0aD09TWF0aD93aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJnNlbGYuTWF0aD09TWF0aD9zZWxmOkZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcIm51bWJlclwiPT10eXBlb2YgX19nJiYoX19nPW4pfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big4KTt0LmV4cG9ydHM9T2JqZWN0KFwielwiKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKT9PYmplY3Q6ZnVuY3Rpb24odCl7cmV0dXJuXCJTdHJpbmdcIj09cih0KT90LnNwbGl0KFwiXCIpOk9iamVjdCh0KX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDExKSxvPW4oMSksaT1uKDEyKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXt2YXIgbj0oby5PYmplY3R8fHt9KVt0XXx8T2JqZWN0W3RdLGM9e307Y1t0XT1lKG4pLHIoci5TK3IuRippKGZ1bmN0aW9uKCl7bigxKX0pLFwiT2JqZWN0XCIsYyl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNCksbz1uKDEwKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHIobyh0KSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNik7bigxNSkoXCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JcIixmdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSxuKXtyZXR1cm4gdChyKGUpLG4pfX0pfV0pfSk7IiwiaW1wb3J0IEZyb2dnZXIgZnJvbSAnLi4vRnJvZ2dlci5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuLi9DYXJzL0NhclNlcnZpY2UuanMnO1xuaW1wb3J0IEJvYXJkU2VydmljZSBmcm9tICcuL0JvYXJkU2VydmljZS5qcyc7XG5pbXBvcnQgVHVydGxlU2VydmljZSBmcm9tICcuLi9UdXJ0bGVzL1R1cnRsZVNlcnZpY2UuanMnO1xuaW1wb3J0IFdhdGVyU2VydmljZSBmcm9tICcuLi9XYXRlci9XYXRlclNlcnZpY2UuanMnO1xuXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uLy4uL0V2ZW50RW1pdHRlci5qcyc7XG5pbXBvcnQgeyB3YXRjaCwgdW53YXRjaCB9IGZyb20gJ3dhdGNoLW9iamVjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IG51bGw7XG4gICAgICAgIHRoaXMuZnJvZ2dlciA9IG5ldyBGcm9nZ2VyKCk7XG4gICAgICAgIHRoaXMuY2FycyA9IENhclNlcnZpY2UuY3JlYXRlQ2FycygpO1xuICAgICAgICB0aGlzLnR1cnRsZXMgPSBUdXJ0bGVTZXJ2aWNlLmNyZWF0ZVR1cnRsZXMoKTtcbiAgICAgICAgdGhpcy53YXRlciA9IFdhdGVyU2VydmljZS5jcmVhdGVXYXRlcigpO1xuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgfTtcblxuICAgIHNldEJvYXJkKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2JvYXJkIGRpdicpO1xuICAgICAgICBCb2FyZFNlcnZpY2UuY2xlYXJCb2FyZCh0aGlzLmJvYXJkKTtcbiAgICAgICAgdGhpcy53YXRlci5mb3JFYWNoKCh3YXRlck9iaikgPT4ge1xuICAgICAgICAgICAgd2F0ZXJPYmouc2V0V2F0ZXJQb3NpdGlvbih0aGlzLmJvYXJkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudHVydGxlcy5mb3JFYWNoKCh0dXJ0bGUpID0+IHtcbiAgICAgICAgICAgIHR1cnRsZS5zZXRUdXJ0bGVQb3NpdGlvbih0aGlzLmJvYXJkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZnJvZ2dlci5zZXRGcm9nZ2VyUG9zaXRpb24odGhpcy5ib2FyZCk7XG4gICAgICAgIHRoaXMuY2Fycy5mb3JFYWNoKChjYXIpID0+IHtcbiAgICAgICAgICAgIGNhci5zZXRDYXJQb3NpdGlvbih0aGlzLmJvYXJkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICB9O1xuXG4gICAgbW92ZUZyb2dnZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mcm9nZ2VyLm1vdmUoZXZlbnQpO1xuICAgICAgICBsZXQgdHVydGxlQ29sbGlzaW9uID0gQm9hcmRTZXJ2aWNlLmNoZWNrQ29sbGlzaW9uKHRoaXMuZnJvZ2dlciwgdGhpcy50dXJ0bGVzKTtcbiAgICAgICAgaWYodHVydGxlQ29sbGlzaW9uKXtcbiAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnc2FpbE9uVHVydGxlJywgdHVydGxlQ29sbGlzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEJvYXJkKCk7XG4gICAgfTtcblxuICAgIGNoZWNrQ29sbGlzaW9uKCkge1xuICAgICAgbGV0IGNvbGxpc2lvbiA9IGZhbHNlO1xuICAgICAgbGV0IGNhckNvbGxpc2lvbiA9IEJvYXJkU2VydmljZS5jaGVja0NvbGxpc2lvbih0aGlzLmZyb2dnZXIsIHRoaXMuY2Fycyk7XG4gICAgICBsZXQgd2F0ZXJDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLndhdGVyKTtcbiAgICAgIGxldCB0dXJ0bGVDb2xsaXNpb24gPSBCb2FyZFNlcnZpY2UuY2hlY2tDb2xsaXNpb24odGhpcy5mcm9nZ2VyLCB0aGlzLnR1cnRsZXMpO1xuICAgICAgY2FyQ29sbGlzaW9uICE9PSBmYWxzZSB8fCB3YXRlckNvbGxpc2lvbiAhPT0gZmFsc2UgPyBjb2xsaXNpb24gPSB0cnVlIDogZmFsc2U7IC8vIFRPRE86IGNoZWNrIHRoaXMgY29uZGl0aW9uXG4gICAgICB0dXJ0bGVDb2xsaXNpb24gPyBjb2xsaXNpb24gPSBmYWxzZSA6IGZhbHNlO1xuICAgICAgcmV0dXJuIGNvbGxpc2lvbjtcbiAgICB9O1xuXG4gICAgc3RhcnRNb3ZpbmdMaW5lKG9iamVjdHMsIGxpbmUsIHNwZWVkID0gMTAwMCl7XG4gICAgICByZXR1cm4gd2luZG93LnNldEludGVydmFsKCgpID0+e1xuICAgICAgICBsZXQgZmlsdGVyZWRMaW5lID0gb2JqZWN0cy5maWx0ZXIob2JqID0+IG9iai5saW5lID09IGxpbmUpO1xuICAgICAgICBmaWx0ZXJlZExpbmUuZm9yRWFjaChvYmogPT4gb2JqLm1vdmUoKSk7XG4gICAgICAgIHRoaXMuc2V0Qm9hcmQoKTtcbiAgICAgIH0sIHNwZWVkKTsgLy8gVE9ETzogYWRkIHNwZWVkIGZ1bmN0aW9uYWxpdHlcbiAgICB9O1xuXG4gICAgc3RhcnRCb2FyZCgpIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyLnN1YnNjcmliZSgnc2FpbE9uVHVydGxlJywgKHBvc2l0aW9uKSA9PntcbiAgICAgICAgICBsZXQgc2FpbFR1cnRsZSA9IHRoaXMudHVydGxlcy5maWx0ZXIoKHR1cnRsZSkgPT57XG4gICAgICAgICAgICByZXR1cm4gdHVydGxlLmdldFBvc2l0aW9uKCkgPT09IHBvc2l0aW9uO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHdhdGNoKHNhaWxUdXJ0bGVbMF0sICdwb3NYJywgKCk9PntcbiAgICAgICAgICAgIHRoaXMuZnJvZ2dlci5wb3NYID0gc2FpbFR1cnRsZVswXS5wb3NYO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIHNwZWVkID0gMTEwMDsgaSA8PSA1OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRNb3ZpbmdMaW5lKHRoaXMuY2FycywgaSwgc3BlZWQpO1xuICAgICAgICAgICAgc3BlZWQgPSBzcGVlZCAtIDEwMDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMSwgc3BlZWQgPSA5MDA7IGkgPD0gMjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0TW92aW5nTGluZSh0aGlzLnR1cnRsZXMsIGksIHNwZWVkKTtcbiAgICAgICAgICAgIHNwZWVkID0gNzAwO1xuICAgICAgICB9XG4gICAgfTtcblxufVxuIiwiY29uc3QgQm9hcmRTZXJ2aWNlID0ge1xuXG4gIGNsZWFyQm9hcmQ6IChib2FyZCkgPT4ge1xuICAgIGJvYXJkLmZvckVhY2goKGRpdik9PntcbiAgICAgIGRpdi5jbGFzc05hbWUgPSBcIlwiO1xuICAgIH0pXG4gIH0sXG5cbiAgY2hlY2tDb2xsaXNpb24oZnJvZ2dlciwgZWxlbWVudHMpe1xuICAgIGxldCBmcm9nZ2VyUG9zID0gZnJvZ2dlci5nZXRQb3NpdGlvbigpO1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW0gPT4gZWxlbS5nZXRQb3NpdGlvbigpID09PSBmcm9nZ2VyUG9zID8gcmVzdWx0ID0gZnJvZ2dlclBvcyA6IGZhbHNlKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCb2FyZFNlcnZpY2U7XG4iLCJpbXBvcnQgTW92aW5nT2JqZWN0IGZyb20gJy4uL01vdmluZ09iamVjdC5qcyc7XG5pbXBvcnQgQ2FyU2VydmljZSBmcm9tICcuL0NhclNlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXIgZXh0ZW5kcyBNb3ZpbmdPYmplY3R7XG5cbiAgY29uc3RydWN0b3IocG9zWCwgbGluZSl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnBvc1kgPSBDYXJTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IENhclNlcnZpY2UuZ2VuZXJhdGVEaXJlY3Rpb24obGluZSk7XG4gIH1cblxuICBzZXRDYXJQb3NpdGlvbihib2FyZCl7XG4gICAgdGhpcy5wb3NYID4gMTMgPyB0aGlzLnBvc1ggPSAwIDogZmFsc2U7XG4gICAgdGhpcy5wb3NYIDwgMCA/IHRoaXMucG9zWCA9IDEzIDogZmFsc2U7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcImNhclwiO1xuICB9XG5cbn1cbiIsImltcG9ydCBDYXIgZnJvbSAnLi9DYXIuanMnO1xuXG5jb25zdCBDYXJTZXJ2aWNlID0gIHtcblxuICAgIGNyZWF0ZUNhcnM6ICgpID0+IHtcbiAgICAgICAgbGV0IGNhcnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMDsgaSA8PSAxNTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2FyO1xuICAgICAgICAgICAgaWYobGluZSA9PT0gNSl7XG4gICAgICAgICAgICAgIGxldCBzaXplM0NhciA9IFtdO1xuICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbmV3UG9zWCA9IHBvc1g7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgIGNhciA9IG5ldyBDYXIobmV3UG9zWCwgbGluZSk7XG4gICAgICAgICAgICAgICAgICBuZXdQb3NYKys7XG4gICAgICAgICAgICAgICAgICBzaXplM0Nhci5wdXNoKGNhcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyA0O1xuICAgICAgICAgICAgICBjYXJzID0gW1xuICAgICAgICAgICAgICAgICAgLi4uY2FycyxcbiAgICAgICAgICAgICAgICAgIC4uLnNpemUzQ2FyXG4gICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgIGNhciA9IG5ldyBDYXIocG9zWCwgbGluZSk7XG4gICAgICAgICAgICAgIHBvc1ggPSBwb3NYICsgM1xuICAgICAgICAgICAgICBjYXJzLnB1c2goY2FyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpICUgMyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgbGluZSsrO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NYID0gNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc1ggPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYXJzO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gOTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gNztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVEaXJlY3Rpb246IChsaW5lKSA9PiB7XG4gICAgICAgIHN3aXRjaCAobGluZSkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FyU2VydmljZTtcbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi9Nb3ZpbmdPYmplY3QuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9nZ2VyIGV4dGVuZHMgTW92aW5nT2JqZWN0e1xuICBjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCBkaXJlY3Rpb24sIGxpdmVzKXtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucG9zWCA9IDc7XG4gICAgdGhpcy5wb3NZID0gMTI7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xuICAgIHRoaXMubGl2ZXMgPSAzO1xuICB9O1xuXG4gIHNldEZyb2dnZXJQb3NpdGlvbihib2FyZCl7XG4gICAgYm9hcmRbdGhpcy5nZXRQb3NpdGlvbigpXS5jbGFzc05hbWUgPSBcImZyb2dnZXJcIjtcbiAgfTtcblxuICBtb3ZlKGV2ZW50KXtcbiAgICBzd2l0Y2goZXZlbnQud2hpY2gpe1xuICAgICAgY2FzZSAzNzpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgIHRoaXMucG9zWC0tO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICAgICAgdGhpcy5wb3NZLS07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICB0aGlzLnBvc1grKztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwOlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdkb3duJztcbiAgICAgICAgdGhpcy5wb3NZKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgQm9hcmQgZnJvbSAnLi9Cb2FyZC9Cb2FyZC5qcyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL0V2ZW50RW1pdHRlci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKCk7XG4gICAgfVxuXG4gICAgc3RhcnRHYW1lKCkge1xuICAgICAgICBsZXQgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQnKTtcbiAgICAgICAgZ2VuZXJhdGVEaXZzKGJvYXJkKTtcbiAgICAgICAgdGhpcy5ib2FyZC5zZXRCb2FyZCgpO1xuICAgICAgICB0aGlzLmJvYXJkLnN0YXJ0Qm9hcmQoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsICgpID0+IHRoaXMuYm9hcmQubW92ZUZyb2dnZXIoZXZlbnQpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRGl2cyhib2FyZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTgyOyBpKyspIHtcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1ksIGRpcmVjdGlvbil7XG4gICAgdGhpcy5wb3NYID0gcG9zWDtcbiAgICB0aGlzLnBvc1kgPSBwb3NZO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKXtcbiAgICAgIHJldHVybiB0aGlzLnBvc1ggKyB0aGlzLnBvc1kgKiAxNDtcbiAgfVxuXG4gIG1vdmUoKXtcbiAgICBzd2l0Y2godGhpcy5kaXJlY3Rpb24pe1xuICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgdGhpcy5wb3NYLS07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICB0aGlzLnBvc1grKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aWNPYmplY3R7XG4gIGNvbnN0cnVjdG9yKHBvc1gsIHBvc1kpe1xuICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCl7XG4gICAgICByZXR1cm4gdGhpcy5wb3NYICsgdGhpcy5wb3NZICogMTQ7XG4gIH1cbn1cbiIsImltcG9ydCBNb3ZpbmdPYmplY3QgZnJvbSAnLi4vTW92aW5nT2JqZWN0LmpzJztcbmltcG9ydCBUdXJ0bGVTZXJ2aWNlIGZyb20gJy4vVHVydGxlU2VydmljZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1cnRsZSBleHRlbmRzIE1vdmluZ09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgbGluZSl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5saW5lID0gbGluZTtcbiAgICB0aGlzLnBvc1kgPSBUdXJ0bGVTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgfVxuXG4gIHNldFR1cnRsZVBvc2l0aW9uKGJvYXJkKXtcbiAgICB0aGlzLnBvc1ggPCAwID8gdGhpcy5wb3NYID0gMTMgOiBmYWxzZTtcbiAgICBib2FyZFt0aGlzLmdldFBvc2l0aW9uKCldLmNsYXNzTmFtZSA9IFwidHVydGxlXCI7XG4gIH1cbn1cbiIsImltcG9ydCBUdXJ0bGUgZnJvbSAnLi9UdXJ0bGUuanMnO1xuXG5jb25zdCBUdXJ0bGVTZXJ2aWNlID0ge1xuXG4gIGNyZWF0ZVR1cnRsZXM6ICgpID0+e1xuICAgIGxldCB0dXJ0bGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDEsIGxpbmUgPSAxLCBwb3NYID0gMzsgaSA8PSA3OyBpKyspIHtcbiAgICAgIGxldCB0dXJ0bGU7XG4gICAgICBpZihsaW5lID09IDEpe1xuICAgICAgICBsZXQgc2l6ZTJUdXJ0bGUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIG5ld1Bvc1ggPSBwb3NYOyBqIDwgMjsgaisrKSB7XG4gICAgICAgICAgICB0dXJ0bGUgPSBuZXcgVHVydGxlKG5ld1Bvc1gsIGxpbmUpO1xuICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgc2l6ZTJUdXJ0bGUucHVzaCh0dXJ0bGUpO1xuICAgICAgICB9XG4gICAgICAgIHBvc1ggPSBwb3NYICsgMztcbiAgICAgICAgdHVydGxlcyA9IFtcbiAgICAgICAgICAgIC4uLnR1cnRsZXMsXG4gICAgICAgICAgICAuLi5zaXplMlR1cnRsZVxuICAgICAgICBdO1xuICAgICAgfSBlbHNle1xuICAgICAgICBsZXQgc2l6ZTNUdXJ0bGUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIG5ld1Bvc1ggPSBwb3NYOyBqIDwgMzsgaisrKSB7XG4gICAgICAgICAgICB0dXJ0bGUgPSBuZXcgVHVydGxlKG5ld1Bvc1gsIGxpbmUpO1xuICAgICAgICAgICAgbmV3UG9zWCsrO1xuICAgICAgICAgICAgc2l6ZTNUdXJ0bGUucHVzaCh0dXJ0bGUpO1xuICAgICAgICB9XG4gICAgICAgIHBvc1ggPSBwb3NYICsgNDtcbiAgICAgICAgdHVydGxlcyA9IFtcbiAgICAgICAgICAgIC4uLnR1cnRsZXMsXG4gICAgICAgICAgICAuLi5zaXplM1R1cnRsZVxuICAgICAgICBdO1xuICAgICAgfVxuICAgICAgaWYoaSA9PSA0KXtcbiAgICAgICAgbGluZSA9IDI7XG4gICAgICAgIHBvc1ggPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHVydGxlcztcbiAgfSxcblxuICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiA1O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHVydGxlU2VydmljZTtcbiIsImltcG9ydCBTdGF0aWNPYmplY3QgZnJvbSAnLi4vU3RhdGljT2JqZWN0LmpzJztcbmltcG9ydCBXYXRlclNlcnZpY2UgZnJvbSAnLi9XYXRlclNlcnZpY2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRlciBleHRlbmRzIFN0YXRpY09iamVjdHtcbiAgY29uc3RydWN0b3IocG9zWCwgbGluZSl7XG4gICAgc3VwZXIocG9zWCk7XG4gICAgdGhpcy5wb3NZID0gV2F0ZXJTZXJ2aWNlLmdlbmVyYXRlWVBvcyhsaW5lKTtcbiAgfVxuXG4gIHNldFdhdGVyUG9zaXRpb24oYm9hcmQpe1xuICAgIGJvYXJkW3RoaXMuZ2V0UG9zaXRpb24oKV0uY2xhc3NOYW1lID0gXCJ3YXRlclwiO1xuICB9XG59XG4iLCJpbXBvcnQgV2F0ZXIgZnJvbSAnLi9XYXRlci5qcyc7XG5cbmNvbnN0IFdhdGVyU2VydmljZSA9IHtcbiAgY3JlYXRlV2F0ZXI6ICgpID0+IHtcbiAgICAgIGxldCB3YXRlck9ianMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxLCBsaW5lID0gMSwgcG9zWCA9IDA7IGkgPD0gNzA7IGkrKykge1xuICAgICAgICAgICAgbGV0IHdhdGVyID0gbmV3IFdhdGVyKHBvc1gsIGxpbmUpO1xuICAgICAgICAgICAgcG9zWCA9IHBvc1ggKyAxXG4gICAgICAgICAgICB3YXRlck9ianMucHVzaCh3YXRlcik7XG4gICAgICAgICAgaWYgKGkgJSAxNCA9PSAwKSB7XG4gICAgICAgICAgICAgIGxpbmUrKztcbiAgICAgICAgICAgICAgcG9zWCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHdhdGVyT2JqcztcbiAgfSxcblxuICBnZW5lcmF0ZVlQb3M6IChsaW5lKSA9PiB7XG4gICAgICBzd2l0Y2ggKGxpbmUpIHtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgIHJldHVybiA1O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgIHJldHVybiA0O1xuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgV2F0ZXJTZXJ2aWNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgICB9O1xuXG4gICAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICF0aGlzLmV2ZW50c1tldmVudE5hbWVdID8gdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdIDogZmFsc2U7XG4gICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuXG4gICAgICByZXR1cm4gKCkgPT57XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcihldmVudEZuID0+IGZuICE9PSBldmVudEZuKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZW1pdChldmVudE5hbWUsIGRhdGEpe1xuICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgaWYoZXZlbnQpe1xuICAgICAgICBldmVudC5mb3JFYWNoKGZuID0+e1xuICAgICAgICAgIGZuLmNhbGwobnVsbCwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG59XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0NvbXBvbmVudHMvR2FtZS5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PntcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLnN0YXJ0R2FtZSgpO1xufSk7XG4iXX0=
