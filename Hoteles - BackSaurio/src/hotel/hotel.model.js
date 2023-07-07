'use strict'

const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    events:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }
})

module.exports = mongoose.model('Hotel', hotelSchema);