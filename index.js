/**
 * Entry point for 408 Game.
 * @author Team 3
 */

const express = require('express');
const routing = require('./src/server');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const portNumber = process.env.PORT || 8080;

const app = express();

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

app.listen(portNumber, function () {
  console.log('Listening on port:',portNumber);
});