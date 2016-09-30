/**
 * This file holds general purpose constants like the dimensions of the game.
 */

module.exports = {
  // The user's browser dimensions on client.
  // On server this is the game size.
  // TODO: Make this a certain aspect ratio.
  width: (typeof window === 'undefined') ? 500 : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  height: (typeof window === 'undefined') ? 500 : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
};