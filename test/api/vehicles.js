const request = require('supertest');
const app = require('../../server/server');



describe('Vehicles API Endpoint', () => {

  describe('getVehicle', () => {

    it('should return 200 for a valid vehicle id', (done) => {
      request(app)
      .get('/api/v1/vehicles/1234')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should return vehicle data in the correct format', (done) => {
      request(app)
      .get('/api/v1/vehicles/1234')
      .expect(200, {
        "vin": "123123412412",
        "color": "Metallic Silver",
        "doorCount": 4,
        "driveTrain": "v8"
      }, done)
    })

  });

});
