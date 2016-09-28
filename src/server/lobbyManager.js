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
    var lobby;

    // Look for a non-full lobby.
    _.every(this.lobbies, (l) => {
      if (l.clients.length < l.capacity) {
        lobby = l;
        return false;
      }
      return true;
    });

    // When no available lobby was found, create a new one.
    if (_.isUndefined(lobby)) {
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

  getLobbiesInfo() {
    const lobbies = [];

    _.each(this.lobbies, (lobby) => {
      lobbies.push({
        id: lobby.id,
        population: Object.keys(lobby.clients).length

        // TODO (Rhys): Make the lobby return a list of the client usernames playing so
        // that we have the information needed for people to find games w/ friends quick.
      });
    })

    const msg = {
      lobbies: lobbies
    }

    return msg;
  }
};

module.exports = LobbyManager;