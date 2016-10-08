import React, { PropTypes } from 'react';
const SocketConstants = require('../game/socket/socketConstants');

class Menu extends React.Component {
  getContent() {
    if (this.props.menuState === 'PLAYER_SETTINGS') {
      return <div>BLAH</div>;
    } else if (this.props.menuState === 'LOBBIES') {
      return <div>HARH</div>;
    } else if (this.props.menuState === 'LOADING') {
      return <div>HASEKR</div>;
    } else {
      return <div>ASLD</div>;
    }
  }
  render() {
    return (
      <div>
        <h1>Bumper Blasters</h1>
        <div className='card'>
          <ul className='navbar'>
            <li>
              <p>Player Settings</p>
            </li>
            <li>
              <p>Lobbies</p>
            </li>
            <li>
              <p>How To Play</p>
            </li>
          </ul>
          {this.getContent()}
        </div>
        <button onClick={() => {
          this.props.sendMessage({
            type: SocketConstants.FIND_GAME,
          });
        }}>Join Game</button>
        <button onClick={() => {
          this.props.sendMessage({
            type: SocketConstants.CHAT,
            msg: 'Hi!'
          });
        }}>Send Hi</button>
        <button onClick={() => {
          this.props.sendMessage({
            type: SocketConstants.LOBBIES_INFO
          });
        }}>Refresh Lobby Info</button>
      </div>
    );
  }
}

Menu.propTypes = {
  menuState: PropTypes.string,
  sendMessage: PropTypes.func
};

module.exports = Menu;
