/**
 * This object manages the drawing in the game.
 */

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

  draw() {
    // console.log('Draw called.');
    this.ctx.clearRect(0, 0, this.width, this.height); 

    this.ctx.fillStyle = '#FDFDFD';
    this.ctx.fillRect(0,0, this.width, this.height);

    const gridAmount = 30;
    this.ctx.strokeStyle = '#2B2B4A';
    for(var i = 0; i < gridAmount + 1; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.width * (i / gridAmount), 0);
      this.ctx.lineTo(this.width * (i / gridAmount), this.height);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(0, this.height * (i / gridAmount));
      this.ctx.lineTo(this.width, this.height * (i / gridAmount));
      this.ctx.stroke();
    }
  }
}

module.exports = drawManager;