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
var mongoDatabase = 'town_db';

//var parameters = Yaml.safeLoad(fs.readFileSync(__dirname+'/..'.repeat(9)+'/app/config/parameters.yml', 'utf-8'));
//var mongoHost = parameters.parameters.eulerian_query_default_host;
//var mongoPort = parameters.parameters.eulerian_query_default_port;
//var mongoDatabase = parameters.parameters.eulerian_query_default_database;

//connect to database
var db = mongoose.connect('mongodb://'+mongoHost+':'+mongoPort+'/'+mongoDatabase);

//create schema for blog post
var townSchema = new mongoose.Schema({
    name:  String,
    zipcode:  String
});

//compile schema to model
module.exports = db.model('town', townSchema, 'town')
