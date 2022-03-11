class AppError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    (statusCode.toString()).charAt(0) === '4' ? this.status = 'error' : this.status = 'fail';
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError;