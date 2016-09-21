const App = require('./app.jsx');
const React = require('react');
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const bumperBlasters = require('./reducers');
const ReactDOM = require('react-dom');

let store = createStore(bumperBlasters);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('content'));
