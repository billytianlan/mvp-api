const router = require('express').Router();
const rp = require('request-promise');
const _ = require('underscore')


//Get Vehicle Data
router.get('/vehicles/:id', (req, res) => {
  
  //Function that checks make of vehicle
  //Makes request to appropriate vehicle manufacturer API 

  let data = {
    id: req.params.id,
    responseType: 'JSON'
  }

  let options = configurePostOptions(data);

  rp(`${process.env.TEST_API}/getVehicleInfoService`, options)
  .then((response) => {
    res.send(normalizeVehicleData(response.data));
  })
  .catch(err => {
    throw err;
  });
});

router.get('/vehicles/:id/doors', (req, res) => {

  let data = {
    id: req.params.id,
    responseType: 'JSON'
  }

  let options = configurePostOptions(data);

  rp(`${process.env.TEST_API}/getSecurityStatusService`, options)
  .then((response) => {
    res.send(normalizeSecurityData(response.data));
  })
  .catch(err => {
    throw err;
  });

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

let getDoorCount = (data) => {
  return data.fourDoorSedan.value === 'True' ? 4 : 2;
}

let configurePostOptions = (data) => {
  return {
    method: "POST",
    json: true,
    body: data,
    headers: {
      'content-type': 'application/json'
    }
  }
}

module.exports = router;
