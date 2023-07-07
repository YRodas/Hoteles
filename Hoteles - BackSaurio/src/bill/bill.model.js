'use strict'

const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    total:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Bill', billSchema);