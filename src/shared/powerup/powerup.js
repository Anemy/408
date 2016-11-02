'use strict';

/**
 * This file contains the powerup class and the functions related to the powerup.
 * Constants for the powerup are kept in powerupConstants.js
 */

const PowerupConstants = require('./powerupConstants');
const Constants = require('../game/constants');

class Powerup {
  constructor(x, y, type, respawnTime) {
    this.x = x;
    this.y = y;
    this.type = type;
    // When > 0, the powerup is grabbable.
    this.respawnTime = respawnTime;
    this.radius = PowerupConstants.radius;
    this.lifespan = PowerupConstants.lifespan;
  }

  draw(ctx) {
    if (this.respawnTime <= 0) {
      ctx.save();

      ctx.translate(this.x * Constants.scale, this.y * Constants.scale);
      ctx.fillStyle = PowerupConstants.style[this.type].backgroundColor;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * Constants.scale, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }

  update(delta) {
    if (this.respawnTime > 0) {
      this.respawnTime -= delta;
    }
  }

  collect() {
    this.respawnTime = PowerupConstants.spawnInterval;
  }
 }

 module.exports = Powerup;
