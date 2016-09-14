const request = require('supertest');
const app = '../server/server';



describe('Vehicles API Endpoint', () => {

  describe('getVehicle', () => {

    it('should return 200 for a valid vehicle id', (done) => {
      request(app)
      .get('/api/v1/vehicles/1234')
      .expect('Content-Type', /json/)
      .expect(201, done);
    });
  });
});
