const rp = require('request-promise');
const _ = require('underscore');

const gmApi = {

  getVehicleInfoService: vehicleId => {
    return rp(`${process.env.TEST_API}/getVehicleInfoService`, configurePostOptions(vehicleId))
    .catch(err => err)
    .then(response => response.status === '200' ? normalizeVehicleData(response) : normalizeApiError(response))
    .catch(err => {
      console.log('Error normalizing GM vehicle data:', err)
      return handleApplicationError();
    });
  },

  getSecurityStatusService: vehicleId => { 
    return rp(`${process.env.TEST_API}/getSecurityStatusService`, configurePostOptions(vehicleId))
    .catch(err => err)
    .then(response => response.status === '200' ? normalizeSecurityData(response) : normalizeApiError(response))
    .catch(err => {
      console.log('Error normalizing GM security data:', err)
      return handleApplicationError();
    });
  },

  getEnergyService: vehicleId => {
    return rp(`${process.env.TEST_API}/getEnergyService`, configurePostOptions(vehicleId))
    .catch(err => err)
    .then(response => response.status === '200' ? normalizeFuelData(response) : normalizeApiError(response))
    .catch(err => {
      console.log('Error normalizing GM fuel data:', err)
      return handleApplicationError();
    });
  }
}

let configurePostOptions = vehicleId => {
  return {
    method: "POST",
    json: true,
    body: {
      id: vehicleId,
      responseType: "JSON"
    },
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

let normalizeFuelData = response => {
  return {
    status: response.status,
    data: {
      percent: JSON.parse(response.data.tankLevel.value)
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
