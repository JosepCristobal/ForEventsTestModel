'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const Event = require('../../models/Event');
const User = require('../../models/User');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//List all events
router.get('/', async (req, res, next) => {
    try{
    const nombre = req.query.inserta;
    if (nombre === "total"){
        const list = await Event.list();
        res.json({succes: true, result: list});
    
    } else if(nombre === "distance"){
       
        const met = 14000 ;
        const lon =  1.995355 ;
        const lat = 41.789554 ;
        const list = await Event.nearMe(lon,lat,met);
        res.json({succes: true, result: list});
   
    } else {
        res.send('Hello World 4events');
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
            zip_code: "28034",
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