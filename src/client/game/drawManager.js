/**
 * This object manages the drawing in the game.
 */

class drawManager {
  initialize() {
    // Get the user's browser dimensions.
    this.browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    const canvas = document.getElementById('gameCanvas');

    // The drawable canvas reference.
    this.ctx = canvas.getContext('2d');

    ctx.canvas.width = this.browserWidth;
    ctx.canvas.height = this.browserHeight;
  }

  draw() {
    console.log('Draw called.');
  }
}

module.exports = drawManager;