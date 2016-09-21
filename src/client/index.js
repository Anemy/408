const Gameloop = require('./game/gameloop');
const Gamemenu = require('./menu');
const game = new Gameloop();
const menu = new Gamemenu();

$(document).ready(() => {
  menu.start();
  game.start();
});