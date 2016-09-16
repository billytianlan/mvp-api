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
    return {
      status: response.status,
      data: {
        vin: dataParser(response.data.vin),
        color: dataParser(response.data.color),
        doorCount: getDoorCount(response.data),
        driveTrain: dataParser(response.data.driveTrain)
      }
    }
  },

  normalizeSecurityData: response => {
    return {
      status: response.status,
      data: _.map(response.data.doors.values, (door) => {
        return {
          "location": dataParser(door.location),
          "locked": dataParser(door.locked)
        }
      })
    }
  },

  normalizeEnergyData: (response, energy) => {
    return {
      status: response.status,
      data: {
        percent: energy === 'fuel' ? dataParser(response.data.tankLevel) : dataParser(response.data.batteryLevel)
      }
    }
  },

  normalizeEngineData: response => {
    return {
      status: response.status,
      data: {
        status: response.actionResult.status === "EXECUTED" ? "success" : "error"
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
  }
}

//Function to handle door count
//Currently only 2 types but ability to handle more 
const getDoorCount = data => {
  if (dataParser(data.fourDoorSedan)) {
    return 4
  } else if (dataParser(data.twoDoorCoupe)) {
    return 2
  }
}

//Parse data into given data types
const dataParser = data => {
  let value;
  switch(data.type) {
    case "String": 
      value = data.value.toString();
      break;
    case "Boolean":
      value = data.value.toString().toLowerCase() === 'true' ? true : false;
      break;
    case "Number": 
      value = Number(data.value);
      break;
    case "Null":
      value = null;
      break;
    default: 
      value = undefined;
  }
  return value;
}

module.exports = gmHelper;
