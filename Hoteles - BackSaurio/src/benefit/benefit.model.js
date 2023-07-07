'use strict'

const mongoose = require('mongoose');

const benefitSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number
    }
})

module.exports = mongoose.model('Benefit', benefitSchema);