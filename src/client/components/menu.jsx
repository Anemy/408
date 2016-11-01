import React, { PropTypes } from 'react';
const SocketConstants = require('../game/socket/socketConstants');
const Navbar = require('./navbar.jsx');
const PlayerSettings = require('./playerSettings.jsx');
const ServerList = require('./serverList.jsx');

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
      return (
        <ServerList
          sendMessage={this.props.sendMessage}
          serverData={this.props.serverData} />
      );
    } else if (this.props.navState === 'LOADING') {
      return <div>HASEKR</div>;
    } else {
      return <div className="instructions">
        <ol>
          <li>Open the game in your web browser.</li>
          <li>The menu screen loads. Enter your name and select options. For example, you may choose a lobby to play in.</li>
          <li>Click “Play Now” after selecting your options.</li>
          <li>The game loads. You will see your player sprite on the screen. A 3 second countdown timer appears so you can get ready to play.</li>
          <li>To move about the board:
          <ul>
          <li>The W key moves you up on the board.</li>
          <li>The A key moves you left on the board.</li>
          <li>The S key moves you down on the board.</li>
          <li>The D key moves you right on the board.</li>
          </ul>
          </li>
          <li>To shoot at other players:
          <ul>
          <li>The Up Arrow key shoots up.</li>
          <li>The Left Arrow key shoots left.</li>
          <li>The Down Arrow key shoots down.</li>
          <li>The Right Arrow key shoots right.</li>
          <li>You can also press two arrow keys at once. For example, Up Arrow and Right Arrow shoots at an upper right diagonal / northeast direction.</li>
          </ul>
          </li>
          <li>The scoreboard is shown in the upper left corner of the screen.</li>
          <li>Your health bar is rendered above your player sprite. The amount of green represents your health. When your health gets drained, the green is replaced with red.</li>
          <li>Your score increases when you kill another player. </li>
          </ol>
      </div>;
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
  setNavState: PropTypes.func,
  serverData: PropTypes.array
};

module.exports = Menu;
