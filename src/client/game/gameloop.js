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
  }

  loop() {
    const now = Date.now();
    const delta = (now - this.lastFrame) / 1000;

    if (this.running && delta < updateRate * 3 /* Don't allow frames where the cpu has been blocked, it can lead to undefined activity. */) {
      this.gameManager.update(delta);
      this.gameManager.draw(this.drawManager);
    }
    
    this.lastFrame = Date.now();
  }

  /**
    * Used to send messages to the server.
    */
  sendMessage(msg) {
    if (this.socket) {
      this.socket.sendMessage(msg);
    } else {
      new Error('Trying to send message without an established connection to server.');
    }
  }
}

module.exports = game;