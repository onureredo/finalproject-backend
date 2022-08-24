module.exports.service_get = (req, res) => {
    let serviceId = req.params.serviceId;
    res.send(serviceId)
}