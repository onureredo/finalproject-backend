const mongoose = require('mongoose');
const { Schema } = mongoose;
const validatorjs = require('validator');
const idValidator = require('mongoose-id-validator');
const isCurrencyCode = require('currency-code-validator');
const User = require('../models/User');

const serviceSchema = new Schema({
    // serviceId (MongoDB unique Id)
    serviceProvider: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'service provider is required.']
    },
    active: {
        type: Boolean,
        default: true,
        required: [true, 'active flag is required.']
    },
    imagesList: [{
        imageURL: {
            type: String,
            required: false,
            default: "",
            validate: [
                {
                    validator: (value) => value === "" || validatorjs.isURL(value),
                    message: 'image URL is not valid.'
                }
            ]
        }
    }],
    title: {
        type: String,
        required: [true, 'title is required.'],
        validate: [
            {
                validator: (value) => validatorjs.isLength(value, { min: 10, max: 200 }),
                message: 'title is not between 10 and 200 characters.'
            }
        ]
    },
    description: {
        type: String,
        required: [true, 'description is required.'],
        validate: [
            {
                validator: (value) => validatorjs.isLength(value, { min: 50, max: 5000 }),
                message: 'description is not between 50 and 5000 characters.'
            }
        ]
    },
    price: {
        type: Number,
        required: [true, 'price is required.'],
        validate: [
            {
                validator: (value) => value >= 0,
                message: 'price is not greater than zero.'
            }
        ]
    },
    currency: {
        type: String,
        required: [true, 'currency is required.'],
        validate: [
            {
                validator: (value) => isCurrencyCode(value),
                message: 'currency is not valid.'
            }
        ]
    },
    priceCalculationType: {
        type: String,
        required: [true, 'price calculation type is required.'],
        lowercase: true,
        enum: {
            values: ['per_hour', 'per_squared_meter', 'fixed', 'negotiable'],
            message: '{VALUE} is not a valid price calculation type.'
        }
    },
    address: {
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
    telephone: {
        type: String,
        required: [true, 'telephone is required.'],
        validate: [
            {
                validator: (value) => validatorjs.isMobilePhone(value, 'any'),
                message: 'telephone is not valid.'
            }
        ]
    },
    overallScore: {
        type: Number,
        default: 0
    },
    reviewsList: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'user is required for the review.']
        },
        score: {
            type: Number,
            required: [true, 'score is required for the review.'],
            validate: [
                {
                    validator: (value) => value >= 0 && value <= 5,
                    message: 'score is not between 0 and 5.'
                }
            ]
        },
        comment: {
            type: String,
            required: false,
            validate: [
                {
                    validator: (value) => validatorjs.isLength(value, { min: 0, max: 1500 }),
                    message: 'comment is not less than 1500 characters.'
                }
            ]
        }
    }]
}, { timestamps: true });

const getoverallScore = (reviewsList = []) => {
    const scoresList = reviewsList.map(e => e.score);
    const overallScoreSum = scoresList.length !== 0 ?
        scoresList.reduce((p, v) => p + v) : 0;
    return overallScoreSum / reviewsList.length;
}

serviceSchema.pre('save', async function (next) {
    this.overallScore = getoverallScore(this.reviewsList);
    next();
});

serviceSchema.post('updateOne', async function (next) {
    this.overallScore = getoverallScore(this.reviewsList);
    next();
});

serviceSchema.plugin(idValidator);
const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;