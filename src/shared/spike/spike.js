'use strict';

/**
 * This file contains the spike class and the functions related to the spike.
 * Contants for the spike are kept in spikeConstants.js
 */

const SpikeConstants = require('./spikeConstants');
const Constants = require('../../client/game/constants');

class Spike {
  /*
   * Creates the spike, placing it at the location provided.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.radius = SpikeConstants.radius;

    this.rotation = Math.random() * Math.PI;
  }

  update(delta) {
    this.rotation += delta;

    if (this.rotation > Math.PI) {
      this.rotation -= Math.PI;
    }
  }

  draw(ctx) {
    // Save the default state
    ctx.save();

    // Translate the drawing to the spike's location so we can just draw relative to it.
    ctx.translate(this.x * Constants.scale, this.y * Constants.scale);
    ctx.rotate(this.rotation);

    ctx.fillStyle = SpikeConstants.spikesRGB;
    // Spikes around the circle
    ctx.beginPath();
    ctx.moveTo(0, (-this.radius - SpikeConstants.spikeSize) * Constants.scale); // Top
    ctx.lineTo(-SpikeConstants.spikeSize * Constants.scale, -SpikeConstants.spikeSize * Constants.scale);

    ctx.lineTo((-this.radius - SpikeConstants.spikeSize) * Constants.scale, 0); // Left
    ctx.lineTo(-SpikeConstants.spikeSize * Constants.scale, SpikeConstants.spikeSize * Constants.scale);

    ctx.lineTo(0, (this.radius + SpikeConstants.spikeSize) * Constants.scale); // Bottom
    ctx.lineTo(SpikeConstants.spikeSize * Constants.scale, SpikeConstants.spikeSize * Constants.scale);

    ctx.lineTo((this.radius + SpikeConstants.spikeSize) * Constants.scale, 0); // Right
    ctx.lineTo(SpikeConstants.spikeSize * Constants.scale, -SpikeConstants.spikeSize * Constants.scale);
    ctx.fill();

    // Inner Circle
    ctx.fillStyle = SpikeConstants.circleRGB;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * Constants.scale, 0, 2 * Math.PI, false);
    ctx.fill();

    // Reset the translation.
    ctx.restore();
  }
}

module.exports = Spike; 