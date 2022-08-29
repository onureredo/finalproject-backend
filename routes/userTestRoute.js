const express = require('express');
const router = express.Router();
const cloudinary = require ('../utils/cloudinary')
const upload = require ('../utils/multer')
const Usertest = require('../models/Usertest')

router.post('/test', upload.array('images', 4) ,async (req, res, next) => {
    try {
        const uploadedPromise = await Promise.all(
            req.files.map(file => {
            return cloudinary.uploader.upload(file.path)
        }));
        const response = await 
            uploadedPromise.map(result => {
                return result.secure_url
            });
        let userTest = await Usertest.create({
            name: 'Anoj',
            images: response.map(url => {return {'imageURL':url}})
        })
        res.json(userTest)       
    } catch (error) {
        console.log('Error uploading image: ' + error)
    }
}); 


module.exports = router;