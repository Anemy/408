/**
 * Constants related to a player.
 */

module.exports = {
  playerSize: 20,
  playerMovementSpeed: 100,

  // These define the kinds of player skins there are.
  // For instance a plain blue player would have the presetType COLOR.
  skinTypes: {
    COLOR: 1,
    IMAGE: 2,
    PATTERN: 3,
    ANIMATION: 4
  },
  skins: {
    'red': {
      type: this.skinTypes.COLOR,
      rgb: 'rgb(255,0,0)'
    },
    'blue': {
      type: this.skinTypes.COLOR,
      rgb: 'rgb(0,0,255)'
    }
  }
};