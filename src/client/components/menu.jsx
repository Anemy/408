import React, { PropTypes } from 'react';
const SocketConstants = require('../game/socket/socketConstants');
const Navbar = require('./navbar.jsx');
const PlayerSettings = require('./playerSettings.jsx');

class Menu extends React.Component {
  getContent() {
    if (this.props.navState === 'PLAYER_SETTINGS') {
      return (
        <PlayerSettings
          displayName={this.props.displayName}
          gameMode={this.props.gameMode}
          setDisplayName={this.props.setDisplayName}
          setGameMode={this.props.setGameMode} />
      );
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
        <h1 className='title'>BUMPER BLASTERS</h1>
        <div className='card'>
          <Navbar
            navState={this.props.navState}
            setNavState={this.props.setNavState} />
          {this.getContent()}
        </div>
        <button
          onClick={() => {
            console.log('This:',this);

            this.props.sendMessage({
              type: SocketConstants.FIND_GAME,
              username: this.props.displayName
            });
          }}
          className='button'>PLAY NOW</button>
      </div>
    );
  }
}

Menu.propTypes = {
  displayName: PropTypes.string,
  gameMode: PropTypes.string,
  navState: PropTypes.string,
  sendMessage: PropTypes.func,
  setDisplayName: PropTypes.func,
  setGameMode: PropTypes.func,
  setNavState: PropTypes.func
};

module.exports = Menu;
