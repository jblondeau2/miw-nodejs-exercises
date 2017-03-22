'use strict';
var express = require('express');
var router = express.Router();
var request = require('request');

//var ProxyHarverster = require('../helper/ProxyHarvester');
var Game = require("../model/game");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'MIW nodeJS Exercise n°6 : Morpion Game'
  });
});

/* GET home page. */
router.get('/game/:id', function(req, res, next) {

  var gameId = req.params.id;

  Game.findOne({'_id':gameId}, function(err, game) {

    console.log(game);

    res.render('game', {
      game: game
    });

  });

});

/* GET home page. */
router.post('/start-game', function(req, res, next) {

    //var playerOne = req.body.username;

    console.log(req);
    //console.log(playerOne);
    var newGame = new Game({player1: playerOne, nextTurn:'user1'});

    // Saving New proxy.
    newGame.save(function (err) {
        if (err) console.log('error: '+err);

        res.redirect('/game/'+newGame._id);
    });
});


module.exports = router;
