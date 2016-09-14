const request = require('supertest');
const expect = require('chai').expect
const app = require('../../server/server');



describe('Vehicles API Endpoint', () => {

  describe('getVehicle', () => {

    it('should return 200 for a valid vehicle id', (done) => {
      request(app)
      .get('/api/v1/vehicles/1234')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should return vehicle data in the correct json format', () => {
      request(app)
      .get('/api/v1/vehicles/1234')
      .end((res) => {
        expect(res).to.have.all.key('vin', 'color', 'doorCount', 'driveTrain');
      });
    });

  });

});
