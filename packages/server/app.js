const express = require('express');
const cors = require('cors');
const { errorHandlers } = require('./middleware');
const router = require('./router');

const app = express();

//add from requests
app.use(cors({ origin: 'http://localhost' }));

app.use(express.json());

app.use('/api', router);

app.use(
  errorHandlers.validationErrorHandler,
  errorHandlers.sequelizeErrorHandler,
  errorHandlers.errorHandler
);

module.exports = app;
