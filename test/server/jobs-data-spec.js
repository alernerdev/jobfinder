/*
    this tests the data access layer
*/
var expect = require('chai').expect;
var chalk = require('chalk');
var jobsData = require('../../jobsData');

var dbUri = 'mongodb://localhost/jobfinder';

describe("get jobs", function () {

    // 'before' gets the jobs var just once....
    // .... and the rest of the tests test the jobs retrieved
    var jobs = null;
    before(function (done) {
        jobsData.connectDB(dbUri, function () {
            console.log('database is ready to be used');

            function seedJobsCompleted() {
                console.log(chalk.blue("test: seedJobsCompleted"));

                jobsData.findJobs(function (err, jobList) {
                    if (jobList)
                        console.log(chalk.blue("length is " + jobList.length));

                    // jobs is set for various tests
                    jobs = jobList;
                    done();
                });
            }

            function resetJobsCompleted() {
                console.log(chalk.blue("test: resetJobsCompleted"));
                jobsData.seedJobs(seedJobsCompleted);
            }

            jobsData.resetJobs(resetJobsCompleted);
        });
    });

    it("should never be empty since jobs are seeded", function () {
        expect(jobs.length).to.be.at.least(1);
    });

    it("should have a job with a title", function () {
        expect(jobs[0].title).to.not.be.empty;
    });

    it("should have a job with a description", function () {
        expect(jobs[0].description).to.not.be.empty;
    });
});

describe("db save jobs", function () {
    var job = {
        title: "cook",
        decription: "make bagels"
    }
    var jobs;

    // 'before' clears out everything and saves one job
    // this is the starting point
    before(function (done) {
        jobsData.connectDB(dbUri, function () {
            console.log('database is ready to be used');

            function saveJobCompleted() {
                console.log(chalk.blue("test: saveJobCompleted"));

                jobsData.findJobs(function (err, jobList) {
                    if (jobList)
                        console.log(chalk.blue("length is " + jobList.length));

                    // jobs is set for various tests
                    jobs = jobList;
                    done();
                });
            }

            function resetJobsCompleted() {
                console.log(chalk.blue("test: resetJobsCompleted"));
                jobsData.saveJob(job, saveJobCompleted);
            }

            jobsData.resetJobs(resetJobsCompleted);
        });
    });

    after(function () {
        jobsData.closeConnection();
    });

    it("should have one after saving one job", function () {
        expect(jobs).to.have.length(1);
    });
});
