const React = require('react');
const Gamemenu = require('./menu');

class App extends React.Component {
  componentDidMount() {
    const game = new Gameloop();
    game.start();
  }

  render() {
    return (
      <div>
        <canvas id="gameCanvas"></canvas>
      </div>
    );
  }
}

module.exports = App;
