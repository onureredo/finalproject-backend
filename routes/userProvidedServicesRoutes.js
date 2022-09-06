const express = require('express');
const router = express.Router();
const userProvidedServicesController = require('../controllers/userProvidedServicesController')

// router.get('/new', userProvidedServicesController.service_get);
router.post('/new', userProvidedServicesController.newService_post);

module.exports = router;