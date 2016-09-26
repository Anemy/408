'use strict';

/**
 * This file manages the server game lobbies, and all of the clients interactions with a game.
 */
const _ = require('underscore');
const Lobby = require('./Models/Lobby');


class LobbyManager {
  
  constructor() {
    // This manages all of the currently in progress game lobbies.
    // It's a hashmap where each game lobby's unique identifier is its location in the array.
    this.lobbies = [];
  }
  
  // Called when a player wants to find a game.
  findGame(client) {
    var gameFound = false;
    var lobby = null;

    _.every(this.lobbies, (l) => {
      if (l.clients.length < l.capacity) {
        lobby = l;
        return false;
      }
      return true;
    });

    if (lobby === null) {
      lobby = this.createLobby();
    }
    lobby.addClient(client);

    return lobby;
  }

  createLobby() {
    const lobby = new Lobby();
    this.lobbies.push(lobby);
    return lobby;
  }
};

module.exports = LobbyManager;