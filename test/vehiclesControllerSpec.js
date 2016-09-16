const request = require('supertest');
const expect = require('chai').expect
const app = require('../server/server');

describe('Vehicles API Endpoint', () => {

  describe('getData', () => {

    it('should return 200 for a valid vehicle id', done => {
      request(app)
      .get('/api/v1/vehicles/1234')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should return vehicle data in the correct JSON format', done => {
      request(app)
      .get('/api/v1/vehicles/1234')
      .expect(res => {
        expect(res.body).to.be.an('object');
        expect(Object.keys(res.body)).to.have.length(4);
        expect(res.body).to.have.all.key('vin', 'color', 'doorCount', 'driveTrain');
      })
      .end(done);
    });

    it('should return the correct data types for each value', done => {
      request(app)
      .get('/api/v1/vehicles/1234')
      .expect(res => {
        expect(res.body.vin).to.be.a('string');
        expect(res.body.color).to.be.a('string');
        expect(res.body.doorCount).to.be.a('number');
        expect(res.body.driveTrain).to.be.a('string');
      })
      .end(done);
    });

    it('should return 404 for an invalid vehicle id', done => {
      request(app)
      .get('/api/v1/vehicles/1236')
      .expect('Content-Type', /json/)
      .expect(404, done);
    });

  });

  describe('getSecurityData', () => {
    it('should return 200 for a valid vehicle id', done => {
      request(app)
      .get('/api/v1/vehicles/1235/doors')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should return security data in the correct JSON format', done => {
      request(app)
      .get('/api/v1/vehicles/1235/doors')
      .expect(res => {
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.all.key('location', 'locked');
      })
      .end(done);
    });

    it('should return the correct amount of doors for a four door', done => {
      request(app)
      .get('/api/v1/vehicles/1234/doors')
      .expect(res => {
        expect(res.body).to.have.length(4)
      })
      .end(done);
    });

    it('should return the correct amount of doors for a two door', done => {
      request(app)
      .get('/api/v1/vehicles/1235/doors')
      .expect(res => {
        expect(res.body).to.have.length(2)
      })
      .end(done);
    });

    it('should return boolean data for locked property', done => {
      request(app)
      .get('/api/v1/vehicles/1235/doors')
      .expect(res => {
        expect(res.body[0].locked).to.be.a('boolean');
      })
      .end(done);
    });

    it('should return 404 for an invalid vehicle id', done => {
      request(app)
      .get('/api/v1/vehicles/1236/doors')
      .expect('Content-Type', /json/)
      .expect(404, done);
    });
  })

  describe('getFuelData', () => {
    it('should return 200 for a valid vehicle id', done => {
      request(app)
      .get('/api/v1/vehicles/1234/fuel')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should return fuel data in the correct JSON format', done => {
      request(app)
      .get('/api/v1/vehicles/1234/fuel')
      .expect(res => {
        expect(res.body).to.be.an('object');
        expect(Object.keys(res.body)).to.have.length(1);
        expect(res.body).to.have.key('percent');
      })
      .end(done);
    });

    it('should return a number for fuel percent', done => {
      request(app)
      .get('/api/v1/vehicles/1234/fuel')
      .expect(res => {
        expect(res.body.percent).to.be.a('number');
      })
      .end(done);
    });

    it('should return null for electric cars', done => {
      request(app)
      .get('/api/v1/vehicles/1235/fuel')
      .expect(res => {
        expect(res.body.percent).to.equal(null);
      })
      .end(done);
    });

    it('should return 404 for an invalid vehicle id', done => {
      request(app)
      .get('/api/v1/vehicles/1236/fuel')
      .expect('Content-Type', /json/)
      .expect(404, done);
    });
  });

  describe('getBatteryData', () => {
    it('should return 200 for a valid vehicle id', done => {
      request(app)
      .get('/api/v1/vehicles/1235/battery')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should return battery data in the correct JSON format', done => {
      request(app)
      .get('/api/v1/vehicles/1235/battery')
      .expect(res => {
        expect(res.body).to.be.an('object');
        expect(Object.keys(res.body)).to.have.length(1);
        expect(res.body).to.have.key('percent');
      })
      .end(done);
    });

    it('should return a number for battery percent', done => {
      request(app)
      .get('/api/v1/vehicles/1235/battery')
      .expect(res => {
        expect(res.body.percent).to.be.a('number');
      })
      .end(done);
    });

    it('should return null for gas cars', done => {
      request(app)
      .get('/api/v1/vehicles/1234/battery')
      .expect(res => {
        expect(res.body.percent).to.equal(null);
      })
      .end(done);
    });

    it('should return 404 for an invalid vehicle id', done => {
      request(app)
      .get('/api/v1/vehicles/1236/fuel')
      .expect('Content-Type', /json/)
      .expect(404, done);
    });
  });

  describe('actionEngine start engine', () => {  

    it('should return 200 for a valid vehicle id', done => {
      request(app)
      .post('/api/v1/vehicles/1235/engine')
      .send({
        action: "START"
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should return engine data in the correct JSON format', done => {
      request(app)
      .post('/api/v1/vehicles/1235/engine')
      .send({
        action: "START"
      })
      .expect(res => {
        expect(res.body).to.be.an('object')
        expect(Object.keys(res.body)).to.have.length(1);
        expect(res.body).to.have.key('status');
      })
      .end(done);
    });

    it('should return either success or error', done => {
      request(app)
      .post('/api/v1/vehicles/1235/engine')
      .send({
        action: "START"
      })
      .expect(res => {
        expect(res.body.status).to.be.a('string');
        expect(res.body.status).to.be.oneOf(['success', 'error']);
      })
      .end(done);
    });

    it('should return 400 if no action is sent', done => {
      request(app)
      .post('/api/v1/vehicles/1235/engine')
      .expect('Content-Type', /json/)
      .expect(400, done);
    });

    it('should return 400 if invalid action is sent', done => {
      request(app)
      .post('/api/v1/vehicles/1235/engine')
      .send({
        action: "ON"
      })
      .expect('Content-Type', /json/)
      .expect(400, done);
    })

    it('should return 400 if the key is incorrect', done => {
      request(app)
      .post('/api/v1/vehicles/1235/engine')
      .send({
        command: "START"
      })
      .expect('Content-Type', /json/)
      .expect(400, done);
    })

  });

  describe('actionEngine stop engine', () => {  

    it('should return 200 for a valid vehicle id', done => {
      request(app)
      .post('/api/v1/vehicles/1235/engine')
      .send({
        action: "STOP"
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
    });

    it('should return engine data in the correct JSON format', done => {
      request(app)
      .post('/api/v1/vehicles/1235/engine')
      .send({
        action: "STOP"
      })
      .expect(res => {
        expect(res.body).to.be.an('object')
        expect(Object.keys(res.body)).to.have.length(1);
        expect(res.body).to.have.key('status');
      })
      .end(done);
    });

    it('should return either success or error', done => {
      request(app)
      .post('/api/v1/vehicles/1235/engine')
      .send({
        action: "STOP"
      })
      .expect(res => {
        expect(res.body.status).to.be.a('string');
        expect(res.body.status).to.be.oneOf(['success', 'error']);
      })
      .end(done);
    });

  });

});
