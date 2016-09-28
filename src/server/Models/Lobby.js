'use strict';

const _ = require('underscore');
const uuid = require('uuid');
const SocketConstants = require('../../client/game/socket/socketConstants');

class Lobby {
  constructor() {
    // TODO: make this more fun (i.e. adjective + noun)
    this.id = uuid.v4();
    this.clients = [];

    // Keep an up to date population so we don't have to rely off of Object.keys because this is a map;
    this.population = 0;
    this.capacity = 4;
  }

  addClient(client) {
    if (this.population >= this.capacity) {
      // Don't let clients join when the lobby is full.
      return false;
    }

    this.clients[client.id] = client;
    this.population++;

    // Let them know it was a success.
    return true;
  }

  removeClient(clientId) {
    delete this.clients[clientId];
    this.population--;
  }

  sendChat(msg) {
    // Send the chat message to all of the players in the game.
    _.each(this.clients, (client) => {
      client.socket.emit('message', msg);
    });
  }
}

module.exports = Lobby;
