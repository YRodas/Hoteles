'use strict'

const userController = require('./user.controller');
const express = require('express');
const api = express.Router();
const { ensureAuth, isAdmin } = require('../services/authenticated');

//Rutas públicas
api.get('/get' , userController.get);
api.get('/get/:id',userController.getUser)
api.post('/register', userController.register);
api.post('/login', userController.login);
//Rutas privadas
api.put('/update/:id', ensureAuth, userController.update);
api.delete('/delete/:id', ensureAuth, userController.delete);
//Rutas privadas de administrador
api.post('/save', [ensureAuth, isAdmin ], userController.save);

module.exports = api;