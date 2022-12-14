const Service = require('../models/Service');
const Request = require('../models/Request');

module.exports.allservice_get = (req, res) => {
    Service.find()
    .then((result) => res.send(result))
    .catch((err) => console.log('Error fetching all services: ' + err))
}

module.exports.service_get = (req, res) => {
    let serviceId = req.params.serviceId;
    Service.find({_id: serviceId})
    // Service.find({_id: serviceId}).populate({path: 'reviewsList.user', model: 'User', select: 'name email'})
    .then((result) => res.send(result))
    .catch((err) => console.log('Error fetching service: ' + err))
}

module.exports.newRequest_get = (req, res) => {
    let serviceId = req.params.serviceId;
    Service.find({ _id: serviceId }).select('title price currency priceCalculationType')
        .then((result) => res.send(result))
        .catch((err) => console.log('Error fetching service: ' + err))
}

module.exports.newRequest_post = async (req, res) => {
    const { serviceConsumerId, serviceProviderId, serviceId, effectiveDate, effectiveAddress, status } = req.body;
    try {
        const request = await Request.create({ serviceConsumerId, serviceProviderId, serviceId, effectiveDate, effectiveAddress, status });
        res.status(201).json(request)
    } catch (err) {
        console.log('Error creating request:' + err);
        res.status(400).send('Error creating request')
    }
}    