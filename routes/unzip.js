var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('unzip a compressed file');
});

module.exports = router;
