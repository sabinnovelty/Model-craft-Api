const HttpStatus = require("http-status-codes");

const common_utils = {
  errorHandler(response, error) {
    response
      .status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message || error });
  },
  unAuthorized(response, error) {
    response
      .status(error.statusCode || HttpStatus.UNAUTHORIZED)
      .send({ message: error.message || error });
  },
  success(response, data) {
    response.status(HttpStatus.OK).send(data);
  }
};

module.exports = common_utils;
