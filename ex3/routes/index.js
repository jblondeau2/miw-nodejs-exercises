var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'MIW nodeJS Exercise n°3',
    people: 'MIWs',
    techno: 'Express with nodeJS'
  });
});

module.exports = router;
