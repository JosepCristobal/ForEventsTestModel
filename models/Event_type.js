'use strict';

const mongoose = require('mongoose');
const Event = require('./Event');
const Favorite_search = require('./Favorite_search');
const async = require('async');

var Schema = mongoose.Schema;


//first, we created the scheme
const event_typeSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, index: true},
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}],
    favorite_searches: [{type: Schema.Types.ObjectId, ref: 'Favorite_search'}]
});


//Insert New Event_type with cb
event_typeSchema.statics.insertEvent_type =  function(event_type, cb){
    event_type._id = new mongoose.Types.ObjectId();
        event_type.save((err, event_typeSave) => {
            if (err){
                return cb({ code: 500, ok: false, message: 'error saving event_type'}); 
            } else {
                return cb(null,event_typeSave);
            } 
        });
}
//Static function to verify if the event_type exists
event_typeSchema.statics.event_typeExists= function(eventTypeId, cb){
    if (eventTypeId.length === 24){
        var exists = Event_type.count({_id: eventTypeId}) ;
        exists.exec ((err, existsNumber) =>{
            if (err || exists === 0){
                return cb(null,0)
            } else {
                return cb(null,existsNumber);
            }
        });
   } else{
        throw new Error('The id must contain 24 characters or not exists!');
    }
};

//Update list of events (Add) when insert a new Event_type
event_typeSchema.statics.insertEvent = function(event_typeId, eventId, cb){
    Event_type.findOneAndUpdate({_id: event_typeId}, 
            { $push: { events: eventId } },
           function (error, success) {
                 if (error) {
                    return cb({ code: 500, ok: false, message: 'error saving event_type'}); 
                } else {
                    return cb(null,success);
                 }
             });
}

//Update list of favorite_searches (Add) when insert a new Event_type
event_typeSchema.statics.insertFavorite_Search = function(event_typeId,favorite_searchesId,cb){
    Event_type.findOneAndUpdate({_id: event_typeId}, 
            { $push: { favorite_searches: favorite_searchesId } },
           function (error, success) {
                 if (error) {
                    return cb({ code: 500, ok: false, message: 'error saving event_type'}); 
                } else {
                    return cb(null,success);
                 }
             });
}

//List of Event_type all or filter to _id
event_typeSchema.statics.list = function(event_typeID,name){
    if(name){
        const query = Event_type.findOne({'name': name});
        return query;
    } else if (event_typeID == undefined){
        const query = Event_type.find({});
        return query.exec();
    } else {
        const query = Event_type.findOne({_id: event_typeID});
        return query.exec();
    };
}


//Create model
const Event_type = mongoose.model('Event_type', event_typeSchema);

//and export model
module.exports = Event_type;
