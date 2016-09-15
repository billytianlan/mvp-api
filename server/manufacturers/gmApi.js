const rp = require('request-promise');
const _ = require('underscore');

const gmApi = {

  getVehicleInfoService: vehicleId => {
    return rp(`${process.env.TEST_API}/getVehicleInfoService`, configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
    }))
    .catch(err => err)
    .then(response => response.status === '200' ? normalizeVehicleData(response) : normalizeApiError(response))
    .catch(err => {
      console.log('Error normalizing GM vehicle data:', err)
      return handleApplicationError();
    });
  },

  getSecurityStatusService: vehicleId => { 
    return rp(`${process.env.TEST_API}/getSecurityStatusService`, configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
    }))
    .catch(err => err)
    .then(response => response.status === '200' ? normalizeSecurityData(response) : normalizeApiError(response))
    .catch(err => {
      console.log('Error normalizing GM security data:', err)
      return handleApplicationError();
    });
  },

  getEnergyService: (vehicleId, energy) => {
    return rp(`${process.env.TEST_API}/getEnergyService`, configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
    }))
    .catch(err => err)
    .then(response => response.status === '200' ? normalizeEnergyData(response, energy) : normalizeApiError(response))
    .catch(err => {
      console.log('Error normalizing GM fuel data:', err)
      return handleApplicationError();
    });
  },

  actionEngineService: (vehicleId, action) => {
    return rp(`${process.env.TEST_API}/actionEngineService`, configurePostOptions({
      id: vehicleId,
      responseType: "JSON",
      command: `${action}_VEHICLE`
    }))
    .catch(err => err)
    .then(response => response.status === '200' ? normalizeEngineData(response) : normalizeApiError(response))
  }
}

let configurePostOptions = data => {
  return {
    method: "POST",
    json: true,
    body: data,
    headers: {
      'content-type': 'application/json'
    }
  }
}

let normalizeVehicleData = response => {
  let doorCount = getDoorCount(response.data);
  return {
    status: response.status,
    data: {
      vin: response.data.vin.value,
      color: response.data.color.value,
      doorCount: doorCount,
      driveTrain: response.data.driveTrain.value
    }
  }
}

let normalizeApiError = data => {
  return {
    status: data.status,
    data: {
      status: data.status,
      message: data.reason
    }
  }
}

let handleApplicationError = () => {
  return {
    status: 500,
    data: {
      status: 500,
      message: "Application Error"
    }
  }
}

let normalizeSecurityData = response => {
  return {
    status: response.status,
    data: _.map(response.data.doors.values, (door) => {
      return {
        "location": door.location.value,
        "locked": Boolean(door.locked.value.toLowerCase())
      }
    })
  }
}

let normalizeEnergyData = (response, energy) => {
  return {
    status: response.status,
    data: {
      percent: energy === 'fuel' ? JSON.parse(response.data.tankLevel.value) : JSON.parse(response.data.batteryLevel.value)
    }
  }
}

let normalizeEngineData = (response) => {
  console.log('this is it', response);
  return {
    status: response.status,
    data: {
      status: response.actionResult.status === "EXECUTED" ? "success" : "error"
    }
  }
}

let getDoorCount = data => {
  if (Boolean(data.fourDoorSedan.value.toLowerCase())) {
    return 4
  } else if (Boolean(data.twoDoorCoupe.value.toLowerCase())) {
    return 2
  }
}

module.exports = gmApi;
