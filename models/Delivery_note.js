'use strict';

const mongoose = require('mongoose');
const User = require('./User');

var Schema = mongoose.Schema;


//first, we created the scheme
var delivery_noteSchema = Schema({
    _id: Schema.Types.ObjectId,
    begin_date: {type: Date, index: true},
    text: {type: String, index: true},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    event: {type: Schema.Types.ObjectId, ref: 'Event'},
});