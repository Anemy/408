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
    this.x = player.x;
    this.y = player.y;
  }

  /**
   * @return {Boolean} - If the bullet is still alive (false will destroy the bullet).
   */
  update(delta) {
    return true;
  }

  draw(ctx) {
    ctx.fillStyle = BulletConstants.rgb;
    ctx.fillRect(this.x, this.y, BulletConstants.size, BulletConstants.size);
  }
}

module.exports = Bullet;