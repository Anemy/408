'use strict';

const _ = require('underscore');
const uuid = require('uuid');
const SocketConstants = require('../../client/game/socket/socketConstants');
const Game = require('../../shared/game/game');
const KeyManager = require('../../shared/keyListener/keyManager');
const Constants = require('../../shared/game/constants');

class Lobby {
  constructor() {
    // TODO: Make this more fun (i.e. adjective + noun).
    this.id = uuid.v4();
    this.clients = {};

    // Keep an up to date population so we don't have to rely off of Object.keys because this is a map;
    this.population = 0;
    this.capacity = Constants.maxLobbyCapacity;

    // Create the game instance for the server.
    this.game = new Game(this.updateClients.bind(this));
    this.game.start();
    this.game.createMap();
    this.keyManager = new KeyManager();
  }

  addClient(client) {
    if (this.population >= this.capacity) {
      // Don't let clients join when the lobby is full.
      return false;
    }

    this.clients[client.id] = client;
    this.population++;

    // Add the client into the game.
    this.game.addRandomPlayer(client.id, client.username || '');

    // Let them know it was a success.
    return true;
  }

  removeClient(clientId) {
    if (this.game) {
      this.game.removePlayer(clientId);
    }

    delete this.clients[clientId];
    this.population--;
  }

  sendChat(msg) {
    // Send the chat message to all of the clients in the lobby.
    _.forEach(this.clients, client => {
      client.emit('message', msg);
    });
  }

  parseUserKeyInput(clientId, clientInputKeyBuffer) {
    if (this.game.players[clientId]) {
      this.keyManager.interpretKeyBuffer(this.game.players[clientId], clientInputKeyBuffer);
    }
  }

  /**
   * This function sends game updates to all of the players in the lobby.
   *
   * @param {Object} gameData - The current state of the game to send to the players in the lobby.
   */
  updateClients(gameData) {
    const msg = {
      // Define the kind of message to be sent to the client.
      type: SocketConstants.GAME_UPDATE,
      msg: gameData
    };

    // if (Math.random() * 1000 > 990)
    //   console.log('Send up date to all of the clients:', msg);

    // Send the game update to all of the clients in the lobby.
    _.forEach(this.clients, client => {
      client.socket.emit('message', msg);
    });
  }
}

module.exports = Lobby;
