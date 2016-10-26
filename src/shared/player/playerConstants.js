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
  radius: 20,
  frictionAmount: 300,
  acceleration: 600,
  minAcceleration: 1,
  maxAcceleration: 600,

  spawnTime: 3 /* Default time until the player spawns again. (s) */,

  maxHealth: 100,

  defaultUsername: 'Unnamed',

  // How often the player can shoot (s).
  shootRate: 0.2,

  healthBarSizeY: 3,
  healthColor: '#11EE11',
  healthHurtColor: '#EE1111',
  spawnCountdownColor: '#222222',

  borderColor: '#111111',

  // These define the kinds of player skins there are.
  // For instance a plain blue player would have the presetType COLOR.
  skinTypes: skinTypes,
  skins: {
    'red': {
      type: skinTypes.COLOR,
      rgb: 'rgb(255,0,0)',
      textRgb: 'rgb(0,0,0)'
    },
    'blue': {
      type: skinTypes.COLOR,
      rgb: 'rgb(0,0,255)',
      textRgb: 'rgb(255,255,255)'
    },
    'purple': {
      type: skinTypes.COLOR,
      rgb: 'rgb(255,0,255)',
      textRgb: 'rgb(0,0,0)'
    },
    'green': {
      type: skinTypes.COLOR,
      rgb: 'rgb(0,255,0)',
      textRgb: 'rgb(0,0,0)'
    },
    'yellow': {
      type: skinTypes.COLOR,
      rgb: 'rgb(255,255,0)',
      textRgb: 'rgb(0,0,0)'
    },
    'black': {
      type: skinTypes.COLOR,
      rgb: 'rgb(0,0,0)',
      textRgb: 'rgb(255,255,255)'
    }
  }
};