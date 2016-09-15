const rp = require('request-promise');
const gmHelper = require('./gmHelper');

/********************************
  Make POST requests to GM API 
  Response status from GM API request are always set to 200
  The response object contains a string status code with the real HTTP status
  Ternary statement that normalizes data if the reponse is 200 and normalizes error for non 200 response
  If the GM API is actually down any non 200 response will be caught in the catch block
  Catch block will check if it is an API error or an internal error and return the appropriate response
*********************************/

const gmApi = {

  getVehicleInfoService: vehicleId => {
    return rp(`${process.env.TEST_API}/getVehicleInfoService`, gmHelper.configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
    }))
    .then(response => response.status === '200' ? gmHelper.normalizeVehicleData(response) : gmHelper.normalizeApiError(response))
    .catch(err => handleError(err, 'GM vehicle data'));
  },

  getSecurityStatusService: vehicleId => { 
    return rp(`${process.env.TEST_API}/getSecurityStatusService`, gmHelper.configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
    }))
    .then(response => response.status === '200' ? gmHelper.normalizeSecurityData(response) : gmHelper.normalizeApiError(response))
    .catch(err => handleError(err, 'GM security data'));
  },

  getEnergyService: (vehicleId, energy) => {
    return rp(`${process.env.TEST_API}/getEnergyService`, gmHelper.configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
    }))
    .then(response => response.status === '200' ? gmHelper.normalizeEnergyData(response, energy) : gmHelper.normalizeApiError(response))
    .catch(err => handleError(err, 'GM energy data'));
  },

  actionEngineService: (vehicleId, action) => {
    return rp(`${process.env.TEST_API}/actionEngineService`, gmHelper.configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
      command: `${action}_VEHICLE`
    }))
    .then(response => response.status === '200' ? gmHelper.normalizeEngineData(response) : gmHelper.normalizeApiError(response))
    .catch(err => handleError(err, 'GM engine data'));
  }
}

const handleError = (err, message) => {
  /********************************
    If error has a statusCode property it is an HTTP request error
    Send 503 status code "Error in upstream provider"
    Otherwise it is an error in normalizing the data
    Send 500 status code "Application Error"
  *********************************/
  let statusCode;
  if (err.statusCode) {
    statusCode = 502;
    console.log('Error connecting to API', err.message)
    message = err.message;
  } else {
    statusCode = 500;
    message = `Error normalizing ${message}`;
  }

  return {
    status: statusCode,
    data: {
      status: statusCode,
      message: message
    }
  }
}

module.exports = gmApi;

