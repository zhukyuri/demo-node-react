import MailService from './mail-service';
import TokenService from './token-service';
import UserDTO from '../dto/user-dto'
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import ApiErrors from '../exceptions/api-errors';
import db from '../orm/db'

class UserService {
  async registration(email, password) {
    let candidate;
    try {
      candidate = await db.user.findFirst({ where: { email } });
    } catch (e) {
      ApiErrors.CheckPrismaError(e, 'registration');
    }

    if (candidate) throw ApiErrors.BadRequest(`User already exist with email ${email}`)

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidv4();
    const user = await db.user.create({ data: { email, password: hashPassword, activationLink } })

    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    const res_ = await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async login(email, password) {
    let user;
    try {
      user = await db.user.findFirst({ where: { email } })
    } catch (e) {
      ApiErrors.CheckPrismaError(e, 'Login');
    }
    if (!user) throw ApiErrors.BadRequest('>>>> User not found.');

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw ApiErrors.BadRequest('>>> Password wrong.')

    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async logout(refreshToken) {
    return await TokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw ApiErrors.UnauthorizedError();
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) throw ApiErrors.UnauthorizedError();

    const user = await db.user.findFirst({ where: { id: userData.id } })
    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async getAllUsers() {
    return await db.user.findMany();
  }

  async activate(activationLink) {
    const user = await db.user.findFirst({ where: { activationLink } })
    if (!user) throw ApiErrors.BadRequest('Bad activation link')

    await db.user.update({ where: { activationLink }, data: { isActivated: true } })
  }
}

export default new UserService;
