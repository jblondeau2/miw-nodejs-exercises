/*
 * More details here http://mongoosejs.com/docs/guide.html
 */
var mongoose = require("mongoose"),
    fs = require('fs'),
    dbconfig = require('../config/dbconfig');

//create schema for blog post
var pageSchema = new mongoose.Schema({
    path:  String,
    data:  String
});


// Defining unique hash index
pageSchema.index({ path: 1 }, { unique: true });


//compile schema to model
module.exports = dbconfig.db.model('Page', pageSchema, 'page');
