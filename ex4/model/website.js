/*
 * More details here http://mongoosejs.com/docs/guide.html
 */
var mongoose = require("mongoose"),
    fs = require('fs'),
    dbconfig = require('../config/dbconfig');


//create schema for blog post
var websiteSchema = new mongoose.Schema({
    url:  String,
    ipAddress:  String,
    pages : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }]
});


// Defining unique hash index
websiteSchema.index({ url: 1 }, { unique: true });
websiteSchema.index({ ipAddress: 1 }, { unique: true });


//compile schema to model
module.exports = dbconfig.db.model('Website', websiteSchema, 'website');
