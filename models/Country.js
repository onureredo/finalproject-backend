const mongoose = require('mongoose');
const { Schema } = mongoose;
const validatorjs = require('validator');
const isCurrencyCode = require('currency-code-validator');

const countrySchema = new Schema({
    name: {
        type: String,
        required: [true, 'country name is required.'],
        unique: true
    },
    code: {
        type: String,
        required: [true, 'country code is required.'],
        unique: true,
        validate: [
            {
                validator: (value) => validatorjs.isISO31661Alpha2(value),
                message: 'country code is not valid.'
            }
        ]
    },
    currency: {
        name: {
            type: String,
            required: [true, 'currency name is required.']
        },
        code: {
            type: String,
            required: [true, 'currency code is required.'],
            validate: [
                {
                    validator: (value) => isCurrencyCode(value),
                    message: 'currency code is not valid.'
                }
            ]
        }
    }
});

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;