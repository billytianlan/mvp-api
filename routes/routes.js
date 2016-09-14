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
  let options = {
    method: "POST",
    json: true,
    body: data,
    headers: {
      'content-type': 'application/json'
    }
  }
  rp(`${process.env.TEST_API}/getVehicleInfoService`, options)
  .then((response) => {
    res.send(normalizeVehicleInfo(response.data));
  })
});


module.exports = router;
