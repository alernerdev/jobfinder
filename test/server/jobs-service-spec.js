/*
    this tests talking to my service
*/
var expect = require("chai").expect;
var request = require("supertest");
var express = require('express');

var app = express();

var dataSavedJob;

/* this is a mock. The idea here is to test posting of jobs to my service, and the service simply writes to the db
object without really knowing that its not a database.  This demonstrates the testing of each layer separately.
 */
var db = {
    saveJob: function(job) {
        dataSavedJob = job;
    },
    findJobs: function(callback) {
        console.log("entered fake findJobs");
        callback(null, ['hello there. fake document']);
    }
};

var jobService = require("../../jobsService")(db, app);

describe("get jobs", function() {
    it("get should give me a json list of jobs", function(done) {
        var o = request(app).get('/api/jobs');
        console.log("I am back in the test code");
        o.expect('Content-Type', /json/).end(function(err, res) {
            console.log("I am inside content checking");
            expect(res.body).to.be.a('Array');
            done();
        });
    });
});

describe("save jobs", function() {
    it("should validate that title is greater than 4 characters");
    it("should validate that title is less than 40 characters");
    it("should validate that description is greater than 4 characters");
    it("should validate that description is less than 250 characters");

    /* this fakes a post as if it came from the browser.  So this tests my handling
    of API and hits express withiut going through the network */
    var newJob = { title: 'Technical Architect', description: 'The technical architect of the team...' };
    it("should pass the job to the database save", function(done) {
        request(app).post('/api/jobs').send(newJob).end(function(err, res) {
            // deep does field by field comparison
            expect(dataSavedJob).to.deep.equal(newJob);
            done();
        });
    });

    it("should return a status of 200 to the front end if the database saved");
    it("should return a job with an id");
    it("should return an error if the database failed");
});
