/**
 * Entry point for 408 Game server.
 * @author Team 3
 */

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const http = require('http');

const routing = require('./src/server');
const SocketManager = require('./src/server/socket');

const portNumber = process.env.PORT || 8080;

const app = express();
const server = http.Server(app);

const socketManager = new SocketManager(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routing);

// Set the view engine to handlebars.
app.set('views', 'src/views/')
app.engine('.hbs', exphbs({
  layoutsDir: 'src/views/',
  defaultLayout: 'layout',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use('/',  express.static('./public'));

app.listen(portNumber, function() {
  console.log('Listening on port:', portNumber);
});