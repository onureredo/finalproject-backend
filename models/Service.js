const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const serviceSchema = new Schema({
    // serviceId (MongoDB unique Id)
    serviceProviderId: {
        type: Number
    },
    active: {
        type: Boolean
    },
    images: [{
        imageURL: String
    }],
    title: {
        type: String,
        maxLength: 50
    },
    description: {
        type: String,
        maxLength: 1500
    },
    price: {
        type: Number
    },
    currency: {
        type: String
    },
    priceCalculationType: {
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
    telephone: {
        type: String
    },
    reviews: [{
        userID: {
            type: Number
        },
        userName: {
            type: String
        },
        imageUrl: {
            type: String
        },
        score: {
            type: Number
        },
        comment: {
            type: String,
            maxLength: 500
        }
    }]
}, { timestamps: true });

const Service = mongoose.model('service', serviceSchema);
module.exports = Service;