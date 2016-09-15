const Vehicle = require('./vehicleModel');

const getData = (req, res) => {
  //Instantiate vehicle and invoke getData function
  //Response object is data from manufacturer API that has been normalized
  let vehicle = Vehicle(req.params.id);
  vehicle.getData()
  .then(resp => {
    //Respond with normalized status and data
    res.status(resp.status).send(resp.data);
  })
  .catch(err => {
    //Log error and respond with 502 "Received invalid response from upstream server"
    console.log('Error retreiving info from GM API getVehicleInfoService:', err);
    res.status(502).send({message: 'Error retreiving data from GM API'});
  })
}

const getSecurityData = (req, res) => {
  //Instantiate vehicle and invoke getSecurityData function
  //Response object is security data from manufacturer API that has been normalized
  let vehicle = Vehicle(req.params.id);
  vehicle.getSecurityData()
  .then(resp => {
    //Respond with normalized status and data
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    //Log error and respond with 502 "Received invalid response from upstream server"
    console.log('Error retreiving info from GM API getSecurityStatusService:', err);
    res.status(502).send({message: 'Error retreiving data from GM API'});
  });
}

const getFuelData = (req, res) => {
  //Instantiate vehicle and invoke getFuelData function
  //Response object is fuel data from manufacturer API that has been normalized
  let vehicle = Vehicle(req.params.id);
  vehicle.getEnergyData('fuel')
  .then(resp => {
    //Respond with normalized status and data
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    //Log error and respond with 502 "Received invalid response from upstream server"
    console.log('Error retreiving info from GM API getEnergyService:', err);
    res.status(502).send({message: 'Error retreiving data from GM API'})
  });
}

const getBatteryData = (req, res) => {
  //Instantiate vehicle and invoke getBatteryData function
  //Response object is battery data from manufacturer API that has been normalized
  let vehicle = Vehicle(req.params.id);
  vehicle.getEnergyData('battery')
  .then(resp => {
    //Respond with normalized status and data
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    //Log error and respond with 502 "Received invalid response from upstream server"
    console.log('Error retreiving info from GM API getEnergyService:', err);
    res.status(502).send({message: 'Error retreiving data from GM API'})
  });
}

const actionEngine = (req, res) => {
  //Instantiate vehicle and invoke actionEngine function
  //Response object is engine data from manufacturer API that has been normalized
  let vehicle = Vehicle(req.params.id)
  vehicle.actionEngine(req.body.action)
  .then(resp => {
    //Respond with normalized status and data
    res.status(resp.status).send(resp.data)
  })
  .catch(err => {
    //Log error and respond with 502 "Received invalid response from upstream server"
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
