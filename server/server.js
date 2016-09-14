const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const router = require('../routes/routes');
const port = process.env.PORT || 3000;


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
})

module.exports = app;
