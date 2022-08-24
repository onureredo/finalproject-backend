const mongoose = require('mongoose');
const validator = require('validator');

const serviceSchema = new mongoose.Schema({
    serviceProviderId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'user'
    },
    images: [{
        imageUrl: String
    }],
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: Number,
        required: true,
    },
    priceCalculationType: {
        type: String,
        required: true,
    },
    address: {
        street:{
            type: String,
            required:true
        },
        postalCode:{
            type: String,
            required:true
        },
        city:{
            type: String,
            required:true
        },
        country:{
            type: String,
            required:true
        }
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    reviews: [{
        userID: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'user'
        },
        score: {
            type: Number,
            required: true
        },
        comment: String
    }],
    creationDate: {
        type: Number,
        required: true,
    },
})

const Service = mongoose.model('service', serviceSchema);

module.exports = Service;