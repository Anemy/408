const Gameloop = require('./game/gameloop');
const Gamemenu = require('./menu');
const game = new Gameloop();

$(document).ready(() => {
  game.start();
});