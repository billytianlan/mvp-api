# mvp-api

## Requirements

- Node 6.2.2

## Development

### Installing Dependencies

From within the root directory:

Install all npm dependencies.
```sh
$ npm install
```

Touch .env file and add TEST_API=YOUR_API_URL
```sh
$ touch .env
$ echo 'TEST_API=YOUR_API_URL' >> .env
```

Run server (Port 3000)
```sh
$ npm start
```

Run tests (Port 8080)
Initiate webpack.
```sh
$ npm test 
```

Test API with cURL
```sh
Get Vehicle Data
$ curl http://localhost:3000/api/v1/vehicles/1234 -X GET

Get Safety Data
$ curl http://localhost:3000/api/v1/vehicles/1234/doors -X GET

Get Fuel Data
$ curl http://localhost:3000/api/v1/vehicles/1234/fuel -X GET

Get Battery Data
$ curl http://localhost:3000/api/v1/vehicles/1235/battery -X GET

Post to Start or Stop Vehicle
$ curl http://localhost:3000/api/v1/vehicles/1234/engine -X POST -H "Content-Type: application/json" -d '{"action": "START|STOP"}'
```

Test API with [Postman](https://www.getpostman.com/collections/388d40eaeed1c21fcb99)
