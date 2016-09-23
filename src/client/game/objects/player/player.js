/**
 * This file contains the player class and the functions related to the player.
 * Contants for the player are kept in playerConstants.js
 */

const PlayerConstants = require('./playerConstants');

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
    if (this.left && this.xVelocity > -PlayerConstants.maxAcceleration) {
      this.xVelocity -= PlayerConstants.acceleration * delta;
    }
    if (this.up && this.yVelocity > -PlayerConstants.maxAcceleration) {
      this.yVelocity -= PlayerConstants.acceleration * delta;
    }
    if (this.right && this.xVelocity < PlayerConstants.maxAcceleration) {
      this.xVelocity += PlayerConstants.acceleration * delta;
    }
    if (this.down && this.yVelocity < PlayerConstants.maxAcceleration) {
      this.yVelocity += PlayerConstants.acceleration * delta;
    }

    this.x += this.xVelocity * delta;
    this.y += this.yVelocity * delta;

    if(this.x > window.innerWidth - PlayerConstants.size) {
      this.x = window.innerWidth - PlayerConstants.size;
    }
    if(this.x < 0) {
      this.x = 0;
    }
    if(this.y > window.innerHeight - PlayerConstants.size) {
      this.y = window.innerHeight - PlayerConstants.size;
    }
    if(this.y < 0) {
      this.y = 0;
    }
  }
}

module.exports = Player;