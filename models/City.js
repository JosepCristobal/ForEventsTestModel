'use strict';

const mongoose = require('mongoose');
const User = require('./User');
var Schema = mongoose.Schema;

//first, we created the scheme
const citySchema = Schema({
    _id: Schema.Types.ObjectId,
    city: {type: String, index: true},
    province: {type: String, index: true},
    country: {type: String, index: true},
    location: {
        type: { type: String},
        coordinates: [Number]
    },
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
});
citySchema.index({ "location": "2dsphere" });

//Create model
const City = mongoose.model('City', citySchema);

//and export model
module.exports = City;
