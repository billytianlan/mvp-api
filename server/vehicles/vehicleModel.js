const gmApi = require('../apiAdapters/gm/gmApi'); 
const gmHelper = require('../apiAdapters/gm/gmHelper');
const handleError = require('../utils/errorHandler');

const Vehicle = {
  /***************************
  In the future we can have some logic that dispatches to the appropriote manufacturer API
  
  Response status from GM API request are always 200
  The response object contains a string status code with the real HTTP status
  Implement a ternary statement that normalizes data if the reponse is 200 and normalizes error for non 200 response
  If the API returns non 200 or an error was returned from the callback 
  Send whatever non 200 status code back to the user after it has been normalized
  Catch, log and return errors that might have occured during normalization
  ****************************/

  getData: (vehicleId) => { 
    return gmApi.getVehicleInfoService(vehicleId)
    .then(response => response.status === '200' ? gmHelper.normalizeVehicleData(response) : gmHelper.normalizeApiError(response))
    .catch(err => handleError(err, "Error normalizing vehicle data"));
  },

  getSecurityData: (vehicleId) => { 
    return gmApi.getSecurityStatusService(vehicleId)
    .then(response => response.status === '200' ? gmHelper.normalizeSecurityData(response) : gmHelper.normalizeApiError(response))
    .catch(err => handleError(err, 'Error normalizing security data'));
  },

  getEnergyData: (vehicleId, energy) => { 
    return gmApi.getEnergyService(vehicleId) 
    .then(response => response.status === '200' ? gmHelper.normalizeEnergyData(response, energy) : gmHelper.normalizeApiError(response))
    .catch(err => handleError(err, 'Error nomralizing energy data'));
  },

  actionEngine: (vehicleId, action) => { 
    return gmApi.actionEngineService(vehicleId, action)
    .then(response => response.status === '200' ? gmHelper.normalizeEngineData(response) : gmHelper.normalizeApiError(response))
    .catch(err => handleError(err, 'Error normalizing engine data'));
  }

}

module.exports = Vehicle
