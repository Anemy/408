'use strict';

/**
 * This file contains the player class and the functions related to the player.
 * Contants for the player are kept in playerConstants.js
 */

const PlayerConstants = require('./playerConstants');
const Constants = require('../game/constants');

class Player {
  /*
   * Creates the player, placing it at the location provided, with the given skin preset.
   *
   * @param {Integer} xSpawn - Location to spawn on x axis.
   * @param {Integer} ySpawn - Location to spawn on y axis.
   * @param {Integer} skin - The reference to what the player looks like in playerConstants.skins.
   */
  constructor(xSpawn, ySpawn, skin, playerId, username) {
    this.x = xSpawn;
    this.y = ySpawn;

    this.id = playerId;

    this.username = username || PlayerConstants.defaultUsername;

    // Velocity of x/y movement. 
    this.xVelocity = 0;
    this.yVelocity = 0;

    this.kills = 0;

    this.spawnTimer = 2;

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

    this.health = PlayerConstants.maxHealth;
  }

  draw(ctx) {
    // Save the default state
    ctx.save();

    // Translate the drawing to the player's location so we can just draw relative to it.
    ctx.translate(this.x * Constants.scale, this.y * Constants.scale);

    // When the player has not yet respawned, show the player with lowered opacity.
    if (this.spawnTimer > 0) {
      ctx.globalAlpha = 0.3;
    }

    switch(PlayerConstants.skins[this.skin].type) {
    case PlayerConstants.skinTypes.COLOR:
      // Fill the player's shape with their color.
      ctx.fillStyle = PlayerConstants.skins[this.skin].rgb;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * Constants.scale, 0, 2 * Math.PI, false);
      ctx.fill();
      // Border around player.
      ctx.lineWidth = 1;
      ctx.strokeStyle = PlayerConstants.borderColor;
      ctx.stroke();

      // Write the player's username.
      ctx.fillStyle = PlayerConstants.skins[this.skin].textRgb;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle'; 
      ctx.font = Math.floor(14 * Constants.scale) + 'px Arial';
      ctx.fillText(this.username, 0, 0);

      break;
    }

    // Only drawn the health bar on an alive player.
    if (this.spawnTimer <= 0) {
      // Translate the drawing to the top of the player so we can draw the health bars.
      ctx.translate(-PlayerConstants.radius * Constants.scale, -PlayerConstants.radius * Constants.scale - PlayerConstants.healthBarSizeY);

      // Draw health bar above the player.
      ctx.strokeStyle = PlayerConstants.borderColor;
      ctx.rect(0, 0, PlayerConstants.radius * Constants.scale * 2, PlayerConstants.healthBarSizeY);
      ctx.stroke();
      ctx.fillStyle = PlayerConstants.healthHurtColor;
      ctx.fillRect(0, 0, PlayerConstants.radius * Constants.scale * 2, PlayerConstants.healthBarSizeY); 
      if (this.health > 0) {
        ctx.fillStyle = PlayerConstants.healthColor;
        ctx.fillRect(0, 0, (this.health/PlayerConstants.maxHealth)* (PlayerConstants.radius * Constants.scale * 2), PlayerConstants.healthBarSizeY);
      }
    } else {
      // When the player has not yet respawned, show the countdown timer.
      ctx.globalAlpha = 1;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom'; 
      ctx.fillStyle = PlayerConstants.spawnCountdownColor;
      ctx.font = Math.floor((this.spawnTimer % 1) * 50 * Constants.scale) + 'px Arial';
      ctx.fillText(Math.floor(this.spawnTimer), 0, Math.floor((this.spawnTimer % 1) * 10 * Constants.scale));
    }

    ctx.restore();
  }

  /**
   * Updates the player for one frame.
   *
   * @param {Integer} delta - amount of time elapsed since last update
   */
  update(delta) {
    if (this.spawnTimer > 0) {      
      this.spawnTimer -= delta;
      return;
    }

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
   * @returns {Boolean} - Whether or not the player is currently alive (not respawning, etc).
   */
  isAlive() {
    return this.spawnTimer <= 0;
  }

  respawn(x, y) {
    this.x = x;
    this.y = y;

    // Reset all player controlled variables.
    this.xVelocity = this.yVelocity = this.shootTimer = 0;

    this.spawnTimer = PlayerConstants.spawnTime;

    this.health = PlayerConstants.maxHealth;
  }

  /**
   *
   * @returns {Boolean} - Whether the player is eligable shoot a bullet or not.
   */
  canShoot() {
    const playerIsAiming = this.shootingLeft || this.shootingRight || this.shootingUp || this.shootingDown;
    return this.spawnTimer <= 0 && this.shootTimer <= 0 && playerIsAiming;
  }
}

module.exports = Player;