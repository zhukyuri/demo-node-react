import MailService from './mail-service';
import TokenService from './token-redis-service';
import UserDTO from '../dto/user-dto'
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import ApiErrors from '../exceptions/api-errors';
import UserOrm from '../orm/user-orm';
import { expiresAccessToken, expiresRefreshToken } from '../configs/appConfigs';

export type IUserID = number;

export interface IUser {
  id: IUserID;
  email: string;
  name?: string;
  isActivated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class UserService {
  async registration(email, password) {
    const candidate = await UserOrm.ormFindFirst({ where: { email } });
    if (candidate) throw ApiErrors.BadRequest(`User already exist with email ${email}`)

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidv4();
    const user = await UserOrm.ormCreate({ data: { email, password: hashPassword, activationLink } })

    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    const res_ = await TokenService.saveToken(tokens.refreshToken, expiresRefreshToken)

    return { ...tokens, user: userDto }
  }

  async login(email, password) {
    const user = await UserOrm.ormFindFirst({ where: { email } })
    if (!user) throw ApiErrors.BadRequest('User not found.');

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw ApiErrors.BadRequest('Password wrong.')

    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(tokens.refreshToken, expiresRefreshToken)
    await TokenService.saveToken(tokens.accessToken, expiresAccessToken)

    return { ...tokens, user: userDto }
  }

  async delete(userId: IUserID) {
    return await UserOrm.ormDelete({ where: { id: userId} })
  }

  async logout(refreshToken) {
    return await TokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw ApiErrors.UnauthorizedError();
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) throw ApiErrors.UnauthorizedError();

    const user = await UserOrm.ormFindFirst({ where: { id: userData.id } })
    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(tokens.refreshToken, expiresRefreshToken)

    return { ...tokens, user: userDto }
  }

  async getAllUsers() {
    return await UserOrm.ormFindMany({});
  }

  async activate(activationLink) {
    const user = await UserOrm.ormFindFirst({ where: { activationLink } })
    if (!user) throw ApiErrors.BadRequest('Bad activation link')

    await UserOrm.ormUpdate({ where: { activationLink }, data: { isActivated: true } })
  }
}

export default new UserService;
