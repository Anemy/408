/*
 * Testing for the Lobby model.
 * Using Jasmine.
 */

const Collisions = require('./collisions');

describe('Collisions:', function() {
  describe('can perform circle collisions when:', function() {
    it('two circles intersect', function() {
      const one = {
        x: 100,
        y: 100,
        radius: 20
      };

      const two = {
        x: 130,
        y: 130,
        radius: 20
      }

      expect(Collisions.circleIntersection(one, two)).toEqual(true);
    });

    it('two circles do not intersect', function() {
      const one = {
        x: 100,
        y: 100,
        radius: 20
      };

      const two = {
        x: 200,
        y: 200,
        radius: 20
      }

      expect(Collisions.circleIntersection(one, two)).toEqual(false);
    });
  });
});