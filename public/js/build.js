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
	var Gamemenu = __webpack_require__(5);
	var game = new Gameloop();
	var menu = new Gamemenu();

	$(document).ready(function () {
	  menu.start();
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
	var SocketConnection = __webpack_require__(4);

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

	      this.socket = new SocketConnection();
	      this.socket.connect();

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

	module.exports = game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This object manages the drawing in the game.
	 */

	// Load in the constants (colors, sizes, etc.) for drawing.
	var DrawConstants = __webpack_require__(3);

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
	    value: function draw(drawableObjects) {
	      var _this = this;

	      // Clear the last frame.
	      this.ctx.clearRect(0, 0, this.width, this.height);

	      this.drawMap();

	      // Call the drawing method of each drawable object.
	      _.each(drawableObjects, function (drawableObject) {
	        drawableObject.draw(_this.ctx);
	      });
	    }
	  }, {
	    key: 'drawMap',
	    value: function drawMap() {
	      this.ctx.fillStyle = DrawConstants.mapBackgroundColor;
	      this.ctx.fillRect(0, 0, this.width, this.height);

	      var gridSize = this.width / DrawConstants.gridAmount;
	      this.ctx.strokeStyle = DrawConstants.mapGridColor;
	      for (var i = 0; i < DrawConstants.gridAmount + 1; i++) {
	        // Randomly paint in certain squares to flicker.
	        // for(var k = 0; k < DrawConstants.gridAmount + 1; k++) {
	        //   if (Math.random() * 10 < 2) {
	        //     const red = (245 - Math.floor(Math.random() * DrawConstants.mapGridFlickerRange));
	        //     const green = (245 - Math.floor(Math.random() * DrawConstants.mapGridFlickerRange));
	        //     const blue = (225 - Math.floor(Math.random() * DrawConstants.mapGridFlickerRange));

	        //     this.ctx.fillStyle = `rgb(${red},${green},${blue})`;
	        //     this.ctx.fillRect(gridSize * i, gridSize * k, gridSize, gridSize);
	        //   }
	        // }

	        // Vertical lines.
	        this.ctx.beginPath();
	        this.ctx.moveTo(gridSize * i, 0);
	        this.ctx.lineTo(gridSize * i, this.height);
	        this.ctx.stroke();

	        // Horizontal lines.
	        // Because of the 16:9 aspect ratio, only draw squares, this means that there are more in the square
	        if (gridSize * i < this.height) {
	          this.ctx.beginPath();
	          this.ctx.moveTo(0, gridSize * i);
	          this.ctx.lineTo(this.width, gridSize * i);
	          this.ctx.stroke();
	        } else if (gridSize * (i - 1) <= this.height) {
	          // This draws the end border line.
	          this.ctx.beginPath();
	          this.ctx.moveTo(0, this.height);
	          this.ctx.lineTo(this.width, this.height);
	          this.ctx.stroke();
	        }
	      }
	    }
	  }]);

	  return drawManager;
	}();

	module.exports = drawManager;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * This file holds the constants for rendering the game. Colors, sizes, etc.
	 */

	module.exports = {
	  mapBackgroundColor: '#FDFDFD',
	  mapGridColor: '#ABABCA',
	  mapGridFlickerRange: 30 /* Out of 255. */
	  , gridAmount: 20
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This file manages the client's socket connection with the server.
	 * TODO: protobufs
	 */

	var SocketConnection = function () {
	  function SocketConnection() {
	    _classCallCheck(this, SocketConnection);

	    this.socket = null;
	  }

	  _createClass(SocketConnection, [{
	    key: 'connect',
	    value: function connect() {
	      this.socket = io();
	    }
	  }, {
	    key: 'sendMessage',
	    value: function sendMessage(msg) {
	      if (this.socket) {
	        this.socket.emit('chat message', msg);
	      }
	    }
	  }]);

	  return SocketConnection;
	}();

	module.exports = SocketConnection;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This is the entry point of the game menus.
	 */

	var gameMenu = function () {
	  function gameMenu() {
	    _classCallCheck(this, gameMenu);
	  }

	  _createClass(gameMenu, [{
	    key: "start",
	    value: function start() {}
	  }]);

	  return gameMenu;
	}();

	module.exports = gameMenu;

/***/ }
/******/ ]);