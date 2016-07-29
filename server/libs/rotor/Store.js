'use strict';

var _ = require('underscore'),
	mongodb = require('mongodb'),
	assert = require('assert'),
    ObjectId = mongodb.ObjectID;

var Store = function(name) {
	var MongoClient = mongodb.MongoClient;

	this.url = 'mongodb://localhost:27017/caeser';
	this.name = name;
	this.collection = '';

	this.getConnection = function (callback) {
       	MongoClient.connect(this.url, function (err, db) {
            if (err !== null) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
            	var collection = db.collection(this.name);
            	callback(collection, db);
            }
        }.bind(this));
    }
};

_.extend(Store.prototype, {

	save: function() {
        //
	},

	create: function(model, callback) {
        this.getConnection(function (collection, database) {
            collection.insert(model.toJSON(), function (err, result) {
                if (err !== null) {
                    console.log('Failed to insert document: ' + err);
                    callback(err, result);
                } else {
                    console.log('Succesfully inserted: ' + JSON.stringify(result.ops[0]));
                    model.set({_id: result.ops[0]._id});
                    callback(err, result.ops[0]);
                }
                
                database.close();
            });
        });
	},

	update: function(model, callback) {
		this.getConnection(function (collection, database) {
            var data = model.toJSON();

            delete data._id;

            collection.findOneAndUpdate(
                {"_id": ObjectId(model.id)},
                {$set: data},
                {returnNewDocument: true, upsert: false},
                function (err, result) {
                    if (err !== null) {
                        console.log('Failed to update document: ' + err);
                        callback(err, data);
                    } else {
                        console.log('Succesfully updated: ' + JSON.stringify(data));
                        callback(err, data);
                    }

                database.close();
            });
        });
	},

	find: function(model, callback) {
		this.getConnection(function (collection, database) {
            collection.find({"_id": ObjectId(model.id)}, function (err, result) {
                if (err !== null) {
                    console.log('Failed to find document: ' + err);
                    callback(err, result);
                } else {
                    console.log('Succesfully found: ' + JSON.stringify(result));
                    callback(err, result);
                }

                database.close();
            });
        });
	},

	findAll: function(callback) {
		this.getConnection(function (collection, database) {
            collection.find({}).toArray(function(err, result) {
                if (err !== null) {
                    console.log('Failed to find documents: ' + err);
                    callback(err, result);
                } else {
                    console.log('Succesfully found: ' + result.length);
                    callback(err, result);
                }

                database.close();
            });
        });
	},

	destroy: function(model, callback) {
		this.getConnection(function (collection, database) {
            collection.findOneAndDelete({"_id": ObjectId(model.id)}, function (err, result) {
                if (err !== null) {
                    console.log('Failed to delete document: ' + err);
                    callback(err, result);
                } else {
                    console.log('Succesfully deleted: ' + JSON.stringify(result));
                    callback(err, result);
                }

                database.close();
            }, true);
        });
	}

});

module.exports = Store;