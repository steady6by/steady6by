//model/survey.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var ResultSchema = new Schema({
    w1:Number,
    w2:Number,
    w3:Number,
    w4:Number,
    w5:Number,
    w6:Number,
    r1:Number,
    r2:Number,
    r3:Number,
    r4:Number,
    r5:Number,
    r6:Number,
    r7:Number,
    mobilemanager:String,
    location:String,
    age:String,
    sex:String
});

//export our module to use in server.js
module.exports = mongoose.model('Result', ResultSchema);