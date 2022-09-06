const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    const errorJSON = {};
    errorJSON["success"] = false;
    errorJSON["emailError"] = "";
    errorJSON["passwordError"] = "";
    errorJSON["nameError"] = "";
    errorJSON["birthdateError"] = "";
    errorJSON["telephoneError"] = "";
    errorJSON["streetError"] = "";
    errorJSON["postalCodeError"] = "";
    errorJSON["cityError"] = "";
    errorJSON["countryError"] = "";

    if ("code" in err) {
        if (err.code === 11000) {
            errorJSON["emailError"] = "email is already registered.";
        }
    } else {
        if ("email" in err.errors) {
            errorJSON["emailError"] = err.errors.email.message;
        }

        // if (err.errors?.password) {
        //     errorJSON["passwordError"] = err.errors.password.message;
        // }

        // if (err.errors?.name) {
        //     errorJSON["nameError"] = err.errors.name.message;
        // }

        // if (err.errors?.birthdate) {
        //     errorJSON["birthdateError"] = err.errors.birthdate.message;
        // }

        // if (err.errors?.telephone) {
        //     errorJSON["telephoneError"] = err.errors.telephone.message;
        // }

        // if (err.errors?.address.street) {
        //     errorJSON["streetError"] = err.errors["address.street"].message;
        // }

        // if (err.errors?.address.postalCode) {
        //     errorJSON["postalCodeError"] = err.errors["address.postalCode"].message;
        // }

        // if (err.errors?.address.city) {
        //     errorJSON["cityError"] = err.errors["address.city"].message;
        // }

        // if (err.errors["address.country"]) {
        //     errorJSON["countryError"] = err.errors["address.country"].message;
        // }

    }

    return errorJSON;
}

const createToken = (id) => {
    return jwt.sign({ id }, 'what', {
        expiresIn: 30 * 60
    })
}


module.exports.signup_get = (req, res) => {
    // TODO
}


module.exports.signup_post = async (req, res) => {
    const { email, password, name, birthdate, telephone, address } = req.body;

    try {
        const user = await User.create({ email, password, name, birthdate, telephone, address });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 30 * 60 * 1000 });
        res.status(201).json({ user: user._id});
    } catch (err) {
        console.log(err)
        const errors = handleErrors(err);
        res.status(400).send(errors);
    }
}


module.exports.login_get = (req, res) => {
    // TODO
}


module.exports.login_post = (req, res) => {
    try {
        const { email, password } = req.body;
        
    } catch (err) {
        res.status(400).send(errors);
    }
}


module.exports.logout_get = (req, res) => {
    // TODO
}