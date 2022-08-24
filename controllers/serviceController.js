const Service = require('../models/Service')

module.exports.service_get = (req, res) => {
    let serviceId = req.params.serviceId;
    Service.find({_id: serviceId})
    .then((result) => res.send(result))
    .catch((err) => console.log('Error fetchin service: ' + err))
}

module.exports.newRequest_get = (req, res) => {
    let serviceId = req.params.serviceId;
    res.send(serviceId + 'new')
}

module.exports.newRequest_post = (req, res) => {
    let serviceId = req.params.serviceId;
    res.send(serviceId + 'post')
}