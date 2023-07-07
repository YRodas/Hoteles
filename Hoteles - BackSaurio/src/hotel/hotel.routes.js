'use strict'

const hotelController = require('./hotel.controller');
const express = require('express');
const api = express.Router();
const { ensureAuth, isManager, isAdmin } = require('../services/authenticated');

api.post('/add', ensureAuth, isAdmin, hotelController.addHotel);
api.put('/update/:id', ensureAuth, isAdmin, hotelController.updateHotel);
api.delete('/delete/:id', ensureAuth, isAdmin, hotelController.delete);
api.get('/hotels', hotelController.getHotels);
api.get('/hotel/:id', hotelController.getHotel);
api.post('/search-location', hotelController.searchForLocation);
api.post('/search-name', hotelController.searchForName);
api.post('/search-manager', hotelController.searchForManager);
api.post('/search-event', hotelController.searchForEvent);

module.exports = api;