import userService from '../service/user-service';
import UserService from '../service/user-service';

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res.json(userData)
    } catch (e) {
      console.log(e)
    }
  }

  async login(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async logout(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async activate(req, res, next) {
    try {
      const activatedLink = req.params.link;
      await UserService.activate(activatedLink);
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      console.log(e)
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async getUsers(req, res, next) {
    try {
      res.send(['123', '456'])
    } catch (e) {

    }
  }

}

export default new UserController();
