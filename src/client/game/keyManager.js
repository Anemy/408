/**
* Listens to and records key presses
*/
class KeyManager {
  
  /* Listen to key presses/releases
  *
  * @param {Object} player: the player that key presses are recorded to
  */
  startListening(player) {
    
    // Listen for key presses.
    window.addEventListener('keydown', function(event) {
      switch(event.keyCode) {
      case 65:
        player.left = true;
        break;
      case 87:
        player.up = true;
        break;
      case 68:
        player.right = true;
        break;
      case 83:
        player.down = true;
        break;
      }
    });

    // Listen for key releases
    window.addEventListener('keyup', function(event) {
      switch(event.keyCode) {
      case 65:
        player.left = false;
        break;
      case 87:
        player.up = false;
        break;
      case 68:
        player.right = false;
        break;
      case 83:
        player.down = false;
        break;
      }
    });
  }
}

module.exports = KeyManager;