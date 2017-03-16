'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');

var Website = require("../model/website");

/* GET build unique index. */
router.get('/build-index', function(req, res, next) {

    Website.ensureIndexes(function (err) {
        if (err){
            res.render('website-indexing', {
                title: 'Website indexing error',
                info: err
            });
        }else{
            res.render('website-indexing', {
                title: 'Website index built',
                info: 'OK'
            });
        }
    });

});

module.exports = router;
