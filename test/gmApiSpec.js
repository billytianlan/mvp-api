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
    });

    it('should return a reason and status for non 200 responses', () => {
      return gmApi.getVehicleInfoService('1236')
      .then(response => {
        expect(response).to.have.all.keys('status', 'reason');
      });
    });
  });

  describe('getSecurityStatusService', () => {

    it('should return the expected data format', () => {
      return gmApi.getSecurityStatusService('1234')
      .then(response => {
        expect(response).to.have.all.keys('service', 'status', 'data')
        expect(response).to.have.deep.property('data.doors.values')
      });
    });

    it('should return the door data as an array', () => {
      return gmApi.getSecurityStatusService('1234')
      .then(response => {
        expect(response.data.doors.values).to.be.an('array');
      });
    });

    it('should return the correct amount of doors for a sedan', () => {
      return gmApi.getSecurityStatusService('1234')
      .then(response => {
        expect(response.data.doors.values).to.have.length(4);
      });
    });

    it('should return the correct amount of doors for a coupe', () => {
      return gmApi.getSecurityStatusService('1235')
      .then(response => {
        expect(response.data.doors.values).to.have.length(2);
      });
    });

    it('should return door data in the expected format', () => {
      return gmApi.getSecurityStatusService('1234')
      .then(response => {
        response.data.doors.values.forEach((door) => {
          expect(door).to.have.all.keys('location', 'locked');
          expect(door).to.have.deep.property('location.value')
          expect(door).to.have.deep.property('locked.value')
        });
      });
    });

    it('should return an object with the status of 404 for an invalid vehicle id', () => {
      return gmApi.getSecurityStatusService('1236')
      .then(response => {
        expect(response.status).to.equal('404');
      });
    });

    it('should return a reason and status for non 200 responses', () => {
      return gmApi.getSecurityStatusService('1236')
      .then(response => {
        expect(response).to.have.all.keys('status', 'reason');
      });
    });

  });

});
