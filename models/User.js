const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const userSchema = new Schema({
    // userId (MongoDB unique Id)
    email: {
        type: String,
        required: [true, 'email is required for the user'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'this is not a valid email']
    },
    password: {
        type: String,
        required: [true, 'password is required for the user'],
        minlength: [8, 'Minimum password length is 8 characters']
    },
    name: {
        type: String,
        required: [true, 'name is required for the user'],
        maxlength: [100, 'Maximum length for the name is 100 characters']
    },
    birthdate: {
        type: Date,
        required: [true, 'birthdate is required for the user'],
    },
    telephone: {
        type: String,
        required: [true, 'telephone is required for the user'],
    },
    imageURL: {
        type: String
    },
    address: {
        street: {
            type: String,
            required: [true, 'address.street is required for the user']
        },
        postalCode: {
            type: String,
            required: [true, 'address.postalCode is required for the user']
        },
        city: {
            type: String,
            required: [true, 'address.city is required for the user']
        },
        country: {
            type: String,
            required: [true, 'address.country is required for the user']
        }
    },
    providedServices: [{
        serviceId: {
            type: Schema.Types.ObjectId,
            ref: 'service'
        }
    }],
    consumedServices: [{
        serviceId: {
            type: Schema.Types.ObjectId,
            ref: 'service'
        }
    }]

}, { timestamps: true });

const User = mongoose.model('user', userSchema);
module.exports = User;