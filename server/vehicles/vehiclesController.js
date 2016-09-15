const rp = require('request-promise');
const _ = require('underscore');
const gm = require('../manufacturers/gmApi');
const Vehicle = require('./vehicleModel');

const getData = (req, res) => {
  let vehicle = Vehicle(req.params.id);
  vehicle.getData()
  .then(resp => {
    res.status(resp.status).send(resp.data);
  })
  .catch(err => {
    console.log('Error retreiving info from GM API getVehicleInfoService:', err);
    res.status(502).send({reason: 'Error retreiving data from GM API'});
  })
}

const getSecurityData = (req, res) => {
  let vehicle = Vehicle(req.params.id);
  vehicle.getSecurityData()
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    console.log('Error retreiving info from GM API getSecurityStatusService:', err);
    res.status(502).send({reason: 'Error retreiving data from GM API'});
  });
}

const getFuelData = (req, res) => {
  let vehicle = Vehicle(req.params.id);
  vehicle.getFuelData()
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    console.log('Error retreiving info from GM API getEnergyService:', err);
    res.status(502).send({
      status: 502,
      reason: 'Error retreiving data from GM API'
    })
  });
}

module.exports = {
  getData: getData,
  getSecurityData: getSecurityData,
  getFuelData: getFuelData
}