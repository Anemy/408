const React = require('react');
const ReactDOM = require('react-dom');
const Menu = require('./components/menu.jsx');
const SocketConstants = require('./game/socket/socketConstants');
const gameManager = require('./game/gameManager');

let socket;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      navState: 'PLAYER_SETTINGS',
    };
  }

  componentDidMount() {
    socket = io();
    // Called when the client first connects to the server.
    socket.on('connected', data => {
      // Store the unique identifier given to us from the server.
      gameManager.setUuid(data.uuid);
    });
    socket.on('message', this.recieveMessage.bind(this));
    gameManager.start(this.sendMessage);
  }

  getMenu() {
    if (!this.state.isPlaying) {
      return <Menu
        navState={this.state.navState}
        sendMessage={this.sendMessage}
        setNavState={this.setNavState.bind(this)}
      />;
    }
  }

  setNavState(navState) {
    this.setState({navState});
  }

  recieveMessage(msg) {
    switch(msg.type) {
    case SocketConstants.CHAT:
      console.log('Chat message recieved:', msg.msg);
      break;
    case SocketConstants.GAME_FOUND:
      console.log('Game found! Lobby id:', msg.lobbyId);
      this.setState({isPlaying: true});
      gameManager.updateLobby(msg.lobbyId);
      break;
    case SocketConstants.LOBBIES_INFO:
      console.log('Lobby info update from server:', msg.lobbiesInfo);
      break;
    case SocketConstants.ERROR:
      console.log('Error from server:', msg.msg);
      break;
    case SocketConstants.GAME_UPDATE:
      // if (Math.random() * 100 > 95)
      //    console.log('Game update from server:', msg.msg);
      gameManager.parseGameUpdateFromServer(msg.msg);
      break;
    default:
      // When we don't have a case for the server message type we just throw an error.
      throw new Error('Unidentifiable message from server.');
    }
  }

  sendMessage(msg) {
    if (socket) {
      socket.emit('message', msg);
    } else {
      new Error('Error: Trying to send message without an established connection to server.');
    }
  }

  render() {
    return (
      <div>
        <canvas id='gameCanvas'></canvas>
        {this.getMenu()}
      </div>
    );
  }
}

ReactDOM.render((
  <App/>
), document.getElementById('content'));
