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

	var game = __webpack_require__(1);

	console.log('Clientside js :D');

	game.start();



/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * This folder contains the gameloop which runs the game.
	 */

	// Frames per second.
	const fps = 60;
	const updateRate = 1000 / fps;

	const game = {
	  intervalId: null,
	  running: false,

	  start: function() {
	    console.log('Starting gameloop...');

	    // Start the game loop
	    this.intervalId = setInterval(this.loop, updateRate);

	    this.running = true;

	    console.log('Gameloop started.');
	  },

	  loop: function() {

	  },

	  pause: function() {

	  },

	  stop: function() {

	  }
	};

	module.exports = game;

/***/ }
/******/ ]);