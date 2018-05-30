//server.js
'use strict';

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/survey');
var secrets = require('./secrets_template');
var Result = require('./model/result');
var cors = require ('cors');

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001

var port = process.env.API_PORT || 3001;
//db config -- set your URI from mLab in secrets.js
var mongoDB = secrets.requestSecret('dbuser');
mongoose.connect(mongoDB, { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors());
//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//adding the /comments route to our /api router
router.route('/survey')
  //retrieve all comments from the database
  .get(function(req, res) {
    //looks at our Comment Schema
    Comment.find(function(err, survey) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(survey)
    });
  })
  //post new comment to the database
  .post(function(req, res) {
      var surv = new Comment();
      (req.body.result)? surv.result = req.body.result : null;


    surv.save(function(err) {
    if (err)
        res.send(err);
    res.json({ message: 'Comment successfully added!' });
});
});

//adding the /comments route to our /api router
router.route('/result')
//retrieve all comments from the database
    .get(function(req, res) {
        //looks at our Comment Schema
        Result.find(function(err, survey) {
            if (err)
                res.send(err);
            //responds with a json object of our database comments.
            res.json(survey)
        });
    })
    //post new comment to the database
    .post(function(req, res) {
        var result = new Result();
        (req.body.wj)? result.wj = req.body.wj : null;
        (req.body.rj)? result.rj = req.body.rj : null;
        (req.body.mobilemanager)? result.mobilemanager = req.body.mobilemanager : null;
        (req.body.location)? result.location = req.body.location : null;


        result.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment successfully added!' });
        });
    });

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
