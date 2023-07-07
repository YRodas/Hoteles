'use strict'

const express = require('express');
//Logs de las solicitudes que reciba el servidor
const morgan = require('morgan');
//Seguridad básica al servidor
const helmet = require('helmet');
//Aceptación de solicitudes desde otro origen o desde la misma máquina
const cors = require('cors');
//Instancia de express
const app = express();
const port = process.env.PORT || 3200;
const userRoutes = require('../src/user/user.routes');
const benefitRoutes = require('../src/benefit/benefit.routes')
const bedroomRoutes = require('../src/bedroom/bedroom.routes');
const billRoutes = require('../src/bill/bill.routes');
const eventRoutes = require('../src/event/event.routes');
const hotelRoutes = require('../src/hotel/hotel.routes');
const reservationRoutes = require('../src/reservation/reservation.routes');

//CONFIGURAR EL SERVIDOR HTTP DE EXPRESS
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//Rutas de cada colección
app.use('/user', userRoutes);
app.use('/bill', billRoutes);
app.use('/event', eventRoutes);
app.use('/benefit', benefitRoutes);
app.use('/hotel', hotelRoutes);
app.use('/bedroom', bedroomRoutes);
app.use('/reservation', reservationRoutes);

//FUNCIÓN PARA LEVANTAR EL SERVIDOR
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}