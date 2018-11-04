'use strict';

const mongoose = require('mongoose');
const Favorite_search = require('./Favorite_search');
const City = require('./City');
const Transaction = require('./Transaction');
const Event = require('./Event')
var Schema = mongoose.Schema;


//first, we created the scheme
const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    firstName: { type: String, index: true },
    lastName: { type: String, index: true },
    email: { type: String, index: true },
    address: String,
    city: String,
    zip_code: String,
    province: String,
    country: String,
    password: String,
    birthday: Date,
    gender: String,
    create_date: Date,
    delete_date: Date,
    alias: String,
    idn: String,
    company_name: String,
    mobile_number: String,
    phone_number: String,
    profile: String,
    favorite_searches: [{type: Schema.Types.ObjectId, ref: 'Favorite_search'}],
    city: {type: Schema.Types.ObjectId, ref: 'City'},
    transactions:[{type: Schema.Types.ObjectId, ref: 'Transaction'}],
    events:[{type: Schema.Types.ObjectId, ref: 'Event'}],
    location: {
        type: { type: String},
        coordinates: [Number]
    }
});
userSchema.index({ "location": "2dsphere" });

//Allowed Tags to Profile
userSchema.statics.allowedProfile = function(){
    return ['User', 'Organizer', 'Admin'];
};

//Insert New User
userSchema.statics.insertUser = function(user){
    user._id = new mongoose.Types.ObjectId();
   user.save((err, userSaved)=> {
    if (err){
        next(err);
        return (err);
    } else {
        return userSaved;
    } 
});

 return user;
}


var User = mongoose.model('User', userSchema);

//JCM
module.exports = User;