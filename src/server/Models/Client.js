const uuid = require('uuid');
const MessageTypes = require('../socketMessageConstants');

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

  onMessage(data) {
    const messageType = data.type || -1;
    switch(messageType) {
      case messageTypes.CHAT:
        this.chat(data.msg);
        break;
      case MessageTypes.FIND_GAME:
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
      this.lobby.sendChat(msg)
    }
  }

  /*
    Finds and joins a game. Stores the lobby in the client object
  */
  findGame() {
    const lobby = this.socketManager.lobbyManager.findGame(this);
    this.lobby = lobby;
  }

}

module.exports = Client;
