const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const userSchema = new Schema({
    // userId (MongoDB unique Id)
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        minlength: 8
    },
    name: {
        type: String
    },
    birthdate: {
        type: Date
    },
    telephone: {
        type: String
    },
    imageURL: {
        type: String
    },
    address: {
        street: {
            type: String
        },
        postalCode: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        }
    },
    providedServices: [{
        serviceId: {
            type: Number
        }
    }],
    consumedServices: [{
        serviceId: {
            type: Number
        }
    }]

}, { timestamps: true });

const User = mongoose.model('user', userSchema);
module.exports = User;