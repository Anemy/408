import React, { PropTypes } from 'react';
const SocketConstants = require('../game/socket/socketConstants');
const Navbar = require('./navbar.jsx');

class Menu extends React.Component {
  getContent() {
    if (this.props.navState === 'PLAYER_SETTINGS') {
      return <div>BLAH</div>;
    } else if (this.props.navState === 'LOBBIES') {
      return <div>HARH</div>;
    } else if (this.props.navState === 'LOADING') {
      return <div>HASEKR</div>;
    } else {
      return <div>ASLD</div>;
    }
  }

  render() {
    return (
      <div className='bg'>
        <h1 className='title'>Bumper Blasters</h1>
        <div className='card'>
          <Navbar
            navState={this.props.navState}
            setNavState={this.props.setNavState} />
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
  navState: PropTypes.string,
  sendMessage: PropTypes.func,
  setNavState: PropTypes.func
};

module.exports = Menu;
