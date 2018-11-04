'use strict';

const mongoose = require('mongoose');
const User = require('./User');
const Event_type = require('./Event_type');
const Transaction = require('./Transaction');
const Media = require('./Media')
var Schema = mongoose.Schema;


//first, we created the scheme
var eventSchema = Schema({
    _id: Schema.Types.ObjectId,
    begin_date: {type: Date, index: true},
    end_date: {type: Date, index: true},
    adress: String,
    city: {type: String, index: true},
    zip_code: {type: String, index: true},
    province: String,
    country: String,
    indoor: Boolean,
    max_visitors: Number,
    free: Boolean,
    price: Number,
    create_date: {type: Date, default: Date.now},
    min_age: Number,
    name: {type: String, index: true},
    description: String,
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    organizer: {type: Schema.Types.ObjectId, ref: 'User'},
    event_type: {type: Schema.Types.ObjectId, ref: 'Event_type'},
    transaction: [{type: Schema.Types.ObjectId, ref: 'Transaction'}],
    media: [{type: Schema.Types.ObjectId, ref: 'Media'}],
    location: {
        type: { type: String},
        coordinates: [Number]
    }
});

eventSchema.index({ "location": "2dsphere" });


//List of events whith limit date >= today
eventSchema.statics.list0 = function(){
    var d = new Date();
    var n = d.toISOString();;
    const query = Event.find({end_date: {$gte: n}}).populate('organizer').populate('media');

    return query.exec();
}
//Update list of Media (Add) when insert a new Media
eventSchema.statics.insertMedia = function(eventId,mediaId){
    Event.findOneAndUpdate({_id: eventId}, 
            { $push: { media: mediaId } },
           function (error, success) {
                 if (error) {
                     console.log('KO' + error);
                 } else {
                    // console.log('OK ' + success);
                 }
             });
}


//Insert New Event
eventSchema.statics.insertEvent = function(event){
    event._id = new mongoose.Types.ObjectId();
   event.save((err, eventGuardado)=> {
    if (err){
        next(err);
        return (err);
    } else {
        return eventGuardado;
    } 
});

 return event;
}

//Search event for proximity
//long = longitude, lat = latitude, discance_m = distance in meters
eventSchema.statics.nearMe = function(long, lat, distance_m){
   const distance =  Event.find({ location: { $nearSphere: {
        $geometry: {type: 'Point', coordinates: [long, lat]},
    $maxDistance: distance_m }
    }});

    return distance.exec();
}

//Exists an id event?
eventSchema.statics.existsId = function(eventId){
    if (eventId.length === 24){
        var exists = Event.count({_id: eventId}) ;
        return exists.exec() 
   } else{
        throw new Error('The id must contain 24 characters!');
    }
}

// We create a static method to search for events
// The search can be paged
eventSchema.statics.list = function(filters,limit, skip, sort, fields){
    //We build the query
    const query = Event.find(filters);
    query.limit (limit);
    query.skip(skip);
    query.sort(sort);
    query.select(fields);
// We execute the query and return a promise
    return query.exec();
}

// We create a count of the total of events in the query
eventSchema.statics.countTot = function(filters){

const queryC = Event.count(filters);

    return queryC.exec();
}


//Create model
const Event = mongoose.model('Event', eventSchema);

//and export model
module.exports = Event;