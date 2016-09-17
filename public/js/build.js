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

	game.start();

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

	var drawManager = __webpack_require__(2);

	var game = function () {
	  function game() {
	    _classCallCheck(this, game);

	    this.drawManager = new drawManager();

	    // Holds the Javascript setInterval() id of the gameloop.
	    this.intervalId = null;
	    this.running = false;
	  }

	  _createClass(game, [{
	    key: 'start',
	    value: function start() {
	      console.log('Starting the gameloop...');

	      // Start the game loop
	      this.intervalId = setInterval(this.loop, updateRate);

	      this.running = true;

	      console.log('Gameloop started.');
	    }
	  }, {
	    key: 'loop',
	    value: function loop() {
	      if (this.running) {}
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
	      this.browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	      this.browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	      var canvas = document.getElementById('gameCanvas');

	      // The drawable canvas reference.
	      this.ctx = canvas.getContext('2d');

	      ctx.canvas.width = this.browserWidth;
	      ctx.canvas.height = this.browserHeight;
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      console.log('Draw called.');
	    }
	  }]);

	  return drawManager;
	}();

	module.exports = drawManager;

/***/ }
/******/ ]);