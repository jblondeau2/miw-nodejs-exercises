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

/* GET home page. */
router.get('/proxies/dump', function(req, res, next) {


  var proxyHarverster = new ProxyHarverster();
  var requestConfig = {
    url: "https://free-proxy-list.net",
    secure: 1,
    path: '/'
  };

  request.get(requestConfig, function (error, response, html) {
    if (!error && response.statusCode == 200) {

      console.log(error || html);

      // Load Proxies from html
      proxyHarverster.loadFromHtml(html);
      res.send(html);

    }
  }).end();

});


/* Testing Proxy. */
router.get('/proxies/test', function(req, res, next) {

  var proxyHarverster = new ProxyHarverster();
  const proxyRepositoryUrl = "http://monip.org";

  Proxy.findOne({'status':true}, function(err, proxy) {

    console.log('Retrieving elements from DB');

    if (err) {
      console.log(err);
    }else {

      console.log('Documents retrieved');
      console.log(proxy);

      var requestConfig = {};

      if(proxy == null){
        requestConfig = {
          url: proxyRepositoryUrl,
          secure: 1,
          path: '/'
        };
      }else{
        requestConfig = {
          url: proxyRepositoryUrl,
          proxy: 'http://'+proxy.ipAddress+':'+proxy.port,
          secure: 1,
          path: '/'
        };

        // Updating proxy.
        proxy.status = false;
        proxy.save(function (err) {
          if (err) return handleError(err);
          // Saved.
        });
      }

      // Requesting
      request.get(requestConfig, function (error, response, html) {
        if (!error && response.statusCode == 200) {

          console.log(error || html);

          // Load Proxies from html
          proxyHarverster.loadFromHtml(html);
          res.send(html);

        }
      }).end();

    }
  });




});

/* GET proxy list. */
router.get('/proxies/list', function(req, res, next) {

  Proxy.find({}, function(err,documents) {

    console.log('Retrieving elements from DB');

    if (err) {
      console.log(err);
    }else {

      console.log('Documents retrieved');
      var proxies = documents;


      res.render('proxy-list', {
        title: 'Proxy list',
        proxies: proxies,
      });
    }
  });
});

module.exports = router;
