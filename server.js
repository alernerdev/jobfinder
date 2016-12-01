(function () {

    'use strict';

    var express = require('express');
    var app = express();

    var jobsData = require('./jobsData');

    // This adds the api route to express, passing in our Data Access layer (jobsData) express app (app)
    // No need to capture the return value as it just inerts routes in the express app.
    //require('./jobs-service')(jobsData, app);

    app.set('views', __dirname);
    app.set('view engine', 'jade');

    app.use(express.static(__dirname + '/public'));

    app.get('/api/jobs', function(req, res){
        jobsData.findJobs({}, function(err, docs) {
            if (err) {
                // send something back here
                return;
            }

            // use send when sending data
            res.send(docs);
        });
    })

    app.get('*', function (req, res) {
        // use render when rendering templates with html
        res.render('index');
    })

    jobsData.connectDB('mongodb://localhost/jobfinder', function () {
        console.log('database is ready to be used');
    })


    app.listen(process.env.PORT || 3000);

})()