'use strict';

/**
 * This file contains the bullet class and the functions related to a bullet.
 * Contants for bullets are kept in ./bulletConstants.js
 */

const BulletConstants = require('./bulletConstants');
const Constants = require('../../client/game/constants');

class Bullet {
  /*
   * Creates the bullet, placing it at the location provided, with the given direction.
   * 
   * @param {Object} player - The player who shot the bullet. Used for their position, velocity, and direction.
   */
  constructor(player) {
    this.width = BulletConstants.size;
    this.height = BulletConstants.size;

    // Start bullet coordinates from the middle of the player to make start location calculation easier
    this.x = player.x + player.width/2;
    this.y = player.y + player.height/2;

    // From middle, render it in front of the player in the direction it's being fired
    this.x += player.width/2 * player.shootingRight - player.width/2 * player.shootingLeft;
    this.y += player.width/2 * player.shootingDown - player.width/2 * player.shootingUp;

    // Account for bullet size
    this.x -= this.width/2;
    this.y -= this.height/2;

    // Records how long the bullet has been alive for. One it reaches lifeSpan in constants or hits a wall, it dies.
    this.lifeTime = 0;

    // Determine which direction to shoot the bullet in.
    this.xVelocity = -BulletConstants.speed * player.shootingLeft;
    this.xVelocity += BulletConstants.speed * player.shootingRight;

    this.yVelocity = -BulletConstants.speed * player.shootingUp;
    this.yVelocity += BulletConstants.speed * player.shootingDown;
  }

  /**
   * @return {Boolean} - If the bullet is still alive (false will destroy the bullet).
   */
  update(delta) {
    this.lifeTime += delta;

    if (this.lifeTime > BulletConstants.lifeSpan) {
      // Destroy the bullet.
      return false;
    }

    this.x += this.xVelocity * delta;
    this.y += this.yVelocity * delta;

    return true;
  }

  draw(ctx) {
    ctx.fillStyle = BulletConstants.rgb;
    ctx.fillRect(this.x * Constants.scale, this.y * Constants.scale, BulletConstants.size * Constants.scale, BulletConstants.size * Constants.scale);
  }
}

module.exports = Bullet;