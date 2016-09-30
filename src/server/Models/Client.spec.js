/*
 * Testing for the Client model.
 * Using Jasmine.
 */

const Client = require('./Client');

describe('A client:', function() {
  var clientToTest;

  const dummySocket = {
    on: function() {

    },
    emit: function() {

    }
  };
  const dummySocketManager = {
    clientDisconnected: function() {

    }
  };

  it('can be created', function() {
    clientToTest = new Client(dummySocket, dummySocketManager);

    expect(typeof(clientToTest)).toEqual('object');
  });
});