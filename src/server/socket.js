'use strict';
/**
 * This file manages the server's socket connections with the clients.
 */

const socketio = require('socket.io');
const uuid = require('uuid');
const _ = require('underscore');
const LobbyManager = require('./lobbyManager');
const Client = require('./Models/Client');

class Socket {
  constructor() {
    this.io = null;
    this.clients = [];
    this.lobbyManager = new LobbyManager();
  }

  startListening(server) {
    this.io = socketio(server);

    // When a user connects to the socket.
    this.io.sockets.on('connection', this.clientConnected.bind(this));
  }

  /*
    Creates and adds client to clients list.
  */
  clientConnected(socket) {
    const client = new Client(socket, this);
    this.clients[client.id] = client;
    console.log('Client [' + client.id + '] created. # of Clients: ' + Object.keys(this.clients).length);
  }

  /*
    Removes specified client from clients list. Searches list for matching id.
  */
  clientDisconnected(client) {
    if (client.lobby) {
      // If the client is in a lobby, remove them.
      client.lobby.removeClient(client.id);

      // When the lobby has no pop... 💀 Kill it
      if (client.lobby.population === 0) {
        delete this.lobbyManager.lobbies[client.lobby.id];
      }
    }

    delete this.clients[client.id];
    console.log('Client [' + client.id + '] disconnected. # of Clients: ' + Object.keys(this.clients).length);
  }
}

module.exports = Socket;
