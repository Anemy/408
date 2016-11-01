'use strict';

/**
 * Constants related to a powerup 
 */

 module.exports = {
  radius: 9,
  spawnInterval: 10,
  lifespan: 5,
  types: ['damageReduction', 'speedBoost', 'healthRecovery'],
  style: {
    'damageReduction': {
      backgroundColor: '#2ecc71'
    },
    'speedBoost': {
      backgroundColor: '#f1c40f'
    },
    'healthRecovery': {
      backgroundColor: '#e74c3c'
    }
  }
 };
