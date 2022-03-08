import { ValidationError } from 'express-validator';
import { Prisma } from '@prisma/client'

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

  static BadQueryDB(message, errors: ErrorsType = []) {
    return new ApiErrors(503, `>>> DB request error: ${message}`, errors)
  }

  static PrismaError(message, errors: ErrorsType = []) {
    return new ApiErrors(503, message, errors)
  }

  static CheckPrismaError(e, info): void {
    if (e instanceof Prisma.PrismaClientInitializationError) {
      throw this.PrismaError(`Prisma Client Initialization Error: ${info}`)
    } else if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw this.PrismaError(`Prisma Client Known Request Error: ${info}`)
    } else if (e instanceof Prisma.PrismaClientRustPanicError) {
      throw this.PrismaError(`Prisma Client Rust Panic Error: ${info}`)
    } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
      throw this.PrismaError(`Prisma Client Unknown Request Error: ${info}`)
    }
  }
}
