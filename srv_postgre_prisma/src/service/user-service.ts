import UserModel, { UserModelType } from '../models/user-model';
import MailService from './mail-service';
import TokenService from './token-service';
import UserDTO from '../dto/user-dtos'
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import ApiErrors from '../exceptions/api-errors';

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email })
    if (candidate) throw ApiErrors.BadRequest(`User already exist with email ${email}`)

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidv4();
    const user = await UserModel.create({ email, password: hashPassword, activationLink })

    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async login(email, password) {
    const user: UserModelType | null = await UserModel.findOne({ email })
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

    const user = await UserModel.findById(userData.id)
    const userDto = new UserDTO(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async getAllUsers() {
    return UserModel.find();
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) throw ApiErrors.BadRequest('Bad activation link')

    user.isActivated = true;
    await user.save()
  }
}

export default new UserService;
