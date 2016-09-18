const Gameloop = require('./game/gameloop');
const game = new Gameloop();

$(document).ready(() => {
  game.start();
});