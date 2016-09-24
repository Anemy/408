/**
 * This file manages all of the game objects and their changes in one game tick.
 */

const Player = require('./objects/player/player');
const Bullet = require('./objects/bullet/bullet');
const KeyManager = require('./keyListener/keyManager');

class gameManager {
  // Initialize the game logic
  start() {
    this.players = [];

    this.bullets = [];

    this.addPlayer();
    this.keyManager = new KeyManager();
    this.keyManager.startListening(this.players[0]);
  }

  addPlayer() {
    // TODO: Remove these, they're for quick testing.
    const randomXSpawn = Math.floor(Math.random() * 500);
    const randomYSpawn = Math.floor(Math.random() * 500);
    const skin = 'red';
    
    const newPlayer = new Player(randomXSpawn, randomYSpawn, skin);
    this.players.push(newPlayer);
  }

  /*
  * Updates the game logic for one frame
  *
  * @param {Integer} delta - amount of time elapsed since last frame 
  */
  update(delta) {
    // Update all of the players.
    _.each(this.players, (player) => {
      player.update(delta);
    });

    // Update and filter out dead bullets.
    this.bullets = _.filter(this.bullets, (bullet) => {
      return bullet.update(delta);
    });

    this.shootBullets();
  }

  // Called to check if any bullets need to be shot from the players.
  shootBullets() {
    // Check to see if any of the players are trying to shoot and eligable to shoot a bullet.
    _.each(this.players, (player) => {
      if(player.shooting && player.shootTimer <= 0) {
        player.shoot();

        const newBullet = new Bullet(player);
        this.bullets.push(newBullet);
      }
    });
  }

  draw(drawManager) {
    drawManager.draw();

    const ctx = drawManager.getDraw();

    _.each(this.players, (player) => {
      player.draw(ctx);
    });

    _.each(this.bullets, (bullet) => {
      bullet.draw(ctx);
    });
  }
}

module.exports = gameManager;