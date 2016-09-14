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

    it('should return vehicle data in the correct JSON format', (done) => {
      request(app)
      .get('/api/v1/vehicles/1234')
      .expect((res) => {
        expect(res.body).to.have.all.key('vin', 'color', 'doorCount', 'driveTrain');
      })
      .end(done);
    });

    it('should return 404 for an invalid vehicle id', (done) => {
      request(app)
      .get('/api/v1/vehicles/1236')
      .expect('Content-Type', /json/)
      .expect(404, done);
    })

  });

  describe('getVehicleSecurity', (done) => {
    it('should return 200 for a valid vehicle id', (done) => {
      request(app)
      .get('/api/v1/vehicles/1235/doors')
      .expect('Content-Type', /json/)
      .expect(200, done);
    })

    it('should return vehicle data in the correct JSON format', (done) => {
      request(app)
      .get('/api/v1/vehicles/1235/doors')
      .expect((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.all.key('location', 'locked');
      })
      .end(done);
    })

    it('should return the correct amount of doors for a four door', (done) => {
      request(app)
      .get('/api/v1/vehicles/1234/doors')
      .expect((res) => {
        expect(res.body).to.have.length(4)
      })
      .end(done);
    })

    it('should return the correct amount of doors for a two door', (done) => {
      request(app)
      .get('/api/v1/vehicles/1235/doors')
      .expect((res) => {
        expect(res.body).to.have.length(2)
      })
      .end(done);
    })

    it('should return boolean data for locked', (done) => {
      request(app)
      .get('/api/v1/vehicles/1235/doors')
      .expect((res) => {
        expect(res.body[0].locked).to.be.a('boolean');
      })
      .end(done);
    })
  })
});
