'use strict';

const express = require('express');
const router = express.Router();

// Homepage request.
router.get('/', function (req, res) {
  res.render('homepage');
});

module.exports = router;
