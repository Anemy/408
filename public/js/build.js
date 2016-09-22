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
	var Gamemenu = __webpack_require__(9);
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
	var GameManager = __webpack_require__(4);
	var SocketConnection = __webpack_require__(8);

	var game = function () {
	  function game() {
	    _classCallCheck(this, game);
	  }

	  _createClass(game, [{
	    key: 'start',
	    value: function start() {
	      console.log('Starting the gameloop...');

	      this.running = true;

	      this.lastFrame = Date.now();

	      this.drawManager = new DrawManager();
	      this.drawManager.initialize();

	      this.socket = new SocketConnection();
	      this.socket.connect();

	      this.gameManager = new GameManager();
	      this.gameManager.start(this.drawManager);

	      // Start the game loop.
	      // Holds the Javascript setInterval() id of the gameloop.
	      this.intervalId = setInterval(this.loop.bind(this), updateRate);

	      console.log('Gameloop started.');
	    }
	  }, {
	    key: 'loop',
	    value: function loop() {
	      var now = Date.now();
	      var delta = (now - this.lastFrame) / 1000;

	      if (this.running && delta < updateRate * 3 /* Don't allow frames where the cpu has been blocked, it can lead to undefined activity. */) {
	          this.gameManager.update(delta);
	          this.gameManager.draw(this.drawManager);
	        }

	      this.lastFrame = Date.now();
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
	  , gridAmount: 60
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This file manages all of the game objects and their changes in one game tick.
	 */

	var Player = __webpack_require__(5);
	var KeyManager = __webpack_require__(7);

	var gameManager = function () {
	  function gameManager() {
	    _classCallCheck(this, gameManager);
	  }

	  _createClass(gameManager, [{
	    key: 'start',

	    // Initialize the game logic
	    value: function start() {
	      this.players = [];

	      this.addPlayer();
	      this.keyManager = new KeyManager();
	      this.keyManager.startListening(this.players[0]);
	    }
	  }, {
	    key: 'addPlayer',
	    value: function addPlayer() {
	      // TODO: Remove these, they're for quick testing.
	      var randomXSpawn = Math.floor(Math.random() * 500);
	      var randomYSpawn = Math.floor(Math.random() * 500);
	      var skin = 'red';

	      var newPlayer = new Player(randomXSpawn, randomYSpawn, skin);
	      this.players.push(newPlayer);
	    }

	    /*
	    * Updates the game logic for one frame
	    *
	    * @param {Integer} delta - amount of time elapsed since last frame 
	    */

	  }, {
	    key: 'update',
	    value: function update(delta) {
	      // Update all of the players.
	      _.each(this.players, function (player) {
	        player.update(delta);
	      });
	    }
	  }, {
	    key: 'draw',
	    value: function draw(drawManager) {
	      drawManager.draw(this.players);
	    }
	  }]);

	  return gameManager;
	}();

	module.exports = gameManager;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This file contains the player class and the functions related to the player.
	 * Contants for the player are kept in playerConstants.js
	 */

	var PlayerConstants = __webpack_require__(6);

	var Player = function () {
	  /*
	   * Creates the player, placing it at the location provided, with the given skin preset.
	   *
	   * @param {Integer} xSpawn - Location to spawn on x axis.
	   * @param {Integer} ySpawn - Location to spawn on y axis.
	   * @param {Integer} skin - The reference to what the player looks like in playerConstants.skins.
	   */
	  function Player(xSpawn, ySpawn, skin) {
	    _classCallCheck(this, Player);

	    this.x = xSpawn;
	    this.y = ySpawn;

	    // Velocity of x/y movement. 
	    this.xVelocity = 0;
	    this.yVelocity = 0;

	    // Boolean for corresponding movement key being pressed.
	    this.left = false;
	    this.right = false;
	    this.up = false;
	    this.down = false;

	    this.width = PlayerConstants.size;
	    this.height = PlayerConstants.size;

	    this.skin = skin;
	  }

	  _createClass(Player, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      // console.log('Draw player with skin:', this.skin);

	      switch (PlayerConstants.skins[this.skin].type) {
	        case PlayerConstants.skinTypes.COLOR:
	          ctx.fillStyle = PlayerConstants.skins[this.skin].rgb;
	          ctx.fillRect(this.x, this.y, this.width, this.height);
	          break;
	      }
	    }

	    /**
	     * Updates the player for one frame.
	     *
	     * @param {Integer} delta - amount of time elapsed since last update
	     */

	  }, {
	    key: 'update',
	    value: function update(delta) {
	      // Apply friction to slow the player.
	      if (this.xVelocity > PlayerConstants.minAcceleration) {
	        this.xVelocity -= PlayerConstants.frictionAmount * delta;
	      } else if (this.xVelocity < -PlayerConstants.minAcceleration) {
	        this.xVelocity += PlayerConstants.frictionAmount * delta;
	      } else {
	        this.xVelocity = 0;
	      }

	      if (this.yVelocity > PlayerConstants.minAcceleration) {
	        this.yVelocity -= PlayerConstants.frictionAmount * delta;
	      } else if (this.yVelocity < -PlayerConstants.minAcceleration) {
	        this.yVelocity += PlayerConstants.frictionAmount * delta;
	      } else {
	        this.yVelocity = 0;
	      }

	      // Update player velocity based on recorded key presses & delta.
	      if (this.left && this.xVelocity > -PlayerConstants.maxAcceleration) {
	        this.xVelocity -= PlayerConstants.acceleration * delta;
	      }
	      if (this.up && this.yVelocity > -PlayerConstants.maxAcceleration) {
	        this.yVelocity -= PlayerConstants.acceleration * delta;
	      }
	      if (this.right && this.xVelocity < PlayerConstants.maxAcceleration) {
	        this.xVelocity += PlayerConstants.acceleration * delta;
	      }
	      if (this.down && this.yVelocity < PlayerConstants.maxAcceleration) {
	        this.yVelocity += PlayerConstants.acceleration * delta;
	      }

	      this.x += this.xVelocity * delta;
	      this.y += this.yVelocity * delta;
	    }
	  }]);

	  return Player;
	}();

	module.exports = Player;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Constants related to a player.
	 */

	var skinTypes = {
	  COLOR: 1,
	  IMAGE: 2,
	  PATTERN: 3,
	  ANIMATION: 4
	};

	module.exports = {
	  size: 20,
	  frictionAmount: 300,
	  acceleration: 600,
	  minAcceleration: 1,
	  maxAcceleration: 600,

	  // These define the kinds of player skins there are.
	  // For instance a plain blue player would have the presetType COLOR.
	  skinTypes: skinTypes,
	  skins: {
	    'red': {
	      type: skinTypes.COLOR,
	      rgb: 'rgb(255,0,0)'
	    },
	    'blue': {
	      type: skinTypes.COLOR,
	      rgb: 'rgb(0,0,255)'
	    }
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	* Listens to and records key presses
	*/
	var KeyManager = function () {
	  function KeyManager() {
	    _classCallCheck(this, KeyManager);
	  }

	  _createClass(KeyManager, [{
	    key: 'startListening',


	    /* Listen to key presses/releases
	    *
	    * @param {Object} player: the player that key presses are recorded to
	    */
	    value: function startListening(player) {

	      // Listen for key presses.
	      window.addEventListener('keydown', function (event) {
	        switch (event.keyCode) {
	          case 65:
	            player.left = true;
	            break;
	          case 87:
	            player.up = true;
	            break;
	          case 68:
	            player.right = true;
	            break;
	          case 83:
	            player.down = true;
	            break;
	        }
	      });

	      // Listen for key releases
	      window.addEventListener('keyup', function (event) {
	        switch (event.keyCode) {
	          case 65:
	            player.left = false;
	            break;
	          case 87:
	            player.up = false;
	            break;
	          case 68:
	            player.right = false;
	            break;
	          case 83:
	            player.down = false;
	            break;
	        }
	      });
	    }
	  }]);

	  return KeyManager;
	}();

	module.exports = KeyManager;

/***/ },
/* 8 */
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
	      var _this = this;

	      this.socket = io();

	      // Called when the client first connects to the server.
	      this.socket.on('connected', function (data) {
	        // Store the unique identifier given to us from the server.
	        _this.uuid = data.uuid;
	      });
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
/* 9 */
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