'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const User = require('../../models/User');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Insert New User
router.post('/', (req,res,next) => {
    
    const name = req.query.name;
    if (name === "yes"){
        var user = new User({
            firstName: 'Juan',
            lastName: 'De la Fuente',
            email: 'juan.fuente@jtip.es',
            password: 'Er458900.',
            location: {type:'Point',
                        coordinates: [1.838657, 41.785054]}
                    });
        var insert = User.insertUser(user);

        return res.json({succes: true, result: insert});     
    };
});

module.exports = router;