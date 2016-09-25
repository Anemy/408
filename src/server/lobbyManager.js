/**
 * This file manages the server game lobbies, and all of the clients interactions with a game.
 */

import uuid from 'uuid';

class Lobby {
  constructor() {
    // TODO: make this more fun (i.e. adjective + noun)
    this.id = uuid.v4();
    this.clients = [];
  }

  addClient(client) {
    this.clients.push(client);
  }
}

export default class LobbyManager {
  
  constructor() {
    // This manages all of the currently in progress game lobbies.
    // It's a hashmap where each game lobby's unique identifier is its location in the array.
    this.lobbies = [];
  }
  
  // Called when a player wants to find a game.
  findGame(client) {
    var gameFound = false;

    if (!gameFound) {
      const lobby = this.createLobby();
      lobby.addClient(client);
    }
  }

  createLobby() {
    const lobby = new Lobby();
    this.lobbies.push(lobby);
    return lobby;
  }
};

module.exports = LobbyManager;