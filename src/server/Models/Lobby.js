'use strict';

const uuid = require('uuid');

class Lobby {
  constructor() {
    // TODO: make this more fun (i.e. adjective + noun)
    this.id = uuid.v4();
    this.clients = [];
    this.capacity = 4;
  }

  addClient(client) {
    this.clients.push(client);
    return true;
  }

  sendChat(msg) {
    // TODO send msg to everyone in lobby
  }

}

module.exports = Lobby;
