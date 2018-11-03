'use strict';

const mongoose = require('mongoose');
const Event = require('./Event');
var Schema = mongoose.Schema;


const event_typeSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, index: true},
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});



//Create model
const Event_type = mongoose.model('Event_type', event_typeSchema);

//and export model
module.exports = Event_type;
