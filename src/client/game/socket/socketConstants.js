/**
 * This file manages all of the kinds of messages that can be passed between the client and the server via socket io.
 */

module.exports = {
  CHAT: 1,
  FIND_GAME: 2,
  GAME_FOUND: 3,
  LOBBIES_INFO: 4,
  ERROR: 5,
  GAME_UPDATE: 6,

  maxChatMessageLength: 140 // Characters
}