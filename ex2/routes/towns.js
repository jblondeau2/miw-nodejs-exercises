var express = require('express');
var router = express.Router();

var TownElement = require("../model/town");

/* GET home page. */
router.get('/', function(req, res, next) {

  var towns = [];


  TownElement.find({}, function(err,documents) {

    console.log('Retrieving elements from DB');

    if (err) {
      console.log(err);
    }else {

      console.log('Documents retrieved');
      towns = documents;


      res.render('towns', {
        title: 'Towns list',
        towns: towns,
      });
    }
  });



});

module.exports = router;
