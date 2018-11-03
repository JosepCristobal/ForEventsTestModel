'use strict';

const mongoose = require('mongoose');
const Event = require('./Event');
const User = require('./User');
var Schema = mongoose.Schema;

const transactionSchema = Schema({
    _id: Schema.Types.ObjectId,
    create_date: {type: Date, index: true},
    event: {type: Schema.Types.ObjectId, ref: 'Event', index: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', index: true},

});

//Create model
const Transaction = mongoose.model('Transaction', transactionSchema);

//and export model
module.exports = Transaction;