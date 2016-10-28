describe("Players", function() {
  const PlayerConstants = require('./playerConstants');
  const Constants = require('../game/constants');
  const Player = require('./player');

  var player;
  var skin;
  var randomXSpawn;
  var randomYSpawn;
  var playerID;
  var username;

  beforeEach(function() {
    skin = Object.keys(PlayerConstants.skins)[Math.floor(Math.random() * Object.keys(PlayerConstants.skins).length)];
    randomXSpawn = Math.floor(Math.random() * Constants.width);
    randomYSpawn = Math.floor(Math.random() * Constants.height);
    playerID = 1234;
    username = 'testuser'

    player = new Player(randomXSpawn, randomYSpawn, skin, playerID, username);
  });

  describe("Player Constructor", function() {

    it("Spawns Correctly", function() {
      expect(player.x).toEqual(randomXSpawn);
      expect(player.y).toEqual(randomYSpawn);
    });

    it("Gives Correct Username", function() {
      expect(player.username).toEqual(username)    
    });

    it("Gives Correct Skin", function() {
      expect(player.skin).toEqual(skin);
    });

    it("Gives Correct Hitbox Radius", function() {
      expect(player.radius).toEqual(PlayerConstants.radius);
    });

    it("Gives Correct Health", function() {
      expect(player.health).toEqual(PlayerConstants.maxHealth);
    });

    it("Gives Correct (0) Velocity", function() {
      expect(player.xVelocity).toEqual(0);
      expect(player.yVelocity).toEqual(0);
    });

    it("Gives Correct Spawn Time", function() {
      expect(player.spawnTimer).toEqual(PlayerConstants.spawnTime);
    });
  });

  describe("Player Shoots", function() {

    it("When Supposed To", function() {
      player.shoot();
      expect(player.shootTimer).toEqual(PlayerConstants.shootRate);
    });

    it("Not When Not Supposed To", function() {
      expect(player.shootTimer).toEqual(0);
    })
  });

  describe("Player Is Alive", function() {

    it("NOT", function() {
      expect(player.isAlive()).toEqual(false);
    });

    it("When Supposed To", function() {
      player.spawnTimer = -1;
      expect(player.isAlive()).toEqual(true);
    });
  });

  describe("Player Respawns", function() {

    it("With Full Health", function() {
      player.respawn(100,100);
      expect(player.health).toEqual(PlayerConstants.maxHealth);
    });

    it("In the Right Area", function() {
      player.respawn(100,100);
      expect(player.x).toEqual(100);
      expect(player.y).toEqual(100);
    });
  });
})