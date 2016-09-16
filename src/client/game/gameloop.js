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