const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
require("dotenv").config();

const app = express();


// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        app.listen(process.env.APP_PORT);
        console.log(`server started at port ${process.env.APP_PORT}`);
    })
    .catch((err) => console.error(err));

// routes
app.get("/", async (req, res) => { res.json("home page") });

app.use('/auth', require('./routes/authRoutes'));
app.use('/search', require('./routes/searchRoutes'));
app.use('/service', require('./routes/serviceRoutes'));
app.use('/user/:userId/profile', require('./routes/userProfileRoutes'));
app.use('/user/:userId/services/consumed', require('./routes/userConsumedServicesRoutes'));
app.use('/user/:userId/services/provided', require('./routes/userProvidedServicesRoutes'));



