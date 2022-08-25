const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
require('../models/User')

const serviceSchema = new Schema({
    // serviceId (MongoDB unique Id)
    serviceProviderId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'serviceProviderId is required for the service']
    },
    active: {
        type: Boolean,
        required: [true, 'active flag is required for the service']
    },
    imagesList: [{
        imageURL: String
    }],
    title: {
        type: String,
        required: [true, 'title is required for the service'],
        minLength: 10,
        maxLength: 100
    },
    description: {
        type: String,
        maxLength: 1500
    },
    price: {
        type: Number,
        required: [true, 'price is required for the service'],
        min: 0
    },
    currency: {
        type: String,
        required: [true, 'currency is required for the service'],
    },
    priceCalculationType: {
        type: String,
        required: [true, 'priceCalculationType is required for the service'],
        lowercase: true,
        enum: {
            values: ['per_hour', 'per_squared_meter', 'fixed', 'negotiable'],
            message: '{VALUE} is not a valid priceCalculationType for the service'
        }
    },
    address: {
        street: {
            type: String,
            required: [true, 'address.street is required for the service']
        },
        postalCode: {
            type: String,
            required: [true, 'address.postalCode is required for the service']
        },
        city: {
            type: String,
            required: [true, 'address.city is required for the service']
        },
        country: {
            type: String,
            required: [true, 'address.country is required for the service']
        }
    },
    telephone: {
        type: String,
        required: [true, 'telephone is required for the service']
    },
    reviewsList: [{
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'reviews.userID is required for the service']
        },
        score: {
            type: Number,
            required: [true, 'reviews.score is required for the service'],
            min: 0,
            max: 5
        },
        comment: {
            type: String,
            maxLength: 1500
        }
    }]
}, { timestamps: true });

const Service = mongoose.model('service', serviceSchema);
module.exports = Service;