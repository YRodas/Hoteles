'use strict'

require('dotenv').config();
const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');
const userCotroller = require('./src/user/user.controller');
const eventController = require('./src/event/event.controller');
const benefitController = require('./src/benefit/benefit.controller')

mongoConfig.connect();
app.initServer();
userCotroller.defaultUser();
eventController.defaultEvent();
benefitController.defaultBenefits()