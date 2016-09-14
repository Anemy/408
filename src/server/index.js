var express = require('express');
var router = express.Router();

// GET method route
router.get('/', function (req, res) { 
  res.send('GET request :D');
}); 

// POST method route
router.post('/', function (req, res) {
  res.send('POST request');
});

module.exports = router;