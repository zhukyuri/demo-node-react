import { ValidationError } from 'express-validator';

export type ErrorsType = ValidationError[] | string[]

export interface ApiErrorType {
  status: number;
  message: string;
  errors: ErrorsType
}

export default class ApiErrors extends Error {
  status: number;
  errors: ErrorsType;

  constructor(status: number, message: string, errors: ErrorsType = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiErrors(404, '>>> User unauthorized.');
  }

  static BadRequest(message, errors: ErrorsType = []) {
    return new ApiErrors(400, message, errors)
  }
}
