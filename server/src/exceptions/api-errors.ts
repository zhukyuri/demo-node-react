export default class ApiErrors extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiErrors(404, '>>> User unauthorized.');
  }

  static BadRequest(message, errors = []) {
    return new ApiErrors(400, message, errors)
  }
}
