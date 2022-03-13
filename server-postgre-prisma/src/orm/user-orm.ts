import db from './db';
import ApiErrors from '../exceptions/api-errors';

export default class UserOrm {
  static async ormFindFirst(options) {
    try {
      return await db.user.findFirst(options);
    } catch (e) {
      ApiErrors.CheckPrismaError(e, 'user.findFirst');
    }
  }

  static async ormFindMany(options) {
    try {
      return await db.user.findMany(options);
    } catch (e) {
      ApiErrors.CheckPrismaError(e, 'user.findMany');
    }
  }

 static async ormCreate(options) {
    try {
      return await db.user.create(options);
    } catch (e) {
      ApiErrors.CheckPrismaError(e, 'user.create');
    }
  }

 static async ormUpdate(options) {
    try {
      return await db.user.update(options);
    } catch (e) {
      ApiErrors.CheckPrismaError(e, 'user.update');
    }
  }
}
