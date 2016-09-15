const router = require('express').Router();
const vehicle = require('../vehicles/vehiclesController');


/*************** VEHICLE ROUTES ***************/
//Get Vehicle Data
router.get('/vehicles/:id', vehicle.getData);
//Get Security Data
router.get('/vehicles/:id/doors', vehicle.getSecurityData);
//Get Fuel Data
router.get('/vehicles/:id/fuel', vehicle.getFuelData);
//Get Battery Data
router.get('/vehicles/:id/battery', vehicle.getBatteryData);
//Post Start/Stop Engine
router.post('/vehicles/:id/engine', vehicle.actionEngine);


module.exports = router;
