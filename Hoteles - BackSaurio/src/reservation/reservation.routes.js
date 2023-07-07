
'use strict'

const express = require('express');
const api = express.Router();
const reservationController = require('./reservation.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

api.get('/get', [ensureAuth], reservationController.get);
api.post('/getRes',ensureAuth,reservationController.getRes)
api.post('/create', [ensureAuth], reservationController.create);
api.put('/update/:id', [ensureAuth], reservationController.update);
api.delete('/delete/:id', [ensureAuth], reservationController.delete);


module.exports = api;