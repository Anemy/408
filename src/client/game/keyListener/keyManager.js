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
    window.addEventListener('keydown', function(event) {
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
      }
    });

    // Listen for key releases
    window.addEventListener('keyup', function(event) {
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
      }
    });
  }
}

module.exports = KeyManager;