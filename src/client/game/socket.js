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

    // Called when the client first connects to the server.
    this.socket.on('connected', (data) => {
      // Store the unique identifier given to us from the server.
      this.uuid = data.uuid;
    });
  }

  sendMessage(msg) {
    if (this.socket) {
      this.socket.emit('chat message', msg);
    }
  }
}

module.exports = SocketConnection;