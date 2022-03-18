import UserService from '../service/user-service';
import { validationResult } from 'express-validator';
import ApiErrors, { ApiErrorType, ErrorsType } from '../exceptions/api-errors';
import { expiresRefreshToken, nameRefreshToken } from '../configs/appConfigs';
import TokenDto from '../dto/token-dto';
import UserDto from '../dto/user-dto';

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const arrError: ErrorsType = errors.array();
        return next(ApiErrors.BadRequest('Validation error', arrError));
      }
      const { email, password, username } = req.body;
      const userData = await UserService.registration(email, password, username)
      res.cookie(nameRefreshToken, userData.refreshToken, { maxAge: expiresRefreshToken, httpOnly: true })

      return res.json({
        ...new TokenDto(userData),
        user: new UserDto({...userData.user})
      })
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie(nameRefreshToken, userData.refreshToken, { maxAge: expiresRefreshToken, httpOnly: true })

      return res.json({
        ...new TokenDto(userData),
        user: new UserDto({...userData.user})
      });
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      const {params, cookies, query} = req;
      const userId = params.userId * 1;
      const { refreshToken } = cookies;
      res.clearCookie(nameRefreshToken)
      try {
        const userData = await UserService.delete(userId);
        return res.status(200).json({delete: "Ok"}).redirect(process.env.CLIENT_URL);
      } catch (e) {
        return res.status(400).json({delete: `User by id=${userId} not found`}).redirect(process.env.CLIENT_URL);
      }
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie(nameRefreshToken);

      return res.json(token);
    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activatedLink = req.params.link;
      await UserService.activate(activatedLink);
      return res.status(200).json({ok: true}).redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie(nameRefreshToken, userData.refreshToken, { maxAge: expiresRefreshToken, httpOnly: true })

      return res.json(userData);
    } catch (e) {
      next(e)
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();

      return res.json(users);
    } catch (e) {
      next(e)
    }
  }

}

export default new UserController();
