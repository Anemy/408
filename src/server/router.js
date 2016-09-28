'use strict';

const express = require('express');
const router = express.Router();

// GET method route
router.get('/', function (req, res) { 
  res.render('homepage');
}); 

// POST method route
router.post('/', function (req, res) {
  res.send('POST Request');
});

module.exports = router;