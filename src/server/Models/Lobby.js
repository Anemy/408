'use strict';

const _ = require('underscore');
const uuid = require('uuid');
const SocketConstants = require('../../client/game/socket/socketConstants');

class Lobby {
  constructor() {
    // TODO: make this more fun (i.e. adjective + noun)
    this.id = uuid.v4();
    this.clients = [];
    this.capacity = 4;
  }

  addClient(client) {
    this.clients[client.id] = client;

    // Let them know it was a success.
    return true;
  }

  sendChat(msg) {
    // Send the chat message to all of the players in the game.
    _.each(this.clients, (client) => {
      client.socket.emit('message', msg);
    });
  }

}

module.exports = Lobby;
