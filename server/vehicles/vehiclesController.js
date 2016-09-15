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
    res.status(502).send({message: 'Error retreiving data from GM API'});
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
    res.status(502).send({message: 'Error retreiving data from GM API'});
  });
}

const getFuelData = (req, res) => {
  let vehicle = Vehicle(req.params.id);
  vehicle.getEnergyData('fuel')
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    console.log('Error retreiving info from GM API getEnergyService:', err);
    res.status(502).send({message: 'Error retreiving data from GM API'})
  });
}

const getBatteryData = (req, res) => {
  let vehicle = Vehicle(req.params.id);
  vehicle.getEnergyData('battery')
  .then(resp => {
    console.log('battery resp', resp);
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    console.log('Error retreiving info from GM API getEnergyService:', err);
    res.status(502).send({message: 'Error retreiving data from GM API'})
  });
}

const actionEngine = (req, res) => {
  let vehicle = Vehicle(req.params.id)
  vehicle.actionEngine(req.body.action)
  .then(resp => {
    console.log(resp);
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    console.log('Error sending data to GM API actionEngineService:', err);
    res.status(502).send({message: 'Error retreiving data from GM API'})
  });
}

module.exports = {
  getData: getData,
  getSecurityData: getSecurityData,
  getFuelData: getFuelData,
  getBatteryData: getBatteryData,
  actionEngine: actionEngine
}
