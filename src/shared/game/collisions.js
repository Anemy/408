/**
 * This file calculates collisions between different types of objects.
 */

module.exports = {
  /**
   * Intersection collision test between two circle objects.
   *
   * @params {Object} circleObjectOne, circleObjectTwo
   *    @property {Number} x
   *    @property {Number} y
   *    @property {Number} radius
   * @returns {Boolean} - Whether or not the two circle objects intersect.
   */
  circleIntersection: function(circleObjectOne, circleObjectTwo) {
    const totalRadius = circleObjectOne.radius + circleObjectTwo.radius;

    return (Math.abs(circleObjectOne.y - circleObjectTwo.y) < totalRadius &&
        Math.abs(circleObjectOne.y - circleObjectTwo.y) < totalRadius);
  }, 

  /**
   * Intersection collision test between two circle objects in one game tick.
   * This function uses the objects' velocities to calculate if they intersect anywhere on their movement path in that tick.
   *
   * @params {Object} circleObjectOne, circleObjectTwo
   *    @property {Number} x
   *    @property {Number} y
   *    @property {Number} xVelocity
   *    @property {Number} yVelocity
   *    @property {Number} radius
   * @params {Number} delta - Time elapsed since last tick.
   * @returns {Boolean} - Whether or not the two circle objects intersect in the tick.
   */
  circleTickIntersection: function(circleObjectOne, circleObjectTwo, delta) {


    return false;
  }
}