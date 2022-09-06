const express = require('express');
const router = express.Router();
const userProvidedServicesController = require('../controllers/userProvidedServicesController')

router.get('/new', userProvidedServicesController.service_get);
router.post('/new', userProvidedServicesController.newRequest_get);

module.exports = router;