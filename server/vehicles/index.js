const rp = require('request-promise');
const _ = require('underscore')

const getData = (req, res) => {
  console.log('in the data');
  //Function that checks make of vehicle
  //Makes request to appropriate vehicle manufacturer API 
  let vehicleId = req.params.id;
  let options = configurePostOptions(vehicleId);

    rp(`${process.env.TEST_API}/getVehicleInfoService`, options)
    .then((response) => {
      response.status === '200' ? 
        res.send(normalizeVehicleData(response.data)) :
        res.status(response.status).send(response);
    })
    .catch(err => {
      throw err;
    });
  };

  let normalizeSecurityData = (data) => {
  return _.map(data.doors.values, (door) => {
    return {
      "location": door.location.value,
      "locked": door.locked.value === "True" ? true : false
    }
  })
}

const getSecurityData = (req, res) => {

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

}

const getFuelData = (req, res) => {
  let vehicleId = req.params.id;
  let options = configurePostOptions(vehicleId);

  rp(`${process.env.TEST_API}/getEnergyService`, options)
  .then((response) => {
    console.log(response);
    response.status === '200' ?
      res.send(normalizeFuelData(response.data)) :
      res.status(response.status).send(response);
  });
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

module.exports = {
  getData: getData,
  getSecurityData: getSecurityData,
  getFuelData: getFuelData
}