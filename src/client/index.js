const GameManager = require('./game/gameManager');
const Gamemenu = require('./menu');
// const Constants = require('/game/constants');

const gameManager = new GameManager();
const menu = new Gamemenu();

const SocketConstants = require('./game/socket/socketConstants');

$(document).ready(() => {

  menu.start();
  gameManager.start();

  // Constants.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  // Constants.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

  /**
   * TEMPORARY until we have menus to handle these listeners.
   * TODO: Remove these.
   *
   * They could be adapted for some basic testing.
   * VVVVVVVVVV
   */

  $('.join-game-button').on('click', () => {
    console.log('Sending join game to server.');
    const msg = {
      type: SocketConstants.FIND_GAME
    };
    gameManager.sendMessage(msg);
  });

  $('.send-hi-message-button').on('click', () => {
    console.log('Sending hi message to server.');
    const msg = {
      type: SocketConstants.CHAT,
      msg: 'Hi!'
    };
    gameManager.sendMessage(msg);
  });

  $('.lobbies-info-message-button').on('click', () => {
    console.log('Getting lobbies info from server...');
    const msg = {
      type: SocketConstants.LOBBIES_INFO
    };
    gameManager.sendMessage(msg);
  });
});
