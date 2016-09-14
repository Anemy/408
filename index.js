/**
 * Entry point for 408 Game.
 * @author Team 3
 */

const express = require('express');
const routing = require('./src/server');

const portNumber = process.env.PORT || 8080;

const app = express();

app.use('/', routing);

app.listen(portNumber, function () {
  console.log('Listening on port:',portNumber);
});