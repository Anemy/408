'use strict';

/**
 * This file manages all of the game objects and their changes in one game tick.
 */

const Player = require('./objects/player/player');
const Bullet = require('./objects/bullet/bullet');
const KeyManager = require('./keyListener/keyManager');
const _ = require('underscore');
const Constants = require('./constants');


class gameManager {
  // Initialize the game logic
  start(isClient) {
    // Each key in players is a player's id.
    this.players = {};

    this.bullets = [];

    this.keyManager = new KeyManager();

    if (isClient) {
      const localPlayerId = Math.floor(Math.random() * 10000);
      this.addPlayer(localPlayerId);
      this.keyManager.startListening(this.players[localPlayerId]);
    }
  }

  addPlayer(playerId) {
    // TODO: Remove these, they're for quick testing.
    const randomXSpawn = Math.floor(Math.random() * Constants.width);
    const randomYSpawn = Math.floor(Math.random() * Constants.height);
    const skin = Math.random() * 20 > 10 ? 'red' : 'blue';
    
    const newPlayer = new Player(randomXSpawn, randomYSpawn, skin, playerId);
    this.players[playerId] = newPlayer;

    // console.log('New player added at:', randomXSpawn, randomYSpawn);
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

     _.each(this.bullets, (bullet) => {
      bullet.draw(ctx);
    });

    // Draw all of the players.
    for(var p in this.players) {
      this.players[p].draw(ctx);
    };
  }

  /**
   * Returns the current game state. All of the player data, bullet data, etc.
   *
   * @return {Object} - The current state of the game
   */
  getGameData() {
    const gameData = {
      players: this.players,
      bullets: this.bullets
    };

    // if (Math.random() * 1000 > 990)
    //   console.log('gameData:',gameData);

    return gameData;
  }

  parseGameUpdateFromServer(gameData) {
    // console.log('Parse the server game data:', gameData);
    // if (Math.random() * 1000 > 990)
    //   console.log('Players from server:', gameData.players);

    // This is a the naive approach, player positions are just taken as is from the server.
    // TODO: Lerp player positions
    for (var p in gameData.players) {
      if (!this.players[p]) {
        // Create a new player if that player does not exist.
        this.players[p] = new Player(gameData.players[p].x, gameData.players[p].y, gameData.players[p].skin, p);
      } else {
        // Update the local player based on the server's player.
        for (var property in gameData.players[p]) {
          // We iterate through all of the keys in the server's player and set the local players accordingly.
          // We don't just set the player to equal the other player as to maintain the local functions.
          this.players[p][property] = gameData.players[p][property];
        } 
      }
    }

    // Remove players that are local that are not on the server's game.
    for (var p in this.players) {
      if (!gameData.players[p]) {
        delete this.players[p];
      }
    }

    // TODO: Bring in bullets.
  }

  parseUserKeyInput(playerId, keyBuffer) {
    if (this.players[playerId]) {
      this.keyManager.interpretKeyBuffer(this.players[playerId], keyBuffer);
    }
  }
}

module.exports = gameManager;