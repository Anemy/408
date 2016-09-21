/**
 * This file manages all of the game objects and their changes in one game tick.
 */

const Player = require('./objects/player/player');

class gameManager {
  // Initialize the game logic
  start() {
    this.players = [];

    this.addPlayer();
  }

  addPlayer() {
    // TODO: Remove these, they're for quick testing.
    const randomXSpawn = Math.floor(Math.random() * 500);
    const randomYSpawn = Math.floor(Math.random() * 500);
    const skin = 'red';
    
    const newPlayer = new Player(randomXSpawn, randomYSpawn, skin);
    this.players.push(newPlayer);
  }

  update() {
    // Update all of the players.
    _.each(this.players, (player) => {
      player.update();
    });
  }

  draw(drawManager) {
    drawManager.draw(this.players);
  }
}

module.exports = gameManager;