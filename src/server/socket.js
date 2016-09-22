/**
 * This file manages the server's socket connections with the clients.
 *
 * TODO: Make this es6.
 */

const socketio = require('socket.io');
const uuid = require('uuid');
const LobbyManager = require('./lobbyManager');

const SocketManager = function() {
  this.io = null;

  this.usersOnline = 0;

  this.lobbyManager = new LobbyManager();

  this.startListening = function(server) {
    this.io = socketio(server);

    // When a user connects to the socket.
    this.io.sockets.on('connection', this.clientConnected.bind(this));
  };

  // Handler for when a client connects to the server web socket.
  this.clientConnected = function(socket) {
    this.usersOnline++;

    // Assign the client a unique identifier.
    socket.uuid = uuid.v4();
    console.log('A client connected. Online:', this.usersOnline);

    // When a user disconnects from socket .
    socket.on('disconnect', function() {
      this.clientDisconnected();
    }.bind(this));

    socket.on('message', function (data) {
      this.messageRecieved(data);
    }.bind(this));

    // Notify the client that the server has recognized them, and pass them their unique id.
    socket.emit('connected', {uuid: socket.uuid});
  };

  // Handler for when a client disconnects.
  this.clientDisconnected = function() {
    this.usersOnline--;

    console.log('A client disconnected. Online:', this.usersOnline);
  };

  // Handles socket messages 
  this.messageRecieved = function() {

  };
};

module.exports = SocketManager;