/**
 * This file manages all of the game objects and their changes in one game tick.
 */

const Player = require('./objects/player/player');

class gameManager {
  constructor() {
    this.players = [];
  }

  addPlayer() {
    // TODO: Remove these, they're for quick testing.
    const randomXSpawn = Math.floor(Math.random() * 500);
    const randomYSpawn = Math.floor(Math.random() * 500);
    const skin = 'red';

    this.players.push(new Player(randomXSpawn, randomYSpawn, skin));
  }
}

module.exports = gameManager;