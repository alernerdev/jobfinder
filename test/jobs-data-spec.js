var expect = require('chai').expect;
var chalk = require('chalk');
var jobsData = require('../jobsData');

// use blirbird for the underlying DB connection.  This is needed separate from mongoose
var dbUri = 'mongodb://localhost/jobfinder';


function resetJobs() {
    return new Promise(function (resolve, reject) {
        console.log(chalk.blue("inside reset jobs"));
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

describe("get jobs", function () {

    var jobs = null;

    before(function (done) {
        jobsData.connectDB('mongodb://localhost/jobfinder', function () {
            console.log('database is ready to be used');

            function seedJobsCompleted() {
                console.log(chalk.blue("test: seedJobsCompleted"));

                jobsData.findJobs({}, function (err, jobList) {
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

