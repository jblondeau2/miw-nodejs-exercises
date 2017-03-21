'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');
var io = require('socket.io')();

var ProxyHarverster = require('../helper/ProxyHarvester');
var Proxy = require("../model/proxy");



/* GET home page. */
router.get('/dump/:show?', function(req, res, next) {


    var proxyHarverster = new ProxyHarverster();
    var showTarget = (req.params.show == 'show') ? true : false;

    var requestConfig = {
        url: "https://free-proxy-list.net",
        secure: 1,
        path: '/'
    };


    // Load Proxies from html
    proxyHarverster.loadFromHtml('').then(function(result){

        console.log('plop');
        if(showTarget){
            res.send(html);
        }else{
            res.render('dump', {
                title: 'Dumping Proxies',
                numberOfProxies: result
            });
        }
    }).catch(function(err){
        res.render('dump-error', {
            title: 'Dumping failed',
            error: err
        });

    });

    request.get(requestConfig, function (error, response, html) {
    if (!error && response.statusCode == 200) {

        console.log(error || html);

        let numberOfProxies = 0;

        // Load Proxies from html
        proxyHarverster.loadFromHtml(html).then(function(result){

            console.log('success');
            if(showTarget){
                res.send(html);
            }else{
                res.render('dump', {
                    title: 'Dumping Proxies',
                    newProxies: result['new'],
                    duplicateProxies: result['duplicate']
                });
            }
        }).catch(function(err){

            console.log('error');

            res.render('dump-error', {
                title: 'Dumping failed',
                error: err
            });
        });

    }
  }).end();

});


/* GET home page. */
router.get('/dyn-dump', function(req, res, next) {


    var proxyHarverster = new ProxyHarverster();

    var requestConfig = {
        url: "https://free-proxy-list.net",
        secure: 1,
        path: '/'
    };


    // Load Proxies from html
    proxyHarverster.loadFromHtml('').then(function(result){

        console.log('plop');
        if(showTarget){
            res.send(html);
        }else{
            res.render('dump', {
                title: 'Dumping Proxies',
                numberOfProxies: result
            });
        }
    }).catch(function(err){
        res.render('dump-error', {
            title: 'Dumping failed',
            error: err
        });
    });

    request.get(requestConfig, function (error, response, html) {
        if (!error && response.statusCode == 200) {

            console.log(error || html);

            let numberOfProxies = 0;

            // Load Proxies from html
            proxyHarverster.loadFromHtml(html).then(function(result){

                console.log('success');
                io.emit('incSuccess');


            }).catch(function(err){

                console.log('error');
                io.emit('incError');

            });

        }
    }).end();

});



/* Testing Proxy. */
router.get('/test', function(req, res, next) {

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
router.get('/list', function(req, res, next) {

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


/* GET build unique index. */
router.get('/build-index', function(req, res, next) {

    Proxy.ensureIndexes(function (err) {
        if (err){
            res.render('proxy-indexing', {
                title: 'Proxy indexing error',
                info: err
            });
        }else{
            res.render('proxy-indexing', {
                title: 'Proxy index built',
                info: 'OK'
            });
        }
    });

});

module.exports = router;
