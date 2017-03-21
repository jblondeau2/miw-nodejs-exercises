/*
 * More details here http://mongoosejs.com/docs/guide.html
 */
var mongoose = require("mongoose"),
    fs = require('fs'),
    dbconfig = require('../config/dbconfig');


//create schema for blog post
var proxySchema = new mongoose.Schema({
    ipAddress:  String,
    port:  String,
    country:  String,
    status:  Boolean
});


// Defining unique hash index
proxySchema.index({ ipAddress: 1, port: 1 }, { unique: true });


//compile schema to model
module.exports = dbconfig.db.model('Proxy', proxySchema, 'proxy');
