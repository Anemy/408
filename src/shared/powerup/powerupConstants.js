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
