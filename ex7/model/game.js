/*
 * More details here http://mongoosejs.com/docs/guide.html
 */
var mongoose = require("mongoose"),
    fs = require('fs'),
    dbconfig = require('../config/dbconfig');


//create schema game
var gameSchema = new mongoose.Schema({
    player1:  String,
    player1_move:  Array,
    player2:  String,
    player2_move:  Array,
    guests:  Number,
    winner:  String,
    finished:  Boolean,
    nextTurn:  String
});


// Defining unique hash index
//gameSchema.index({ ipAddress: 1, port: 1 }, { unique: true });


//compile schema to model
module.exports = dbconfig.db.model('Game', gameSchema, 'game');
