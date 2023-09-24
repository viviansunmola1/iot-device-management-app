const express = require('express');
const router = express.Router();
const industryController = require('../controllers/industryController'); 
const deviceController = require('../controllers/deviceController');  

// Define routes for IoT industries
router.get('/industries', industryController.getAllIndustries);
router.post('/industries', industryController.createIndustry);
router.put('/industries/:id', industryController.updateIndustry);
router.delete('/industries/:id', industryController.deleteIndustry);

// Define routes for IoT devices
router.get('/devices', deviceController.getAllDevices);
router.post('/devices', deviceController.createDevice);
router.put('/devices/:id', deviceController.updateDevice);
router.delete('/devices/:id', deviceController.deleteDevice);

module.exports = router;
