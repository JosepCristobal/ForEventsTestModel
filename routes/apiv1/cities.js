'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const User = require('../../models/User');
const City = require('../../models/City');
const fs = require('fs');
const path = require('path'); 
const xlsxtojson = require("xlsx-to-json");
const fichCities = path.join('./', 'output.json');


//const xlstojson = require("xls-to-json");



const mongoose = require('mongoose');
var Schema = mongoose.Schema;


//List of cities
router.get('/', async (req, res, next) => {
    try{
    const nombre = req.query.inserta;
    if (nombre === "total"){  
            var list = await City.listCity('Ag');

        res.json({ok: true, result: list});
    } else if(nombre === "distance"){
        const met = 1400000;
        const lon =  1.995355 ;
        const lat = 41.789554 ;
        const list = await City.nearMe(lon,lat,met);
        res.json({ok: true, result: list});
   
    } else {
        res.send('Hello World 4events');
    }
} catch (err){
    next(err);
}
});


// Insert New City
/*router.post('/',  (req,res,next) => {
    
    const name = req.query.name;
    if (name === "yes"){
        var city = new City({
            city: 'Aguadulce',
            province: 'Sevilla',
            country: 'Spain',
            location: {
                type: 'Point',
                coordinates: [-4.9798836683, 37.2506939087951]
            }     
        });
        var insert = City.insertCity(city);

        return res.json({ok: true, result: insert});     
    } else if (name === "2"){
        try{
            var insertUser = City.insertUser("5bddcd17e78c170bbcc27344","5bddcd17e78c170bbcc27344");
            return res.json({ok: true, result: insert});
        }catch (err){
            return res.json({ok: false, result: "KO"});
        };
        
    };
});*/
router.post('/', async (req, res, next) => {
    
         xlsxtojson({
            input: "./jcm_cp.xlsx", 
            output: "output.json",
            lowerCaseHeaders:true
          },
          function(err, result){
              if(err){
                res.json(err)
              } else{
                  res.json(result)
              }
          }
          );

});
router.post('/insertCities', async (req, res, next) => {
    
    await fs.readFile(fichCities, {encoding: 'utf8'}, function(err, data) {
        if (err) {
            console.log(err);
            return (err);
        }
        try {
            data = JSON.parse(data);
            console.log("data ok");
        } catch (err) {
            console.log('data',err)
            return (err);
        }
        async.each(data.cities, (function(item) {
            var zipCode = item.zip_code
            if (!zipCode){
                zipCode = "00000"
            }
            var city = new City({
                _id: new mongoose.Types.ObjectId(),
                city: item.city,
                province: item.province,
                country: item.country,
                zip_code: zipCode,
                location: {
                    type: 'Point',
                    coordinates: [item.longitude, item.latitude]
                }     
            }).save(function(err, nuevoAnuncio) {
                if (err) {
                   console.log('Error al crear anuncio', err);
                   return (err);
               }
                console.log('Anuncio ' +  ' creado');
            });
        }));
        //Mongoose.close();
        return (null, 'altaAnuncios');          
    });

});
//"zip_code":"04567"},{"country":"España","province":"ALMERÍA","city":"ALHAMA DE ALMERIA","latitude":"36.95742","longitude":"-2.570075"


module.exports = router;


