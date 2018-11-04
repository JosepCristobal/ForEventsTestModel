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
        try{
            var exists = await Event.existsId('5bdb5978e3acf52d7941250n');
        }catch(error){
            exists = 0;
            //throw Error("No Valido");
        }
        const list = await Event.list();
        res.json({succes: true, exists: exists, result: list});
    } else if(nombre === "distance"){
        const met = 1400 ;
        const lon =  1.995355 ;
        const lat = 41.789554 ;
        const list = await Event.nearMe(lon,lat,met);
        res.json({succes: true, result: list});
   
    } else {
       const filter = mainSearch(req)
       console.log(filter)
       const list = await Event.list(filter);
        res.json({succes: true, result: list});
        //res.send('Hello World 4events');
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


function mainSearch(req){

    const begin_date = req.query.begin_date;
    const end_date = req.query.end_date;
    const city = req.query.city;
    const zip_code = req.query.zip_code;
    const province = req.query.province;
    const country = req.query.country;
    const indoor = req.query.indoor;
    const free = req.query.free;
    const price = req.query.price;
    const min_age = req.query.min_age;
    const active_event = req.query.active_event;

    let filter = {};

    if (active_event == undefined || active_event === 'true'){
        const d = new Date();
        const n = d.toISOString();
        filter.end_date = {$gte: n};
    };
    if (begin_date){
        //format date YYYY-MM-DD
        const d = new Date(begin_date);
        const n = d.toISOString();
        filter.begin_date = {$gte: n};
    };
    if (end_date){
        //format date YYYY-MM-DD
        const d = new Date(begin_date);
        const n = d.toISOString();
        filter.end_date = {$lte: n};
    };
    if (city){
        
        //filter.city = { $regex: new RegExp(city, "ig") };
        filter.city = {$regex: new RegExp('^' + city.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$', 'i')};
    };
    console.log(filter)
    return filter;
    //const query = Event.find({end_date: {$gte: n}}).populate('organizer').populate('media');
}

module.exports = router;