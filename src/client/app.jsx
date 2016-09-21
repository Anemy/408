import React, { PropTypes } from 'react';
const { test } = require('./actions');
const { connect } = require('react-redux');
// const Gameloop = require('./game/gameManager');

class App extends React.Component {
  componentDidMount() {
    // const game = new Gameloop();
    // game.start();
  }

  render() {
    console.log(this.props);
    return (
      <div onClick={this.props.click}>
        <h1>HAI</h1>
        <canvas id="gameCanvas"></canvas>
      </div>
    );
  }
}

App.propTypes = {
  click: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { poop: state.poop };
};

const mapDispatchToProps = dispatch => {
  return {
    click: () => {
      dispatch(test('poop'));
    }
  };
};


module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
