const Service = require('../models/Service');
const Request = require('../models/Request');
const cloudinary = require ('../utils/cloudinary')

module.exports.newService_post = async (req, res) => {
    const { title, description, price, currency, priceCalculationType, address, telephone, images } = req.body;
    try {
        const uploadedPromise = await Promise.all(
            images.map(image => {
            return cloudinary.uploader.upload(image, {folder: 'Services images'})
        }));
        const response = await uploadedPromise.map(result => {
                return result.secure_url
            });
        const request = await Service.create({ title, description, price, currency, priceCalculationType, address, telephone, imagesList: response.map(url => {return {'imageURL':url}}) });
        res.status(201).json(request)
    } catch (err) {
        console.log('Error creating request:' + err);
        res.status(400).send('Error creating request')
    }
}    