'use strict';

/**
 * This file manages all of the game objects and their changes in one game tick.
 */

const Player = require('./objects/player/player');
const Bullet = require('./objects/bullet/bullet');
const KeyManager = require('./keyListener/keyManager');
const _ = require('underscore');

class gameManager {
  // Initialize the game logic
  start(isClient) {
    // Players is a hashmap where each 
    this.players = [];

    this.bullets = [];

    if (isClient) {
      const localPlayerId = Math.floor(Math.random() * 10000);
      this.addPlayer(localPlayerId);
      this.keyManager = new KeyManager();
      this.keyManager.startListening(this.players[localPlayerId]);
    }
  }

  addPlayer(playerId) {
    // TODO: Remove these, they're for quick testing.
    const randomXSpawn = Math.floor(Math.random() * 500);
    const randomYSpawn = Math.floor(Math.random() * 500);
    const skin = 'red';
    
    const newPlayer = new Player(randomXSpawn, randomYSpawn, skin, playerId);
    this.players[playerId] = newPlayer;
  }

  /*
  * Updates the game logic for one frame
  *
  * @param {Integer} delta - amount of time elapsed since last frame 
  */
  update(delta) {
    // Update all of the players.
    for(var p in this.players) {
      this.players[p].update(delta);
    };

    // Update and filter out dead bullets.
    this.bullets = _.filter(this.bullets, (bullet) => {
      return bullet.update(delta);
    });

    this.shootBullets();
  }

  // Called to check if any bullets need to be shot from the players.
  shootBullets() {
    // Check to see if any of the players are trying to shoot and eligable to shoot a bullet.
    for(var p in this.players) {
      var player = this.players[p];

      if(player.shooting && player.canShoot()) {
        player.shoot();

        const newBullet = new Bullet(player);
        this.bullets.push(newBullet);
      }
    };
  }

  draw(drawManager) {
    drawManager.draw();

    const ctx = drawManager.getDraw();

    // Draw all of the players.
    for(var p in this.players) {
      this.players[p].draw(ctx);
    };

    _.each(this.bullets, (bullet) => {
      bullet.draw(ctx);
    });
  }

  /**
   * Returns the current game state. All of the player data, bullet data, etc.
   *
   * @return {Object} - The current state of the game
   */
  getGameData() {
    return {
      players: this.players,
      bullets: this.bullets
    }
  }

  parseGameUpdateFromServer(gameData) {
    // console.log('Parse the server game data:', gameData);
  }
}

module.exports = gameManager;