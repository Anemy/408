/**
 * Constants related to a player.
 */

const skinTypes = {
  COLOR: 1,
  IMAGE: 2,
  PATTERN: 3,
  ANIMATION: 4
};

module.exports = {
  size: 20,
  frictionAmount: 300,
  acceleration: 600,
  minAcceleration: 10,
  maxAcceleration: 600,

  // These define the kinds of player skins there are.
  // For instance a plain blue player would have the presetType COLOR.
  skinTypes: skinTypes,
  skins: {
    'red': {
      type: skinTypes.COLOR,
      rgb: 'rgb(255,0,0)'
    },
    'blue': {
      type: skinTypes.COLOR,
      rgb: 'rgb(0,0,255)'
    }
  }
};