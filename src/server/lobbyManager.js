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
    this.lobbies = {};
  }

  // Called when a player wants to find a game.
  findGame(client) {
    // Look for a non-full lobby.
    // When no available lobby was found, create a new one.
    const lobby = _.find(this.lobbies, l => {
      return l.population < l.capacity;
    }) || this.createLobby();

    lobby.addClient(client);
    console.log('Adding client to lobby:', lobby.id,'lobby pop:', lobby.population);

    return lobby;
  }

  joinLobby(lobbyId, client) {
    if (!_.isUndefined(this.lobbies[lobbyId]) && this.lobbies[lobbyId].population < this.lobbies[lobbyId].capacity) {
      this.lobbies[lobbyId].addClient(client);
    } else {
      return false;
    }
    return true;
  }

  createLobby() {
    const lobby = new Lobby();
    this.lobbies[lobby.id] = lobby;
    return lobby;
  }

  /**
   * Return an object with an array of lobbies and their information.
   */
  getLobbiesInfo() {
    const lobbies = [];

    for(var l in this.lobbies) {
      const lobby = this.lobbies[l];

      const lobbyInfo = {
        id: lobby.id,
        population: Object.keys(lobby.clients).length
        // TODO (Rhys): Make the lobby return a list of the client usernames playing so
        // that we have the information needed for people to find games w/ friends quick.
      };
      lobbies.push(lobbyInfo);
    }

    return lobbies;
  }
}

module.exports = LobbyManager;
