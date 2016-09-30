'use strict';

const Game = require('../../shared/game/game');
const KeyManager = require('./keyListener/keyManager');
const DrawManager = require('./draw/drawManager');
const SocketConnection = require('./socket');
const SocketConstants = require('./socket/socketConstants')

class GameManager {
  constructor() {
    this.game = new Game(this.update.bind(this));
    this.keyManager = new KeyManager();
  }

  start() {
    this.game.start();
    // const localPlayerId = Math.floor(Math.random() * 10000);
    // this.game.addRandomPlayer(localPlayerId);
    this.keyManager.startListening();
    this.drawManager = new DrawManager();
    this.socket = new SocketConnection(this);
    this.socket.connect();
  }

  update() {
    this.draw();
    this.sendClientInputsToServer();
  }

  draw() {
    this.drawManager.draw();

    const ctx = this.drawManager.getDraw();

     _.each(this.game.bullets, (bullet) => {
      bullet.draw(ctx);
    });

     _.each(this.game.spikes, (spike) => {
      spike.draw(ctx);
     });

    // Draw all of the players.
    for(var p in this.game.players) {
      this.game.players[p].draw(ctx);
    };
  }

  updateLobby(id) {
    this.lobbyId = id;
  }

  /**
   * Sends the buffer of user's input keys to the server.
   */
  sendClientInputsToServer() {
    const keyBuffer = this.keyManager.getKeyBuffer();

    if (keyBuffer && keyBuffer.length > 0 && this.lobbyId) {
      const msg = {
        type: SocketConstants.CLIENT_INPUT_UPDATE,
        msg: keyBuffer
      }

      this.sendMessage(msg);
    }
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

  parseGameUpdateFromServer(gameData) {
    for (var p in gameData.players) {
      if (!this.game.players[p]) {
        // Create a new player if that player does not exist.
        const newPlayer = this.game.addPlayer(gameData.players[p].x, gameData.players[p].y, gameData.players[p].skin, p);
        if (p == this.socket.uuid) {
          // This is the local player's player. Set the key listener up for it.
          this.keyManager.setPlayer(newPlayer);
        }
      } else {
        // Update the local player based on the server's player.
        this.game.updatePlayer(p, gameData.players[p]);
      }
    }

    // Remove players that are local that are not on the server's game.
    for (var p in this.game.players) {
      if (!gameData.players[p]) {
        this.game.removePlayer(p);
      }
    }

    // Add in spikes if they don't exist locally.
    if (this.game.spikes.length === 0) {
      this.game.spikes = [];
      _.each(gameData.spikes, (spike) => {
        this.game.addSpike(spike.x, spike.y)
      });
    }

    // TODO: Bring in bullets.
  }

}

module.exports = GameManager;
