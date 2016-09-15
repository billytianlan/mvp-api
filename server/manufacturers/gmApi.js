const rp = require('request-promise');
const _ = require('underscore');

const gmApi = {

  getVehicleInfoService: vehicleId => {
    console.log('the vehicle id', vehicleId);
    let options = configurePostOptions(vehicleId)
    return rp(`${process.env.TEST_API}/getVehicleInfoService`, options)
    .catch(err => err)
    .then(response => response.status === '200' ? normalizeVehicleData(response) : normalizeApiError(response))
    .catch(err => {
      console.log('Error normalizing GM vehicle data:', err)
      return handleApplicationError();
    });
  },

  getSecurityStatusService: vehicleId => { 
    let options = configurePostOptions(vehicleId)
    return rp(`${process.env.TEST_API}/getSecurityStatusService`, options)
    .catch(err => err)
    .then(response => response.status === '200' ? normalizeSecurityData(response) : normalizeApiError(response))
    .catch(err => {
      console.log('Error normalizing GM security data:', err)
      return handleApplicationError();
    });
  },

  getEnergyService: vehicleId => {
    let options = configurePostOptions(vehicleId)
    return rp(`${process.env.TEST_API}/getEnergyService`, options)
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
      reason: data.reason
    }
  }
}

let handleApplicationError = () => {
  return {
    status: 500,
    data: {
      status: 500,
      reason: "Application Error"
    }
  }
}

let normalizeSecurityData = response => {
  return {
    status: response.status,
    data: _.map(response.data.doors.values, (door) => {
      return {
        "location": door.location.value,
        "locked": door.locked.value === "True" ? true : false
      }
    })
  }
}

let normalizeFuelData = response => {
  return {
    status: response.status,
    data: {
      percent: response.data.tankLevel.value === 'null' ? null : Number(response.data.tankLevel.value)
    }
  }
}

let getDoorCount = data => {
  return data.fourDoorSedan.value === 'True' ? 4 : 2;
}

module.exports = gmApi;
