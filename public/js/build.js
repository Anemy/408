/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Gameloop = __webpack_require__(1);
	var game = new Gameloop();

	$(document).ready(function () {
	  game.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This folder contains the gameloop which runs the game.
	 */

	// Frames per second.
	var fps = 60;
	var updateRate = 1000 / fps;

	var DrawManager = __webpack_require__(2);

	var game = function () {
	  function game() {
	    _classCallCheck(this, game);
	  }

	  _createClass(game, [{
	    key: 'start',
	    value: function start() {
	      console.log('Starting the gameloop...');

	      this.running = true;

	      this.drawManager = new DrawManager();
	      this.drawManager.initialize();

	      // Start the game loop.
	      // Holds the Javascript setInterval() id of the gameloop.
	      this.intervalId = setInterval(this.loop.bind(this), updateRate);

	      console.log('Gameloop started.');
	    }
	  }, {
	    key: 'loop',
	    value: function loop() {
	      // console.log('Loop!',new Date());

	      // debugger;

	      if (this.running) {
	        this.drawManager.draw();
	      }
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {}
	  }, {
	    key: 'stop',
	    value: function stop() {}
	  }]);

	  return game;
	}();

	;

	module.exports = game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This object manages the drawing in the game.
	 */

	var drawManager = function () {
	  function drawManager() {
	    _classCallCheck(this, drawManager);
	  }

	  _createClass(drawManager, [{
	    key: 'initialize',
	    value: function initialize() {
	      // Get the user's browser dimensions.
	      this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	      this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	      var canvas = document.getElementById('gameCanvas');

	      // The drawable canvas reference.
	      this.ctx = canvas.getContext('2d');

	      this.ctx.canvas.width = this.width;
	      this.ctx.canvas.height = this.height;
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      // console.log('Draw called.');
	      this.ctx.clearRect(0, 0, this.width, this.height);

	      this.ctx.fillStyle = '#FDFDFD';
	      this.ctx.fillRect(0, 0, this.width, this.height);

	      var gridAmount = 30;
	      this.ctx.strokeStyle = '#2B2B4A';
	      for (var i = 0; i < gridAmount + 1; i++) {
	        this.ctx.beginPath();
	        this.ctx.moveTo(this.width * (i / gridAmount), 0);
	        this.ctx.lineTo(this.width * (i / gridAmount), this.height);
	        this.ctx.stroke();

	        this.ctx.beginPath();
	        this.ctx.moveTo(0, this.height * (i / gridAmount));
	        this.ctx.lineTo(this.width, this.height * (i / gridAmount));
	        this.ctx.stroke();
	      }
	    }
	  }]);

	  return drawManager;
	}();

	module.exports = drawManager;

/***/ }
/******/ ]);