const mongoose = require('mongoose');
const { Schema } = mongoose;

const usertestSchema = new Schema({
    // userId (MongoDB unique Id)
    name: String,
    images: [
        {imageURL: String}
    ],
}, { timestamps: true });

const Usertest = mongoose.model('usertest', usertestSchema);
module.exports = Usertest;