'use strict';

const mongoose = require('mongoose');
const Event = require('./Event');
const async = require('async');

var Schema = mongoose.Schema;


//first, we created the scheme
const mediaSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, index: true},
    description: String,
    url: String,
    media_type: String,
    event: {type: Schema.Types.ObjectId, ref: 'Event', index: true}

});

//Allowed Tags (Media_types)
mediaSchema.statics.allowedTags = function(){
    return ['Photo', 'Video', 'Others'];
};

//Insert New Media
mediaSchema.statics.insertMedia = function(media){
    media._id = new mongoose.Types.ObjectId();
    media.save((err, mediaSaved)=> {
    if (err){
        next(err);
        return (err);
    } else {
        try{
            return mediaSaved;
        } catch (err){
            console.log(err);
        }
        
    } 
});

 return media;
}


//Create model
const Media = mongoose.model('Media', mediaSchema);

//and export model
module.exports = Media;