const gmApi = require('../apiAdapters/gm/gmApi'); 

const Vehicle = (vehicleId) => {
  //Create vehicle instance
  let vehicle = {};

  //In the future we can have some logic that dispatches to the appropriote manufacturer API
  //gmApi methods take the vehicleId closure variable which is assigned during instantiation
  vehicle.getData = () => gmApi.getVehicleInfoService(vehicleId);
  vehicle.getSecurityData = () => gmApi.getSecurityStatusService(vehicleId);
  vehicle.getEnergyData = energy => gmApi.getEnergyService(vehicleId, energy);
  vehicle.actionEngine = action => gmApi.actionEngineService(vehicleId, action);

  //Return instance 
  return vehicle;
}

module.exports = Vehicle
