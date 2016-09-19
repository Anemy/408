/**
 * This object manages the drawing in the game.
 */

// Load in the constants (colors, sizes, etc.) for drawing.
const DrawConstants = require('./drawConstants');

class drawManager {
  initialize() {
    // Get the user's browser dimensions.
    this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    const canvas = document.getElementById('gameCanvas');

    // The drawable canvas reference.
    this.ctx = canvas.getContext('2d');

    this.ctx.canvas.width = this.width;
    this.ctx.canvas.height = this.height;
  }

  draw(drawableObjects) {
    // Clear the last frame.
    this.ctx.clearRect(0, 0, this.width, this.height); 

    this.drawMap();

    // Call the drawing method of each drawable object.
    _.each(drawableObjects, (drawableObject) => {
      drawableObject.draw(this.ctx);
    });
  }

  drawMap() {
    this.ctx.fillStyle = DrawConstants.mapBackgroundColor;
    this.ctx.fillRect(0,0, this.width, this.height);

    const gridAmount = 30;
    const gridSize = this.width / gridAmount;
    this.ctx.strokeStyle = DrawConstants.mapGridColor;
    for(var i = 0; i < gridAmount + 1; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(gridSize * i, 0);
      this.ctx.lineTo(gridSize * i, this.height);
      this.ctx.stroke();

      // Because of the 16:9 aspect ratio, only draw squares, this means that there are more in the square
      if (gridSize * i < this.height) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, gridSize * i);
        this.ctx.lineTo(this.width, gridSize * i);
        this.ctx.stroke();
      } else if(gridSize * (i - 1) <= this.height) {
        // This draws the end border line.
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height);
        this.ctx.lineTo(this.width, this.height);
        this.ctx.stroke();
      }
    }
  }
}

module.exports = drawManager;