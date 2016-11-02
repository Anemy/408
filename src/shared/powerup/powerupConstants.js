'use strict';

/**
 * Constants related to a powerup 
 */

 module.exports = {
  radius: 9,
  spawnInterval: 15,
  lifespan: 10,
  types: ['damageReduction', 'speedBoost', 'healthRecovery'],
  style: {
    'damageReduction': {
      backgroundColor: 'rgb(20,240,70)'
    },
    'speedBoost': {
      backgroundColor: 'rgb(250,200,8)'
    },
    'healthRecovery': {
      backgroundColor: 'rgb(245,40,28)'
    }
  }
 };
