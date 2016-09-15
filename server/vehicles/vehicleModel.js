const gmApi = require('../manufacturers/gmApi'); 

const Vehicle = (vehicleId) => {
  let vehicle = {};

  //In the future we can have some logic that dispatches to the appropriote manufacturer API
  vehicle.getData = () => gmApi.getVehicleInfoService(vehicleId);
  vehicle.getSecurityData = () => gmApi.getSecurityStatusService(vehicleId);
  vehicle.getEnergyData = energy => gmApi.getEnergyService(vehicleId, energy);


  return vehicle;
}

module.exports = Vehicle
