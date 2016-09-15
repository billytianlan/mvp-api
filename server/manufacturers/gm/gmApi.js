const rp = require('request-promise');
const gmHelper = require('./gmHelper');

const gmApi = {

  getVehicleInfoService: vehicleId => {
    return rp(`${process.env.TEST_API}/getVehicleInfoService`, gmHelper.configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
    }))
    .catch(err => err)
    .then(response => response.status === '200' ? gmHelper.normalizeVehicleData(response) : gmHelper.normalizeApiError(response))
    .catch(err => {
      console.log('Error normalizing GM vehicle data:', err)
      return handleApplicationError();
    });
  },

  getSecurityStatusService: vehicleId => { 
    return rp(`${process.env.TEST_API}/getSecurityStatusService`, gmHelper.configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
    }))
    .catch(err => err)
    .then(response => response.status === '200' ? gmHelper.normalizeSecurityData(response) : gmHelper.normalizeApiError(response))
    .catch(err => {
      console.log('Error normalizing GM security data:', err)
      return handleApplicationError();
    });
  },

  getEnergyService: (vehicleId, energy) => {
    return rp(`${process.env.TEST_API}/getEnergyService`, gmHelper.configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
    }))
    .catch(err => err)
    .then(response => response.status === '200' ? gmHelper.normalizeEnergyData(response, energy) : gmHelper.normalizeApiError(response))
    .catch(err => {
      console.log('Error normalizing GM fuel data:', err)
      return handleApplicationError();
    });
  },

  actionEngineService: (vehicleId, action) => {
    return rp(`${process.env.TEST_API}/actionEngineService`, gmHelper.configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
      command: `${action}_VEHICLE`
    }))
    .catch(err => err)
    .then(response => response.status === '200' ? gmHelper.normalizeEngineData(response) : gmHelper.normalizeApiError(response))
  }
}

const handleApplicationError = () => {
  return {
    status: 500,
    data: {
      status: 500,
      message: "Application Error"
    }
  }
}

module.exports = gmApi;
