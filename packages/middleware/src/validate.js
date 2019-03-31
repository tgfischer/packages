const HttpStatus = require("http-status-codes");
const asyncHandler = require("express-async-handler");

module.exports.types = {
  BODY: "body",
  PARAMS: "params",
  QUERY: "query"
};

module.exports.validate = (schema, type) =>
  asyncHandler(async (req, res, next) => {
    try {
      const result = await schema.validate(req[type]);
      res.locals[type] = result;
      next();
    } catch (err) {
      next({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "The request was invalid"
      });
    }
  });
