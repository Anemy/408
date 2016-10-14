'use strict';

/**
 * This folder contains the gameloop which runs the game.
 */

// Frames per second.
const fps = 60;
const updateRate = 1000 / fps;

const _ = require('underscore');
const Player = require('../player/player');
const PlayerConstants = require('../player/playerConstants');
const Bullet = require('../bullet/bullet');
const Constants = require('./constants');
const Spike = require('../spike/spike');

const Collisions = require('./collisions');

class Game {
  constructor(updateFunction) {
    this.updateFunction = updateFunction;
  }

  /**
   * Starts the game loop running.
   */
  start() {
    this.running = true; 
    this.players = {};
    this.bullets = [];
    this.lastFrame = Date.now();

    this.spikes = [];

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

  createMap() {
    this.createSpikes();
  }

  // Adds spikes at random positions in the map. 
  // TODO: make these stationary and not random?
  createSpikes() {
    const spikesToCreate = 5;
    for(var i = 0; i < spikesToCreate; i++) {
      const randomXSpawn = Math.floor(Math.random() * Constants.width);
      const randomYSpawn = Math.floor(Math.random() * Constants.height);

      this.addSpike(randomXSpawn, randomYSpawn);
    }
  }

  addSpike(x, y) {
    const newSpike = new Spike(x, y);

    this.spikes.push(newSpike);
  }

  addPlayer(x, y, skin, playerId) {
    const newPlayer = new Player(x, y, skin, playerId);
    this.players[playerId] = newPlayer;

    return this.players[playerId];
  }

  addRandomPlayer(playerId) {
    const randomXSpawn = Math.floor(Math.random() * Constants.width);
    const randomYSpawn = Math.floor(Math.random() * Constants.height);
    // Randomly choose one of the skins.
    const skin = Object.keys(PlayerConstants.skins)[Math.floor(Math.random() * Object.keys(PlayerConstants.skins).length)];
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

    _.each(this.spikes, (spike) => {
      spike.update(delta);
    });

    this.checkCollisions(delta);

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

  checkCollisions(delta) {
    for(var p in this.players) {
      for(var b in this.bullets) {
        // Check if the person was shot.
        if (this.bullets[b].owner != p && // Can't shoot yourself.
          Collisions.circleTickIntersection(this.players[p], this.bullets[b], delta)) {
          this.players[p].health -= this.bullets[b].damage;
        }
      }

      for(var s in this.spikes) {
        // Check if a player collided with a spike.
        if (Collisions.circleTickIntersection(this.players[p], this.spikes[s], delta)) {
          // Player hit a spike.
          this.players[p].health = 0;
        }
      }
    }
  }

  /**
   * Returns the current game state. All of the player data, bullet data, etc.
   *
   * @return {Object} - The current state of the game
   */
  getGameData() {
    const gameData = {
      players: this.players,
      bullets: this.bullets,
      spikes: this.spikes
    };
    return gameData;
  }

}

module.exports = Game;