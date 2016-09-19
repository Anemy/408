/**
 * This file manages the client's socket connection with the server.
 * TODO: protobufs
 */

class SocketConnection {
  constructor() {
    this.socket = null;
  }

  connect() {
    this.socket = io();
  }

  sendMessage(msg) {
    if (this.socket) {
      this.socket.emit('chat message', msg);
    }
  }
}

module.exports = SocketConnection;