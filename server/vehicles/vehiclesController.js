const Vehicle = require('./vehicleModel');

/********************************
  Instantiate vehicle and invoke methods to interact with GM API
  Response object is data from manufacturer API that has been normalized
  Send normalized data and appropriate response status code
  Catch and log errors
*********************************/

const getData = (req, res) => {
  let vehicle = Vehicle(req.params.id);
  vehicle.getData()
  .then(resp => {
    res.status(resp.status).send(resp.data);
  })
  .catch(err => {
    console.log('Error in GET request to /vehicles/:id', err);
    res.status(500).send({message:  "Sorry we are unable to hanlde your request at this moment. We're working hard to fix the issue"});
  })
}

const getSecurityData = (req, res) => {
  let vehicle = Vehicle(req.params.id);
  vehicle.getSecurityData()
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    console.log('Error in GET request to /vehicles/:id/security', err);
    res.status(500).send({message:  "Sorry we are unable to hanlde your request at this moment. We're working hard to fix the issue"});
  });
}

const getFuelData = (req, res) => {
  let vehicle = Vehicle(req.params.id);
  vehicle.getEnergyData('fuel')
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    console.log('Error in GET request to /vehicles/:id/fuel', err);
    res.status(500).send({message:  "Sorry we are unable to hanlde your request at this moment. We're working hard to fix the issue"});
  });
}

const getBatteryData = (req, res) => {
  let vehicle = Vehicle(req.params.id);
  vehicle.getEnergyData('battery')
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    console.log('Error in GET request to /vehicles/:id/battery', err);
    res.status(500).send({message:  "Sorry we are unable to hanlde your request at this moment. We're working hard to fix the issue"});
  });
}

const actionEngine = (req, res) => {
  console.log(req.body);
  let vehicle = Vehicle(req.params.id)
  vehicle.actionEngine(req.body.action)
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    console.log('Error in POST request to /vehicles/:id/engine', err);
    res.status(500).send({message:  "Sorry we are unable to hanlde your request at this moment. We're working hard to fix the issue"});
  });
}

module.exports = {
  getData: getData,
  getSecurityData: getSecurityData,
  getFuelData: getFuelData,
  getBatteryData: getBatteryData,
  actionEngine: actionEngine
}
