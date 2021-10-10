const {
  PAGINATION_VALIDATION_SCHEMA
} = require('./../utils/validationSchemas');

module.exports.paginateUsers = async (req, res, next) => {
  const {
    query: { page, results }
  } = req;

  const defaultPagination = { limit: 5, offset: 0 };

  const pagination = {
    limit: results ?? 5,
    offset: (page - 1) * results || 0
  };

  try {
    if (await PAGINATION_VALIDATION_SCHEMA.isValid(pagination)) {
      req.pagination = pagination;
    } else {
      req.pagination = defaultPagination;
    }
  } catch (err) {
    next(err);
  }
  next();
};
