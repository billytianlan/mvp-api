const request = require('supertest');
const expect = require('chai').expect
const app = require('../../server/server');



describe('Vehicles API Endpoint', () => {

  describe('getVehicleData', (done) => {

    it('should return 200 for a valid vehicle id', (done) => {
      request(app)
      .get('/api/v1/vehicles/1234')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should return vehicle data in the correct json format', (done) => {
      request(app)
      .get('/api/v1/vehicles/1234')
      .expect((res) => {
        expect(res.body).to.have.all.key('vin', 'color', 'doorCount', 'driveTrain');
      })
      .end(done);
    });

  });

  describe('getVehicleSecurity', (done) => {
    it('should return 200 for a valid vehicle id', (done) => {
      request(app)
      .get('/api/v1/vehicles/1235/doors')
      .expect('Content-Type', /json/)
      .expect(200, done);
    })
  })
});
