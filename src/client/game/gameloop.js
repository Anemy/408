/**
 * This folder contains the gameloop which runs the game.
 */

// Frames per second.
const fps = 60;
const updateRate = 1000 / fps;

const drawManager = require('./drawManager');

class game {
  constructor() {
    this.drawManager = new drawManager();

    // Holds the Javascript setInterval() id of the gameloop.
    this.intervalId = null;
    this.running = false;
  }

  start() {
    console.log('Starting the gameloop...');

    // Start the game loop
    this.intervalId = setInterval(this.loop, updateRate);

    this.running = true;

    console.log('Gameloop started.');
  }

  loop() {
    if (this.running) {

    }
  }

  pause() {

  }

  stop() {

  }
};

module.exports = game;