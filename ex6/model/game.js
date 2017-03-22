/*
 * More details here http://mongoosejs.com/docs/guide.html
 */
var mongoose = require("mongoose"),
    fs = require('fs'),
    dbconfig = require('../config/dbconfig');


//create schema game
var gameSchema = new mongoose.Schema({
    user1:  String,
    user2:  String,
    visitors:  Number,
    winner:  String,
    finished:  Boolean,
    nextTurn:  String
});


// Defining unique hash index
//gameSchema.index({ ipAddress: 1, port: 1 }, { unique: true });


//compile schema to model
module.exports = dbconfig.db.model('Game', gameSchema, 'game');
