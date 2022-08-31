

const mongoose = require('mongoose');
const User = require('../models/User');
const Service = require('../models/Service');
const Request = require('../models/Request');
const Country = require('../models/Country');
const fs = require('fs');
const path = require('path');

const dbURI = `mongodb+srv://khaleghzadegan:test1234@cluster0.mw5be3d.mongodb.net/testdb`;

const createUser = async () => {
    const testUser = {
        email: "onur1267@gmail.com",
        password: "Onur#123test@Masters5",
        name: "Onur",
        birthdate: new Date(1995, 09, 28),
        telephone: "+491796669608",
        imageURL: "",
        address: {
            street: "Berliner Platz 11, Berlin Nord",
            postalCode: "47258",
            city: "Berlin",
            country: "DE"
        },
        // providedServices: [],
        // consumedServices: []
    }

    try {
        const connection = await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log("database connection successful")
        const user = await User.create(testUser);
        console.log(user);
    } catch (err) {
        console.error(err);
    }
}


const createService = async () => {
    const testService = {
        serviceProviderId: "630f0ee5ea42864d94007a26",
        active: true,
        imagesList: [
            { imageURL: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" },
            { imageURL: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" },
            { imageURL: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" },
            { imageURL: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" }
        ],
        title: "Max Mustermann Transporter",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
        price: 13.99,
        currency: "EUR",
        priceCalculationType: "per_hour",
        address: {
            street: "Mountain View street",
            postalCode: "12333",
            city: "California",
            country: "US"
        },
        telephone: "+491798889601",
        reviewsList: [{
            userID: "630f12ec4c1c8d1a104d2650",
            score: 3.2,
            comment: "I am satisfied with this service. The only thing was that they were late a little."
        },
        {
            userID: "630f1350896185429c462ad9",
            score: 4.6,
            comment: "I am very very satisfied with this service, thank you Max Mustermann"
        }]
    }


    try {
        const connection = await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log("database connection successful")
        const service = await Service.create(testService);
        console.log(service);
    } catch (err) {
        console.error(err);
    }
}

const createRequest = async () => {
    const testService = {
        serviceConsumerId: "630f115c4ae58254201d07b4",
        serviceProviderId: "630f0ee5ea42864d94007a26",
        serviceId: "630f22c8e0e69a4db8250aca",
        effectiveDate: new Date(2022, 09, 01),
        messagesList: [{
            userId: "630f115c4ae58254201d07b4",
            message: "Hey, I need your service for transporting my stuff to a city nearby"
        },
        {
            userId: "630f0ee5ea42864d94007a26",
            message: "Hey Ali, that is not possible for the specified day, sorry. maybe you can make a new request with another date, thanks"
        }
        ],
        effectiveAddress: {
            street: "Berliner Platz",
            postalCode: "45369",
            city: "Essen",
            country: "DE"
        },
        status: "rejected"
    }

    try {
        const connection = await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log("database connection successful")
        const request = await Request.create(testService);
        console.log(request);
    } catch (err) {
        console.error(err);
    }
}


const insertCountries = () => {

    fs.readFile(path.join(__dirname, 'countries.json'),
        { encoding: 'utf-8' },
        async (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            try {
                const connection = await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
                console.log("database connection successful");

                JSON.parse(data).forEach(async (e) => {
                    const country = await Country.create(e);
                    console.log(`${country.name} inserted in database!`);
                });
            } catch (e) {
                console.error(e);
            }

        });
}

// createUser();
// createService();
// createRequest();
// insertCountries();