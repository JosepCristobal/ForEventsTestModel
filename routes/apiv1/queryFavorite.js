'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const Event = require('../../models/Event');
const User = require('../../models/User');
const mongoose = require('mongoose');
const mainSearchFavorite = require('../../lib/searchFavorite');
const Favorite_search = require('../../models/Favorite_search');

var Schema = mongoose.Schema; 
var totEvents = 0;
var usersResult = [];

router.get('/', async (req, res, next) => {
    usersResult = [];
    const newEvent = req.query.newEvent;
    const userId = req.query.userId;
    totEvents = 0

    User.find().cursor().eachAsync( async function(user){    
        const favorites = user.favorite_searches;
        var totEvents = 0
        if (favorites.length >0){
             await favorites.forEach( async function (filterResult){
                var filterquery = {};
                filterquery._id = filterResult;
                
                 await Favorite_search.findOne(filterquery, async function(err, resultFilter){
                   
                    if (err) return res.status(400).json({ok: true, result: err});
                    //Begin search in the Favorite_search with query stored
                    const var1 = JSON.parse(resultFilter.query);
                    const filter3 = mainSearchFavorite(var1);
                    filter3._id = newEvent

                    try{   
                        const resultEvent =  await Event.count(filter3).exec();
                            totEvents += resultEvent;
                            usersResult.push(resultEvent);
                           
                    }catch(err) {
                        console.log('error: ' + err);
                    }
        
                });

            });
                //await new Promise(resolve => setTimeout(resolve, 100));
                console.log('total de eventos con retardo: ' + totEvents + ' del usuario ' + user._id);
        }
        
    });
    
    //await new Promise(resolve => setTimeout(resolve, 1000));
    res.status(200).json({ok: true, result: usersResult});
    

});

module.exports = router;
