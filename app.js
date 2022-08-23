const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const app = express();


// middleware
app.use(express.json()); 
// app.use(cookieParser());

// database connection
const dbURI = 'mongodb+srv://admin:MasterAli!@final-project.8ubosbv.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result) => app.listen(port, () => console.log('Connected to DB')))
.catch((err) => console.log('DB connection error: ' + err))


// routes


