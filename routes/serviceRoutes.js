const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController')

router.get('/:serviceId', serviceController.service_get);
router.get('/:serviceId/request/new', serviceController.newRequest_get);
router.post('/:serviceId/request/new', serviceController.newRequest_post);

module.exports = router;