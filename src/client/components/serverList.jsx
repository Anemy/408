import React, {PropTypes} from 'react';

const SocketConstants = require('../game/socket/socketConstants');
const Constants = require('../../shared/game/constants');

class ServerList extends React.Component {
  componentDidMount() {
    // Fetch the lobbies info from the server when the component mounts initially.
    this.props.sendMessage({
      type: SocketConstants.LOBBIES_INFO
    });
  }

  renderLobbies(lobbies) {
    const Lobby = ({lobby}) => {
      return (
        <lobby key={lobby.id} className='server'>
          <p className='server-name'>
            {lobby.idsssss || 'undefined server variable id'}
          </p>
          <p className='server-population'>
            {lobby.population}/{Constants.maxLobbyCapacity}
          </p>

          <button
            className='join-server-button'
            onClick={() => {
              this.props.sendMessage({
                type: SocketConstants.FIND_GAME,
                lobbyId: lobby.id
              });
            }}>JOIN GAME</button>
        </lobby>
      );
    };

    if (lobbies.length > 0) {      
      return _.extend([(
          <div>
            <label>LOBBY NAME</label>
            <label>LOBBY SIZE</label>
          </div>
        )],
        lobbies.map(function(lobby, index) {
          return (      
            <Lobby key={index} lobby={lobby}/>
          );
      }.bind(this)));
    }
    else return [(
        <p key="0">No active lobbies</p>
      )];
  }

  render() {
    let serverList;

    if(!this.props.serverData) {
      serverList = (<label>Loading...</label>);
    } else {
      const lobbies = this.renderLobbies(this.props.serverData);

      serverList = (
        <div className='servers'>
          <label>ACTIVE LOBBIES</label>
          <br/>
          {lobbies}
          <br/>
          <button 
            className='refresh-lobbies'
            onClick={() => {
              this.props.sendMessage({
                type: SocketConstants.LOBBIES_INFO
              });
            }}>🔄 REFRESH</button>
        </div>
      );
    }

    return (
      <div className='server-list'>{serverList}</div>
    );
  }
}

ServerList.propTypes = {
  serverData: PropTypes.array,
  sendMessage: PropTypes.func
};


module.exports = ServerList;
