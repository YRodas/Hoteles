'use strict'

const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    checkInDate:{
        type: Date,
        required: true
    },
    checkOutDate:{
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bedroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bedroom',
        required:true
    }

    
})

module.exports = mongoose.model('Reservation', reservationSchema);

