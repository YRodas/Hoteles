'use strict'

const express = require('express');
const api = express.Router();
const eventController = require('./event.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

//api.get('/', eventController.test)
api.get('/get', [ensureAuth, isAdmin], eventController.get);
api.post('/create', [ensureAuth, isAdmin], eventController.create);
api.put('/update/:id', [ensureAuth, isAdmin], eventController.update);
api.delete('/delete/:id', [ensureAuth, isAdmin], eventController.delete);


module.exports = api;