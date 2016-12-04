/*
    the idea here is to mock the back end and test what the front end is sending.
    That way, the http calls can be intercepted and validated for what the
    front end is sending
*/

describe("posting jobs", function() {
    var postRequestJob;
    var newJob = {title: 'test title', description: 'test description'}

    beforeEach(module('app'));

    it("should call /api/jobs with job data", inject(function($httpBackend, jobs){
        $httpBackend.whenPOST('/api/jobs', function(data) {
            postRequestJob = JSON.parse(data);
            expect(postRequestJob).to.not.be.empty;
            return true;
        }).respond(200);
        jobs.save(newJob);
        $httpBackend.flush;
    }));
})
