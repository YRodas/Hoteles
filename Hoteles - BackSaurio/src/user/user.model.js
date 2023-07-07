'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /\S+@\S+\.\S+/.test(value);
            },
            alert: 'El campo de email debe contener el carácter "@"'
        }
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        uppercase: true
    }
});

module.exports = mongoose.model('User', userSchema);