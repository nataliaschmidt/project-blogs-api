const httpStatus = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 400,
  DELETED: 204,
  UNAUTHORIZED: 401,
};

const mapStatusHTTP = (status) => httpStatus[status] || 500;

module.exports = mapStatusHTTP;