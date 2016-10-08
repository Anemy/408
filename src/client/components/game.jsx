import React from 'react';
const GameManager = require('./game/gameManager');
// const SocketConstants = require('./game/socket/socketConstants');

class Game extends React.Component {
  componentDidMount() {
    const game = new GameManager();
    game.start();
  }

  render() {
    return <canvas id="gameCanvas"></canvas>;
  }
}

module.exports = Game;
