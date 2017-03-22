var express = require('express');
var router = express.Router();

var Game = require("../model/game");



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'MIW nodeJS Exercise n°6 : Morpion Game'
    });
});

/* GET home page. */
router.get('/game/:id/:playerId?', function(req, res, next) {

    var gameId = req.params.id;
    var playerId = (req.params.playerId == undefined) ? 'player2' : req.params.playerId;

    Game.findOne({'_id':gameId}, function(err, game) {

        console.log((game.player1 != undefined && game.player2 != undefined));
        if(game.player1 == undefined || game.player2 == undefined){
            if(game.player1 != undefined && game.player1 != playerId){

                game.player2 = playerId;

                // Saving New proxy.
                game.save(function (err) {
                    if (err) console.log('error: '+err);

                    res.redirect('/game/'+game._id+'/'+game.player2);

                });
            }else {
                res.redirect('/game/'+game._id+'/'+game.player2);

            }
        }else{
            game.guests++;

            // Saving New proxy.
            game.save(function (err) {
                if (err) console.log('error: '+err);

                res.render('game', {
                    game: game,
                    playerId: playerId
                });
            });
        }
    });

});

/* GET home page. */
router.post('/start-game', function(req, res, next) {

    var playerOne = req.body.username;
    var newGame = new Game({player1: playerOne, nextTurn:playerOne, visitors:0});

    // Saving New proxy.
    newGame.save(function (err) {
        if (err) console.log('error: '+err);

        res.redirect('/game/'+newGame._id+'/'+playerOne);
    });
});

module.exports = router;
