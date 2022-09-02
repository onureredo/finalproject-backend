const mongoose = require('mongoose');
const { Schema } = mongoose;
const validatorjs = require('validator');
const idValidator = require('mongoose-id-validator');
const User = require('../models/User');
const Service = require('../models/Service');

const requestSchema = new Schema({
    // requestId (MongoDB unique Id)
    serviceConsumer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'service consumer is required.']
    },
    serviceProvider: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'service provider is required.']
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'service is required.']
    },
    effectiveDate: {
        type: Date,
        required: [true, 'effective date is required.'],
        validate: [
            {
                validator: (value) => value >= Date.now(),
                message: 'effectiveDate is not greater than today.'
            }
        ]
    },
    messagesList: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'user is required for the message.']
        },
        message: {
            type: String,
            required: [true, 'message content is required for the message.'],
            validate: [
                {
                    validator: (value) => validatorjs.isLength(value, { min: 1, max: 500 }),
                    message: 'message content is not between 1 and 500 characters.'
                }
            ]
        },
        creationDate: {
            type: Date,
            default: Date.now
        }
    }],
    effectiveAddress: {
        street: {
            type: String,
            required: [true, 'street is required.'],
            validate: [
                {
                    validator: (value) => validatorjs.isLength(value, { min: 5, max: 150 }),
                    message: 'street is not between 5 and 150 characters.'
                }
            ]
        },
        postalCode: {
            type: String,
            required: [true, 'postal code is required.'],
            validate: [
                {
                    validator: (value) => validatorjs.isPostalCode(value, 'any'),
                    message: 'postal code is not valid.'
                }
            ]
        },
        city: {
            type: String,
            required: [true, 'city is required.'],
            validate: [
                {
                    validator: (value) => validatorjs.isLength(value, { min: 2, max: 50 }),
                    message: 'city is not between 2 and 50 characters.'
                }
            ]
        },
        country: {
            type: String,
            required: [true, 'country is required.'],
            validate: [
                {
                    validator: (value) => validatorjs.isISO31661Alpha2(value),
                    message: 'country is not valid.'
                }
            ]
        }
    },
    status: {
        type: String,
        required: [true, 'status is required.'],
        lowercase: true,
        enum: {
            values: ['pending', 'approved', 'in_progress', 'rejected', 'completed'],
            message: '{VALUE} is not a valid status.'
        }
    }
}, { timestamps: true });

requestSchema.plugin(idValidator);
const Request = mongoose.model('Request', requestSchema);
module.exports = Request;