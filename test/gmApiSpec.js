const expect = require('chai').expect
const gmApi = require('../server/apiAdapters/gm/gmApi');
require('dotenv').config();


describe('GM API', () => {

  describe('getVehicleInfoService', () => {

    it('should return the expected data format', () => {
      return gmApi.getVehicleInfoService('1234')
      .then(response => {
        expect(response).to.have.all.keys('service', 'status', 'data')
        expect(response).to.have.deep.property('data.vin.value')
        expect(response).to.have.deep.property('data.color.value')
        expect(response).to.have.deep.property('data.fourDoorSedan.value')
        expect(response).to.have.deep.property('data.twoDoorCoupe.value')
        expect(response).to.have.deep.property('data.driveTrain.value')
      });
    });

    it('should return a Boolean for fourDoorSedan property', () => {
      return gmApi.getVehicleInfoService('1234')
      .then(response => {
        expect(response.data.fourDoorSedan.type).to.equal('Boolean');
      });
    });

    it('should return an object with the status of 404 for an invalid vehicle id', () => {
      return gmApi.getVehicleInfoService('1236')
      .then(response => {
        expect(response.status).to.equal('404');
      });
    })

    it('should return a reason for non 200 responses', () => {
      return gmApi.getVehicleInfoService('1236')
      .then(response => {
        expect(response).to.have.all.keys('status', 'reason');
      });
    })
  });

});
