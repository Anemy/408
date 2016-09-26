'use strict';
/**
 * This file manages the server's socket connections with the clients.
 */

const socketio = require('socket.io');
const uuid = require('uuid');
const _ = require('underscore');
const LobbyManager = require('./lobbyManager');
const Client = require('./Models/Client');

class SocketManager {

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
    delete this.clients[client.id];
    console.log('Client [' + client.id + '] disconnected. # of Clients: ' + Object.keys(this.clients).length);
  }
};

module.exports = SocketManager;