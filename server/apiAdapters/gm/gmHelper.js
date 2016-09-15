const _ = require('underscore');

const gmHelper = {

  configurePostOptions: data => {
    return {
      method: "POST",
      json: true,
      body: data,
      headers: {
        'content-type': 'application/json'
      }
    }
  },

  normalizeVehicleData: response => {
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
  },

  normalizeApiError: data => {
    return {
      status: data.status,
      data: {
        status: data.status,
        message: data.reason
      }
    }
  },

  normalizeSecurityData: response => {
    return {
      status: response.status,
      data: _.map(response.data.doors.values, (door) => {
        return {
          "location": door.location.value,
          "locked": Boolean(door.locked.value.toLowerCase())
        }
      })
    }
  },

  normalizeEnergyData: (response, energy) => {
    return {
      status: response.status,
      data: {
        percent: energy === 'fuel' ? JSON.parse(response.data.tankLevel.value) : JSON.parse(response.data.batteryLevel.value)
      }
    }
  },

  normalizeEngineData: response => {
    console.log('this is it', response);
    return {
      status: response.status,
      data: {
        status: response.actionResult.status === "EXECUTED" ? "success" : "error"
      }
    }
  }
}

const getDoorCount = data => {
  if (Boolean(data.fourDoorSedan.value.toLowerCase())) {
    return 4
  } else if (Boolean(data.twoDoorCoupe.value.toLowerCase())) {
    return 2
  }
}

module.exports = gmHelper;
