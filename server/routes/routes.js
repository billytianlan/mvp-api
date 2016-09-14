const router = require('express').Router();
const vehicle = require('../vehicles/index');


/*************** VEHICLE ROUTES ***************/
//Get Vehicle Data
router.get('/vehicles/:id', vehicle.getData)
//Get Security Data
router.get('/vehicles/:id/doors', vehicle.getSecurityData)
//Get Fuel Data
router.get('/vehicles/:id/fuel', vehicle.getFuelData)


module.exports = router;
