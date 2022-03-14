import db from './db';
import ApiErrors from '../exceptions/api-errors';

export default class UserOrm {
  static async ormFindFirst(options) {
    try {
      return await db.user.findFirst(options);
    } catch (e) {
      throw ApiErrors.CheckPrismaError(e, 'user.findFirst');
    }
  }

  static async ormFindMany(options) {
    try {
      return await db.user.findMany(options);
    } catch (e) {
      throw ApiErrors.CheckPrismaError(e, 'user.findMany');
    }
  }

 static async ormCreate(options) {
    try {
      return await db.user.create(options);
    } catch (e) {
      ApiErrors.CheckPrismaError(e, 'user.create');
    }
  }

 static async ormDelete(options) {
    try {
      return await db.user.delete(options);
    } catch (e) {
      throw ApiErrors.CheckPrismaError(e, 'user.delete');
    }
  }

 static async ormUpdate(options) {
    try {
      return await db.user.update(options);
    } catch (e) {
      throw ApiErrors.CheckPrismaError(e, 'user.update');
    }
  }
}
