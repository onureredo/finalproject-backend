const Service = require('../models/Service');
const Request = require('../models/Request');

module.exports.newService_post = async (req, res) => {
    const { title, description, price, currency, priceCalculationType, address, telephone, images } = req.body;
    try {

        const request = await Service.create({ title, description, price, currency, priceCalculationType, address, telephone, images });
        res.status(201).json(request)
    } catch (err) {
        console.log('Error creating request:' + err);
        res.status(400).send('Error creating request')
    }
}    