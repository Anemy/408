const SocketConstants = require('./socket/socketConstants');

const socket = {
  sendMessage: function() {

  },
  receiveMessage: function(msg) {
    switch(msg.type) {
    case SocketConstants.CHAT:
      console.log('Chat message recieved:', msg.msg);
      break;
    case SocketConstants.GAME_FOUND:
      console.log('Game found! Lobby id:', msg.lobbyId);
      // gameManager.updateLobby(msg.lobbyId);
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
      // gameManager.parseGameUpdateFromServer(msg.msg);
      break;
    default:
      // When we don't have a case for the server message type we just throw an error.
      throw new Error('Unidentifiable message from server.');
    }
  },
};

module.exports = socket;
