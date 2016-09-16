const express = require('express');
const router = express.Router();

// GET method route
router.get('/', function (req, res) { 
  res.render('homepage');
  // res.send('GET Request :D');
}); 

// POST method route
router.post('/', function (req, res) {
  res.send('POST Request');
});

module.exports = router;