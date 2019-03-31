const HttpStatus = require("http-status-codes");
const asyncHandler = require("express-async-handler");

module.exports = (schema, type) =>
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
