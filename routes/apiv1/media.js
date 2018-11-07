'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const Event = require('../../models/Event');
const Media = require('../../models/Media');

const mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Insert New Media
router.post('/',  (req,res,next) => {
    
    const name = req.query.name;
    if (name === "yes"){
        var media = new Media({
            name: 'Fiesta 01',
            description: 'Concierto 2009',
            url: 'https://ep01.epimg.net/cultura/imagenes/2016/12/01/actualidad/1480576411_932413_1480578681_noticia_normal.jpg',
            event: '5be2d7a4d901700df9a18874'
        });
        
        var insert = Media.insertMedia(media);
        var insertMedia = Event.insertMedia(insert.event,insert._id);
        
        return res.json({succes: true, result: insert});     
    };
});

module.exports = router;


