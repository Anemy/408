'use strict';

/**
 * This file manages the client's socket connection with the server.
 * TODO: protobufs
 */

const SocketConstants = require('./socket/socketConstants');
const gameManager = require('./gameManager');

class SocketConnection {

  connect() {
    this.socket = io();

    // Called when the client first connects to the server.
    this.socket.on('connected', (data) => {
      // Store the unique identifier given to us from the server.
      this.uuid = data.uuid;
    });

    this.socket.on('message', this.recieveMessage.bind(this));
  }

  sendMessage(msg) {
    if (this.socket) {
      this.socket.emit('message', msg);
    } else {
      new Error('Error: Trying to send message without an established connection to server.');
    }
  }

  recieveMessage(msg) {
    switch(msg.type) {
    case SocketConstants.CHAT:
      console.log('Chat message recieved:', msg.msg);
      break;
    case SocketConstants.GAME_FOUND:
      console.log('Game found! Lobby id:', msg.lobbyId);
      console.log(gameManager);
      gameManager.updateLobby(msg.lobbyId);
      break;
    case SocketConstants.LOBBIES_INFO:
      console.log('Lobby info update from server:', msg.lobbiesInfo);
      break;
    case SocketConstants.ERROR:
      console.log('Error from server:', msg.msg);
      break;
    case SocketConstants.GAME_UPDATE:
      // if (Math.random() * 100 > 95)
      //    console.log('Game update from server:', msg.msg);
      gameManager.parseGameUpdateFromServer(msg.msg);
      break;
    default:
      // When we don't have a case for the server message type we just throw an error.
      throw new Error('Unidentifiable message from server.');
    }
  }
}

let socket;

function getInstance() {
  if (!socket) {
    socket = new SocketConnection();
  }
  return socket;
}

module.exports = getInstance();
