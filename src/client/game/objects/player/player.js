/**
 * This file contains the player class and the functions related to the player.
 * Contants for the player are kept in playerConstants.js
 */

const PlayerConstants = require('./playerConstants');
const Constants = require('../../constants');

class Player {
  /*
   * Creates the player, placing it at the location provided, with the given skin preset.
   *
   * @param {Integer} xSpawn - Location to spawn on x axis.
   * @param {Integer} ySpawn - Location to spawn on y axis.
   * @param {Integer} skin - The reference to what the player looks like in playerConstants.skins.
   */
  constructor(xSpawn, ySpawn, skin) {
    this.x = xSpawn;
    this.y = ySpawn;

    // Velocity of x/y movement. 
    this.xVelocity = 0;
    this.yVelocity = 0;

    // Boolean for corresponding movement key being pressed.
    this.left  = false;
    this.right  = false;
    this.up = false;
    this.down = false;

    this.width = PlayerConstants.size;
    this.height = PlayerConstants.size;

    this.skin = skin;
  }

  draw(ctx) {
    // console.log('Draw player with skin:', this.skin);

    switch(PlayerConstants.skins[this.skin].type) {
    case PlayerConstants.skinTypes.COLOR:
      ctx.fillStyle = PlayerConstants.skins[this.skin].rgb;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      break;
    }
  }

  /**
   * Updates the player for one frame.
   *
   * @param {Integer} delta - amount of time elapsed since last update
   */
  update(delta) {
    // Apply friction to slow the player.
    if (this.xVelocity > PlayerConstants.minAcceleration) {
      this.xVelocity -= PlayerConstants.frictionAmount * delta;
    } else if (this.xVelocity < -PlayerConstants.minAcceleration) {
      this.xVelocity += PlayerConstants.frictionAmount * delta;
    } else {
      this.xVelocity = 0;
    }

    if (this.yVelocity > PlayerConstants.minAcceleration) {
      this.yVelocity -= PlayerConstants.frictionAmount * delta;
    } else if (this.yVelocity < -PlayerConstants.minAcceleration) {
      this.yVelocity += PlayerConstants.frictionAmount * delta;
    } else {
      this.yVelocity = 0;
    }

    // Update player velocity based on recorded key presses & delta.
    if (this.left) {
      this.xVelocity -= PlayerConstants.acceleration * delta;

      if (this.xVelocity < -PlayerConstants.maxAcceleration) {
        // Cap the player's velocity at the max.
        this.xVelocity = -PlayerConstants.maxAcceleration;
      }
    }
    if (this.up) {
      this.yVelocity -= PlayerConstants.acceleration * delta;

      if (this.yVelocity < -PlayerConstants.maxAcceleration) {
        this.yVelocity = -PlayerConstants.maxAcceleration;
      }
    }
    if (this.right && this.xVelocity < PlayerConstants.maxAcceleration) {
      this.xVelocity += PlayerConstants.acceleration * delta;
    }
    if (this.down && this.yVelocity < PlayerConstants.maxAcceleration) {
      this.yVelocity += PlayerConstants.acceleration * delta;
    }

    this.x += this.xVelocity * delta;
    this.y += this.yVelocity * delta;

    this.collideWithBorders();
  }

  // Called to check and act on player collisions with the map borders.
  collideWithBorders() {
    if (this.x > Constants.width - PlayerConstants.size) {
      // This is a calculation of how far the player just travelled through the wall so we can bounce them the other way accordingly.
      const extraDistanceTravelled = this.x - (Constants.width - PlayerConstants.size);
      this.x = Constants.width - PlayerConstants.size - extraDistanceTravelled;

      if (this.xVelocity > 0) {
        // Send their velocity negative to bounce them back.
        this.xVelocity = -this.xVelocity;
      }
    } else if (this.x < 0) {
      const extraDistanceTravelled = -this.x;
      this.x = extraDistanceTravelled;

      if (this.xVelocity < 0) {
        this.xVelocity = -this.xVelocity;
      }
    }

    if (this.y > Constants.height - PlayerConstants.size) {
      const extraDistanceTravelled = this.y - (Constants.height - PlayerConstants.size);
      this.y = Constants.height - PlayerConstants.size - extraDistanceTravelled;

      if (this.yVelocity > 0) {
        this.yVelocity = -this.yVelocity;
      }
    } else if (this.y < 0) {
      const extraDistanceTravelled = -this.y;
      this.y = extraDistanceTravelled;

      if (this.yVelocity < 0) {
        this.yVelocity = -this.yVelocity;
      }
    }
  }
}

module.exports = Player;