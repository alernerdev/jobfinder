'use strict';

var express = require('express');
var mongoose = require('mongoose');
var chalk = require('chalk');

var app = express();
app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.render('index');
});

mongoose.connect('mongodb://localhost/jobfinder');
var con = mongoose.connection;
con.once('open', function() {
    console.log(chalk.green('connected to mongodb successfully'));
});

app.listen(process.env.PORT || 3000);