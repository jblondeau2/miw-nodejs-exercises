/*
 * More details here http://mongoosejs.com/docs/guide.html
 */
var mongoose = require("mongoose"),
    	fs = require('fs');

String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}


var mongoHost = 'mongodb';
var mongoPort = '27017';
var mongoDatabase = 'proxy_db';


//connect to database
var db = mongoose.connect('mongodb://'+mongoHost+':'+mongoPort+'/'+mongoDatabase);

//create schema for blog post
var proxySchema = new mongoose.Schema({
    ipAddress:  String,
    port:  String,
    country:  String,
    hash:  String,
    status:  Boolean
});


//compile schema to model
module.exports = db.model('Proxy', proxySchema, 'proxy');
