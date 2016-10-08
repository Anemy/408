const Gameloop = require('./game/gameloop');
const App = require('./app.jsx');
const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { createStore } = require('redux');

ReactDOM.render((
  <App />
), document.getElementById('content'));
