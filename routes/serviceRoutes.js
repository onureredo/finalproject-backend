const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController')

router.get('/:serviceId', serviceController.service_get);


module.exports = router;