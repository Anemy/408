describe("Spikes", function() {
  const Spike = require('./spike');
  const SpikeConstants = require('./spikeConstants');
  const Constants = require('../game/constants');

  var spike;
  var randomXSpawn;
  var randomYSpawn;

  beforeEach(function() {
    randomXSpawn = Math.floor(Math.random() * Constants.width);
    randomYSpawn = Math.floor(Math.random() * Constants.height);

    spike = new Spike(randomXSpawn, randomYSpawn);
  })

  describe("Spike Creation", function() {

    it("Spawns in Correct Area", function() {
      expect(spike.x).toEqual(randomXSpawn);
      expect(spike.y).toEqual(randomYSpawn);
    });
  });
})