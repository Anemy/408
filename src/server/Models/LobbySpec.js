/*
 * Testing for the Lobby model.
 * Using Jasmine.
 */

const Lobby = require('./Lobby');

describe('A lobby:', function() {
  describe('can handle clients when:', function() {
    const dummyClient = {
      id: 'dummy_client_id'
    };
    const dummyClientTwo = {
      id: 'dummy_client_id_2'
    };

    var lobbyToTest;

    it('creating a lobby', function() {
      lobbyToTest = new Lobby();

      expect(typeof(lobbyToTest)).toEqual('object');
    });

    it('adding clients to teh lobby', function() {
      lobbyToTest.addClient(dummyClient);

      expect(lobbyToTest.population).toEqual(1);

      lobbyToTest.addClient(dummyClientTwo);

      expect(lobbyToTest.population).toEqual(2);

      expect(Object.keys(lobbyToTest.clients).length).toEqual(2);
    });

    it('removing clients from the lobby', function() {
      lobbyToTest.removeClient('dummy_client_id');

      lobbyToTest.removeClient('dummy_client_id_2');

      expect(lobbyToTest.population).toEqual(0);
      expect(Object.keys(lobbyToTest.clients).length).toEqual(0);
    });
  });
});