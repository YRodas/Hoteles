'use strict'

const express = require('express');
const api = express.Router();
const bedroomController = require('./bedroom.controller');
const { ensureAuth, isAdmin, isManager } = require('../services/authenticated');

api.get('/', bedroomController.test);
api.get('/get', [ensureAuth], bedroomController.getBedrooms);
api.get('/get1/:id',[ensureAuth], bedroomController.getBedroom);
api.get('/get2/:id',[ensureAuth], bedroomController.getRoomByHotel );
api.post('/create', [ensureAuth, isManager], bedroomController.create);
api.put('/update/:id', [ensureAuth, isManager], bedroomController.updateBedroom);
api.delete('/delete/:id', [ensureAuth, isManager], bedroomController.deleteBedroom);


module.exports = api;