const mongoose = require('mongoose');
const { Schema } = mongoose;
const validatorjs = require('validator');
const idValidator = require('mongoose-id-validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    // userId (MongoDB unique Id)
    email: {
        type: String,
        required: [true, 'email is required.'],
        unique: true,
        index: true,
        lowercase: true,
        validate: [
            {
                validator: (value) => validatorjs.isEmail(value),
                message: 'email is not valid.'
            }
        ]
    },
    password: {
        type: String,
        required: [true, 'password is required.'],
        validate: [
            {
                validator: (value) => validatorjs.isLength(value, { min: 8, max: 50 }),
                message: 'password is not between 8 and 50 characters.'
            },
            // {
            //     validator: (value) => validatorjs.isStrongPassword(value),
            //     message: 'password is not strong.'
            // }
        ]
    },
    name: {
        type: String,
        required: [true, 'name is required.'],
        validate: [
            {
                validator: (value) => validatorjs.isLength(value, { min: 3, max: 100 }),
                message: 'name is not between 3 and 100 characters.'
            }
        ]
    },
    birthdate: {
        type: Date,
        required: [true, 'birthdate is required.'],
        validate: [
            {
                validator: (value) => value < Date.now(),
                message: 'birthdate is not less than today.'
            }
        ]
    },
    telephone: {
        type: String,
        required: [true, 'telephone is required.'],
        // validate: [
        //     {
        //         validator: (value) => validatorjs.isMobilePhone(value, 'any'),
        //         message: 'telephone is not valid.'
        //     }
        // ]
    },
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
    },
    address: {
        street: {
            type: String,
            // required: [true, 'street is required.'],
            // validate: [
            //     {
            //         validator: (value) => validatorjs.isLength(value, { min: 5, max: 150 }),
            //         message: 'street is not between 5 and 150 characters.'
            //     }
            // ]
        },
        postalCode: {
            type: String,
            // required: [true, 'postal code is required.'],
            // validate: [
            //     {
            //         validator: (value) => validatorjs.isPostalCode(value, 'any'),
            //         message: 'postal code is not valid.'
            //     }
            // ]
        },
        city: {
            type: String,
            // required: [true, 'city is required.'],
            // validate: [
            //     {
            //         validator: (value) => validatorjs.isLength(value, { min: 2, max: 50 }),
            //         message: 'city is not between 2 and 50 characters.'
            //     }
            // ]
        },
        country: {
            type: String,
            // required: [true, 'country is required.'],
            // validate: [
            //     {
            //         validator: (value) => validatorjs.isISO31661Alpha2(value),
            //         message: 'country is not valid.'
            //     }
            // ]
        }
    },
    providedServices: [{
        type: Schema.Types.ObjectId,
        ref: 'Service',
        // required: true,
    }],
    consumedServices: [{
        type: Schema.Types.ObjectId,
        ref: 'Service',
        // required: true,
    }]

}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email: email})
    if(user) {
        const auth = await bcrypt.compare(password, user.password)
        if(auth) {
            return user
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
}

userSchema.plugin(idValidator);
const User = mongoose.model('User', userSchema);
module.exports = User;