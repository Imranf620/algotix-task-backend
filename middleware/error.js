import apiResponse from "../utils/apiResponse.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    return apiResponse(false, message, null, 400, res);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    return apiResponse(false, message, null, 400, res);
  }

  return apiResponse(false, err.message, err.stack, err.statusCode, res);
};
