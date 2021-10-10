// const { BaseError } = require('sequelize/types');

module.exports.validationErrorHandler = (err, req, res, next) => {
  //
  next(err);
};

module.exports.sequelizeErrorHandler = (err, req, res, next) => {
  // if (err instanceof BaseError) {
  // }
  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  console.log(`err`, err);
  if (res.headersSent) {
    return;
  }
  res
    .status(err?.status ?? 500)
    .send({ errors: [{ title: err?.message ?? 'Internal server error' }] });
};
