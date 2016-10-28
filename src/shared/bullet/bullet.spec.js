describe("Bullets", function() {
  const PlayerConstants = require('../player/playerConstants');
  const Constants = require('../game/constants');
  const Player = require('../player/player');
  const BulletConstants = require('./bulletConstants');
  const Bullet = require('./bullet');

  var player;
  var bullet;

  beforeEach(function() {
    skin = Object.keys(PlayerConstants.skins)[Math.floor(Math.random() * Object.keys(PlayerConstants.skins).length)];
    randomXSpawn = Math.floor(Math.random() * Constants.width);
    randomYSpawn = Math.floor(Math.random() * Constants.height);
    playerID = 1234;
    username = 'testuser'

    player = new Player(randomXSpawn, randomYSpawn, skin, playerID, username);
    bullet = new Bullet(player, randomXSpawn, randomYSpawn, 1, 1);
  });

  describe("Bullet Creation", function() {

      it("Spawns Correctly", function() {
        expect(bullet.x).toEqual(randomXSpawn);
        expect(bullet.y).toEqual(randomYSpawn);
      });

      it("Has Correct Owner", function() {
        expect(bullet.owner).toEqual(player);
      });
  });

  describe("Bullet Lifetime", function() {

    it("Updates Correctly", function() {
      bullet.update(.5);
      expect(bullet.lifeTime).toEqual(.5);
    });

    it("Doesn't Last Too Long", function() {
      expect(bullet.update(5)).toEqual(false);
    });
  });
})