var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('towns', {
    title: 'Towns list',
    towns: ['Gap', 'Briançon', 'Aix-en-provence', '...'],
  });
});

module.exports = router;
