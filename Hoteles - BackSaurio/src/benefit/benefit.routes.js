'use strict'

const express = require('express');
const api = express.Router();
const benefitController = require('./benefit.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

api.get('/', benefitController.test)
api.get('/get', [ensureAuth], benefitController.get);
api.get('/get/:id', [ensureAuth], benefitController.getBenefit);
api.post('/create', [ensureAuth, isAdmin], benefitController.create);
api.put('/update/:id', [ensureAuth, isAdmin], benefitController.update);
api.delete('/delete/:id', [ensureAuth, isAdmin], benefitController.delete);

module.exports = api;