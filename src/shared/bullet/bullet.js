'use strict';

/**
 * This file contains the bullet class and the functions related to a bullet.
 * Contants for bullets are kept in ./bulletConstants.js
 */

const BulletConstants = require('./bulletConstants');
const Constants = require('../game/constants');

class Bullet {
  /*
   * Creates the bullet, placing it at the location provided, with the given direction.
   * 
   * @param {{Object} player - The player who shot the bullet. Used for their position, velocity, and direction.}
   */
  constructor(owner, x, y, xVelocity, yVelocity) {
    this.owner = owner;

    this.radius = BulletConstants.radius;

    this.x = x;
    this.y = y;

    this.damage = BulletConstants.damage;

    // Records how long the bullet has been alive for. One it reaches lifeSpan in constants or hits a wall, it dies.
    this.lifeTime = 0;

    // Determine which direction to shoot the bullet in.
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
  }

  /**
   * @return {Boolean} - If the bullet is still alive (false will destroy the bullet).
   */
  update(delta) {
    this.lifeTime += delta;

    this.x += this.xVelocity * delta;
    this.y += this.yVelocity * delta;

    if (this.lifeTime > BulletConstants.lifeSpan) {
      // Destroy the bullet.
      return false;
    }

    return true;
  }

  draw(ctx) {
    ctx.fillStyle = BulletConstants.rgb;
    ctx.beginPath();
    ctx.arc(this.x * Constants.scale, this.y * Constants.scale, this.radius * Constants.scale, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

module.exports = Bullet;