/**
 * This folder contains the gameloop which runs the game.
 */

// Frames per second.
const fps = 60;
const updateRate = 1000 / fps;

const DrawManager = require('./draw/drawManager');
const GameManager = require('./gameManager');
const SocketConnection = require('./socket');

class game {
  start() {
    console.log('Starting the gameloop...');

    this.running = true; 

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

  loop() {
    // console.log('Loop!',new Date()); 

    // debugger;

    if (this.running) {
      this.gameManager.update();
      this.gameManager.draw(this.drawManager);
    }
  }

  pause() {

  }

  stop() {

  }
}

module.exports = game;