'use strict';

/**
 * Listens to and records key presses.
 * Saves key presses on local to a buffer to send to server.
 * Interprets key presses and their actions on a player.
 */

const Keys = require('./keys');

class KeyManager {
  /* Listen to key presses/releases
  *
  * @param {Object} player: the player that key presses are recorded to
  */
  startListening() {
    // This is an array of all of the keys a user presses which will be sent to the server as input.
    this.keyBuffer = [];

    // Listen for key presses.
    window.addEventListener('keydown', (event) => {
      if (this.player) {
        this.keyDown(this.player, event.keyCode);
      }
    });

    // Listen for key releases
    window.addEventListener('keyup', (event) => {
      if (this.player) {
        this.keyUp(this.player, event.keyCode);
      }
    });
  }

  // Sets the player who is listening to key events.
  setPlayer(player) {
    this.player = player;
  }

  /**
   * This function returns the key buffer to the caller and wipes the key buffer.
   *
   * @returns {Array} - This is the buffer of all of the keys that have been pressed since the last call.
   */
  getKeyBuffer() {
    const keyBuffer = this.keyBuffer;

    // Wipe the keybuffer, ready to listen to new keys.
    this.keyBuffer = [];

    return keyBuffer;
  }

  /*
   *
   *
   * @param {Object} player - The player object to influence with the keys.
   * @param {Array} keyBuffer
   */
  interpretKeyBuffer(player, keyBuffer) {
    keyBuffer.forEach((keyObject) => {
      if (keyObject.action === 0) {
        this.keyDown(player, keyObject.keyCode);
      } else if (keyObject.action === 1) {
        this.keyUp(player, keyObject.keyCode);
      }
    })
  }

  keyDown(player, keyCode) {
    if (this.keyBuffer) {
      this.keyBuffer.push({
        action: 0, 
        keyCode: keyCode
      });
    }

    switch(keyCode) {
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
    if (this.keyBuffer) {
      this.keyBuffer.push({
        action: 1, 
        keyCode: keyCode
      });
    }

    switch(keyCode) {
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