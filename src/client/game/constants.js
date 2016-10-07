/**
 * This file holds general purpose constants like the dimensions of the game.
 */

const serverWidth = 1280;
const serverHeight = 720;
const serverAspectRatio = serverWidth/serverHeight;
const isServer = (typeof window === 'undefined');

/**
 * Return the game width of the client in the greatest 16:9 ratio.
 * TODO: Do this differently? or no aspect ratio? - Do we want to sidescroll on the screen
 * 
 * @returns {Object}
 *    @property {Number} x
 *    @property {Number} y
 */
function getClientDimensions() {
  var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  const aspectRatio = clientWidth / clientHeight;

  if (aspectRatio > serverAspectRatio) {
    // The width needs to be decreased to fit the aspect ratio.
    clientWidth = clientHeight * serverAspectRatio;
  } else if (aspectRatio < serverAspectRatio) {
    // The height needs to be decreased to fit the aspect ratio.
    clientHeight = clientWidth * (1 / serverAspectRatio);
  }
  return {
    x: clientWidth,
    y: clientHeight
  };
}

const clientDimensions = (typeof window === 'undefined') ? null : getClientDimensions();

module.exports = {
  // The user's browser dimensions on client.
  // On server this is the game size.
  width: isServer ? serverWidth : clientDimensions.x,
  height: isServer ? serverHeight : clientDimensions.y,

  // The server game dimensions. Used for all logic. (Not drawing).
  gameWidth: serverWidth,
  gameHeight: serverHeight,

  scale: isServer ? 1 /* No scale */ : clientDimensions.x / serverWidth
};


