'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const Event_type = require('../../models/Event_type');
const Event = require('../../models/Event');
const Favorite_search = require('../../models/Favorite_search');

const mongoose = require('mongoose');
var Schema = mongoose.Schema;



// Insert New event_type
router.post('/', (req,res,next) => {
    const name = req.query.name;
    if (name === "yes"){
        var event_type = new Event_type({
            name: 'Campeonato de atletismo pista cubierta',
        });
        
        Event_type.insertEvent_type(event_type, function(err, result){
            if (err) return result.status(400).json(err);
            // Event created
            return res.status(200).json({ ok: true, message: 'Event_type_registered', data: result });
        });   
    };
});

router.get('/', async (req, res, next) => {
    try{
    const nombre = req.query.inserta;
    if (nombre === "total"){  
        const list = await Event_type.list();
        res.json({ok: true, result: list});
    } else if(nombre === "id"){
        const list = await Event_type.list('5bdf2183792a22438c9abc77');
        res.json({ok: true, result: list});
   
    } else {
        res.send('Hello World 4events');
    }
} catch (err){
    next(err);
}
});



module.exports = router;