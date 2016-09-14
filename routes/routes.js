const router = require('express').Router();
const rp = require('request-promise');


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
    res.send(normalizeVehicleInfo(response.data));
  })
});

let normalizeVehicleInfo = (data) => {
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
  console.log(data);
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
