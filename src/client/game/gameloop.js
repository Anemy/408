'use strict';

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
  /**
   * Starts the game loop running and creates a socket connection to the server (if it's a client).
   * 
   * @param {Boolean} isClient - When true, the game instance is running on the client.
   */
  start(isClient, sendServerUpdate) {
    this.running = true; 

    this.isClient = isClient;
    this.isServer = !isClient; // Just for ease of use.

    this.lastFrame = Date.now();

    this.gameManager = new GameManager(isClient);
    this.gameManager.start(this.drawManager);

    if (isClient) {
      this.drawManager = new DrawManager();
      this.drawManager.initialize();

      this.socket = new SocketConnection(this.gameManager);
      this.socket.connect();
    } else {
      this.sendServerUpdate = sendServerUpdate;
    }

    // Start the game loop.
    // Holds the Javascript setInterval() id of the gameloop.
    this.intervalId = setInterval(this.loop.bind(this), updateRate);
  }

  loop() {
    const now = Date.now();
    const delta = (now - this.lastFrame) / 1000;

    if (this.running && delta < updateRate * 3 /* Don't allow frames where the cpu has been blocked, it can lead to undefined activity. */) {
      this.gameManager.update(delta);

      if (this.isClient) {
        this.gameManager.draw(this.drawManager);
      } else {
        // Send an update to all of the clients in the lobby if this is the server.
        this.sendServerUpdate(this.gameManager.getGameData());
      }
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