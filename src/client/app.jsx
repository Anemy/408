import React, { PropTypes } from 'react';
const { test } = require('./actions');
const { connect } = require('react-redux');
const Gameloop = require('./game/gameloop');
// const SocketConstants = require('./game/socket/socketConstants');

class App extends React.Component {
  componentDidMount() {
    const game = new Gameloop();
    game.start();
  }

  render() {
    if (this.props.isPlaying) {
      return <canvas id="gameCanvas"></canvas>;
    }
    return (
      <div>
        <h1>Bumper Blasters</h1>
        <button>Join Game</button>
        <button>Server List</button>
        <h2>Controls</h2>
      </div>
    );
  }
}

App.propTypes = {
  joinGame: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return { isPlaying: state.isPlaying };
};

const mapDispatchToProps = dispatch => {
  return {
    joinGame: () => {
      dispatch(test('test'));
    }
  };
};


module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
