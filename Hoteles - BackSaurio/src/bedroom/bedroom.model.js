'use strict'

const mongoose = require('mongoose');

const bedroomSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    availability:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },    
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
})

module.exports = mongoose.model('Bedroom', bedroomSchema);