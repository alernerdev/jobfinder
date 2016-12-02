var bodyParser = require('body-parser');

module.exports = function(db, app) {

    console.log("service received post");

    app.use(bodyParser.json());

    app.post('/api/jobs', function (req, res) {

        db.saveJob(req.body);
        res.end();
    });

    app.get('/api/jobs', function(req, res) {
        console.log("service received get");

        db.findJobs().then(function(collection) {
            res.send(collection);
        });
    });

};

