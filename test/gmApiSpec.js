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

  describe('getEnergyService', () => {

    it('should return the expected data format', () => {
      return gmApi.getEnergyService('1234')
      .then(response => {
        expect(response).to.have.all.keys('service', 'status', 'data')
        expect(response).to.have.deep.property('data.tankLevel.value')
        expect(response).to.have.deep.property('data.batteryLevel.value')
      });
    });

    it('should return a number for tankLevel for a gas car', () => {
      return gmApi.getEnergyService('1234')
      .then(response => {
        expect(Number(response.data.tankLevel)).to.be.a('number');
      });
    });

    it('should return a number for batteryLevel for an electric car', () => {
      return gmApi.getEnergyService('1235')
      .then(response => {
        expect(Number(response.data.batteryLevel)).to.be.a('number');
      });
    });

    it('should return null for batteryLevel of a gas car', () => {
      return gmApi.getEnergyService('1234')
      .then(response => {
        expect(JSON.parse(response.data.batteryLevel.value)).to.be.a('null')
      })
    })

    it('should return null for tankLevel of an electric car', () => {
      return gmApi.getEnergyService('1235')
      .then(response => {
        expect(JSON.parse(response.data.tankLevel.value)).to.be.a('null')
      })
    })

    it('should return an object with the status of 404 for an invalid vehicle id', () => {
      return gmApi.getEnergyService('1236')
      .then(response => {
        expect(response.status).to.equal('404');
      });
    });

    it('should return a reason and status for non 200 responses', () => {
      return gmApi.getEnergyService('1236')
      .then(response => {
        expect(response).to.have.all.keys('status', 'reason');
      });
    });

  });

  describe('actionEngineService', () => {

    it('should respond with the expected data format when starting', () => {
      return gmApi.actionEngineService('1234', 'START')
      .then(response =>  {
        expect(response).to.have.all.keys('service', 'status', 'actionResult')
        expect(response).to.have.deep.property('actionResult.status');
      });
    });

    it('should respond with the expected data format when stopping', () => {
      return gmApi.actionEngineService('1234', 'STOP')
      .then(response =>  {
        expect(response).to.have.all.keys('service', 'status', 'actionResult')
        expect(response).to.have.deep.property('actionResult.status');
      });
    });

    it('should respond with either EXECUTED or FAILED when starting', () => {
      return gmApi.actionEngineService('1234', 'START')
      .then(response => {
        expect(response.actionResult.status).to.be.oneOf(['EXECUTED', 'FAILED']);
      });
    });

    it('should respond with either EXECUTED or FAILED when stopping', () => {
      return gmApi.actionEngineService('1234', 'STOP')
      .then(response => {
        expect(response.actionResult.status).to.be.oneOf(['EXECUTED', 'FAILED']);
      });
    });

    it('should respond with 400 when no action is sent', () => {
      return gmApi.actionEngineService('1234')
      .then(response => {
        expect(response.status).to.equal('400');
        expect(response).to.have.all.keys('status', 'reason');
      });
    })

    it('should respond with 400 when an incorrect action is sent', () => {
      return gmApi.actionEngineService('1234', 'ON')
      .then(response => {
        expect(response.status).to.equal('400');
        expect(response).to.have.all.keys('status', 'reason');
      })
    })

    it('should return an object with the status of 404 for an invalid vehicle id', () => {
      return gmApi.actionEngineService('1236')
      .then(response => {
        expect(response.status).to.equal('404');
      });
    });

    it('should return a reason and status for non 200 responses', () => {
      return gmApi.actionEngineService('1236')
      .then(response => {
        expect(response).to.have.all.keys('status', 'reason');
      });
    });

  });

});
