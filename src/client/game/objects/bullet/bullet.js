'use strict';

/**
 * This file contains the bullet class and the functions related to a bullet.
 * Contants for bullets are kept in ./bulletConstants.js
 */

const BulletConstants = require('./bulletConstants');
const Constants = require('../../constants');

class Bullet {
  /*
   * Creates the bullet, placing it at the location provided, with the given direction.
   * 
   * @param {Object} player - The player who shot the bullet. Used for their position, velocity, and direction.
   */
  constructor(player) {
    this.x = player.x + player.width/2;
    this.y = player.y + player.height/2;

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
    ctx.fillRect(this.x, this.y, BulletConstants.size, BulletConstants.size);
  }
}

module.exports = Bullet;