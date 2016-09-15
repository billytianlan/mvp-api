const rp = require('request-promise');

const getVehicleInfoService = (vehicleId) => {
  let options = configurePostOptions(vehicleId)
  return rp(`${process.env.TEST_API}/getVehicleInfoService`, options)
  .then((response) => {
    return normalizeVehicleData(response);
  })
  .catch(err => {
    throw err;
  });
}

let configurePostOptions = (vehicleId) => {
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

let normalizeVehicleData = (response) => {
  let result;
  let data = response.data;
  console.log('boba', response.status)
  if (response.status === '200') {
    let doorCount = getDoorCount(data);
    result = {
      status: response.status,
      data: {
        vin: data.vin.value,
        color: data.color.value,
        doorCount: doorCount,
        driveTrain: data.driveTrain.value
      }
    }
  } else {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~')
    result = {
      status: Number(response.status),
      data: {
        reason: response.reason
      }
    }
  }
  return result;
}

let getDoorCount = (data) => {
  return data.fourDoorSedan.value === 'True' ? 4 : 2;
}

module.exports = {
  getVehicleInfoService: getVehicleInfoService
}