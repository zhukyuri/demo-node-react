import userService from '../service/user-service';
import UserService from '../service/user-service';
import { validationResult } from 'express-validator';
import ApiErrors, { ErrorsType } from '../exceptions/api-errors';

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const arrError: ErrorsType = errors.array();
        return next(ApiErrors.BadRequest('Validation error', arrError));
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {

    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {

    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activatedLink = req.params.link;
      await UserService.activate(activatedLink);
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {
      next(e)
    }
  }

  async getUsers(req, res, next) {
    try {
      res.send(['123', '456'])
    } catch (e) {
      next(e)
    }
  }

}

export default new UserController();
