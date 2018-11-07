'use strict';

const mongoose = require('mongoose');

function mainSearch(req){

    const begin_date = req.body.begin_date;
    const end_date = req.body.end_date;
    const adress = req.body.adress;
    const city = req.body.city;
    const province = req.body.province;
    const country = req.body.country;
    const indoor = req.body.indoor;
    const max_visitors = req.body.max_visitors;
    const free = req.body.free;
    const price = req.body.price;
    const min_age = req.body.min_age;
    const active_event = req.body.active_event;
    const description = req.body.description;
    const location = req.body.location;
    const organizer = req.body.organizer;



};