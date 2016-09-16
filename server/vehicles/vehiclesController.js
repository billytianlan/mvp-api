const vehicle = require('./vehicleModel');

/********************************
  Instantiate vehicle and invoke methods to interact with GM API
  Response object is data from manufacturer API that has been normalized
  Send normalized data and appropriate response status code
  Catch and log errors
*********************************/

const getData = (req, res) => {
  vehicle.getData(req.params.id)
  .then(resp => {
    res.status(resp.status).send(resp.data);
  })
  .catch(err => {
    console.log('Error in GET request to /vehicles/:id', err);
    res.status(500).send({message:  "Sorry we are unable to handle your request at this moment. We're working hard to fix the issue"});
  });
}

const getSecurityData = (req, res) => {
  vehicle.getSecurityData(req.params.id)
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    console.log('Error in GET request to /vehicles/:id/security', err);
    res.status(500).send({message:  "Sorry we are unable to handle your request at this moment. We're working hard to fix the issue"});
  });
}

const getFuelData = (req, res) => {
  vehicle.getEnergyData(req.params.id, 'fuel')
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    console.log('Error in GET request to /vehicles/:id/fuel', err);
    res.status(500).send({message:  "Sorry we are unable to handle your request at this moment. We're working hard to fix the issue"});
  });
}

const getBatteryData = (req, res) => {
  vehicle.getEnergyData(req.params.id, 'battery')
  .then(resp => {
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    console.log('Error in GET request to /vehicles/:id/battery', err);
    res.status(500).send({message:  "Sorry we are unable to handle your request at this moment. We're working hard to fix the issue"});
  });
}

const actionEngine = (req, res) => {
  let action = req.body.action;
  if (action && typeof action === 'string' && (action.toUpperCase() === 'START' || action.toUpperCase() === 'STOP')) {
    vehicle.actionEngine(req.params.id, action)
    .then(resp => {
      res.status(resp.status).send(resp.data)
    })
    .catch(err => {
      console.log('Error in POST request to /vehicles/:id/engine', err);
      res.status(500).send({message:  "Sorry we are unable to handle your request at this moment. We're working hard to fix the issue"});
    });
  } else {
    res.status(400).send({message: 'Please provide action parameter START or STOP'})
  }
}

module.exports = {
  getData: getData,
  getSecurityData: getSecurityData,
  getFuelData: getFuelData,
  getBatteryData: getBatteryData,
  actionEngine: actionEngine
}
