const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const requestSchema = new Schema({
    // requestId (MongoDB unique Id)
    serviceConsumerId: {
        type: String,
        required: [true, 'serviceConsumerId is required for the request']
    },
    serviceProviderId: {
        type: String,
        required: [true, 'serviceProviderId is required for the request']
    },
    serviceId: {
        type: String,
        required: [true, 'serviceId is required for the request']
    },
    effectiveDate: {
        type: Date,
        required: [true, 'effectiveDate is required for the request']
    },
    messages: [{
        userId: {
            type: String,
            required: [true, 'messages.userId is required for the request']
        },
        imageURL: {
            type: String
        },
        message: {
            type: String,
            required: [true, 'messages.message is required for the request']
        }
    }],
    effectiveAddress: {
        street: {
            type: String,
            required: [true, 'effectiveAddress.street is required for the request']
        },
        postalCode: {
            type: String,
            required: [true, 'effectiveAddress.postalCode is required for the request']
        },
        city: {
            type: String,
            required: [true, 'effectiveAddress.city is required for the request']
        },
        country: {
            type: String,
            required: [true, 'effectiveAddress.country is required for the request']
        }
    },
    status: {
        type: String,
        required: [true, 'status is required for the request'],
        lowercase: true,
        enum: {
            values: ['pending', 'approved', 'rejected', 'completed'],
            message: '{VALUE} is not a valid status for the request'
          } 
    }
}, { timestamps: true });

const Request = mongoose.model('request', requestSchema);
module.exports = Request;