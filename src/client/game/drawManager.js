/**
 * This file manages the drawing in the game.
 */

const drawManager = {
  // The drawable canvas reference.
  ctx: null,

  initialize: function() {
    const canvas = document.getElementById('gameCanvas');
    this.ctx = canvas.getContext('2d');
  },

  draw: function() {

  }
}