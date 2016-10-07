/**
 * This file contains unit tests for testing the keyManager class.
 */

const KeyManager = require('./keyManager');
const Player = require('../../../shared/player/player');

describe('The key manager:', function() {
  const dummyPlayer = new Player(0, 0, 'id');

  var keyManager;

  it('can be created', function() { 
    keyManager = new KeyManager();

    expect(typeof(keyManager)).toEqual('object');
  });

  it('influences a play movement on a \'w\' key press.', function() {
    dummyPlayer.up = false;

    keyManager.keyDown(dummyPlayer, 87 /* The key code for 'w'. */);

    expect(dummyPlayer.up).toEqual(true);
  });

  it('influences a play movement on a \'w\' key release.', function() {
    dummyPlayer.up = true;
    
    keyManager.keyUp(dummyPlayer, 87 /* The key code for 'w'. */);

    expect(dummyPlayer.up).toEqual(false);
  });

  it('stores a key buffer of pressed keys.', function() {
    keyManager.keyBuffer = [];

    keyManager.keyUp(dummyPlayer, 87 /* The key code for 'w'. */);
    keyManager.keyUp(dummyPlayer, 32 /* The key code for 'space'. */);

    const returnedKeyBuffer = keyManager.getKeyBuffer();

    const expectedBuffer = [{
      action: 1,
      keyCode: 87
    }, {
      action: 1,
      keyCode: 32
    }];

    expect(returnedKeyBuffer).toEqual(expectedBuffer);
  });

  it('wipes the buffer of pressed keys.', function() {
    keyManager.keyBuffer = [];

    keyManager.keyUp(dummyPlayer, 87 /* The key code for 'w'. */);
    keyManager.keyUp(dummyPlayer, 32 /* The key code for 'space'. */);

    const returnedKeyBuffer = keyManager.getKeyBuffer();

    const secondReturnedKeyBuffer = keyManager.getKeyBuffer();

    expect(secondReturnedKeyBuffer).toEqual([]);
  });
});