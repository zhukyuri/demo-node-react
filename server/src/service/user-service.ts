import UserModel from '../models/user-model';
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

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) throw ApiErrors.BadRequest('Bad activation link')

    user.isActivated = true;
    await user.save()
  }
}

export default new UserService;
