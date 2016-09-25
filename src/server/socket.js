/**
 * This file manages the server's socket connections with the clients.
 *
 * TODO: Make this es6.
 */

const socketio = require('socket.io');
const uuid = require('uuid');
const LobbyManager = require('./lobbyManager');
const MessageTypes = require('./socketMessageConstants');

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
  this.clientConnected = function(client) {
    this.usersOnline++;

    // Assign the client a unique identifier.
    client.uuid = uuid.v4();
    console.log('A client connected. Online:', this.usersOnline);

    // When a user disconnects from client .
    client.on('disconnect', function() {
      this.clientDisconnected();
    }.bind(this));

    client.on('message', function (data) {
      this.messageRecieved(client, data);
    }.bind(this));

    // Notify the client that the server has recognized them, and pass them their unique id.
    client.emit('connected', {uuid: client.uuid});
  };

  // Handler for when a client disconnects.
  this.clientDisconnected = function() {
    this.usersOnline--;

    console.log('A client disconnected. Online:', this.usersOnline);
  };

  // Handles socket messages 
  this.messageRecieved = function(client, data) {

    console.log('Message recieved from client.');

    const messageType = data.type || -1 /* Negative one is an invalid message. */;

    switch(messageType) {
      case MessageTypes.CHAT:
        // Send the chat message to all of the clients.
        // TODO: Sanitize HTML on the message here or on the client.
        io.sockets.emit('message', {type: messageType, msg: data.msg});
        break;

      case MessageTypes.FIND_GAME:
        this.lobbyManager.findGame(client);
        break;
    }
  };
};

module.exports = SocketManager;