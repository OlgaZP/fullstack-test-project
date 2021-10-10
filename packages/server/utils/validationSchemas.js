const yup = require('yup');

module.exports.PAGINATION_VALIDATION_SCHEMA = yup.object().shape({
  limit: yup
    .number()
    .min(1)
    .max(50)
    .required(),
  offset: yup
    .number()
    .min(1)
    .required()
});
