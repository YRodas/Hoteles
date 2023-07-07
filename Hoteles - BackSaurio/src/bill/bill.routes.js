'use strict'

const express = require('express');
const api = express.Router();
const billController = require('./bill.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');


api.get('/get', [ensureAuth], billController.get);
api.get('/get/:id', [ensureAuth], billController.getBillByUser);
api.post('/create', [ensureAuth], billController.createBill);
/* api.put('/update/:id', [ensureAuth, isAdmin], billController.update); */
api.delete('/delete/:id', ensureAuth, billController.delete);

module.exports = api;