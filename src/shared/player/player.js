'use strict';

/**
 * This file contains the player class and the functions related to the player.
 * Contants for the player are kept in playerConstants.js
 */

const PlayerConstants = require('./playerConstants');
const Constants = require('../../client/game/constants');

class Player {
  /*
   * Creates the player, placing it at the location provided, with the given skin preset.
   *
   * @param {Integer} xSpawn - Location to spawn on x axis.
   * @param {Integer} ySpawn - Location to spawn on y axis.
   * @param {Integer} skin - The reference to what the player looks like in playerConstants.skins.
   */
  constructor(xSpawn, ySpawn, skin, playerId) {
    this.x = xSpawn;
    this.y = ySpawn;

    this.id = playerId

    // Velocity of x/y movement. 
    this.xVelocity = 0;
    this.yVelocity = 0;

    // Booleans for corresponding movement key being pressed.
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    // Booleans for which direction the player is facing to shoot.
    this.shootingLeft = false;
    this.shootingRight = false;
    this.shootingUp = false;
    this.shootingDown = false;

    this.radius = PlayerConstants.radius;

    this.skin = skin;

    // How often a player can shoot. Once a player shoots this is reset to a constant shootRate and then decreased.
    // The player can only shoot when shootTimer is 0.
    this.shootTimer = 0;

    // Boolean to denote if the player is trying to shoot or not.
    this.shooting = false;

    this.health = PlayerConstants.maxHealth;
  }

  draw(ctx) {
    switch(PlayerConstants.skins[this.skin].type) {
    case PlayerConstants.skinTypes.COLOR:
      ctx.fillStyle = PlayerConstants.skins[this.skin].rgb;
      ctx.beginPath();
      ctx.arc(this.x * Constants.scale, this.y * Constants.scale, this.radius * Constants.scale, 0, 2 * Math.PI, false);
      ctx.fill();
      // Border around player.
      ctx.lineWidth = 1;
      ctx.strokeStyle = PlayerConstants.borderColor;
      ctx.stroke();

      // ctx.fillRect(this.x * Constants.scale, this.y * Constants.scale, this.width * Constants.scale, this.height * Constants.scale);
      break;
    }

    // Draw health bar above the player.
    ctx.strokeStyle = PlayerConstants.borderColor;
    ctx.rect((this.x - PlayerConstants.radius) * Constants.scale, (this.y - PlayerConstants.radius) * Constants.scale, PlayerConstants.radius * Constants.scale * 2, 2);
    ctx.stroke();
    ctx.fillStyle = PlayerConstants.healthHurtColor;
    ctx.fillRect((this.x - PlayerConstants.radius) * Constants.scale, (this.y - PlayerConstants.radius) * Constants.scale, PlayerConstants.radius * Constants.scale * 2, 2); 
    if (this.health > 0) {
      ctx.fillStyle = PlayerConstants.healthColor;
      ctx.fillRect((this.x - PlayerConstants.radius) * Constants.scale, (this.y - PlayerConstants.radius) * Constants.scale, (this.health/PlayerConstants.maxHealth)* (PlayerConstants.radius * Constants.scale * 2), 2);
    }
  }

  /**
   * Updates the player for one frame.
   *
   * @param {Integer} delta - amount of time elapsed since last update
   */
  update(delta) {
    this.applyFriction(delta);

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

      if (this.xVelocity > PlayerConstants.maxAcceleration) {
        this.xVelocity = PlayerConstants.maxAcceleration;
      }
    }
    if (this.down && this.yVelocity < PlayerConstants.maxAcceleration) {
      this.yVelocity += PlayerConstants.acceleration * delta;

      if (this.yVelocity < -PlayerConstants.maxAcceleration) {
        this.yVelocity = -PlayerConstants.maxAcceleration;
      }
    }

    this.x += this.xVelocity * delta;
    this.y += this.yVelocity * delta;

    this.collideWithBorders();

    // Update the player's shoot timer if they have recently shot to allow them to shoot again.
    if (this.shootTimer > 0) {
      this.shootTimer -= delta;
    }
  }

  // Apply friction to slow the player. Called from update.
  applyFriction(delta) {
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
  }

  // Called to check and act on player collisions with the map borders.
  collideWithBorders() {
    if (this.x > Constants.gameWidth - PlayerConstants.radius) {
      // This is a calculation of how far the player just travelled through the wall so we can bounce them the other way accordingly.
      const extraDistanceTravelled = this.x - (Constants.gameWidth - PlayerConstants.radius);
      this.x = Constants.gameWidth - PlayerConstants.radius - extraDistanceTravelled;

      if (this.xVelocity > 0) {
        // Send their velocity negative to bounce them back.
        this.xVelocity = -this.xVelocity;
      }
    } else if (this.x < this.radius) {
      const extraDistanceTravelled = this.radius - this.x;
      this.x = this.radius + extraDistanceTravelled;

      if (this.xVelocity < 0) {
        this.xVelocity = -this.xVelocity;
      }
    }

    if (this.y > Constants.gameHeight - PlayerConstants.radius) {
      const extraDistanceTravelled = this.y - (Constants.gameHeight - PlayerConstants.radius);
      this.y = Constants.gameHeight - PlayerConstants.radius - extraDistanceTravelled;

      if (this.yVelocity > 0) {
        this.yVelocity = -this.yVelocity;
      }
    } else if (this.y < this.radius) {
      const extraDistanceTravelled = this.radius - this.y;
      this.y = this.radius + extraDistanceTravelled;

      if (this.yVelocity < 0) {
        this.yVelocity = -this.yVelocity;
      }
    }
  }

  // Called when a bullet is shot from the player.
  shoot() {
    this.shootTimer = PlayerConstants.shootRate;
  }

  /**
   *
   * @returns {Boolean} - Whether the player is eligable shoot a bullet or not.
   */
  canShoot() {
    const playerIsAiming = this.shootingLeft || this.shootingRight || this.shootingUp || this.shootingDown;
    return this.shootTimer <= 0 && playerIsAiming;
  }
}

module.exports = Player;