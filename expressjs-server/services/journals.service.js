var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('journals');

var service = {};

service.createJournal = createJournal;
service.deleteJournal = deleteJournal;

module.exports = service;

function createJournal (userID, title, content) {
    var deferred = Q.defer();
    var createdJournal;

    try {
        createdJournal = db.journals.insertOne({
                userID: userID,
                title: title,
                content: content
            }
        );
    } catch (e) {
        deferred.reject("Error: " + e.errmsg);
    }
    deferred.resolve({
        id: createdJournal.insertedId
    });

    return deferred.promise;
}

function deleteJournal (userID, journalID) {
    var deferred = Q.defer();

    try {
        db.journals.deleteOne({
            userID: userID,
            _id: journalID
        });
    } catch (e) {
        deferred.reject("Error: " + e.errmsg);
    }
    deferred.resolve();

    return deferred.promise;
}