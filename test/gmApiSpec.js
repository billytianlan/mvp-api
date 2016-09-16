const expect = require('chai').expect
const gmApi = require('../server/apiAdapters/gm/gmApi');
require('dotenv').config();


describe('gmApi', () => {

  describe('getVehicleInfoService', () => {
    it('should return the expected data format', done => {
      gmApi.getVehicleInfoService('1234')
      .then(response => {
        expect(response).to.have.have.deep.property('data.vin.value')
        done()
      });
      

    })
  });

});
