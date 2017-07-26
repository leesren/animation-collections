(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PI2 = Math.PI * 2;
var HALFPI = Math.PI / 2;

var Wave = exports.Wave = function () {
  _createClass(Wave, [{
    key: 'init_ops',
    value: function init_ops() {
      this.el = null;
      this.speed = 10; // 速度
      this.amplitude = 50; // 振幅
      this.wavelength = 50; // 波长
      this.segmentLength = 10; // 波片段
      this.lineWidth = 2; // 线宽
      this.time = 0; // 周期
      this.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      this.resizeEvent = function () {};
      this.canvasHeight = 200;
    }
  }]);

  function Wave() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Wave);

    this.init_ops();
    Object.assign(this, options);

    if (!this.el) {
      console.error('No Canvas Selected');
    }
    this.ctx = this.el.getContext('2d');

    if (!this.waves.length) {
      console.log('No waves specified');
    }

    // Internal
    this._resizeWidth();
    window.addEventListener('resize', this._resizeWidth.bind(this));
    // User
    this.resizeEvent();
    window.addEventListener('resize', this.resizeEvent.bind(this));

    if (typeof this.initialize === 'function') {
      this.initialize();
    }
  }

  _createClass(Wave, [{
    key: '_resizeWidth',
    value: function _resizeWidth() {
      this.dpr = window.devicePixelRatio || 1;

      this.width = this.el.width = document.body.clientWidth * this.dpr;
      this.height = this.el.height = this.canvasHeight * this.dpr;
      this.el.style.width = document.body.clientWidth + 'px';
      this.el.style.height = this.canvasHeight + 'px';

      this.waveWidth = this.width * 0.95;
      this.waveLeft = this.width * 0.025;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }, {
    key: 'update',
    value: function update(time) {
      this.time = this.time - 0.007;
      if (typeof time === 'undefined') {
        time = this.time;
      }

      var index = -1;
      var length = this.waves.length;

      while (++index < length) {
        var timeModifier = this.waves[index].timeModifier || 1;
        this.drawSine(time * timeModifier, this.waves[index]);
      }
      index = void 0;
      length = void 0;
    }
  }, {
    key: 'ease',
    value: function ease(percent, amplitude) {
      return amplitude * (Math.sin(percent * PI2 - HALFPI) + 1) * 0.5;
    }
  }, {
    key: 'drawSine',
    value: function drawSine(time) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var amplitude = options.amplitude || this.amplitude;
      var wavelength = options.wavelength || this.wavelength;
      var lineWidth = options.lineWidth || this.lineWidth;
      var strokeStyle = options.strokeStyle || this.strokeStyle;
      var segmentLength = options.segmentLength || this.segmentLength;

      var x = time;
      var y = 0;
      var amp = this.amplitude;

      // Center the waves
      var yAxis = this.height / 2;

      // Styles
      this.ctx.lineWidth = lineWidth * this.dpr;
      this.ctx.strokeStyle = strokeStyle;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.beginPath();

      // Starting Line
      this.ctx.moveTo(0, yAxis);
      this.ctx.lineTo(this.waveLeft, yAxis);

      for (var i = 0; i < this.waveWidth; i += segmentLength) {
        x = time * this.speed + (-yAxis + i) / wavelength;
        y = Math.sin(x);

        // Easing
        amp = this.ease(i / this.waveWidth, amplitude);

        this.ctx.lineTo(i + this.waveLeft, amp * y + yAxis);

        amp = void 0;
      }

      // Ending Line
      this.ctx.lineTo(this.width, yAxis);

      // Stroke it
      this.ctx.stroke();
    }
  }, {
    key: 'run',
    value: function run() {
      this.clear();
      this.update();

      window.requestAnimationFrame(this.run.bind(this));
    }
  }]);

  return Wave;
}();

/***/ })

/******/ });
});
//# sourceMappingURL=Wave.js.map