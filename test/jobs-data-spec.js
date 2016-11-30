var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobModel = require('../models/Job');
var Promise = require("bluebird");
var chalk = require('chalk');


// use blirbird for the underlying DB connection.  This is needed separate from mongoose
var dbUri = 'mongodb://localhost/jobfinder';
var options = {promiseLibrary: Promise};

mongoose.Promise = Promise; // bluebird

function resetJobs() {
    return new Promise(function (resolve, reject) {
        console.log(chalk.blue("inside reset jobs"));
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

describe("get jobs", function () {
    it("should never be empty since jobs are seeded", function (done) {
        var con = mongoose.createConnection(dbUri, options);
        con.once('open', function () {
            resetJobs()
                .then(jobModel.seedJobs())
                .then(function () {
                    mongoose.model('Job').find({}).exec().then(function (jobList) {
                        if (err)
                            console.log("err " + err);

                        if (jobList)
                            console.log(chalk.blue("length is " + jobList.length));

                        console.log(chalk.green("inside doing the test"));
                        expect(jobList.length).to.be.at.least(1);
                        done();
                        console.log("past done ?");
                    });
                });
        });
    });
});


/*
callback approach --- booo!  christmas tree staircase

function resetJobs(callback) {
    mongoose.connection.collections['jobs'].drop(callback);
}

describe("get jobs", function () {
    it("should never be empty since jobs are seeded", function (done) {
        mongoose.connect('mongodb://localhost/jobfinder', function () {
            resetJobs(function () {
                jobModel.seedJobs(function () {
                    mongoose.model('Job').find({}).exec(function (err, jobList) {
                        expect(jobList.length).to.be.at.least(1);
                        done();
                    });
                })
            });
        });
    });
});
*/