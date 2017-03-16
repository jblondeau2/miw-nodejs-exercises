'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');

var ProxyHarverster = require('../helper/ProxyHarvester');
var Proxy = require("../model/proxy");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'MIW nodeJS Exercise n°4',
    people: 'MIWs',
    techno: 'Express with nodeJS'
  });
});


module.exports = router;
