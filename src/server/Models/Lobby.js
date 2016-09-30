'use strict';

const _ = require('underscore');
const uuid = require('uuid');
const SocketConstants = require('../../client/game/socket/socketConstants');
const Game = require('../../client/game/gameloop');

class Lobby {
  constructor() {
    // TODO: Make this more fun (i.e. adjective + noun).
    this.id = uuid.v4();
    this.clients = [];

    // Keep an up to date population so we don't have to rely off of Object.keys because this is a map;
    this.population = 0;
    this.capacity = 4;

    // Create the game instance for the server.
    this.game = new Game();
    this.game.start(false /* Not running on client. */, this.updateClients.bind(this));
  }

  addClient(client) {
    if (this.population >= this.capacity) {
      // Don't let clients join when the lobby is full.
      return false;
    }

    this.clients[client.id] = client;
    this.population++;

    // Add the client into the game.
    this.game.gameManager.addPlayer(client.id);

    // Let them know it was a success.
    return true;
  }

  removeClient(clientId) {
    delete this.clients[clientId];
    this.population--;
  }

  sendChat(msg) {
    // Send the chat message to all of the clients in the lobby.
    for(var c in this.clients) {
      this.clients[c].socket.emit('message', gameData);
    }
  }

  /**
   * This function sends game updates to all of the players in the lobby.
   *
   * @param {Object} gameData - The current state of the game to send to the players in the lobby.
   */
  updateClients(gameData) {
    // Define the kind of message to be sent to the client.
    gameData.type = SocketConstants.GAME_UPDATE;

    // console.log('Send update to clients.');

    // Send the game update to all of the clients in the lobby.
    for(var c in this.clients) {
      this.clients[c].socket.emit('message', gameData);
    }
  }
}

module.exports = Lobby;
