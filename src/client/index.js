const Gameloop = require('./game/gameloop');
const Gamemenu = require('./menu');
const game = new Gameloop();
const menu = new Gamemenu();

const SocketConstants = require('./game/socket/socketConstants');

$(document).ready(() => {
  menu.start();
  game.start();


  /**
   * TEMPORARY until we have menus to handle these listeners.
   * TODO: Remove these.
   */

   //join-game-button

  $('.join-game-button').on('click', () => {
    console.log('Sending join game to server.');
    const msg = {
      type: SocketConstants.FIND_GAME
    };
    game.sendMessage(msg);
  })

   $('.send-hi-message-button').on('click', () => {
    console.log('Sending hi message to server.');
    const msg = {
      type: SocketConstants.CHAT,
      msg: 'Hi!'
    };
    game.sendMessage(msg);
  });
});