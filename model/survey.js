//model/survey.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var SurveySchema = new Schema({
        result:Array,
        id: Number,
        answer: String,
        age: String,
        sex: String,
        location: String,
        region1: String,
        region2: String,
        region3: String,
        region4: String,
        region5: String,
        region6: String,
        mobilemanager: String,
        satisfaction: String

});

//export our module to use in server.js
module.exports = mongoose.model('Comment', SurveySchema);