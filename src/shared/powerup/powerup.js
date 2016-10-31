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
    this.respawnTime = respawnTime;
    this.radius = PowerupConstants.radius;
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x * Constants.scale, this.y * Constants.scale);
    ctx.fillStyle = PowerupConstants.backgroundColor;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * Constants.scale, 0, 2 * Math.PI, false);
    ctx.fill();

    ctx.restore();
  }
 }

 module.exports = Powerup;