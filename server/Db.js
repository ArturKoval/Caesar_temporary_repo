'use strict';

var mongodb = require('mongodb'),
	assert = require('assert');

var DataBase = (function () {
	var MongoClient = mongodb.MongoClient,
        url = 'mongodb://localhost:27017/test',
        collection;

       function getConnection (collectionName, callback) {
	       	MongoClient.connect(url, function (err, db) {
	            assert.equal(null, err);
	            if (err) {
	                console.log('Unable to connect to the mongoDB server. Error:', err);
	            } else {
	            	collection = db.collection(collectionName);
	            	callback(collection, db);
	            }
	        });
        }

    return {
    	connect: getConnection,
    	client: MongoClient,
    	url: url
    };

})();

module.exports = DataBase;