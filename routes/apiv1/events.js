'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const Event = require('../../models/Event');
const User = require('../../models/User');
const mongoose = require('mongoose');
const mainSearch = require('../../lib/searchEvents');
var Schema = mongoose.Schema;

//List all events
router.get('/', async (req, res, next) => {
    try{
    const typeQuery = req.query.typeQuery;
    if (typeQuery === "exists"){  
        try{
            const queryId = req.query.queryId;
            var exists = await Event.existsId(queryId);
            res.json({succes: true, result: exists});
        }catch(error){
            exists = 0;
            res.json({succes: true, result: exists});
        }
    } else {
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const sort = req.query.sort;
        const fields = req.query.fields;
        const organizer = req.query.organizer;
        const media = req.query.media;
        const user = req.query.user;
        const event_type = req.query.event_type;
        const transaction = req.query.transaction;
        const filter = mainSearch(req);
        const list = await Event.list(filter,limit, skip, sort, fields, organizer, media, user, event_type, transaction);
        const rowsCount = await Event.countTot(filter)
       
        if (req.query.includeTotal === 'true'){
        
        res.json({succes: true,total: rowsCount, result: list});

       }else{

        res.json({succes: true, result: list});

       };   
    }
    } catch (err){
        next(err);
    }
});

//Insert an Event
router.post('/', (req,res,next) => {
    //Create an Event in memory
    const nombre = req.query.inserta;
    if (nombre === "si"){
        var event = new Event({
            begin_date: '2018/10/30',
            end_date: '2018/10/30',
            adress: "Street la subida",
            city: "La Segura",
            province: "Toledo",
            country: "Spain",
            indoor: true,
            max_visitors: 10000,
            free: false,
            price: 20,
            min_age: 18,
            description: "CATA DE VINOS GRAN RESERVA",
            location: {type:'Point',
                        coordinates: [1.838657, 41.785054]},
            organizer: "5bdb5046280baa29fc4ab54d"
                    });
        var insert = Event.insertEvent(event);

        return res.json({succes: true, result: insert});     
    };
});


module.exports = router;