/**
 * This file manages the server's socket connections with the clients.
 *
 * TODO: Make this es6.
 */

const socketio = require('socket.io');

const SocketManager = function() {
  this.io = null;

  this.startListening = function(server) {
    this.io = socketio(server);

    // When a user connects to the socket.
    this.io.sockets.on('connection', this.clientConnected.bind(this));
  };

  this.clientConnected = function(socket) {
    console.log('A client connected.');

    // When a user disconnects from socket .
    socket.on('disconnect', function (){
      this.clientDisconnected();
    }.bind(this));
  };

  this.clientDisconnected = function() {
    console.log('A client disconnected.');
  };
};

module.exports = SocketManager;