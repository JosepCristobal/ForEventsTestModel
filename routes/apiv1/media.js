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
            name: 'Fiesta 19',
            description: 'Concierto 2019',
            url: 'https://ep01.epimg.net/cultura/imagenes/2016/12/01/actualidad/1480576411_932413_1480578681_noticia_normal.jpg',
            event: '5bdb5978e3acf52d7941259c',
            media_type: "picture",
            poster: true
        });
        
        Media.insertMedia(media, function (err, resultType){
            if (err){ return res.status(400).json({ok: false, result: err})}
            Event.insertMedia(resultType.event,resultType._id, function (err, resultMedia){
                if (err) return res.status(400).json({ok: false, result: err}); 
            });
            return res.json({ok: true, result: resultType}); 
        });       
    };
});

module.exports = router;


