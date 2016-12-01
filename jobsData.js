(function () {

    'use strict';

    var mongoClient = require('mongodb').MongoClient;

    var collectionName = 'jobs';
    var collection = null;
    var db = null;

    function connectDB(connectionString, callback) {
        mongoClient.connect(connectionString, function (err, database) {
            console.log("connected successfully to DB");

            db = database;
            collection = db.collection(collectionName);

            seedJobs(callback);
        });
    }

    function createJob(job, callback) {
        collection.insertOne(job, function (err, r) {
            if (err) {
                console.log("failed to insert job");
                throw err;
            }

            // let the caller know this was done
            callback();
        });
    }

    function seedJobs(callback) {
        collection.find({}).toArray(function (err, docs) {
            if (err) {
                console.log("failed to find");
                throw err;
            }

            if (docs.length == 0) {
                var numberOfInserts = 0;
                for (var i = 0; i < dummySeedJobs.length; i++) {
                    createJob(dummySeedJobs[i], function () {
                        // I know how much is being inserted.  keep track of callback counts,
                        // and when I get the last one, thats when its done
                        numberOfInserts++;
                        console.log("inserted " + numberOfInserts);
                        if (numberOfInserts == dummySeedJobs.length) {
                            // all inserts are done
                            callback();
                        }
                    });
                }
            }
            else
                callback();
        })
    }

    function findJobs(query, callback) {
        collection.find(query).toArray(function (err, docs) {
            if (err) {
                console.log("failed to find");
                throw err;
            }

            callback(err, docs);
        });
    }

    var dummySeedJobs = [
        { title: 'Cook', description: 'Cooking up some splendid stuff' },
        { title: 'Technical Architect', description: 'The technical architect of the team...' },
        { title: 'Scrum Master', description: 'What did you do yesterday?  What you gonna do today?  Whats stopping progress?' },
        { title: 'Performance Analyst', description: 'Lets help the Service Manager build and amazing service for our citizens!' }
    ];

    module.exports = {
        connectDB: connectDB,
        findJobs: findJobs
    }

})()