/**
 * This file manages the server's socket connections with the clients.
 */

const socketio = require('socket.io');

const SocketManager = function(server) {
  this.io = socketio(server);

  this.startListening = function() {

  };

  this.clientConnected = function(socket) {

  };

  this.clientDisconnected = function(socket) {
    
  };
}

module.exports = SocketManager;