/**
* Listens to and records key presses
*/

const Keys = require('./keys');

class KeyManager {
  /* Listen to key presses/releases
  *
  * @param {Object} player: the player that key presses are recorded to
  */
  startListening(player) {
    // Listen for key presses.
    window.addEventListener('keydown', (event) => {
      this.keyDown(player, event.keyCode);
    });

    // Listen for key releases
    window.addEventListener('keyup', (event) => {
      this.keyUp(player, event.keyCode);
    });
  }

  keyDown(player, keyCode) {
    switch(event.keyCode) {
    case Keys.A:
      player.left = true;
      break;
    case Keys.W:
      player.up = true;
      break;
    case Keys.D:
      player.right = true;
      break;
    case Keys.S:
      player.down = true;
      break;

    case Keys.SPACE:
      player.shooting = true;
      break;

    case Keys.UP:
      player.shootingUp = true;
      player.shootingDown = false;
      break;
    case Keys.DOWN:
      player.shootingDown = true;
      player.shootingUp = false;
      break;
    case Keys.LEFT:
      player.shootingLeft = true;
      player.shootingRight = false;
      break;
    case Keys.RIGHT:
      player.shootingRight = true;
      player.shootingLeft = false;
      break;
    }
  }

  keyUp(player, keyCode) {
    switch(event.keyCode) {
    case Keys.A:
      player.left = false;
      break;
    case Keys.W:
      player.up = false;
      break;
    case Keys.D:
      player.right = false;
      break;
    case Keys.S:
      player.down = false;
      break;

    case Keys.SPACE:
      player.shooting = false;
      break;

    case Keys.UP:
      player.shootingUp = false;
      break;
    case Keys.DOWN:
      player.shootingDown = false;
      break;
    case Keys.LEFT:
      player.shootingLeft = false;
      break;
    case Keys.RIGHT:
      player.shootingRight = false;
      break;
    }
  }
}

module.exports = KeyManager;