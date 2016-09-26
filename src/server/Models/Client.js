'use strict';

const uuid = require('uuid');
const SocketConstants = require('../../client/game/socket/socketConstants');

class Client {

  constructor(socket, socketManager) {
    // TODO: make this more fun (i.e. adjective + noun)
    this.id = uuid.v4();
    this.lobby = null;
    this.socket = socket;
    this.socketManager = socketManager;
    this.socket.uuid = this.id;
    this.socket.emit('connected', {uuid: socket.uuid});
    this.socket.on('disconnect', this.onDisconnect.bind(this));
    this.socket.on('message', this.onMessage.bind(this));
  }

  onDisconnect() {
    this.socketManager.clientDisconnected(this);
  }

  onMessage(msg) {
    const messageType = msg.type || -1;
    switch(messageType) {
      case SocketConstants.CHAT:
        // Only allow messages of a limited length (This is also checked on client).
        if (msg.msg && msg.msg.length < SocketConstants.maxChatMessageLength) {
          // Attach a sender id to the message and send it to chat.
          // TODO: Attach the user's username.
          const msgToSend = {
            type: SocketConstants.CHAT,
            sender: this.id,
            msg: msg.msg
          }

          this.chat(msgToSend);
        }
        break;
      case SocketConstants.FIND_GAME:
        this.findGame();
        break;
    }
  }

  /*
    Sends chat message to lobby
    TODO allow chat messages to be sent to everyone or group or whatever
  */
  chat(msg) {
    if (this.lobby) {
      // When in a lobby, send the message to only the lobby.
      this.lobby.sendChat(msg)
    } else {
      // When not in a lobby, send the chat to the general chat.
      this.socket.broadcast.emit('message', msg);
    }
  }

  /*
    Finds and joins a game. Stores the lobby in the client object
  */
  findGame() {
    const lobby = this.socketManager.lobbyManager.findGame(this);
    this.lobby = lobby;

    const msg = {
      type: SocketConstants.GAME_FOUND,
      lobbyId: this.id
    };
    // Let the client know the id of the lobby they've been added to.
    this.socket.emit('message', msg);
  }

}

module.exports = Client;
