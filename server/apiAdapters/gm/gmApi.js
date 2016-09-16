const rp = require('request-promise');
const gmHelper = require('./gmHelper');
const handleError = require('../../utils/errorHandler');

/********************************
  Make POST requests to GM API 
  Response status from GM API request are always set to 200
  If the GM API is actually down any non 200 response will be caught in the catch block
  Catch block will check if it is an API error or an internal error and return the appropriate response
*********************************/

const gmApi = {

  getVehicleInfoService: vehicleId => {
    return rp(`${process.env.TEST_API}/getVehicleInfoService`, gmHelper.configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
    }))
    .then(response => response)
    .catch(err => handleError(err, "Error requesting data from GM API"));
  },

  getSecurityStatusService: vehicleId => { 
    return rp(`${process.env.TEST_API}/getSecurityStatusService`, gmHelper.configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
    }))
    .then(response => response)
    .catch(err => handleError(err, "Error requesting security data from GM API"));
  },

  getEnergyService: (vehicleId) => {
    return rp(`${process.env.TEST_API}/getEnergyService`, gmHelper.configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
    }))
    .then(response => response)
    .catch(err => handleError(err, "Error requesting energy data from GM API"));
  },

  actionEngineService: (vehicleId, action) => {
    action = action ? action.toUpperCase() : action;
    return rp(`${process.env.TEST_API}/actionEngineService`, gmHelper.configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
      command: `${action}_VEHICLE`
    }))
    .then(response => response)
    .catch(err => handleError(err, "Error posting engine data to GM API"));
  }
}

module.exports = gmApi;

