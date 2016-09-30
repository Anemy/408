'use strict';

const express = require('express');
const router = express.Router();

// GET method route
router.get('/', function (req, res) {
  res.render('homepage');
});

router.get('/lobbies', function(req, res) {
  res.send({
    // TODO: send array of lobbies, ideally paginated.
  });
});

router.post('/lobbies/:id', function(req, res) {
  res.send({
    // TODO: send response to join specific game
  });
});

router.post('/lobbies/', function(req, res) {
  res.send({
    // TODO: send response to join game
  });
});

// POST method route
router.post('/', function (req, res) {
  res.send('POST Request');
});

module.exports = router;
