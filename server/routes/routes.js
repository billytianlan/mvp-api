const router = require('express').Router();
const rp = require('request-promise');
const _ = require('underscore')
const vehicles = require('../vehicles/index');


//Get Vehicle Data
router.get('/vehicles/:id', vehicles.getVehicleData)

router.get('/vehicles/:id/doors', (req, res) => {

  let vehicleId = req.params.id;
  let options = configurePostOptions(vehicleId);

  rp(`${process.env.TEST_API}/getSecurityStatusService`, options)
  .then((response) => {
    response.status === '200' ? 
      res.send(normalizeSecurityData(response.data)) :
      res.status(response.status).send(response);
  })
  .catch(err => {
    throw err;
  });

});

router.get('/vehicles/:id/fuel', (req, res) => {
  let vehicleId = req.params.id;
  let options = configurePostOptions(vehicleId);

  rp(`${process.env.TEST_API}/getEnergyService`, options)
  .then((response) => {
    console.log(response);
    response.status === '200' ?
      res.send(normalizeFuelData(response.data)) :
      res.status(response.status).send(response);
  })
})

let normalizeSecurityData = (data) => {
  return _.map(data.doors.values, (door) => {
    return {
      "location": door.location.value,
      "locked": door.locked.value === "True" ? true : false
    }
  })
}

let normalizeVehicleData = (data) => {
  let doorCount = getDoorCount(data);
  let result = {
    vin: data.vin.value,
    color: data.color.value,
    doorCount: doorCount,
    driveTrain: data.driveTrain.value
  }
  return result;
}

let normalizeFuelData = (data) => {
  return {
    percent: data.tankLevel.value === 'null' ? null : Number(data.tankLevel.value)
  }
}

let getDoorCount = (data) => {
  return data.fourDoorSedan.value === 'True' ? 4 : 2;
}

let configurePostOptions = (vehicleId) => {
  return {
    method: "POST",
    json: true,
    body: {
      id: vehicleId,
      responseType: "JSON"
    },
    headers: {
      'content-type': 'application/json'
    }
  }
}

module.exports = router;
