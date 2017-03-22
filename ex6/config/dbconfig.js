var mongoose = require("mongoose");

var config = {'mongo': {},'db':{}};

config.mongo.db = 'miw_morpion';
config.mongo.host = 'mongodb';
config.mongo.port = '27017';
config.mongo.user = 'root';
config.mongo.pass = 'toor';

//connect to database
config.db = mongoose.connect('mongodb://'+config.mongo.host+':'+config.mongo.port+'/'+config.mongo.db);


module.exports = config;