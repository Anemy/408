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
const BulletConstants = require('../bullet/bulletConstants')
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
  // TODO: Make these stationary and not random?
  createSpikes() {
    const spikesToCreate = 5;
    for(let i = 0; i < spikesToCreate; i++) {
      const randomXSpawn = Math.floor(Math.random() * Constants.width);
      const randomYSpawn = Math.floor(Math.random() * Constants.height);

      this.addSpike(randomXSpawn, randomYSpawn);
    }
  }

  addSpike(x, y) {
    const newSpike = new Spike(x, y);

    this.spikes.push(newSpike);
  }

  addPlayer(x, y, skin, playerId, username) {
    const newPlayer = new Player(x, y, skin, playerId, username);
    this.players[playerId] = newPlayer;

    return this.players[playerId];
  }

  addRandomPlayer(playerId, username) {
    const randomXSpawn = Math.floor(Math.random() * Constants.width);
    const randomYSpawn = Math.floor(Math.random() * Constants.height);
    // Randomly choose one of the skins.
    const skin = Object.keys(PlayerConstants.skins)[Math.floor(Math.random() * Object.keys(PlayerConstants.skins).length)];
    this.addPlayer(randomXSpawn, randomYSpawn, skin, playerId, username);
  }

  updatePlayer(playerId, newData) {
    for (let property in newData) {
      this.players[playerId][property] = newData[property];
    }
  }

  removePlayer(playerId) {
    delete this.players[playerId];
  }

  // Respawns the player at a random location which doesn't collide with any spikes.
  respawnPlayer(playerId) {
    let xSpawn = 0;
    let ySpawn = 0;

    let colliding = true;
    while(colliding) {
      /*
       * TODO: Make this just chose a location not used, not just chose a random one.
       */
      xSpawn = Math.random() * Constants.width;
      ySpawn = Math.random() * Constants.height;

      const newPosition = {
        x: xSpawn,
        y: ySpawn
      }

      for(let s in this.spikes) {
        if (Collisions.circleIntersection(newPosition, this.spikes[s])) {
          // New player position will hit a spike, find a new location.
          colliding = true;
          break;
        }
        colliding = false;
      }
    }

    this.players[playerId].respawn(xSpawn, ySpawn);
  }

  /*
  * Updates the game logic for one frame
  *
  * @param {Integer} delta - amount of time elapsed since last frame
  */
  update(delta) {
    // Update all of the players.
    for(let p in this.players) {
      this.players[p].update(delta);
    };

    // Update and filter out dead bullets.
    this.bullets = _.filter(this.bullets, (bullet) => {
      return bullet.update(delta);
    });

    _.each(this.spikes, (spike) => {
      spike.update(delta);
    });

    // Only check collisions on the server for now.
    if (Constants.isServer) {
      this.checkCollisions(delta);
    }

    this.shootBullets();
  }

  // Called to check if any bullets need to be shot from the players.
  shootBullets() {
    // Check to see if any of the players are trying to shoot and eligable to shoot a bullet.
    for(let p in this.players) {
      const player = this.players[p];

      if(player.canShoot()) {
        player.shoot();

        this.addBulletByPlayer(player);
      }
    };
  }

  /*
   * Creates the bullet, placing it at the location provided, with the given direction.
   *
   * @param {Object} player - The player who shot the bullet. Used for their position, velocity, and direction.
   */
  addBulletByPlayer(player) {
    // Start bullet coordinates from the middle of the player.
    const x = player.x + player.radius * player.shootingRight - player.radius * player.shootingLeft;
    const y = player.y + player.radius * player.shootingDown - player.radius * player.shootingUp

    // Determine which direction to shoot the bullet in.
    const xVelocity = -BulletConstants.speed * player.shootingLeft + BulletConstants.speed * player.shootingRight;
    const yVelocity = -BulletConstants.speed * player.shootingUp + BulletConstants.speed * player.shootingDown;

    const newBullet = new Bullet(player.id, x, y, xVelocity, yVelocity);

    this.bullets.push(newBullet);
  }

  checkCollisions(delta) {
    for(let p in this.players) {
      if (this.players[p].isAlive())

      // Player - Bullet
      // Iterate downwords so we can easily remove bullets that need to be deleted.
      for(let b = this.bullets.length - 1; b >= 0; b--) {
        // Check if the person was shot.
        if (this.bullets[b].owner != p && // Can't shoot yourself.
          Collisions.circleTickIntersection(this.players[p], this.bullets[b], delta)) {
          this.players[p].health -= this.bullets[b].damage;

          if (this.players[p].health <= 0) {
            this.players[p].kills++;

            // Respawn the player.
            this.respawnPlayer(p);
          }

          // Destroy the bullet.
          this.bullets.splice(b, 1);
        }
      }

      // Player - Spike
      for(let s in this.spikes) {
        // Check if a player collided with a spike.
        if (Collisions.circleTickIntersection(this.players[p], this.spikes[s], delta)) {
          // Player hit a spike.
          this.respawnPlayer(p);
        }
      }
    }

    // Spike - Bullet
    for(let s in this.spikes) {
      for(let b = this.bullets.length - 1; b >= 0; b--) {
        // Check if the bullet hits a spike.
        if (Collisions.circleTickIntersection(this.spikes[s], this.bullets[b], delta)) {
          // Destroy the bullet.
          this.bullets.splice(b, 1);
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
