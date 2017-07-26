(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("lodash")) : factory(root["_"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StarsText = exports.Dot = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dot = exports.Dot = function () {
  function Dot(centerX, centerY, centerZ, radius) {
    _classCallCheck(this, Dot);

    this.dx = centerX; // 最后的位置，真正要进场到的位置
    this.dy = centerY;
    this.dz = centerZ;
    this.tx = 0; // 出场后的停留位置
    this.ty = 0;
    this.tz = 0;
    this.x = centerX;
    this.y = centerY;
    this.z = centerZ;
    this.zMax = centerZ; // 用于计算alpha值
    this.radius = radius;
  }

  _createClass(Dot, [{
    key: 'paint',
    value: function paint(canvas, focallength) {
      var context = canvas.getContext('2d');
      var scale = focallength / (focallength + this.z);
      var alpha = _lodash2.default.round(1 - Math.abs(this.z / this.zMax), 2);

      context.save();
      context.beginPath();
      context.arc(canvas.width / 2 + (this.x - canvas.width / 2) * scale, canvas.height / 2 + (this.y - canvas.height / 2) * scale, this.radius * scale, 0, 2 * Math.PI);
      context.fillStyle = 'rgba(255,255,255,' + alpha + ')';
      context.fill();
      context.restore();
    }
  }]);

  return Dot;
}();

var StarsText = exports.StarsText = function () {
  _createClass(StarsText, [{
    key: 'set_default',
    value: function set_default() {
      this.focallength = 100; // z轴的深度
      this.animateRunning = false;
      this.requestId = 0; //animate frame request id
      this.lastTime = 0;
      this.direction = true; //方向进场还是出场
      this.pause = false;
      this.canvasHeight = 200;
      this.fontSize = 200;
      this.dpr = window.devicePixelRatio || 1;
    }
  }]);

  function StarsText(canvas) {
    _classCallCheck(this, StarsText);

    this.set_default();
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this._resizeWidth();
  }

  _createClass(StarsText, [{
    key: '_resizeWidth',
    value: function _resizeWidth() {
      // 设置 canvas 的宽高，防止出现高分辨屏幕变模糊
      this.width = this.canvas.width = document.body.clientWidth * this.dpr;
      this.height = this.canvas.height = this.canvasHeight * this.dpr;
      this.fontSize = this.fontSize * 0.95;
    }
    // 入场某个文字或者图片

  }, {
    key: 'animateContent',
    value: function animateContent(text) {
      var _this = this;

      window.cancelAnimationFrame(this.requestId);
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.dots = this._getContentData(text);
      this.direction = true;
      this.pause = false;

      // 初始化点位置
      _lodash2.default.each(this.dots, function (dot) {
        dot.x = Math.random() * _this.canvas.width;
        dot.y = Math.random() * _this.canvas.height;
        dot.z = Math.random() * _this.focallength * 2 - _this.focallength;

        dot.zMax = dot.z;

        dot.tx = Math.random() * _this.canvas.width;
        dot.ty = Math.random() * _this.canvas.height;
        dot.tz = Math.random() * _this.focallength * 2 - _this.focallength;
        dot.paint(_this.canvas, _this.focallength);
      });

      // 开始进场
      this._animate();
    }

    // 点运动

  }, {
    key: '_animate',
    value: function _animate() {
      var _this2 = this;

      this.animateRunning = true;
      var thisTime = +new Date();
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      _lodash2.default.each(this.dots, function (dot) {
        // console.log(this.direction)
        if (_this2.direction) {
          if (Math.abs(dot.dx - dot.x) < 0.1 && Math.abs(dot.dy - dot.y) < 0.1 && Math.abs(dot.dz - dot.z) < 0.1) {
            dot.x = dot.dx;
            dot.y = dot.dy;
            dot.z = dot.dz;

            if (thisTime - _this2.lastTime > 300) {
              _this2.direction = false;
            }
          } else {
            dot.x = dot.x + (dot.dx - dot.x) * 0.1;
            dot.y = dot.y + (dot.dy - dot.y) * 0.1;
            dot.z = dot.z + (dot.dz - dot.z) * 0.1;
            _this2.lastTime = +new Date();
          }
        } else {
          if (Math.abs(dot.tx - dot.x) < 0.1 && Math.abs(dot.ty - dot.y) < 0.1 && Math.abs(dot.tz - dot.z) < 0.1) {
            dot.x = dot.tx;
            dot.y = dot.ty;
            dot.z = dot.tz;
            _this2.pause = true;
          } else {
            dot.zMax = dot.tz; // 出场目标z值

            dot.x = dot.x + (dot.tx - dot.x) * 0.1;
            dot.y = dot.y + (dot.ty - dot.y) * 0.1;
            dot.z = dot.z + (dot.tz - dot.z) * 0.1;
            // this.pause = false
          }
        }
        dot.paint(_this2.canvas, _this2.focallength);
      });

      if (!this.pause) {
        if ('requestAnimationFrame' in window) {
          this.requestId = window.requestAnimationFrame(this._animate.bind(this));
        }
      }
    }

    // 从文字获取信息生成点

  }, {
    key: '_getContentData',
    value: function _getContentData(text) {
      if (text.toString() === '[object HTMLImageElement]') {
        this._drawImg(text);
      } else {
        this._drawText(text);
      }

      var imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var dots = [];

      for (var x = 0; x < imgData.width; x += 5) {
        // 6是step
        for (var y = 0; y < imgData.height; y += 5) {
          var i = (y * imgData.width + x) * 4; // x列 y行的点
          if (imgData.data[i] >= 128) {
            // rgb的r值大于128
            var dot = new Dot(x - 3, y - 3, 0, 1);
            dots.push(dot);
          }
        }
      }
      return dots;
    }
  }, {
    key: '_drawText',
    value: function _drawText(text) {
      var context = this.context,
          canvas = this.canvas;

      context.save();
      context.font = this.fontSize + 'px 微软雅黑 bold';
      context.fillStyle = 'rgba(168,168,168,1)';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width / 2, canvas.height / 2);
      context.restore();
    }
  }, {
    key: '_drawImg',
    value: function _drawImg(img) {
      var context = this.context,
          canvas = this.canvas;

      var width = img.width;
      var height = img.height;
      var x = 0;
      var y = 0;

      if (img.width > canvas.width || img.height > canvas.height) {
        var wgth = img.width / canvas.width - img.height / canvas.height;
        if (wgth) {
          width = parseInt(canvas.width / 3, 10);
          height = img.height * width / img.width;
        } else {
          width = parseInt(canvas.height / 3, 10);
          height = img.width * height / img.height;
        }
      }

      x = (canvas.width - width) / 2;
      y = (canvas.height - height) / 2;

      context.save();
      context.drawImage(img, 0, 0, img.width, img.height, x, y, width, height);
      context.restore();
    }
  }]);

  return StarsText;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=StarsText.js.map