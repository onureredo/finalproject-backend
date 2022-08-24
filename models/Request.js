const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const requestSchema = new Schema({
    // requestId (MongoDB unique Id)
    serviceConsumerId: {
        type: Number
    },
    serviceProviderId: {
        type: Number
    },
    serviceId: {
        type: Number
    },
    effectiveDate: {
        type: Date
    },
    messages: [{
        userId: {
            type: Number
        },
        message: {
            type: String
        }
    }],
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
    status: {
        type: String
    }
}, { timestamps: true });

const Request = mongoose.model('request', requestSchema);
module.exports = Request;