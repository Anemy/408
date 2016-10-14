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
   * @param {Object} player - The player who shot the bullet. Used for their position, velocity, and direction.
   */
  constructor(player) {
    this.radius = BulletConstants.radius;

    // Start bullet coordinates from the middle of the player.
    this.x = player.x;
    this.y = player.y;

    this.damage = BulletConstants.damage;

    // From the middle of the player, render it in the direction the player is firing.
    this.x += player.radius * player.shootingRight - player.radius * player.shootingLeft;
    this.y += player.radius * player.shootingDown - player.radius * player.shootingUp;
    
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

    this.x += this.xVelocity * delta;
    this.y += this.yVelocity * delta;

    if (this.lifeTime > BulletConstants.lifeSpan ||
        this.x < 0 || this.x > Constants.gameWidth ||
        this.y < 0 || this.y > Constants.gameHeight) {
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