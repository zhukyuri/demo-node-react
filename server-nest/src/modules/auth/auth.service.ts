import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import {
  expiresRefreshToken,
  msecToSecond,
  nameAccessToken,
  nameRefreshToken,
} from '../../config/appConfigs';
import { TokenService } from '../token/token.service';

type PayloadToken = null | { email: string; sub: number };

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisCacheService: RedisCacheService,
    private readonly tokenService: TokenService,
  ) {
    //
  }

  throwUnAuthorized(message: string): void {
    throw new HttpException(message, HttpStatus.UNAUTHORIZED);
  }

  throwDeleteAccount(message: string): void {
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneValidateUser(email);
    if (!user) this.throwUnAuthorized('Login: User not found');

    if (user && user.password === pass) {
      // TODO Should Use DTO
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registration(createUserDto, res) {
    const { email, password, name } = createUserDto;

    if (!name) this.throwUnAuthorized('Registration: Name is empty.');

    const user = await this.usersService.findOneByEmail(email);
    if (user) this.throwUnAuthorized('Registration: The user already exists.');

    const newUser = await this.usersService.create({ email, password, name });
    if (!newUser)
      this.throwUnAuthorized(
        'Registration: A bad request to DB creates a user.',
      );

    const payload: PayloadToken = { email: newUser.email, sub: newUser.id };
    const accessToken = this.tokenService.generateTokenAccess(payload);
    const refreshToken = this.tokenService.generateTokenRefresh(payload);

    await this.redisCacheService.saveTokenRefresh(
      refreshToken,
      msecToSecond(expiresRefreshToken), // Note: Expires in Seconds
    );

    res.cookie(nameRefreshToken, refreshToken, {
      maxAge: expiresRefreshToken,
      httpOnly: true,
    });

    return res.send({
      [nameAccessToken]: accessToken,
      newUser,
    });
  }

  async login(req, res): Promise<any> {
    const { email } = req.body;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) this.throwUnAuthorized('Login: User not found');

    const payload: PayloadToken = { email: user.email, sub: user.id };
    const accessToken = this.tokenService.generateTokenAccess(payload);
    const refreshToken = this.tokenService.generateTokenRefresh(payload);

    await this.redisCacheService.saveTokenRefresh(
      refreshToken,
      msecToSecond(expiresRefreshToken), // Note: Expires in Seconds
    );

    res.cookie(nameRefreshToken, refreshToken, {
      maxAge: expiresRefreshToken,
      httpOnly: true,
    });

    return res.send({
      [nameAccessToken]: accessToken,
      user,
    });
  }

  async refresh(req, res) {
    const { refreshToken } = req.cookies;
    console.log('refreshToken', refreshToken);
    if (!refreshToken) this.throwUnAuthorized('Refresh: Token not found');

    const isValid = await this.tokenService.validateRefreshToken(refreshToken);
    if (!isValid) this.throwUnAuthorized('Refresh: The token is not valid');

    const isCache = await this.redisCacheService.readToken(refreshToken);
    if (!isCache) this.throwUnAuthorized('Refresh: Token not found in cache');

    const userData: any = this.tokenService.decodeToken(refreshToken);
    const { email } = userData;
    if (!email) this.throwUnAuthorized('Refresh: Bad payload in token');

    const user = await this.usersService.findOneByEmail(email);
    if (!user) this.throwUnAuthorized('Refresh: User not found');

    const payload: PayloadToken = { email: user.email, sub: user.id };
    const accessToken = this.tokenService.generateTokenAccess(payload);

    return res.send({
      [nameAccessToken]: accessToken,
      user,
    });
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;
    const token = await this.redisCacheService.delToken(refreshToken);
    res.clearCookie(nameRefreshToken);

    return res.json(token);
  }

  async delete(req, res) {
    const { params } = req;
    const userId = parseInt(params.userId);
    const resDel = await this.usersService.delete(userId);
    if (!resDel) this.throwDeleteAccount('Delete Account: Bad request');
    res.clearCookie(nameRefreshToken);
    return res.send({ delete: 'Ok' });
  }
}
