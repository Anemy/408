/**
 * This file manages the server game lobbies, and all of the clients interactions with a game.
 */

const LobbyManager = function() {
  // This manages all of the currently in progress game lobbies.
  // It's a hashmap where each game lobby's unique identifier is its location in the array.
  this.lobbies = [];

  // Called when a player wants to find a game.
  this.findGame = function() {

  };
};

module.exports = LobbyManager;