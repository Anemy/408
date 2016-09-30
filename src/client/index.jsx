const App = require('./app.jsx');
const React = require('react');
const { createStore, applyMiddleware } = require('redux');
const { Provider } = require('react-redux');
const thunkMiddleware = require('redux-thunk').default;
const createLogger = require('redux-logger');
const bumperBlasters = require('./reducers');
const ReactDOM = require('react-dom');

const loggerMiddleware = createLogger();

let store = createStore(
  bumperBlasters,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('content'));
