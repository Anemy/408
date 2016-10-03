'use strict';

/**
 * This folder contains the gameloop which runs the game.
 */

// Frames per second.
const fps = 60;
const updateRate = 1000 / fps;

const _ = require('underscore');
const Player = require('../player/player');
const Bullet = require('../bullet/bullet');
const Constants = require('../../client/game/constants');

class Game {
  constructor(updateFunction) {
    this.updateFunction = updateFunction;
  }

  /**
   * Starts the game loop running and creates a socket connection to the server (if it's a client).
   */
  start() {
    this.running = true; 
    this.players = {};
    this.bullets = [];
    this.lastFrame = Date.now();

    // Start the game loop.
    // Holds the Javascript setInterval() id of the gameloop.
    this.intervalId = setInterval(this.loop.bind(this), updateRate);
  }

  loop() {
    const now = Date.now();
    const delta = (now - this.lastFrame) / 1000;
    if (this.running && delta < updateRate * 3 /* Don't allow frames where the cpu has been blocked, it can lead to undefined activity. */) {
      this.update(delta);
      this.updateFunction(this.getGameData());
    }
    this.lastFrame = Date.now();
  }

  addPlayer(x, y, skin, playerId) {
    const newPlayer = new Player(x, y, skin, playerId);
    this.players[playerId] = newPlayer;
  }

  addRandomPlayer(playerId) {
    const randomXSpawn = Math.floor(Math.random() * Constants.width);
    const randomYSpawn = Math.floor(Math.random() * Constants.height);
    const skin = Math.random() * 20 > 10 ? 'red' : 'blue';
    this.addPlayer(randomXSpawn, randomYSpawn, skin, playerId);    
  }

  updatePlayer(playerId, newData) {
    for (var property in newData) {
      this.players[playerId][property] = newData[property];
    }
  }

  removePlayer(playerId) {
    delete this.players[playerId];
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
    return gameData;
  }

}

module.exports = Game;