const mongoose = require('mongoose');
const validator = require('validator');

const serviceSchema = new mongoose.Schema({
    serviceProviderId: {
        // How to store the service providerId from user database
    },
    images: {
        imageId: Number,
        imageUrl: String
    },
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
            require:true
        },
        postalCode:{
            type: String,
            require:true
        },
        city:{
            type: String,
            require:true
        },
        country:{
            type: String,
            require:true
        }
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    reviews: {
        // userId : How to store the user Id from user database
        userName: String,
        score: Number,
        comment: String
    },
    creationDate: {
        type: Number,
        required: true,
    },
})