(function () {

    'use strict';

    var express = require('express');
    var app = express();

    var jobsData = require('./jobsData');
    require("./jobsService.js")(jobsData, app);

    app.set('views', __dirname);
    app.set('view engine', 'jade');

    app.use(express.static(__dirname + '/public'));

    /*
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
    */

    app.get('*', function (req, res) {
        // use render when rendering templates with html
        res.render('index');
    })

    /*
        as part of the demo for this class, the code is being deployed to heroku and codeship.
        Heroku does not have MongoDB -- so a separate account was setup at MongoLabs and the connection URL has to
        point there.
        The way Codeship works is that once it runs a successful build and tests, it can automatically deploy
        the results to various destinations -- such as heroku.
    */
    jobsData.connectDB('mongodb://localhost/jobfinder', function () {
        console.log('database is ready to be used');
    })


    app.listen(process.env.PORT || 3000);

})()
